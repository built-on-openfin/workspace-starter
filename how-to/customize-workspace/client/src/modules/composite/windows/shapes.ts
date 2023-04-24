import type { MenuPosition, MenuSeparatorPosition } from "customize-workspace/shapes";

export interface WindowMenuEntry {
	/**
	 * This setting lets you override the default label that is used for this menu entry.
	 */
	menuLabel?: string;

	/**
	 * This setting lets you override the default icon that is shown for this menu entry.
	 * Default is no icon.
	 */
	menuIcon?: string;

	/** Show we include this menu option. The default is true */
	include?: boolean;

	/**
	 * Where should this menu item be positioned in relation to existing entries. Default is after type CloseWindow.
	 **/
	menuPosition?: MenuPosition;
}

export interface WindowMenuSettings {
	/** Settings related to the show window menu entry */
	showAllWindows?: WindowMenuEntry;
	/** Settings related to the hide window menu entry */
	hideAllWindows?: WindowMenuEntry;
	/** Settings related to the hide window menu entry */
	hideOtherWindows?: WindowMenuEntry;
	/** Should a separator appear before or after these menu entries or none at all. Default is before. */
	separator?: MenuSeparatorPosition | "none";
}
