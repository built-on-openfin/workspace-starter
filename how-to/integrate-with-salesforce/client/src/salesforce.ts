import { connect, enableLogging, SalesforceConnection, SalesforceRestApiSearchResults, SalesforceRestApiSObjectBase } from "@openfin/salesforce";
import { getSettings } from "./settings";

let sfConn: SalesforceConnection;

export function getConnection(): SalesforceConnection {
    return sfConn;
}

export async function getSearchResults(query: string, selectedObjects?: string[]): Promise<SalesforceRestApiSObjectBase[]> {
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
    const response = await sfConn.executeApiRequest<SalesforceRestApiSearchResults>(
    `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`
    );
    return response.data.searchRecords;
}

export async function init(): Promise<void> {
    enableLogging();
    const { orgUrl, consumerKey, isSandbox } = await getSettings();
    sfConn = await connect(orgUrl, consumerKey, isSandbox);
}