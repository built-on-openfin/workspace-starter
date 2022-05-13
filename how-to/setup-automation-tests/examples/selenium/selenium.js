const path = require("path");
const { Builder } = require("selenium-webdriver");
const chromedriver = require("chromedriver");
const childProcess = require('child_process');
const { SeleniumWebDriver, OpenFinSystem } = require('@openfin/automation-helpers');
const Mocha = require('mocha');

async function run(manifestUrl, chromeDriverPort, devToolsPort) {
    let seleniumDriver;
    let openFinRVMProcess
    try {
        // Spawn the OpenFin runtime with a specific debugging port and also
        // configure the selenium web driver to use the same port for debugger address
        console.log("Start OpenFin Runtime");
        openFinRVMProcess = childProcess.spawn(
            path.join(process.env.LocalAppData, 'OpenFin\\OpenFinRVM.exe'),
            [
                '--config=' + manifestUrl,
                `--runtime-arguments="--remote-debugging-port=${devToolsPort}"`
            ],
            { shell: true }
        );

        // Configure the chromedriver on a specific port and also communicate
        // this to the selenium driver
        await chromedriver.start([`--port=${chromeDriverPort}`], true);

        // Start the selenium webdriver with the ports for debugging and chrome driver
        // This allows for greater flexibility in term of configuration
        // but you could just call startSession on the SeleniumWebDriver
        console.log("Building the selenium webdriver");
        seleniumDriver = new Builder()
            .usingServer('http://localhost:' + chromeDriverPort)
            .withCapabilities({
                'goog:chromeOptions': {
                    debuggerAddress: 'localhost:' + devToolsPort
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
            if (openFinRVMProcess) {
                childProcess.spawn("taskkill", ["/pid", openFinRVMProcess.pid, '/f', '/t']);
            }
            if (seleniumDriver) {
                await seleniumDriver.quit();
            }
            chromedriver.stop();
        } catch (err) { 
            console.error(err);
        }
    }
}

async function runMochaTests() {
    return new Promise((resolve, reject) => {
        console.log();
        console.log("Running Tests with Mocha");

        const mocha = new Mocha();
        mocha.timeout(60000);

        mocha.addFile('./test/index.spec.js');

        mocha.run(resolve);
    });
}

function getRandomPort(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The version of the chromedriver in the package.json should match the runtime version from the app manifest.
// e.g. if the manifest runtime version is 23.96.68.3 then the chromedriver version should be "96.0.0"
const testManifestUrl = "https://built-on-openfin.github.io/workspace-starter/workspace/v6.0.0/register-with-home/manifest.fin.json"
const chromeDriverPort = getRandomPort(5000, 5999);
const devToolsPort = getRandomPort(9000, 9999);

// These parameters could be supplied through command line options
run(testManifestUrl, chromeDriverPort, devToolsPort)
    .then(() => console.log("Done"))
    .catch(err => console.error(err));