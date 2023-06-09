import type OpenFin from "@openfin/core";
import {
	Dock,
	Home,
	Storefront,
	type StorefrontFooter,
	type StorefrontLandingPage
} from "@openfin/workspace";
import { init, type WorkspacePlatformProvider } from "@openfin/workspace-platform";
import { type DockProviderConfigWithIdentity } from "@openfin/workspace-platform/client-api/src";
import { dockGetCustomActions, loadDockConfig, register, saveDockConfig } from "./dock";

const PLATFORM_ID = "register-with-dock";
const PLATFORM_TITLE = "Register With Dock";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";
const NEW_TAB_URL = "http://localhost:8080/common/views/platform/new-tab/new-tab.html";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Initialize dummy workspace components so that the buttons show in the dock.
	await initializeWorkspaceComponents();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON,
					newTabUrl: NEW_TAB_URL
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
		// Get the custom actions from the dock which will be triggered
		// when the buttons are clicked
		customActions: dockGetCustomActions(),
		// Override some of the platform callbacks to provide loading
		// and saving to custom storage
		overrideCallback
	});
}

/**
 * Initialize minimal workspace components for home/store so that the buttons show on dock.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	// Dummy home which can be launched by the dock
	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async () => ({ results: [] }),
		onResultDispatch: async () => {}
	});

	// Dummy store which can be launched by the dock
	await Storefront.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		getApps: async () => [],
		getLandingPage: async () => ({} as StorefrontLandingPage),
		getNavigation: async () => [],
		getFooter: async () => ({ logo: { src: PLATFORM_ICON }, links: [] } as unknown as StorefrontFooter),
		launchApp: async () => {}
	});

	// Perform the dock registration which will configure
	// it and add the buttons/menus
	await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON, NEW_TAB_URL);

	await Dock.show();
}

/**
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Create a class which overrides the platform provider.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Implementation for getting the dock provider from persistent storage.
		 * @param id The id of the dock provider to get.
		 * @returns The loaded dock provider config.
		 */
		public async getDockProviderConfig(id: string): Promise<DockProviderConfigWithIdentity | undefined> {
			// You could load this from your own storage, maybe a REST endpoint
			// for the user, so their dock could persist between machines
			const config = await super.getDockProviderConfig(id);
			if (config) {
				// Hand the config to the dock to see if it wants to do anything with it
				await loadDockConfig(config);
			}
			return config;
		}

		/**
		 * Implementation for saving a dock provider config to persistent storage.
		 * @param config The new dock config to save to persistent storage.
		 * @returns Nothing.
		 */
		public async saveDockProviderConfig(config: DockProviderConfigWithIdentity): Promise<void> {
			// You could save this to your own storage, maybe a REST endpoint
			// for the user, so their dock could persist between machines

			// Hand the config to the dock to see if it wants to do anything with it
			await saveDockConfig(config);
			return super.saveDockProviderConfig(config);
		}
	}

	return new Override();
}
