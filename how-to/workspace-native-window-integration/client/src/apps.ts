import type OpenFin from "@openfin/core";
import { type ConfigFragment } from "@openfin/native-window-integration-client";
import { type App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

/**
 * Get the list of apps to display.
 * @returns List of app definitions.
 */
export function getApps(): (App & { data?: { nwi?: ConfigFragment } })[] {
	return [OPENFIN_INFORMATION_APP, WINFORM_APP];
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
 * App definition for the winform app.
 */
export const WINFORM_APP: App & { data?: { nwi?: ConfigFragment } } = {
	appId: "winform-interop-example",
	title: "OpenFin Winform Interop Example",
	description: "A Winform application built in .NET 5 that shows the power of our interop api.",
	manifestType: "external",
	manifest: "winform-interop-example",
	icons: [{ src: "http://localhost:8080/common/images/icon-winform-interop.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/openfin-winform-interop.png"
		}
	],
	tags: ["native", "appasset", "nwi"],
	data: {
		nwi: {
			name: "OpenFin.Interop.Win.Sample",
			title: "Interop Example Tool",
			launch: {
				lifetime: "window"
			}
		}
	}
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
			ret = await platform.applySnapshot(app.manifest, {
				closeExistingWindows: true
			});
			break;
		}

		case AppManifestType.View: {
			const platform = getCurrentSync();
			ret = await platform.createView({ manifestUrl: app.manifest });
			break;
		}

		case AppManifestType.External: {
			const options: OpenFin.ExternalProcessRequestType = {
				uuid: app.appId
			};

			if (app.tags?.includes("appasset")) {
				console.log(
					"Application requested is a native app with a tag of appasset so it is provided by this workspace platform. Managing request via platform and not Workspace."
				);
				options.alias = app.manifest;
			} else {
				console.log(
					"Application requested is a native app. Managing request via platform and not Workspace."
				);
				options.path = app.manifest;
			}
			await fin.System.launchExternalProcess(options);
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
