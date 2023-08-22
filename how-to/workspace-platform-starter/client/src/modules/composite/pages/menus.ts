import type OpenFin from "@openfin/core";
import type { GlobalContextMenuOptionType, Page, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type {
	MenuEntry,
	MenuType,
	Menus,
	RelatedMenuId
} from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "../../../framework/utils";
import type { PageMenuSettings } from "./shapes";

/**
 * Implement the menus.
 */
export class PageMenus implements Menus<PageMenuSettings> {
	/**
	 * The helper methods to use.
	 */
	private _logger?: Logger;

	/**
	 * The helper methods to use.
	 */
	private _settings?: PageMenuSettings;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<PageMenuSettings>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("PageMenus");
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
			const pages: Page[] = await platform.Storage.getPages();
			pages.sort((a, b) => a.title.localeCompare(b.title));
			const includeDeletePage =
				isEmpty(this._settings?.deletePage?.include) || this._settings?.deletePage?.include;
			const includeShowPage = isEmpty(this._settings?.showPage?.include) || this._settings?.showPage?.include;
			const showPagesMenu: OpenFin.MenuItemTemplate[] = [];
			const showPageMenuEntry: MenuEntry = {
				label: this._settings?.showPage?.menuLabel ?? "Show Page",
				icon: this._settings?.showPage?.menuIcon,
				enabled: pages.length > 0,
				submenu: [],
				position: {
					type: "SavePageAs",
					operation: "after",
					customId: "ShowPage",
					...this._settings?.showPage?.menuPosition
				}
			};
			const deletePageMenuEntry: MenuEntry = {
				label: this._settings?.deletePage?.menuLabel ?? "Delete Page",
				icon: this._settings?.deletePage?.menuIcon,
				enabled: pages.length > 0,
				submenu: [],
				position: {
					type: "SavePageAs",
					operation: "after",
					customId: "ShowDelete",
					...this._settings?.deletePage?.menuPosition
				}
			};

			const deletePagesMenu: OpenFin.MenuItemTemplate[] = [];

			let browserWindowIdentity: OpenFin.Identity | undefined = relatedMenuId?.windowIdentity;

			if (browserWindowIdentity) {
				const browserWindow = platform.Browser.wrapSync(browserWindowIdentity);

				const options = await browserWindow.openfinWindow.getOptions();
				const workspaceOptions: OpenFin.WorkspacePlatformOptions = options.workspacePlatform;

				if (workspaceOptions.disableMultiplePages === true) {
					browserWindowIdentity = undefined;
				}
			}

			const allOpenPages = await platform.Browser.getAllAttachedPages();

			if (pages.length > 0) {
				for (const page of pages) {
					const existing = allOpenPages.find((openPage) => page.pageId === openPage.pageId);
					const isActiveExistingPageOnCurrentWindow =
						!isEmpty(existing?.parentIdentity) &&
						existing?.parentIdentity.name === browserWindowIdentity?.name &&
						existing?.isActive;
					showPagesMenu.push({
						label: page.title,
						type: "normal",
						enabled: !isActiveExistingPageOnCurrentWindow,
						data: {
							type: "Custom" as GlobalContextMenuOptionType.Custom,
							action: {
								id: "page-open",
								customData: {
									pageId: page.pageId,
									windowIdentity: browserWindowIdentity
								}
							}
						}
					});
					deletePagesMenu.push({
						label: page.title,
						type: "normal",
						enabled: isEmpty(existing),
						data: {
							type: "Custom" as GlobalContextMenuOptionType.Custom,
							action: {
								id: "page-delete",
								customData: {
									pageId: page.pageId
								}
							}
						}
					});
				}
				if (showPageMenuEntry.submenu) {
					showPageMenuEntry.submenu.push(...showPagesMenu);
				}
				if (deletePageMenuEntry.submenu) {
					deletePageMenuEntry.submenu.push(...deletePagesMenu);
				}
			}

			const menuItemsToReturn: MenuEntry[] = [];

			if (includeDeletePage) {
				menuItemsToReturn.push(deletePageMenuEntry);
			}

			if (includeShowPage) {
				menuItemsToReturn.push(showPageMenuEntry);
			}

			return menuItemsToReturn;
		}
	}
}
