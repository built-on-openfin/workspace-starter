import { ChildProcess, spawn } from "child_process";
import fs from "fs/promises";
import glob from "glob";
import JSZip from "jszip";
import Mocha from "mocha";
import fetch from "node-fetch";
import "openfin-test-helpers";
import os from "os";
import path from "path";
import { promisify } from "util";
import type { Client } from "webdriver";
import { Parser } from "xml2js";
import { logError, logInfo, logSeparator } from "./console";
import type { ChromeDriverManifest } from "./models/chromeDriverManifest";
import type { OpenFinManifest } from "./models/openFinManifest";

const chromeDriverVersionBucketUrl = "https://chromedriver.storage.googleapis.com/";

/**
 * Load the Openfin manifest.
 * @param manifestUrl The url of the manifest to load.
 * @returns The loaded manifest.
 */
export async function loadManifest(manifestUrl: string): Promise<OpenFinManifest> {
    try {
        logInfo("Loading manifest", manifestUrl);

        const manifestResponse = await fetch(manifestUrl);
        const manifestJson = await manifestResponse.json();

        logInfo("Manifest loaded");
        logInfo("Manifest Runtime Version", manifestJson?.runtime?.version);
        logSeparator();

        return manifestJson as OpenFinManifest;
    } catch {
        throw new Error(`Unable to retrieve manifest ${manifestUrl}, is the web server running?`);
    }
}

/**
 * Launch the OpenFinRVM.
 * @param manifestUrl The manifest url to launch.
 * @param devToolsPort The dev tools port to launch the rvm with.
 * @param tempDataDir The temporary directory for storing the data.
 * @returns The process id that was launched.
 */
export async function launchOpenFinRVM(
    manifestUrl: string,
    devToolsPort: number,
    tempDataDir: string
): Promise<{
    processId: number | undefined;
    currentRegValue: string;
    tempDosFile: string;
}> {
    const localAppData = process.env.LocalAppData;
    if (!localAppData) {
        throw new Error("LocalAppData is not set in environment");
    }

    const openFinFolder = path.join(localAppData, "OpenFin");
    const exePath = path.join(openFinFolder, "OpenFinRVM.exe");

    const rvmExists = await fileExists(exePath);
    if (!rvmExists) {
        await downloadOpenFinRVM(manifestUrl);
    }

    const { currentRegValue, tempDosFile } = await createDesktopOwnerSettings();

    // Removed  --user-data-dir="${tempDataDir}" as the chromedriver does not see
    // the additional windows when including it - to investigate, maybe the other windows
    // don't pickup the same user-data-dir
    const args = [
        `--config=${manifestUrl}`,
        `--working-dir="${openFinFolder}"`,
        `--runtime-arguments="--remote-debugging-port=${devToolsPort}"`
    ];

    logInfo("Running OpenFin", exePath);
    logInfo("Args", args);
    const openFinProcess = spawnWithOutput(exePath, args, { shell: true });
    logInfo("OpenFinRVM Process", openFinProcess.pid);
    logSeparator();

    return {
        processId: openFinProcess.pid,
        currentRegValue,
        tempDosFile
    };
}

/**
 * Download the OpenFin RVM.
 * @param manifestUrl The manifest url to launch.
 */
