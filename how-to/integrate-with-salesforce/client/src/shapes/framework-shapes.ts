import type { CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";
import type { IntegrationProviderOptions } from "./integrations-shapes";

interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	hidden?: boolean;
	queryMinLength?: number;
}

interface AppProviderOptions {
	appsSourceUrl: string;
	includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
	cacheDurationInMinutes?: number;
	appAssetTag?: string;
}

interface ThemeProviderOptions {
	themes: CustomThemeOptions[];
}

export interface BrowserProviderOptions {
	windowOptions: {
		title?: string;
		icon?: string;
		newTabUrl?: string;
		newPageUrl?: string;
	};
}

export interface CustomSettings {
	homeProvider?: HomeProviderOptions;
	browserProvider?: BrowserProviderOptions;
	appProvider?: AppProviderOptions;
	themeProvider?: ThemeProviderOptions;
	integrationProvider?: IntegrationProviderOptions;
}
