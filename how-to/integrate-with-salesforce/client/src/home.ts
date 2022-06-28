import { ConnectionError } from "@openfin/salesforce";
import {
	CLIDispatchedSearchResult,
	CLIFilter,
	CLIFilterOptionType,
	CLIProvider,
	CLISearchListenerRequest,
	CLISearchListenerResponse,
	CLISearchResponse,
	CLISearchResultContact,
	CLISearchResultList,
	CLISearchResultPlain,
	CLISearchResultSimpleText,
	CLITemplate,
	Home
} from "@openfin/workspace";
import { launchView } from "./browser";
import {
	connectToSalesforce,
	getConnection,
	getObjectUrl,
	getSearchResults,
	SalesforceAccount,
	SalesforceContact,
	SalesforceContentNote,
	SalesforceFeedItem,
	SalesforceTask
} from "./salesforce";
import { getSettings } from "./settings";
import { SalesforceResultData } from "./shapes";

const BROWSE_SEARCH_RESULT_KEY = "browse-salesforce";
const PROVIDER_ID = "integrate-with-salesforce";
const NOT_CONNECTED_SEARCH_RESULT_KEY = "not-connected-result";
const OBJECTS_FILTER_ID = "objects";

function getSearchFilters(objects: string[]): CLIFilter[] {
	if (Array.isArray(objects)) {
		const filters: CLIFilter[] = [];
		const uniqueObjects = [...new Set(objects.sort())];
		const objectFilter: CLIFilter = {
			id: OBJECTS_FILTER_ID,
			title: "Objects",
			type: CLIFilterOptionType.MultiSelect,
			options: []
		};

		for (const object of uniqueObjects) {
			if (Array.isArray(objectFilter.options)) {
				objectFilter.options.push({
					value: object,
					isSelected: false
				});
			}
		}

		filters.push(objectFilter);
		return filters;
	}
	return [];
}

async function getResults(
	query?: string,
	queryMinLength = 3,
	filters?: CLIFilter[]
): Promise<CLISearchResponse> {
	// Define the default "browse" search result displayed when no query provided
	const salesforceConnection = getConnection();
	const { orgUrl } = salesforceConnection;
	const { icon, iconMap } = await getSettings();
	const browseResult: CLISearchResultPlain = {
		actions: [{ name: "Browse", hotkey: "enter" }],
		data: {
			pageUrl: orgUrl
		} as SalesforceResultData,
		icon,
		key: BROWSE_SEARCH_RESULT_KEY,
		template: CLITemplate.Plain,
		templateContent: undefined,
		title: "Browse Salesforce"
	};

	// Return default browse result if query less than minimum char length or starts with /
	const searchQuery = query.trim();
	if (searchQuery.length < queryMinLength || searchQuery.startsWith("/")) {
		return { results: [browseResult] };
	}

	// Retrieve search results from Salesforce
	let searchResults: (
		| SalesforceAccount
		| SalesforceContact
		| SalesforceTask
		| SalesforceContentNote
		| SalesforceFeedItem
	)[];
	try {
		let selectedObjects: string[] = [];
		if (Array.isArray(filters) && filters.length > 0) {
			const objectsFilter = filters.find((x) => x.id === OBJECTS_FILTER_ID);
			if (objectsFilter) {
				selectedObjects = (
					Array.isArray(objectsFilter.options) ? objectsFilter.options : [objectsFilter.options]
				)
					.filter((x) => Boolean(x.isSelected))
					.map((x) => (x.value === "Note" ? "ContentNote" : x.value));
			}
		}
		searchResults = await getSearchResults(searchQuery, selectedObjects);
	} catch (err) {
		if (err instanceof ConnectionError) {
			return {
				results: [
					{
						actions: [{ name: "Reconnect", hotkey: "enter" }],
						key: NOT_CONNECTED_SEARCH_RESULT_KEY,
						icon,
						title: "Reconnect to Salesforce"
					} as CLISearchResultSimpleText
				]
			};
		}
		return { results: [] };
	}

	const results = searchResults.map((searchResult) => {
		if ("Website" in searchResult) {
			return {
				actions: [{ name: "View", hotkey: "enter" }],
				label: searchResult.attributes.type,
				key: searchResult.Id,
				title: searchResult.Name,
				icon: iconMap.account,
				data: {
					pageUrl: getObjectUrl(searchResult.Id, orgUrl)
				},
				template: CLITemplate.Contact,
				templateContent: {
					name: searchResult.Name,
					title: searchResult.Industry,
					details: [
						[
							["Phone", searchResult.Phone],
							["Type", searchResult.Type],
							["Website", searchResult.Website]
						]
					]
				}
			} as CLISearchResultContact;
		} else if ("Email" in searchResult) {
			return {
				actions: [{ name: "View", hotkey: "enter" }],
				label: searchResult.attributes.type,
				key: searchResult.Id,
				title: searchResult.Name,
				icon: iconMap.contact,
				data: {
					pageUrl: getObjectUrl(searchResult.Id, orgUrl)
				},
				template: CLITemplate.Contact,
				templateContent: {
					name: searchResult.Name,
					title: searchResult.Title,
					useInitials: true,
					details: [
						[
							["Department", searchResult.Department],
							["Email", searchResult.Email],
							["Work #", searchResult.Phone]
						]
					]
				}
			} as CLISearchResultContact;
		} else if ("Description" in searchResult) {
			return {
				actions: [{ name: "View", hotkey: "enter" }],
				label: searchResult.attributes.type,
				key: searchResult.Id,
				title: searchResult.Subject,
				icon: iconMap.task,
				data: {
					pageUrl: getObjectUrl(searchResult.Id, orgUrl)
				},
				template: CLITemplate.List,
				templateContent: [
					["Subject", searchResult.Subject],
					["Comments", searchResult.Description]
				]
			} as CLISearchResultList;
		} else if ("TextPreview" in searchResult) {
			return {
				actions: [{ name: "View", hotkey: "enter" }],
				label: "Note",
				key: searchResult.Id,
				title: searchResult.Title,
				icon: iconMap.note,
				data: {
					pageUrl: getObjectUrl(searchResult.Id, orgUrl)
				},
				template: CLITemplate.List,
				templateContent: [
					["Title", searchResult.Title],
					["Content", searchResult?.TextPreview]
				]
			} as CLISearchResultList;
		} else if (
			"actor" in searchResult &&
			(searchResult.type === "TextPost" || searchResult.type === "ContentPost")
		) {
			return {
				actions: [{ name: "View", hotkey: "enter" }],
				label: "Chatter",
				key: searchResult.id,
				title: searchResult.actor?.displayName,
				icon: iconMap.chatter,
				data: {
					pageUrl: getObjectUrl(searchResult.id, orgUrl)
				} as SalesforceResultData,
				template: CLITemplate.Contact,
				templateContent: {
					name: searchResult.actor?.displayName,
					useInitials: true,
					details: [
						[
							["Header", searchResult?.header?.text],
							["Note", searchResult?.body?.text]
						]
					]
				}
			} as CLISearchResultContact;
		}
	});

	const filteredResults = results.filter(Boolean) as CLISearchResultContact[];
	const objects = searchResults.map((result) => getItemType(result));

	return {
		results: filteredResults,
		context: {
			filters: getSearchFilters(objects.map((c) => (c === "ContentNote" ? "Note" : c)))
		}
	};
}

