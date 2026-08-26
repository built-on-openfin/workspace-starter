import { defineConfig } from "@playwright/test";
import { isLocalUrl } from "@openfin/automation-core";
import { loadOpenFinConfig } from "./openfin.cdp-config";

const config = await loadOpenFinConfig();

const webServer = isLocalUrl(config.manifestUrl)
	? {
			command: config.preLaunchCommand,
			url: config.manifestUrl,
			timeout: 120000,
			reuseExistingServer: !process.env.CI,
			cwd: config.configDir
		}
	: undefined;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: false,
	workers: 1,
	retries: 0,
	reporter: "list",
	timeout: 120000,
	webServer,
	globalSetup: "./global-setup.ts",
	globalTeardown: "./global-teardown.ts",
	use: {
		trace: "on"
	}
});
