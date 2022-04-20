import { type CLIDispatchedSearchResult, type CLIFilter, type CLISearchListenerResponse, type HomeSearchResponse, type HomeSearchResult } from "@openfin/workspace";
import type { Integration, IntegrationManager, IntegrationModule } from "@openfin/workspace-integration";
import type { SalesforceSettings } from "./shapes";
/**
 * Implement the integration provider for SalesForce.
 */
export declare class SalesForceIntegrationProvider implements IntegrationModule<SalesforceSettings> {
    /**
     * The module is being registered.
     * @param integrationManager The manager for the integration.
     * @param integration The integration details.
     * @returns Nothing.
     */
    register(integrationManager: IntegrationManager, integration: Integration<SalesforceSettings>): Promise<void>;
    /**
     * The module is being deregistered.
     * @param integration The integration details.
     * @returns Nothing.
     */
    deregister(integration: Integration<SalesforceSettings>): Promise<void>;
    /**
     * Get a list of the static application entries.
     * @param integration The integration details.
     * @returns The list of application entries.
     */
    getAppSearchEntries(integration: Integration<SalesforceSettings>): Promise<HomeSearchResult[]>;
    /**
     * An entry has been selected.
     * @param integration The integration details.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    itemSelection(integration: Integration<SalesforceSettings>, result: CLIDispatchedSearchResult, lastResponse?: CLISearchListenerResponse): Promise<boolean>;
    /**
     * Get a list of search results based on the query and filters.
     * @param integration The integration details.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @returns The list of results and new filters.
     */
    getSearchResults(integration: Integration<SalesforceSettings>, query: string, filters?: CLIFilter[]): Promise<HomeSearchResponse>;
    /**
     * Open the connection to SaleForce.
     * @param integration The integration details.
     */
    private openConnection;
    /**
     * Close the connection to SalesForce.
     */
    private closeConnection;
    /**
     * Create the object url from the if and origin.
     * @param objectId The object id.
     * @param salesforceOrgOrigin The origin url.
     * @returns Then object url.
     */
    private getObjectUrl;
    /**
     * Get results from the API using a query.
     * @param query The query to call the API with.
     * @param selectedObjects The selected filters.
     * @returns The search result objects from the API.
     */
    private getApiSearchResults;
    /**
     * Get batched results from SalesForce api.
     * @param batchRequests The batch requests to send.
     * @returns The results from the batch request.
     */
    private getBatchedResults;
    /**
     * Escape any characters needed in SalesForce API calls.
     * @param query The query to escape.
     * @returns The escaped query.
     */
    private escapeQuery;
    /**
     * Get the search result to display when SalesForce needs to reconnect.
     * @param integration The integration details.
     * @param query The query that needs to reconnect.
     * @param filters The filter for the reconnect.
     * @returns The search result entry.
     */
    private getReconnectSearchResult;
    /**
     * Get the search filters based on the results.
     * @param objects The object types to create the filters from.
     * @returns The filters.
     */
    private getSearchFilters;
}
