import type { SearchProviderInfo } from "@openfin/workspace";
/** HomeProvider Options */
export type HomeProviderOptions = Omit<
	SearchProviderInfo,
	"identity" | "dispatchFocusEvents" | "clientAPIVersion"
> & {
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
};
