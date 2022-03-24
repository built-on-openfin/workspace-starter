import { connect, enableLogging, SalesforceConnection, SalesforceRestApiSearchResponse, SalesforceRestApiSObject } from "@openfin/salesforce";
import { getSettings } from "./settings";

let sfConn: SalesforceConnection;

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
    Content?: SalesforceTextBytes;
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

export type SalesforceTextBytes = {
    asByteArray: string;
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

export function getConnection(): SalesforceConnection {
    return sfConn;
}

export const getObjectUrl = (objectId: string, salesforceOrgOrigin: string): string => {
    return `${salesforceOrgOrigin}/${objectId}`;
};

export async function getSearchResults(query: string, selectedObjects?: string[]): Promise<(SalesforceContact | SalesforceAccount | SalesforceTask | SalesforceContentNote | SalesforceFeedItem)[]> {
    const accountFieldSpec = 'Account(Id, Industry, Name, Phone, Type, Website)';
    const contactFieldSpec = 'Contact(Department, Email, Id, Name, Phone, Title)';
    const taskFieldSpec = 'Task(Id, Subject, Description)';
    const contentNoteFieldSpec = 'ContentNote(Id, Title, Content)';
    const fieldSpecMap = new Map<string, string>([
        ['Account', accountFieldSpec], ['Contact', contactFieldSpec], ['Task', taskFieldSpec], ['ContentNote', contentNoteFieldSpec]
    ]);
    let fieldSpec = [...fieldSpecMap]
        .filter(x => {
            if (selectedObjects?.length > 0) {
                return selectedObjects.includes(x[0]);
            }
            return true;
        })
        .map(x => x[1])
        .join(', ');

    const batch: SalesforceBatchRequestItem[] = [];

    if (fieldSpec.length > 0) {
        const salesforceSearchQuery = `FIND {${query}} IN ALL FIELDS RETURNING ${fieldSpec} LIMIT 25`;

        batch.push({
            method: "GET",
            url: `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`,
        })
    }

    const includeChatter = !selectedObjects?.length || selectedObjects.includes("Chatter");
    if (includeChatter) {
        batch.push({
            method: "GET",
            url: `/services/data/vXX.X/chatter/feed-elements?q=${query}&pageSize=25&sort=LastModifiedDateDesc`,
        })
    }

    const batchedResults = await getBatchedResults(batch);

    let results: (SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote | SalesforceFeedItem)[] = [];

    if (batchedResults.length > 0) {
        let idx = 0;
        if (fieldSpec.length > 0) {
            const searchResponse = batchedResults[idx++] as SalesforceRestApiSearchResponse<SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote>;
            results = results.concat(searchResponse.searchRecords);
        }

        if (includeChatter) {
            const chatterResponse = batchedResults[idx++] as SalesforceFeedElementPage;
            results = results.concat(chatterResponse.elements);
        }
    }

    return results;
}

export async function getBatchedResults(batchRequests: SalesforceBatchRequestItem[]): Promise<unknown[]> {
    if (batchRequests.length === 0) {
        return [];
    }
    const batch: SalesforceBatchRequest = { batchRequests, haltOnError: false };

    const response = await sfConn.executeApiRequest<SalesforceBatchResponse>(
        `/services/data/vXX.X/composite/batch/`,
        "POST",
        batch,
        { 'Content-Type': 'application/json' }
    );

    return response.data?.results.map(r => r.result) ?? [];
}

export async function connectToSalesforce(): Promise<void> {
    enableLogging();
    const { orgUrl, consumerKey, isSandbox } = await getSettings();
    sfConn = await connect(orgUrl, consumerKey, isSandbox);
}