import {
  HomeDispatchedSearchResult,
  HomeSearchListenerRequest,
  HomeSearchListenerResponse,
  Home, 
  HomeSearchResponse, 
  HomeProvider
} from "@openfin/workspace";
import { getAppSearchEntries, getHelpSearchEntries, getSearchResults, itemSelection } from "./integrations";
import { getSettings } from "./settings";

let isHomeRegistered = false;

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

  let lastResponse: HomeSearchListenerResponse;

  const onUserInput = async (
    request: HomeSearchListenerRequest,
    response: HomeSearchListenerResponse
  ): Promise<HomeSearchResponse> => {
    let query = request.query.toLowerCase();
    if (lastResponse !== undefined) {
      lastResponse.close();
    }
    lastResponse = response;
    lastResponse.open();

    const searchResults: HomeSearchResponse = {
      results: [],
      context: {
        filters: []
      }
    };

    if (query === "?") {
      searchResults.results = searchResults.results.concat(await getHelpSearchEntries());
    } else {
      searchResults.results = searchResults.results.concat(await getAppSearchEntries());

      const integrationResults = await getSearchResults(query, undefined, lastResponse);
      if (Array.isArray(integrationResults.results)) {
        searchResults.results = searchResults.results.concat(integrationResults.results);
      }
      if (Array.isArray(integrationResults.context.filters)) {
        searchResults.context.filters = searchResults.context.filters.concat(integrationResults.context.filters);
      }
    }

    return searchResults;
  };

  const onSelection = async (result: HomeDispatchedSearchResult) => {
    if (result.data !== undefined) {
      const handled = await itemSelection(result, lastResponse);

      if (!handled) {
        console.warn(`Result not handled ${result.key}`, result.data);
      }
    } else {
      console.warn("Unable to execute result without data being passed");
    }
  };

  const cliProvider: HomeProvider = {
    title: settings.homeProvider.title,
    id: settings.homeProvider.id,
    icon: settings.homeProvider.icon,
    onUserInput: onUserInput,
    onResultDispatch: onSelection,
    dispatchFocusEvents: true
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
    console.warn("Unable to deregister home as there is an indication it was never registered");
  }
}

