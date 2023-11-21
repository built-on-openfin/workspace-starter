import {
	Home,
	type HomeProvider,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeRegistration,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	CLITemplate,
	CLIFilterOptionType
} from "@openfin/workspace";
import { getHelpSearchEntries, getSearchResults, itemSelection } from "../integrations";
import { createLogger } from "../logger-provider";
import type { HomeProviderOptions } from "../shapes/home-shapes";
import { isEmpty } from "../utils";

const HOME_SOURCE_FILTERS = "sources";
const HOME_SOURCE_DEFAULT_FILTER_LABEL = "Source";

const logger = createLogger("Home");

let homeProviderOptions: HomeProviderOptions | undefined;
let registrationInfo: HomeRegistration | undefined;
let lastResponse: HomeSearchListenerResponse;
let debounceTimerId: number | undefined;

/**
 * Register the home component.
 * @param options The options for the home provider.
 * @returns The registration.
 */
export async function register(
	options: HomeProviderOptions | undefined
): Promise<HomeRegistration | undefined> {
	if (!registrationInfo) {
		homeProviderOptions = options;
		logger.info("Initializing home");
		if (
			isEmpty(homeProviderOptions) ||
			isEmpty(homeProviderOptions.id) ||
			isEmpty(homeProviderOptions.title)
		) {
			logger.warn(
				"Provider not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
			);
			return;
		}

		const homeProvider: HomeProvider = {
			...homeProviderOptions,
			onUserInput,
			onResultDispatch: onSelection,
			dispatchFocusEvents: true
		};

		registrationInfo = await Home.register(homeProvider);
		logger.info("Version:", registrationInfo);
		logger.info("Home provider initialized");
	}

	return registrationInfo;
}

/**
 * Deregister the home component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (registrationInfo) {
		registrationInfo = undefined;
		logger.info("About to call Home deregister.");
		if (homeProviderOptions) {
			await Home.deregister(homeProviderOptions.id);
			homeProviderOptions = undefined;
		}
	}
	logger.warn("Unable to deregister home as there is an indication it was never registered");
}

/**
 * Show the home component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Show Home called.");
	return Home.show();
}

/**
 * Hide the home component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hide Home called.");
	return Home.hide();
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
	if (debounceTimerId) {
		window.clearTimeout(debounceTimerId);
		debounceTimerId = undefined;
	}

	if (!isEmpty(lastResponse)) {
		lastResponse.close();
	}
	lastResponse = response;
	lastResponse.open();

	// Debounce the keyboard input, this also means that the method returns
	// immediately with a dummy filter, so the UI does not "bounce"
	debounceTimerId = window.setTimeout(async () => {
		try {
			const filters: CLIFilter[] = request?.context?.selectedFilters ?? [];
			const queryLower = request.query.toLowerCase();

			if (queryLower === "?") {
				logger.info("Integration Help requested.");
				const integrationHelpSearchEntries = await getHelpSearchEntries();
				const searchResults = {
					results: integrationHelpSearchEntries,
					context: {
						filters: []
					}
				};
				return searchResults;
			}

			const enableSourceFilter = !(homeProviderOptions?.sourceFilter?.disabled ?? false);

			let selectedSourceFilterOptions: string[] = [];
			if (enableSourceFilter && filters) {
				const sourceFilter = filters.find((f) => f.id === HOME_SOURCE_FILTERS);
				if (sourceFilter) {
					if (Array.isArray(sourceFilter.options)) {
						selectedSourceFilterOptions = sourceFilter.options
							.filter((o) => o.isSelected)
							.map((o) => o.value);
					} else if (sourceFilter.options.isSelected) {
						selectedSourceFilterOptions.push(sourceFilter.options.value);
					}
				}
			}

			let sourceFilterOptions: string[] = [];

			logger.info("Search results requested.");
			const finalFilters: CLIFilter[] = [];
			const searchResults = await getSearchResults(
				request.query,
				filters,
				{
					...lastResponse,
					updateContext: (context: HomeSearchResponse["context"]) => {
						// We must provide an overloaded updateContext to the
						// integrations so that we can intercept it, this was
						// if they replace filters async it doesn't completely
						// obliterate any that already exist
						const finalContext = {
							filters: finalFilters
						};
						if (context?.filters) {
							finalContext.filters.push(...context.filters);
						}
						lastResponse.updateContext(finalContext);
					}
				},
				selectedSourceFilterOptions,
				{
					queryMinLength: homeProviderOptions?.queryMinLength ?? 3,
					queryAgainst: homeProviderOptions?.queryAgainst ?? ["title"],
					isSuggestion: request.context?.isSuggestion ?? false
				}
			);

			if (Array.isArray(searchResults.sourceFilters) && searchResults.sourceFilters.length > 0) {
				sourceFilterOptions = sourceFilterOptions.concat(searchResults.sourceFilters);
			}

			if (enableSourceFilter && sourceFilterOptions.length > 0) {
				searchResults.context = searchResults.context ?? {};
				searchResults.context.filters = searchResults.context.filters ?? [];
				searchResults.context.filters.push({
					id: HOME_SOURCE_FILTERS,
					title: homeProviderOptions?.sourceFilter?.label ?? HOME_SOURCE_DEFAULT_FILTER_LABEL,
					options: sourceFilterOptions.map((c) => ({ value: c, isSelected: true }))
				});
			}

			const contextFilters = searchResults.context?.filters;
			if (Array.isArray(contextFilters)) {
				for (const filter of contextFilters) {
					if (Array.isArray(filter.options) && filter.options.length > 0) {
						finalFilters.push(filter);
					}
				}
			}
			searchResults.context ??= {};
			searchResults.context.filters = finalFilters.length > 0 ? finalFilters : [createDummyFilter()];
			if (!Array.isArray(searchResults?.results)) {
				logger.info("No results array returned.");
			} else {
				logger.info(`${searchResults.results.length} results returned.`);
			}

			// Return all the results and filters async so that the method
			// returns quickly without the UI bouncing
			lastResponse.revoke("home-searching");
			lastResponse.respond(searchResults.results);
			lastResponse.updateContext({
				filters: searchResults.context?.filters
			});
		} catch (err) {
			logger.error("Exception while getting search list results", err);
		}
	}, 200);

	return {
		results: [
			{
				key: "home-searching",
				title: "Searching ...",
				icon: homeProviderOptions?.icon,
				actions: [],
				template: CLITemplate.Loading,
				templateContent: ""
			}
		],
		context: {
			filters: [createDummyFilter()]
		}
	};
}

/**
 * Handle the selection of a search result.
 * @param result The result that was selected.
 */
async function onSelection(result: HomeDispatchedSearchResult): Promise<void> {
	if (!isEmpty(result.data)) {
		const handled = await itemSelection(result, lastResponse);

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
function createDummyFilter(): CLIFilter {
	return {
		id: "app-searching",
		title: "Tags",
		type: CLIFilterOptionType.MultiSelect,
		options: [
			{
				value: "All",
				isSelected: true
			}
		]
	};
}
