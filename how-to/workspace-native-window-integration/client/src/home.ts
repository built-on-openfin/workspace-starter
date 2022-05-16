import {
  Home,
  App,
  CLIProvider,
  CLISearchListenerRequest,
  CLIFilter,
  CLITemplate,
  CLISearchListenerResponse,
  CLISearchResponse,
  CLIDispatchedSearchResult,
  CLIFilterOptionType,
  TemplateFragment,
  HomeSearchResponse,
  HomeSearchResult,
} from "@openfin/workspace";
import { getSettings } from "./settings";
import { launch } from "./launch";
import { getApps } from "./apps";
import {
  getWorkspaces,
  deleteWorkspace,
  launchWorkspace,
  saveWorkspace,
} from "./workspace";
import { WorkspaceTemplate } from "./template";

const HOME_ACTION_DELETE_WORKSPACE = "Delete Workspace";
const HOME_ACTION_LAUNCH_WORKSPACE = "Launch Workspace";

const HOME_TAG_FILTERS = "tags";

let isHomeRegistered = false;

function getSearchFilters(tags: string[]): CLIFilter[] {
  if (Array.isArray(tags)) {
    let filters: CLIFilter[] = [];
    let uniqueTags = [...new Set(tags.sort())];
    let tagFilter: CLIFilter = {
      id: HOME_TAG_FILTERS,
      title: "Tags",
      type: CLIFilterOptionType.MultiSelect,
      options: [],
    };

    uniqueTags.forEach((tag) => {
      if (Array.isArray(tagFilter.options)) {
        tagFilter.options.push({
          value: tag,
          isSelected: false,
        });
      }
    });

    filters.push(tagFilter);
    return filters;
  }
  return [];
}

function mapAppEntriesToSearchEntries(apps: App[]): HomeSearchResult[] {
  let appResults: HomeSearchResult[] = [];
  if (Array.isArray(apps)) {
    for (let i = 0; i < apps.length; i++) {
      let action = { name: "Launch View", hotkey: "enter" };
      let entry: any = {
        key: apps[i].appId,
        title: apps[i].title,
        data: apps[i],
        template: CLITemplate.Plain,
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
      }

      appResults.push(entry);
    }
  }
  return appResults;
}

