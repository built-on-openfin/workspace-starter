/**
 * The custom settings stored in the manifest.fin.json.
 */
export interface CustomSettings {
	/**
	 * Provider for app configuration.
	 */
	appProvider?: AppProviderSettings;

	/**
	 * Provider for home configuration.
	 */
	homeProvider?: HomeProviderSettings;
}

/**
 * Settings for home.
 */
export interface HomeProviderSettings {
	/**
	 * The id to register home with.
	 */
	id: string;

	/**
	 * The title to display on home.
	 */
	title: string;

	/**
	 * The icon to display in home.
	 */
	icon: string;

	/**
	 * The min length of a query before filtering.
	 */
	queryMinLength?: number;

	/**
	 * The properties to query when filtering.
	 */
	queryAgainst?: string[];
}

/**
 * Settings for app provider.
 */
export interface AppProviderSettings {
	/**
	 * A list of endpoints that return apps in JSON format.
	 */
	appSourceUrls: string[];

	/**
	 * The types of apps that we allow.
	 */
	manifestTypes?: string[];

	/**
	 * How long to store the apps before getting a new list.
	 */
	cacheDurationInMinutes?: number;

	/**
	 * The tag to use for app assets.
	 */
	appAssetTag?: string;
}
