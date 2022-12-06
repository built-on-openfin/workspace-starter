import type { CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";

export interface ThemeProviderOptions {
	themes: CustomThemeOptions[];
}

export enum ColorSchemeMode {
	Light = "light",
	Dark = "dark"
}
