import type OpenFin from "@openfin/core";
import type { App, AppIntent } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";
import type { AppProviderSettings } from "./shapes";

let lastCacheUpdate: number = 0;
let cachedApps: App[] = [];

/**
 * Load the apps from the json feeds configured in the custom settings.
 * @param appSettings The app settings from the manifest.
 * @returns The list of apps.
 */
export async function getApps(appSettings: AppProviderSettings | undefined): Promise<App[]> {
	if (appSettings) {
		const cacheDurationInMinutes = appSettings?.cacheDurationInMinutes ?? 1;
		const now = Date.now();
		if (now - lastCacheUpdate > cacheDurationInMinutes * 60 * 1000) {
			lastCacheUpdate = now;

			console.log("Requesting apps.");
			try {
				let apps: App[] = [];

				if (appSettings?.appSourceUrls) {
					for (const url of appSettings.appSourceUrls) {
						const response = await fetch(url, { credentials: "include" });
						const json = await response.json();
						apps = apps.concat(json as App[]);
					}
				}

				cachedApps = await validateEntries(appSettings, apps);
			} catch (err) {
				console.error("Error retrieving apps. Returning empty list.", err);
				cachedApps = [];
			}
		}
	} else {
		console.warn("No appProvider settings in the manifest");
	}

	return cachedApps;
}

/**
 * Validate that the apps have the correct permissions enabled.
 * @param appSettings The app settings from the manifest.
 * @param apps The apps the validate.
 * @returns The list of validated apps.
 */
async function validateEntries(appSettings: AppProviderSettings, apps: App[]): Promise<App[]> {
	let canLaunchExternalProcessResponse;

	try {
		canLaunchExternalProcessResponse = await fin.System.queryPermissionForCurrentContext(
			"System.launchExternalProcess"
		);
	} catch (error) {
		console.error("Error while querying for System.launchExternalProcess permission", error);
	}
	const canLaunchExternalProcess = canLaunchExternalProcessResponse?.granted;

	let canDownloadAppAssetsResponse;
	try {
		canDownloadAppAssetsResponse = await fin.System.queryPermissionForCurrentContext("System.downloadAsset");
	} catch (error) {
		console.error("Error while querying for System.downloadAsset permission", error);
	}

	const canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;

	const validatedApps: App[] = [];
	const rejectedAppIds = [];
	const appAssetTag = "appasset";
	const supportedManifestTypes = appSettings?.manifestTypes;

	for (const element of apps) {
		const manifestType = element.manifestType;
		if (manifestType) {
			let validApp = true;
			const tags = element.tags;

			if (supportedManifestTypes !== undefined && supportedManifestTypes.length > 0) {
				validApp = supportedManifestTypes.includes(manifestType);
			}

			if (validApp) {
				if (element.manifestType !== "external") {
					validatedApps.push(element);
				} else if (canLaunchExternalProcess === false) {
					rejectedAppIds.push(element.appId);
				} else if (Array.isArray(tags) && tags.includes(appAssetTag) && canDownloadAppAssets === false) {
					rejectedAppIds.push(element.appId);
				} else {
					validatedApps.push(element);
				}
			} else {
				console.warn(
					"Apps.ts: validateEntries: Application is not in the list of supported manifest types",
					element.appId,
					manifestType
				);
			}
		}
	}

	if (rejectedAppIds.length > 0) {
		console.warn(
			"Apps.ts: validateEntries: Not passing the following list of applications as they will not be able to run on this machine due to missing permissions. Alternatively this logic could be moved to the launch function where a selection is not launched but the user is presented with a modal saying they can't launch it due to permissions.",
			rejectedAppIds
		);
	}

	return validatedApps;
}

/**
 * Launch the passed app using its manifest type to determine how to launch it.
 * @param app The app to launch.
 * @returns The value returned by the launch.
 */
export async function launchApp(
	app: App
): Promise<OpenFin.Platform | OpenFin.Identity | OpenFin.View | OpenFin.Application | undefined> {
	if (!app.manifest) {
		console.error(`No manifest was provided for type ${app.manifestType}`);
		return;
	}

	let ret: OpenFin.Platform | OpenFin.Identity | OpenFin.View | OpenFin.Application | undefined;

	console.log("Application launch requested:", app);

	switch (app.manifestType) {
		case AppManifestType.Snapshot: {
			const platform = getCurrentSync();
			ret = await platform.applySnapshot(app.manifest);
			break;
		}

		case AppManifestType.View: {
			const platform = getCurrentSync();
			ret = await platform.createView({ manifestUrl: app.manifest });
			break;
		}

		case AppManifestType.External: {
			ret = await fin.System.launchExternalProcess({ path: app.manifest, uuid: app.appId });
			break;
		}

		case "window": {
			const manifestResponse = await fetch(app.manifest);
			const manifest: OpenFin.WindowOptions = await manifestResponse.json();
			const platform = getCurrentSync();
			ret = await platform.createWindow(manifest);
			break;
		}

		case "inline-appasset": {
			const appAssetInfo: OpenFin.AppAssetInfo = app.manifest as unknown as OpenFin.AppAssetInfo;
			try {
				await fin.System.downloadAsset(appAssetInfo, (progress) => {
					const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
					console.info(`Downloaded ${downloadedPercent}% of app asset with appId of ${app.appId}`);
				});

				ret = await fin.System.launchExternalProcess({
					alias: appAssetInfo.alias,
					arguments: appAssetInfo.args
				});
			} catch (error) {
				console.error(`Error trying to download app asset with app id: ${app.appId}`, error);
			}
			break;
		}

		default: {
			ret = await fin.Application.startFromManifest(app.manifest);
			break;
		}
	}

	console.log("Finished application launch request");

	return ret;
}

