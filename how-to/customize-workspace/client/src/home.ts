import {
	App,
	CLIDispatchedSearchResult,
	CLIFilter,
	CLIFilterOptionType,
	CLIProvider,
	CLISearchListenerRequest,
	CLISearchListenerResponse,
	CLISearchResponse,
	CLITemplate,
	Home,
	HomeSearchResponse,
	HomeSearchResult,
	TemplateFragment
} from "@openfin/workspace";
import { getCurrentSync, Page, Workspace } from "@openfin/workspace-platform";
import { getApps } from "./apps";
import { deletePage, getPage, getPageBounds, getPages, launchPage } from "./browser";
import { getAppSearchEntries, getSearchResults, itemSelection } from "./integrations";
import { launch } from "./launch";
import { getSettings } from "./settings";
import { share } from "./share";
import { CURRENT_WORKSPACE_TEMPLATE, PAGE_TEMPLATE, WORKSPACE_TEMPLATE } from "./template";
import { deleteWorkspace, getWorkspaces, launchWorkspace, saveWorkspace } from "./workspace";

const HOME_ACTION_DELETE_PAGE = "Delete Page";
const HOME_ACTION_LAUNCH_PAGE = "Launch Page";
const HOME_ACTION_SHARE_PAGE = "Share Page";
const HOME_ACTION_DELETE_WORKSPACE = "Delete Workspace";
const HOME_ACTION_LAUNCH_WORKSPACE = "Launch Workspace";
const HOME_ACTION_SHARE_WORKSPACE = "Share Workspace";

const HOME_TAG_FILTERS = "tags";