export async function downloadOpenFinRVM(manifestUrl: string): Promise<void> {
    logInfo("Downloading the OpenFinRVM");

    const tempDir = os.tmpdir();
    const tempInstallerDir = path.join(tempDir, `openfin-installer-${Date.now()}`);

    try {
        logInfo("Creating temp installer dir", tempInstallerDir);
        await fs.mkdir(tempInstallerDir, { recursive: true });

        const runTimeResponse = await fetch(
            `https://install.openfin.co/download/?os=win&config=${encodeURI(manifestUrl)}&dnl=true`
        );
        const zipBuffer = await runTimeResponse.arrayBuffer();

        const installerPath = path.join(tempInstallerDir, "openfin-installer.exe");

        logInfo("Unzipping OpenFinRVM", installerPath);

        const zip = new JSZip();
        const zipContents = await zip.loadAsync(zipBuffer);
        const fileEntry = zipContents.file("openfin-installer.exe");
        if (!fileEntry) {
            throw new Error("The zip file does not contain openfin-installer.exe");
        }
        const fileBuffer = await fileEntry.async("nodebuffer");
        await fs.writeFile(installerPath, fileBuffer);

        logInfo("Installing OpenFinRVM", installerPath);

        await spawnWithOutputWait(installerPath);
    } finally {
        await fs.rm(tempInstallerDir, { recursive: true });
    }
}

/**
 * Desktop owner settings.
 * @returns The location of the temporary desktop owner settings.
 */
export async function createDesktopOwnerSettings(): Promise<{
    currentRegValue: string;
    tempDosFile: string;
}> {
    logInfo("Querying Desktop Owner Settings");

    const tempDir = os.tmpdir();
    const tempDosFile = path.join(tempDir, `openfin-dos-${Date.now()}.json`);

    const { output } = await spawnWithOutputWait(
        // eslint-disable-next-line @typescript-eslint/quotes
        'reg query "HKCU\\Software\\OpenFin\\RVM\\Settings" -v "DesktopOwnerSettings"',
        undefined,
        { shell: true },
        true
    );

    logInfo("Writing Temporary Desktop Owner Settings", tempDosFile);
    await fs.writeFile(tempDosFile, JSON.stringify({ desktopSettings: { securedAPIDefaultPermission: "allow" } }));

    await setDesktopOwnerSettings(`file:\\\\\\${tempDosFile}`);

    let currentRegValue = "";
    if (output.length > 0) {
        const lines = output.split("\n");
        for (const line of lines) {
            if (line.includes("DesktopOwnerSettings")) {
                currentRegValue = line.replace("DesktopOwnerSettings", "").replace("REG_SZ", "").trim();
                logInfo("Current Desktop Owner Setting", currentRegValue);
                break;
            }
        }
    }

    logSeparator();

    return {
        currentRegValue,
        tempDosFile
    };
}

/**
 * Set the desktop owner settings.
 * @param value The original value of the desktop owner settings.
 * @returns Nothing.
 */
export async function setDesktopOwnerSettings(value: string): Promise<void> {
    if (value.length === 0) {
        logInfo("Deleting Desktop Owner Setting", value);
        await spawnWithOutputWait(
            // eslint-disable-next-line @typescript-eslint/quotes
            'Echo Y|reg delete "HKCU\\Software\\OpenFin\\RVM\\Settings" /v "DesktopOwnerSettings"',
            undefined,
            { shell: true }
        );
    } else {
        logInfo("Setting Desktop Owner Setting", value);
        await spawnWithOutputWait(
            `Echo Y|reg add "HKCU\\Software\\OpenFin\\RVM\\Settings" -v "DesktopOwnerSettings" -d "${value}`,
            undefined,
            { shell: true }
        );
    }
}

/**
 * Cleanup any OpenFinRVM instances.
 */
export async function closeOpenFinRVM(): Promise<void> {
    logInfo("Cleaning up existing OpenFin instances");
    await killProcessByImage("OpenFin.exe");
    await killProcessByImage("OpenFinRVM.exe");
    logInfo("Cleanup complete");
    logSeparator();
}

/**
 * Get the Chrome Driver to match the runtime version downloading if necessary.
 * @param chromeDriverStorePath The path to store the Chrome drivers in.
 * @param openFinRuntimeVersion The version of the OpenFin runtime.
 * @returns The location of the driver executable.
 */
