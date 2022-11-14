import type {
	HomeDispatchedSearchResult,
	CLIFilter,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationProviderOptions
} from "./shapes/integrations-shapes";
import type { Logger } from "./shapes/logger-shapes";
import type { ModuleDefinition } from "./shapes/module-shapes";

const integrationModules: { [id: string]: IntegrationModule } = {};

const homeIntegrations: {
	module: IntegrationModule;
	integration: ModuleDefinition;
}[] = [];

/**
 * Register all the workspace integrations.
 * @param integrationProvider The integration provider settings.
 * @param integrationHelpers The integration helpers.
 */
export async function register(
	integrationProvider: IntegrationProviderOptions,
	integrationHelpers: IntegrationHelpers
): Promise<void> {
	const integrations = integrationProvider?.modules;
	if (Array.isArray(integrations)) {
		for (const integration of integrations) {
			if (integration.enabled) {
				if (!integrationModules[integration.id] && integration.url) {
					try {
						const mod = await import(/* webpackIgnore: true */ integration.url);
						integrationModules[integration.id] = mod.entryPoints.integrations;
					} catch (err) {
						console.error(`Error loading module ${integration.url}`, err);
					}
				}
				if (integrationModules[integration.id]) {
					const homeIntegration = integrationModules[integration.id];
					homeIntegrations.push({
						module: homeIntegration,
						integration
					});
					if (homeIntegration.initialize) {
						const createLogger: (group: string) => Logger = (group) => ({
							info: (message: unknown, ...optionalParams: unknown[]) =>
								console.log(group, "info", message, ...optionalParams),
							warn: (message: unknown, ...optionalParams: unknown[]) =>
								console.log(group, "warn", message, ...optionalParams),
							error: (message: unknown, ...optionalParams: unknown[]) =>
								console.log(group, "error", message, ...optionalParams),
							trace: (message: unknown, ...optionalParams: unknown[]) =>
								console.log(group, "trace", message, ...optionalParams),
							debug: (message: unknown, ...optionalParams: unknown[]) =>
								console.log(group, "debug", message, ...optionalParams)
						});
						await homeIntegration.initialize(integration, createLogger, integrationHelpers);
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
		if (homeIntegration.module.closedown) {
			await homeIntegration.module.closedown();
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
			promises.push(homeIntegration.module.getSearchResults(query, filters, lastResponse));
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
 * Get the help search entries for all the integration providers.
 * @returns The list of help entries.
 */
export async function getHelpSearchEntries(): Promise<HomeSearchResult[]> {
	let results: HomeSearchResult[] = [];

	for (const homeIntegration of homeIntegrations) {
		if (homeIntegration.module.getHelpSearchEntries) {
			const integrationResults = await homeIntegration.module.getHelpSearchEntries();
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
			const handled = await foundIntegration.module.itemSelection(result, lastResponse);

			if (!handled) {
				console.warn(`Error while trying to handle ${foundIntegration.integration.id} entry`, result.data);
			}

			return handled;
		}
	}

	return false;
}
