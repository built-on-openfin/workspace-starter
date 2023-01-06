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

export enum ColorSchemeMode {
	Light = "light",
	Dark = "dark"
}

export interface PlatformCustomThemeExtended {
	id: string;
	iconFolder?: string;
}
export type PlatformCustomThemeOptions = CustomThemeOptions & PlatformCustomThemeExtended;
export type PlatformCustomThemeOptionsWithScheme = CustomThemeOptionsWithScheme & PlatformCustomThemeExtended;
export type PlatformCustomTheme = PlatformCustomThemeOptions | PlatformCustomThemeOptionsWithScheme;

export type PlatformCustomThemes = PlatformCustomTheme[];
