import type { MenuEntry, TrayMenuOptionType } from "./menu-shapes";

/**
 * Tray Provider Options to provide settings for the tray provider
 */
export interface TrayProviderOptions {
	/**
	 * Is the tray option enabled.
	 */
	enabled?: boolean;

	/**
	 * Should the menu activate on a left click, right click or any, default to any.
	 */
	activateButton?: "left" | "right" | "any";

	/**
	 * The icon to display in the tray, if not supplied default to platform icon.
	 */
	icon?: string;

	/**
	 * The menu entries to display.
	 */
	menuEntries: MenuEntry<TrayMenuOptionType>[];
}
