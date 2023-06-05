import type { CustomThemeOptions, CustomThemeOptionsWithScheme } from "@openfin/workspace-platform";
/**
 *  Platform theme configuration
 **/
export interface ThemeProviderOptions {
	/** The Themes you wish your platform to support */
	themes: PlatformCustomThemes;
	/**
	 * If providing the palette through css variables would you
	 * like a specific custom prefix?
	 */
	cssVarPrefix?: string;
	/**
	 * If providing a class at the root document for content providers to indicate light/dark
	 * would you like to provide something other than the default.
	 */
	schemaNames?: {
		dark?: string;
		light?: string;
	};
}
export declare enum ColorSchemeMode {
	Light = "light",
	Dark = "dark"
}
export interface PlatformCustomThemeExtended {
	/**
	 * An id to help identify this theme as labels can change over time and are used for display
	 */
	id: string;
	/**
	 * If there is a shared folder across themes that have light and dark icons you can specify a folder name to use instead of the theme id (or label if there is no id)
	 */
	iconFolder?: string;
	/**
	 * If you are specifying a single palette in your theme and it is a light palette then you can indicate that by specifying the default of light (otherwise we will assume it is dark)
	 * If you specify palettes and have a light and a dark palette then this setting specifies a default preference (it defaults to picking the dark palette if a default is not specified)
	 */
	default?: "light" | "dark";
}
export type PlatformCustomThemeOptions = CustomThemeOptions & PlatformCustomThemeExtended;
export type PlatformCustomThemeOptionsWithScheme = CustomThemeOptionsWithScheme & PlatformCustomThemeExtended;
export type PlatformCustomTheme = PlatformCustomThemeOptions | PlatformCustomThemeOptionsWithScheme;
export type PlatformCustomThemes = PlatformCustomTheme[];
