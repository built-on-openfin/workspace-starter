import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

/**
 * Get the list of apps to display.
 * @returns List of app definitions.
 */
export function getApps(): App[] {
	return [OPENFIN_INFORMATION_APP, THEME_BUILDER_APP, COMMON_STYLES_APP];
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
 * App definition for the theme builder tool.
 */
export const THEME_BUILDER_APP: App = {
	appId: "theme-definition-builder",
	title: "Theme Definition Builder",
	description: "A tool to help in the building of a theme.",
	manifest:
		"https://built-on-openfin.github.io/dev-extensions/extensions/v19.0.0/branding/theme-definition-builder/theme-definition-builder-view.json",
	manifestType: "view",
	icons: [{ src: "http://localhost:8080/common/images/icon-blue.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "https://built-on-openfin.github.io/dev-extensions/extensions/v19.0.0/branding/images/previews/theme-definition-builder.png"
		}
	],
	tags: ["view", "theme", "tool"]
};

/**
 * App definition for the common styles view.
 */
const COMMON_STYLES_APP: App = {
	appId: "common-styles",
	title: "Common Styles Example",
	description: "A view demonstrating the common styles.",
	manifest: "http://localhost:8080/common/style/style-view.json",
	manifestType: "view",
	icons: [{ src: "http://localhost:8080/common/images/icon-blue.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/starter-style-guide.png"
		}
	],
	tags: ["view", "theme", "tool"]
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
