import type { CLIDispatchedSearchResult, CLIFilter, CLISearchListenerResponse, HomeSearchResponse, HomeSearchResult } from "@openfin/workspace";
import type { IntegrationManager, IntegrationModule, IntegrationProvider } from "./shapes";
/**
 * Register all the workspace integrations.
 * @param integrationManager The integration manager.
 * @param integrationProvider The integration provider settings.
 */
export declare function register(integrationManager: IntegrationManager, integrationProvider?: IntegrationProvider): Promise<void>;
/**
 * Deregister all the integrations.
 * @param integrationProvider The integration provider.
 */
export declare function deregister(integrationProvider?: IntegrationProvider): Promise<void>;
/**
 * Get the search results from all the integration providers.
 * @param query The query to get the search results for.
 * @param filters The filters to apply to the search results.
 * @returns The search results and new filters.
 */
export declare function getSearchResults(query: string, filters?: CLIFilter[]): Promise<HomeSearchResponse>;
/**
 * Get the app search entries for all the integration providers.
 * @returns The list of app entries.
 */
export declare function getAppSearchEntries(): Promise<HomeSearchResult[]>;
/**
 * The item for one of the providers was selected.
 * @param result The result of the selection.
 * @param lastResponse The last response.
 * @returns True if the selection was handled.
 */
export declare function itemSelection(result: CLIDispatchedSearchResult, lastResponse?: CLISearchListenerResponse): Promise<boolean>;
/**
 * Add an integration module that was loaded manually.
 * @param id The id of the module.
 * @param module The module.
 */
export declare function addKnownIntegrationProvider(id: string, module: IntegrationModule<unknown>): void;
