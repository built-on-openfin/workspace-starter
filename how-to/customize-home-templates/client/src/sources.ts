import type {
	CLIFilter,
	HomeDispatchedSearchResult,
	HomeRegistration,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import { AsyncContactsSource } from "./sources/async-contacts/async-contacts-source";
import { EmojiSource } from "./sources/emoji/emoji-source";
import { QuoteSource } from "./sources/quote/quote-source";
import { TreeInlineSource } from "./sources/tree-inline/tree-inline-source";
import { TreeQuerySource } from "./sources/tree-query/tree-query-source";

// Configuration for all the data sources.
const SOURCE_SETTINGS: {
	id: string;
	icon: string;
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
}[] = [
	{
		id: "quote",
		icon: "http://localhost:8080/favicon.ico",
		title: "Quote Provider",
		data: {
			rootUrl: "http://localhost:8080/data/quotes/"
		}
	},
	{
		id: "emoji",
		icon: "http://localhost:8080/favicon.ico",
		title: "Emoji Provider",
		data: {
			rootUrl: ""
		}
	},
	{
		id: "async",
		icon: "http://localhost:8080/favicon.ico",
		title: "Async Provider",
		data: {
			rootUrl: "http://localhost:8080/data/contacts/"
		}
	},
	{
		id: "tree-query",
		icon: "http://localhost:8080/favicon.ico",
		title: "Tree Query Provider",
		data: {
			rootUrl: "http://localhost:8080/data/organizations/"
		}
	},
	{
		id: "tree-inline",
		icon: "http://localhost:8080/favicon.ico",
		title: "Tree Inline Provider",
		data: {
			rootUrl: "http://localhost:8080/data/organizations/"
		}
	}
];

// The instance of the sources
const SOURCES = [
	new QuoteSource(),
	new EmojiSource(),
	new AsyncContactsSource(),
	new TreeQuerySource(),
	new TreeInlineSource()
];

/**
 * Initialize the sources.
 * @param homeRegistration The home registration to use.
 */
export async function initializeSources(homeRegistration: HomeRegistration): Promise<void> {
	for (let i = 0; i < SOURCES.length; i++) {
		await SOURCES[i].initialize(SOURCE_SETTINGS[i], () => {}, {
			setSearchQuery: async (query: string) => homeRegistration.setSearchQuery(query),
			openUrl: async (url: string) => fin.System.openUrlWithBrowser(url)
		});
	}
}

/**
 * Get the help search results by iterating the list of sources.
 * @returns The list of help entries.
 */
export async function getHelpSearchEntries(): Promise<HomeSearchResult[]> {
	let helpResults: HomeSearchResult[] = [];

	for (const element of SOURCES) {
		if (element.getHelpSearchEntries) {
			helpResults = helpResults.concat(await element.getHelpSearchEntries());
		}
	}

	return helpResults;
}

/**
 * Get the search results by iterating the list of sources.
 * @param query The query to search for.
 * @param filters The filters to apply.
 * @param lastResponse The last search response used for updating existing results.
 * @returns The list of search results.
 */
export async function getSearchResults(
	query: string,
	filters: CLIFilter[],
	lastResponse: HomeSearchListenerResponse
): Promise<HomeSearchResponse> {
	const response: HomeSearchResponse = {
		results: []
	};

	for (const element of SOURCES) {
		const searchResponse = await element.getSearchResults(query, filters, lastResponse);
		response.results = response.results.concat(searchResponse.results);
	}

	return response;
}

/**
 * An entry has been selected, so lookup the providerId in the data and
 * pass the result data to it.
 * @param result The dispatched result.
 * @param lastResponse The last response.
 * @returns True if the item was handled.
 */
export async function itemSelection(
	result: HomeDispatchedSearchResult,
	lastResponse: HomeSearchListenerResponse
): Promise<boolean> {
	let res = false;

	const foundIndex = SOURCE_SETTINGS.findIndex((source) => source.id === result.data?.providerId);
	if (foundIndex >= 0) {
		res = await SOURCES[foundIndex].itemSelection(result, lastResponse);
	}

	return res;
}
