import type OpenFin from "@openfin/core";
import type { GlobalContextMenuOptionType, Page, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Menus } from "customize-workspace/shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { MenuEntry, MenuType, RelatedMenuId } from "customize-workspace/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import type { PageMenuSettings } from "./shapes";

/**
 * Implement the menus.
 */
export class PageMenus implements Menus<PageMenuSettings> {
	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * The helper methods to use.
	 */
	private _settings: PageMenuSettings;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param createLogger For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<PageMenuSettings>,
		createLogger: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = createLogger("PageMenus");
		this._settings = definition.data;
	}

	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 * @param relatedMenuId The related menu information (viewId/viewIds, pageId and window Id based on the type of menu).
	 */
	public async get(
		menuType: MenuType,
		platform: WorkspacePlatformModule,
		relatedMenuId?: RelatedMenuId
	): Promise<MenuEntry[] | undefined> {
		if (menuType === "global" && relatedMenuId.windowIdentity !== undefined) {
			// you can customize the browser main menu here
			const pages: Page[] = await platform.Storage.getPages();
			const includeDeletePage =
				this._settings?.deletePage?.include === undefined || this._settings?.deletePage?.include;
			const includeShowPage =
				this._settings?.showPage?.include === undefined || this._settings?.showPage?.include;
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

			let browserWindowIdentity: OpenFin.Identity = relatedMenuId.windowIdentity;

			const browserWindow = platform.Browser.wrapSync(browserWindowIdentity);

			const options = await browserWindow.openfinWindow.getOptions();
			const workspaceOptions: OpenFin.WorkspacePlatformOptions = options.workspacePlatform;

			if (workspaceOptions.disableMultiplePages === true) {
				browserWindowIdentity = undefined;
			}

			const allOpenPages = await platform.Browser.getAllAttachedPages();

			if (pages.length > 0) {
				for (const page of pages) {
					const existingPage = allOpenPages.find((openPage) => page.pageId === openPage.pageId);
					const isActiveExistingPageOnCurrentWindow =
						existingPage !== undefined &&
						existingPage.parentIdentity.name === browserWindowIdentity.name &&
						existingPage?.isActive;
					showPagesMenu.push({
						label: page.title,
						type: "normal",
						enabled: !isActiveExistingPageOnCurrentWindow,
						data: {
							type: "Custom" as GlobalContextMenuOptionType.Custom,
							action: {
								id: existingPage !== undefined ? "page-show" : "page-open",
								customData: {
									pageId: page.pageId,
									windowIdentity:
										existingPage !== undefined ? existingPage.parentIdentity : browserWindowIdentity
								}
							}
						}
					});
					deletePagesMenu.push({
						label: page.title,
						type: "normal",
						enabled: existingPage === undefined,
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

			const menuItemsToReturn = [];

			if (includeDeletePage) {
				menuItemsToReturn.push(deletePageMenuEntry);
			}

			if (includeShowPage) {
				menuItemsToReturn.push(showPageMenuEntry);
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return menuItemsToReturn;
		}
	}
}
