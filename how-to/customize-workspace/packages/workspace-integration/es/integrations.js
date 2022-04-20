const knownIntegrationProviders = {};
const homeIntegrations = [];
/**
 * Register all the workspace integrations.
 * @param integrationManager The integration manager.
 * @param integrationProvider The integration provider settings.
 */
export async function register(integrationManager, integrationProvider) {
    const integrations = integrationProvider?.integrations;
    if (Array.isArray(integrations)) {
        for (const integration of integrations) {
            if (integration.enabled) {
                if (!knownIntegrationProviders[integration.id] && integration.moduleUrl) {
                    try {
                        const mod = await import(/* webpackIgnore: true */ integration.moduleUrl);
                        knownIntegrationProviders[integration.id] = mod.integration;
                    }
                    catch (err) {
                        console.error(`Error loading module ${integration.moduleUrl}`, err);
                    }
                }
                if (knownIntegrationProviders[integration.id]) {
                    const homeIntegration = knownIntegrationProviders[integration.id];
                    homeIntegrations.push({
                        module: homeIntegration,
                        integration
                    });
                    if (homeIntegration.register) {
                        await homeIntegration.register(integrationManager, integration);
                    }
                }
                else {
                    console.error("Missing module in integration providers", integration.id);
                }
            }
        }
    }
}
/**
 * Deregister all the integrations.
 * @param integrationProvider The integration provider.
 */
export async function deregister(integrationProvider) {
    for (const homeIntegration of homeIntegrations) {
        if (homeIntegration.module.deregister) {
            await homeIntegration.module.deregister(homeIntegration.integration);
        }
    }
}
/**
 * Get the search results from all the integration providers.
 * @param query The query to get the search results for.
 * @param filters The filters to apply to the search results.
 * @returns The search results and new filters.
 */
export async function getSearchResults(query, filters) {
    const homeResponse = {
        results: [],
        context: {
            filters: []
        }
    };
    for (const homeIntegration of homeIntegrations) {
        if (homeIntegration.module.getSearchResults) {
            const integrationResults = await homeIntegration.module.getSearchResults(homeIntegration.integration, query, filters);
            if (Array.isArray(integrationResults.results)) {
                homeResponse.results = homeResponse.results.concat(integrationResults.results);
            }
            const newFilters = integrationResults.context?.filters;
            if (Array.isArray(newFilters) && homeResponse.context?.filters) {
                homeResponse.context.filters = homeResponse.context.filters.concat(newFilters);
            }
        }
    }
    return homeResponse;
}
/**
 * Get the app search entries for all the integration providers.
 * @returns The list of app entries.
 */
export async function getAppSearchEntries() {
    let results = [];
    for (const homeIntegration of homeIntegrations) {
        if (homeIntegration.module.getAppSearchEntries) {
            const integrationResults = await homeIntegration.module.getAppSearchEntries(homeIntegration.integration);
            results = results.concat(integrationResults);
        }
    }
    return results;
}
/**
 * The item for one of the providers was selected.
 * @param result The result of the selection.
 * @param lastResponse The last response.
 * @returns True if the selection was handled.
 */
export async function itemSelection(result, lastResponse) {
    if (result.data) {
        const foundIntegration = homeIntegrations.find(hi => hi.integration.id === result.data?.providerId);
        if (foundIntegration?.module?.itemSelection) {
            const handled = await foundIntegration.module.itemSelection(foundIntegration.integration, result, lastResponse);
            if (!handled) {
                console.warn(`Error while trying to handle ${foundIntegration.integration.id} entry`, result.data);
            }
            return handled;
        }
    }
    return false;
}
/**
 * Add an integration module that was loaded manually.
 * @param id The id of the module.
 * @param module The module.
 */
export function addKnownIntegrationProvider(id, module) {
    knownIntegrationProviders[id] = module;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludGVncmF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSxNQUFNLHlCQUF5QixHQUFpRCxFQUFFLENBQUM7QUFFbkYsTUFBTSxnQkFBZ0IsR0FHaEIsRUFBRSxDQUFDO0FBRVQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsUUFBUSxDQUMxQixrQkFBc0MsRUFDdEMsbUJBQXlDO0lBRXpDLE1BQU0sWUFBWSxHQUFHLG1CQUFtQixFQUFFLFlBQVksQ0FBQztJQUN2RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDN0IsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUU7WUFDcEMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO2dCQUNyQixJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7b0JBQ3JFLElBQUk7d0JBQ0EsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUMxRSx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztxQkFDL0Q7b0JBQUMsT0FBTyxHQUFHLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsV0FBVyxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUN2RTtpQkFDSjtnQkFDRCxJQUFJLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDM0MsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxlQUFl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