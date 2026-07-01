import { getCurrentSync } from "@openfin/workspace-platform";
import { getConnectedApps } from "./connections";
import { addDirectoryEndpoint, init as directoryInit, getPlatformApps } from "./directory";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import { MANIFEST_TYPES } from "./manifest-types";
import type {
	AppFilterOptions,
	AppProviderOptions,
	PlatformApp,
	PreferenceName,
	UpdatableLaunchPreferenceDefinition
} from "./shapes/app-shapes";
import type { EndpointProvider } from "./shapes/endpoint-shapes";
import { isEmpty, isNumber, isString, randomUUID } from "./utils";
import { getCanDownloadAppAssets, getCanLaunchExternalProcess } from "./utils-capability";

const logger = createLogger("Apps");

let cachedApps: PlatformApp[] = [];
let cacheDuration: number = 0;
let cacheRetrievalStrategy: "on-demand" | "interval" = "on-demand";
let lastCacheUpdate: number = 0;
let isInitialized: boolean = false;
let supportedManifestTypes: string[];
let updatableLaunchPreference: UpdatableLaunchPreferenceDefinition[];
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
				if (isString(endpointId)) {
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

		updatableLaunchPreference = options?.updatableLaunchPreference ?? [];

		cacheRetrievalStrategy = options?.cacheRetrievalStrategy ?? cacheRetrievalStrategy;
		if (cacheDuration > 0 && cacheRetrievalStrategy === "interval") {
			let updateInProgress = false;
			window.setInterval(async () => {
				if (!updateInProgress) {
					updateInProgress = true;
					try {
						await getEntries();
					} finally {
						updateInProgress = false;
					}
				}
			}, cacheDuration);
		}
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
 * Checks to see if a launchPreference is updatable on an app.
 * @param app The app to check.
 * @param name The name of the preference.
 * @returns The preference if it is updatable.
 */
export function isAppPreferenceUpdatable(
	app: PlatformApp,
	name: PreferenceName
): UpdatableLaunchPreferenceDefinition | undefined {
	if (Array.isArray(app?.launchPreference?.options?.updatable)) {
		for (const preference of app.launchPreference.options.updatable) {
			if (preference.name === name) {
				return preference;
			}
		}
	}
	if (Array.isArray(updatableLaunchPreference)) {
		return updatableLaunchPreference.find((preference) => preference.name === name);
	}
	return undefined;
}

/**
 * Get the list of apps from the specified entries.
 * @returns The app entries.
 */
async function getEntries(): Promise<PlatformApp[]> {
	if (isEmpty(getEntriesResolvers)) {
		let performRequest = true;
		if (cacheRetrievalStrategy === "on-demand") {
			performRequest = false;

			const now = Date.now();
			if (now - lastCacheUpdate > cacheDuration) {
				lastCacheUpdate = now;
				performRequest = true;
			}
		}

		if (performRequest) {
			getEntriesResolvers = [];

			logger.info("Apps cache expired refreshing");

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

			const lastCachedAppsJson = JSON.stringify(cachedApps);

			cachedApps = await validateEntries(apps);

			if (getEntriesResolvers.length > 0) {
				logger.info("Resolving getEntry promises");

				for (const getEntriesResolver of getEntriesResolvers) {
					getEntriesResolver(cachedApps);
				}
			}

			getEntriesResolvers = undefined;

			const cachedAppJson = JSON.stringify(cachedApps);

			if (cachedAppJson !== lastCachedAppsJson) {
				const platform = getCurrentSync();
				await fireLifecycleEvent(platform, "apps-changed");
			}
		}

		return cachedApps;
	}

	return new Promise<PlatformApp[]>((resolve) => {
		if (getEntriesResolvers) {
			logger.info("Storing getEntry resolver");
			getEntriesResolvers.push(resolve);
		} else {
			resolve(cachedApps);
		}
	});
}

/**
 * Validate the list of app entries against supported manifest types and permissions.
 * @param apps The list of apps to validation.
 * @returns The list of validated apps.
 */
async function validateEntries(apps: PlatformApp[]): Promise<PlatformApp[]> {
	const hasLaunchExternalProcess = await getCanLaunchExternalProcess(logger);
	const hasDownloadAppAssets = await getCanDownloadAppAssets(logger);

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
