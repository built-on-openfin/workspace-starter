const path = require("path");
const { Builder } = require("selenium-webdriver");
const chromedriver = require("chromedriver");
const childProcess = require('child_process');
const { SeleniumWebDriver, OpenFinSystem } = require('@openfin/automation-helpers');
const fkill = require('fkill');
const Mocha = require('mocha');

// Note
// The version of the chromedriver in the package.json should match the runtime version from the app manifest.
// e.g. if the manifest runtime version is 23.96.68.3 then the chromedriver version should be "96.0.0"
const testManifestUrl = "https://built-on-openfin.github.io/workspace-starter/workspace/v6.0.0/register-with-home/manifest.fin.json"

const CHROME_DRIVER_PORT = 5555;
const DEV_TOOLS_PORT = 9191;

async function run() {
    let seleniumDriver;
    try {
        // Remove old instances of the RVM and chromedriver to avoid conflicts
        await cleanupRVM();
        await fkill("chromedriver.exe", { silent: true, force: true, tree: true, ignoreCase: true });

        // Spawn the OpenFin runtime with a specific debugging port and also
        // configure the selenium web driver to use the same port for debugger address
        console.log("Start OpenFin Runtime");
        childProcess.spawn(
            path.join(process.env.LocalAppData, 'OpenFin\\OpenFinRVM.exe'),
            [
                '--config=' + testManifestUrl,
                `--runtime-arguments="--remote-debugging-port=${DEV_TOOLS_PORT}"`
            ],
            { shell: true }
        );

        // Configure the chromedriver on a specific port and also communicate
        // this to the selenium driver
        await chromedriver.start([`--port=${CHROME_DRIVER_PORT}`], true);

        // Start the selenium webdriver with the ports for debugging and chrome driver
        console.log("Building the selenium webdriver");
        seleniumDriver = new Builder()
            .usingServer('http://localhost:' + CHROME_DRIVER_PORT)
            .withCapabilities({
                'goog:chromeOptions': {
                    debuggerAddress: 'localhost:' + DEV_TOOLS_PORT
                }
            })
            .forBrowser("chrome")
            .build();

        // Set the webdriver in the global namespace to that any test helper methods
        // can access it directly, this will also set a global seleniumWebDriver 
        // which can be use in tests to access the raw selenium methods
        globalThis.webDriver = new SeleniumWebDriver(seleniumDriver);

        console.log("Waiting for OpenFin runtime to be available...");
        await OpenFinSystem.waitForReady(10000);

        await runMochaTests();
    } finally {
        try {
            await cleanupRVM();
            await seleniumDriver.quit();
            await chromedriver.stop();
        } catch { }
    }
}

async function runMochaTests() {
    return new Promise((resolve, reject) => {
        console.log();
        console.log("Running Tests with Mocha");
        console.log();

        const mocha = new Mocha();
        mocha.timeout(60000);

        mocha.addFile('./test/index.spec.js');

        mocha.run(resolve);
    });
}

async function cleanupRVM() {
    await fkill("OpenFinRVM.exe", { silent: true, force: true, tree: true, ignoreCase: true });
    await fkill("OpenFin.exe", { silent: true, force: true, tree: true, ignoreCase: true });
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));