export async function getChromeDriver(chromeDriverStorePath: string, openFinRuntimeVersion: string): Promise<string> {
    const parts = openFinRuntimeVersion.split(".");

    if (parts.length !== 4) {
        throw new Error(`The version should be in four parts, it is "${openFinRuntimeVersion}"`);
    }

    const chromeRuntimeVersion = parts[1];
    logInfo("Chromium runtime version", chromeRuntimeVersion);

    const chromeDriverVersionPath = path.join(chromeDriverStorePath, chromeRuntimeVersion);
    try {
        await fs.mkdir(chromeDriverVersionPath, { recursive: true });
    } catch (err) {
        if (!isNodeError(err) || err.code !== "EEXIST") {
            throw err;
        }
    }

    const chromeDriverPath = path.resolve(path.join(chromeDriverVersionPath, "chromedriver.exe"));
    if (!(await fileExists(chromeDriverPath))) {
        logInfo("Fetching Chrome Driver Version manifest", chromeDriverVersionBucketUrl);
        const chromeDriverVersionsManifest = await fetch(chromeDriverVersionBucketUrl);
        const xml = await chromeDriverVersionsManifest.text();
        const parser = new Parser();
        const parsed: ChromeDriverManifest = await parser.parseStringPromise(xml);

        const manifestEntry = parsed?.ListBucketResult?.Contents.find(
            e => e.Key[0].startsWith(`${chromeRuntimeVersion}`) && e.Key[0].endsWith("/chromedriver_win32.zip")
        );
        if (!manifestEntry) {
            throw new Error(`Can not find chromedriver for version ${chromeRuntimeVersion}`);
        }

        const chromeDriverVersionUrl = `${chromeDriverVersionBucketUrl}${manifestEntry.Key}`;
        logInfo("Fetching Chrome Driver", chromeDriverVersionUrl);
        const zipResponse = await fetch(chromeDriverVersionUrl);
        const zipBuffer = await zipResponse.arrayBuffer();

        logInfo("Unzipping Chrome Driver to", chromeDriverPath);
        const zip = new JSZip();
        const zipContents = await zip.loadAsync(zipBuffer);
        const fileEntry = zipContents.file("chromedriver.exe");
        if (!fileEntry) {
            throw new Error("The zip file does not contain chromedriver.exe");
        }
        const fileBuffer = await fileEntry.async("nodebuffer");
        await fs.writeFile(chromeDriverPath, fileBuffer);
    } else {
        logInfo("Chrome Driver already exists", chromeDriverPath);
    }
    logSeparator();

    return chromeDriverPath;
}

/**
 * Start the Chrome Driver running.
 * @param chromeDriverPath The path to the Chrome driver.
 * @param chromeDriverPort The port to run the driver on.
 * @returns The id of the instance.
 */
export async function startChromeDriver(
    chromeDriverPath: string,
    chromeDriverPort: number
): Promise<number | undefined> {
    logInfo("Starting Chrome Driver", `${chromeDriverPath} port ${chromeDriverPort}`);
    const chromeDriverProcess = spawnWithOutput(chromeDriverPath, [`--port=${chromeDriverPort}`]);
    logInfo("Chrome Driver Process", chromeDriverProcess.pid);
    logInfo("Waiting for Chrome Driver to be ready");
    let hadResponse = false;
    const timeStart = Date.now();

    do {
        try {
            const response = await fetch(`http://localhost:${chromeDriverPort}/status`);
            const json: { value?: { ready: boolean } } = await response.json();
            if (json.value?.ready) {
                hadResponse = true;
            }
        } catch {}
    } while (!hadResponse && Date.now() - timeStart < 10000);

    if (!hadResponse) {
        throw new Error("Unable to start Chrome Driver");
    }

    logInfo("Waiting for Chrome Driver to connect to OpenFin platform...");
    logSeparator();

    return chromeDriverProcess.pid;
}

/**
 * Create a temporary profile folder.
 * @returns The profile folder.
 */
