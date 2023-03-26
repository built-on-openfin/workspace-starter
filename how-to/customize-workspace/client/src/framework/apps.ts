import { getConnectedApps } from "./connections";
import { addDirectory, getPlatformApps, init as directoryInit } from "./directory";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";

import type {
	AppFilterOptions,
	AppProviderOptions,
	AppsForIntent,
	PlatformApp
} from "./shapes/app-shapes";
import type { EndpointProvider } from "./shapes/endpoint-shapes";
import { randomUUID } from "./uuid";

const logger = createLogger("Apps");

let cachedApps: PlatformApp[];
let cacheDuration = 0;
let isInitialized = false;
let appAssetTag: string = "appasset";
let supportedManifestTypes: string[] = [];
let canLaunchExternalProcess: boolean;
let canDownloadAppAssets: boolean;

async function getCanLaunchExternalProcess() {
	if (canLaunchExternalProcess === undefined) {
		let canLaunchExternalProcessResponse;

		try {
			canLaunchExternalProcessResponse = await fin.System.queryPermissionForCurrentContext(
				"System.launchExternalProcess"
			);

			canLaunchExternalProcess = canLaunchExternalProcessResponse?.granted;
		} catch (error) {
			logger.error("Error while querying for System.launchExternalProcess permission", error);
			canLaunchExternalProcess = false;
		}
	}
	return canLaunchExternalProcess;
}

async function getCanDownloadAppAssets() {
	if (canDownloadAppAssets === undefined) {
		let canDownloadAppAssetsResponse;

		try {
			canDownloadAppAssetsResponse = await fin.System.queryPermissionForCurrentContext(
				"System.downloadAsset"
			);
			canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;
		} catch (error) {
			logger.error("Error while querying for System.downloadAsset permission", error);
			canDownloadAppAssets = false;
		}
	}
	return canDownloadAppAssets;
}

async function validateEntries(apps: PlatformApp[]) {
	const hasLaunchExternalProcess = await getCanLaunchExternalProcess();
	const hasDownloadAppAssets = await getCanDownloadAppAssets();

	const validatedApps: PlatformApp[] = [];
	const rejectedAppIds = [];

	for (let i = 0; i < apps.length; i++) {
		let validApp = true;
		if (supportedManifestTypes !== undefined && supportedManifestTypes.length > 0) {
			validApp = supportedManifestTypes.includes(apps[i].manifestType);
		}

		if (validApp) {
			if (apps[i].manifestType !== manifestTypes.external.id) {
				validatedApps.push(apps[i]);
			} else if (!hasLaunchExternalProcess) {
				rejectedAppIds.push(apps[i].appId);
			} else if (Array.isArray(apps[i].tags) && apps[i].tags.includes(appAssetTag) && !hasDownloadAppAssets) {
				rejectedAppIds.push(apps[i].appId);
			} else {
				validatedApps.push(apps[i]);
			}
		}
	}

	if (rejectedAppIds.length > 0) {
		logger.warn(
			"Not passing the following list of applications as they will not be able to run on this machine due to missing permissions. Alternatively this logic could be moved to the launch function where a selection is not launched but the user is presented with a modal saying they can't launch it due to permissions",
			rejectedAppIds
		);
	}

	return validatedApps;
}

async function getEntries(
	cache?: number
): Promise<PlatformApp[]> {
	const apps: PlatformApp[] = [];
	try {
		logger.info("Getting directory apps.");
		const directoryApps = await getPlatformApps();
		apps.push(...directoryApps);
		logger.info("Getting connected apps.");
		const connectedApps = await getConnectedApps();
		if (connectedApps.length > 0) {
			logger.info(`Adding ${connectedApps.length} apps from connected apps to the apps list to be validated`);
			apps.push(...connectedApps);
		}
	} catch (error) {
		logger.error("Error fetching apps.", error);
	}

	cachedApps = await validateEntries(apps);

	if (cache !== undefined && cache !== 0) {
		setTimeout(() => {
			logger.info("Clearing cache of apps as cache duration has passed");
			cachedApps = undefined;
		}, cache);
	}

	return cachedApps;
}

function updateEntry(
	source: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: PlatformApp[];
		};
	},
	intent,
	app: PlatformApp
) {
	if (source[intent.name] === undefined) {
		// in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
		// or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
		source[intent.name] = {
			intent: {
				name: intent.name,
				displayName: intent.displayName
			},
			apps: []
		};
	}
	source[intent.name].apps.push(app);
	return source;
}

