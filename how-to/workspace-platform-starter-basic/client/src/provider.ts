import type OpenFin from "@openfin/core";
import { Home, Storefront, type App } from "@openfin/workspace";
import { type CustomThemes, init } from "@openfin/workspace-platform";
import * as Notifications from "@openfin/workspace/notifications";
import { register as registerDock } from "./dock";
import { register as registerHome } from "./home";
import { register as registerNotifications } from "./notifications";
import type { CustomSettings, PlatformSettings } from "./shapes";
import { register as registerStore } from "./store";

window.addEventListener("DOMContentLoaded", async () => {
	// Load the settings from the manifest
	const settings = await getManifestCustomSettings();

	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () =>
		initializeWorkspaceComponents(settings.platformSettings, settings.customSettings)
	);

	// The DOM is ready so initialize the platform
	// Provide default icons for the browser windows
	await initializeWorkspacePlatform(settings.platformSettings, settings.customSettings ?? {});
});

/**
 * Initialize the HERE Core UI Platform.
 * @param platformSettings The platform settings from the manifest.
 * @param browserSettings The custom settings from the manifest.
 * @param browserSettings.newPageUrl A new page url to load when the browser is opened.
 * @param browserSettings.newTabUrl A new view url to load when the browser is opened.
 * @param theme The theme settings from the manifest.
 */
async function initializeWorkspacePlatform(
	platformSettings: PlatformSettings,
	browserSettings: { newPageUrl?: string; newTabUrl?: string },
	theme?: CustomThemes
): Promise<void> {
	console.log("Initializing HERE Core UI Platform");
	let newPageUrl: string | undefined;
	let newTabUrl: string | undefined;

	if (browserSettings?.newPageUrl !== undefined && browserSettings?.newPageUrl !== "") {
		newPageUrl = browserSettings.newPageUrl;
	}
	if (browserSettings?.newTabUrl !== undefined && browserSettings?.newTabUrl !== "") {
		newTabUrl = browserSettings.newTabUrl;
	}
	console.log("Passing the following theme to the workspace platform init function:", theme);

	await init({
		browser: {
			defaultWindowOptions: {
				icon: platformSettings.icon,
				workspacePlatform: {
					pages: [],
					favicon: platformSettings.icon,
					newPageUrl,
					newTabUrl
				}
			}
		}
	});
}

/**
 * Bring the platform to life.
 * @param platformSettings The platform settings from the manifest.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspaceComponents(
	platformSettings: PlatformSettings,
	customSettings?: CustomSettings
): Promise<void> {
	console.log("Initializing the bootstrapper");

	const apps: App[] = [];

	if (customSettings?.appsUrl) {
		try {
			const urlAppsResponse = await fetch(customSettings?.appsUrl);
			if (urlAppsResponse.ok) {
				const urlAppsJson = await urlAppsResponse.json();
				if (Array.isArray(urlAppsJson)) {
					apps.push(...urlAppsJson);
				}
			}
		} catch (err) {
			console.error(`Failed loading apps from ${customSettings?.appsUrl}`, err);
		}
	}

	if (customSettings?.apps && Array.isArray(customSettings.apps)) {
		apps.push(...customSettings.apps);
	}

	// Register with home and show it
	await registerHome(platformSettings, apps);
	await Home.show();

	// Register with store
	await registerStore(platformSettings, apps);

	// Register with dock
	const dockProvider = await registerDock(platformSettings, apps);

	// Register with notifications
	await registerNotifications(platformSettings);

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await Home.deregister(platformSettings.id);
		await Storefront.deregister(platformSettings.id);
		await dockProvider?.shutdown();
		await Notifications.deregister(platformSettings.id);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<{
	platformSettings: PlatformSettings;
	customSettings?: CustomSettings;
}> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return {
		platformSettings: {
			id: manifest.platform?.uuid ?? "",
			title: manifest.shortcut?.name ?? "",
			icon: manifest.platform?.icon ?? ""
		},
		customSettings: manifest.customSettings
	};
}
