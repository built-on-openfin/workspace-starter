import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

/**
 * Get the list of apps to display.
 * @returns List of app definitions.
 */
export function getApps(): App[] {
	return [OPENFIN_INFORMATION_APP_PLATFORM_WINDOW, OPENFIN_INFORMATION_APP_BROWSER_VIEW];
}

/**
 * App definition to use for demonstration which show OpenFin environment information.
 */
const OPENFIN_INFORMATION_APP_BROWSER_VIEW: App = {
	appId: "openfin-information-browser-view",
	title: "OpenFin Information Browser View",
	description: "Display information about the OpenFin environment in a browser view",
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
 * App definition to use for demonstration which show OpenFin environment information.
 */
const OPENFIN_INFORMATION_APP_PLATFORM_WINDOW: App = {
	appId: "openfin-information-platform-window",
	title: "OpenFin Information Platform Window",
	description: "Display information about the OpenFin environment in a platform window",
	manifest: "http://localhost:8080/common/views/platform/of-info.view.fin.json",
	manifestType: "platform-window",
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
	tags: ["platform-window", "openfin", "versions"]
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

		case "platform-window": {
			const viewManifestResponse = await fetch(app.manifest);

			const platform = getCurrentSync();
			ret = await platform.createWindow({
				workspacePlatform: {
					windowType: "platform"
				},
				url: "http://localhost:8080/windows/platform-window.html",
				layout: {
					content: [
						{
							type: "stack",
							content: [
								{
									type: "component",
									componentName: "view",
									componentState: await viewManifestResponse.json()
								}
							]
						}
					]
				}
			});
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
