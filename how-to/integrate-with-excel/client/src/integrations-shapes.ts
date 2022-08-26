import type {
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	CLIFilter,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";

/**
 * Integration helpers provides environment methods and data.
 */
export interface IntegrationHelpers {
	/**
	 * Launch an asset.
	 * @param options The options to launch the external with.
	 */
	launchAsset?(options: OpenFin.ExternalProcessRequestType): Promise<OpenFin.Identity>;
}

/**
 * Integration provider settings.
 */
export interface IntegrationProviderOptions {
	/**
	 * The list of integrations.
	 */
	modules?: Integration<unknown>[];
}

/**
 * Integration details.
 */
export interface Integration<T> {
	/**
	 * The id of the integration.
	 */
	id: string;

	/**
	 * The title of the integration.
	 */
	title: string;

	/**
	 * The icon of the integration.
	 */
	icon: string;

	/**
	 * Is the integration enabled.
	 */
	enabled: boolean;

	/**
	 * Module url to use if loading the module remotely.
	 */
	url?: string;

	/**
	 * The data specific to the integration.
	 */
	data?: T;
}

/**
 * The methods provided by the integration module.
 */
export interface IntegrationModule<T> {
	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	initialize?(
		definition: Integration<T>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void>;

	/**
	 * The module is being closed down.
	 * @returns Nothing.
	 */
	closedown?(): Promise<void>;

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	getSearchResults?(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse>;

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	getHelpSearchEntries?(): Promise<HomeSearchResult[]>;

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	itemSelection?(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean>;
}
