import {
  Home,
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
import { getSettings } from "./settings";
import { launch } from "./launch";
import { getApps } from "./apps";

function getSearchFilters(tags: string[]): CLIFilter[] {
  if (Array.isArray(tags)) {
    let filters: CLIFilter[] = [];
    let uniqueTags = [...new Set(tags.sort())];
    let tagFilter: CLIFilter = {
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

async function getResults(
  query?: string,
  queryMinLength = 3,
  queryAgainst: string[] = ["title"],
  filters?: CLIFilter[]
): Promise<CLISearchResponse> {
  let apps = await getApps();
  let tags = [];

  if (Array.isArray(apps)) {
    let initialResults: CLISearchResult<any>[] = [];

    for (let i = 0; i < apps.length; i++) {
      if (apps[i].description !== undefined) {
        let entry: any = {
          key: apps[i].appId,
          title: apps[i].title,
          actions: [{ name: "launch-app", hotkey: "enter" }],
          data: apps[i],
          description: apps[i].description,
          shortDescription: apps[i].description,
          template: CLITemplate.SimpleText,
          templateContent: apps[i].description,
        };
        initialResults.push(entry);
      } else {
        let entry: any = {
          key: apps[i].appId,
          title: apps[i].title,
          actions: [{ name: "launch-app", hotkey: "enter" }],
          data: apps[i],
          template:  CLITemplate.Plain,
        };
        initialResults.push(entry);
      }
    }

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

  const onUserInput = async (
    request: CLISearchListenerRequest,
    response: CLISearchListenerResponse
  ): Promise<CLISearchResponse> => {
    let query = request.query.toLowerCase();
    if (query.indexOf("/") === 0) {
      return { results: [] };
    }

    let filters = request?.context?.selectedFilters;

    return getResults(query, queryMinLength, queryAgainst, filters);
  };

  const onSelection = async (result: CLIDispatchedSearchResult) => {
    if (result.data !== undefined) {
      await launch(result.data);
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
