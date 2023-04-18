import {
	CLIFilterOptionType,
	CLITemplate,
	Home,
	type App,
	type CLIDispatchedSearchResult,
	type CLIFilter,
	type CLIProvider,
	type CLISearchListenerRequest,
	type CLISearchListenerResponse,
	type CLISearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { getCurrentSync, type Page } from "@openfin/workspace-platform";
import { getApps, launchApp } from "./apps";
import type { CustomSettings } from "./shapes";

const HOME_ACTION_DELETE_PAGE = "Delete Page";
const HOME_ACTION_LAUNCH_PAGE = "Launch Page";

let isHomeRegistered = false;

/**
 * Register with the home component.
 * @param customSettings The custom settings from the manifest.
 * @returns Nothing.
 */
export async function register(customSettings: CustomSettings): Promise<void> {
	console.log("Initialising home.");

	if (
		customSettings.homeProvider === undefined ||
		customSettings.homeProvider.id === undefined ||
		customSettings.homeProvider.title === undefined
	) {
		console.warn(
			"homeProvider: not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
		);
		return;
	}

	const queryMinLength = customSettings?.homeProvider?.queryMinLength ?? 3;
	const queryAgainst = customSettings?.homeProvider?.queryAgainst;
	let lastResponse: CLISearchListenerResponse;

	// The callback fired when the user types in the home query
	const onUserInput = async (
		request: CLISearchListenerRequest,
		response: CLISearchListenerResponse
	): Promise<CLISearchResponse> => {
		const queryLower = request.query.toLowerCase();

		// If the query starts with a / treat this as a help request
		// so we don't have any additional entries to show
		if (queryLower.startsWith("/")) {
			return { results: [] };
		}

		const filters: CLIFilter[] = request?.context?.selectedFilters;
		if (lastResponse !== undefined) {
			lastResponse.close();
		}
		lastResponse = response;
		lastResponse.open();

		return getResults(customSettings, queryLower, queryMinLength, queryAgainst, filters);
	};

	// The callback fired when a selection is made in home
	const onSelection = async (result: CLIDispatchedSearchResult): Promise<void> => {
		if (result.data !== undefined) {
			// If the selected item could be a page or an app
			const data: { pageId?: string } & App = result.data;

			// It has a pageId so its a page, perform the specific page action
			if (data.pageId !== undefined) {
				const platform = getCurrentSync();
				if (result.action.name === HOME_ACTION_DELETE_PAGE) {
					await platform.Storage.deletePage(data.pageId);
					if (lastResponse !== undefined && lastResponse !== null) {
						lastResponse.revoke(result.key);
					}
				} else {
					const pageToLaunch = await platform.Storage.getPage(data.pageId);

					await platform.Browser.createWindow({
						workspacePlatform: {
							pages: [pageToLaunch]
						}
					});
				}
			} else {
				// No pageId so it must be an App
				await launchApp(data);
			}
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	const cliProvider: CLIProvider = {
		title: customSettings.homeProvider.title,
		id: customSettings.homeProvider.id,
		icon: customSettings.homeProvider.icon,
		onUserInput,
		onResultDispatch: onSelection
	};

	const metaInfo = await Home.register(cliProvider);
	isHomeRegistered = true;
	console.log("Home configured.");
	console.log(metaInfo);
}

/**
 * Deregister from home.
 * @param customSettings The custom settings from the manifest.
 * @returns Nothing
 */
export async function deregister(customSettings: CustomSettings): Promise<void> {
	if (isHomeRegistered) {
		isHomeRegistered = false;
		if (customSettings.homeProvider) {
			return Home.deregister(customSettings.homeProvider.id);
		}
	}
	console.warn("Unable to deregister home as there is an indication it was never registered");
}

/**
 * Get the list of results to show in home.
 * @param customSettings The custom settings from the manifest.
 * @param queryLower Lower case version of query.
 * @param queryMinLength The min length that we can handle.
 * @param queryAgainst The fields to query against in the apps.
 * @param filters Filters to apply to results.
 * @returns The search response containing results and filters.
 */
async function getResults(
	customSettings: CustomSettings,
	queryLower: string,
	queryMinLength = 3,
	queryAgainst: string[] = ["title"],
	filters?: CLIFilter[]
): Promise<CLISearchResponse> {
	const apps = await getApps(customSettings);

	const platform = getCurrentSync();
	const pages = await platform.Storage.getPages();

	const tags: string[] = [];
	// Get the list of apps and also the workspace pages
	const appSearchEntries = mapAppEntriesToSearchEntries(apps);
	const pageSearchEntries = mapPageEntriesToSearchEntries(pages);

	const initialResults: HomeSearchResult[] = [...appSearchEntries, ...pageSearchEntries];

	if (initialResults.length > 0) {
		const finalResults = initialResults.filter((entry) => {
			let textMatchFound = true;
			let filterMatchFound = true;

			if (queryLower !== undefined && queryLower !== null && queryLower.length >= queryMinLength) {
				textMatchFound = queryAgainst.some((target) => {
					const path: (keyof HomeSearchResult)[] = target.split(".") as (keyof HomeSearchResult)[];
					if (path.length === 1) {
						const targetValue = entry[path[0]];

						if (targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
							return targetValue.toLowerCase().includes(queryLower);
						}
					} else if (path.length === 2) {
						const targetEntry = entry[path[0]];
						let targetValue: string | string[] | undefined;
						if (targetEntry !== undefined && targetEntry !== null) {
							targetValue = targetEntry[path[1]];
						}

						if (targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
							return targetValue.toLowerCase().includes(queryLower);
						}

						if (targetValue !== undefined && targetValue !== null && Array.isArray(targetValue)) {
							if (
								targetValue.length > 0 &&
								typeof targetValue[0] === "string" &&
								targetValue.some((target2) => target2.toLowerCase().startsWith(queryLower))
							) {
								return true;
							}
							console.warn(
								`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${targetEntry}`
							);
						}
					} else {
						console.warn(
							"The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings."
						);
					}
					return false;
				});
			}

			if (Array.isArray(filters) && filters.length > 0) {
				filterMatchFound = filters.some((filter) => {
					if (Array.isArray(filter.options)) {
						if (entry.data?.tags !== undefined) {
							return filter.options.every(
								(option) => !option.isSelected || entry.data.tags.includes(option.value)
							);
						}
					} else if (filter.options.isSelected && entry.data?.tags !== undefined) {
						return entry.data?.tags.indexOf(filter.options.value) > -1;
					}
					return true;
				});
			}

			if (textMatchFound && Array.isArray(entry.data?.tags)) {
				tags.push(...(entry.data.tags as string[]));
			}
			return textMatchFound && filterMatchFound;
		});

		const response: CLISearchResponse = {
			results: finalResults,
			context: {
				filters: getSearchFilters(tags)
			}
		};

		return response;
	}
	return {
		results: []
	};
}

/**
 * Create search tags based on the results.
 * @param tags The tags to base the filters on.
 * @returns The filters.
 */
function getSearchFilters(tags: string[]): CLIFilter[] {
	if (Array.isArray(tags)) {
		const filters: CLIFilter[] = [];
		const uniqueTags = [...new Set(tags)].sort();
		const tagFilter: CLIFilter = {
			id: "tags",
			title: "Tags",
			type: CLIFilterOptionType.MultiSelect,
			options: []
		};

		for (const tag of uniqueTags) {
			if (Array.isArray(tagFilter.options)) {
				tagFilter.options.push({
					value: tag,
					isSelected: false
				});
			}
		}

		filters.push(tagFilter);
		return filters;
	}
	return [];
}

/**
 * Convert the app definitions into search results.
 * @param apps The list of apps to convert.
 * @returns The search result templates.
 */
function mapAppEntriesToSearchEntries(apps: App[]): HomeSearchResult[] {
	const appResults: HomeSearchResult[] = [];
	if (Array.isArray(apps)) {
		for (const element of apps) {
			const action = { name: "Launch View", hotkey: "enter" };
			const entry: Partial<HomeSearchResult> = {
				key: element.appId,
				title: element.title,
				data: element
			};

			if (element.manifestType === "view") {
				entry.label = "View";
				entry.actions = [action];
			} else if (element.manifestType === "snapshot") {
				entry.label = "Snapshot";
				action.name = "Launch Snapshot";
				entry.actions = [action];
			} else if (element.manifestType === "manifest") {
				entry.label = "App";
				action.name = "Launch App";
				entry.actions = [action];
			} else if (element.manifestType === "external") {
				action.name = "Launch Native App";
				entry.actions = [action];
				entry.label = "Native App";
			}

			if (Array.isArray(element.icons) && element.icons.length > 0) {
				entry.icon = element.icons[0].src;
			}

			if (element.description !== undefined) {
				entry.description = element.description;
				entry.shortDescription = element.description;
				entry.template = CLITemplate.SimpleText;
				entry.templateContent = element.description;
			} else {
				entry.template = CLITemplate.Plain;
			}

			appResults.push(entry as HomeSearchResult);
		}
	}
	return appResults;
}

/**
 * Maps the workspace pages to search results.
 * @param pages The list of the pages to convert.
 * @returns The search results.
 */
function mapPageEntriesToSearchEntries(pages: Page[]): HomeSearchResult[] {
	const pageResults: HomeSearchResult[] = [];

	if (Array.isArray(pages)) {
		for (const element of pages) {
			const entry: Partial<HomeSearchResult> = {
				key: element.pageId,
				title: element.title,
				label: "Page",
				actions: [
					{ name: HOME_ACTION_DELETE_PAGE, hotkey: "CmdOrCtrl+Shift+D" },
					{ name: HOME_ACTION_LAUNCH_PAGE, hotkey: "Enter" }
				],
				data: { tags: ["page"], pageId: element.pageId }
			};

			if (element.description !== undefined) {
				entry.description = element.description;
				entry.shortDescription = element.description;
				entry.template = CLITemplate.SimpleText;
				entry.templateContent = element.description;
			} else {
				entry.template = CLITemplate.Plain;
			}

			pageResults.push(entry as HomeSearchResult);
		}
	}

	return pageResults;
}
