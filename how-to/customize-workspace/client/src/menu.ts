import {
	GlobalContextMenuItemTemplate,
	GlobalContextMenuOptionType,
	PageTabContextMenuItemTemplate,
	PageTabContextMenuOptionType,
	ViewTabContextMenuTemplate,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import { createLogger } from "./logger-provider";
import { getSettings } from "./settings";
import { MenuEntry, MenuPositionOperation } from "./shapes";

const logger = createLogger("Menu");

type MenuTemplateType =
	| GlobalContextMenuItemTemplate
	| PageTabContextMenuItemTemplate
	| ViewTabContextMenuTemplate;
type MenuOptionType<T> = T extends GlobalContextMenuItemTemplate
	? GlobalContextMenuOptionType
	: T extends PageTabContextMenuItemTemplate
	? PageTabContextMenuOptionType
	: ViewTabMenuOptionType;

function updateMenuEntries<T extends MenuTemplateType, U extends MenuOptionType<T>>(
	menuEntries: T[],
	positionType?: U,
	positionOperation?: MenuPositionOperation,
	entry?: T
): number {
	if (positionOperation === "start") {
		menuEntries.unshift(entry);
	} else if (positionOperation === "end") {
		menuEntries.push(entry);
	} else {
		const entryIndex = menuEntries.findIndex((menuEntry) => menuEntry.data?.type === positionType);

		if (entryIndex === -1) {
			logger.warn(`Unable to find global menu with entry type: ${positionType}`);
		} else {
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
				case "insertAfter": {
					if (entry === undefined) {
						logger.warn(
							`You cannot insert a menu entry after the menu entry with data type: ${positionType} if you do not specify a menu entry`
						);
					} else {
						menuEntries.splice(entryIndex + 1, 0, entry);
					}
					break;
				}
				case "insertBefore": {
					if (entry === undefined) {
						logger.warn(
							`You cannot insert a menu entry before the menu entry with data type: ${positionType} if you do not specify a menu entry`
						);
					} else if (entryIndex === 0) {
						menuEntries.unshift(entry);
					} else {
						menuEntries.splice(entryIndex + 1, 0, entry);
					}
					break;
				}
			}
		}
	}
	return menuEntries.indexOf(entry);
}

export async function buildMenu<T extends MenuTemplateType, U extends MenuOptionType<T>>(
	defaultEntries: T[],
	configEntries?: MenuEntry<U>[]
): Promise<T[]> {
	const menuItems = defaultEntries ?? [];

	if (Array.isArray(configEntries)) {
		for (const menuItem of configEntries) {
			if (menuItem.include) {
				let canShow = true;

				if (menuItem.conditions?.isAuthenticationEnabled) {
					canShow = isAuthenticationEnabled() && !(await authProvider.isAuthenticationRequired());
				}

				if (canShow) {
					const insertedIndex = updateMenuEntries(
						menuItems,
						menuItem.position.type,
						menuItem.position.operation,
						{
							label: menuItem.label,
							data: menuItem.data
						} as unknown as T
					);

					if (insertedIndex >= 0) {
						const sep = { type: "separator" } as T;
						if (menuItem.separator === "before") {
							if (insertedIndex === 0) {
								menuItems.unshift(sep);
							} else {
								menuItems.splice(insertedIndex, 0, sep);
							}
						} else if (menuItem.separator === "after") {
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

export async function getGlobalMenu(
	defaultGlobalContextMenu?: GlobalContextMenuItemTemplate[]
): Promise<GlobalContextMenuItemTemplate[]> {
	const settings = await getSettings();
	return buildMenu(defaultGlobalContextMenu, settings?.browserProvider?.globalMenu);
}

export async function getPageMenu(
	defaultPageContextMenu: PageTabContextMenuItemTemplate[]
): Promise<PageTabContextMenuItemTemplate[]> {
	const settings = await getSettings();
	return buildMenu(defaultPageContextMenu, settings?.browserProvider?.pageMenu);
}

export async function getViewMenu(
	defaultViewContextMenu: ViewTabContextMenuTemplate[]
): Promise<ViewTabContextMenuTemplate[]> {
	const settings = await getSettings();
	return buildMenu(defaultViewContextMenu, settings?.browserProvider?.viewMenu);
}
