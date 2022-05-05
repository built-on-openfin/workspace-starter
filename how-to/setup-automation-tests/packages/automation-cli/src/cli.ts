import { Command, Option } from "commander";
import fs from "fs/promises";
import glob from "glob";
import * as tsNode from "ts-node";
import { promisify } from "util";
import WebDriver from "webdriver";
import { logBlank, logError, logExit, logHeader, logHelp, logSettings, logPlain, logSection, logTask } from "./console";
import { runTestsJasmine } from "./frameworks/jasmine";
import { runTestsJest } from "./frameworks/jest";
import { runTestsMocha } from "./frameworks/mocha";
import {
    closeOpenFinRVM,
    getChromeDriver,
    launchOpenFinRVM,
    loadManifest,
    resolveRuntimeVersion,
    setDesktopOwnerSettings,
    startChromeDriver,
    tempProfileDirCreate
} from "./tasks";
import { killProcessById } from "./utils";

const APP_TITLE = "OpenFin Automation";
const APP_NAME = "of-automation";
const APP_VERSION = "0.0.1";
const DEFAULT_DEV_TOOLS_PORT = 9090;
const DEFAULT_CHROME_DRIVER_PORT = 4444;
const DEFAULT_STORAGE_FOLDER = "./storage/";
const DEFAULT_TEST_TIMEOUT_SECONDS = 120;
const DEFAULT_OPENFIN_RUNTIME_VERSION = "stable";

const testFrameworks = {
    mocha: runTestsMocha,
    jasmine: runTestsJasmine,
    jest: runTestsJest
};

/**
 * Run the app.
 * @param args The arguments from the command line.
 */
