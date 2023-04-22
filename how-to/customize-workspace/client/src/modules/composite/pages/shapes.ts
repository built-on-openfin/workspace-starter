import type { MenuPosition } from "customize-workspace/shapes";

export interface PageMenuOptions {
	/** Settings related to the show page menu entry */
	showPage?: {
		/**
		 * This setting lets you override the default label that is used for this menu entry.
		 * Default is Show Page.
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
		 * Where should this menu item be positioned in relation to existing entries. Default is after type SavePageAs.
		 **/
		menuPosition?: MenuPosition;
	};
	/** Settings related to the delete page menu entry */
	deletePage?: {
		/**
		 * This setting lets you override the default label that is used for this menu entry.
		 * Default is Delete Page.
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
		 * Where should this menu item be positioned in relation to existing entries. Default is after type SavePageAs.
		 **/
		menuPosition?: MenuPosition;
	};
}
