import { Command, Option } from "commander";
import fs from "fs/promises";
import WebDriver from "webdriver";
import { logBlank, logError, logHeader, logInfo, logSeparator } from "./console";
import { runTestsJasmine } from "./frameworks/jasmine";
import { runTestsMocha } from "./frameworks/mocha";
import {
    closeOpenFinRVM,
    getChromeDriver,
    killProcessById,
    launchOpenFinRVM,
    loadManifest,
    resolveRuntimeVersion,
    setDesktopOwnerSettings,
    startChromeDriver,
    tempProfileDirCreate
} from "./utils";

const APP_TITLE = "OpenFin Test Runner";
const APP_NAME = "openfin-test-runner";
const APP_VERSION = "0.0.1";
const DEFAULT_DEV_TOOLS_PORT = 9090;
const DEFAULT_CHROME_DRIVER_PORT = 4444;
const DEFAULT_CHROME_DRIVER_STORE_FOLDER = "./chromedriver/";
const DEFAULT_TEST_TIMEOUT_SECONDS = 120;
const DEFAULT_OPENFIN_RUNTIME_VERSION = "stable";

/**
 * Run the app.
 * @param args The arguments from the command line.
 */
export async function run(args: string[]): Promise<void> {
    process.title = APP_TITLE;
    logHeader(APP_TITLE);
    logBlank();

    if (process.platform !== "win32") {
        logError("The test runner will only run on windows");
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    }

    const program = new Command();
    program
        .name(APP_NAME)
        .description("Run E2E Test using Chrome Driver with an OpenFin UI")
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
        .option(
            "--chromeDriverStore <string>",
            "A folder path to store the chromedriver versions",
            DEFAULT_CHROME_DRIVER_STORE_FOLDER
        )
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
            new Option("--framework <jasmine>", "The test framework to run the tests with")
                .choices(["mocha", "jasmine"])
                .default("mocha")
        )
        .configureOutput({
            writeOut: str => logInfo(str),
            writeErr: str => {
                logError(str);
                logInfo(`use ${APP_NAME} --help to show help`);
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
                    chromeDriverStore: string;
                    framework: "jasmine" | "mocha";
                    testTimeout: number;
                    defaultRuntimeVersion: string;
                }
            ) => {
                logInfo("Manifest Url", manifestUrl);
                logInfo("Test Glob Path", testGlobPath);
                logInfo("Log Level", opts.logLevel);
                logInfo("Dev Tools Port", opts.devToolsPort);
                logInfo("Chrome Driver Port", opts.chromeDriverPort);
                logInfo("Chrome Driver Store", opts.chromeDriverStore);
                logInfo("Test Framework", opts.framework);
                logInfo("Test Timeout", opts.testTimeout);
                logInfo("Default Runtime Version", opts.defaultRuntimeVersion);
                logSeparator();

                let tempDataDir: string | undefined;
                let chromeDriverProcessId: number | undefined;
                let launchParams;
                try {
                    const manifest = await loadManifest(manifestUrl, opts.defaultRuntimeVersion);
                    const versions = await resolveRuntimeVersion(manifest.runtime.version);
                    const chromeDriverPath = await getChromeDriver(opts.chromeDriverStore, versions.chrome);

                    tempDataDir = await tempProfileDirCreate();
                    await closeOpenFinRVM();
                    launchParams = await launchOpenFinRVM(manifestUrl, opts.devToolsPort, tempDataDir);
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

                    if (opts.framework === "jasmine") {
                        await runTestsJasmine(testGlobPath, client, opts.testTimeout);
                    } else {
                        await runTestsMocha(testGlobPath, client, opts.testTimeout);
                    }

                    await client.deleteSession();

                    await exitApp(0, tempDataDir, chromeDriverProcessId, launchParams);
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
    if (chromeDriverProcessId) {
        logInfo("Closing Chrome Driver");
        try {
            await killProcessById(chromeDriverProcessId);
        } catch {}
    }

    if (launchParams) {
        try {
            logInfo("Restoring DOS");
            await setDesktopOwnerSettings(launchParams.currentRegValue);
        } catch {}
    }

    if (launchParams?.tempDosFile) {
        try {
            logInfo("Removing temporary DOS Settings");
            await fs.unlink(launchParams.tempDosFile);
        } catch {}
    }

    try {
        if (launchParams?.processId) {
            await closeOpenFinRVM();
        }
    } catch {}

    if (tempProfileDataDir) {
        logInfo("Removing temp data dir", tempProfileDataDir);
        try {
            await fs.rm(tempProfileDataDir, { recursive: true });
        } catch {}
    }

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(exitCode);
}
