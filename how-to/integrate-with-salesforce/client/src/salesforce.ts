import {
  connect,
  enableLogging,
  SalesforceConnection,
  SalesforceRestApiSearchResponse,
  SalesforceRestApiSObject
} from "@openfin/salesforce";
import { getSettings } from "./settings";

let sfConn: SalesforceConnection;

export interface SalesforceBatchRequest {
  batchRequests: SalesforceBatchRequestItem[];
  haltOnError: boolean;
}

export interface SalesforceBatchRequestItem {
  method: string;
  url: string;
}

export interface SalesforceBatchResponse {
  hasErrors: boolean;
  results: SalesforceBatchResponseItem[];
}

export interface SalesforceBatchResponseItem {
  statusCode: number;
  result: unknown;
}

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

export interface SalesforceActor {
  id: string;
  url: string;
  type: string;
  companyName: string;
  displayName: string;
  name: string;
}

export interface SalesforceTextArea {
  isRichText: boolean;
  text: string;
}

export interface SalesforceFeedItem {
  id: string;
  url: string;
  type: string;
  actor?: SalesforceActor;
  body?: SalesforceTextArea;
  header?: SalesforceTextArea;
}

export interface SalesforceFeedElementPage {
  currentPageToken: string;
  currentPageUrl: string;
  elements: SalesforceFeedItem[];
  isModifiedToken: string;
  isModifiedUrl: string;
  nextPageUrl: string;
  updatesToken: string;
  updatesUrl: string;
}

export function getConnection(): SalesforceConnection {
  return sfConn;
}

export const getObjectUrl = (objectId: string, salesforceOrgOrigin: string): string =>
  `${salesforceOrgOrigin}/${objectId}`;

export async function getSearchResults(
  query: string,
  selectedObjects?: string[]
): Promise<(SalesforceContact | SalesforceAccount | SalesforceTask | SalesforceContentNote | SalesforceFeedItem)[]> {
  const accountFieldSpec = "Account(Id, Industry, Name, Phone, Type, Website)";
  const contactFieldSpec = "Contact(Department, Email, Id, Name, Phone, Title)";
  const taskFieldSpec = "Task(Id, Subject, Description)";
  const contentNoteFieldSpec = "ContentNote(Id, Title, Content, TextPreview)";
  const fieldSpecMap = new Map<string, string>([
    ["Account", accountFieldSpec],
    ["Contact", contactFieldSpec],
    ["Task", taskFieldSpec],
    ["ContentNote", contentNoteFieldSpec]
  ]);
  const fieldSpecs = [...fieldSpecMap]
    .filter((x) => {
      if (selectedObjects?.length > 0) {
        return selectedObjects.includes(x[0]);
      }
      return true;
    })
    .map((f) => f[1]);

  const batch: SalesforceBatchRequestItem[] = fieldSpecs.map((fieldSpec) => {
    const salesforceSearchQuery = `FIND {${escapeQuery(query)}} IN ALL FIELDS RETURNING ${fieldSpec} LIMIT 10`;

    return {
      method: "GET",
      url: `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`
    };
  });

  const includeChatter = !selectedObjects?.length || selectedObjects.includes("Chatter");
  if (includeChatter) {
    batch.push({
      method: "GET",
      url: `/services/data/vXX.X/chatter/feed-elements?q=${query}&pageSize=25&sort=LastModifiedDateDesc`
    });
  }

  const batchedResults = await getBatchedResults<
    | SalesforceRestApiSearchResponse<SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote>
    | SalesforceFeedElementPage
  >(batch);

  let results: (SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote | SalesforceFeedItem)[] =
    [];

  if (batchedResults.length) {
    let idx = 0;
    for (; idx < fieldSpecs.length; idx++) {
      const searchResponse = batchedResults[idx] as SalesforceRestApiSearchResponse<
        SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote
      >;
      if (searchResponse?.searchRecords?.length) {
        results = results.concat(searchResponse.searchRecords);
      }
    }

    if (includeChatter) {
      const chatterResponse = batchedResults[idx++] as SalesforceFeedElementPage;
      if (chatterResponse?.elements?.length) {
        results = results.concat(chatterResponse.elements);
      }
    }
  }

  return results;
}

export async function getBatchedResults<T>(batchRequests: SalesforceBatchRequestItem[]): Promise<T[]> {
  if (batchRequests.length === 0) {
    return [];
  }
  const batch: SalesforceBatchRequest = { batchRequests, haltOnError: false };

  const response = await sfConn.executeApiRequest<SalesforceBatchResponse>(
    `/services/data/vXX.X/composite/batch/`,
    "POST",
    batch,
    { "Content-Type": "application/json" }
  );

  return response.data?.results.map((r) => r.result as T) ?? [];
}

export async function connectToSalesforce(): Promise<void> {
  enableLogging();
  const { orgUrl, consumerKey, isSandbox } = await getSettings();
  sfConn = await connect(orgUrl, consumerKey, isSandbox);
}

function escapeQuery(query: string): string {
  // There are some reserved characters for queries so we need to escape them
  // https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_find.htm#i1423105
  return query.replace(/[!"&'()*+:?[\\\]^{|}~-]/gm, "\\$&");
}
