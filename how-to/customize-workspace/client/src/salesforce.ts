import {
  connect,
  ConnectionError,
  enableLogging,
  SalesforceConnection,
  SalesforceRestApiSearchResponse,
  SalesforceRestApiSObject,
} from "@openfin/salesforce";
import {
  Action,
  CLIDispatchedSearchResult,
  CLIFilter,
  CLIFilterOptionType,
  CLISearchListenerResponse,
  CLISearchResponse,
  CLISearchResultContact,
  CLISearchResultList,
  CLISearchResultPlain,
  CLISearchResultSimpleText,
  CLITemplate,
  Home,
} from "@openfin/workspace";
import { launchView } from "./browser";
import { Integration } from "./shapes";
import { getSettings } from "./settings";

const BROWSE_SEARCH_RESULT_KEY = "browse-salesforce";
const OBJECTS_FILTER_ID = "salesforce-objects";
const NOT_CONNECTED_SEARCH_RESULT_KEY = "salesforce-not-connected-result";

let salesforceConnection: SalesforceConnection;

export const providerId = "salesforce";

export type SalesforceBatchRequest = {
  batchRequests: SalesforceBatchRequestItem[];
  haltOnError: boolean;
};

export type SalesforceBatchRequestItem = {
  method: string;
  url: string;
};

export type SalesforceBatchResponse = {
  hasErrors: boolean;
  results: SalesforceBatchResponseItem[];
};

export type SalesforceBatchResponseItem = {
  statusCode: number;
  result: unknown;
};

export type SalesforceAccount = SalesforceRestApiSObject<{
  Industry?: string;
  Name: string;
  Phone?: string;
  Type?: string;
  Website?: string;
}>;

export type SalesforceContact = SalesforceRestApiSObject<{
  Department?: string;
  Email: string;
  Name: string;
  Phone?: string;
  Title?: string;
}>;

export type SalesforceTask = SalesforceRestApiSObject<{
  Subject?: string;
  Description?: string;
}>;

export type SalesforceContentNote = SalesforceRestApiSObject<{
  Title?: string;
  TextPreview?: string;
}>;

export type SalesforceActor = {
  id: string;
  url: string;
  type: string;
  companyName: string;
  displayName: string;
  name: string;
};

export type SalesforceTextArea = {
  isRichText: boolean;
  text: string;
};

export type SalesforceFeedItem = {
  id: string;
  url: string;
  type: string;
  actor?: SalesforceActor;
  body?: SalesforceTextArea;
  header?: SalesforceTextArea;
};

export type SalesforceFeedElementPage = {
  currentPageToken: string;
  currentPageUrl: string;
  elements: SalesforceFeedItem[];
  isModifiedToken: string;
  isModifiedUrl: string;
  nextPageUrl: string;
  updatesToken: string;
  updatesUrl: string;
};

export interface SalesforceResultData {
  providerId: string;
  pageUrl: string;
}

export interface SalesforceSettings {
  consumerKey: string;
  isSandbox: boolean;
  orgUrl: string;
  iconMap: {
    [id: string]: string;
  };
}

export async function salesForceConnect(
  settings?: SalesforceSettings
): Promise<void> {
  if (!salesforceConnection && settings) {
    try {
      enableLogging();
      salesforceConnection = await connect(
        settings.orgUrl,
        settings.consumerKey,
        settings.isSandbox
      );
    } catch (err) {
      console.error("Error connecting to Salesforce", err);
    }
  }
}

export function closeConnection(): void {
  salesforceConnection = undefined;
}

export const getObjectUrl = (
  objectId: string,
  salesforceOrgOrigin: string
): string => {
  return `${salesforceOrgOrigin}/${objectId}`;
};

export async function getSearchResults(
  query: string,
  selectedObjects?: string[]
): Promise<
  (
    | SalesforceContact
    | SalesforceAccount
    | SalesforceTask
    | SalesforceContentNote
    | SalesforceFeedItem
  )[]
