import type {
	CLIFilter,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";

/**
 * Definition for a results source.
 */
export interface ISource {
	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods from the platform.
	 * @param helpers.openUrl Method for opening a url.
	 * @param helpers.setSearchQuery Method for repopulating the home query.
	 * @returns Nothing.
	 */
	initialize(
		definition: ISourceDefinition,
		loggerCreator: () => void,
		helpers: {
			openUrl: (url: string) => Promise<void>;
			setSearchQuery: (query: string) => Promise<void>;
		}
	): Promise<void>;

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	getHelpSearchEntries(): Promise<HomeSearchResult[]>;

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse>;

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	itemSelection(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean>;
}

/**
 * The definition for a source.
 */
export interface ISourceDefinition {
	/**
	 * The id of the source.
	 */
	id: string;

	/**
	 * Configuration data for the source.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
}
