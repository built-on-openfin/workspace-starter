import type OpenFin from "@openfin/core";
import { Home } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { deregister, register } from "./home";
import type { CustomSettings } from "./shapes";

window.addEventListener("DOMContentLoaded", async () => {
	// Load the settings from the manifest
	const customSettings = await getManifestCustomSettings();

	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => platformBootstrap(customSettings));

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(customSettings);
});

/**
 * Initialize the workspace platform.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspacePlatform(customSettings: CustomSettings): Promise<void> {
	console.log("Initialising workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: customSettings.homeProvider?.icon,
				workspacePlatform: {
					pages: [],
					favicon: customSettings.homeProvider?.icon
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		]
	});
}

/**
 * Bring the platform to life.
 * @param customSettings The custom settings from the manifest.
 */
export async function platformBootstrap(customSettings: CustomSettings): Promise<void> {
	console.log("Initialising the bootstrapper");

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
export async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
