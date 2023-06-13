import type { AppMetadata } from "@finos/fdc3";
import type { AppIntent } from "@openfin/workspace";
import type { PlatformApp } from "../../shapes/app-shapes";
import type {
	AppDefinition,
	WebAppDetails,
	NativeAppDetails,
	OnlineNativeAppDetails,
	AppInterop
} from "../../shapes/fdc3-2-0-shapes";
import { isEmpty, isObject } from "../../utils";

/**
 * Map the app definition to a platform app.
 * @param app The app definition to map.
 * @returns The platform app.
 */
export function mapToPlatformApp(app: AppDefinition): PlatformApp {
	const platformApp: PlatformApp = {
		appId: app.appId,
		name: app.name ?? app.appId,
		title: app.title || app.name,
		manifestType: mapManifestType(app),
		manifest: getManifest(app) as string,
		description: app.description,
		instanceMode: app?.hostManifests?.OpenFin?.config?.instanceMode,
		intents: mapIntents(app.interop),
		interop: app.interop,
		customConfig: app.customConfig,
		tags: app.categories,
		version: app.version,
		publisher: app.publisher ?? "",
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: app.icons ?? [],
		images: app.screenshots,
		private: app?.hostManifests?.OpenFin?.config?.private,
		autostart: app?.hostManifests?.OpenFin?.config?.autostart
	};
	return platformApp;
}

/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @param resultType The result type to include in the data.
 * @returns The app metadata.
 */
export function mapToAppMetaData(app: PlatformApp, resultType?: string): AppMetadata {
	const appMetaData: AppMetadata = {
		appId: app.appId,
		description: app.description,
		icons: app.icons,
		name: app.name,
		screenshots: app.images,
		title: app.title,
		tooltip: app.tooltip,
		version: app.version,
		resultType
	};
	return appMetaData;
}

/**
 * Map the app definition interop data to app interop format.
 * @param interop The interop to map.
 * @returns The app interop.
 */
export function mapIntents(interop: AppInterop | undefined): AppIntent[] {
	const intents: AppIntent[] = [];

	const listensFor = interop?.intents?.listensFor;
	if (isEmpty(listensFor)) {
		return intents;
	}

	const intentIds = Object.keys(listensFor);
	for (let i = 0; i < intentIds.length; i++) {
		const intentName = intentIds[i];
		intents.push({
			name: intentName,
			displayName: listensFor[intentName].displayName ?? "",
			contexts: listensFor[intentName].contexts
		});
	}

	return intents;
}

/**
 * Map the manifest type.
 * @param app The app definition to map the manifest type for.
 * @returns The mapped manifest type.
 */
function mapManifestType(app: AppDefinition): string {
	let manifestType: string;

	switch (app.type) {
		case "web": {
			manifestType = "inline-view";
			break;
		}
		case "native": {
			manifestType = "inline-external";
			break;
		}
		case "onlineNative": {
			manifestType = "desktop-browser";
			break;
		}
		case "other": {
			manifestType = app.hostManifests?.OpenFin?.type ?? "";
			break;
		}
		default: {
			manifestType = app.type;
		}
	}
	return manifestType;
}

/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifest(app: AppDefinition): string | unknown {
	let manifest: string | unknown;

	switch (app.type) {
		case "web": {
			if (!isEmpty(app?.details)) {
				const hostDetails = app.hostManifests?.OpenFin?.details;
				if (isObject(hostDetails)) {
					manifest = {
						url: (app?.details as WebAppDetails).url,
						fdc3InteropApi: "2.0",
						...hostDetails
					};
				} else {
					manifest = {
						url: (app?.details as WebAppDetails).url,
						fdc3InteropApi: "2.0"
					};
				}
			}
			break;
		}
		case "native": {
			if (!isEmpty(app?.details)) {
				// our native api supports path and arguments.
				manifest = app.details as NativeAppDetails;
			}
			break;
		}
		case "onlineNative": {
			if (!isEmpty(app?.details)) {
				manifest = (app?.details as OnlineNativeAppDetails).url;
			}
			break;
		}
		case "other": {
			manifest = app.hostManifests?.OpenFin?.details;
			break;
		}
		default: {
			manifest = app.details;
		}
	}
	return manifest;
}
