import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";
import type { CustomSettings } from "./shapes";

/**
 * Load the apps from the json feeds configured in the custom settings.
 * @param customSettings The custom settings from the manifest.
 * @returns The list of apps.
 */
export async function getApps(customSettings: CustomSettings): Promise<App[]> {
	console.log("Requesting apps.");
	try {
		let apps: App[] = [];

		if (customSettings?.appProvider?.appSourceUrls) {
			for (const url of customSettings.appProvider.appSourceUrls) {
				const response = await fetch(url, { credentials: "include" });
				const json = await response.json();
				apps = apps.concat(json as App[]);
			}
		}

		return await validateEntries(customSettings, apps);
	} catch (err) {
		console.error("Error retrieving apps. Returning empty list.", err);
		return [];
	}
}

/**
 * Validate that the apps have the correct permissions enabled.
 * @param customSettings The custom settings from the manifest.
 * @param apps The apps the validate.
 * @returns The list of validated apps.
 */
async function validateEntries(customSettings: CustomSettings, apps: App[]): Promise<App[]> {
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
	const supportedManifestTypes = customSettings?.appProvider?.manifestTypes;

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
