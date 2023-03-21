import type { AppIntent } from "@openfin/workspace";
import type {
	AppDefinition,
	WebAppDetails,
	NativeAppDetails,
	OnlineNativeAppDetails
} from "./fdc3-2-0-shapes";

export function getManifestType(app: AppDefinition): string {
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

export function getManifest(app: AppDefinition): unknown {
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

export function getIntents(app: AppDefinition): AppIntent[] {
	const intents: AppIntent[] = [];

	if (app?.interop?.intents?.listensFor === undefined) {
		return intents;
	}

	const intentIds = Object.keys(app.interop.intents.listensFor);
	for (let i = 0; i < intentIds.length; i++) {
		const intentName = intentIds[i];
		intents.push({
			name: intentName,
			displayName: app.interop.intents.listensFor[intentName].displayName,
			contexts: app.interop.intents.listensFor[intentName].contexts
		});
	}

	return intents;
}

export function getPrivate(app: AppDefinition): boolean {
	let privateApp: unknown;

	if (app?.hostManifests?.OpenFin?.config?.private !== undefined) {
		privateApp = app?.hostManifests?.OpenFin?.config?.private;
	} else if (app?.customConfig?.private !== undefined) {
		privateApp = app?.customConfig?.private;
	}

	if (privateApp !== undefined) {
		switch (privateApp) {
			case "False":
			case "false":
			case false:
				return false;
			default:
				// if someone has defined private then the likely hood was to override the default of false.
				return true;
		}
	}
}
