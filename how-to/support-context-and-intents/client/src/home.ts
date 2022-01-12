import {
  Home,
  App,
  CLIProvider,
  CLISearchListenerRequest,
  CLIFilter,
  CLISearchResult,
  CLITemplate,
  CLISearchListenerResponse,
  CLISearchResponse,
  CLIDispatchedSearchResult,
  CLIFilterOptionType
} from "@openfin/workspace";
import { Page } from '@openfin/workspace-platform';
import { getSettings } from "./settings";
import { launch } from "./launch";
import { getApps } from "./apps";
import { getPage, getPages, deletePage, launchPage } from "./browser";

const HOME_ACTION_DELETE_PAGE = "Delete Page";
const HOME_ACTION_LAUNCH_PAGE = "Launch Page";

function getSearchFilters(tags: string[]): CLIFilter[] {
  if (Array.isArray(tags)) {
    let filters: CLIFilter[] = [];
    let uniqueTags = [...new Set(tags.sort())];
    let tagFilter: CLIFilter = {
      id: "tags",
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

function mapAppEntriesToSearchEntries(apps: App[]){
  let appResults: CLISearchResult<any>[] = [];
  if (Array.isArray(apps)) {
    for (let i = 0; i < apps.length; i++) {
      let action = { name: "Launch View", hotkey: "enter" };
      let entry: any = {
        key: apps[i].appId,
        title: apps[i].title,
        data: apps[i],
        template:  CLITemplate.Plain,
      };

      if(apps[i].manifestType === "view") {
        entry.label = "View";
        entry.actions = [action];
      }
      if(apps[i].manifestType === "snapshot") {
        entry.label = "Snapshot";
        action.name = "Launch Snapshot";
        entry.actions = [action];
      }
      if(apps[i].manifestType === "manifest") {
        entry.label = "App";
        action.name = "Launch App";
        entry.actions = [action];
      }
      if(apps[i].manifestType === "external") {
        action.name = "Launch Native App";
        entry.actions = [action];
        entry.label = "Native App";
      }

      if(Array.isArray(apps[i].icons) && apps[i].icons.length > 0) {
        entry.icon = apps[i].icons[0].src;
      }

      if (apps[i].description !== undefined) {
        entry.description = apps[i].description;
        entry.shortDescription = apps[i].description;
        entry.template = CLITemplate.SimpleText;
        entry.templateContent = apps[i].description;
      };
        
      appResults.push(entry);
    }
  }
  return appResults;
}

function mapPageEntriesToSearchEntries(pages: Page[]){
  let pageResults: CLISearchResult<any>[] = [];
  if (Array.isArray(pages)) {
    for (let i = 0; i < pages.length; i++) {
      let entry: any = {
        key: pages[i].pageId,
        title: pages[i].title,
        label: "Page",
        actions: [{ name: HOME_ACTION_DELETE_PAGE, hotkey: "CmdOrCtrl+Shift+D"  }, { name: HOME_ACTION_LAUNCH_PAGE, hotkey: "Enter" }],
        data: {tags:["page"], pageId: pages[i].pageId },
        template: CLITemplate.Plain
      };
      
      if (pages[i].description !== undefined) {
        entry.description = pages[i].description;
        entry.shortDescription = pages[i].description;
        entry.template = CLITemplate.SimpleText;
        entry.templateContent = pages[i].description;
      } 

      pageResults.push(entry);
    }
  }
  return pageResults;
}

async function getResults(
  query?: string,
  queryMinLength = 3,
  queryAgainst: string[] = ["title"],
  filters?: CLIFilter[]
): Promise<CLISearchResponse> {
  let apps = await getApps();
  let pages = await getPages();

  let tags = [];
  let appSearchEntries = mapAppEntriesToSearchEntries(apps);
  let pageSearchEntries = mapPageEntriesToSearchEntries(pages);

  let initialResults: CLISearchResult<any>[] = [...appSearchEntries, ...pageSearchEntries];

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

      if (Array.isArray(filters) && filters.length > 0) {
        filterMatchFound = filters.some((filter) => {
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

    let response: CLISearchResponse = {
      results: finalResults,
      context: {
        filters: getSearchFilters(tags),
      },
    };

    return response;
  } else {
    return {
      results: [],
    };
  }
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

  const queryMinLength = settings?.homeProvider?.queryMinLength || 3;
  const queryAgainst = settings?.homeProvider?.queryAgainst;
  let lastResponse:CLISearchListenerResponse;

  const onUserInput = async (
    request: CLISearchListenerRequest,
    response: CLISearchListenerResponse
  ): Promise<CLISearchResponse> => {
    let query = request.query.toLowerCase();
    if (query.indexOf("/") === 0) {
      return { results: [] };
    }

    let filters = request?.context?.selectedFilters;
    if(lastResponse !== undefined) {
      lastResponse.close();
    }
    lastResponse = response;
    lastResponse.open();
    let results = await getResults(query, queryMinLength, queryAgainst, filters);
    return results;
  };

  const onSelection = async (result: CLIDispatchedSearchResult) => {
    if (result.data !== undefined) {
      if(result.data.pageId !== undefined) {
          if(result.action.name === HOME_ACTION_DELETE_PAGE) {
            await deletePage(result.data.pageId);
            if(lastResponse !== undefined && lastResponse !== null) {
              lastResponse.revoke(result.key);
            }
          } else {
            let pageToLaunch = await getPage(result.data.pageId);
            await launchPage(pageToLaunch);
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
  console.log("Home configured.");
}

export async function show() {
  return Home.show();
}

export async function hide() {
  return Home.hide();
}

export async function deregister() {
  let settings = await getSettings();
  return Home.deregister(settings.homeProvider.id);
}
