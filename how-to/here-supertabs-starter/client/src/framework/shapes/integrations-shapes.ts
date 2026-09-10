import type {
	CLIFilter,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { ModuleDefinition, ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
import type { PlatformStorageMetadata } from "./platform-shapes";
import type { TemplateHelpers } from "./template-shapes";

/**
 * Integration helpers provides environment methods and data.
 */
export interface IntegrationHelpers extends ModuleHelpers {
	/**
	 * Template helpers.
	 */
	templateHelpers: TemplateHelpers;

	/**
	 * Open a url with the browser.
	 * @param url The url to open.
	 * @returns Nothing.
	 */
	openUrl?(url: string): Promise<void>;

	/**
	 * Set the home search query.
	 * @param query The query to set.
	 * @returns Nothing.
	 */
	setSearchQuery?(query: string): Promise<void>;
}

/**
 * Integration provider settings.
 */
export interface IntegrationProviderOptions extends ModuleList<IntegrationModuleDefinition> {
	/**
	 * Do you wish to expose an option of turning on/off integrations.
	 */
	isManagementEnabled?: boolean;

	/**
	 * What command should we look for in order to return the list of integrations
	 */
	command?: string;

	/**
	 * What description should accompany the command
	 */
	commandDescription?: string;

	/**
	 * An icon representing the top level integration provider
	 */
	icon?: string;

	/**
	 * This is the old module list name, remove in future.
	 */
	integrations?: IntegrationModuleDefinition[];
}

/**
 * Integration definition.
 */
export interface IntegrationModuleDefinition<O = unknown> extends ModuleDefinition<O> {
	/**
	 * Does the integration start automatically if enabled (default is true).
	 */
	autoStart?: boolean;

	/**
	 * If this property is set then the module will not show in the source filter
	 * and its results will always be included.
	 */
	excludeFromSourceFilter?: boolean;

	/**
	 * A number which is used as the base score when sorting module results.
	 */
	baseScore?: number;

	/**
	 * This is the old property, it will be remapped to url.
	 */
	moduleUrl?: string;
}

/**
 * The methods provided by the integration module.
 */
export interface IntegrationModule<O = unknown> extends ModuleImplementation<O, IntegrationHelpers> {
	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @returns The list of results and new filters.
	 */
	getSearchResults?(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength?: number;
			queryAgainst?: string[];
			isSuggestion?: boolean;
		}
	): Promise<HomeSearchResponse>;

	/**
	 * Get entries to show while the integration is searching.
	 * @param query The query to search for.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @returns The list of results and new filters.
	 */
	getSearchResultsProgress?(
		query: string,
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength?: number;
			queryAgainst?: string[];
			isSuggestion?: boolean;
		}
	): Promise<HomeSearchResult[]>;

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

/**
 * A request type for the IntegrationsPreferencesEndpoint that sets a preference
 */
export interface EndpointIntegrationsPreferencesSetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;

	/**
	 * The platform versions it saving the preferences
	 */
	metaData: PlatformStorageMetadata;

	/**
	 * The id of the integration.
	 */
	id: string;

	/**
	 * The preferences for the integration.
	 */
	payload: {
		/**
		 * Should the integration auto start.
		 */
		autoStart: boolean;
	};
}

/**
 * A request type for the IntegrationsPreferencesEndpoint that gets the preferences
 */
export interface EndpointIntegrationsPreferencesGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the integration.
	 */
	id: string;
}

/**
 * A response type for the IntegrationsPreferencesEndpoint that gets the preferences
 */
export interface EndpointIntegrationsPreferencesGetResponse {
	/**
	 * The id of the platform making the request
	 */
	platform: string;

	/**
	 * The platform versions it saving the preferences
	 */
	metaData: PlatformStorageMetadata;

	/**
	 * The preferences for the integration.
	 */
	payload: {
		/**
		 * Should the integration auto start.
		 */
		autoStart: boolean;
	};
}
