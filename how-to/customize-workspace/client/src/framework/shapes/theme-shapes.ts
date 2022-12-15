import type { CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";

export interface ThemeProviderOptions {
	themes: CustomThemeOptions[];
	cssVarPrefix?: string;
	schemaNames?: {
		dark?: string;
		light?: string;
	};
}

export enum ColorSchemeMode {
	Light = "light",
	Dark = "dark"
}