export async function run(args: string[]): Promise<void> {
    process.title = APP_TITLE;
    logHeader(APP_TITLE);
    logBlank();

    if (process.platform !== "win32") {
        logError("The automation CLI will only run on windows");
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    }

    const program = new Command();
    program
        .name(APP_NAME)
        .description("Run Automation Tests using Chrome Driver with an OpenFin UI")
        .version(APP_VERSION)
        .argument("manifestUrl <string>", "The url of the manifest to fetch")
        .argument("testGlob <string>", "A glob pointing to the tests to run")
        .addOption(
            new Option("--logLevel <level>", "The log level for the webdriver")
                .choices(["debug", "silent"])
                .default("silent")
        )
        .option<number>(
            "--devToolsPort <number>",
            "The port to run the dev tools on",
            value => Number.parseInt(value, 10),
            DEFAULT_DEV_TOOLS_PORT
        )
        .option<number>(
            "--chromeDriverPort <number>",
            "The port to run the chromedriver on",
            value => Number.parseInt(value, 10),
            DEFAULT_CHROME_DRIVER_PORT
        )
        .option("--storageFolder <path>", "The path to store any downloaded or offline data", DEFAULT_STORAGE_FOLDER)
        .option("--offline", "In offline mode no resources are retrieved, they are expected to be in the storageFolder")
        .option<number>(
            "--testTimeout <number>",
            "The timeout in seconds for running tests",
            value => Number.parseInt(value, 10),
            DEFAULT_TEST_TIMEOUT_SECONDS
        )
        .option(
            "--defaultRuntimeVersion <string>",
            "The OpenFin runtime version to use if not specified in manifest",
            DEFAULT_OPENFIN_RUNTIME_VERSION
        )
        .addOption(
            new Option("--framework <mocha>", "The test framework to run the tests with")
                .choices(["mocha", "jasmine", "jest"])
                .default("mocha")
        )
        .configureOutput({
            writeOut: str => logPlain(str),
            writeErr: str => {
                logError(str.replace("error: ", ""));
                logHelp(`use ${APP_NAME} --help to show help`);
            }
        })
        .exitOverride(err => {
            // eslint-disable-next-line unicorn/no-process-exit
            process.exit(1);
        })
        .showSuggestionAfterError()
        .action(
            async (
                manifestUrl: string,
                testGlobPath: string,
                opts: {
                    logLevel: "debug" | "silent";
                    devToolsPort: number;
                    chromeDriverPort: number;
                    framework: "jasmine" | "mocha" | "jest";
                    testTimeout: number;
                    defaultRuntimeVersion: string;
                    storageFolder: string;
                    offline: boolean;
                }
            ) => {
                logSettings("Manifest Url", manifestUrl);
                logSettings("Test Glob Path", testGlobPath);
                logSettings("Log Level", opts.logLevel);
                logSettings("Dev Tools Port", opts.devToolsPort);
                logSettings("Chrome Driver Port", opts.chromeDriverPort);
                logSettings("Test Framework", opts.framework);
                logSettings("Test Timeout", opts.testTimeout);
                logSettings("Default Runtime Version", opts.defaultRuntimeVersion);
                logSettings("Storage Folder", opts.storageFolder);
                logSettings("Offline", opts.offline ? "true" : "false");

                const testFilesExpanded = await promisify(glob)(testGlobPath);
                const hasTypeScript = testFilesExpanded.some(filename => filename.includes(".ts"));
                logSettings("TypeScript", hasTypeScript ? "true" : "false");

                let tempDataDir: string | undefined;
                let chromeDriverProcessId: number | undefined;
                let launchParams:
                    | {
                          processId: number | undefined;
                          currentRegValue: string;
                          tempDosFile: string;
                      }
                    | undefined;

                process.on("SIGINT", async () => {
                    await exitApp(2, tempDataDir, chromeDriverProcessId, launchParams);
                });
                process.on("SIGTERM", async () => {
                    await exitApp(2, tempDataDir, chromeDriverProcessId, launchParams);
                });

                try {
                    const manifest = await loadManifest(manifestUrl, opts.defaultRuntimeVersion);
                    const versions = await resolveRuntimeVersion(
                        manifest.runtime.version,
                        opts.storageFolder,
                        opts.offline
                    );
                    const chromeDriverPath = await getChromeDriver(versions.chrome, opts.storageFolder, opts.offline);

                    tempDataDir = await tempProfileDirCreate();
                    await closeOpenFinRVM(false);
                    launchParams = await launchOpenFinRVM(
                        manifestUrl,
                        opts.devToolsPort,
                        opts.storageFolder,
                        opts.offline,
                        tempDataDir
                    );
                    chromeDriverProcessId = await startChromeDriver(chromeDriverPath, opts.chromeDriverPort);

                    const client = await WebDriver.newSession({
                        capabilities: {
                            browserName: "chrome",
                            "goog:chromeOptions": {
                                debuggerAddress: `localhost:${opts.devToolsPort}`
                            }
                        },
                        port: opts.chromeDriverPort,
                        logLevel: opts.logLevel
                    });

                    if (hasTypeScript) {
                        tsNode.register({});
                    }

                    const exitCode = await testFrameworks[opts.framework](
                        testGlobPath,
                        testFilesExpanded,
                        client,
                        opts.testTimeout,
                        hasTypeScript
                    );

                    await client.deleteSession();

                    await exitApp(exitCode, tempDataDir, chromeDriverProcessId, launchParams);
                } catch (err) {
                    logBlank();
                    logError(err);
                    await exitApp(1, tempDataDir, chromeDriverProcessId, launchParams);
                }
            }
        )
        .parse(args);
}

/**
 * Exit the application and cleanup any resources.
 * @param exitCode The exit code to end with.
 * @param tempProfileDataDir The profile used to store the temp data.
 * @param chromeDriverProcessId The id of the chrome driver process.
 * @param launchParams The result of the launch RVM.
 */
async function exitApp(
    exitCode: number,
    tempProfileDataDir: string | undefined,
    chromeDriverProcessId: number | undefined,
    launchParams:
        | {
              processId: number | undefined;
              currentRegValue: string;
              tempDosFile: string;
          }
        | undefined
): Promise<void> {
    logSection("Cleaning Up");

    if (chromeDriverProcessId) {
        logTask("Closing Chrome Driver");
        try {
            await killProcessById(chromeDriverProcessId);
        } catch {}
    }

    if (launchParams) {
        try {
            logTask("Restoring DOS");
            await setDesktopOwnerSettings(launchParams.currentRegValue);
        } catch {}
    }

    if (launchParams?.tempDosFile) {
        try {
            logTask("Removing temporary DOS Settings");
            await fs.unlink(launchParams.tempDosFile);
        } catch {}
    }

    try {
        if (launchParams?.processId) {
            await closeOpenFinRVM(true);
        }
    } catch {}

    if (tempProfileDataDir) {
        logTask("Removing temp data directory", tempProfileDataDir);
        try {
            await fs.rm(tempProfileDataDir, { recursive: true });
        } catch {}
    }

    logExit(exitCode, "Successfully ran the tests", "Failed running the tests", "Application terminated");

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(exitCode);
}
