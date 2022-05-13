const { getValue, setValue } = require('@wdio/shared-store-service');
const { OpenFinSystem, NodeWebDriver } = require("@openfin/automation-helpers");
const childProcess = require('child_process');
const path = require("path");

// The version of the chromedriver in the package.json should match the runtime version from the app manifest.
// e.g. if the manifest runtime version is 23.96.68.3 then the chromedriver version should be "96.0.0"
const manifestUrl = "https://built-on-openfin.github.io/workspace-starter/workspace/v6.0.0/register-with-home/manifest.fin.json"
const chromeDriverPort = getRandomPort(5000, 5999);
const devToolsPort = getRandomPort(9000, 9999);

function getRandomPort(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.config = {
    specs: [
        './test/**/*.js'
    ],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        "goog:chromeOptions": {

            debuggerAddress: `localhost:${devToolsPort}`
        }
    }],
    services: [
        ['chromedriver', { port: chromeDriverPort }],
        'shared-store'
    ],
    port: chromeDriverPort,
    logLevel: "silent",
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: async () => {
        console.log("Launching OpenFinRVM");
        const openFinRVMProcess = childProcess.spawn(
            path.join(process.env.LocalAppData, 'OpenFin\\OpenFinRVM.exe'),
            [
                '--config=' + manifestUrl,
                `--runtime-arguments="--remote-debugging-port=${devToolsPort}"`
            ],
            { shell: true }
        );
        await setValue("openFinRVMProcessPID", openFinRVMProcess.pid);
    },
    before: async (_, __, browser) => {
        globalThis.webDriver = new NodeWebDriver(browser);
        console.log("Waiting for OpenFin runtime to be available...");
        await OpenFinSystem.waitForReady(10000);
    },
    afterSession: async () => {
        const openFinRVMProcessPID = await getValue("openFinRVMProcessPID");
        console.log("Closing the OpenFin runtime", openFinRVMProcessPID);
        childProcess.spawn("taskkill", ["/pid", openFinRVMProcessPID, '/f', '/t']);
    }
};
