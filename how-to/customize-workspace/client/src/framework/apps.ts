import { getConnectedApps } from "./connections";
import { addDirectory, getPlatformApps, init as directoryInit } from "./directory";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";

import type { AppFilterOptions, AppProviderOptions, AppsForIntent, PlatformApp } from "./shapes/app-shapes";
import type { EndpointProvider } from "./shapes/endpoint-shapes";
import type { AppIntents } from "./shapes/fdc3-2-0-shapes";
import { randomUUID } from "./uuid";

const logger = createLogger("Apps");

let cachedApps: PlatformApp[];
let cacheDuration = 0;
let isInitialized = false;
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
		const manifestType = apps[i].manifestType;
		if (supportedManifestTypes !== undefined && supportedManifestTypes.length > 0) {
			validApp = supportedManifestTypes.includes(manifestType);
		}

		if (validApp) {
			if (
				manifestType !== manifestTypes.external.id &&
				manifestType !== manifestTypes.inlineExternal.id &&
				manifestType !== manifestTypes.appasset.id &&
				manifestType !== manifestTypes.inlineAppAsset.id
			) {
				validatedApps.push(apps[i]);
			} else if (!hasLaunchExternalProcess) {
				rejectedAppIds.push(apps[i].appId);
			} else if (
				(manifestType === manifestTypes.appasset.id || manifestType === manifestTypes.inlineAppAsset.id) &&
				!hasDownloadAppAssets
			) {
				rejectedAppIds.push(apps[i].appId);
			} else {
				validatedApps.push(apps[i]);
			}
		} else {
			logger.warn("Application is not in the list of supported manifest types", apps[i].appId, manifestType);
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

async function getEntries(cache?: number): Promise<PlatformApp[]> {
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
	name: string,
	displayName: string,
	app: PlatformApp
) {
	if (source[name] === undefined) {
		// in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
		// or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
		source[name] = {
			intent: {
				name,
				displayName
			},
			apps: []
		};
	}
	source[name].apps.push(app);
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
			for (const url of appUrls) {
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
		for (const endpointId of endpointIds) {
			if (typeof endpointId === "string") {
				if (endpointId.startsWith("http")) {
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
	supportedManifestTypes = options?.manifestTypes ?? [];
}

export async function getApps(appFilter: AppFilterOptions = {}): Promise<PlatformApp[]> {
	logger.info("Requesting apps");
	try {
		const apps = cachedApps ?? (await getEntries(cacheDuration));
		if (appFilter.private !== undefined && appFilter.autostart !== undefined) {
			return apps.filter((appToFilter) => {
				const isPrivate = appToFilter.private ?? false;
				const autostart = appToFilter.autostart ?? false;
				return appFilter.private === isPrivate && appFilter.autostart === autostart;
			});
		}
		if (appFilter.private !== undefined) {
			return apps.filter((appToFilter) => {
				const isPrivate = appToFilter.private ?? false;
				return appFilter.private === isPrivate;
			});
		}
		if (appFilter.autostart !== undefined) {
			return apps.filter((appToFilter) => {
				const autostart = appToFilter.autostart ?? false;
				return appFilter.autostart === autostart;
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
	let lookupId;
	if (requestedApp !== undefined) {
		if (typeof requestedApp === "string") {
			lookupId = requestedApp;
		} else {
			lookupId = requestedApp.appId;
		}
	}
	if (lookupId === undefined) {
		return undefined;
	}
	let app = apps.find((entry) => entry.appId === lookupId);

	if (app === undefined) {
		app = apps.find((entry) => entry.name === lookupId);
		logger.info(
			`App not found when using lookup id: ${lookupId} against appId. Fell back to name to see if it is a reference against name. App found: ${
				app !== undefined
			}`
		);
	}

	return app;
}

export async function getAppsByIntent(intent: string): Promise<PlatformApp[]> {
	const apps = await getApps();
	const filteredApps = apps.filter((app) => {
		if (app.interop?.intents?.listensFor === undefined) {
			return false;
		}
		const intentNames = Object.keys(app.interop.intents.listensFor);
		for (let i = 0; i < intentNames.length; i++) {
			if (intentNames[i].toLowerCase() === intent.toLowerCase()) {
				return true;
			}
		}
		return false;
	});
	return filteredApps;
}

export async function getIntent(
	intent: string,
	contextType?: string,
	resultType?: string
): Promise<{ intent: { name: string; displayName: string }; apps: PlatformApp[] }> {
	const apps = await getApps();
	let intents: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: PlatformApp[];
		};
	} = {};

	if (Array.isArray(apps)) {
		for (const app of apps) {
			if (app.interop?.intents?.listensFor !== undefined) {
				const supportedIntents = Object.keys(app.interop.intents.listensFor);
				for (const supportedIntent of supportedIntents) {
					const appIntent = app.interop.intents.listensFor[supportedIntent];
					const include = appIntentContains(contextType, resultType, appIntent);
					if (include) {
						intents = updateEntry(intents, supportedIntent, appIntent.displayName, app);
					}
				}
			}
		}

		const results = Object.values(intents);
		if (results.length === 0) {
			logger.info(
				`No results found for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}`
			);
			return null;
		} else if (results.length === 1) {
			return results[0];
		}
		logger.warn(
			`Received more than one result for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}. Returning the first entry.`
		);
		return results[0];
	}
	logger.warn("There was no apps returned so we are unable to find apps that support an intent");
	return null;
}

export async function getIntentsByContext(
	contextType: string,
	resultType?: string
): Promise<AppsForIntent[]> {
	const apps = await getApps();
	let intents: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: PlatformApp[];
		};
	} = {};

	if (Array.isArray(apps)) {
		for (const app of apps) {
			if (app.interop?.intents?.listensFor !== undefined) {
				const supportedIntents = Object.keys(app.interop.intents.listensFor);
				for (const supportedIntent of supportedIntents) {
					const appIntent = app.interop.intents.listensFor[supportedIntent];
					const include = appIntentContains(contextType, resultType, appIntent);
					if (include) {
						intents = updateEntry(intents, supportedIntent, appIntent.displayName, app);
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

function appIntentContains(contextType: string, resultType: string, appIntent: AppIntents) {
	if (contextType !== undefined && resultType !== undefined) {
		if (!appIntent?.contexts?.includes(contextType) || !appIntent.resultType?.includes(resultType, 0)) {
			return false;
		}
	} else if (contextType !== undefined && !appIntent?.contexts?.includes(contextType)) {
		return false;
	} else if (resultType !== undefined && !appIntent?.resultType?.includes(resultType, 0)) {
		return false;
	}
	return true;
}
