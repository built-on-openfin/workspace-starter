import type OpenFin from "@openfin/core";
import { Home } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { deregister, register } from "./home";
import type { CustomSettings } from "./shapes";

window.addEventListener("DOMContentLoaded", async () => {
	// Load the settings from the manifest
	const customSettings = await getManifestCustomSettings();
	console.log("Custom settings loaded from manifest:", customSettings);
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents(customSettings));

	// The DOM is ready so initialize the platform
	// Provide default icons for the browser windows
	await initializeWorkspacePlatform(customSettings);
});

/**
 * Initialize the HERE Core UI Platform.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspacePlatform(customSettings: CustomSettings): Promise<void> {
	console.log("Initializing HERE Core UI Platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: customSettings.homeProvider?.icon,
				workspacePlatform: {
					pages: [],
					favicon: customSettings.homeProvider?.icon
				}
			}
		}
	});
}

/**
 * Bring the platform to life.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspaceComponents(customSettings: CustomSettings): Promise<void> {
	console.log("Initializing the bootstrapper");

	// Register with home and show it
	await register(customSettings.appProvider, customSettings.homeProvider);
	await Home.show();

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await deregister(customSettings.homeProvider);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();
	console.log("Retrieving manifest for application:", app.identity.uuid);
	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
