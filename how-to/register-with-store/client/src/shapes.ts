import type { Image, StorefrontDetailedNavigationItem, StorefrontFooter } from "@openfin/workspace";

/**
 * The custom settings stored in the manifest.fin.json.
 */
export interface CustomSettings {
	/**
	 * Provider for app configuration.
	 */
	appProvider?: AppProviderSettings;

	/**
	 * Provider for store configuration.
	 */
	storefrontProvider?: StorefrontProviderSettings;
}

/**
 * Settings for apps.
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

/**
 * Extended type definition for navigation items with tags.
 */
export type StorefrontDetailedNavigationItemWithTags = StorefrontDetailedNavigationItem & {
	/**
	 * Tags used to filter app lookups.
	 */
	tags?: string[];
};

/**
 * Settings for store.
 */
export interface StorefrontProviderSettings {
	/**
	 * The id to register store with.
	 */
	id: string;

	/**
	 * The title to display on store.
	 */
	title: string;

	/**
	 * The icon to display in store.
	 */
	icon: string;

	/**
	 * The configuration for the landing page.
	 */
	landingPage: {
		hero?: {
			title: string;
			description: string;
			cta: StorefrontDetailedNavigationItemWithTags;
			image: Image;
		};
		topRow: {
			title: string;
			items: StorefrontDetailedNavigationItemWithTags[];
		};
		middleRow: {
			title: string;
			tags: string[];
		};
		bottomRow: {
			title: string;
			items: StorefrontDetailedNavigationItemWithTags[];
		};
	};

	/**
	 * Configuration for the navigation sections.
	 */
	navigation: {
		id: string;
		title: string;
		items: StorefrontDetailedNavigationItemWithTags[];
	}[];

	/**
	 * Configuration for the footer.
	 */
	footer: StorefrontFooter;
}
