import {
	CLIFilter,
	CLIFilterOptionType,
	CLIProvider,
	CLISearchListenerRequest,
	CLISearchListenerResponse,
	CLISearchResponse,
	CLITemplate,
	Home,
	HomeDispatchedSearchResult,
	HomeRegistration,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import { getAppIcon, getApps } from "../apps";
import { getHelpSearchEntries, getSearchResults, itemSelection } from "../integrations";
import { launch } from "../launch";
import { createLogger } from "../logger-provider";
import { manifestTypes } from "../manifest-types";
import { getSettings } from "../settings";
import type { PlatformApp } from "../shapes/app-shapes";

const logger = createLogger("Home");

const HOME_TAG_FILTERS = "tags";
const HOME_SOURCE_FILTERS = "sources";

const HOME_SOURCE_DEFAULT_FILTER_LABEL = "Source";

const HOME_APPS_FILTER = "Apps";

let registrationInfo: HomeRegistration | undefined;
let queryMinLength = 3;
let queryAgainst = ["title"];
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

		queryMinLength = settings?.homeProvider?.queryMinLength ?? queryMinLength;
		queryAgainst = settings?.homeProvider?.queryAgainst ?? queryAgainst;
		enableSourceFilter = !(settings?.homeProvider?.sourceFilter?.disabled ?? false);
		sourceFilterLabel = settings?.homeProvider?.sourceFilter?.label ?? sourceFilterLabel;

		const cliProvider: CLIProvider = {
			title: settings.homeProvider.title,
			id: settings.homeProvider.id,
			icon: settings.homeProvider.icon,
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
	return Home.show();
}

export async function hide() {
	return Home.hide();
}

export async function deregister() {
	if (registrationInfo) {
		registrationInfo = undefined;
		const settings = await getSettings();
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

		const searchResults = await getResults(queryLower, filters, selectedSourceFilterOptions);

		let sourceFilterOptions: string[] = [];
		if (enableSourceFilter) {
			sourceFilterOptions.push(HOME_APPS_FILTER);
		}

		const integrationResults = await getSearchResults(
			request.query,
			filters,
			lastResponse,
			selectedSourceFilterOptions,
			{
				queryMinLength,
				queryAgainst
			}
		);
		if (Array.isArray(integrationResults.results) && integrationResults.results.length > 0) {
			searchResults.results = searchResults.results.concat(integrationResults.results);
		}
		if (Array.isArray(integrationResults.context.filters) && integrationResults.context.filters.length > 0) {
			searchResults.context.filters = searchResults.context.filters.concat(
				integrationResults.context.filters
			);
		}

		if (Array.isArray(integrationResults.sourceFilters) && integrationResults.sourceFilters.length > 0) {
			sourceFilterOptions = sourceFilterOptions.concat(integrationResults.sourceFilters);
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

		if (!handled && result.action.trigger === "user-action") {
			await launch(result.data as PlatformApp);
		}
	} else {
		logger.warn("Unable to execute result without data being passed");
	}
}

async function getResults(
	queryLower: string,
	filters: CLIFilter[],
	selectedSources: string[]
): Promise<HomeSearchResponse> {
	const apps = await getApps({ private: false });
	let appSearchEntries = [];

	const tags: string[] = [];

	if (selectedSources.length === 0 || selectedSources.includes(HOME_APPS_FILTER)) {
		appSearchEntries = mapAppEntriesToSearchEntries(apps);
	}

	if (appSearchEntries.length > 0) {
		const finalResults = appSearchEntries.filter((entry) => {
			let textMatchFound = true;
			let filterMatchFound = true;

			const isCommand = queryLower.startsWith("/");

			if (queryLower.length >= queryMinLength || isCommand) {
				textMatchFound = queryAgainst.some((target) => {
					const path = target.split(".");
					if (path.length === 1) {
						const targetValue = entry[path[0]];

						if (typeof targetValue === "string") {
							const lowerTarget = targetValue.toLowerCase();
							if (isCommand) {
								return lowerTarget.startsWith(queryLower);
							}
							return lowerTarget.includes(queryLower);
						}
					} else if (path.length === 2) {
						const specifiedTarget = entry[path[0]];
						let targetValue: string | string[];
						if (specifiedTarget !== undefined && specifiedTarget !== null) {
							targetValue = specifiedTarget[path[1]];
						}

						if (typeof targetValue === "string") {
							const lowerTarget = targetValue.toLowerCase();
							if (isCommand) {
								return lowerTarget.startsWith(queryLower);
							}
							return lowerTarget.includes(queryLower);
						}

						if (Array.isArray(targetValue)) {
							if (
								targetValue.length > 0 &&
								typeof targetValue[0] === "string" &&
								targetValue.some((matchTarget) => matchTarget.toLowerCase().startsWith(queryLower))
							) {
								return true;
							}
							logger.warn(
								`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${specifiedTarget}`
							);
						}
					} else {
						logger.warn(
							"The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings"
						);
					}
					return false;
				});
			}

			const tagFilters = Array.isArray(filters) ? filters.filter((f) => f.id === HOME_TAG_FILTERS) : [];
			if (tagFilters.length > 0) {
				filterMatchFound = tagFilters.some((filter) => {
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

		return {
			results: finalResults,
			context: {
				filters: getSearchFilters(tags.filter(Boolean))
			}
		};
	}
	return {
		results: [],
		context: {
			filters: []
		}
	};
}

function getSearchFilters(tags: string[]): CLIFilter[] {
	if (Array.isArray(tags)) {
		const filters: CLIFilter[] = [];
		const uniqueTags = [...new Set(tags.sort())];
		const tagFilter: CLIFilter = {
			id: HOME_TAG_FILTERS,
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

function mapAppEntriesToSearchEntries(apps: PlatformApp[]): HomeSearchResult[] {
	const appResults: HomeSearchResult[] = [];
	if (Array.isArray(apps)) {
		for (let i = 0; i < apps.length; i++) {
			const action = { name: "Launch View", hotkey: "enter" };
			const entry: Partial<HomeSearchResult> = {
				key: apps[i].appId,
				title: apps[i].title,
				data: apps[i]
			};

			switch (apps[i].manifestType) {
				case manifestTypes.view.id:
				case manifestTypes.inlineView.id: {
					entry.label = manifestTypes.view.label;
					break;
				}
				case manifestTypes.window.id:
				case manifestTypes.inlineWindow.id: {
					entry.label = manifestTypes.window.label;
					break;
				}
				case manifestTypes.desktopBrowser.id: {
					entry.label = manifestTypes.desktopBrowser.label;
					break;
				}
				case manifestTypes.snapshot.id: {
					entry.label = manifestTypes.snapshot.label;
					action.name = "Launch Snapshot";
					break;
				}
				case manifestTypes.manifest.id: {
					entry.label = manifestTypes.manifest.label;
					action.name = "Launch App";
					break;
				}
				case manifestTypes.external.id:
				case manifestTypes.inlineExternal.id: {
					action.name = "Launch Native App";
					entry.label = manifestTypes.external.label;
					break;
				}
				case manifestTypes.endpoint.id: {
					action.name = "Launch";
					entry.label = manifestTypes.endpoint.label;
					break;
				}
				case manifestTypes.connection.id: {
					action.name = "Launch Connected App";
					entry.label = manifestTypes.connection.label;
					break;
				}
			}

			entry.actions = [action];
			entry.icon = getAppIcon(apps[i]);

			if (apps[i].description !== undefined) {
				entry.description = apps[i].description;
				entry.shortDescription = apps[i].description;
				entry.template = CLITemplate.SimpleText;
				entry.templateContent = apps[i].description;
			} else {
				entry.template = CLITemplate.Plain;
			}

			appResults.push(entry as HomeSearchResult);
		}
	}
	return appResults;
}
