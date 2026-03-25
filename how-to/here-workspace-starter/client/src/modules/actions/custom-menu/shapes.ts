import type { PopupMenuStyles } from "workspace-platform-starter/shapes/menu-shapes";

/**
 * Settings for custom menu integration.
 */
export interface CustomMenuProviderSettings {
	/**
	 * The type of menu to display, defaults to native.
	 */
	popupMenuStyle?: PopupMenuStyles;

	/**
	 * Images to use for items in menus.
	 */
	images: {
		page: string;
		workspace: string;
	};
}
