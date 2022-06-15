import {
    CLITemplate,
    type CLIDispatchedSearchResult,
    type CLIFilter,
    type CLISearchListenerResponse,
    type HomeSearchResponse,
    type HomeSearchResult
} from "@openfin/workspace";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import { createHelp } from "../../templates";
import type { AsyncSettings } from "./shapes";
import { getAsyncTemplate } from "./templates";

/**
 * Implement the integration provider for async results.
 */
export class AsyncIntegrationProvider implements IntegrationModule<AsyncSettings> {
    /**
     * Provider id.
     * @internal
     */
    private static readonly _PROVIDER_ID = "async";

    /**
     * The key to use for a async result.
     * @internal
     */
    private static readonly _ASYNC_PROVIDER_DETAILS_ACTION = "Async Details";

    /**
    * The integration manager.
    * @internal
    */
    private _integrationManager: IntegrationManager | undefined;

    /**
     * The module is being registered.
     * @param integrationManager The manager for the integration.
     * @param integration The integration details.
     * @returns Nothing.
     */
    public async register(
        integrationManager: IntegrationManager,
        integration: Integration<AsyncSettings>
    ): Promise<void> {
        this._integrationManager = integrationManager;
    }

    /**
     * The module is being deregistered.
     * @param integration The integration details.
     * @returns Nothing.
     */
    public async deregister(integration: Integration<AsyncSettings>): Promise<void> {
    }

    /**
     * Get a list of the static application entries.
     * @param integration The integration details.
     * @returns The list of application entries.
     */
    public async getAppSearchEntries(integration: Integration<AsyncSettings>): Promise<HomeSearchResult[]> {
        const results = [];

        return results;
    }

    /**
     * Get a list of the static help entries.
     * @param integration The integration details.
     * @returns The list of help entries.
     */
    public async getHelpSearchEntries?(integration: Integration<AsyncSettings>): Promise<HomeSearchResult[]> {
        return [
            {
                key: `${AsyncIntegrationProvider._PROVIDER_ID}-help`,
                title: "/async",
                label: "Help",
                actions: [],
                data: {
                    providerId: AsyncIntegrationProvider._PROVIDER_ID
                },
                template: CLITemplate.Custom,
                templateContent: createHelp(
                    "/async",
                    [
                        "The async command can be used to search for data asynchronously.",
                        "For example to search for contacts."
                    ],
                    [
                        "/async contacts"
                    ]
                )
            }
        ];
    }

    /**
     * An entry has been selected.
     * @param integration The integration details.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    public async itemSelection(
        integration: Integration<AsyncSettings>,
        result: CLIDispatchedSearchResult,
        lastResponse: CLISearchListenerResponse
    ): Promise<boolean> {
        if (result.action.name === AsyncIntegrationProvider._ASYNC_PROVIDER_DETAILS_ACTION && result.data.url && this._integrationManager.openUrl) {
            await this._integrationManager.openUrl(result.data.url);
            return true;
        }

        return false;
    }

    /**
     * Get a list of search results based on the query and filters.
     * @param integration The integration details.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @returns The list of results and new filters.
     */
    public async getSearchResults(
        integration: Integration<AsyncSettings>,
        query: string,
        filters: CLIFilter[],
        lastResponse: CLISearchListenerResponse
    ): Promise<HomeSearchResponse> {
        const results = [];

        return {
            results
        };
    }

    /**
     * Create a search result.
     * @param key The key for the item.
     * @returns The search result.
     */
    private createResult(key: string): HomeSearchResult {
        return {
            key: `async-${key}`,
            title: key,
            label: "Information",
            actions: [
            ],
            data: {
                providerId: AsyncIntegrationProvider._PROVIDER_ID,
                key
            },
            template: CLITemplate.Custom,
            templateContent: {
                layout: getAsyncTemplate({
                    detailsAction: AsyncIntegrationProvider._ASYNC_PROVIDER_DETAILS_ACTION
                }),
                data: {
                    detailsTitle: "Further Details"
                }
            }
        };
    }
}
