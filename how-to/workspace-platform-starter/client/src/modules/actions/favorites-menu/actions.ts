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
				if (payload.callerType === CustomActionCallerType.CustomButton && this._helpers?.showPopupMenu) {
					const getClient = this._helpers?.getFavoriteClient;
					if (!isEmpty(getClient)) {
						const client = await getClient();
						if (!isEmpty(client)) {
							const favorites = await client.getSavedFavorites(type as FavoriteTypeNames);

							const menuEntries =
								favorites?.map((f) => ({
									label: f.label ?? "",
									icon: f.icon,
									customData: f
								})) ?? [];

							const result = await this._helpers.showPopupMenu<FavoriteEntry>(
								{ x: payload.x, y: 48 },
								payload.windowIdentity,
								`There are no favorite ${type}s`,
								menuEntries,
								{
									mode: "native"
								}
							);

							if (isEmpty(result)) {
								this._logger?.info("Favorites Menu Dismissed");
							} else {
								this._logger?.info("Favorites Menu Item Selected", result);

								if (result.type === FAVORITE_TYPE_NAME_APP && !isEmpty(this._helpers?.launchApp)) {
									await this._helpers?.launchApp(result.typeId);
								}
							}
						}
					}
				}
			};
		}

		return actionMap;
	}
}