> {
  const accountFieldSpec = "Account(Id, Industry, Name, Phone, Type, Website)";
  const contactFieldSpec = "Contact(Department, Email, Id, Name, Phone, Title)";
  const taskFieldSpec = "Task(Id, Subject, Description)";
  const contentNoteFieldSpec = "ContentNote(Id, Title, Content, TextPreview)";
  const fieldSpecMap = new Map<string, string>([
    ["Account", accountFieldSpec],
    ["Contact", contactFieldSpec],
    ["Task", taskFieldSpec],
    ["ContentNote", contentNoteFieldSpec],
  ]);
  let fieldSpec = [...fieldSpecMap]
    .filter((x) => {
      if (selectedObjects?.length > 0) {
        return selectedObjects.includes(x[0]);
      }
      return true;
    })
    .map((x) => x[1])
    .join(", ");

  const batch: SalesforceBatchRequestItem[] = [];

  if (fieldSpec.length > 0) {
    const salesforceSearchQuery = `FIND {${escapeQuery(
      query
    )}} IN ALL FIELDS RETURNING ${fieldSpec} LIMIT 25`;

    batch.push({
      method: "GET",
      url: `/services/data/vXX.X/search?q=${encodeURIComponent(
        salesforceSearchQuery
      )}`,
    });
  }

  const includeChatter =
    !selectedObjects?.length || selectedObjects.includes("Chatter");
  if (includeChatter) {
    batch.push({
      method: "GET",
      url: `/services/data/vXX.X/chatter/feed-elements?q=${query}&pageSize=25&sort=LastModifiedDateDesc`,
    });
  }

  const batchedResults = await getBatchedResults<
    | SalesforceRestApiSearchResponse<
        | SalesforceAccount
        | SalesforceContact
        | SalesforceTask
        | SalesforceContentNote
      >
    | SalesforceFeedElementPage
  >(batch);

  let results: (
    | SalesforceAccount
    | SalesforceContact
    | SalesforceTask
    | SalesforceContentNote
    | SalesforceFeedItem
  )[] = [];

  if (batchedResults.length > 0) {
    let idx = 0;
    if (fieldSpec.length > 0) {
      const searchResponse = batchedResults[
        idx++
      ] as SalesforceRestApiSearchResponse<
        | SalesforceAccount
        | SalesforceContact
        | SalesforceTask
        | SalesforceContentNote
      >;
      if (searchResponse.searchRecords) {
        results = results.concat(searchResponse.searchRecords);
      }
    }

    if (includeChatter) {
      const chatterResponse = batchedResults[
        idx++
      ] as SalesforceFeedElementPage;
      if (chatterResponse.elements) {
        results = results.concat(chatterResponse.elements);
      }
    }
  }

  return results;
}

export async function getBatchedResults<T>(
  batchRequests: SalesforceBatchRequestItem[]
): Promise<T[]> {
  if (batchRequests.length === 0) {
    return [];
  }
  const batch: SalesforceBatchRequest = { batchRequests, haltOnError: false };

  const response = await salesforceConnection.executeApiRequest<SalesforceBatchResponse>(
    `/services/data/vXX.X/composite/batch/`,
    "POST",
    batch,
    { "Content-Type": "application/json" }
  );

  return response.data?.results.map((r) => r.result as T) ?? [];
}

