const { OpenFinSystem, NodeWebDriver } = require('@openfin/automation-helpers');
const { getValue, setValue } = require('@wdio/shared-store-service');
const childProcess = require('child_process');
const fkill = require('fkill');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// The version of the chromedriver in the package.json should match the runtime version from the app manifest.
// e.g. if the manifest runtime version is 28.106.72.17 then the chromedriver version should be '106.0.0'
const manifestUrl =
	'https://built-on-openfin.github.io/workspace-starter/workspace/v10.0.0/register-with-home/manifest.fin.json';
const chromeDriverPort = 5843;
const devToolsPort = 9123;

console.log('DevTools Port', devToolsPort);
console.log('ChromeDriver Port', chromeDriverPort);
const openFinRVM = path.join(process.env.LocalAppData, 'OpenFin', 'OpenFinRVM.exe');
console.log('OpenFinRVM', openFinRVM);

let isFile = false;
try {
	const stats = fs.statSync(openFinRVM);
	isFile = stats.isFile();
} catch {}
if (!isFile) {
	console.error('ERROR: OpenFinRVM is missing, exiting...');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}

console.log('Launching OpenFinRVM');
const openFinRVMProcess = childProcess.spawn(
	openFinRVM,
	[`--config=${manifestUrl}`, `--runtime-arguments="--remote-debugging-port=${devToolsPort}"`],
	{
		shell: true
	}
);
console.log('OpenFinRVM PID', openFinRVMProcess.pid);

exports.config = {
	specs: ['./test/**/*.js'],
	capabilities: [
		{
			maxInstances: 1,
			browserName: 'chrome',
			'goog:chromeOptions': {
				debuggerAddress: `localhost:${devToolsPort}`
			}
		}
	],
	services: [['chromedriver', { port: chromeDriverPort }], 'shared-store'],
	port: chromeDriverPort,
	logLevel: 'silent', // 'debug' for more information
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000
	},
	beforeSession: async () => {
		await setValue('openFinRVMProcessPID', openFinRVMProcess.pid);

		try {
			// Cleanup the old screenshots from the last run
			await fsPromises.rm('./reports/screenshots/', { recursive: true, force: true });
		} catch {}
	},
	before: async (_, __, browser) => {
		// Set the global webdriver object used by the helpers
		globalThis.webDriver = new NodeWebDriver(browser);
		console.log('Waiting for OpenFin runtime to be available...');
		await OpenFinSystem.waitForReady(10000);
		console.log('Running Tests...');
	},
	beforeTest: async (test, context) => {
		// Set the current test name, which is used by screenshots to name the file
		globalThis.automation = globalThis.automation ?? {};
		globalThis.automation.currentTestName = test.title;
	},
	afterSession: async () => {
		const openFinRVMProcessPID = await getValue('openFinRVMProcessPID');
		console.log('Closing the OpenFin runtime', openFinRVMProcessPID);
		await fkill(openFinRVMProcessPID, { silent: true, force: true });
	}
};
