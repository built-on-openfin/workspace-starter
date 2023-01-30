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

export type MenuType = "global" | "page" | "view";

export type MenuPositionOperation = "replaceLabel" | "before" | "after" | "delete" | "start" | "end";
export type MenuSeparatorPosition = "before" | "after";

export interface MenuPosition<T = unknown> {
	/** What should we do with this menu option */
	operation: MenuPositionOperation;
	/** The type of Menu entry this is */
	type?: T;
	/** If position type is Custom then a customId is required in order to do lookups of this entry in the list of entries */
	customId?: string;
}

export interface MenuEntry<T = unknown> {
	/** Should this menu entry definition be included in the list of menu entries */
	include?: boolean;

	/** What label should the user see when they look at this menu option */
	label: string;

	/** Data related to the menu option */
	data?: {
		type: T;
		action?: CustomActionSpecifier;
	};

	/** Where should this menu item be positioned in relation to existing entries */
	position?: MenuPosition<T>;

	/** If the menu entry is included are there additional conditions that determine whether or not it should be shown (e.g. only show the logout menu entry if the authenticated condition is true) */
	conditions?: string[];

	/** Should a menu separator be added */
	separator?: MenuSeparatorPosition;
}

export type MenuTemplateType =
	| GlobalContextMenuItemTemplate
	| PageTabContextMenuItemTemplate
	| ViewTabContextMenuTemplate;

export type MenuOptionType<T> = T extends GlobalContextMenuItemTemplate
	? GlobalContextMenuOptionType
	: T extends PageTabContextMenuItemTemplate
	? PageTabContextMenuOptionType
	: ViewTabMenuOptionType;

export interface Menus<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 */
	get(menuType: MenuType, platform: WorkspacePlatformModule): Promise<MenuEntry[] | undefined>;
}

/**
 * A list of modules that provide menu for different locations.
 * */
export type MenusProviderOptions = ModuleList;
