import {
	CLIAction,
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";

/**
 * Implement the source for Suggestions.
 */
export class SuggestionSource {
	/**
	 * The helpers for the source.
	 * @internal
	 */
	private _helpers: { openUrl: (url: string) => Promise<void> } | undefined;

	/**
	 * The settings for the source.
	 * @internal
	 */
	private _definition: { id: string } | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods from the platform.
	 * @param helpers.openUrl Method for opening a url.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: {
			id: string;
			data?: unknown;
		},
		loggerCreator: () => void,
		helpers: { openUrl: (url: string) => Promise<void> }
	): Promise<void> {
		this._definition = definition;
		this._helpers = helpers;
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the get search results.
	 * @param options.isSuggestion Is the query a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			isSuggestion: boolean;
		}
	): Promise<HomeSearchResponse> {
		const results: HomeSearchResult[] = [];

		if (!options.isSuggestion && query.startsWith("desserts")) {
			results.push({
				title: "Cakes",
				key: "cakes",
				actions: [
					{
						name: CLIAction.Suggestion,
						query: "cakes"
					}
				],
				template: CLITemplate.Plain,
				templateContent: undefined
			});
			results.push({
				title: "Ice Cream",
				key: "ice-cream",
				actions: [
					{
						name: CLIAction.Suggestion,
						query: "ice-cream"
					}
				],
				template: CLITemplate.Plain,
				templateContent: undefined
			});
		} else if (options.isSuggestion) {
			if (query === "cakes") {
				results.push({
					title: "Cakes",
					key: "cakes",
					actions: [],
					template: CLITemplate.SimpleText,
					templateContent: "A selection of cakes"
				});
			} else if (query === "ice-cream") {
				results.push({
					title: "Ice Cream",
					key: "ice-cream",
					actions: [],
					template: CLITemplate.SimpleText,
					templateContent: "A selection of ice cream"
				});
			}
		}

		console.log("Return results", results);

		return {
			results
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
		if (result.action.trigger === "user-action") {
		}

		return false;
	}
}
