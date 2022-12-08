import type { CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";

interface BrowserProvider {
	windowOptions: {
		title?: string;
		icon?: string;
		newTabUrl?: string;
		newPageUrl?: string;
	};
}

interface ThemeProvider {
	themes: CustomThemeOptions[];
}

export interface LaunchBarWindowSettings extends OpenFin.WindowCreationOptions {
	url: string;
	options: object;
}

export interface CustomSettings {
	bootstrap?: { launchBarWindowSettings?: LaunchBarWindowSettings };
	browserProvider?: BrowserProvider;
	themeProvider?: ThemeProvider;
}