async function mapWorkspaceEntriesToSearchEntries(
  workspaces: {
    id: string;
    title: string;
    description?: string;
    snapshot: any;
  }[]
): Promise<HomeSearchResult[]> {
  let settings = await getSettings();

  let workspaceIcon;
  if (settings?.platformProvider?.rootUrl !== undefined) {
    workspaceIcon = settings.platformProvider.rootUrl + "/icons/workspaces.svg";
  }
  const workspaceTemplate: TemplateFragment = WorkspaceTemplate.template;

  let workspaceResults: HomeSearchResult[] = [];
  if (Array.isArray(workspaces)) {
    for (let i = 0; i < workspaces.length; i++) {
      let entry: any = {
        key: workspaces[i].id,
        title: workspaces[i].title,
        label: "Workspace",
        icon: workspaceIcon,
        actions: [
          { name: HOME_ACTION_DELETE_WORKSPACE, hotkey: "CmdOrCtrl+Shift+D" },
          { name: HOME_ACTION_LAUNCH_WORKSPACE, hotkey: "Enter" },
        ],
        data: { tags: ["workspace"], workspaceId: workspaces[i].id },
        template: CLITemplate.Custom,
        templateContent: {
          layout: workspaceTemplate,
          data: {
            title: workspaces[i].title,
            description: workspaces[i].description,
            instructions:
              "Use the buttons below to interact with your saved Workspace:",
            openText: "Launch",
            deleteText: "Delete"
          },
        },
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
  let apps = await getApps();
  let workspaces = await getWorkspaces();

  let tags = [];
  let appSearchEntries = mapAppEntriesToSearchEntries(apps);
  let workspaceEntries = await mapWorkspaceEntriesToSearchEntries(
    workspaces as any
  );

  let initialResults: HomeSearchResult[] = [
    ...appSearchEntries,
    ...workspaceEntries,
  ];

  if (initialResults.length > 0) {
    let finalResults = initialResults.filter((entry) => {
      let textMatchFound = true;
      let filterMatchFound = true;

      if (
        query !== undefined &&
        query !== null &&
        query.length >= queryMinLength
      ) {
        textMatchFound = queryAgainst.some((target) => {
          let path = target.split(".");
          if (path.length === 1) {
            let targetValue = entry[path[0]];

            if (
              targetValue !== undefined &&
              targetValue !== null &&
              typeof targetValue === "string"
            ) {
              return targetValue.toLowerCase().indexOf(query) > -1;
            }
          } else if (path.length === 2) {
            let target = entry[path[0]];
            let targetValue: string | string[];
            if (target !== undefined && target !== null) {
              targetValue = target[path[1]];
            }

            if (
              targetValue !== undefined &&
              targetValue !== null &&
              typeof targetValue === "string"
            ) {
              return targetValue.toLowerCase().indexOf(query) > -1;
            }

            if (
              targetValue !== undefined &&
              targetValue !== null &&
              Array.isArray(targetValue)
            ) {
              if (
                targetValue.length > 0 &&
                typeof targetValue[0] === "string" &&
                targetValue.some(
                  (target) => target.toLowerCase().indexOf(query) === 0
                )
              ) {
                return true;
              } else {
                console.warn(
                  "Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: " +
                  target
                );
              }
            }
          } else {
            console.warn(
              "The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings."
            );
          }
          return false;
        });
      }

      const tagFilters = Array.isArray(filters) ? filters.filter(f => f.id === HOME_TAG_FILTERS) : [];
      if (tagFilters.length > 0) {
        filterMatchFound = tagFilters.some((filter) => {
          if (Array.isArray(filter.options)) {
            if (entry.data?.tags !== undefined) {
              return filter.options.every((option) => {
                return (
                  !option.isSelected ||
                  entry.data.tags.indexOf(option.value) > -1
                );
              });
            }
          } else if (
            filter.options.isSelected &&
            entry.data?.tags !== undefined
          ) {
            return entry.data?.tags.indexOf(filter.options.value) > -1;
          }
          return true;
        });
      }

      if (textMatchFound && Array.isArray(entry.data?.tags)) {
        tags.push(...entry.data.tags);
      }
      return textMatchFound && filterMatchFound;
    });

    return {
      results: finalResults,
      context: {
        filters: getSearchFilters(tags),
      },
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
  let settings = await getSettings();
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
  let filters;

  const onUserInput = async (
    request: CLISearchListenerRequest,
    response: CLISearchListenerResponse
  ): Promise<CLISearchResponse> => {
    let query = request.query.toLowerCase();
    if (query.indexOf("/") === 0 && query.toLowerCase().indexOf("/w ") !== 0) {
      return { results: [] };
    }

    if (query.toLowerCase().indexOf("/w ") === 0) {
      let workspaces = await getWorkspaces();
      let workspaceText = request.query.replace("/w ", "");
      let parts = workspaceText.split(">");
      let title;
      let description;
      if (parts.length === 1 || parts.length === 2) {
        title = parts[0].trim();
      }
      if (parts.length === 2) {
        description = parts[1].trim();
      }

      let foundMatch = workspaces.find(
        (entry) => entry.title.toLowerCase() === title.toLowerCase()
      );
      if (foundMatch !== undefined && foundMatch !== null) {
        // we have a match
        return {
          results: [
            {
              key: "WORKSPACE-EXISTS",
              title: "Workspace " + foundMatch.title + " already exists.",
              actions: [],
              data: { tags: ["workspace"], workspaceId: foundMatch.id },
            },
          ],
        };
      } else {
        if (lastResponse !== undefined) {
          lastResponse.close();
        }
        lastResponse = response;
        lastResponse.open();
        return {
          results: [
            {
              key: "WORKSPACE-SAVE",
              title: "Save Current Workspace as " + title,
              label: "Suggestion",
              actions: [{ name: "Save Workspace", hotkey: "Enter" }],
              data: {
                tags: ["workspace"],
                workspaceId: crypto["randomUUID"](),
                workspaceTitle: title,
                workspaceDescription: description,
              },
            },
          ],
        };
      }
    }

    filters = request?.context?.selectedFilters;
    if (lastResponse !== undefined) {
      lastResponse.close();
    }
    lastResponse = response;
    lastResponse.open();
    const searchResults = await getResults(
      query,
      queryMinLength,
      queryAgainst,
      filters
    );

    return searchResults;
  };

  const onSelection = async (result: CLIDispatchedSearchResult) => {
    if (result.data !== undefined) {
        if (result.data.workspaceId !== undefined) {
          if (
            result.data.workspaceId !== undefined &&
            result.key === "WORKSPACE-SAVE"
          ) {
            await saveWorkspace(
              result.data.workspaceId,
              result.data.workspaceTitle,
              result.data.workspaceDescription
            );
            if (lastResponse !== undefined && lastResponse !== null) {
              lastResponse.revoke(result.key);
              lastResponse.respond([
                {
                  key: "WORKSPACE-SAVED",
                  title: "Workspace " + result.data.workspaceTitle + " saved.",
                  actions: [],
                  data: {
                    tags: ["workspace"],
                    workspaceId: result.data.workspaceId,
                    workspaceTitle: result.data.workspaceTitle,
                    workspaceDescription: result.data.workspaceDescription,
                  },
                },
              ]);
            }
          } else if (
            result.data.workspaceId !== undefined &&
            result.key === "WORKSPACE-EXISTS"
          ) {
            if (lastResponse !== undefined && lastResponse !== null) {
              lastResponse.revoke(result.key);
            }
          } else if (result.data.workspaceId !== undefined) {
            let workspaceAction = result.action.name;
            if (
              workspaceAction === HOME_ACTION_LAUNCH_WORKSPACE ||
              workspaceAction === WorkspaceTemplate.actions.launch
            ) {
              await launchWorkspace(result.data.workspaceId);
            } else if (
              workspaceAction === HOME_ACTION_DELETE_WORKSPACE ||
              workspaceAction === WorkspaceTemplate.actions.delete
            ) {
              await deleteWorkspace(result.data.workspaceId);
              if (lastResponse !== undefined && lastResponse !== null) {
                lastResponse.revoke(result.key);
              }
            } else {
              console.warn(
                "Unrecognised action for workspace selection: " +
                result.data.workspaceId
              );
            }
          }
        } else {
          await launch(result.data);
        }
      
    } else {
      console.warn("Unable to execute result without data being passed");
    }
  };

  const cliProvider: CLIProvider = {
    title: settings.homeProvider.title,
    id: settings.homeProvider.id,
    icon: settings.homeProvider.icon,
    onUserInput: onUserInput,
    onResultDispatch: onSelection,
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
    let settings = await getSettings();
    return Home.deregister(settings.homeProvider.id);
  } else {
    console.warn(
      "Unable to deregister home as there is an indication it was never registered"
    );
  }
}
