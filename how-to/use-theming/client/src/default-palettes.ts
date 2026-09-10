import type { ThemeOverrideMap, ThemeSeedMap } from "./theme-override-types";

export const DEFAULT_THEME_SEED: ThemeSeedMap = {
	"brand.base.dark": "#140611",
	"brand.accent.dark": "#FFD6D2",
	"brand.base.light": "#FFFFFF",
	"brand.accent.light": "#641E55"
};

export const DEFAULT_THEME_OVERRIDES: {
	dark: ThemeOverrideMap;
	light: ThemeOverrideMap;
} = {
	light: {
		"icon.symbol": "http://localhost:8080/common/images/favicon-32x32.png"
	},
	dark: {
		"icon.symbol": "http://localhost:8080/common/images/favicon-32x32.png"
	}
};
