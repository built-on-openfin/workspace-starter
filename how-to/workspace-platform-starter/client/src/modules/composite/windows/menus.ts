import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type {
	MenuEntry,
	MenuType,
	Menus,
	RelatedMenuId
} from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "../../../framework/utils";
import { getAllUserWindows } from "./helper";
import type { WindowMenuSettings } from "./shapes";

/**
 * Implement the menus.
 */
export class WindowMenus implements Menus<WindowMenuSettings> {
	/**
	 * The helper methods to use.
	 */
	private _logger?: Logger;

	/**
	 * The helper methods to use.
	 */
	private _settings?: WindowMenuSettings;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<WindowMenuSettings>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("WindowMenus");
		this._settings = definition.data;
	}

	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 * @param relatedMenuId The related menu information (viewId/viewIds, pageId and window Id based on the type of menu).
	 * @returns The menu entries.
	 */
	public async get(
		menuType: MenuType,
		platform: WorkspacePlatformModule,
		relatedMenuId?: RelatedMenuId
	): Promise<MenuEntry[] | undefined> {
		if (menuType === "global" && !isEmpty(relatedMenuId?.windowIdentity)) {
			// you can customize the browser main menu here
			const includeShowAllWindows =
				isEmpty(this._settings?.showAllWindows?.include) || this._settings?.showAllWindows?.include;
			const includeHideAllWindows =
				isEmpty(this._settings?.hideAllWindows?.include) || this._settings?.hideAllWindows?.include;
			const includeHideOtherWindows =
				isEmpty(this._settings?.hideOtherWindows?.include) || this._settings?.hideOtherWindows?.include;

			const userWindows = await getAllUserWindows();

			const showAllWindowsEntry: MenuEntry = {
				label: this._settings?.showAllWindows?.menuLabel ?? "Show All Windows",
				icon: this._settings?.showAllWindows?.menuIcon,
				enabled: userWindows.length > 1,
				position: {
					type: "CloseWindow",
					operation: "before",
					...this._settings?.showAllWindows?.menuPosition
				},
				data: {
					type: "Custom",
					action: {
						id: "window-show-all"
					}
				}
			};

			const hideAllWindowsEntry: MenuEntry = {
				label: this._settings?.hideAllWindows?.menuLabel ?? "Hide All Windows",
				icon: this._settings?.hideAllWindows?.menuIcon,
				position: {
					type: "CloseWindow",
					operation: "before",
					...this._settings?.hideAllWindows?.menuPosition
				},
				data: {
					type: "Custom",
					action: {
						id: "window-hide-all"
					}
				}
			};

			const hideOtherWindowsEntry: MenuEntry = {
				label: this._settings?.hideOtherWindows?.menuLabel ?? "Hide Other Windows",
				icon: this._settings?.hideOtherWindows?.menuIcon,
				enabled: userWindows.length > 1,
				position: {
					type: "CloseWindow",
					operation: "before",
					...this._settings?.hideOtherWindows?.menuPosition
				},
				data: {
					type: "Custom",
					action: {
						id: "window-hide-others"
					}
				}
			};

			const menuItemsToReturn: MenuEntry[] = [];

			if (includeShowAllWindows) {
				menuItemsToReturn.push(showAllWindowsEntry);
			}

			if (includeHideAllWindows) {
				menuItemsToReturn.push(hideAllWindowsEntry);
			}

			if (includeHideOtherWindows) {
				menuItemsToReturn.push(hideOtherWindowsEntry);
			}

			if (this._settings?.separator !== "none" && menuItemsToReturn.length > 0) {
				menuItemsToReturn[0].separator = this._settings?.separator ?? "before";
			}

			return menuItemsToReturn;
		}
	}
}
