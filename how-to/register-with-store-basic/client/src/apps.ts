import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

/**
 * Get the list of apps to display.
 * @returns List of app definitions.
 */
export function getApps(): App[] {
	return [OPENFIN_INFORMATION_APP, EXPERO_APP, PROCESS_MANAGER, DEVELOPER_CONTENT];
}

/**
 * App definition to use for demonstration which show OpenFin environment information.
 */
export const OPENFIN_INFORMATION_APP: App = {
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
 * App definition for the Expero labs news gateway.
 */
export const EXPERO_APP: App = {
	appId: "expero-company-news",
	title: "Gateway - Company News",
	manifest: "https://openfin-iex.experolabs.com/openfin/manifests/company-news.json",
	manifestType: "view",
	icons: [
		{
			src: "https://openfin-iex.experolabs.com/favicon.ico"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "Expero",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/expero-news-view.png"
		}
	],
	tags: ["expero", "view", "interop"]
};

/**
 * App definition for the OpenFin Notification Process Manager development tool.
 */
export const PROCESS_MANAGER: App = {
	appId: "openfin-process-manager",
	title: "OpenFin Process Manager",
	manifestType: "manifest",
	description:
		"Process Manager: This is OpenFin's tool for helping developers build OpenFin Applications. It lets you see the OpenFin applications that are running, the performance of the applications (memory and cpu) and easy access to the dev tools for the Windows of your application.",
	manifest: "https://cdn.openfin.co/release/apps/openfin/processmanager/app.json",
	icons: [{ src: "https://cdn.openfin.co/release/apps/openfin/processmanager/2.0.2/ofpm-icon.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/openfin-process-manager.png"
		}
	],
	tags: ["hero", "manifest", "tools"]
};

/**
 * App definition for a snapshot which includes development resources for OpenFin.
 */
export const DEVELOPER_CONTENT: App = {
	appId: "openfin-developer-page",
	title: "OpenFin Developer Docs",
	manifestType: "snapshot",
	description:
		"Shows a collection of OpenFin developer pages and provides an example of how you can present a pre-built page as a launch target in OpenFin Home. This entry has a manifest type of 'snapshot'.",
	manifest: "http://localhost:8080/common/snapshots/developer.snapshot.fin.json",
	icons: [{ src: "http://localhost:8080/common/images/icon-blue.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/openfin-page-docs.png"
		}
	],
	tags: ["page"]
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
