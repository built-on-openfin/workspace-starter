import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

export const CALL_APP: App = {
	appId: "call-app",
	title: "Call Application",
	description: "Start a call.",
	manifest: "http://localhost:8080/common/views/contact/call-app.json",
	manifestType: "view",
	icons: [
		{
			src: "http://localhost:8080/common/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [
		{
			name: "StartCall",
			displayName: "Start a Call",
			contexts: ["fdc3.contact"]
		},
		{
			name: "OpenApp",
			displayName: "Open App",
			contexts: ["fdc3.contact"]
		}
	],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/call-app.png"
		}
	],
	tags: ["view", "interop", "fdc3", "contact"]
};

/**
 * Get the list of apps to display.
 * @returns List of app definitions
 */
export async function getApps(): Promise<App[]> {
	return [CALL_APP];
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
