import type OpenFin from "@openfin/core";
import type {
	ContextMenuItemData,
	CustomActionSpecifier,
	GlobalContextMenuItemTemplate,
	GlobalContextMenuOptionType,
	PageTabContextMenuItemTemplate,
	PageTabContextMenuOptionType,
	ViewTabContextMenuTemplate,
	ViewTabMenuOptionType,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * A list of modules that provide menu for different locations.
 */
export interface MenusProviderOptions extends ModuleList {
	/**
	 * The location of the HTML to use for custom popup page.
	 * defaults to http://localhost:8080/common/popups/menu/index.html
	 */
	popupHtml?: string;

	/**
	 * The font size used in the custom popup menu.
	 * defaults to 12
	 */
	menuFontSize?: number;

	/**
	 * The width to display the custom popup menu.
	 * defaults to 200
	 */
	menuWidth?: number;

	/**
	 * The height of an item in the custom popup menu.
	 * defaults to 32.
	 */
	menuItemHeight?: number;

	/**
	 * The height of a separator in the custom popup menu.
	 * defaults to 16.
	 */
	menuItemSeparatorHeight?: number;

	/**
	 * Configured a global default for the popup menu style.
	 */
	popupMenuStyle?: PopupMenuStyles;
}

/**
 * The module definition for menus.
 */
export interface Menus<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 * @param relatedMenuId If available provide the related window identity the menu is showing on and page or view ids
	 * depending on the menu type.
	 * @returns Nothing.
	 */
	get(
		menuType: MenuType,
		platform: WorkspacePlatformModule,
		relatedMenuId?: RelatedMenuId
	): Promise<MenuEntry[] | undefined>;
}

/**
 * The different types of menus that can be requested.
 */
export type MenuType = "global" | "page" | "view";

/**
 * Get the information for a related menu.
 */
export interface RelatedMenuId {
	/**
	 * The views associated with the menu.
	 */
	views?: OpenFin.Identity[];

	/**
	 * The page id.
	 */
	pageId?: string;

	/**
	 * The window identity.
	 */
	windowIdentity?: OpenFin.Identity;
}

/**
 * Operations that can be performed on menus when they are being updated.
 */
export type MenuPositionOperation = "replaceLabel" | "before" | "after" | "delete" | "start" | "end";

/**
 * Position for adding separators during update operations.
 */
export type MenuSeparatorPosition = "before" | "after";

/**
 * The position for a menu entry.
 */
export interface MenuPosition<T = unknown> {
	/**
	 * What should we do with this menu option
	 */
	operation: MenuPositionOperation;

	/**
	 * The type of Menu entry this is
	 */
	type?: T;

	/**
	 * If position type is Custom then a customId is required in order to do lookups of this entry in the list of entries
	 */
	customId?: string;
}

/**
 * How to position a dynamic menu entry.
 */
export interface MenuEntryDynamic<T = unknown> extends Omit<OpenFin.MenuItemTemplate, "data" | "role"> {
	/**
	 * Where should this menu item be positioned in relation to existing entries
	 */
	position?: MenuPosition<T>;
}

/**
 * How to position a menu.
 */
export interface MenuEntry<T = unknown> extends MenuEntryDynamic<T> {
	/**
	 * Should this menu entry definition be included in the list of menu entries
	 */
	include?: boolean;

	/**
	 * Data related to the menu option
	 */
	data?: {
		type: T;
		action?: CustomActionSpecifier;
	};

	/**
	 * If the menu entry is included are there additional conditions that determine whether or not it should be shown (e.g. only show the logout menu entry if the authenticated condition is true)
	 */
	conditions?: string[];

	/**
	 * Should a menu separator be added
	 */
	separator?: MenuSeparatorPosition;
}

/**
 * Custom menu type for tray menus.
 */
export interface TrayMenuData extends ContextMenuItemData {
	/**
	 * Option types for tray.
	 */
	type: TrayMenuOptionType;
}

/**
 * Tray context menu types.
 */
export declare enum TrayMenuOptionType {
	/**
	 * Custom tray menu entry item.
	 */
	Custom = "Custom"
}

/**
 * Custom menu template for tray menus.
 */
export interface TrayContextMenuTemplate extends OpenFin.MenuItemTemplate {
	/**
	 * The tray item data.
	 */
	data?: TrayMenuData;
}

/**
 * All the types of menu template.
 */
export type MenuTemplateType =
	| GlobalContextMenuItemTemplate
	| PageTabContextMenuItemTemplate
	| ViewTabContextMenuTemplate
	| TrayContextMenuTemplate;

/**
 * Which options belong to each menu type.
 */
export type MenuOptionType<T> = T extends GlobalContextMenuItemTemplate
	? GlobalContextMenuOptionType
	: T extends PageTabContextMenuItemTemplate
		? PageTabContextMenuOptionType
		: T extends ViewTabContextMenuTemplate
			? ViewTabMenuOptionType
			: TrayMenuOptionType;

/**
 * The styles that can be used to display the popup menus.
 */
export type PopupMenuStyles = "platform" | "native" | "custom";

/**
 * Specialized version of the menu item template with generic data.
 */
export type PopupMenuEntry<T = unknown> = Omit<OpenFin.MenuItemTemplate, "data"> & { data?: T };

/**
 * The client providing menu methods
 */
export interface MenuClient {
	/**
	 * Get the centrally configured popup menu style.
	 * @returns The popup menu style.
	 */
	getPopupMenuStyle(): PopupMenuStyles;

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
	showPopupMenu<T = unknown>(
		position: { x: number; y: number },
		parentIdentity: OpenFin.Identity,
		noEntryText: string,
		menuEntries: PopupMenuEntry<T>[],
		options?: {
			popupMenuStyle?: PopupMenuStyles;
		}
	): Promise<T | undefined>;
}
