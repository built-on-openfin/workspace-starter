import type {
	BookmarkDockEntryPayload,
	Dock3Config,
	Dock3Provider,
	DockAllowedWindowOptions,
	LaunchDockEntryPayload
} from "@openfin/workspace-platform";

import { Dock } from "@openfin/workspace-platform";

/**
 * Type consolidating all dock3 provider settings
 */
export type Dock3ProviderSettings = DockAllowedWindowOptions & {
	skipSavedDockProviderConfig: boolean;
};

/**
 * Initialize the Dock3 provider.
 * @param settings settings object for dock3 provider
 * @param config dock3 config object
 * @returns Initialized Dock3 provider
 */
export async function initializeDock3API(
	settings: Dock3ProviderSettings,
	config: Dock3Config
): Promise<Dock3Provider | undefined> {
	try {
		const { skipSavedDockProviderConfig, ...windowOptions } = settings;

		/**
		 * initialize dock3 provider using settings and config params.
		 */
		return await Dock.init({
			config,
			windowOptions,
			override: (Base) =>
				/**
				 * Custom provider overrides for Dock3
				 */
				class CustomProvider extends Base {
					/**
					 * Override for dock3 launch app function.
					 * @param payload payload being launched
					 */
					public async launchEntry(payload: LaunchDockEntryPayload): Promise<void> {
						console.log("Launching Dock Entry:", payload);
					}

					/**
					 * Override for dock3 bookmark content function.
					 * @param payload payload being bookmarked
					 */
					public async bookmarkContentMenuEntry(payload: BookmarkDockEntryPayload): Promise<void> {
						console.log("Bookmarking Dock Entry:", payload.entry);
					}

					/**
					 * Override logic for Dock3 config object load.
					 * @returns Dock3 config
					 */
					public async loadConfig(): Promise<Dock3Config> {
						if (skipSavedDockProviderConfig) {
							return config;
						}
						return super.loadConfig();
					}
				}
		});
	} catch (error) {
		console.error("Error initializing Dock3 API:", error);
	}
}
