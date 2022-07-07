import { fin } from "@openfin/core";
import { App } from "@openfin/workspace";
import { getSettings } from "./settings";

let cachedApps: App[];

async function validateEntries(apps: App[]) {
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
	const settings = await getSettings();
	const appAssetTag = "appasset";
	const supportedManifestTypes = settings?.appProvider?.manifestTypes;

	for (let i = 0; i < apps.length; i++) {
		let validApp = true;
		if (supportedManifestTypes !== undefined && supportedManifestTypes.length > 0) {
			validApp = supportedManifestTypes.includes(apps[i].manifestType);
		}

		if (validApp) {
			if (apps[i].manifestType !== "external") {
				validatedApps.push(apps[i]);
			} else if (canLaunchExternalProcess === false) {
				rejectedAppIds.push(apps[i].appId);
			} else if (
				Array.isArray(apps[i].tags) &&
				apps[i].tags.includes(appAssetTag) &&
				canDownloadAppAssets === false
			) {
				rejectedAppIds.push(apps[i].appId);
			} else {
				validatedApps.push(apps[i]);
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

async function getRestEntries(
	url: string,
	credentials?: "omit" | "same-origin" | "include",
	cacheDuration?: number
): Promise<App[]> {
	const options = credentials !== undefined ? { credentials } : undefined;
	if (url === undefined) {
		return [];
	}
	const response = await fetch(url, options);

	const apps: App[] = await response.json();

	cachedApps = await validateEntries(apps);

	if (cacheDuration !== undefined) {
		const setTimeoutInMs = cacheDuration * 60 * 1000;
		setTimeout(() => {
			console.log("Clearing cache of apps as cache duration has passed.");
			cachedApps = undefined;
		}, setTimeoutInMs);
	}
	return cachedApps;
}

export async function getApps(): Promise<App[]> {
	console.log("Requesting apps.");
	try {
		const settings = await getSettings();
		const apps =
			cachedApps ??
			(await getRestEntries(
				settings?.appProvider?.appsSourceUrl,
				settings?.appProvider?.includeCredentialOnSourceRequest,
				settings?.appProvider?.cacheDurationInMinutes
			));
		return apps;
	} catch (err) {
		console.error("Error retrieving apps. Returning empty list.", err);
		return [];
	}
}

export async function getAppsByTag(tags: string[]): Promise<App[]> {
	const apps = await getApps();
	const filteredApps = apps.filter((value) => {
		if (value.tags === undefined) {
			return false;
		}
		for (let i = 0; i < tags.length; i++) {
			if (value.tags.includes(tags[i])) {
				return true;
			}
		}
		return false;
	});
	return filteredApps;
}
