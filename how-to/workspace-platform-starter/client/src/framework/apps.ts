import { getConnectedApps } from "./connections";
import { addDirectoryEndpoint, getPlatformApps, init as directoryInit } from "./directory";
import { createLogger } from "./logger-provider";
import { MANIFEST_TYPES } from "./manifest-types";
import type { AppFilterOptions, AppProviderOptions, AppsForIntent, PlatformApp } from "./shapes/app-shapes";
import type { EndpointProvider } from "./shapes/endpoint-shapes";
import type { AppIntents } from "./shapes/fdc3-2-0-shapes";
import { isEmpty, isNumber, randomUUID } from "./utils";

const logger = createLogger("Apps");

let lastCacheUpdate: number = 0;
let cachedApps: PlatformApp[] = [];
let cacheDuration = 0;
let isInitialized: boolean = false;
let supportedManifestTypes: string[];
let getEntriesResolvers: ((apps: PlatformApp[]) => void)[] | undefined;

/**
 * Initialize the application provider.
 * @param options Options for the actions provider.
 * @param endpointProvider The endpoint provider to help retrieve apps from endpoints.
 * @returns Nothing.
 */
export async function init(
	options: AppProviderOptions | undefined,
	endpointProvider: EndpointProvider
): Promise<void> {
	if (isInitialized) {
		logger.warn("The app service is already initialized");
		return;
	}

	if (options) {
		isInitialized = true;
		await directoryInit(endpointProvider);

		if (!isEmpty(options?.appsSourceUrl)) {
			// backward compatibility support
			logger.info(
				"Using appsSourceUrl as it was specified. Backwards compatibility mode. Try to use the endpointIds setting instead and define some endpoints"
			);
			if (Array.isArray(options?.appsSourceUrl)) {
				logger.info("appsSourceUrl specified as an array of urls");
				const appUrls: string[] = options?.appsSourceUrl || [];
				for (const url of appUrls) {
					addDirectoryEndpoint({
						id: randomUUID(),
						url: { path: url, credentials: options?.includeCredentialOnSourceRequest }
					});
				}
			} else {
				logger.info("appsSourceUrl specified as a single url");
				addDirectoryEndpoint({
					id: randomUUID(),
					url: { path: options?.appsSourceUrl, credentials: options?.includeCredentialOnSourceRequest }
				});
			}
		} else if (Array.isArray(options?.endpointIds)) {
			logger.info("Using the following passed endpoints", options.endpointIds);
			for (const endpointId of options.endpointIds) {
				if (typeof endpointId === "string") {
					if (endpointId.startsWith("http")) {
						addDirectoryEndpoint({
							id: randomUUID(),
							url: { path: endpointId, credentials: options?.includeCredentialOnSourceRequest }
						});
					} else {
						addDirectoryEndpoint({
							id: randomUUID(),
							endpointId
						});
					}
				} else {
					addDirectoryEndpoint({
						id: randomUUID(),
						map: endpointId
					});
				}
			}
		}

		if (isNumber(options?.cacheDurationInSeconds)) {
			cacheDuration += options?.cacheDurationInSeconds * 1000;
		}

		if (isNumber(options?.cacheDurationInMinutes)) {
			cacheDuration += options?.cacheDurationInMinutes * 60 * 1000;
		}
		supportedManifestTypes = options?.manifestTypes ?? [];
	}
}

/**
 * Get the list of applications and filter if requested.
 * @param appFilter The options filters.
 * @returns The list of application.
 */
export async function getApps(appFilter?: AppFilterOptions): Promise<PlatformApp[]> {
	if (isInitialized) {
		logger.info("Requesting apps");

		try {
			const apps = await getEntries();

			if (appFilter) {
				if (!isEmpty(appFilter.private) && !isEmpty(appFilter.autostart)) {
					return apps.filter((appToFilter) => {
						const isPrivate = appToFilter.private ?? false;
						const autostart = appToFilter.autostart ?? false;
						return appFilter.private === isPrivate && appFilter.autostart === autostart;
					});
				}
				if (!isEmpty(appFilter.private)) {
					return apps.filter((appToFilter) => {
						const isPrivate = appToFilter.private ?? false;
						return appFilter.private === isPrivate;
					});
				}
				if (!isEmpty(appFilter.autostart)) {
					return apps.filter((appToFilter) => {
						const autostart = appToFilter.autostart ?? false;
						return appFilter.autostart === autostart;
					});
				}
			}
			return apps;
		} catch (err) {
			logger.error("Error retrieving apps. Returning empty list", err);
			return [];
		}
	} else {
		logger.warn("Calling getApps before app provider is initialized");
	}

	return [];
}

/**
 * Get the list of apps from the specified entries.
 * @returns The app entries.
 */