/**
 * Get a single app using it's id.
 * @param appProviderSettings The app provider for retrieving the apps.
 * @param appId The id of the app to retrieve.
 * @returns The app if it exists.
 */
export async function getApp(
	appProviderSettings: AppProviderSettings | undefined,
	appId: string
): Promise<App | undefined> {
	const apps = await getApps(appProviderSettings);
	return apps.find((entry) => entry.appId === appId);
}

/**
 * Get all the intents that support the requested context.
 * @param appProviderSettings The app provider for retrieving the apps.
 * @param contextType The context type to find the intents for.
 * @returns The list of intents supporting the context.
 */
export async function getIntentsByContext(
	appProviderSettings: AppProviderSettings | undefined,
	contextType: string
): Promise<{ intent: { name: string; displayName: string }; apps: App[] }[]> {
	const apps = await getApps(appProviderSettings);

	if (!Array.isArray(apps)) {
		console.warn("Unable to get apps so we can not get apps and intents that support a particular context");
		return [];
	}

	const intentsMap: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: App[];
		};
	} = {};

	for (const app of apps) {
		if (app.intents !== undefined) {
			for (const appIntent of app.intents) {
				if (Array.isArray(appIntent.contexts) && appIntent.contexts.includes(contextType)) {
					updateAppIntentsEntry(intentsMap, appIntent, app);
				}
			}
		}
	}

	return Object.values(intentsMap);
}

/**
 * Get the list of apps that support a specific intent.
 * @param appProviderSettings The app provider for retrieving the apps.
 * @param intent The intents to find supported apps.
 * @returns The list of app that support the intent.
 */
export async function getAppsByIntent(
	appProviderSettings: AppProviderSettings | undefined,
	intent: string
): Promise<App[]> {
	const apps = await getApps(appProviderSettings);

	return apps.filter((value) => {
		if (!Array.isArray(value.intents)) {
			return false;
		}
		for (const valueIntent of value.intents) {
			if (valueIntent.name.toLowerCase() === intent.toLowerCase()) {
				return true;
			}
		}
		return false;
	});
}

/**
 * Get an intent and the apps that support it.
 * @param appProviderSettings The app provider for retrieving the apps.
 * @param intent The intent to look for.
 * @param contextType Optional context type to look for.
 * @returns The intent and its supporting apps if found.
 */
export async function getIntent(
	appProviderSettings: AppProviderSettings | undefined,
	intent: string,
	contextType?: string
): Promise<{ intent: { name: string; displayName: string }; apps: App[] } | undefined> {
	const apps = await getApps(appProviderSettings);

	if (!Array.isArray(apps)) {
		console.warn("There was no apps returned so we are unable to find apps that support an intent.");
		return;
	}

	const intentsMap: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: App[];
		};
	} = {};

	for (const app of apps) {
		if (app.intents !== undefined) {
			for (const appIntent of app.intents) {
				if (
					appIntent.name === intent &&
					(contextType === undefined ||
						(Array.isArray(appIntent.contexts) && appIntent.contexts.includes(contextType)))
				) {
					updateAppIntentsEntry(intentsMap, appIntent, app);
				}
			}
		}
	}

	const results = Object.values(intentsMap);
	if (results.length === 0) {
		console.log(`No results found for findIntent for intent ${intent} and context ${contextType}`);
		return;
	} else if (results.length === 1) {
		return results[0];
	}
	console.warn(
		`Received more than one result for findIntent for intent ${intent} and context ${contextType}. Returning the first entry.`
	);
	return results[0];
}

/**
 * Update the entry for keeping tracking of supported apps for intents.
 * @param intentsMap The map of intents.
 * @param intent The intent to app an entry for.
 * @param app The application supporting the intent.
 */
function updateAppIntentsEntry(
	intentsMap: {
		[key: string]: {
			intent: { name: string; displayName: string };
			apps: App[];
		};
	},
	intent: AppIntent,
	app: App
): void {
	if (intentsMap[intent.name] === undefined) {
		// in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
		// or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
		intentsMap[intent.name] = {
			intent: {
				name: intent.name,
				displayName: intent.displayName
			},
			apps: []
		};
	}
	intentsMap[intent.name].apps.push(app);
}
