import {
	CLIFilterOptionType,
	CLITemplate,
	Home,
	type App,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeProvider,
	type HomeRegistration,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { launchApp } from "./launch";
import type { PlatformSettings } from "./shapes";

const QUERY_MIN_LENGTH = 3;
const QUERY_FIELDS = ["title"];

let homeRegistration: HomeRegistration | undefined;

/**
 * Register with the home component.
 * @param platformSettings The platform settings from the manifest.
 * @param apps The list of apps from the manifest.
 * @returns The registration details for home.
 */
export async function register(
	platformSettings: PlatformSettings,
	apps?: App[]
): Promise<HomeRegistration | undefined> {
	console.log("Initializing home.");

	let lastResponse: HomeSearchListenerResponse;

	/**
	 * The callback fired when the user types in the home query.
	 * @param request The request object from the home component.
	 * @param response The response to use for async updates.
	 * @returns The results to display in home.
	 */
	async function onUserInput(
		request: HomeSearchListenerRequest,
		response: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		const queryLower = request.query.toLowerCase();

		// If the query starts with a / treat this as a help request
		// so we don't have any additional entries to show
		if (queryLower.startsWith("/")) {
			return { results: [] };
		}

		const filters: CLIFilter[] | undefined = request?.context?.selectedFilters;
		if (lastResponse !== undefined) {
			lastResponse.close();
		}
		lastResponse = response;
		lastResponse.open();

		return getResults(apps, queryLower, filters);
	}

	/**
	 * The callback fired when a selection is made in home.
	 * @param result The item that was selected in home.
	 */
	async function onSelection(result: HomeDispatchedSearchResult): Promise<void> {
		if (result.data !== undefined) {
			await launchApp(result.data as App);
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	}

	const homeProvider: HomeProvider = {
		...platformSettings,
		onUserInput,
		onResultDispatch: onSelection
	};

	homeRegistration = await Home.register(homeProvider);
	console.log("Home configured.");
	console.log(homeRegistration);

	return homeRegistration;
}

/**
 * Get the list of results to show in home.
 * @param apps The list of applications.
 * @param queryLower Lower case version of query.
 * @param filters Filters to apply to results.
 * @returns The search response containing results and filters.
 */
async function getResults(
	apps: App[] | undefined,
	queryLower: string,
	filters?: CLIFilter[]
): Promise<HomeSearchResponse> {
	if (apps?.length) {
		const tags: string[] = [];
		const appSearchEntries = mapAppEntriesToSearchEntries(apps);

		const initialResults: HomeSearchResult[] = [...appSearchEntries];

		if (initialResults.length > 0) {
			const finalResults = initialResults.filter((entry) => {
				let textMatchFound = true;
				let filterMatchFound = true;

				if (queryLower !== undefined && queryLower !== null && queryLower.length >= QUERY_MIN_LENGTH) {
					textMatchFound = QUERY_FIELDS.some((target) => {
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

			const response: HomeSearchResponse = {
				results: finalResults,
				context: {
					filters: getSearchFilters(tags)
				}
			};

			return response;
		}
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
				entry.label = "Native App";
				entry.actions = [action];
			} else if (app.manifestType === "window") {
				entry.label = "Window";
				action.name = "Launch Window";
				entry.actions = [action];
			} else if (app.manifestType === "inline-appasset") {
				action.name = "Launch App Asset";
				entry.label = "Native App Asset";
				entry.actions = [action];
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
