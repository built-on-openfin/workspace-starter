import { IWebDriver, NodeWebDriver, SeleniumWebDriver } from "@openfin/automation-helpers";
import fs from "fs/promises";
import JSZip from "jszip";
import fetch from "node-fetch";
import os from "os";
import path from "path";
import { Parser } from "xml2js";
import { logBlank, logSection, logTask } from "./console";
import type { ChromeDriverManifest } from "./models/chromeDriverManifest";
import type { OpenFinManifest } from "./models/openFinManifest";
import { fileExists, isNodeError, killProcessByImage, spawnWithOutput, spawnWithOutputWait } from "./utils";

const chromeDriverVersionBucketUrl = "https://chromedriver.storage.googleapis.com/";

/**
 * Load the Openfin manifest.
 * @param manifestUrl The url of the manifest to load.
 * @param defaultRuntimeVersion The runtime version to use if none in the manifest.
 * @returns The loaded manifest.
 */
export async function loadManifest(manifestUrl: string, defaultRuntimeVersion: string): Promise<OpenFinManifest> {
    try {
        logSection("Loading manifest", manifestUrl);

        const manifestResponse = await fetch(manifestUrl);
        const manifestJson: OpenFinManifest = await manifestResponse.json();

        manifestJson.runtime = manifestJson.runtime ?? {};
        manifestJson.runtime.version = manifestJson.runtime.version ?? defaultRuntimeVersion;

        logTask("Manifest loaded");

        return manifestJson;
    } catch {
        throw new Error(`Unable to retrieve manifest ${manifestUrl}, is the web server running?`);
    }
}

/**
 * Resolve the runtime version if it is a label to the real version.
 * @param manifestVersion The version to resolve.
 * @param storageFolder The storage location.
 * @param offline Run in offline mode.
 * @returns The real version of the runtime and the chrome version.
 */
export async function resolveRuntimeVersion(
    manifestVersion: string,
    storageFolder: string,
    offline: boolean
): Promise<{
    runtime: string;
    chrome: string;
}> {
    logSection("Resolving OpenFin runtime version", `Version ${manifestVersion}`);

    const parts = manifestVersion.split(".");
    if (parts.length === 4) {
        logTask("Final Runtime version", manifestVersion);
        return {
            runtime: manifestVersion,
            chrome: parts[1]
        };
    }

    let ver;
    if (offline) {
        const versionsJsonFilename = path.join(storageFolder, "offline-versions.json");
        logTask("Loading offline version file", versionsJsonFilename);
        const exists = await fileExists(versionsJsonFilename);
        if (!exists) {
            throw new Error(
                `If offlineStorage is set we are expecting a manifest version file to exist at "${versionsJsonFilename}"`
            );
        }
        const versionsJsonBuffer = await fs.readFile(versionsJsonFilename);
        const versionsJson: {
            [id: string]: string;
        } = JSON.parse(versionsJsonBuffer.toString());
        ver = versionsJson[manifestVersion];

        if (!ver) {
            throw new Error(`offline-versions.json does not contain an entry for "${manifestVersion}"`);
        }
    } else {
        const response = await fetch(`https://developer.openfin.co/release/runtime/${manifestVersion}`);
        ver = await response.text();
    }

    if (ver) {
        const parts = ver.split(".");
        if (parts.length === 4) {
            logTask("Final Runtime version", ver);
            return {
                runtime: ver,
                chrome: parts[1]
            };
        }
    }

    throw new Error(`Unable to resolve runtime version "${manifestVersion}"`);
}

/**
 * Launch the OpenFinRVM.
 * @param manifestUrl The manifest url to launch.
 * @param devToolsPort The dev tools port to launch the rvm with.
 * @param storageFolder The storage location.
 * @param offline Run in offline mode.
 * @param tempDataDir The temporary directory for storing the data.
 * @returns The process id that was launched.
 */
