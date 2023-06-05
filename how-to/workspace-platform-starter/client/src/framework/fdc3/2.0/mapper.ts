import type { AppMetadata } from "@finos/fdc3";
import type { AppIntent } from "@openfin/workspace";
import type { PlatformApp } from "workspace-platform-starter/shapes";
import type {
	AppDefinition,
	WebAppDetails,
	NativeAppDetails,
	OnlineNativeAppDetails,
	AppInterop
} from "../../shapes/fdc3-2-0-shapes";

function getManifestType(app: AppDefinition): string {
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
			manifestType = app.hostManifests?.OpenFin?.type;
			break;
		}
		default: {
			manifestType = app.type;
		}
	}
	return manifestType;
}

function getManifest(app: AppDefinition): unknown {
	let manifest: string | unknown;

	switch (app.type) {
		case "web": {
			if (app?.details !== undefined) {
				if (
					app.hostManifests?.OpenFin?.details !== undefined &&
					typeof app.hostManifests.OpenFin.details === "object"
				) {
					manifest = {
						url: (app?.details as WebAppDetails).url,
						fdc3InteropApi: "2.0",
						...app.hostManifests.OpenFin.details
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
			if (app?.details !== undefined) {
				// our native api supports path and arguments.
				manifest = app.details as NativeAppDetails;
			}
			break;
		}
		case "onlineNative": {
			if (app?.details !== undefined) {
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

export function getIntents(interop: AppInterop): AppIntent[] {
	const intents: AppIntent[] = [];

	if (interop?.intents?.listensFor === undefined) {
		return intents;
	}

	const intentIds = Object.keys(interop.intents.listensFor);
	for (let i = 0; i < intentIds.length; i++) {
		const intentName = intentIds[i];
		intents.push({
			name: intentName,
			displayName: interop.intents.listensFor[intentName].displayName,
			contexts: interop.intents.listensFor[intentName].contexts
		});
	}

	return intents;
}

export function mapToPlatformApp(app: AppDefinition): PlatformApp {
	const platformApp: PlatformApp = {
		appId: app.appId,
		name: app.name ?? app.appId,
		title: app.title || app.name,
		manifestType: getManifestType(app),
		manifest: getManifest(app) as string,
		description: app.description,
		instanceMode: app?.hostManifests?.OpenFin?.config?.instanceMode,
		intents: getIntents(app.interop),
		interop: app.interop,
		customConfig: app.customConfig,
		tags: app.categories,
		version: app.version,
		publisher: app.publisher,
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: app.icons,
		images: app.screenshots,
		private: app?.hostManifests?.OpenFin?.config?.private,
		autostart: app?.hostManifests?.OpenFin?.config?.autostart
	};
	return platformApp;
}

export function mapToPlatformApps(apps: AppDefinition[]): PlatformApp[] {
	const platformApps: PlatformApp[] = [];

	for (const app of apps) {
		platformApps.push(mapToPlatformApp(app));
	}

	return platformApps;
}

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
