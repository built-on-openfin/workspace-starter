import type OpenFin from "@openfin/core";
import {
	getCurrentSync,
	type GlobalContextMenuItemTemplate,
	type GlobalContextMenuOptionType,
	type PageTabContextMenuItemTemplate,
	type PageTabContextMenuOptionType,
	type ViewTabContextMenuTemplate,
	type ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import { checkConditions } from "./conditions";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import { getSettings } from "./settings";
import type { ModuleEntry, ModuleHelpers } from "./shapes";
import type {
	MenuEntry,
	MenuOptionType,
	MenuPositionOperation,
	Menus,
	MenusProviderOptions,
	MenuTemplateType,
	MenuType,
	RelatedMenuId
} from "./shapes/menu-shapes";
import { getCurrentPalette } from "./themes";
import { isBoolean, isEmpty, randomUUID } from "./utils";

const logger = createLogger("Menu");
let modules: ModuleEntry<Menus>[] = [];
let menuProviderOptions: MenusProviderOptions | undefined;
let platformRootUrl: string | undefined;

/**
 * Initialize the menu provider.
 * @param options Options for the menu provider.
 * @param helpers Module helpers to pass to any loaded modules.
 * @param rootUrl The root url for loading content.
 */
export async function init(
	options: MenusProviderOptions | undefined,
	helpers: ModuleHelpers,
	rootUrl: string | undefined
): Promise<void> {
	if (!isEmpty(options)) {
		platformRootUrl = rootUrl;
		menuProviderOptions = options;
		modules = await loadModules<Menus>(options, "menus");
		await initializeModules<Menus>(modules, helpers);
	}
}

/**
 * Build a menu from the default entries and the entries from config.
 * @param defaultEntries The default menu entries.
 * @param configEntries The config menu entries.
 * @returns The combined menu entries.
 */
export async function buildMenu<T extends MenuTemplateType, U extends MenuOptionType<T>>(
	defaultEntries?: T[],
	configEntries?: MenuEntry<U>[]
): Promise<T[]> {
	const menuItems = defaultEntries ?? [];

	if (Array.isArray(configEntries)) {
		const platform = getCurrentSync();

		for (const menuItem of configEntries) {
			const { position, include, conditions, separator, ...menuItemTemplate } = menuItem;

			if (include ?? isEmpty(include)) {
				const canShow = await checkConditions(platform, conditions, {
					callerType: "menu",
					customData: menuItem
				});

				if (canShow) {
					const insertedIndex = updateMenuEntries(
						menuItems,
						position?.type,
						position?.operation,
						position?.customId,
						menuItemTemplate as unknown as T
					);

					if (insertedIndex >= 0) {
						const sep = { type: "separator" } as T;
						if (separator === "before") {
							if (insertedIndex === 0) {
								menuItems.unshift(sep);
							} else {
								menuItems.splice(insertedIndex, 0, sep);
							}
						} else if (separator === "after") {
							if (insertedIndex === menuItems.length - 1) {
								menuItems.push(sep);
							} else {
								menuItems.splice(insertedIndex + 1, 0, sep);
							}
						}
					}
				}
			}
		}
	}

	return menuItems;
}

/**
 * Get the entries for the global menu.
 * @param defaultGlobalContextMenu The default entries for the global context menu.
 * @param relatedMenuId The identity to associate the menu.
 * @returns The menu entries.
 */
export async function getGlobalMenu(
	defaultGlobalContextMenu?: GlobalContextMenuItemTemplate[],
	relatedMenuId?: RelatedMenuId
): Promise<GlobalContextMenuItemTemplate[]> {
	const settings = await getSettings();
	const menuEntries = (settings?.browserProvider?.globalMenu ?? []).concat(
		await getModuleMenuEntries<GlobalContextMenuOptionType>("global", relatedMenuId)
	);
	const globalMenu = settings?.browserProvider?.menuOptions?.includeDefaults?.globalMenu;
	if (isBoolean(globalMenu) && !globalMenu) {
		return buildMenu(undefined, menuEntries);
	}
	return buildMenu(defaultGlobalContextMenu, menuEntries);
}

/**
 * Get the entries for the page menu.
 * @param defaultPageContextMenu The default entries for the page context menu.
 * @param relatedMenuId The identity to associate the menu.
 * @returns The menu entries.
 */
export async function getPageMenu(
	defaultPageContextMenu: PageTabContextMenuItemTemplate[],
	relatedMenuId?: RelatedMenuId
): Promise<PageTabContextMenuItemTemplate[]> {
	const settings = await getSettings();
	const menuEntries = (settings?.browserProvider?.pageMenu ?? []).concat(
		await getModuleMenuEntries<PageTabContextMenuOptionType>("page", relatedMenuId)
	);
	const pageMenu = settings?.browserProvider?.menuOptions?.includeDefaults?.pageMenu;
	if (isBoolean(pageMenu) && !pageMenu) {
		return buildMenu(undefined, menuEntries);
	}
	return buildMenu(defaultPageContextMenu, menuEntries);
}

/**
 * Get the entries for the view menu.
 * @param defaultViewContextMenu The default entries for the view context menu.
 * @param relatedMenuId The identity to associate the menu.
 * @returns The menu entries.
 */
export async function getViewMenu(
	defaultViewContextMenu: ViewTabContextMenuTemplate[],
	relatedMenuId?: RelatedMenuId
): Promise<ViewTabContextMenuTemplate[]> {
	const settings = await getSettings();
	const menuEntries = (settings?.browserProvider?.viewMenu ?? []).concat(
		await getModuleMenuEntries<ViewTabMenuOptionType>("view", relatedMenuId)
	);
	const viewMenu = settings?.browserProvider?.menuOptions?.includeDefaults?.viewMenu;
	if (isBoolean(viewMenu) && !viewMenu) {
		return buildMenu(undefined, menuEntries);
	}
	return buildMenu(defaultViewContextMenu, menuEntries);
}

/**
 * Update a list of menu entries based on a specific operation.
 * @param menuEntries The menu entries to update.
 * @param positionType The type of positioning.
 * @param positionOperation The operation to perform.
 * @param positionCustomId A custom id for lookup.
 * @param entry The entry to operate with.
 * @returns The index of the new item.
 */
function updateMenuEntries<T extends MenuTemplateType, U extends MenuOptionType<T>>(
	menuEntries: T[],
	positionType?: U,
	positionOperation?: MenuPositionOperation,
	positionCustomId?: string,
	entry?: T
): number {
	if (positionOperation === "start") {
		if (entry) {
			menuEntries.unshift(entry);
		} else {
			logger.warn("Entry type is specified as start but no entry provided");
		}
	} else if (positionOperation === "end") {
		if (entry) {
			menuEntries.push(entry);
		} else {
			logger.warn("Entry type is specified as end but no entry provided");
		}
	} else {
		let entryIndex: number;

		if (positionType === "Custom") {
			if (isEmpty(positionCustomId)) {
				logger.warn("Entry type is specified as custom but no customId was provided");
			}

			entryIndex = menuEntries.findIndex(
				(menuEntry) =>
					menuEntry.data?.type === positionType && menuEntry.data?.action?.id === positionCustomId
			);

			if (entryIndex === -1) {
				logger.warn(
					`Unable to find menu with entry type: ${JSON.stringify(
						positionType
					)} and customId: ${positionCustomId}`
				);
			}
		} else {
			entryIndex = menuEntries.findIndex((menuEntry) => menuEntry.data?.type === positionType);

			if (entryIndex === -1) {
				logger.warn(`Unable to find menu with entry type: ${positionType}`);
			}
		}

		if (entryIndex !== -1 && positionOperation) {
			switch (positionOperation) {
				case "delete": {
					menuEntries.splice(entryIndex);
					break;
				}
				case "replaceLabel": {
					const label = entry?.label;
					if (isEmpty(label)) {
						logger.warn(
							`Asked to replace label of menu entry but not provided an entry to grab a label from or given an empty label. Target menu data type: ${positionType}`
						);
					} else {
						menuEntries[entryIndex].label = label;
					}
					break;
				}
				case "after": {
					if (isEmpty(entry)) {
						logger.warn(
							`You cannot insert a menu entry after the menu entry with data type: ${positionType} if you do not specify a menu entry`
						);
					} else {
						menuEntries.splice(entryIndex + 1, 0, entry);
					}
					break;
				}
				case "before": {
					if (isEmpty(entry)) {
						logger.warn(
							`You cannot insert a menu entry before the menu entry with data type: ${positionType} if you do not specify a menu entry`
						);
					} else if (entryIndex === 0) {
						menuEntries.unshift(entry);
					} else {
						menuEntries.splice(entryIndex, 0, entry);
					}
					break;
				}
			}
		}
	}
	return entry ? menuEntries.indexOf(entry) : -1;
}

/**
 * Get the entries for the specified menu type from the modules.
 * @param menuType The menu type to look for.
 * @param relatedMenuId The identity to associate the menu.
 * @returns The menu entries from the module for the specified type.
 */
async function getModuleMenuEntries<T extends MenuOptionType<MenuTemplateType>>(
	menuType: MenuType,
	relatedMenuId?: RelatedMenuId
): Promise<MenuEntry<T>[]> {
	const platform = getCurrentSync();
	let menuEntries: MenuEntry<T>[] = [];
	for (const menuModule of modules) {
		const entries = await menuModule.implementation.get(menuType, platform, relatedMenuId);
		if (entries) {
			menuEntries = menuEntries.concat(entries as MenuEntry<T>[]);
		}
	}
	return menuEntries;
}

/**
 * Show a custom menu.
 * @param position The position to show the menu.
 * @param position.x The x position to show the menu.
 * @param position.y The y position to show the menu.
 * @param parentIdentity The identity of the parent window.
 * @param noEntryText The text to display if there are no entries.
 * @param menuEntries The menu entries to display.
 * @param options The options for displaying the menu.
 * @param options.mode Display as native menu or custom popup.
 * @returns The menu entry.
 */
export async function showPopupMenu<T = unknown>(
	position: { x: number; y: number },
	parentIdentity: OpenFin.Identity,
	noEntryText: string,
	menuEntries: { label: string; customData: T; icon?: string }[],
	options?: {
		mode?: "native" | "custom";
	}
): Promise<T | undefined> {
	if ((options?.mode ?? "native") === "native") {
		return showNativePopupMenu(position, parentIdentity, noEntryText, menuEntries);
	}

	return showHtmlPopupMenu(position, parentIdentity, noEntryText, menuEntries);
}

/**
 * Show a custom menu using popup window.
 * @param position The position to show the menu.
 * @param position.x The x position to show the menu.
 * @param position.y The y position to show the menu.
 * @param parentIdentity The identity of the parent window.
 * @param noEntryText The text to display if there are no entries.
 * @param menuEntries The menu entries to display.
 * @returns The menu entry.
 */
export async function showHtmlPopupMenu<T = unknown>(
	position: { x: number; y: number },
	parentIdentity: OpenFin.Identity,
	noEntryText: string,
	menuEntries: { label: string; customData: T; icon?: string }[]
): Promise<T | undefined> {
	const parentWindow = fin.Window.wrapSync(parentIdentity);
	const parentBounds = await parentWindow.getBounds();

	const platformWindow = fin.Window.wrapSync(fin.me.identity);

	const currentPalette = await getCurrentPalette();

	const result = await platformWindow.showPopupWindow({
		name: randomUUID(),
		initialOptions: {
			showTaskbarIcon: false,
			backgroundColor: currentPalette?.backgroundPrimary,
			customData: {
				noEntryText,
				menuEntries,
				palette: {
					backgroundPrimary: currentPalette?.backgroundPrimary,
					textDefault: currentPalette?.textDefault,
					inputBackground: currentPalette?.inputBackground
				}
			}
		},
		url: menuProviderOptions?.popupHtml ?? `${platformRootUrl}/common/popups/menu/index.html`,
		x: parentBounds.left + position.x,
		y: parentBounds.top + position.y,
		width: menuProviderOptions?.menuWidth ?? 200,
		height: menuEntries.length * (menuProviderOptions?.menuItemHeight ?? 32)
	});

	if (result.result === "clicked") {
		return result.data as T;
	}
}

/**
 * Show the popup menu.
 * @param position The position to display the menu.
 * @param position.x The x position to display the menu.
 * @param position.y The y position to display the menu.
 * @param parentIdentity The identity of the window to use for showing the popup.
 * @param noEntryText The text to display if there are no entries.
 * @param menuEntries The menu entries to display.
 * @returns The selected entry or undefined if menu was dismissed.
 */
export async function showNativePopupMenu<T = unknown>(
	position: { x: number; y: number },
	parentIdentity: OpenFin.Identity,
	noEntryText: string,
	menuEntries: { label: string; customData: T; icon?: string }[]
): Promise<T | undefined> {
	const parentWindow = fin.Window.wrapSync(parentIdentity);

	const template: OpenFin.MenuItemTemplate[] = menuEntries.map((m) => ({
		label: m.label,
		icon: m.icon,
		data: m.customData
	}));

	if (isEmpty(template) || template.length === 0) {
		template.push({
			label: noEntryText,
			enabled: false
		});
	}

	const r = await parentWindow.showPopupMenu({
		template,
		x: position.x,
		y: position.y
	});

	if (r.result === "clicked") {
		return r.data as T;
	}
}