export async function launchOpenFinRVM(
    manifestUrl: string,
    devToolsPort: number,
    storageFolder: string,
    offline: boolean,
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
        if (offline) {
            throw new Error(
                `offline mode is enabled but the OpenFinRVM.exe can not be found at "${exePath}", make sure the OpenFin runtime is already available`
            );
        }
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

    logSection("Running OpenFin", exePath);
    logTask("Args", args);
    const openFinProcess = spawnWithOutput(exePath, args, { shell: true });
    logTask("OpenFinRVM Process", openFinProcess.pid);

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
    logSection("Downloading the OpenFinRVM");

    const tempDir = os.tmpdir();
    const tempInstallerDir = path.join(tempDir, `openfin-installer-${Date.now()}`);

    try {
        logTask("Creating temp installer dir", tempInstallerDir);
        await fs.mkdir(tempInstallerDir, { recursive: true });

        const runTimeResponse = await fetch(
            `https://install.openfin.co/download/?os=win&config=${encodeURI(manifestUrl)}&dnl=true`
        );
        const zipBuffer = await runTimeResponse.arrayBuffer();

        const installerPath = path.join(tempInstallerDir, "openfin-installer.exe");

        logTask("Unzipping OpenFinRVM", installerPath);

        const zip = new JSZip();
        const zipContents = await zip.loadAsync(zipBuffer);
        const fileEntry = zipContents.file("openfin-installer.exe");
        if (!fileEntry) {
            throw new Error("The zip file does not contain openfin-installer.exe");
        }
        const fileBuffer = await fileEntry.async("nodebuffer");
        await fs.writeFile(installerPath, fileBuffer);

        logTask("Installing OpenFinRVM", installerPath);

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
    logSection("Querying Desktop Owner Settings");

    const tempDir = os.tmpdir();
    const tempDosFile = path.join(tempDir, `openfin-dos-${Date.now()}.json`);

    const { output } = await spawnWithOutputWait(
        // eslint-disable-next-line @typescript-eslint/quotes
        'reg query "HKCU\\Software\\OpenFin\\RVM\\Settings" -v "DesktopOwnerSettings"',
        undefined,
        { shell: true },
        true
    );

    logTask("Writing Temporary Desktop Owner Settings", tempDosFile);
    await fs.writeFile(tempDosFile, JSON.stringify({ desktopSettings: { securedAPIDefaultPermission: "allow" } }));

    await setDesktopOwnerSettings(`file:\\\\\\${tempDosFile}`);

    let currentRegValue = "";
    if (output.length > 0) {
        const lines = output.split("\n");
        for (const line of lines) {
            if (line.includes("DesktopOwnerSettings")) {
                currentRegValue = line.replace("DesktopOwnerSettings", "").replace("REG_SZ", "").trim();
                logTask("Current Desktop Owner Setting", currentRegValue);
                break;
            }
        }
    }

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
        logTask("Deleting Desktop Owner Setting", value);
        await spawnWithOutputWait(
            // eslint-disable-next-line @typescript-eslint/quotes
            'Echo Y|reg delete "HKCU\\Software\\OpenFin\\RVM\\Settings" /v "DesktopOwnerSettings"',
            undefined,
            { shell: true },
            true
        );
    } else {
        logTask("Setting Desktop Owner Setting", value);
        await spawnWithOutputWait(
            `Echo Y|reg add "HKCU\\Software\\OpenFin\\RVM\\Settings" -v "DesktopOwnerSettings" -d "${value}`,
            undefined,
            { shell: true },
            true
        );
    }
}

/**
 * Cleanup any OpenFinRVM instances.
 * @param asTask Log the information as a task.
 */
export async function closeOpenFinRVM(asTask: boolean): Promise<void> {
    if (asTask) {
        logTask("Cleaning up OpenFin instances");
    } else {
        logSection("Cleaning up OpenFin instances");
    }
    await killProcessByImage("OpenFin.exe");
    await killProcessByImage("OpenFinRVM.exe");
    logTask("Cleanup instances complete");
}

/**
 * Get the Chrome Driver to match the runtime version downloading if necessary.
 * @param chromeVersion The version of the chrome runtime.
 * @param storageFolder The storage location.
 * @param offline Run in offline mode.
 * @returns The location of the driver executable.
 */
