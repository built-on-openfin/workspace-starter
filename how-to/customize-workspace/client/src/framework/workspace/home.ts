import {
	App,
	CLIFilter,
	CLIFilterOptionType,
	CLIProvider,
	CLISearchListenerRequest,
	CLISearchListenerResponse,
	CLISearchResponse,
	CLITemplate,
	Home,
	HomeDispatchedSearchResult,
	HomeSearchResponse,
	HomeSearchResult,
	RegistrationMetaInfo
} from "@openfin/workspace";
import { getCurrentSync, Page, Workspace } from "@openfin/workspace-platform";
import { getAppIcon, getApps } from "../apps";
import { getHelpSearchEntries, getSearchResults, itemSelection } from "../integrations";
import { launch } from "../launch";
import { createLogger } from "../logger-provider";
import { manifestTypes } from "../manifest-types";
import { getPageBounds, launchPage } from "../platform/browser";
import { getSettings } from "../settings";
import { isShareEnabled, share } from "../share";
import {
	getCurrentWorkspaceTemplate,
	getPageTemplate,
	getWorkspaceTemplate,
	PAGE_ACTION_IDS,
	WORKSPACE_ACTION_IDS
} from "../template";
import { getCurrentColorSchemeMode } from "../themes";
import { deleteWorkspace, getWorkspaces, launchWorkspace, saveWorkspace } from "../workspace";

const logger = createLogger("Home");

const HOME_ACTION_DELETE_PAGE = "Delete Page";
const HOME_ACTION_LAUNCH_PAGE = "Launch Page";
const HOME_ACTION_SHARE_PAGE = "Share Page";
const HOME_ACTION_DELETE_WORKSPACE = "Delete Workspace";
const HOME_ACTION_LAUNCH_WORKSPACE = "Launch Workspace";
const HOME_ACTION_SHARE_WORKSPACE = "Share Workspace";

const HOME_TAG_FILTERS = "tags";

let isHomeRegistered = false;
let registrationInfo: RegistrationMetaInfo;
let enablePageIntegration: boolean = true;
let enableWorkspaceIntegration: boolean = true;

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

