import type { Integration, IntegrationModule, IntegrationProvider } from "./shapes";
import * as salesforceModule from "./salesforce";
import { CLIDispatchedSearchResult, CLIFilter, CLISearchListenerResponse, HomeSearchResponse, HomeSearchResult } from "@openfin/workspace";

export const knownIntegrationProviders: { [id: string]: IntegrationModule<unknown> } = {
    [salesforceModule.providerId]: salesforceModule
};

export const homeIntegrations: {
    module: IntegrationModule<unknown>;
    integration: Integration<unknown>;
}[] = [];

export async function register(integrationProvider?: IntegrationProvider): Promise<void> {
    if (Array.isArray(integrationProvider?.integrations)) {
        for (const integration of integrationProvider?.integrations) {
            if (integration.enabled) {
                if (!knownIntegrationProviders[integration.id] && integration.moduleUrl) {
                    try {
                        knownIntegrationProviders[integration.id] = await import(integration.moduleUrl);
                    } catch (err) {
                        console.error(`Error loading module ${integration.moduleUrl}`, err);
                    }
                }
                if (knownIntegrationProviders[integration.id]) {
                    homeIntegrations.push({
                        module: knownIntegrationProviders[integration.id],
                        integration
                    });
                    await knownIntegrationProviders[integration.id].register(integration)
                } else {
                    console.error("Missing module in integration providers", integration.id);
                }
            }
        }
    }
}

export async function deregister(integrationProvider?: IntegrationProvider): Promise<void> {
    for (const homeIntegration of homeIntegrations) {
        await homeIntegration.module.deregister(homeIntegration.integration);
    }
}

export async function getSearchResults(query: string, filters?: CLIFilter[]): Promise<HomeSearchResponse> {
    const homeResponse: HomeSearchResponse = {
        results: [],
        context: {
            filters: []
        }
    };

    for (const homeIntegration of homeIntegrations) {
        const integrationResults = await homeIntegration.module.getSearchResults(homeIntegration.integration, query, filters);
        if (Array.isArray(integrationResults.results)) {
            homeResponse.results = homeResponse.results.concat(integrationResults.results);
        }
        if (Array.isArray(integrationResults.context?.filters)) {
            homeResponse.context.filters = homeResponse.context.filters.concat(integrationResults.context.filters);
        }
    }

    return homeResponse;
}

export async function getAppSearchEntries(): Promise<HomeSearchResult[]> {
    let results = [];

    for (const homeIntegration of homeIntegrations) {
        const integrationResults = await homeIntegration.module.getAppSearchEntries(homeIntegration.integration);
        results = results.concat(integrationResults);
    }

    return results;
}

export async function itemSelection(result: CLIDispatchedSearchResult, lastResponse?: CLISearchListenerResponse): Promise<boolean> {
    if (result.data) {
        const foundIntegration = homeIntegrations.find(hi => hi.module.providerId === result.data?.providerId);

        if (foundIntegration) {
            const handled = await foundIntegration.module.itemSelection(foundIntegration.integration, result, lastResponse);

            if (!handled) {
                console.warn(`Error while trying to handle ${foundIntegration.module.providerId} entry`, result.data);
            }

            return handled;
        }
    }

    return false;
}