async function getEntries(): Promise<PlatformApp[]> {
	if (isEmpty(getEntriesResolvers)) {
		const now = Date.now();

		getEntriesResolvers = [];

		if (now - lastCacheUpdate > cacheDuration) {
			logger.info("Apps cache expired refreshing");
			lastCacheUpdate = now;

			const apps: PlatformApp[] = [];
			try {
				logger.info("Getting directory apps.");
				const directoryApps = await getPlatformApps();
				apps.push(...directoryApps);

				logger.info("Getting connected apps.");
				const connectedApps = await getConnectedApps();
				if (connectedApps.length > 0) {
					logger.info(
						`Adding ${connectedApps.length} apps from connected apps to the apps list to be validated`
					);
					apps.push(...connectedApps);
				}
			} catch (error) {
				logger.error("Error fetching apps.", error);
			}

			cachedApps = await validateEntries(apps);
		}

		if (getEntriesResolvers.length > 0) {
			logger.info("Resolving getEntry promises");

			for (const getEntriesResolver of getEntriesResolvers) {
				getEntriesResolver(cachedApps);
			}
		}

		getEntriesResolvers = undefined;
	} else {
		return new Promise<PlatformApp[]>((resolve) => {
			if (getEntriesResolvers) {
				logger.info("Storing getEntry resolver");
				getEntriesResolvers.push(resolve);
			} else {
				resolve(cachedApps);
			}
		});
	}

	return cachedApps;
}

/**
 * Validate the list of app entries against supported manifest types and permissions.
 * @param apps The list of apps to validation.
 * @returns The list of validated apps.
 */
