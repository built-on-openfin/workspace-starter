import { IntegrationProviderOptions } from "./integrations-shapes";

interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	hidden?: boolean;
}

export interface CustomSettings {
	homeProvider?: HomeProviderOptions;
	integrationProvider?: IntegrationProviderOptions;
}
