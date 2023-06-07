import type OpenFin from "@openfin/core";
import type {
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
export type MenusProviderOptions = ModuleList;

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
 * All the types of menu template.
 */
export type MenuTemplateType =
	| GlobalContextMenuItemTemplate
	| PageTabContextMenuItemTemplate
	| ViewTabContextMenuTemplate;

/**
 * Which options belong to each menu type.
 */
export type MenuOptionType<T> = T extends GlobalContextMenuItemTemplate
	? GlobalContextMenuOptionType
	: T extends PageTabContextMenuItemTemplate
	? PageTabContextMenuOptionType
	: ViewTabMenuOptionType;