function mapAppEntriesToSearchEntries(apps: App[]): HomeSearchResult[] {
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

async function mapPageEntriesToSearchEntries(pages: Page[]): Promise<HomeSearchResult[]> {
	const pageResults: HomeSearchResult[] = [];
	const settings = await getSettings();
	let pageIcon;
	if (settings?.platformProvider?.rootUrl !== undefined) {
		const colorScheme = await getCurrentColorSchemeMode();
		pageIcon = `${settings.platformProvider.rootUrl}/common/icons/${colorScheme}/page.svg`;
	}
	const shareEnabled = isShareEnabled();
	const pageTemplate = getPageTemplate(shareEnabled);

	if (Array.isArray(pages)) {
		for (let i = 0; i < pages.length; i++) {
			const entry: HomeSearchResult = {
				key: pages[i].pageId,
				title: pages[i].title,
				label: "Page",
				icon: pageIcon,
				actions: (shareEnabled ? [{ name: HOME_ACTION_SHARE_PAGE, hotkey: "CmdOrCtrl+Shift+S" }] : []).concat(
					[
						{ name: HOME_ACTION_DELETE_PAGE, hotkey: "CmdOrCtrl+Shift+D" },
						{ name: HOME_ACTION_LAUNCH_PAGE, hotkey: "Enter" }
					]
				),
				data: { tags: ["page"], pageId: pages[i].pageId },
				template: CLITemplate.Custom,
				templateContent: {
					layout: pageTemplate,
					data: {
						title: pages[i].title,
						description: pages[i].description,
						instructions: "Use the buttons below to interact with your saved page:",
						openText: "Launch",
						deleteText: "Delete",
						shareText: "Share"
					}
				}
			};

			pageResults.push(entry);
		}
	}
	return pageResults;
}

async function mapWorkspaceEntriesToSearchEntries(workspaces: Workspace[]): Promise<HomeSearchResult[]> {
	const settings = await getSettings();

	let workspaceIcon;
	if (settings?.platformProvider?.rootUrl !== undefined) {
		const colorScheme = await getCurrentColorSchemeMode();
		workspaceIcon = `${settings.platformProvider.rootUrl}/common/icons/${colorScheme}/workspaces.svg`;
	}
	const shareEnabled = isShareEnabled();
	const workspaceTemplate = getWorkspaceTemplate(shareEnabled);

	const currentWorkspaceTemplate = getCurrentWorkspaceTemplate();

	const workspaceResults: HomeSearchResult[] = [];
	if (Array.isArray(workspaces)) {
		const platform = getCurrentSync();
		const currentWorkspace = await platform.getCurrentWorkspace();
		const currentWorkspaceId = currentWorkspace?.workspaceId;

		for (let i = 0; i < workspaces.length; i++) {
			const entryWorkspaceId = workspaces[i].workspaceId;
			const actions =
				entryWorkspaceId === currentWorkspaceId
					? []
					: (shareEnabled
							? [
									{
										name: HOME_ACTION_SHARE_WORKSPACE,
										hotkey: "CmdOrCtrl+Shift+S"
									}
							  ]
							: []
					  ).concat([
							{
								name: HOME_ACTION_DELETE_WORKSPACE,
								hotkey: "CmdOrCtrl+Shift+D"
							},
							{ name: HOME_ACTION_LAUNCH_WORKSPACE, hotkey: "Enter" }
					  ]);
			const layout =
				currentWorkspaceId === workspaces[i].workspaceId ? currentWorkspaceTemplate : workspaceTemplate;
			const instructions =
				currentWorkspaceId === workspaces[i].workspaceId
					? "This is the currently active workspace. You can use the Browser menu to update/rename this workspace"
					: "Use the buttons below to interact with your saved Workspace:";
			const entry: HomeSearchResult = {
				key: entryWorkspaceId,
				title: workspaces[i].title,
				label: "Workspace",
				icon: workspaceIcon,
				actions,
				data: { tags: ["workspace"], workspaceId: entryWorkspaceId },
				template: CLITemplate.Custom,
				templateContent: {
					layout,
					data: {
						title: workspaces[i].title,
						instructions,
						openText: "Launch",
						deleteText: "Delete",
						shareText: "Share"
					}
				}
			};

			workspaceResults.push(entry);
		}
	}
	return workspaceResults;
}

async function getResults(
	queryLower: string,
	queryMinLength,
	queryAgainst: string[],
	filters: CLIFilter[]
): Promise<HomeSearchResponse> {
	const platform = getCurrentSync();
	const apps = await getApps();
	let pageSearchEntries = [];
	let workspaceSearchEntries = [];

	if (enablePageIntegration) {
		const pages = await platform.Storage.getPages();
		pageSearchEntries = await mapPageEntriesToSearchEntries(pages);
	}

	if (enableWorkspaceIntegration) {
		const workspaces = await getWorkspaces();
		workspaceSearchEntries = await mapWorkspaceEntriesToSearchEntries(workspaces);
	}

	const tags: string[] = [];
	const appSearchEntries = mapAppEntriesToSearchEntries(apps);

	const initialResults: HomeSearchResult[] = [
		...appSearchEntries,
		...pageSearchEntries,
		...workspaceSearchEntries
	];

	if (initialResults.length > 0) {
		const finalResults = initialResults.filter((entry) => {
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

export async function register(): Promise<RegistrationMetaInfo> {
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

	const queryMinLength = settings?.homeProvider?.queryMinLength ?? 3;
	const queryAgainst = settings?.homeProvider?.queryAgainst ?? ["title"];
	enablePageIntegration = settings?.homeProvider?.enablePageIntegration ?? true;
	enableWorkspaceIntegration = settings?.homeProvider?.enableWorkspaceIntegration ?? true;
	let lastResponse: CLISearchListenerResponse;
	let filters: CLIFilter[];

	const onUserInput = async (
		request: CLISearchListenerRequest,
		response: CLISearchListenerResponse
	): Promise<CLISearchResponse> => {
		try {
			const queryLower = request.query.toLowerCase();

			if (enableWorkspaceIntegration && queryLower.startsWith("/w ")) {
				const workspaces = await getWorkspaces();
				const title = queryLower.replace("/w ", "");

				const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
				if (foundMatch !== undefined && foundMatch !== null) {
					// we have a match
					return {
						results: [
							{
								key: "WORKSPACE-EXISTS",
								title: `Workspace ${foundMatch.title} already exists.`,
								actions: [],
								data: {
									tags: ["workspace"],
									workspaceId: foundMatch.workspaceId
								}
							}
						]
					};
				}
				if (lastResponse !== undefined) {
					lastResponse.close();
				}
				lastResponse = response;
				lastResponse.open();
				return {
					results: [
						{
							key: "WORKSPACE-SAVE",
							title: `Save Current Workspace as ${title}`,
							label: "Suggestion",
							actions: [{ name: "Save Workspace", hotkey: "Enter" }],
							data: {
								tags: ["workspace"],
								workspaceId: crypto.randomUUID(),
								workspaceTitle: title
							}
						}
					]
				};
			}

			filters = request?.context?.selectedFilters;
			if (lastResponse !== undefined) {
				lastResponse.close();
			}
			lastResponse = response;
			lastResponse.open();

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

			const searchResults = await getResults(queryLower, queryMinLength, queryAgainst, filters);
			const integrationResults = await getSearchResults(request.query, filters, lastResponse);
			if (Array.isArray(integrationResults.results) && integrationResults.results.length > 0) {
				searchResults.results = searchResults.results.concat(integrationResults.results);
			}
			if (
				Array.isArray(integrationResults.context.filters) &&
				integrationResults.context.filters.length > 0
			) {
				searchResults.context.filters = searchResults.context.filters.concat(
					integrationResults.context.filters
				);
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
	};

	const onSelection = async (result: HomeDispatchedSearchResult) => {
		if (result.data !== undefined) {
			const handled = await itemSelection(result, lastResponse);

			if (!handled && result.action.trigger === "user-action") {
				const data: {
					workspaceId?: string;
					workspaceTitle?: string;
					workspaceDescription?: string;
					pageId?: string;
				} & App = result.data;
				if (enableWorkspaceIntegration && data.workspaceId !== undefined) {
					if (data.workspaceId !== undefined && result.key === "WORKSPACE-SAVE") {
						await saveWorkspace(data.workspaceId, data.workspaceTitle);
						if (lastResponse !== undefined && lastResponse !== null) {
							lastResponse.revoke(result.key);
							lastResponse.respond([
								{
									key: "WORKSPACE-SAVED",
									title: `Workspace ${data.workspaceTitle} saved.`,
									actions: [],
									data: {
										tags: ["workspace"],
										workspaceId: data.workspaceId,
										workspaceTitle: data.workspaceTitle,
										workspaceDescription: data.workspaceDescription
									}
								}
							]);
						}
					} else if (data.workspaceId !== undefined && result.key === "WORKSPACE-EXISTS") {
						if (lastResponse !== undefined && lastResponse !== null) {
							lastResponse.revoke(result.key);
						}
					} else if (data.workspaceId !== undefined) {
						const workspaceAction = result.action.name;
						if (
							workspaceAction === HOME_ACTION_LAUNCH_WORKSPACE ||
							workspaceAction === WORKSPACE_ACTION_IDS.launch
						) {
							await launchWorkspace(data.workspaceId);
						} else if (
							workspaceAction === HOME_ACTION_DELETE_WORKSPACE ||
							workspaceAction === WORKSPACE_ACTION_IDS.delete
						) {
							await deleteWorkspace(data.workspaceId);
							if (lastResponse !== undefined && lastResponse !== null) {
								lastResponse.revoke(result.key);
							}
						} else if (
							workspaceAction === HOME_ACTION_SHARE_WORKSPACE ||
							workspaceAction === WORKSPACE_ACTION_IDS.share
						) {
							await share({ workspaceId: data.workspaceId });
						} else {
							logger.warn(`Unrecognized action for workspace selection: ${data.workspaceId}`);
						}
					}
				} else if (enablePageIntegration && data.pageId !== undefined) {
					const pageAction = result.action.name;
					if (pageAction === HOME_ACTION_LAUNCH_PAGE || pageAction === PAGE_ACTION_IDS.launch) {
						const platform = getCurrentSync();
						const pageToLaunch = await platform.Storage.getPage(data.pageId);
						await launchPage(pageToLaunch);
					} else if (pageAction === HOME_ACTION_DELETE_PAGE || pageAction === PAGE_ACTION_IDS.delete) {
						const platform = getCurrentSync();
						await platform.Storage.deletePage(data.pageId);
						if (lastResponse !== undefined && lastResponse !== null) {
							lastResponse.revoke(result.key);
						}
					} else if (pageAction === HOME_ACTION_SHARE_PAGE || pageAction === PAGE_ACTION_IDS.share) {
						const platform = getCurrentSync();
						const page = await platform.Storage.getPage(data.pageId);
						const bounds = await getPageBounds(data.pageId, true);
						await share({ page, bounds });
					} else {
						logger.warn(`Unknown action triggered on search result for page Id: ${data.pageId}`);
					}
				} else {
					await launch(data);
				}
			}
		} else {
			logger.warn("Unable to execute result without data being passed");
		}
	};

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
	isHomeRegistered = true;
	logger.info("Home provider initialized");
	return registrationInfo;
}

export async function show() {
	return Home.show();
}

export async function hide() {
	return Home.hide();
}

export async function deregister() {
	if (isHomeRegistered) {
		const settings = await getSettings();
		return Home.deregister(settings.homeProvider.id);
	}
	logger.warn("Unable to deregister home as there is an indication it was never registered");
}
