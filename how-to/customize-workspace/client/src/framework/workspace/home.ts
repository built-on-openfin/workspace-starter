import {
	CLIFilter,
	CLIProvider,
	CLISearchListenerRequest,
	CLISearchListenerResponse,
	CLISearchResponse,
	Home,
	HomeDispatchedSearchResult,
	HomeRegistration
} from "@openfin/workspace";
import { getHelpSearchEntries, getSearchResults, itemSelection } from "../integrations";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";

const logger = createLogger("Home");

const HOME_SOURCE_FILTERS = "sources";

const HOME_SOURCE_DEFAULT_FILTER_LABEL = "Source";

let registrationInfo: HomeRegistration | undefined;
let queryMinLengthSetting = 3;
let queryAgainstSetting = ["title"];
let enableSourceFilter;
let lastResponse: CLISearchListenerResponse;
let sourceFilterLabel = HOME_SOURCE_DEFAULT_FILTER_LABEL;

export async function register(): Promise<HomeRegistration> {
	if (!registrationInfo) {
		logger.info("Initializing home");
		const settings = await getSettings();
		if (
			settings.homeProvider === undefined ||
			settings.homeProvider.id === undefined ||
			settings.homeProvider.title === undefined
		) {
			logger.warn(
				"Provider not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
			);
			return null;
		}

		const { queryMinLength, queryAgainst, sourceFilter, ...cliSettings } = settings.homeProvider;
		queryMinLengthSetting = queryMinLength ?? queryMinLengthSetting;
		queryAgainstSetting = queryAgainst ?? queryAgainstSetting;
		enableSourceFilter = !(sourceFilter?.disabled ?? false);
		sourceFilterLabel = sourceFilter?.label ?? sourceFilterLabel;

		const cliProvider: CLIProvider = {
			...cliSettings,
			onUserInput,
			onResultDispatch: onSelection,
			dispatchFocusEvents: true
		};

		registrationInfo = await Home.register(cliProvider);
		logger.info("Version:", registrationInfo);
		logger.info("Home provider initialized");
	}

	return registrationInfo;
}

export async function show() {
	logger.info("Show Home called.");
	return Home.show();
}

export async function hide() {
	logger.info("Hide Home called.");
	return Home.hide();
}

export async function deregister() {
	if (registrationInfo) {
		registrationInfo = undefined;
		const settings = await getSettings();
		logger.info("About to call Home deregister.");
		return Home.deregister(settings.homeProvider.id);
	}
	logger.warn("Unable to deregister home as there is an indication it was never registered");
}

async function onUserInput(
	request: CLISearchListenerRequest,
	response: CLISearchListenerResponse
): Promise<CLISearchResponse> {
	try {
		const filters: CLIFilter[] = request?.context?.selectedFilters;

		if (lastResponse !== undefined) {
			lastResponse.close();
		}
		lastResponse = response;
		lastResponse.open();

		const queryLower = request.query.toLowerCase();

		if (queryLower === "?") {
			const integrationHelpSearchEntries = await getHelpSearchEntries();
			const searchResults = {
				results: integrationHelpSearchEntries,
				context: {
					filters: []
				}
			};
			return searchResults;
		}

		let selectedSourceFilterOptions: string[] = [];
		if (enableSourceFilter && filters) {
			const sourceFilter = filters.find((f) => f.id === HOME_SOURCE_FILTERS);
			if (sourceFilter) {
				if (Array.isArray(sourceFilter.options)) {
					selectedSourceFilterOptions = sourceFilter.options.filter((o) => o.isSelected).map((o) => o.value);
				} else if (sourceFilter.options.isSelected) {
					selectedSourceFilterOptions.push(sourceFilter.options.value);
				}
			}
		}

		let sourceFilterOptions: string[] = [];

		const searchResults = await getSearchResults(
			request.query,
			filters,
			lastResponse,
			selectedSourceFilterOptions,
			{
				queryMinLength: queryMinLengthSetting,
				queryAgainst: queryAgainstSetting
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
				title: sourceFilterLabel,
				options: sourceFilterOptions.map((c) => ({ value: c, isSelected: true }))
			});
		}

		// Remove any empty filter lists as these can cause the UI to continually
		// expand and collapse as you type
		const finalFilters = [];
		if (Array.isArray(searchResults.context?.filters)) {
			for (const filter of searchResults.context.filters) {
				if (Array.isArray(filter.options) && filter.options.length > 0) {
					finalFilters.push(filter);
				}
			}
		}
		if (finalFilters.length > 0) {
			searchResults.context.filters = finalFilters;
		}

		return searchResults;
	} catch (err) {
		logger.error("Exception while getting search list results", err);
	}

	return { results: [] };
}

async function onSelection(result: HomeDispatchedSearchResult) {
	if (result.data !== undefined) {
		const handled = await itemSelection(result, lastResponse);
		logger.info(`The selection for result with title: ${result.title} was handled: ${handled}`);
	} else {
		logger.warn("Unable to execute result without data being passed");
	}
}
