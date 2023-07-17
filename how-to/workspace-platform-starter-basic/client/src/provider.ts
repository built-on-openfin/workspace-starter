import type OpenFin from "@openfin/core";
import { Dock, Home, Storefront, type App } from "@openfin/workspace";
import { CustomActionCallerType, init } from "@openfin/workspace-platform";
import { deregisterPlatform } from "@openfin/workspace/notifications";
import { register as registerDock } from "./dock";
import { register as registerHome } from "./home";
import { launchApp } from "./launch";
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
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(settings.platformSettings);
});

/**
 * Initialize the workspace platform.
 * @param platformSettings The platform settings from the manifest.
 */
async function initializeWorkspacePlatform(platformSettings: PlatformSettings): Promise<void> {
	console.log("Initializing workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: platformSettings.icon,
				workspacePlatform: {
					pages: [],
					favicon: platformSettings.icon
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
		],
		customActions: {
			"launch-app": async (e): Promise<void> => {
				if (
					e.callerType === CustomActionCallerType.CustomButton ||
					e.callerType === CustomActionCallerType.CustomDropdownItem
				) {
					await launchApp(e.customData as App);
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

	// Register with home and show it
	await registerHome(platformSettings, customSettings?.apps);
	await Home.show();

	// Register with store
	await registerStore(platformSettings, customSettings?.apps);

	// Register with dock
	await registerDock(platformSettings, customSettings?.apps);

	// Register with notifications
	await registerNotifications(platformSettings);

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await Home.deregister(platformSettings.id);
		await Storefront.deregister(platformSettings.id);
		await Dock.deregister();
		await deregisterPlatform(platformSettings.id);
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
