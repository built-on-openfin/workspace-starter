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
	type HomeSearchResult,
	HomeRegistration
} from "@openfin/workspace";
import { getCurrentSync, type Page } from "@openfin/workspace-platform";
import { getApps, launchApp } from "./apps";
import type { AppProviderSettings, HomeProviderSettings } from "./shapes";

const HOME_ACTION_DELETE_PAGE = "Delete Page";
const HOME_ACTION_LAUNCH_PAGE = "Launch Page";

let homeRegistration: HomeRegistration | undefined;

/**
 * Register with the home component.
 * @param appSettings The app settings from the manifest.
 * @param homeSettings The home settings from the manifest.
 * @returns The registration details for home.
 */
export async function register(
	appSettings: AppProviderSettings | undefined,
	homeSettings: HomeProviderSettings | undefined
): Promise<HomeRegistration | undefined> {
	console.log("Initialising home.");

	if (appSettings === undefined) {
		console.warn(
			"appProvider: not configured in the customSettings of your manifest correctly. Ensure you have the appProvider object defined in customSettings"
		);
		return;
	}

	if (homeSettings === undefined || homeSettings.id === undefined || homeSettings.title === undefined) {
		console.warn(
			"homeProvider: not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
		);
		return;
	}

	const queryMinLength = homeSettings.queryMinLength ?? 3;
	const queryAgainst = homeSettings.queryAgainst;
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

		return getResults(appSettings, queryLower, queryMinLength, queryAgainst, filters);
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
		title: homeSettings.title,
		id: homeSettings.id,
		icon: homeSettings.icon,
		onUserInput,
		onResultDispatch: onSelection
	};

	homeRegistration = await Home.register(cliProvider);
	console.log("Home configured.");
	console.log(homeRegistration);
}

/**
 * Deregister from home.
 * @param homeSettings The home settings from the manifest.
 * @returns Nothing.
 */
export async function deregister(homeSettings: HomeProviderSettings | undefined): Promise<void> {
	if (homeRegistration && homeSettings?.id) {
		return Home.deregister(homeSettings.id);
	}
	console.warn("Unable to deregister home as there is an indication it was never registered");
}

/**
 * Get the list of results to show in home.
 * @param appSettings The app settings from the manifest.
 * @param queryLower Lower case version of query.
 * @param queryMinLength The min length that we can handle.
 * @param queryAgainst The fields to query against in the apps.
 * @param filters Filters to apply to results.
 * @returns The search response containing results and filters.
 */
async function getResults(
	appSettings: AppProviderSettings,
	queryLower: string,
	queryMinLength = 3,
	queryAgainst: string[] = ["title"],
	filters?: CLIFilter[]
): Promise<CLISearchResponse> {
	const apps = await getApps(appSettings);

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
	const results: HomeSearchResult[] = [];

	if (Array.isArray(apps)) {
		for (const app of apps) {
			const action = { name: "Launch View", hotkey: "enter" };
			const entry: Partial<HomeSearchResult> = {
				key: app.appId,
				title: app.title,
				data: app
			};

			if (app.manifestType === "view") {
				entry.label = "View";
				entry.actions = [action];
			} else if (app.manifestType === "snapshot") {
				entry.label = "Snapshot";
				action.name = "Launch Snapshot";
				entry.actions = [action];
			} else if (app.manifestType === "manifest") {
				entry.label = "App";
				action.name = "Launch App";
				entry.actions = [action];
			} else if (app.manifestType === "external") {
				action.name = "Launch Native App";
				entry.actions = [action];
				entry.label = "Native App";
			}

			if (Array.isArray(app.icons) && app.icons.length > 0) {
				entry.icon = app.icons[0].src;
			}

			if (app.description !== undefined) {
				entry.description = app.description;
				entry.shortDescription = app.description;
				entry.template = CLITemplate.SimpleText;
				entry.templateContent = app.description;
			} else {
				entry.template = CLITemplate.Plain;
			}

			results.push(entry as HomeSearchResult);
		}
	}

	return results;
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
