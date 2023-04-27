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
import { ISource, ISourceDefinition } from "./shapes";

// Configuration for all the data sources.
const SOURCES: {
	definition: ISourceDefinition;
	instance: ISource;
}[] = [
	{
		definition: {
			id: "quote",
			data: {
				rootUrl: "http://localhost:8080/data/quotes/"
			}
		},
		instance: new QuoteSource()
	},
	{
		definition: {
			id: "emoji",
			data: {
				rootUrl: ""
			}
		},
		instance: new EmojiSource()
	},
	{
		definition: {
			id: "async",
			data: {
				rootUrl: "http://localhost:8080/data/contacts/"
			}
		},
		instance: new AsyncContactsSource()
	},
	{
		definition: {
			id: "tree-query",
			data: {
				rootUrl: "http://localhost:8080/data/organizations/"
			}
		},
		instance: new TreeQuerySource()
	},
	{
		definition: {
			id: "tree-inline",
			data: {
				rootUrl: "http://localhost:8080/data/organizations/"
			}
		},
		instance: new TreeInlineSource()
	}
];

/**
 * Initialize the sources.
 * @param homeRegistration The home registration to use.
 */
export async function initializeSources(homeRegistration: HomeRegistration): Promise<void> {
	for (const source of SOURCES) {
		await source.instance.initialize(source.definition, () => {}, {
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
		helpResults = helpResults.concat(await element.instance.getHelpSearchEntries());
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
		const searchResponse = await element.instance.getSearchResults(query, filters, lastResponse);
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

	const foundIndex = SOURCES.findIndex((source) => source.definition.id === result.data?.providerId);
	if (foundIndex >= 0) {
		res = await SOURCES[foundIndex].instance.itemSelection(result, lastResponse);
	}

	return res;
}
