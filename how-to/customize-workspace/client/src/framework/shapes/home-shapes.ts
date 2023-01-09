/** HomeProvider Options */
export interface HomeProviderOptions {
	/** The id to use when registering against the Workspace Home component */
	id: string;
	/** The title to show in the Home component UI */
	title: string;
	/** The icon to show in the Home component UI */
	icon: string;
	/**
	 * How many characters need to be entered before filtering the available apps
	 */
	queryMinLength?: number;
	/**
	 * What do you wish to run the query against when filtering apps.
	 * An array of entries. If not specified it will default to ["title"].
	 * Since we store the app definition inside of a cli search result's
	 * data field you can add data.tags to the array so that it will see if
	 * the query matches the start of a tag e.g. ["title","data.tags"]
	 */
	queryAgainst?: string[];
	/**
	 * Default is true. Enable our default page integration in home so that
	 * you can discover, launch and delete pages from home. Disable if you want
	 * to plug in your own implementation using the integration provider. */
	enablePageIntegration?: boolean;
	/**
	 * Options for the source filters displayed in home.
	 */
	sourceFilter?: {
		/**
		 * Should we disable the source filters, defaults to false.
		 */
		disabled?: boolean;
		/**
		 * The label to display in home, defaults to Source.
		 */
		label?: string;
	};
}