let isHomeRegistered = false;

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

			if (apps[i].manifestType === "view" || apps[i].manifestType === "inline-view") {
				entry.label = "View";
				entry.actions = [action];
			}
			if (apps[i].manifestType === "snapshot") {
				entry.label = "Snapshot";
				action.name = "Launch Snapshot";
				entry.actions = [action];
			}
			if (apps[i].manifestType === "manifest") {
				entry.label = "App";
				action.name = "Launch App";
				entry.actions = [action];
			}
			if (apps[i].manifestType === "external") {
				action.name = "Launch Native App";
				entry.actions = [action];
				entry.label = "Native App";
			}

			if (Array.isArray(apps[i].icons) && apps[i].icons.length > 0) {
				entry.icon = apps[i].icons[0].src;
			}

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
		pageIcon = `${settings.platformProvider.rootUrl}/icons/page.svg`;
	}
	const pageTemplate: TemplateFragment = PAGE_TEMPLATE.template;

	if (Array.isArray(pages)) {
		for (let i = 0; i < pages.length; i++) {
			const entry: HomeSearchResult = {
				key: pages[i].pageId,
				title: pages[i].title,
				label: "Page",
				icon: pageIcon,
				actions: [
					{ name: HOME_ACTION_SHARE_PAGE, hotkey: "CmdOrCtrl+Shift+S" },
					{ name: HOME_ACTION_DELETE_PAGE, hotkey: "CmdOrCtrl+Shift+D" },
					{ name: HOME_ACTION_LAUNCH_PAGE, hotkey: "Enter" }
				],
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
		workspaceIcon = `${settings.platformProvider.rootUrl}/icons/workspaces.svg`;
	}
	const workspaceTemplate: TemplateFragment = WORKSPACE_TEMPLATE.template;
	const currentWorkspaceTemplate: TemplateFragment = CURRENT_WORKSPACE_TEMPLATE.template;

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
					: [
							{
								name: HOME_ACTION_SHARE_WORKSPACE,
								hotkey: "CmdOrCtrl+Shift+S"
							},
							{
								name: HOME_ACTION_DELETE_WORKSPACE,
								hotkey: "CmdOrCtrl+Shift+D"
							},
							{ name: HOME_ACTION_LAUNCH_WORKSPACE, hotkey: "Enter" }
					  ];
			const layout =
				currentWorkspaceId === workspaces[i].workspaceId ? currentWorkspaceTemplate : workspaceTemplate;
			const instructions =
				currentWorkspaceId === workspaces[i].workspaceId
					? "This is the currently active workspace. You can use the Browser menu to update/rename this workspace."
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
	query: string,
	queryMinLength,
	queryAgainst: string[],
	filters: CLIFilter[]
): Promise<HomeSearchResponse> {
	const apps = await getApps();
	const pages = await getPages();
	const workspaces = await getWorkspaces();

	const tags: string[] = [];
	const appSearchEntries = mapAppEntriesToSearchEntries(apps).concat(await getAppSearchEntries());
	const pageSearchEntries = await mapPageEntriesToSearchEntries(pages);
	const workspaceEntries = await mapWorkspaceEntriesToSearchEntries(workspaces);

	const initialResults: HomeSearchResult[] = [...appSearchEntries, ...pageSearchEntries, ...workspaceEntries];

	if (initialResults.length > 0) {
		const finalResults = initialResults.filter((entry) => {
			let textMatchFound = true;
			let filterMatchFound = true;

			if (query !== undefined && query !== null && query.length >= queryMinLength) {
				textMatchFound = queryAgainst.some((target) => {
					const path = target.split(".");
					if (path.length === 1) {
						const targetValue = entry[path[0]];

						if (targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
							return targetValue.toLowerCase().includes(query);
						}
					} else if (path.length === 2) {
						const specifiedTarget = entry[path[0]];
						let targetValue: string | string[];
						if (specifiedTarget !== undefined && specifiedTarget !== null) {
							targetValue = specifiedTarget[path[1]];
						}

						if (targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
							return targetValue.toLowerCase().includes(query);
						}

						if (targetValue !== undefined && targetValue !== null && Array.isArray(targetValue)) {
							if (
								targetValue.length > 0 &&
								typeof targetValue[0] === "string" &&
								targetValue.some((matchTarget) => matchTarget.toLowerCase().startsWith(query))
							) {
								return true;
							}
							console.warn(
								`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${specifiedTarget}`
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
				filters: getSearchFilters(tags)
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

export async function register() {
	console.log("Initialising home.");
	const settings = await getSettings();
	if (
		settings.homeProvider === undefined ||
		settings.homeProvider.id === undefined ||
		settings.homeProvider.title === undefined
	) {
		console.warn(
			"homeProvider: not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
		);
		return;
	}

	const queryMinLength = settings?.homeProvider?.queryMinLength ?? 3;
	const queryAgainst = settings?.homeProvider?.queryAgainst ?? ["title"];
	let lastResponse: CLISearchListenerResponse;
	let filters: CLIFilter[];

	const onUserInput = async (
		request: CLISearchListenerRequest,
		response: CLISearchListenerResponse
	): Promise<CLISearchResponse> => {
		const query = request.query.toLowerCase();
		if (query.startsWith("/") && !query.toLowerCase().startsWith("/w ")) {
			return { results: [] };
		}

		if (query.toLowerCase().startsWith("/w ")) {
			const workspaces = await getWorkspaces();
			const title = request.query.replace("/w ", "");

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
		const searchResults = await getResults(query, queryMinLength, queryAgainst, filters);

		const integrationResults = await getSearchResults(query, filters, lastResponse);
		if (Array.isArray(integrationResults.results)) {
			searchResults.results = searchResults.results.concat(integrationResults.results);
		}
		if (Array.isArray(integrationResults.context.filters)) {
			searchResults.context.filters = searchResults.context.filters.concat(
				integrationResults.context.filters
			);
		}

		return searchResults;
	};

	const onSelection = async (result: CLIDispatchedSearchResult) => {
		if (result.data !== undefined) {
			const handled = await itemSelection(result, lastResponse);

			if (!handled) {
				const data: {
					workspaceId?: string;
					workspaceTitle?: string;
					workspaceDescription?: string;
					pageId?: string;
				} & App = result.data;
				if (data.workspaceId !== undefined) {
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
							workspaceAction === WORKSPACE_TEMPLATE.actions.launch
						) {
							await launchWorkspace(data.workspaceId);
						} else if (
							workspaceAction === HOME_ACTION_DELETE_WORKSPACE ||
							workspaceAction === WORKSPACE_TEMPLATE.actions.delete
						) {
							await deleteWorkspace(data.workspaceId);
							if (lastResponse !== undefined && lastResponse !== null) {
								lastResponse.revoke(result.key);
							}
						} else if (
							workspaceAction === HOME_ACTION_SHARE_WORKSPACE ||
							workspaceAction === WORKSPACE_TEMPLATE.actions.share
						) {
							await share({ workspaceId: data.workspaceId });
						} else {
							console.warn(`Unrecognised action for workspace selection: ${data.workspaceId}`);
						}
					}
				} else if (data.pageId !== undefined) {
					const pageAction = result.action.name;
					if (pageAction === HOME_ACTION_LAUNCH_PAGE || pageAction === PAGE_TEMPLATE.actions.launch) {
						const pageToLaunch = await getPage(data.pageId);
						await launchPage(pageToLaunch);
					} else if (pageAction === HOME_ACTION_DELETE_PAGE || pageAction === PAGE_TEMPLATE.actions.delete) {
						await deletePage(data.pageId);
						if (lastResponse !== undefined && lastResponse !== null) {
							lastResponse.revoke(result.key);
						}
					} else if (pageAction === HOME_ACTION_SHARE_PAGE || pageAction === PAGE_TEMPLATE.actions.share) {
						const page = await getPage(data.pageId);
						const bounds = await getPageBounds(data.pageId, true);
						await share({ page, bounds });
					} else {
						console.warn(`Unknown action triggered on search result for page Id: ${data.pageId}`);
					}
				} else {
					await launch(data);
				}
			}
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	const cliProvider: CLIProvider = {
		title: settings.homeProvider.title,
		id: settings.homeProvider.id,
		icon: settings.homeProvider.icon,
		onUserInput,
		onResultDispatch: onSelection
	};

	await Home.register(cliProvider);
	isHomeRegistered = true;
	console.log("Home configured.");
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
	console.warn("Unable to deregister home as there is an indication it was never registered");
}
