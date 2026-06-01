import type { PopupMenuStyles } from "here-workspace-starter/shapes/menu-shapes";

/**
 * Settings for favorites menu integration.
 */
export interface FavoritesMenuSettings {
	/**
	 * The type of menu to display, defaults to native.
	 */
	popupMenuStyle?: PopupMenuStyles;
}