export async function getChromeDriver(chromeVersion: string, storageFolder: string, offline: boolean): Promise<string> {
    logSection("Get Chrome Driver", `Version ${chromeVersion}`);

    const chromeDriverVersionPath = path.join(storageFolder, "chromedriver", chromeVersion);
    try {
        await fs.mkdir(chromeDriverVersionPath, { recursive: true });
    } catch (err) {
        if (!isNodeError(err) || err.code !== "EEXIST") {
            throw err;
        }
    }

    const chromeDriverPath = path.resolve(path.join(chromeDriverVersionPath, "chromedriver.exe"));
    const versionExists = await fileExists(chromeDriverPath);
    if (!versionExists) {
        if (offline) {
            throw new Error(
                `offline mode is set but no chromedriver exists in ${chromeDriverPath}, you must manually download and store the correct version from ${chromeDriverVersionBucketUrl}`
            );
        }
        logTask("Fetching Chrome Driver Version manifest", chromeDriverVersionBucketUrl);
        const chromeDriverVersionsManifest = await fetch(chromeDriverVersionBucketUrl);
        const xml = await chromeDriverVersionsManifest.text();
        const parser = new Parser();
        const parsed: ChromeDriverManifest = await parser.parseStringPromise(xml);

        const allManifestEntries = parsed?.ListBucketResult?.Contents.filter(
            e => e.Key[0].startsWith(`${chromeVersion}`) && e.Key[0].endsWith("/chromedriver_win32.zip")
        );
        if (!allManifestEntries || allManifestEntries.length === 0) {
            throw new Error(`Can not find chromedriver for version ${chromeVersion}`);
        }

        // Get the highest minor version number
        let manifestEntry = allManifestEntries[0];
        if (allManifestEntries.length > 1) {
            let highest = 0;
            for (let i = 0; i < allManifestEntries.length; i++) {
                const minor = Number.parseInt(allManifestEntries[i].Key[0].split(".")[3], 10);
                if (minor > highest) {
                    highest = minor;
                    manifestEntry = allManifestEntries[i];
                }
            }
        }

        const chromeDriverVersionUrl = `${chromeDriverVersionBucketUrl}${manifestEntry.Key}`;
        logTask("Fetching Chrome Driver", chromeDriverVersionUrl);
        const zipResponse = await fetch(chromeDriverVersionUrl);
        const zipBuffer = await zipResponse.arrayBuffer();

        logTask("Unzipping Chrome Driver to", chromeDriverPath);
        const zip = new JSZip();
        const zipContents = await zip.loadAsync(zipBuffer);
        const fileEntry = zipContents.file("chromedriver.exe");
        if (!fileEntry) {
            throw new Error("The zip file does not contain chromedriver.exe");
        }
        const fileBuffer = await fileEntry.async("nodebuffer");
        await fs.writeFile(chromeDriverPath, fileBuffer);
    } else {
        logTask("Chrome Driver already exists", chromeDriverPath);
    }

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
    logSection("Starting Chrome Driver", `${chromeDriverPath} port ${chromeDriverPort}`);

    const chromeDriverProcess = spawnWithOutput(chromeDriverPath, [`--port=${chromeDriverPort}`]);
    logTask("Chrome Driver Process", chromeDriverProcess.pid);
    logTask("Waiting for Chrome Driver to be ready");
    logBlank();
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

    return chromeDriverProcess.pid;
}

/**
 * Create a temporary profile folder.
 * @returns The profile folder.
 */
export async function tempProfileDirCreate(): Promise<string> {
    const tempDir = os.tmpdir();
    const tempProfileDataDir = path.join(tempDir, `openfin-test-${Date.now()}`);

    logSection("Creating temp profile directory", tempProfileDataDir);

    await fs.mkdir(tempProfileDataDir, { recursive: true });

    logTask("Directory created");

    return tempProfileDataDir;
}

/**
 * Setup the webdriver and start a session.
 * @param driver The type of driver to use.
 * @param devToolsPort The port for the dev tools.
 * @param chromeDriverPort The port for the chrome driver.
 * @param logLevel The level of logging.
 * @returns The created webdriver.
 */
export async function setupWebDriver(
    driver: "node" | "selenium",
    devToolsPort: number,
    chromeDriverPort: number,
    logLevel: "debug" | "silent"
): Promise<IWebDriver> {
    // Set the global object which points to the client so that the automation helpers can access it
    // This only works in jest >= 28 which lazy loads globalThis into its vm context
    globalThis.webDriver = driver === "node" ? new NodeWebDriver() : new SeleniumWebDriver();

    await globalThis.webDriver.startSession(devToolsPort, chromeDriverPort, logLevel);

    return globalThis.webDriver;
}

/**
 * End the session on the web driver.
 * @param webDriver The webdriver to end the session on.
 */
export async function closeWebDriver(webDriver: IWebDriver): Promise<void> {
    await webDriver.endSession();
}
