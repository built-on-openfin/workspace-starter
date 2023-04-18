/**
 * The custom settings stored in the manifest.fin.json
 */
export interface CustomSettings {
	appProvider?: AppProvider;
	homeProvider?: HomeProvider;
}

/**
 * Settings for home.
 */
interface HomeProvider {
	id: string;
	title: string;
	icon: string;
	queryMinLength?: number;
	queryAgainst?: string[];
}

/**
 * Settings for app provider.
 */
interface AppProvider {
	appSourceUrls: string[];
	manifestTypes?: string[];
}
