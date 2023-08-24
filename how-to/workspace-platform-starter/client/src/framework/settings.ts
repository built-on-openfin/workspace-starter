import type OpenFin from "@openfin/core";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { getDefaultHelpers } from "./modules";
import type { ModuleHelpers } from "./shapes";
import type { CustomSettings } from "./shapes/setting-shapes";
import { isEmpty } from "./utils";

let customSettings: CustomSettings | undefined;
const logger = createLogger("Settings");

/**
 * Load the customSettings section from the application manifest.
 * @returns The custom settings from the manifest.
 */
export async function getManifestCustomSettings(): Promise<CustomSettings> {
	const app = await fin.Application.getCurrent();
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}

/**
 * Get the settings for the application, either from manifest or settings endpoint.
 * @returns The custom settings for the application.
 */
export async function getSettings(): Promise<CustomSettings> {
	if (isEmpty(customSettings)) {
		// Get the settings from the manifest
		customSettings = await getManifestCustomSettings();

		// If the manifest has endpoint support then see if there is a settings endpoint
		// that we can load additional settings from
		if (customSettings.endpointProvider) {
			const moduleHelpers: ModuleHelpers = getDefaultHelpers();
			await endpointProvider.init(customSettings.endpointProvider, moduleHelpers);

			if (endpointProvider.hasEndpoint("platform-settings")) {
				logger.info("platform-settings endpoint specified. Fetching platform settings.");
				const serverSettings = await endpointProvider.requestResponse<unknown, CustomSettings>(
					"platform-settings"
				);
				logger.info("Merging platform-settings over manifest settings.");
				customSettings = { ...customSettings, ...serverSettings };
				return customSettings;
			}
		}

		logger.info("Settings based on manifest settings.");
	}

	return customSettings;
}

/**
 * Check that the manifest has been loaded from one of the valid hosts.
 * @returns True if the host is valid.
 */
export async function isValidHostForManifest(): Promise<boolean> {
	logger.info("Validating source of initial settings");
	const host = window.location.href.toLowerCase();
	const possibleHosts = ["platform/provider.html", "provider.html", "shell/shell.html", "shell.html"];
	const hostPage = possibleHosts.find((h) => host.endsWith(h));

	let validationUrl: string;
	let validHosts: string[] = [];

	if (!isEmpty(hostPage)) {
		validationUrl = host.replace(hostPage, "manifest-hosts.json");
		logger.info("Using hosts validation url:", validationUrl);
		validHosts = await getValidHosts(validationUrl);
	}

	const app = await fin.Application.getCurrent();
	const info = await app.getInfo();
	const manifestUrl = info.manifestUrl;
	logger.info(`Source of initial settings: ${manifestUrl}`);

	let sourceUrlHostName = matchUrl(location.href, validHosts);
	if (isEmpty(sourceUrlHostName)) {
		sourceUrlHostName = location.hostname;
		logger.info("Adding current host to the list of valid hosts:", sourceUrlHostName);
		validHosts.push(sourceUrlHostName);
	}

	const urlHostName = matchUrl(manifestUrl, validHosts);
	logger.info(`Checking manifest host: ${urlHostName} vs valid list: ${JSON.stringify(validHosts)}`);
	if (urlHostName) {
		logger.info("The source of the initial settings is valid");
	} else {
		logger.warn(
			`The source of the initial settings ${manifestUrl} does not match any of the valid host names. Please update the list if required.`
		);
	}
	return !isEmpty(urlHostName);
}

/**
 * Match a url to the valid hosts.
 * @param url The url to try and match.
 * @param validHosts The list of valid hosts.
 * @returns The valid part of the name if it matches.
 */
function matchUrl(url: string, validHosts: string[]): string | undefined {
	if (url.startsWith("file:///")) {
		const path = url.replace("file:///", "").toLowerCase();
		return validHosts.some((vh) => path.startsWith(vh.toLowerCase())) ? path : undefined;
	}
	const u = new URL(url);
	return validHosts.includes(u.hostname) ? u.hostname : undefined;
}

/**
 * Get a list of the valid hosts from the endpoint.
 * @param validationUrl The url to load the host lists from.
 * @returns A list of the valid hosts.
 */
async function getValidHosts(validationUrl: string): Promise<string[]> {
	const manifestHostsPath = validationUrl;
	try {
		logger.info(`Getting valid hosts for initial settings from ${manifestHostsPath}`);
		const resp = await fetch(manifestHostsPath);
		const jsonResults: string[] = await resp.json();
		return jsonResults;
	} catch {
		logger.info(`Valid hosts endpoint (${manifestHostsPath}) not provided.`);
		return [];
	}
}
