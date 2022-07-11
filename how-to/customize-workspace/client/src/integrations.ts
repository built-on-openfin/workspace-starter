import type {
	HomeDispatchedSearchResult,
	CLIFilter,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type {
	Integration,
	IntegrationManager,
	IntegrationModule,
	IntegrationProviderOptions
} from "./integrations-shapes";

const knownIntegrationProviders: { [id: string]: IntegrationModule<unknown> } = {};

const homeIntegrations: {
	module: IntegrationModule<unknown>;
	integration: Integration<unknown>;
}[] = [];

/**
 * Register all the workspace integrations.
 * @param integrationManager The integration manager.
 * @param integrationProvider The integration provider settings.
 */
export async function register(
	integrationManager: IntegrationManager,
	integrationProvider?: IntegrationProviderOptions
): Promise<void> {
	const integrations = integrationProvider?.integrations;
	if (Array.isArray(integrations)) {
		for (const integration of integrations) {
			if (integration.enabled) {
				if (!knownIntegrationProviders[integration.id] && integration.moduleUrl) {
					try {
						const mod = await import(/* webpackIgnore: true */ integration.moduleUrl);
						knownIntegrationProviders[integration.id] = mod.integration;
					} catch (err) {
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
				} else {
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
export async function deregister(integrationProvider?: IntegrationProviderOptions): Promise<void> {
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
 * @param lastResponse The last search response used for updating existing results.
 * @returns The search results and new filters.
 */
export async function getSearchResults(
	query: string,
	filters: CLIFilter[],
	lastResponse: HomeSearchListenerResponse
): Promise<HomeSearchResponse> {
	const homeResponse: HomeSearchResponse = {
		results: [],
		context: {
			filters: []
		}
	};

	const promises: Promise<HomeSearchResponse>[] = [];
	for (const homeIntegration of homeIntegrations) {
		if (homeIntegration.module.getSearchResults) {
			promises.push(
				homeIntegration.module.getSearchResults(homeIntegration.integration, query, filters, lastResponse)
			);
		}
	}

	const promiseResults = await Promise.allSettled(promises);
	for (const promiseResult of promiseResults) {
		if (promiseResult.status === "fulfilled") {
			if (Array.isArray(promiseResult.value.results)) {
				homeResponse.results = homeResponse.results.concat(promiseResult.value.results);
			}
			const newFilters = promiseResult.value.context?.filters;
			if (Array.isArray(newFilters) && homeResponse.context?.filters) {
				homeResponse.context.filters = homeResponse.context.filters.concat(newFilters);
			}
		} else {
			console.error(promiseResult.reason);
		}
	}

	return homeResponse;
}

/**
 * Get the app search entries for all the integration providers.
 * @returns The list of app entries.
 */
export async function getAppSearchEntries(): Promise<HomeSearchResult[]> {
	let results: HomeSearchResult[] = [];

	for (const homeIntegration of homeIntegrations) {
		if (homeIntegration.module.getAppSearchEntries) {
			const integrationResults = await homeIntegration.module.getAppSearchEntries(
				homeIntegration.integration
			);
			results = results.concat(integrationResults);
		}
	}

	return results;
}

/**
 * Get the help search entries for all the integration providers.
 * @returns The list of help entries.
 */
export async function getHelpSearchEntries(): Promise<HomeSearchResult[]> {
	let results: HomeSearchResult[] = [];

	for (const homeIntegration of homeIntegrations) {
		if (homeIntegration.module.getHelpSearchEntries) {
			const integrationResults = await homeIntegration.module.getHelpSearchEntries(
				homeIntegration.integration
			);
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
export async function itemSelection(
	result: HomeDispatchedSearchResult,
	lastResponse?: HomeSearchListenerResponse
): Promise<boolean> {
	if (result.data) {
		const foundIntegration = homeIntegrations.find((hi) => hi.integration.id === result.data?.providerId);

		if (foundIntegration?.module?.itemSelection) {
			const handled = await foundIntegration.module.itemSelection(
				foundIntegration.integration,
				result,
				lastResponse
			);

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
export function addKnownIntegrationProvider(id: string, module: IntegrationModule<unknown>): void {
	knownIntegrationProviders[id] = module;
}