async function validateEntries(apps: PlatformApp[]): Promise<PlatformApp[]> {
	const hasLaunchExternalProcess = await getCanLaunchExternalProcess();
	const hasDownloadAppAssets = await getCanDownloadAppAssets();

	const validatedApps: PlatformApp[] = [];
	const rejectedAppIds = [];

	for (const app of apps) {
		const manifestType = app.manifestType;

		if (manifestType) {
			let validApp = true;
			if (!isEmpty(supportedManifestTypes) && supportedManifestTypes.length > 0) {
				validApp = supportedManifestTypes.includes(manifestType);
			}

			if (validApp) {
				if (
					manifestType !== MANIFEST_TYPES.External.id &&
					manifestType !== MANIFEST_TYPES.InlineExternal.id &&
					manifestType !== MANIFEST_TYPES.Appasset.id &&
					manifestType !== MANIFEST_TYPES.InlineAppAsset.id
				) {
					validatedApps.push(app);
				} else if (!hasLaunchExternalProcess) {
					rejectedAppIds.push(app.appId);
				} else if (
					(manifestType === MANIFEST_TYPES.Appasset.id ||
						manifestType === MANIFEST_TYPES.InlineAppAsset.id) &&
					!hasDownloadAppAssets
				) {
					rejectedAppIds.push(app.appId);
				} else {
					validatedApps.push(app);
				}
			} else {
				logger.warn("Application is not in the list of supported manifest types", app.appId, manifestType);
			}
		} else {
			logger.warn("Application does not have a manifestType", app.appId);
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

/**
 * Get a list of application that match the specified tags.
 * @param tags The tags to match.
 * @param mustMatchAll The application must have all the tags,
 * @param appFilter Additional filters to apply to the list of applications.
 * @returns The list of application that match the specified tags.
 */
export async function getAppsByTag(
	tags: string[],
	mustMatchAll = false,
	appFilter?: AppFilterOptions
): Promise<PlatformApp[]> {
	const apps = await getApps(appFilter);

	return apps.filter((value) => {
		if (isEmpty(value.tags)) {
			return false;
		}
		let matchFound = false;
		for (const tag of tags) {
			if (value.tags.includes(tag)) {
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
}

/**
 * The the app by its id.
 * @param appId The id of the requested app.
 * @returns The app if it was found.
 */
export async function getApp(appId: string): Promise<PlatformApp | undefined> {
	if (!appId) {
		return undefined;
	}

	const apps = await getApps();
	let app = apps.find((entry) => entry.appId === appId);

	if (isEmpty(app)) {
		app = apps.find((entry) => entry.name === appId);
		logger.info(
			`App not found when using lookup id: ${appId} against appId. Fell back to name to see if it is a reference against name. App found: ${!isEmpty(
				app
			)}`
		);
	}

	return app;
}

/**
 * Get the application that support the requested intent.
 * @param intent The intent the application must support.
 * @returns The list of application that support the intent.
 */
export async function getAppsByIntent(intent: string): Promise<PlatformApp[]> {
	const apps = await getApps();
	return apps.filter((app) => {
		const listensFor = app.interop?.intents?.listensFor;

		if (isEmpty(listensFor)) {
			return false;
		}
		const intentNames = Object.keys(listensFor);
		for (const intentName of intentNames) {
			if (intentName.toLowerCase() === intent.toLowerCase()) {
				return true;
			}
		}
		return false;
	});
}

/**
 * Get an intent and the apps that support it.
 * @param intent The intent to look for.
 * @param contextType Optional context type to look for.
 * @param resultType Optional result type to look for.
 * @returns The intent and its supporting apps if found.
 */
export async function getIntent(
	intent: string,
	contextType?: string,
	resultType?: string
): Promise<AppsForIntent | undefined> {
	const apps = await getApps();

	if (apps.length === 0) {
		logger.warn("There was no apps returned so we are unable to find apps that support an intent");
		return;
	}

	const intentsMap: { [key: string]: AppsForIntent } = {};

	for (const app of apps) {
		if (app.interop?.intents?.listensFor) {
			const supportedIntents = Object.keys(app.interop.intents.listensFor);
			for (const supportedIntent of supportedIntents) {
				const appIntent = app.interop.intents.listensFor[supportedIntent];
				const include = appIntentContains(appIntent, contextType, resultType);
				if (include) {
					updateAppIntentsMap(intentsMap, supportedIntent, appIntent.displayName, app);
				}
			}
		}
	}

	const results = Object.values(intentsMap);
	if (results.length === 0) {
		logger.info(
			`No results found for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}`
		);
		return;
	} else if (results.length === 1) {
		return results[0];
	}

	logger.warn(
		`Received more than one result for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}. Returning the first entry.`
	);
	return results[0];
}

/**
 * Get the apps that support intents by the context type.
 * @param contextType The context type the app must support.
 * @param resultType The optional result type to match as well.
 * @returns The apps for the specified intent.
 */
export async function getIntentsByContext(
	contextType: string,
	resultType?: string
): Promise<AppsForIntent[]> {
	const apps = await getApps();

	if (apps.length === 0) {
		logger.warn("Unable to get apps so we can not get apps and intents that support a particular context");
		return [];
	}

	const intents: { [key: string]: AppsForIntent } = {};

	for (const app of apps) {
		const listensFor = app.interop?.intents?.listensFor;

		if (!isEmpty(listensFor)) {
			const supportedIntents = Object.keys(listensFor);
			for (const supportedIntent of supportedIntents) {
				const appIntent = listensFor[supportedIntent];
				const include = appIntentContains(appIntent, contextType, resultType);
				if (include) {
					updateAppIntentsMap(intents, supportedIntent, appIntent.displayName, app);
				}
			}
		}
	}

	return Object.values(intents);
}

/**
 * Check to see if the supplied appIntent supports the context and result types.
 * @param appIntent The app intent to check.
 * @param contextType The optional context type to look for.
 * @param resultType The optional result type to look for.
 * @returns True if the app intent matches.
 */
function appIntentContains(
	appIntent: AppIntents,
	contextType: string | undefined,
	resultType: string | undefined
): boolean {
	if (!isEmpty(contextType) && !isEmpty(resultType)) {
		if (!appIntent?.contexts?.includes(contextType) || !appIntent.resultType?.includes(resultType)) {
			return false;
		}
	} else if (!isEmpty(contextType) && !appIntent?.contexts?.includes(contextType)) {
		return false;
	} else if (!isEmpty(resultType) && !appIntent?.resultType?.includes(resultType)) {
		return false;
	}
	return true;
}

/**
 * Do we have the permissions to launch external processes.
 * @returns True if we have permission.
 */
async function getCanLaunchExternalProcess(): Promise<boolean> {
	let canLaunchExternalProcess = false;

	try {
		const canLaunchExternalProcessResponse = await fin.System.queryPermissionForCurrentContext(
			"System.launchExternalProcess"
		);

		canLaunchExternalProcess = canLaunchExternalProcessResponse?.granted;
	} catch (error) {
		logger.error("Error while querying for System.launchExternalProcess permission", error);
	}

	return canLaunchExternalProcess;
}

/**
 * Do we have the permissions to download app assets.
 * @returns True if we have permission.
 */
async function getCanDownloadAppAssets(): Promise<boolean> {
	let canDownloadAppAssets = false;

	try {
		const canDownloadAppAssetsResponse = await fin.System.queryPermissionForCurrentContext(
			"System.downloadAsset"
		);
		canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;
	} catch (error) {
		logger.error("Error while querying for System.downloadAsset permission", error);
	}

	return canDownloadAppAssets;
}

/**
 * Update the map containing the intent to apps.
 * @param intentsMap The map to update.
 * @param name The name of the intent.
 * @param displayName The Options display name to update with.
 * @param app The application to update.
 */
function updateAppIntentsMap(
	intentsMap: {
		[key: string]: AppsForIntent;
	},
	name: string,
	displayName: string | undefined,
	app: PlatformApp
): void {
	if (isEmpty(intentsMap[name])) {
		// in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
		// or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
		intentsMap[name] = {
			intent: {
				name,
				displayName
			},
			apps: []
		};
	}
	intentsMap[name].apps.push(app);
}
