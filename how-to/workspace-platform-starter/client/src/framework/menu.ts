import type OpenFin from "@openfin/core";
import type { CustomActionSpecifier } from "@openfin/workspace";
import {
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap,
	type GlobalContextMenuItemTemplate,
	type GlobalContextMenuOptionType,
	type PageTabContextMenuItemTemplate,
	type PageTabContextMenuOptionType,
	type ViewTabContextMenuTemplate,
	type ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import { callAction } from "./actions";
import { checkConditions } from "./conditions";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import { getSettings } from "./settings";
import type {
	MenuEntry,
	MenuOptionType,
	MenuPositionOperation,
	MenuTemplateType,
	MenuType,
	Menus,
	MenusProviderOptions,
	PopupMenuEntry,
	PopupMenuStyles,
	RelatedMenuId
} from "./shapes/menu-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import type { ColorSchemeMode } from "./shapes/theme-shapes";
import {
	getCurrentColorSchemeMode,
	getCurrentIconFolder,
	getCurrentPalette,
	getNativeColorSchemeMode,
	themeUrl
} from "./themes";
import { isBoolean, isEmpty, isStringValue, randomUUID } from "./utils";
import { imageUrlToDataUrl } from "./utils-img";
import { findMonitorContainingPoint } from "./utils-position";

const logger = createLogger("Menu");
let modules: ModuleEntry<Menus>[] = [];
let menuProviderOptions: MenusProviderOptions | undefined;
let platformRootUrl: string | undefined;
let activePopupMenuId: string | undefined;
let activePopupMenuTimerId: number | undefined;

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
 * Get the popup menu style.
 * @returns The popup menu style.
 */
export function getPopupMenuStyle(): PopupMenuStyles {
	return menuProviderOptions?.popupMenuStyle ?? "platform";
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
 * @param options.popupMenuStyle Display as native menu or custom popup.
 * @returns The menu entry.
 */
export async function showPopupMenu<T = unknown>(
	position: { x: number; y: number },
	parentIdentity: OpenFin.Identity,
	noEntryText: string,
	menuEntries: PopupMenuEntry<T>[],
	options?: {
		popupMenuStyle?: PopupMenuStyles;
	}
): Promise<T | undefined> {
	const defaultMenuStyle = getPopupMenuStyle();
	const popupMenuStyle = options?.popupMenuStyle ?? defaultMenuStyle;

	if (popupMenuStyle === "platform" || popupMenuStyle === "native") {
		return showNativePopupMenu(position, parentIdentity, noEntryText, menuEntries);
	}

	return showHtmlPopupMenu(
		{ x: position.x - 16, y: position.y - 8 },
		parentIdentity,
		noEntryText,
		menuEntries
	);
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
	menuEntries: PopupMenuEntry<T>[]
): Promise<T | undefined> {
	if (activePopupMenuId) {
		try {
			const win = fin.Window.wrapSync({ uuid: fin.me.uuid, name: activePopupMenuId });
			await win.close();
		} catch {
		} finally {
			activePopupMenuId = undefined;
		}
	}
	if (activePopupMenuTimerId) {
		window.clearInterval(activePopupMenuTimerId);
		activePopupMenuTimerId = undefined;
	}

	const parentWindow = fin.Window.wrapSync(parentIdentity);
	const parentBounds = await parentWindow.getBounds();

	const platformWindow = fin.Window.wrapSync(fin.me.identity);

	const currentPalette = await getCurrentPalette();
	const iconFolder = await getCurrentIconFolder();
	const colorScheme = await getCurrentColorSchemeMode();

	const menuDimensions = calculateMenuInfo(iconFolder, colorScheme, menuEntries, noEntryText);

	let x = Math.floor(parentBounds.left + position.x);
	let y = Math.floor(parentBounds.top + position.y);
	const width = menuDimensions.width;
	const height = menuDimensions.height;

	const monitorInfo = await findMonitorContainingPoint({ x, y });

	if (x + width > monitorInfo.availableRect.right) {
		x = monitorInfo.availableRect.right - width - 20;
	}
	if (y + height > monitorInfo.availableRect.bottom) {
		y = monitorInfo.availableRect.bottom - height - 20;
	}

	const bounds = { x, y, width, height };

	const popupUrl = menuProviderOptions?.popupHtml ?? `${platformRootUrl}/common/popups/menu/index.html`;

	activePopupMenuId = randomUUID();
	// Keep track of the window, so if it closes by a mechanism we don't monitor
	// we can cleanup the active id.
	activePopupMenuTimerId = window.setInterval(async () => {
		try {
			if (activePopupMenuId) {
				const win = fin.Window.wrapSync({ uuid: fin.me.identity.uuid, name: activePopupMenuId });
				const state = await win.getState();
				if (state !== "normal") {
					activePopupMenuId = undefined;
					window.clearInterval(activePopupMenuTimerId);
					activePopupMenuTimerId = undefined;
				}
			}
		} catch {
			activePopupMenuId = undefined;
			window.clearInterval(activePopupMenuTimerId);
			activePopupMenuTimerId = undefined;
		}
	}, 1000);

	return new Promise<T | undefined>((resolve) => {
		// Do this as a background task so that current events are not held up
		window.setTimeout(async () => {
			let ret: T | undefined;

			try {
				const result = await platformWindow.showPopupWindow({
					name: activePopupMenuId,
					initialOptions: {
						showTaskbarIcon: false,
						smallWindow: true,
						contextMenu: false,
						backgroundColor: currentPalette?.backgroundPrimary,
						customData: {
							noEntryText,
							menuEntries: menuDimensions.entries,
							palette: currentPalette,
							colorScheme,
							menuProviderOptions,
							popupUrl,
							monitorRect: monitorInfo,
							bounds
						}
					},
					url: popupUrl,
					...bounds,
					blurBehavior: "modal"
				});

				activePopupMenuId = undefined;
				window.clearInterval(activePopupMenuTimerId);
				activePopupMenuTimerId = undefined;

				if (result.result === "clicked") {
					ret = result.data as T;
				}
			} catch {}

			resolve(ret);
		}, 100);
	});
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
	menuEntries: PopupMenuEntry<T>[]
): Promise<T | undefined> {
	const parentWindow = fin.Window.wrapSync(parentIdentity);

	const finalEntries: PopupMenuEntry<T>[] = [];

	const iconFolder = await getCurrentIconFolder();
	const colorScheme = await getNativeColorSchemeMode();

	for (const menuEntry of menuEntries.filter((m) => m.visible ?? true)) {
		let iconBase64: string | undefined = themeUrl(menuEntry.icon, iconFolder, colorScheme);
		if (isStringValue(iconBase64)) {
			iconBase64 = await imageUrlToDataUrl(iconBase64, 20);
		}
		finalEntries.push({
			...menuEntry,
			icon: iconBase64
		});
	}

	if (isEmpty(finalEntries) || finalEntries.length === 0) {
		finalEntries.push({
			label: noEntryText,
			enabled: false
		});
	}

	const r = await parentWindow.showPopupMenu({
		template: finalEntries,
		x: position.x,
		y: position.y
	});

	if (r.result === "clicked") {
		return r.data as T;
	}
}

/**
 * Calculate the info for a menu.
 * @param iconFolder The folder for substituting icons.
 * @param colorScheme The color scheme for icons.
 * @param entries The entries to measure.
 * @param noEntryText The text to display if there are no entries.
 * @returns The calculated dimensions and finalized entries.
 */
function calculateMenuInfo<T>(
	iconFolder: string,
	colorScheme: ColorSchemeMode,
	entries: (PopupMenuEntry<T> & { y?: number; submenuDimensions?: { width: number; height: number } })[],
	noEntryText: string
): {
	entries: (PopupMenuEntry<T> & { y?: number; submenuDimensions?: { width: number; height: number } })[];
	width: number;
	height: number;
} {
	const finalEntries: (PopupMenuEntry<T> & {
		y?: number;
		submenuDimensions?: { width: number; height: number };
	})[] = [];
	let longestLabel = "";
	const itemHeight = menuProviderOptions?.menuItemHeight ?? 24;
	const separatorHeight = menuProviderOptions?.menuItemSeparatorHeight ?? 12;

	let currentTop = 0;
	let iconCount = 0;
	let subMenuCount = 0;

	for (const menuEntry of entries.filter((m) => m.visible ?? true)) {
		menuEntry.y = currentTop;

		if (isStringValue(menuEntry.icon)) {
			menuEntry.icon = themeUrl(menuEntry.icon, iconFolder, colorScheme);
			iconCount++;
		}
		if (menuEntry.type === "checkbox" || !isEmpty(menuEntry.checked)) {
			iconCount++;
		}

		if (menuEntry.type === "separator") {
			currentTop += separatorHeight;
		} else {
			currentTop += itemHeight;
		}

		if (menuEntry.type === "submenu" || Array.isArray(menuEntry.submenu)) {
			subMenuCount++;
			const submenuDimensions = calculateMenuInfo(
				iconFolder,
				colorScheme,
				menuEntry.submenu ?? [],
				noEntryText
			);
			menuEntry.submenu = submenuDimensions.entries;
			menuEntry.submenuDimensions = {
				width: submenuDimensions.width,
				height: submenuDimensions.height
			};
		}

		if (menuEntry.label && menuEntry.label?.length > longestLabel.length) {
			longestLabel = menuEntry.label;
		}

		finalEntries.push(menuEntry);
	}

	if (longestLabel.length === 0) {
		longestLabel = noEntryText;
	}

	const menuFontSize = menuProviderOptions?.menuFontSize ?? 12;

	// Use dummy first calculation
	let calculatedWidth = (longestLabel.length * menuFontSize) / 1.6;

	const canvas = document.createElement("canvas");
	canvas.width = 1000;
	document.body.append(canvas);
	const context = canvas.getContext("2d");
	if (context) {
		context.font = `${menuFontSize}px Inter`;
		calculatedWidth = context.measureText(longestLabel).width;
		canvas.remove();
	}

	let extraSpace = 40;
	if (iconCount > 0) {
		extraSpace += 28;
	}
	if (subMenuCount > 0) {
		extraSpace += 18;
	}

	const width = Math.floor(menuProviderOptions?.menuWidth ?? calculatedWidth + extraSpace);
	const height = Math.floor(currentTop + separatorHeight); // There is space at top and bottom equivalent to separator height

	return {
		entries: finalEntries,
		width,
		height
	};
}

/**
 * Get the inbuilt actions for the platform.
 * @returns The map of platform actions.
 */
export async function getPlatformActions(): Promise<CustomActionsMap> {
	const actionMap: CustomActionsMap = {};

	actionMap["popup-menu"] = async (payload: CustomActionPayload): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			const menuOptions: {
				source: "dock";
				noEntryText: string;
				menuEntries: PopupMenuEntry<CustomActionSpecifier>[];
				options?: {
					popupMenuStyle?: PopupMenuStyles;
				};
			} = payload.customData;

			const res = await showPopupMenu(
				menuOptions.source === "dock" ? { x: payload.x, y: 48 } : { x: payload.x, y: payload.y },
				payload.windowIdentity,
				menuOptions.noEntryText,
				menuOptions.menuEntries,
				menuOptions.options
			);

			if (!isEmpty(res)) {
				await callAction(res.id, {
					...payload,
					customData: res.customData
				});
			}
		}
	};

	return actionMap;
}
