import type { CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";
import type { IntegrationProviderOptions } from "./integrations-shapes";

interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	hidden?: boolean;
}

interface ThemeProviderOptions {
	themes: CustomThemeOptions[];
}

export interface CustomSettings {
	homeProvider?: HomeProviderOptions;
	themeProvider?: ThemeProviderOptions;
	integrationProvider?: IntegrationProviderOptions;
}
