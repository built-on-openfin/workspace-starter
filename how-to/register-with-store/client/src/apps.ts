import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
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

		default: {
			ret = await fin.Application.startFromManifest(app.manifest);
			break;
		}
	}

	console.log("Finished application launch request");

	return ret;
}

/**
 * Get a list of the apps by tag.
 * @param appSettings The app settings from the manifest.
 * @param tags The tags to look for.
 * @returns List of apps with the specified tags.
 */
export async function getAppsByTag(
	appSettings: AppProviderSettings,
	tags: string[] | undefined
): Promise<App[]> {
	if (tags) {
		const apps = await getApps(appSettings);

		return apps.filter((value) => {
			if (value.tags === undefined) {
				return false;
			}
			for (const tag of tags) {
				if (value.tags.includes(tag)) {
					return true;
				}
			}
			return false;
		});
	}

	return [];
}
