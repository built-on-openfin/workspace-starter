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

const logger = createLogger("Menu");
let modules: ModuleEntry<Menus>[] = [];

/**
 * Initialize the menu provider.
 * @param options Options for the menu provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(options: MenusProviderOptions | undefined, helpers: ModuleHelpers): Promise<void> {
	if (options) {
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

			if (include || include === undefined) {
				const canShow = await checkConditions(platform, conditions);

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
	if (
		settings?.browserProvider?.menuOptions?.includeDefaults?.globalMenu !== undefined &&
		!settings.browserProvider.menuOptions.includeDefaults.globalMenu
	) {
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
	if (
		settings?.browserProvider?.menuOptions?.includeDefaults?.pageMenu !== undefined &&
		!settings.browserProvider.menuOptions.includeDefaults.pageMenu
	) {
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
	if (
		settings?.browserProvider?.menuOptions?.includeDefaults?.viewMenu !== undefined &&
		!settings.browserProvider.menuOptions.includeDefaults.viewMenu
	) {
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
			if (positionCustomId === undefined) {
				logger.warn("Entry type is specified as custom but no customId was provided");
			}

			entryIndex = menuEntries.findIndex(
				(menuEntry) =>
					menuEntry.data?.type === positionType && menuEntry.data?.action?.id === positionCustomId
			);

			if (entryIndex === -1) {
				logger.warn(`Unable to find menu with entry type: ${positionType} and customId: ${positionCustomId}`);
			}
		} else {
			entryIndex = menuEntries.findIndex((menuEntry) => menuEntry.data?.type === positionType);

			if (entryIndex === -1) {
				logger.warn(`Unable to find menu with entry type: ${positionType}`);
			}
		}

		if (entryIndex !== -1) {
			switch (positionOperation) {
				case "delete": {
					menuEntries.splice(entryIndex);
					break;
				}
				case "replaceLabel": {
					if (entry === undefined || entry.label === undefined) {
						logger.warn(
							`Asked to replace label of menu entry but not provided an entry to grab a label from or given an empty label. Target menu data type: ${positionType}`
						);
					} else {
						menuEntries[entryIndex].label = entry.label;
					}
					break;
				}
				case "after": {
					if (entry === undefined) {
						logger.warn(
							`You cannot insert a menu entry after the menu entry with data type: ${positionType} if you do not specify a menu entry`
						);
					} else {
						menuEntries.splice(entryIndex + 1, 0, entry);
					}
					break;
				}
				case "before": {
					if (entry === undefined) {
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
		if (menuModule.implementation) {
			const entries = await menuModule.implementation.get(menuType, platform, relatedMenuId);
			if (entries) {
				menuEntries = menuEntries.concat(entries as MenuEntry<T>[]);
			}
		}
	}
	return menuEntries;
}
