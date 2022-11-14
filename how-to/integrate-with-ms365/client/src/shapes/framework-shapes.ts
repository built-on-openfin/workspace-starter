import type { CustomThemes } from "@openfin/workspace-platform";
import type { IntegrationProviderOptions } from "./integrations-shapes";

interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	hidden?: boolean;
}

interface AppProviderOptions {
	appsSourceUrl: string;
	includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
	cacheDurationInMinutes?: number;
	appAssetTag?: string;
}

interface ThemeProviderOptions {
	themes: CustomThemes;
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
