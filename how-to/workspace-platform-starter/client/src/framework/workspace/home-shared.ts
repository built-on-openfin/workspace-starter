import type { OpenFin } from "@openfin/core";
import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeProvider,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse
} from "@openfin/workspace";
import {
	getHelpSearchEntries,
	getSearchResults,
	getSearchResultsProgress,
	itemSelection
} from "../integrations";
import { createLogger } from "../logger-provider";
import type { HomeProviderOptions } from "../shapes/home-shapes";
import { isEmpty } from "../utils";

/**
 * Search logic shared by the home implementations (home-workspace.ts and home-platform.ts). The search
 * handling is identical regardless of whether home is registered through @openfin/workspace (Home) or
 * @openfin/workspace-platform (HomeVpw), so it lives here and both implementations build their provider
 * from `buildHomeProvider`.
 */

const HOME_SOURCE_FILTERS = "sources";
const HOME_SOURCE_DEFAULT_FILTER_LABEL = "Source";

const logger = createLogger("Home");

let homeProviderOptions: HomeProviderOptions | undefined;
let getHomeWindowIdentity: (() => OpenFin.Identity) | undefined;
let lastResponse: HomeSearchListenerResponse;
let debounceTimerId: number | undefined;
let lastQueryId: string | undefined;

/**
 * Get the home provider options that were last used to build the home provider.
 * @returns The home provider options.
 */
export function getHomeProviderOptions(): HomeProviderOptions | undefined {
	return homeProviderOptions;
}

/**
 * Build the home provider object shared by both home implementations.
 * @param options The options for the home provider.
 * @param getIdentity Resolver for the identity of the home window used by the active implementation.
 * @returns The home provider to register.
 */
export function buildHomeProvider(
	options: HomeProviderOptions,
	getIdentity: () => OpenFin.Identity
): HomeProvider {
	homeProviderOptions = options;
	getHomeWindowIdentity = getIdentity;
	return {
		...options,
		onUserInput,
		onResultDispatch: onSelection,
		dispatchFocusEvents: true
	};
}

/**
 * Reset the shared home state. Called when the home component is deregistered.
 */
export function resetHomeState(): void {
	homeProviderOptions = undefined;
	getHomeWindowIdentity = undefined;
}

/**
 * Handle user input from the home component.
 * @param request The request from the home component.
 * @param response The response to the home component.
 * @returns The search response.
 */
