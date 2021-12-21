import {
  Home,
  CLIProvider,
  CLISearchListenerRequest,
  CLIFilter,
  CLITemplate,
  CLISearchListenerResponse,
  CLISearchResponse,
  CLIDispatchedSearchResult,
  CLIFilterOptionType,
  CLISearchResultPlain,
  CLISearchResultSimpleText,
  CLISearchResultContact,
  Action
} from "@openfin/workspace";
import { getSettings } from "./settings";
import { openUrl } from "./browser";
import { getConnection, getSearchResults, init as connectToSalesforce } from "./salesforce";
import { ConnectionError, getObjectUrl, SalesforceRestApiAccountSObject, SalesforceRestApiContactSObject, SalesforceRestApiSObjectBase } from "@openfin/salesforce";
import { SalesforceResultData } from "./shapes";

const BROWSE_SEARCH_RESULT_KEY = 'browse-salesforce';
const PROVIDER_ID = 'integrate-with-salesforce';
const NOT_CONNECTED_SEARCH_RESULT_KEY = 'not-connected-result';
const OBJECTS_FILTER_ID = 'objects';

async function getSalesforceIconUrl(): Promise<string> {
  const { icon } = await getSettings();
  return icon;
}

function getSearchFilters(objects: string[]): CLIFilter[] {
  if (Array.isArray(objects)) {
    let filters: CLIFilter[] = [];
    let uniqueObjects = [...new Set(objects.sort())];
    let objectFilter: CLIFilter = {
      id: OBJECTS_FILTER_ID,
      title: "Objects",
      type: CLIFilterOptionType.MultiSelect,
      options: [],
    };

    uniqueObjects.forEach((object) => {
      if (Array.isArray(objectFilter.options)) {
        objectFilter.options.push({
          value: object,
          isSelected: false,
        });
      }
    });

    filters.push(objectFilter);
    return filters;
  }
  return [];
}

async function getResults(
  query?: string,
  queryMinLength = 3,
  filters?: CLIFilter[]
): Promise<CLISearchResponse> {
  // Define the default "browse" search result displayed when no query provided
  const salesforceConnection = getConnection();
  const { orgUrl } = salesforceConnection;
  const icon = await getSalesforceIconUrl();
  const browseResult: CLISearchResultPlain = {
    actions: [{ name: 'Browse', hotkey: 'enter' }],
    data: {
      pageUrl: orgUrl,
    } as SalesforceResultData,
    icon,
    key: BROWSE_SEARCH_RESULT_KEY,
    template: CLITemplate.Plain,
    templateContent: undefined,
    title: 'Browse Salesforce',
  };

  // Return default browse result if query less than minimum char length or starts with /
  const searchQuery = query.trim();
  if (searchQuery.length < queryMinLength || /^\//.test(searchQuery)) {
    return { results: [browseResult] };
  }

  // Retrieve search results from Salesforce
  let searchResults: SalesforceRestApiSObjectBase[];
  try {
    let selectedObjects: string[] = [];
    if (Array.isArray(filters) && filters.length > 0) {
      const objectsFilter = filters.find(x => x.id === OBJECTS_FILTER_ID);
      if (objectsFilter) {
        selectedObjects = (Array.isArray(objectsFilter.options) ? objectsFilter.options : [objectsFilter.options])
          .filter(x => !!x.isSelected)
          .map(x => x.value);
      }
    }
    searchResults = await getSearchResults(searchQuery, selectedObjects);
  } catch (err) {
    if (err instanceof ConnectionError) {
      const icon = await getSalesforceIconUrl();
      return {
        results: [
          {
            actions: [{ name: 'Reconnect', hotkey: 'enter' }],
            key: NOT_CONNECTED_SEARCH_RESULT_KEY,
            icon,
            title: 'Reconnect to Salesforce',
          } as CLISearchResultSimpleText,
        ],
      };
    }
    return { results: [] };
  }

  const results = searchResults.map((searchResult) => {
    const data = {
      pageUrl: getObjectUrl(searchResult, salesforceConnection),
    } as SalesforceResultData;
    switch (searchResult.attributes.type) {
      case 'Account': {
        const account = searchResult as SalesforceRestApiAccountSObject;
        return {
          actions: [{ name: 'View', hotkey: 'enter' }],
          label: searchResult.attributes.type,
          key: account.Id,
          title: account.Name,
          data,
          template: CLITemplate.Contact,
          templateContent: {
            name: account.Name,
            title: account.Industry,
            details: [
              [
                ['Phone', account.Phone],
                ['Type', account.Type],
                ['Website', account.Website],
              ],
            ],
          },
        } as CLISearchResultContact;
      }
      case 'Contact': {
        const contact = searchResult as SalesforceRestApiContactSObject;
        return {
          actions: [{ name: 'View', hotkey: 'enter' }],
          label: searchResult.attributes.type,
          key: contact.Id,
          title: contact.Name,
          data,
          template: CLITemplate.Contact,
          templateContent: {
            name: contact.Name,
            title: contact.Title,
            useInitials: true,
            details: [
              [
                ['Department', contact.Department],
                ['Email', contact.Email],
                ['Work #', contact.Phone],
              ],
            ],
          },
        } as CLISearchResultContact;
      }
      default:
        // in this case we are only searching for accounts and contacts
        return undefined;
    }
  });
  const filteredResults = results.filter(Boolean) as CLISearchResultContact<Action>[];
  const objects = searchResults.map(result => result.attributes.type);
  return {
    results: filteredResults,
    context: {
      filters: getSearchFilters(objects),
    },
  };
}

export async function register(): Promise<void> {
  console.log("Initialising home");
  let settings = await getSettings();
  const queryMinLength = settings.queryMinLength || 3;
  let lastResponse: CLISearchListenerResponse;
  let query: string;
  let filters: any;

  const onUserInput = async (
    request: CLISearchListenerRequest,
    response: CLISearchListenerResponse
  ): Promise<CLISearchResponse> => {
    query = request.query.toLowerCase();
    if (query.indexOf("/") === 0) {
      return { results: [] };
    }

    filters = request?.context?.selectedFilters;
    if (lastResponse !== undefined) {
      lastResponse.close();
    }
    lastResponse = response;
    lastResponse.open();
    let results = await getResults(query, queryMinLength, filters);
    return results;
  };

  const onSelection = async (result: CLIDispatchedSearchResult) => {
    // if the user clicked the reconnect result, reconnect to salesforce and re-run query
    if (result.key === NOT_CONNECTED_SEARCH_RESULT_KEY) {
      await connectToSalesforce();
      let results = await getResults(query, queryMinLength, filters);
      lastResponse.revoke(NOT_CONNECTED_SEARCH_RESULT_KEY);
      lastResponse.respond(results.results);
      Home.show();
      return;
    }

    // otherwise open the result page url in browser
    const data = result.data as SalesforceResultData;
    if (data !== undefined) {
      openUrl(data.pageUrl);
    } else {
      console.warn("Unable to execute result without data being passed");
    }
  };

  const cliProvider: CLIProvider = {
    title: settings.title,
    id: PROVIDER_ID,
    icon: settings.icon,
    onUserInput: onUserInput,
    onResultDispatch: onSelection,
  };

  await Home.register(cliProvider);
  console.log("Home configured");
}

export async function show(): Promise<void> {
  return Home.show();
}

export async function hide(): Promise<void> {
  return Home.hide();
}

export async function deregister(): Promise<void> {
  let settings = await getSettings();
  return Home.deregister(PROVIDER_ID);
}
