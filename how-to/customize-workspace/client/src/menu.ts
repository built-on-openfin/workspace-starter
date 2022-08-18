import {
	GlobalContextMenuItemTemplate,
	GlobalContextMenuOptionType,
	PageTabContextMenuItemTemplate,
	PageTabContextMenuOptionType,
	ViewTabContextMenuTemplate,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import { ACTION_IDS } from "./actions";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import { logger } from "./logger-provider";
import { getSettings } from "./settings";

function updateGlobalMenuEntry(
	menuEntries: GlobalContextMenuItemTemplate[],
	dataType: string,
	action: "REPLACE-LABEL" | "INSERT-BEFORE" | "INSERT-AFTER" | "DELETE",
	entry?: GlobalContextMenuItemTemplate
) {
	const entryIndex = menuEntries.findIndex(
		(menuEntry) => menuEntry.data !== undefined && menuEntry.data.type === dataType
	);
	if (entryIndex === -1) {
		logger.warn("Menu", `Unable to find global menu with entry type: ${dataType}`);
	} else {
		switch (action) {
			case "DELETE": {
				menuEntries.splice(entryIndex);
				break;
			}
			case "REPLACE-LABEL": {
				if (entry === undefined || entry.label === undefined) {
					logger.warn(
						"Menu",
						`Asked to replace label of menu entry but not provided an entry to grab a label from or given an empty label. Target menu data type: ${dataType}`
					);
				} else {
					menuEntries[entryIndex].label = entry.label;
				}
				break;
			}
			case "INSERT-AFTER": {
				if (entry === undefined) {
					logger.warn(
						"Menu",
						`You cannot insert a menu entry after the menu entry with data type: ${dataType} if you do not specify a menu entry`
					);
				} else {
					menuEntries.splice(entryIndex + 1, 0, entry);
				}
				break;
			}
			case "INSERT-BEFORE": {
				if (entry === undefined) {
					logger.warn(
						"Menu",
						`You cannot insert a menu entry before the menu entry with data type: ${dataType} if you do not specify a menu entry`
					);
				} else if (entryIndex === 0) {
					menuEntries.unshift(entry);
				} else {
					menuEntries.splice(entryIndex - 1, 0, entry);
				}
				break;
			}
		}
	}
	return menuEntries;
}

export async function getGlobalMenu(
	defaultGlobalContextMenu: GlobalContextMenuItemTemplate[] = []
): Promise<GlobalContextMenuItemTemplate[]> {
	const settings = await getSettings();
	const allowedMenuActions = settings?.browserProvider?.supportedMenuActions;

	let menuItems = defaultGlobalContextMenu;

	if (allowedMenuActions === undefined || allowedMenuActions.includes(ACTION_IDS.notificationToggle)) {
		menuItems = updateGlobalMenuEntry(
			defaultGlobalContextMenu,
			GlobalContextMenuOptionType.OpenStorefront,
			"INSERT-AFTER",
			{
				label: "Toggle Notification Center",
				data: {
					type: GlobalContextMenuOptionType.Custom,
					action: {
						id: ACTION_IDS.notificationToggle
					}
				}
			}
		);
	}

	if (allowedMenuActions === undefined || allowedMenuActions.includes(ACTION_IDS.homeShow)) {
		menuItems = updateGlobalMenuEntry(menuItems, GlobalContextMenuOptionType.OpenStorefront, "INSERT-AFTER", {
			label: "Open Home",
			data: {
				type: GlobalContextMenuOptionType.Custom,
				action: {
					id: ACTION_IDS.homeShow
				}
			}
		});
	}

	menuItems = updateGlobalMenuEntry(menuItems, GlobalContextMenuOptionType.Quit, "REPLACE-LABEL", {
		type: "normal",
		label: "Quit App",
		data: {
			type: GlobalContextMenuOptionType.Quit
		}
	});

	if (
		isAuthenticationEnabled() &&
		(allowedMenuActions === undefined || allowedMenuActions.includes(ACTION_IDS.logoutAndQuit)) &&
		!(await authProvider.isAuthenticationRequired())
	) {
		menuItems = updateGlobalMenuEntry(menuItems, GlobalContextMenuOptionType.Quit, "INSERT-AFTER", {
			label: "Log Out and Quit App",
			data: {
				type: GlobalContextMenuOptionType.Custom,
				action: {
					id: ACTION_IDS.logoutAndQuit
				}
			}
		});
	}

	return menuItems;
}

export async function getPageMenu(
	defaultPageContextMenu: PageTabContextMenuItemTemplate[] = []
): Promise<PageTabContextMenuItemTemplate[]> {
	const settings = await getSettings();
	const allowedMenuActions = settings?.browserProvider?.supportedMenuActions;

	const customMenuEntries: PageTabContextMenuItemTemplate[] = [];

	if (allowedMenuActions === undefined || allowedMenuActions.includes(ACTION_IDS.movePageToNewWindow)) {
		customMenuEntries.push({
			label: "Move Page to new Window",
			data: {
				type: PageTabContextMenuOptionType.Custom,
				action: {
					id: ACTION_IDS.movePageToNewWindow
				}
			}
		});
	}

	if (customMenuEntries.length > 0) {
		customMenuEntries.push({
			type: "separator",
			data: undefined
		});
	}

	return [...customMenuEntries, ...defaultPageContextMenu];
}

export async function getViewMenu(
	defaultViewContextMenu: ViewTabContextMenuTemplate[] = []
): Promise<ViewTabContextMenuTemplate[]> {
	const settings = await getSettings();
	const allowedMenuActions = settings?.browserProvider?.supportedMenuActions;
	const customMenuEntries: ViewTabContextMenuTemplate[] = [];

	if (allowedMenuActions === undefined || allowedMenuActions.includes(ACTION_IDS.moveViewToNewWindow)) {
		customMenuEntries.push({
			label: "Move View(s) to new Window",
			data: {
				type: ViewTabMenuOptionType.Custom,
				action: {
					id: ACTION_IDS.moveViewToNewWindow
				}
			}
		});
	}

	if (
		allowedMenuActions === undefined ||
		allowedMenuActions.includes(ACTION_IDS.raiseCreateAppDefinitionIntent)
	) {
		customMenuEntries.push({
			label: "Create App Definition",
			data: {
				type: ViewTabMenuOptionType.Custom,
				action: {
					id: ACTION_IDS.raiseCreateAppDefinitionIntent
				}
			}
		});
	}

	if (customMenuEntries.length > 0) {
		customMenuEntries.push({
			type: "separator",
			data: undefined
		});
	}

	return [...customMenuEntries, ...defaultViewContextMenu];
}
