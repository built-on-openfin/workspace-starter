import { CustomThemes } from "@openfin/workspace-platform";
import { IntegrationProviderOptions } from "./integrations-shapes";

interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	hidden?: boolean;
}

interface ThemeProviderOptions {
	themes: CustomThemes;
}

export interface CustomSettings {
	homeProvider?: HomeProviderOptions;
	themeProvider?: ThemeProviderOptions;
	integrationProvider?: IntegrationProviderOptions;
}
