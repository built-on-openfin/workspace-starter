import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap,
	type WorkspacePlatformModule
} from "@openfin/workspace-platform";
import {
	FAVORITE_TYPE_NAME_APP,
	FAVORITE_TYPE_NAME_PAGE,
	FAVORITE_TYPE_NAME_WORKSPACE,
	type FavoriteEntry,
	type PopupMenuEntry
} from "workspace-platform-starter/shapes";
import type { Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ColorSchemeMode } from "workspace-platform-starter/shapes/theme-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { FavoritesMenuSettings } from "./shapes";

/**
 * Implementation for the favorites menu actions provider.
 */
export class FavoritesMenuProvider implements Actions<FavoritesMenuSettings> {
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

	/**
	 * The settings for the menu.
	 * @internal
	 */
	private _settings: FavoritesMenuSettings | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<FavoritesMenuSettings>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("FavoritesMenuProvider");
		this._helpers = helpers;
		this._settings = definition.data;

		this._logger.info("Initializing");
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["favorites-menu"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton && this._helpers?.showPopupMenu) {
				const getClient = this._helpers?.getFavoriteClient;
				if (!isEmpty(getClient)) {
					const client = await getClient();
					if (!isEmpty(client)) {
						const favInfo = await client.getInfo();
						const menuEntries: PopupMenuEntry<FavoriteEntry>[] = [];

						const iconFolder = await this._helpers.getCurrentIconFolder();
						const colorScheme = await this._helpers.getCurrentColorSchemeMode();

						if (favInfo.enabledTypes) {
							let hadEntries = false;
							for (const type of favInfo.enabledTypes) {
								const saved = await client.getSavedFavorites(type);
								if (saved && saved.length > 0) {
									if (hadEntries) {
										menuEntries.push({ type: "separator" });
									}
									menuEntries.push(
										...saved
											.sort((f1, f2) => (f1.label ?? "").localeCompare(f2.label ?? ""))
											.map((f) => ({
												label: f.label ?? "",
												icon: this.themeUrl(f.icon, iconFolder, colorScheme),
												customData: f
											}))
									);
									hadEntries = true;
								}
							}
						}

						const result = await this._helpers.showPopupMenu<FavoriteEntry>(
							{ x: payload.x - 16, y: 40 },
							payload.windowIdentity,
							"There are no favorites",
							menuEntries,
							{
								mode: this._settings?.menuType ?? "native"
							}
						);

						if (isEmpty(result)) {
							this._logger?.info("Favorites Menu Dismissed");
						} else {
							this._logger?.info("Favorites Menu Item Selected", result);

							if (result.type === FAVORITE_TYPE_NAME_APP) {
								if (!isEmpty(this._helpers?.launchApp)) {
									await this._helpers?.launchApp(result.typeId);
								}
							} else if (result.type === FAVORITE_TYPE_NAME_PAGE) {
								if (!isEmpty(this._helpers?.launchPage)) {
									const page = await platform.Storage.getPage(result.typeId);
									await this._helpers?.launchPage(page);
								}
							} else if (result.type === FAVORITE_TYPE_NAME_WORKSPACE) {
								if (!isEmpty(this._helpers?.launchWorkspace)) {
									const workspace = await platform.Storage.getWorkspace(result.typeId);
									await this._helpers?.launchWorkspace(workspace);
								}
							} else {
								this._logger?.info(`Favorites Type ${result.type} no yet supported`, result);
							}
						}
					}
				}
			}
		};

		return actionMap;
	}

	/**
	 * Apply theming to an icon url.
	 * @param url The url to theme.
	 * @param iconFolder The icon folder.
	 * @param colorSchemeMode The color scheme.
	 * @returns The themed url.
	 */
	private themeUrl(
		url: string | undefined,
		iconFolder: string,
		colorSchemeMode: ColorSchemeMode
	): string | undefined {
		return url
			? url.replace(/{theme}/g, iconFolder).replace(/{scheme}/g, colorSchemeMode as string)
			: undefined;
	}
}
