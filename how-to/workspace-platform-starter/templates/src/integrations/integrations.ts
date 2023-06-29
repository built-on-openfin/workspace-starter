import type {
	CLIFilter,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ExampleIntegrationsProviderOptions } from "./shapes";

/**
 * Implementation for the example integrations provider.
 */
export class ExampleIntegrationsProvider implements IntegrationModule<ExampleIntegrationsProviderOptions> {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 100000;

	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition?: IntegrationModuleDefinition<ExampleIntegrationsProviderOptions>;

	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _settings?: ExampleIntegrationsProviderOptions;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers?: IntegrationHelpers;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: IntegrationModuleDefinition<ExampleIntegrationsProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleIntegrationsProvider");
		this._helpers = helpers;
		this._settings = this._definition.data;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		// TODO: Add results for help entries
		return [];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength: number;
			queryAgainst: string[];
		}
	): Promise<HomeSearchResponse> {
		const results: HomeSearchResult[] = [];
		const returnFilters: CLIFilter[] = [];

		// TODO: Perform logic to populate results and return filters
		// TODO: Update the _DEFAULT_BASE_SCORE value
		// To correctly order the results in home set their score field
		// e.g. score: this._definition?.baseScore ?? ExampleIntegrationsProvider._DEFAULT_BASE_SCORE

		// Make sure the data has a providerId property set so that the result
		// selection can be matched back to this provider
		// e.g. data: { providerId: this._definition?.id }

		return {
			results,
			context: {
				filters: returnFilters
			}
		};
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		let handled = false;

		if (result.action.trigger === "user-action") {
			// TODO: Process the item selection.
			handled = true;
		}

		return handled;
	}
}
