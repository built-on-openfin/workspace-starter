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
}