function escapeQuery(query: string): string {
  // There are some reserved characters for queries so we need to escape them
  // https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_find.htm#i1423105
  return query.replace(/[?&|!()^~*:"'+{}\-[\]\\]/gm, "\\$&");
}

export async function salesForceGetAppSearchEntries(
  integration: Integration<SalesforceSettings>
): Promise<CLISearchResultPlain[]> {
  if (integration?.data?.orgUrl) {
    return [
      {
        actions: [{ name: "Browse", hotkey: "enter" }],
        data: {
          providerId,
          pageUrl: integration?.data?.orgUrl,
        } as SalesforceResultData,
        icon: integration.icon,
        key: BROWSE_SEARCH_RESULT_KEY,
        template: CLITemplate.Plain,
        templateContent: undefined,
        title: "Browse Salesforce",
      } as CLISearchResultPlain,
    ];
  }

  return [];
}

export async function salesForceItemSelection(
  integration: Integration<SalesforceSettings>,
  result: CLIDispatchedSearchResult,
  lastResponse?: CLISearchListenerResponse
): Promise<boolean> {
  // if the user clicked the reconnect result, reconnect to salesforce and re-run query
  if (result.key === NOT_CONNECTED_SEARCH_RESULT_KEY) {
    await salesForceConnect(integration?.data)

    let results = await salesForceGetSearchResults(
      integration,
      result.data?.query,
      result.data?.filters
    );
    if (lastResponse) {
      lastResponse.revoke(NOT_CONNECTED_SEARCH_RESULT_KEY);
      lastResponse.respond(results.results);
    }
    Home.show();
    return true;
  }

  // otherwise open the result page url in browser
  const data = result.data as SalesforceResultData;
  if (data !== undefined) {
    let settings = await getSettings();
    let preload =
      settings.platformProvider.rootUrl + "/views/salesforce/preload.js";
    let viewOptions = {
      url: data.pageUrl,
      fdc3InteropApi: "1.2",
      interop: {
        currentContextGroup: "green",
      },
      customData: { buttonLabel: "Process Participant" },
      preloadScripts: [{ url: preload }],
      target: undefined,
    };
    launchView(viewOptions);
    return true;
  }
  return false;
}

export async function salesForceGetSearchResults(
  integration: Integration<SalesforceSettings>,
  query: string,
  filters?: CLIFilter[]
): Promise<CLISearchResponse> {
  await salesForceConnect(integration.data);
  if (!salesforceConnection) {
    return {
      results: []
    };
  }

  let searchResults: (
    | SalesforceAccount
    | SalesforceContact
    | SalesforceTask
    | SalesforceContentNote
    | SalesforceFeedItem
  )[];
  try {
    let selectedObjects: string[] = [];
    if (Array.isArray(filters) && filters.length > 0) {
      const objectsFilter = filters.find((x) => x.id === OBJECTS_FILTER_ID);
      if (objectsFilter) {
        selectedObjects = (
          Array.isArray(objectsFilter.options)
            ? objectsFilter.options
            : [objectsFilter.options]
        )
          .filter((x) => !!x.isSelected)
          .map((x) => (x.value === "Note" ? "ContentNote" : x.value));
      }
    }
    searchResults = await getSearchResults(query, selectedObjects);
  } catch (err) {
    closeConnection();
    if (err instanceof ConnectionError) {
      return {
        results: [
          {
            actions: [{ name: "Reconnect", hotkey: "enter" }],
            key: NOT_CONNECTED_SEARCH_RESULT_KEY,
            icon: integration?.icon,
            title: "Reconnect to Salesforce",
            data: {
              providerId,
              query,
              filters,
            },
          } as CLISearchResultSimpleText,
        ],
      };
    }
    return { results: [] };
  }

  let results = searchResults.map((searchResult) => {
    if ("Website" in searchResult) {
      return {
        actions: [{ name: "View", hotkey: "enter" }],
        label: searchResult.attributes.type,
        key: searchResult.Id,
        title: searchResult.Name,
        icon: integration?.data?.iconMap.account,
        data: {
          providerId,
          pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
        },
        template: CLITemplate.Contact,
        templateContent: {
          name: searchResult.Name,
          title: searchResult.Industry,
          details: [
            [
              ["Phone", searchResult.Phone],
              ["Type", searchResult.Type],
              ["Website", searchResult.Website],
            ],
          ],
        },
      } as CLISearchResultContact;
    } else if ("Email" in searchResult) {
      return {
        actions: [{ name: "View", hotkey: "enter" }],
        label: searchResult.attributes.type,
        key: searchResult.Id,
        title: searchResult.Name,
        icon: integration?.data?.iconMap.contact,
        data: {
          providerId,
          pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
        },
        template: CLITemplate.Contact,
        templateContent: {
          name: searchResult.Name,
          title: searchResult.Title,
          useInitials: true,
          details: [
            [
              ["Department", searchResult.Department],
              ["Email", searchResult.Email],
              ["Work #", searchResult.Phone],
            ],
          ],
        },
      } as CLISearchResultContact;
    } else if ("Description" in searchResult) {
      return {
        actions: [{ name: "View", hotkey: "enter" }],
        label: searchResult.attributes.type,
        key: searchResult.Id,
        title: searchResult.Subject,
        icon: integration?.data?.iconMap.task,
        data: {
          providerId,
          pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
        },
        template: CLITemplate.List,
        templateContent: [
          ["Subject", searchResult.Subject],
          ["Comments", searchResult.Description],
        ],
      } as CLISearchResultList;
    } else if ("TextPreview" in searchResult) {
      return {
        actions: [{ name: "View", hotkey: "enter" }],
        label: "Note",
        key: searchResult.Id,
        title: searchResult.Title,
        icon: integration?.data?.iconMap.note,
        data: {
          providerId,
          pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
        },
        template: CLITemplate.List,
        templateContent: [
          ["Title", searchResult.Title],
          ["Content", searchResult?.TextPreview],
        ],
      } as CLISearchResultList;
    } else if (
      "actor" in searchResult &&
      (searchResult.type === "TextPost" || searchResult.type === "ContentPost")
    ) {
      return {
        actions: [{ name: "View", hotkey: "enter" }],
        label: "Chatter",
        key: searchResult.id,
        title: searchResult.actor?.displayName,
        icon: integration?.data?.iconMap.chatter,
        data: {
          providerId,
          pageUrl: getObjectUrl(searchResult.id, integration.data?.orgUrl),
        } as SalesforceResultData,
        template: CLITemplate.Contact,
        templateContent: {
          name: searchResult.actor?.displayName,
          useInitials: true,
          details: [
            [
              ["Header", searchResult?.header?.text],
              ["Note", searchResult?.body?.text],
            ],
          ],
        },
      } as CLISearchResultContact;
    } else {
      // in this case we are only searching for accounts, contacts, tasks, content notes and chatter
      return undefined;
    }
  });

  const filteredResults = results.filter(
    Boolean
  ) as CLISearchResultContact<Action>[];
  const objects = searchResults.map((result) =>
    "attributes" in result ? result.attributes.type : "Chatter"
  );

  return {
    results: filteredResults,
    context: {
      filters: getSearchFilters(
        objects.map((c) => (c === "ContentNote" ? "Note" : c))
      ),
    },
  };
}

function getSearchFilters(objects: string[]): CLIFilter[] {
  if (Array.isArray(objects) && objects.length > 0) {
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
