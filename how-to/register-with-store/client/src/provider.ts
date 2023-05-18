import type OpenFin from "@openfin/core";
import { Storefront } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import type { CustomSettings } from "./shapes";
import { deregister, register, storeGetCustomActions } from "./store";

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents(customSettings));

	// Load the settings from the manifest
	const customSettings = await getManifestCustomSettings();

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
				icon: customSettings.storefrontProvider?.icon,
				workspacePlatform: {
					pages: [],
					favicon: customSettings.storefrontProvider?.icon
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
					backgroundPrimary: "#1E1F23",
					// This additional color is used to theme the hero background in store
					contentBackground1: "#0A76D3"
				}
			}
		],
		// Get the custom actions from the store which will be triggered
		// when the buttons are clicked
		customActions: storeGetCustomActions()
	});
}

/**
 * Bring the platform to life.
 * @param customSettings The custom settings from the manifest.
 */
export async function initializeWorkspaceComponents(customSettings: CustomSettings): Promise<void> {
	console.log("Initialising the workspace components");

	// Register with store and show it
	await register(customSettings.appProvider, customSettings.storefrontProvider);
	await Storefront.show();

	// When the platform requests to be close we deregister from store and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await deregister(customSettings.storefrontProvider);
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