function getItemType(
	item: SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote | SalesforceFeedItem
) {
	return "attributes" in item ? item.attributes.type : "Chatter";
}

export async function register(): Promise<void> {
	console.log("Initialising home");
	const settings = await getSettings();
	const queryMinLength = settings.queryMinLength || 3;
	let lastResponse: CLISearchListenerResponse;
	let query: string;
	let filters: CLIFilter[];

	const onUserInput = async (
		request: CLISearchListenerRequest,
		response: CLISearchListenerResponse
	): Promise<CLISearchResponse> => {
		query = request.query.toLowerCase();
		if (query.startsWith("/")) {
			return { results: [] };
		}

		filters = request?.context?.selectedFilters;
		if (lastResponse !== undefined) {
			lastResponse.close();
		}
		lastResponse = response;
		lastResponse.open();
		const results = await getResults(query, queryMinLength, filters);
		return results;
	};

	const onSelection = async (result: CLIDispatchedSearchResult) => {
		// if the user clicked the reconnect result, reconnect to salesforce and re-run query
		if (result.key === NOT_CONNECTED_SEARCH_RESULT_KEY) {
			await connectToSalesforce();
			const results = await getResults(query, queryMinLength, filters);
			lastResponse.revoke(NOT_CONNECTED_SEARCH_RESULT_KEY);
			lastResponse.respond(results.results);
			await Home.show();
			return;
		}

		// otherwise open the result page url in browser
		const data = result.data as SalesforceResultData;
		if (data !== undefined) {
			await launchView(data.pageUrl);
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	const cliProvider: CLIProvider = {
		title: settings.title,
		id: PROVIDER_ID,
		icon: settings.icon,
		onUserInput,
		onResultDispatch: onSelection
	};

	await Home.register(cliProvider);
	console.log("Home configured");
}

export async function show(): Promise<void> {
	await Home.show();
}

export async function hide(): Promise<void> {
	await Home.hide();
}

export async function deregister(): Promise<void> {
	return Home.deregister(PROVIDER_ID);
}
