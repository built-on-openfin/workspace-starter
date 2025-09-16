import type {
	BookmarkDockEntryPayload,
	Dock3Config,
	Dock3Provider,
	DockAllowedWindowOptions,
	LaunchDockEntryPayload
} from "@openfin/workspace-platform";

import { Dock } from "@openfin/workspace-platform";
import type { ContentMenuEntry } from "@openfin/workspace/client-api-platform/src/shapes";

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
				 * Dock3 is a stateless component, so custom overrides are needed to maintain state.
				 */
				class CustomProvider extends Base {
					/**
					 * Override for dock3 launch app function.
					 * This function should be customized to best match the needs of the application.
					 * @param payload content being launched
					 */
					public async launchEntry(payload: LaunchDockEntryPayload): Promise<void> {
						console.log("Launching Dock Entry:", payload);
					}

					/**
					 * Override for dock3 bookmark content function.
					 * This function should be customized to best match the needs of the application.
					 * @param payload content being bookmarked
					 */
					public async bookmarkContentMenuEntry(payload: BookmarkDockEntryPayload): Promise<void> {
						console.log("Bookmarking Dock Entry:", payload.entry);

						// Update the config to mark the entry as bookmarked
						const currentConfig = this.config;
						const entryId = payload.entry.id;

						/**
						 * Helper function to update content menu entries.
						 * @param entries - array of content menu entries
						 * @returns updated array with bookmarked entries
						 */
						function updateContentMenuEntry(entries: ContentMenuEntry[]): ContentMenuEntry[] {
							return entries.map((entry) => {
								if (entry.id === entryId) {
									return { ...entry, bookmarked: true };
								}
								if (entry.type === "folder") {
									return { ...entry, children: updateContentMenuEntry(entry.children) };
								}
								return entry;
							});
						}

						// Update content menu entries
						if (currentConfig.contentMenu) {
							const updatedContentMenu = updateContentMenuEntry(currentConfig.contentMenu);
							currentConfig.contentMenu = updatedContentMenu;
						}

						// Update favorites if the entry exists there
						if (currentConfig.favorites) {
							const updatedFavorites = currentConfig.favorites.map((favorite) =>
								(favorite.id === entryId ? { ...favorite, bookmarked: true } : favorite)
							);
							currentConfig.favorites = updatedFavorites;
						}

						// Update the dock3 provider's config
						await this.updateConfig(currentConfig);
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
