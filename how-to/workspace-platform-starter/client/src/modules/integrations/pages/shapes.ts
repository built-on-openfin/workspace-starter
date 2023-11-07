/**
 * Setting for the pages integration.
 */
export interface PagesSettings {
	/**
	 * Enable favorites, defaults to true.
	 */
	favoritesEnabled?: boolean;

	/**
	 * Images to display.
	 */
	images: {
		page: string;
	};
}
