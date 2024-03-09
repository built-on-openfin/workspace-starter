import type OpenFin from "@openfin/core";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";
import type { AppAssetInfoWithLaunchStrategy, PlatformApp } from "./shapes";
import * as Snap from "./snap";
import { randomUUID } from "./utils";

/**
 * Get the list of apps to display.
 * @returns List of app definitions.
 */
export async function getApps(): Promise<PlatformApp[]> {
	return [OPENFIN_INFORMATION_APP, SNAP_NATIVE_TEST_APP, OPENFIN_WINDOW_APP];
}

/**
 * Get a single app by id.
 * @param appId The id of the app to get.
 * @returns The app if it exists.
 */
export async function getApp(appId: string): Promise<PlatformApp | undefined> {
	const apps = await getApps();
	return apps.find((a) => a.appId === appId);
}

/**
 * App definition to use for demonstration which show OpenFin environment information.
 */
const OPENFIN_INFORMATION_APP: PlatformApp = {
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
 * App definition to use for demonstration which show OpenFin environment information.
 */
const OPENFIN_WINDOW_APP: PlatformApp = {
	appId: "openfin-window-options-builder",
	title: "Window Options Builder",
	description: "A tool to create a classic window and demonstrate the different window options available",
	manifest: "http://localhost:8080/common/views/window-options/window.options.builder.view.fin.json",
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
	images: [],
	tags: ["view", "openfin", "developer-tools"]
};

/**
 * App definition for native test application.
 */
const SNAP_NATIVE_TEST_APP: PlatformApp = {
	appId: "snap-native-test-app",
	title: "Snap Native Test App",
	description: "Open a native test application",
	manifest: {
		src: "http://localhost:8080/apps/snap-native-test-app.zip",
		alias: "snap-native-test-app",
		version: "1.0.0",
		target: "snap-native-test-app.exe",
		launchStrategy: {
			type: "waitForWindowOfClass",
			matchRegex: "^Window Class",
			timeoutMs: 5000
		}
	} as AppAssetInfoWithLaunchStrategy,
	manifestType: "inline-appasset",
	icons: [
		{
			src: "http://localhost:8080/common/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [],
	tags: ["app", "native", "openfin"]
};

/**
 * Launch the passed app using its manifest type to determine how to launch it.
 * @param app The app to launch.
 * @returns The value returned by the launch.
 */
export async function launchApp(
	app: PlatformApp
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

		case "inline-appasset": {
			await Snap.launchApp(app.appId, randomUUID());
			break;
		}

		default: {
			console.error(`Unsupported manifestType ${app.manifestType}`);
			break;
		}
	}

	console.log("Finished application launch request");

	return ret;
}

/**
 * Get the executable path for an app asset.
 * @param appAssetInfo The app asset information.
 * @returns The native path for the asset.
 */
export async function getAppAssetExecutablePath(
	appAssetInfo: AppAssetInfoWithLaunchStrategy
): Promise<string> {
	const runtimeInfo = await fin.System.getRuntimeInfo();
	// Use the local-startup-url to determine where app assets have been stored.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let localAppUrl: string = (runtimeInfo.args as any)["local-startup-url"].replace("config.json", "");
	const sep = localAppUrl.includes("\\") ? "\\" : "/";
	if (localAppUrl.endsWith(sep)) {
		localAppUrl = localAppUrl.slice(0, -1);
	}
	return [localAppUrl, "assets", appAssetInfo.alias, appAssetInfo.version, appAssetInfo.target].join(sep);
}
