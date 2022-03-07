import { connect, enableLogging, SalesforceConnection, SalesforceRestApiSearchResponse, SalesforceRestApiSObject } from "@openfin/salesforce";
import { getSettings } from "./settings";

let sfConn: SalesforceConnection;

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

export function getConnection(): SalesforceConnection {
    return sfConn;
}

export const getObjectUrl = (objectId: string, salesforceOrgOrigin: string): string => {
    return `${salesforceOrgOrigin}/${objectId}`;
  };

export async function getSearchResults(query: string, selectedObjects?: string[]): Promise<(SalesforceContact | SalesforceAccount)[]> {
    const accountFieldSpec = 'Account(Id, Industry, Name, Phone, Type, Website)';
    const contactFieldSpec = 'Contact(Department, Email, Id, Name, Phone, Title)';
    const fieldSpecMap = new Map<string, string>([
        ['Account', accountFieldSpec], ['Contact', contactFieldSpec]
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
    const salesforceSearchQuery = `FIND {${query}} IN ALL FIELDS RETURNING ${fieldSpec} LIMIT 25`;
    const response = await sfConn.executeApiRequest<SalesforceRestApiSearchResponse<SalesforceAccount | SalesforceContact>>(
    `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`
    );
    return response.data.searchRecords;
}

export async function connectToSalesforce(): Promise<void> {
    enableLogging();
    const { orgUrl, consumerKey, isSandbox } = await getSettings();
    sfConn = await connect(orgUrl, consumerKey, isSandbox);
}