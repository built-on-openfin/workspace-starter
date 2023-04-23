import type { MenuPosition, MenuSeparatorPosition } from "customize-workspace/shapes";

export interface WindowMenuSettings {
	/** Settings related to the show window menu entry */
	showAllWindows?: {
		/**
		 * This setting lets you override the default label that is used for this menu entry.
		 * Default is Show All Windows.
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
	};
	/** Settings related to the hide window menu entry */
	hideAllWindows?: {
		/**
		 * This setting lets you override the default label that is used for this menu entry.
		 * Default is Hide All Windows.
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
	};
	/** Settings related to the hide window menu entry */
	hideOtherWindows?: {
		/**
		 * This setting lets you override the default label that is used for this menu entry.
		 * Default is Hide Other Windows.
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
	};
	/** Should a separator appear before or after these menu entries or none at all. Default is before. */
	separator?: MenuSeparatorPosition | "none";
}
