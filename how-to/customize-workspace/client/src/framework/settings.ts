import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { getDefaultHelpers } from "./modules";
import type { ModuleHelpers } from "./shapes";
import type { CustomSettings } from "./shapes/setting-shapes";

let settings: CustomSettings;
let validManifestHosts: string[];
const logger = createLogger("Settings");

export async function getConfiguredSettings(): Promise<CustomSettings> {
	const app = await fin.Application.getCurrent();
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}

async function getValidHosts(validationUrl: string): Promise<string[]> {
	if (validManifestHosts === undefined) {
		const manifestHostsPath = validationUrl;
		try {
			logger.info(`Getting valid hosts for initial settings from ${manifestHostsPath}`);
			const resp = await fetch(manifestHostsPath);
			const jsonResults: string[] = await resp.json();
			validManifestHosts = jsonResults;
		} catch {
			logger.info(`Valid hosts endpoint (${manifestHostsPath}) not provided.`);
			validManifestHosts = [];
		}
	}
	return validManifestHosts;
}

export async function getSettings(): Promise<CustomSettings> {
	if (settings === undefined) {
		const manifestSettings = await getConfiguredSettings();
		const moduleHelpers: ModuleHelpers = getDefaultHelpers(manifestSettings);
		await endpointProvider.init(manifestSettings.endpointProvider, moduleHelpers);
		if (endpointProvider.hasEndpoint("platform-settings")) {
			logger.info("platform-settings endpoint specified. Fetching platform settings.");
			const serverSettings = await endpointProvider.requestResponse<unknown, CustomSettings>(
				"platform-settings"
			);
			logger.info("Merging platform-settings over manifest settings.");
			settings = { ...manifestSettings, ...serverSettings };
		} else {
			logger.info("Settings based on manifest settings.");
			settings = manifestSettings;
		}
	}
	return settings;
}

export async function isValid() {
	logger.info("Validating source of initial settings");
	const host = window.location.href.toLowerCase();
	const possibleHosts = ["platform/provider.html", "provider.html", "shell/shell.html", "shell.html"];
	const hostPage = possibleHosts.find((h) => host.endsWith(h));

	let validationUrl: string;
	let validHosts: string[] = [];

	if (hostPage !== undefined) {
		validationUrl = host.replace(hostPage, "manifest-hosts.json");
		logger.info("Using hosts validation url:", validationUrl);
		validHosts = await getValidHosts(validationUrl);
	}

	const app = await fin.Application.getCurrent();
	const info = await app.getInfo();
	const manifestUrl = info.manifestUrl;
	logger.info(`Source of initial settings: ${manifestUrl}`);

	const url = new URL(manifestUrl);
	const sourceUrl = new URL(location.href);
	if (!validHosts.includes(sourceUrl.hostname)) {
		logger.info("Adding current host to the list of valid hosts:", sourceUrl.hostname);
		validHosts.push(sourceUrl.hostname);
	}
	logger.info(`Checking manifest host: ${url.hostname} vs valid list: ${JSON.stringify(validHosts)}`);
	const isValidHost = validHosts.includes(url.hostname);
	if (isValidHost) {
		logger.info("The source of the initial settings is valid");
	} else {
		logger.warn(
			`The source of the initial settings ${manifestUrl} does not match any of the valid host names. Please update the list if required.`
		);
	}
	return isValidHost;
}
