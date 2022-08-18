import { logger } from "./logger-provider";
import { CustomSettings } from "./shapes";

let settings: CustomSettings;

async function getConfiguredSettings(): Promise<CustomSettings> {
	const app = await fin.Application.getCurrent();
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();

	if (manifest.customSettings !== undefined) {
		settings = manifest.customSettings;
	} else {
		settings = {};
	}

	return settings;
}

export async function getSettings(): Promise<CustomSettings> {
	if (settings === undefined) {
		settings = await getConfiguredSettings();
	}
	return settings;
}

export async function isValid() {
	logger.info("Settings", "Validating source of initial settings");
	const app = await fin.Application.getCurrent();
	const info = await app.getInfo();
	const manifestUrl = info.manifestUrl;
	logger.info("Settings", `Source of initial settings: ${manifestUrl}`);
	// this check could be removed or it could be dynamically generated as part of the code or passed made available from the server
	// that hosts the code. It couldn't be from the manifest itself as it is validating where the manifest is coming from.
	const validHosts = [
		"localhost",
		"127.0.0.1",
		"built-on-openfin.github.io",
		"openfin.github.io",
		"samples.openfin.co",
		"cdn.openfin.co"
	];
	const url = new URL(manifestUrl);
	logger.info("Settings", `Checking host: ${url.hostname} vs valid list: ${JSON.stringify(validHosts)}`);
	const isValidHost = validHosts.includes(url.hostname);
	if (isValidHost) {
		logger.info("Settings", "The source of the initial settings is valid");
	} else {
		logger.warn(
			"Settings",
			`The source of the initial settings ${manifestUrl} does not match any of the valid host names. Please update the list if required.`
		);
	}
	return isValidHost;
}
