import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import { CustomActionCallerType, type Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { LaunchPreference } from "workspace-platform-starter/shapes/app-shapes";
import {
	FAVORITE_TYPE_NAME_APP,
	FAVORITE_TYPE_NAME_PAGE,
	FAVORITE_TYPE_NAME_WORKSPACE,
	type FavoriteEntry
} from "workspace-platform-starter/shapes/favorite-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { PopupMenuEntry } from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import { getWindowPositionUsingStrategy } from "workspace-platform-starter/utils-position";
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
			if (payload.callerType === CustomActionCallerType.CustomButton && this._helpers) {
				const getClient = this._helpers?.getFavoriteClient;
				if (!isEmpty(getClient)) {
					const client = await getClient();
					if (!isEmpty(client)) {
						const favInfo = client.getInfo();
						const menuEntries: PopupMenuEntry<FavoriteEntry>[] = [];

						if (favInfo.enabledTypes) {
							let hadEntries = false;
							for (const type of favInfo.enabledTypes) {
								const saved = await client.getSavedFavorites(type);
								if (saved && saved.length > 0) {
									if (hadEntries) {
										menuEntries.push({ type: "separator" });
									}

									saved.sort((f1, f2) => (f1.label ?? "").localeCompare(f2.label ?? ""));

									for (const entry of saved) {
										menuEntries.push({
											label: entry.label ?? "",
											icon: entry.icon,
											data: entry
										});
									}
									hadEntries = true;
								}
							}
						}

						const menuClient = await this._helpers.getMenuClient();
						const popupMenuStyle = this._settings?.popupMenuStyle ?? menuClient.getPopupMenuStyle();

						const result = await menuClient.showPopupMenu<FavoriteEntry>(
							{ x: payload.x, y: 48 },
							payload.windowIdentity,
							"There are no favorites",
							menuEntries,
							{
								popupMenuStyle
							}
						);

						if (isEmpty(result)) {
							this._logger?.info("Favorites Menu Dismissed");
						} else {
							this._logger?.info("Favorites Menu Item Selected", result);

							if (result.type === FAVORITE_TYPE_NAME_APP) {
								if (!isEmpty(this._helpers?.launchApp)) {
									let launchPreference: LaunchPreference | undefined;
									const bounds = await getWindowPositionUsingStrategy(
										undefined, // go with defaults
										payload.windowIdentity
									);
									if (!isEmpty(bounds)) {
										launchPreference = { bounds };
									}
									await this._helpers?.launchApp(result.typeId, launchPreference);
								}
							} else if (result.type === FAVORITE_TYPE_NAME_PAGE) {
								if (!isEmpty(this._helpers?.launchPage)) {
									await this._helpers?.launchPage(result.typeId, undefined, this._logger);
								}
							} else if (result.type === FAVORITE_TYPE_NAME_WORKSPACE) {
								if (!isEmpty(this._helpers?.launchWorkspace)) {
									await this._helpers?.launchWorkspace(result.typeId);
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
}