async function onUserInput(
	request: HomeSearchListenerRequest,
	response: HomeSearchListenerResponse
): Promise<HomeSearchResponse> {
	const enableSourceFilter = !(homeProviderOptions?.sourceFilter?.disabled ?? false);
	lastQueryId = request.id;
	if (debounceTimerId) {
		window.clearTimeout(debounceTimerId);
		debounceTimerId = undefined;
	}

	if (!isEmpty(lastResponse)) {
		lastResponse.close();
	}

	if (request.query === "?") {
		logger.info("Integration Help requested.");
		const integrationHelpSearchEntries = await getHelpSearchEntries();
		const searchResults = {
			results: integrationHelpSearchEntries,
			context: {
				filters: enableSourceFilter ? [createEmptySourceFilter()] : []
			}
		};
		return searchResults;
	}

	lastResponse = response;
	lastResponse.open();
	const selectedFilters: CLIFilter[] = request?.context?.selectedFilters ?? [];

	let selectedSourceFilterOptions: string[] = [];
	if (enableSourceFilter && selectedFilters) {
		const sourceFilter = selectedFilters.find((f) => f.id === HOME_SOURCE_FILTERS);
		if (sourceFilter) {
			if (Array.isArray(sourceFilter.options)) {
				selectedSourceFilterOptions = sourceFilter.options.filter((o) => o.isSelected).map((o) => o.value);
			} else if (sourceFilter.options.isSelected) {
				selectedSourceFilterOptions.push(sourceFilter.options.value);
			}
		}
	}

	const queryOptions = {
		queryMinLength: homeProviderOptions?.queryMinLength ?? 3,
		queryAgainst: homeProviderOptions?.queryAgainst ?? ["title"],
		isSuggestion: request.context?.isSuggestion ?? false
	};

	// Debounce the keyboard input, this also means that the method returns
	// immediately with a dummy filter, so the UI does not "bounce"
	debounceTimerId = window.setTimeout(async () => {
		try {
			if (request.id !== lastQueryId) {
				logger.info(
					`This request was scheduled to handle a query which is no longer the latest query. The query will not be actioned. Assigned Query Id: ${request.id}, latest Query Id: ${lastQueryId}`
				);
				return;
			}
			logger.info(`Search results requested. Query Id: ${request.id}. Last Query Id: ${lastQueryId}.`);
			const finalFilters: CLIFilter[] = [];
			let sourceFilter: CLIFilter | undefined;

			const searchResults = await getSearchResults(
				request.query,
				selectedFilters,
				{
					...lastResponse,
					updateContext: (context: HomeSearchResponse["context"]) => {
						// We must provide an overloaded updateContext to the
						// integrations so that we can intercept it, this way
						// if they replace filters async it doesn't completely
						// obliterate any that already exist
						const asyncFilters = context?.filters;
						if (!isEmpty(asyncFilters)) {
							// Replace any filters we already have and add any remaining
							for (const asyncFilter of asyncFilters) {
								// Only add the filter if it has any options
								if (Array.isArray(asyncFilter.options) && asyncFilter.options.length > 0) {
									const filterIndex = finalFilters.findIndex((f) => f.id === asyncFilter.id);

									if (filterIndex >= 0) {
										// Already in the list so replace it
										finalFilters.splice(filterIndex, 1, asyncFilter);
									} else {
										// Not in list so add
										finalFilters.unshift(asyncFilter);
									}
								}
							}

							// We copy and reverse the filters as they are laid out right to left
							// and we want to stop them from moving position once they are displayed
							const filters = (sourceFilter ? [...finalFilters, sourceFilter] : finalFilters)
								.slice()
								.reverse();
							lastResponse.updateContext({
								filters
							});
						}
					}
				},
				selectedSourceFilterOptions,
				queryOptions
			);

			if (request.id !== lastQueryId) {
				logger.info(
					`This request was scheduled to handle a query which is no longer the latest query. The results for the previous query have come in but they will not be applied. Assigned Query Id: ${request.id}, latest Query Id: ${lastQueryId}`
				);
				return;
			}

			if (!Array.isArray(searchResults?.results)) {
				logger.info(
					`No results array returned for query: ${request.query} with Query Id: ${request.id}. Last Query Id: ${lastQueryId}.`
				);
			} else {
				logger.info(
					`${searchResults.results.length} results returned for query: ${request.query} with Query Id: ${request.id}. Last Query Id: ${lastQueryId}.`
				);
			}

			// Return all the results and filters async so that the method
			// returns quickly without the UI bouncing
			lastResponse.revoke("home-searching");
			lastResponse.respond(searchResults.results);

			// Remove any filters with no options
			const contextFilters = searchResults.context?.filters;
			if (Array.isArray(contextFilters)) {
				for (const filter of contextFilters) {
					if (Array.isArray(filter.options) && filter.options.length > 0) {
						finalFilters.push(filter);
					}
				}
			}

			// The integrations returned us some source filters so add them to the list of source filter options
			if (enableSourceFilter) {
				if (Array.isArray(searchResults.sourceFilters) && searchResults.sourceFilters.length > 0) {
					sourceFilter = {
						id: HOME_SOURCE_FILTERS,
						title: homeProviderOptions?.sourceFilter?.label ?? HOME_SOURCE_DEFAULT_FILTER_LABEL,
						options: searchResults.sourceFilters.map((c) => ({ value: c, isSelected: true }))
					};
				} else {
					sourceFilter = createEmptySourceFilter();
				}
			}

			// We copy and reverse the filters as they are laid out right to left
			// and we want to stop them from moving position once they are displayed
			const filters = (sourceFilter ? [...finalFilters, sourceFilter] : finalFilters).slice().reverse();
			lastResponse.updateContext({
				filters
			});
		} catch (err) {
			logger.error("Exception while getting search list results", err);
		}
	}, 200);

	const integrationProgressResults = await getSearchResultsProgress(
		request.query,
		lastResponse,
		selectedSourceFilterOptions,
		queryOptions
	);

	return {
		results: [
			{
				key: "home-searching",
				title: "Searching ...",
				icon: homeProviderOptions?.icon,
				actions: [],
				template: CLITemplate.Loading,
				templateContent: ""
			},
			...integrationProgressResults
		],
		context: {
			filters: enableSourceFilter ? [createEmptySourceFilter()] : []
		}
	};
}

/**
 * Handle the selection of a search result.
 * @param result The result that was selected.
 */
async function onSelection(result: HomeDispatchedSearchResult): Promise<void> {
	if (!isEmpty(result.data)) {
		const handled = await itemSelection(result, lastResponse, getHomeWindowIdentity?.());

		if (result.action.trigger === "user-action") {
			if (handled) {
				logger.info(
					`The action for result with title: '${result.title}' for provider: '${
						result.data?.providerId ?? "unknown"
					}' was handled`
				);
			} else {
				logger.error(
					`The action for result with title: '${result.title}' for provider: '${
						result.data?.providerId ?? "unknown"
					}' was not handled`
				);
			}
		}
	} else if (result.action.trigger === "user-action") {
		logger.warn("Unable to execute result without data being passed");
	}
}

/**
 * By creating a dummy filters the UI always shows the filter row, which stops it
 * bouncing as it adds and removes.
 * @returns A dummy filter.
 */
function createEmptySourceFilter(): CLIFilter {
	return {
		id: HOME_SOURCE_FILTERS,
		title: homeProviderOptions?.sourceFilter?.label ?? HOME_SOURCE_DEFAULT_FILTER_LABEL,
		options: [
			{
				value: "All",
				isSelected: true
			}
		]
	};
}
