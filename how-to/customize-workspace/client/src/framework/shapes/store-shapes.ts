import type { StorefrontFooter, Image, StorefrontNavigationItemDetails } from "@openfin/workspace";

export interface StorefrontSettingsNavigationItem {
	/**
	 * This should be an idempotent and unique ID (think GUID) that doesn't change for this navigation item regardless of how
	 * many times it is regenerated (e.g. e.g. more items can be added or the title changed but the ID stays the same).
	 * As you navigate around the store this ID is used as a route. So if a user clicks on a link, navigates to a new page and the re-requested navigation item has
	 * a different ID then the store will not be able to find a match and it won't be able to render the navigation item.
	 */
	id: string;
	title: string;
	/**
	 * The Storefront API has a collection of apps for a navigation item. Tags is an example of how you can determine what apps should be included in a navigation item.
	 * i.e we filter the apps list by one or more tags and assign those apps to the navigation item.
	 */
	tags: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StorefrontSettingsDetailedNavigationItem
	extends StorefrontSettingsNavigationItem,
		StorefrontNavigationItemDetails {}

export interface StorefrontSettingsLandingPageRow {
	title: string;
	items: StorefrontSettingsDetailedNavigationItem[];
}

export interface StorefrontProviderOptions {
	id: string;
	title: string;
	icon: string;
	landingPage: {
		hero?: {
			title: string;
			description: string;
			cta: StorefrontSettingsNavigationItem;
			image: Image;
		};
		topRow: StorefrontSettingsLandingPageRow;
		middleRow: {
			title: string;
			tags: string[];
		};
		bottomRow: StorefrontSettingsLandingPageRow;
	};
	navigation: {
		/**
		 * This should be an idempotent and unique ID (think GUID) that doesn't change for this navigation section regardless of how
		 * many times it is regenerated (e.g. e.g. more items can be added or the title changed but the ID stays the same).
		 * As you navigate around the store this ID is used as a route. So if a user clicks on a link, navigates to a new page and the re-requested navigation section has
		 * a different ID then the store will not be able to find a match and it won't be able to render the navigation items.
		 */
		id: string;
		title: string;
		items: StorefrontSettingsNavigationItem[];
	}[];
	footer: StorefrontFooter;
}
