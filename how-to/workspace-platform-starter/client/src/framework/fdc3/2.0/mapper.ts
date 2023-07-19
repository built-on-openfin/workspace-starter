import type { AppMetadata } from "@finos/fdc3";
import type { AppIntent } from "@openfin/workspace";
import type { PlatformApp } from "../../shapes/app-shapes";
import type {
	AppDefinition,
	WebAppDetails,
	NativeAppDetails,
	OnlineNativeAppDetails,
	AppInterop,
	AppDefinitionType,
	AppIntents,
	HostManifests
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
		title: app.title ?? app.name,
		manifestType: mapManifestTypeFromFDC3(app),
		manifest: getManifestFromFDC3(app) as string,
		description: app.description,
		instanceMode: app?.hostManifests?.OpenFin?.config?.instanceMode,
		intents: mapIntentsFromFDC3(app.interop),
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
 * Map a platform app to an FDC3 2.0 app definition.
 * @param app The app definition to map.
 * @returns The fdc3 2.0 app.
 */
export function mapToFDC3App(app: PlatformApp): AppDefinition {
	const fdc3App: AppDefinition = {
		appId: app.appId,
		name: app.name ?? app.appId,
		title: app.title ?? app.name,
		type: mapTypeFromPlatformApp(app),
		details: {},
		description: app.description,
		categories: app.tags ?? [],
		version: app.version,
		publisher: app.publisher ?? "",
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: app.icons,
		screenshots: app.images,
		tooltip: app.tooltip,
		interop: getInteropFromPlatformApp(app),
		hostManifests: getHostManifestsFromPlatformApp(app)
	};
	return fdc3App;
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
export function mapIntentsFromFDC3(interop: AppInterop | undefined): AppIntent[] {
	const intents: AppIntent[] = [];

	const listensFor = interop?.intents?.listensFor;
	if (isEmpty(listensFor)) {
		return intents;
	}

	const intentIds = Object.keys(listensFor);
	for (const intentName of intentIds) {
		intents.push({
			name: intentName,
			displayName: listensFor[intentName].displayName ?? "",
			contexts: listensFor[intentName].contexts
		});
	}

	return intents;
}

/**
 * Get the interop data from a Platform App in FDC3 2.0 format.
 * @param app The platform app to use as a source.
 * @returns The app interop definition.
 */
function getInteropFromPlatformApp(app: PlatformApp): AppInterop {
	if (!isEmpty(app.interop)) {
		return app.interop;
	}
	const interop: AppInterop = {
		intents: {
			listensFor: {}
		}
	};

	if (Array.isArray(app.intents) && app.intents.length > 0) {
		const listensFor: { [key: string]: AppIntents } = {};
		for (const intent of app.intents) {
			listensFor[intent.name] = { displayName: intent.displayName, contexts: intent.contexts };
		}
		if (!isEmpty(interop.intents)) {
			interop.intents.listensFor = listensFor;
		}
	}

	return interop;
}

/**
 * Map the manifest type.
 * @param app The app definition to map the manifest type for.
 * @returns The mapped manifest type.
 */
function mapManifestTypeFromFDC3(app: AppDefinition): string {
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
 * Maps to an FDC3 2.0 type from the manifest type specified by a platform app.
 * @param app the platform app to use as a source
 * @returns the FDC3 2.0 app definition type
 */
function mapTypeFromPlatformApp(app: PlatformApp): AppDefinitionType {
	let type: AppDefinitionType = "other";
	if (isEmpty(app.manifestType)) {
		return type;
	}
	switch (app.manifestType) {
		case "inline-view": {
			type = "web";
			break;
		}
		case "inline-external": {
			type = "native";
			break;
		}
		case "desktop-browser": {
			type = "onlineNative";
			break;
		}
	}
	return type;
}

/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifestFromFDC3(app: AppDefinition): string | unknown {
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

/**
 * Get the Host Details from the platform app for this FDC3 2.0 App Definition.
 * @param app The platform app to get the information from.
 * @returns The host specific details.
 */
function getHostManifestsFromPlatformApp(app: PlatformApp): HostManifests {
	const hostManifests: HostManifests = {
		OpenFin: {
			type: app.manifestType,
			details: app.manifest,
			config: {
				autostart: app.autostart,
				private: app.private,
				instanceMode: app.instanceMode
			}
		}
	};
	return hostManifests;
}
