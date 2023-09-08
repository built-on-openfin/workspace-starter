import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap,
	type WorkspacePlatformModule
} from "@openfin/workspace-platform";
import {
	FAVORITE_TYPE_NAME_APP,
	FAVORITE_TYPE_NAME_PAGE,
	FAVORITE_TYPE_NAME_QUERY,
	FAVORITE_TYPE_NAME_WORKSPACE,
	type FavoriteEntry,
	type FavoriteTypeNames
} from "workspace-platform-starter/shapes";
import type { Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implementation for the favorites menu actions provider.
 */
export class FavoritesMenuProvider implements Actions {
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
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("FavoritesMenuProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		for (const type of [
			FAVORITE_TYPE_NAME_APP,
			FAVORITE_TYPE_NAME_WORKSPACE,
			FAVORITE_TYPE_NAME_PAGE,
			FAVORITE_TYPE_NAME_QUERY
		]) {
			actionMap[`favorites-menu-${type}`] = async (payload: CustomActionPayload): Promise<void> => {
				if (payload.callerType === CustomActionCallerType.CustomButton) {
					const favorite = await this.showPopupMenu(
						{ x: payload.x, y: payload.y },
						payload.windowIdentity,
						`There are no favorite ${type}s`,
						type as FavoriteTypeNames
					);

					if (
						!isEmpty(favorite) &&
						favorite.type === FAVORITE_TYPE_NAME_APP &&
						!isEmpty(this._helpers?.launchApp)
					) {
						await this._helpers?.launchApp(favorite.typeId);
					}
				}
			};
		}

		return actionMap;
	}

	/**
	 * Show the popup menu.
	 * @param position The position to display the menu.
	 * @param position.x The x position to display the menu.
	 * @param position.y The y position to display the menu.
	 * @param windowIdentity The identity of the window to use for showing the popup.
	 * @param noEntryText The text to display if there are no entries.
	 * @param type The type of the menu to show.
	 * @returns The selected entry or undefined if menu was dismissed.
	 */
	private async showPopupMenu(
		position: { x: number; y: number },
		windowIdentity: OpenFin.Identity,
		noEntryText: string,
		type: FavoriteTypeNames
	): Promise<FavoriteEntry | undefined> {
		const getClient = this._helpers?.getFavoriteClient;
		if (!isEmpty(getClient)) {
			const client = await getClient();
			if (!isEmpty(client)) {
				const info = client.getInfo();
				if (info.isEnabled) {
					const parentWindow = fin.Window.wrapSync(windowIdentity);

					const favorites = await client.getSavedFavorites(type);

					const template: OpenFin.MenuItemTemplate[] = [];

					if (isEmpty(favorites) || favorites.length === 0) {
						template.push({
							label: noEntryText,
							enabled: false
						});
					} else {
						for (const favorite of favorites) {
							template.push({
								label: favorite.label,
								icon: favorite.icon,
								data: favorite
							});
						}
					}

					const r = await parentWindow.showPopupMenu({
						template,
						x: position.x,
						y: 48
					});

					if (r.result === "closed") {
						this._logger?.info("Favorites Menu Dismissed");
					} else if (r.result === "clicked") {
						this._logger?.info("Favorites Menu Item Selected", r.data);
						return r.data;
					}
				}
			}
		}
	}
}