export async function tempProfileDirCreate(): Promise<string> {
    const tempDir = os.tmpdir();
    const tempProfileDataDir = path.join(tempDir, `openfin-test-${Date.now()}`);

    logInfo("Creating temp profile dir", tempProfileDataDir);

    await fs.mkdir(tempProfileDataDir, { recursive: true });
    logSeparator();

    return tempProfileDataDir;
}

/**
 * Does the file exist.
 * @param filename The name of the file.
 * @returns True of the file exists.
 */
async function fileExists(filename: string): Promise<boolean> {
    try {
        const stats = await fs.stat(filename);
        return stats.isFile();
    } catch {
        return false;
    }
}

/**
 * Kill a running process by id.
 * @param processId The id of the process to kill.
 */
export async function killProcessById(processId: number): Promise<void> {
    await spawnWithOutputWait("taskkill", ["/F", "/PID", processId.toString(), "/T"], undefined, true);
}

/**
 * Kill a running process by image name.
 * @param image The image name of the process to kill.
 */
export async function killProcessByImage(image: string): Promise<void> {
    await spawnWithOutputWait("taskkill", ["/F", "/IM", image, "/T"], undefined, true);
}

/**
 * Run the tests.
 * @param testPathGlob The global of the tests to run.
 * @param client The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 */
export async function runTestsMocha(testPathGlob: string, client: Client, maxTimeout: number): Promise<void> {
    logInfo("Running Tests using Mocha");

    const testFiles = await promisify(glob)(testPathGlob);

    global.client = client;

    const mocha = new Mocha({});
    mocha.timeout(maxTimeout * 1000);

    for (const testFile of testFiles) {
        mocha.addFile(testFile);
    }

    return new Promise<void>((resolve, reject) => {
        const runner = mocha.run();
        runner.on("end", () => {
            resolve();
            logSeparator();
        });
    });
}

/**
 * Is this is node error.
 * @param error The error object.
 * @returns If given error object is a NodeJS error.
 */
function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error;
}

/**
 * Spawn a child and display the output.
 * @param process The process to spawn.
 * @param args The arguments for the app.
 * @param options The options to launch with.
 * @param options.shell Launch as shell with unsanitized args.
 * @param hideErrors Ignore errors in the output.
 * @param endCallback Callback to call when the task completes.
 * @returns The spawned process.
 */
function spawnWithOutput(
    process: string,
    args?: string[],
    options?: { shell: boolean },
    hideErrors?: boolean,
    endCallback?: (output: string, error: string) => void
): ChildProcess {
    const child = spawn(process, args, options);

    let output = "";
    let err = "";
    let completeOutput = "";
    let completeError = "";

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", data => {
        output += data.toString();
        completeOutput += data.toString();
        const lines = output.split("\n");
        output = lines.pop() ?? "";
        for (const line of lines) {
            logInfo(line);
        }
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", data => {
        err += data.toString();
        completeError += data.toString();
        const lines = err.split("\n");
        err = lines.pop() ?? "";
        if (!hideErrors) {
            for (const line of lines) {
                logError(line);
            }
        }
    });

    child.on("close", () => {
        if (output.trim().length > 0) {
            logInfo(output);
        }
        if (err.trim().length > 0) {
            logError(err);
        }

        if (endCallback) {
            endCallback(completeOutput, completeError);
        }
    });

    return child;
}

/**
 * Spawn a child and display the output.
 * @param process The process to spawn.
 * @param args The arguments for the app.
 * @param options The options to launch with.
 * @param options.shell Launch as shell with unsanitized args.
 * @param hideErrors Ignore errors in the output.
 */
async function spawnWithOutputWait(
    process: string,
    args?: string[],
    options?: { shell: boolean },
    hideErrors?: boolean
): Promise<{
    output: string;
    error: string;
}> {
    return new Promise<{
        output: string;
        error: string;
    }>(resolve => {
        spawnWithOutput(process, args, options, hideErrors, (output, error) => {
            resolve({ output, error });
        });
    });
}
