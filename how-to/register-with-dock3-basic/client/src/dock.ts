import type {
	BookmarkDockEntryPayload,
	Dock3Config,
	Dock3Provider,
	DockAllowedWindowOptions,
	LaunchDockEntryPayload
} from "@openfin/workspace-platform";

import { Dock, getCurrentSync } from "@openfin/workspace-platform";
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
						const platform = getCurrentSync();

						// Launch the entry with the URL from the itemData.
						//
						// The itemData field of "DockEntry" can have any type of data,
						// so we need to check if the url is present in this implementation.
						// For more advanced use cases, you can use the itemData field to pass
						// more complex data. For example, you could pass a "contentId" field
						// that could be used to look up the entry in an app/content directory
						// and determine how to launch it (e.g is it a native app, web content, etc).
						if (payload.entry.itemData?.url) {
							await platform.createView({ url: payload.entry.itemData?.url });
						} else {
							console.error("No URL found for dock entry:", payload.entry);
						}
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
							const updatedFavorites = currentConfig.favorites.map((favorite) => {
								if (favorite.id === entryId) {
									return { ...favorite, bookmarked: true };
								}
								return favorite;
							});
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
