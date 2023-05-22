import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

/**
 * Get the list of apps to display.
 * @returns List of app definitions.
 */
export function getApps(): App[] {
	return [OPENFIN_INFORMATION_APP, FDC3_BROADCAST, INTEROP_BROADCAST];
}

/**
 * App definition to use for demonstration which show OpenFin environment information.
 */
const OPENFIN_INFORMATION_APP: App = {
	appId: "openfin-information",
	title: "OpenFin Information",
	description: "Display information about the OpenFin environment",
	manifest: "http://localhost:8080/common/views/platform/of-info.view.fin.json",
	manifestType: "view",
	icons: [
		{
			src: "http://localhost:8080/common/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/of-info.png"
		}
	],
	tags: ["view", "openfin", "versions"]
};

/**
 * App definition for the FDC3 Interop Broadcast View.
 */
const FDC3_BROADCAST: App = {
	appId: "fdc3-broadcast-view",
	title: "Context using FDC3",
	description:
		"This is an example view used to demonstrate the broadcasting and listening of passed context objects using the fdc3 api.",
	manifest:
		"https://built-on-openfin.github.io/dev-extensions/extensions/v12.6.0/interop/fdc3/context/fdc3-broadcast-view.json",
	manifestType: "view",
	icons: [
		{
			src: "http://localhost:8080/common/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "https://built-on-openfin.github.io/dev-extensions/extensions/v12.6.0/interop/images/previews/view-context-fdc3.png"
		}
	],
	tags: ["view", "fdc3", "tools"]
};

/**
 * App definition for the FDC3 Interop Broadcast View.
 */
const INTEROP_BROADCAST: App = {
	appId: "interop-broadcast-view",
	title: "Context using Interop API",
	description:
		"This is an example of setting and listening to context using the interop api and seeing a code sample of how to do it.",
	manifest:
		"https://built-on-openfin.github.io/dev-extensions/extensions/v12.6.0/interop/interop-api/context/interop-broadcast-view.json",
	manifestType: "view",
	icons: [
		{
			src: "http://localhost:8080/common/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "https://built-on-openfin.github.io/dev-extensions/extensions/v12.6.0/interop/images/previews/view-context-interop-api.png"
		}
	],
	tags: ["view", "interop", "tools"]
};

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
