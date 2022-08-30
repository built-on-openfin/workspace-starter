import type { CustomThemes } from "@openfin/workspace-platform";

interface BrowserProvider {
	windowOptions: {
		title?: string;
		icon?: string;
		newTabUrl?: string;
		newPageUrl?: string;
	};
}

interface ThemeProvider {
	themes: CustomThemes;
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
