import type {
	StorefrontFooter,
	Image,
	StorefrontNavigationItemDetails,
	StoreButtonConfig
} from "@openfin/workspace";

/**
 * Store Provider Options
 */
export interface StorefrontProviderOptions {
	/**
	 * The id you wish to use when you register the store component
	 */
	id: string;

	/**
	 * The title for the store which will show up in the store dropdown
	 */
	title: string;

	/**
	 * The icon to be displayed in the store drop down
	 */
	icon: string;

	/**
	 * Configuration for the landing page
	 */
	landingPage: {
		/**
		 * Configuration for the hero section of the store if you wish one.
		 */
		hero?: {
			/**
			 * The title of the Hero section
			 */
			title: string;

			/**
			 * The body description of the hero section
			 */
			description: string;

			/**
			 * Configuration for the Call To Action button of the hero section
			 */
			cta: StorefrontSettingsNavigationItem;

			/**
			 * The image to display
			 */
			image: Image;
		};

		/**
		 * Configuration for the top row of the landing page (just below the hero section if it is configured)
		 */
		topRow: StorefrontSettingsLandingPageRow;

		/**
		 * The middle row of the landing page
		 */
		middleRow: {
			/**
			 * The title for the middle row
			 */
			title: string;

			/**
			 * The tags to use as a source of apps. The store will take the first x number of apps until the row is full.
			 */
			tags: string[];
		};

		/**
		 * The bottom row of the landing page
		 */
		bottomRow: StorefrontSettingsLandingPageRow;
	};

	/**
	 * Navigation entries.
	 */
	navigation: {
		/**
		 * This should be an idempotent and unique ID (think GUID) that doesn't change for this navigation section
		 * regardless of how many times it is regenerated (e.g. e.g. more items can be added or the title changed but
		 * the ID stays the same). As you navigate around the store this ID is used as a route. So if a user clicks on a
		 * link, navigates to a new page and the re-requested navigation section has a different ID then the store will
		 * not be able to find a match and it won't be able to render the navigation items.
		 */
		id: string;

		/**
		 * The title to show in the navigation
		 */
		title: string;

		/**
		 * The items to list when the user navigates to that section of the store
		 */
		items: StorefrontSettingsNavigationItem[];
	}[];

	/**
	 * The configuration of the footer for the store
	 */
	footer: StorefrontFooter;

	/**
	 * The action triggered when the primary button is clicked, defaults to launching the app.
	 */
	primaryButton?: StoreButtonConfig;

	/**
	 * Secondary buttons added to all store entries.
	 */
	secondaryButtons?: StoreButtonConfig[];
}

/**
 * A navigation item.
 */
export interface StorefrontSettingsNavigationItem {
	/**
	 * This should be an idempotent and unique ID (think GUID) that doesn't change for this navigation item regardless
	 * of how many times it is regenerated (e.g. e.g. more items can be added or the title changed but the ID stays the
	 * same). As you navigate around the store this ID is used as a route. So if a user clicks on a link, navigates to a
	 * new page and the re-requested navigation item has a different ID then the store will not be able to find a match
	 * and it won't be able to render the navigation item.
	 */
	id?: string;

	/**
	 * The title for the navigation item
	 */
	title: string;

	/**
	 * The Storefront API has a collection of apps for a navigation item. Tags is an approach for how you can determine
	 * what apps should be included in a navigation item. i.e we filter the apps list by one or more tags and assign
	 * those apps to the navigation item.
	 */
	tags: string[];
}

/**
 * Extends the row navigation item.
 */
export interface StorefrontSettingsRowNavigationItem
	extends StorefrontSettingsNavigationItem,
		StorefrontNavigationItemDetails {}

/**
 * Landing page row containing title and items.
 */
export interface StorefrontSettingsLandingPageRow {
	/**
	 * The title for the row.
	 */
	title: string;

	/**
	 * The items in the row.
	 */
	items: StorefrontSettingsRowNavigationItem[];
}