export async function init(options: AppProviderOptions, endpointProvider: EndpointProvider) {
	if (isInitialized) {
		logger.warn("The app service is already initialized");
		return;
	}
	isInitialized = true;
	await directoryInit(endpointProvider);

	if (options?.appsSourceUrl !== undefined) {
		// backward compatibility support
		logger.info(
			"Using appsSourceUrl as it was specified. Backwards compatibility mode. Try to use the endpointIds setting instead and define some endpoints"
		);
		if (Array.isArray(options?.appsSourceUrl)) {
			logger.info("appsSourceUrl specified as an array of urls");
			const appUrls: string[] = options?.appsSourceUrl || [];
			for(const url of appUrls) {
				addDirectory({
					id: randomUUID(),
					url: { path: url, credentials: options?.includeCredentialOnSourceRequest }
				});
			}
		} else {
			logger.info("appsSourceUrl specified as a single url");
			addDirectory({
				id: randomUUID(),
				url: { path: options?.appsSourceUrl, credentials: options?.includeCredentialOnSourceRequest }
			});
		}
	} else if (Array.isArray(options?.endpointIds)) {
		logger.info("Using the following passed endpoints", options?.endpointIds);
		const endpointIds = options?.endpointIds || [];
		for(const endpointId of endpointIds) {
			if(typeof endpointId === "string") {
				if(endpointId.startsWith("http")) {
					addDirectory({
						id: randomUUID(),
						url: { path: endpointId, credentials: options?.includeCredentialOnSourceRequest }
					});
				} else {
					addDirectory({
						id: randomUUID(),
						endpointId
					});
				}
			} else {
				addDirectory({
					id: randomUUID(),
					map: endpointId
				});
			}
		}
	}

	if (options?.cacheDurationInSeconds !== undefined) {
		cacheDuration += options?.cacheDurationInSeconds * 1000;
	}

	if (options?.cacheDurationInMinutes !== undefined) {
		cacheDuration += options?.cacheDurationInMinutes * 60 * 1000;
	}
	appAssetTag = options?.appAssetTag ?? "appasset";
	supportedManifestTypes = options?.manifestTypes ?? [];
}

export async function getApps(appFilter: AppFilterOptions = {}): Promise<PlatformApp[]> {
	logger.info("Requesting apps");
	try {
		const apps = cachedApps ?? (await getEntries(cacheDuration));
		if (appFilter.private !== undefined) {
			return apps.filter((appToFilter) => {
				const isPrivate = appToFilter.private ?? false;
				return appFilter.private === isPrivate;
			});
		}
		return apps;
	} catch (err) {
		logger.error("Error retrieving apps. Returning empty list", err);
		return [];
	}
}

export async function getAppsByTag(
	tags: string[],
	mustMatchAll = false,
	appFilter: AppFilterOptions = {}
): Promise<PlatformApp[]> {
	const apps = await getApps(appFilter);
	const filteredApps = apps.filter((value) => {
		if (value.tags === undefined) {
			return false;
		}
		let matchFound = false;
		for (let i = 0; i < tags.length; i++) {
			if (value.tags.includes(tags[i])) {
				if (mustMatchAll) {
					matchFound = true;
				} else {
					return true;
				}
			} else if (mustMatchAll) {
				return false;
			}
		}
		return matchFound;
	});
	return filteredApps;
}

export async function getApp(requestedApp: string | { appId: string }): Promise<PlatformApp> {
	const apps = await getApps();
	let appId;
	if (requestedApp !== undefined) {
		if (typeof requestedApp === "string") {
			appId = requestedApp;
		} else {
			appId = requestedApp.appId;
		}
	}
	if (appId === undefined) {
		return undefined;
	}
	const app = apps.find((entry) => entry.appId === appId);

	return app;
}

export async function getAppsByIntent(intent: string): Promise<PlatformApp[]> {
	const apps = await getApps();
	const filteredApps = apps.filter((value) => {
		if (value.intents === undefined) {
			return false;
		}
		for (let i = 0; i < value.intents.length; i++) {
			if (value.intents[i].name.toLowerCase() === intent.toLowerCase()) {
				return true;
			}
		}
		return false;
	});
	return filteredApps;
}

export async function getIntent(
	intent: string,
	contextType?: string
): Promise<{ intent: { name: string; displayName: string }; apps: PlatformApp[] }> {
	const apps = await getApps();
	let intents: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: PlatformApp[];
		};
	} = {};

	if (Array.isArray(apps)) {
		for (const value of apps) {
			if (value.intents !== undefined) {
				for (let i = 0; i < value.intents.length; i++) {
					if (value.intents[i].name === intent) {
						if (contextType === undefined) {
							intents = updateEntry(intents, value.intents[i], value);
						} else if (
							Array.isArray(value.intents[i].contexts) &&
							value.intents[i].contexts.includes(contextType)
						) {
							intents = updateEntry(intents, value.intents[i], value);
						}
					}
				}
			}
		}

		const results = Object.values(intents);
		if (results.length === 0) {
			logger.info(`No results found for findIntent for intent ${intent} and context ${contextType}`);
			return null;
		} else if (results.length === 1) {
			return results[0];
		}
		logger.warn(
			`Received more than one result for findIntent for intent ${intent} and context ${contextType}. Returning the first entry.`
		);
		return results[0];
	}
	logger.warn("There was no apps returned so we are unable to find apps that support an intent");
	return null;
}

export async function getIntentsByContext(contextType: string): Promise<AppsForIntent[]> {
	const apps = await getApps();
	let intents: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: PlatformApp[];
		};
	} = {};

	if (Array.isArray(apps)) {
		for (const value of apps) {
			if (value.intents !== undefined) {
				for (let i = 0; i < value.intents.length; i++) {
					if (Array.isArray(value.intents[i].contexts) && value.intents[i].contexts.includes(contextType)) {
						intents = updateEntry(intents, value.intents[i], value);
					}
				}
			}
		}

		return Object.values(intents);
	}
	logger.warn("Unable to get apps so we can not get apps and intents that support a particular context");

	return [];
}

export function getAppIcon(app: PlatformApp): string | undefined {
	if (Array.isArray(app.icons) && app.icons.length > 0) {
		return app.icons[0].src;
	}
}
