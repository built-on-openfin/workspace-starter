import type { MenuPosition } from "workspace-platform-starter/shapes/menu-shapes";

/**
 * Setting for the page menus.
 */
export interface PageMenuSettings {
	/**
	 * Settings related to the show page menu entry
	 */
	showPage?: PageMenuEntry;

	/**
	 * Settings related to the delete page menu entry
	 */
	deletePage?: PageMenuEntry;
}

/**
 * Definition for a page menu entry.
 */
export interface PageMenuEntry {
	/**
	 * This setting lets you override the default label that is used for this menu entry.
	 */
	menuLabel?: string;

	/**
	 * This setting lets you override the default icon that is shown for this menu entry.
	 * Default is no icon.
	 */
	menuIcon?: string;

	/**
	 * Show we include this menu option. The default is true.
	 */
	include?: boolean;

	/**
	 * Where should this menu item be positioned in relation to existing entries. Default is after type CloseWindow.
	 */
	menuPosition?: MenuPosition;
}
