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
import { BrowserSnapshot } from "@openfin/workspace-platform";
import { getApps } from "./apps";
import { launch } from "./launch";
import { getSettings } from "./settings";
import { WORKSPACE_TEMPLATE } from "./template";
import { deleteWorkspace, getWorkspaces, launchWorkspace, saveWorkspace } from "./workspace";

const HOME_ACTION_DELETE_WORKSPACE = "Delete Workspace";
const HOME_ACTION_LAUNCH_WORKSPACE = "Launch Workspace";

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

      if (apps[i].manifestType === "view") {
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

async function mapWorkspaceEntriesToSearchEntries(
  workspaces: {
    id: string;
    title: string;
    description?: string;
    snapshot: BrowserSnapshot;
  }[]
): Promise<HomeSearchResult[]> {
  const settings = await getSettings();

  let workspaceIcon;
  if (settings?.platformProvider?.rootUrl !== undefined) {
    workspaceIcon = `${settings.platformProvider.rootUrl}/icons/workspaces.svg`;
  }
  const workspaceTemplate: TemplateFragment = WORKSPACE_TEMPLATE.template;

  const workspaceResults: HomeSearchResult[] = [];
  if (Array.isArray(workspaces)) {
    for (let i = 0; i < workspaces.length; i++) {
      const entry: HomeSearchResult = {
        key: workspaces[i].id,
        title: workspaces[i].title,
        label: "Workspace",
        icon: workspaceIcon,
        actions: [
          { name: HOME_ACTION_DELETE_WORKSPACE, hotkey: "CmdOrCtrl+Shift+D" },
          { name: HOME_ACTION_LAUNCH_WORKSPACE, hotkey: "Enter" }
        ],
        data: { tags: ["workspace"], workspaceId: workspaces[i].id },
        template: CLITemplate.Custom,
        templateContent: {
          layout: workspaceTemplate,
          data: {
            title: workspaces[i].title,
            description: workspaces[i].description,
            instructions: "Use the buttons below to interact with your saved Workspace:",
            openText: "Launch",
            deleteText: "Delete"
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
  const workspaces = await getWorkspaces();

  const tags: string[] = [];
  const appSearchEntries = mapAppEntriesToSearchEntries(apps);
  const workspaceEntries = await mapWorkspaceEntriesToSearchEntries(workspaces);

  const initialResults: HomeSearchResult[] = [...appSearchEntries, ...workspaceEntries];

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
            const targetEntry = entry[path[0]];
            let targetValue: string | string[];
            if (targetEntry !== undefined && targetEntry !== null) {
              targetValue = targetEntry[path[1]];
            }

            if (targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
              return targetValue.toLowerCase().includes(query);
            }

            if (targetValue !== undefined && targetValue !== null && Array.isArray(targetValue)) {
              if (
                targetValue.length > 0 &&
                typeof targetValue[0] === "string" &&
                targetValue.some((target2) => target2.toLowerCase().startsWith(query))
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

      const tagFilters = Array.isArray(filters) ? filters.filter((f) => f.id === HOME_TAG_FILTERS) : [];
      if (tagFilters.length > 0) {
        filterMatchFound = tagFilters.some((filter) => {
          if (Array.isArray(filter.options)) {
            if (entry.data?.tags !== undefined) {
              return filter.options.every((option) => !option.isSelected || entry.data.tags.includes(option.value));
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
      const workspaceText = request.query.replace("/w ", "");
      const parts = workspaceText.split(">");
      let title;
      let description;
      if (parts.length === 1 || parts.length === 2) {
        title = parts[0].trim();
      }
      if (parts.length === 2) {
        description = parts[1].trim();
      }

      const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
      if (foundMatch !== undefined && foundMatch !== null) {
        // we have a match
        return {
          results: [
            {
              key: "WORKSPACE-EXISTS",
              title: `Workspace ${foundMatch.title} already exists.`,
              actions: [],
              data: { tags: ["workspace"], workspaceId: foundMatch.id }
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
              workspaceTitle: title,
              workspaceDescription: description
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

    return searchResults;
  };

  const onSelection = async (result: CLIDispatchedSearchResult) => {
    if (result.data !== undefined) {
      const data: {
        workspaceId?: string;
        workspaceTitle?: string;
        workspaceDescription?: string;
      } & App = result.data;

      if (data.workspaceId !== undefined) {
        if (data.workspaceId !== undefined && result.key === "WORKSPACE-SAVE") {
          await saveWorkspace(data.workspaceId, data.workspaceTitle, data.workspaceDescription);
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
          } else {
            console.warn(`Unrecognised action for workspace selection: ${data.workspaceId}`);
          }
        }
      } else {
        await launch(data);
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
