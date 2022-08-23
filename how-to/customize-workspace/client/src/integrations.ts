import {
	HomeDispatchedSearchResult,
	CLIFilter,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	CLITemplate,
	ButtonStyle
} from "@openfin/workspace";
import * as endpointProvider from "./endpoint";
import type {
	Integration,
	IntegrationManager,
	IntegrationModule,
	IntegrationProviderOptions
} from "./integrations-shapes";
import { createLogger } from "./logger-provider";
import { createButton, createContainer, createHelp, createImage, createText, createTitle } from "./templates";

const logger = createLogger("Integrations");

const knownIntegrationProviders: { [id: string]: IntegrationModule<unknown> } = {};

const homeIntegrations: {
	module: IntegrationModule<unknown>;
	integration: Integration<unknown>;
	include: boolean;
}[] = [];

let passedIntegrationManager: IntegrationManager;
let passedIntegrationProvider: IntegrationProviderOptions;

/**
 * Create an integration result.
 * @param id The id of the integration.
 * @param name The name of the integration.
 * @param description The description of the integration.
 * @param icon The icon of the integration.
 * @param include is search enabled for this integration.
 * @returns The search result.
 */
async function createResult(
	id: string,
	name: string,
	description: string,
	icon: string,
	include: boolean
): Promise<HomeSearchResult> {
	const buttonAction = include ? "Turn Off Integration" : "Turn On Integration";

	return {
		key: `integration-${id}`,
		title: `${name}`,
		icon,
		actions: [],
		data: {
			providerId: "integration-provider",
			integrationId: id,
			include
		},
		template: CLITemplate.Custom,
		templateContent: {
			layout: await createContainer(
				"column",
				[
					await createContainer(
						"column",
						[
							await createContainer(
								"row",
								[
									await createImage("icon", name, { width: "32px", height: "32px" }),
									await createTitle("title")
								],
								{
									alignItems: "center",
									gap: "10px"
								}
							),
							await createText("description", 12)
						],
						{
							gap: "20px"
						}
					),
					await createContainer("column", [
						await createText("status", 12, { paddingBottom: "10px", fontFamily: "monospace" }),
						await createButton(include ? ButtonStyle.Primary : ButtonStyle.Secondary, "btnText", buttonAction)
					])
				],
				{
					padding: "10px",
					flex: 1,
					justifyContent: "space-between"
				}
			),
			data: {
				title: name,
				description: description ?? "You can enable/disable an integrations features",
				icon,
				status: `Integration State: ${include ? "On" : "Off"}`,
				btnText: buttonAction
			}
		}
	};
}

async function initializeIntegration(integration: Integration<unknown>) {
	if (!passedIntegrationManager) {
		logger.error("IntegrationManager is not available, make sure your have called register");
	}
	if (!knownIntegrationProviders[integration.id] && integration.moduleUrl) {
		try {
			const mod = await import(/* webpackIgnore: true */ integration.moduleUrl);
			knownIntegrationProviders[integration.id] = mod.integration;
		} catch (err) {
			logger.error(`Error loading module ${integration.moduleUrl}`, err);
		}
	}
	if (knownIntegrationProviders[integration.id]) {
		const homeIntegration = knownIntegrationProviders[integration.id];
		homeIntegrations.push({
			module: homeIntegration,
			integration,
			include: true
		});
		if (homeIntegration.register) {
			await homeIntegration.register(passedIntegrationManager, integration, createLogger);
		}
	} else {
		logger.error("Missing module in integration providers", integration.id);
	}
}

export async function getManagementResults(): Promise<HomeSearchResponse> {
	if (!passedIntegrationProvider) {
		logger.error("IntegrationProvider is not available, make sure your have called register");
	}

	const homeResponse: HomeSearchResponse = {
		results: [],
		context: {
			filters: []
		}
	};

	const integrations = passedIntegrationProvider.integrations;
	if (Array.isArray(integrations)) {
		for (const integration of integrations) {
			if (integration.enabled) {
				const existingIntegration = homeIntegrations.find((entry) => entry.integration.id === integration.id);
				if (existingIntegration) {
					const result = await createResult(
						existingIntegration.integration.id,
						existingIntegration.integration.title,
						existingIntegration.integration.description,
						existingIntegration.integration.icon,
						existingIntegration.include
					);
					homeResponse.results.push(result);
				} else {
					const result = await createResult(
						integration.id,
						integration.title,
						integration.description,
						integration.icon,
						false
					);
					homeResponse.results.push(result);
				}
			}
		}
	}

	if (homeResponse.results.length === 0) {
		const description =
			"You either have no integrations listed or none of them are enabled. Please check with support if you believe you should have access to integrations";
		const noEntries: HomeSearchResult = {
			key: "integration-provider-no-results",
			title: "No integrations available",
			data: {},
			actions: [],
			icon: passedIntegrationProvider.icon,
			description,
			shortDescription: description,
			template: CLITemplate.SimpleText,
			templateContent: description
		};
		homeResponse.results.push(noEntries);
		logger.error(
			"Integration management is enabled but you have no integrations listed in your settings or none of them are enabled"
		);
	}

	return homeResponse;
}

async function setPreference(integrationId: string, include: boolean) {
	const integrationPreferenceEndpointId = "integration-preferences-set";
	if (endpointProvider.hasEndpoint(integrationPreferenceEndpointId)) {
		// eslint-disable-next-line max-len
		const success = await endpointProvider.action<{ id: string; payload: { include: boolean } }>(
			integrationPreferenceEndpointId,
			{ id: integrationId, payload: { include } }
		);
		if (success) {
			logger.info(`Saved integration: ${integrationId} preference. Include: ${include}`);
		} else {
			logger.info(`Unable to save integration: ${integrationId} preference. Include: ${include}`);
		}
	}
}

async function getPreference(integrationId: string): Promise<{ include: boolean }> {
	const integrationPreferenceEndpointId = "integration-preferences-get";
	if (endpointProvider.hasEndpoint(integrationPreferenceEndpointId)) {
		// eslint-disable-next-line max-len
		const preference = await endpointProvider.requestResponse<{ id: string }, { include: boolean }>(
			integrationPreferenceEndpointId,
			{ id: integrationId }
		);
		if (preference !== undefined && preference !== null) {
			logger.info(`Retrieved preference for integration: ${integrationId}`);
		} else {
			logger.info(`Unable to get preference for integration: ${integrationId}`);
		}
		return preference;
	}
	return null;
}

async function updateIntegrationStatus(
	lastResponse: HomeSearchListenerResponse,
	integrationId: string,
	include: boolean
): Promise<boolean> {
	if (!passedIntegrationProvider) {
		logger.error("IntegrationProvider is not available, make sure your have called register");
	}

	const knownIntegration = knownIntegrationProviders[integrationId];
	if (knownIntegration === undefined) {
		const integration = passedIntegrationProvider.integrations.find((entry) => entry.id === integrationId);
		if (integration !== undefined) {
			await initializeIntegration(integration);
			const result = await createResult(
				integration.id,
				integration.title,
				integration.description,
				integration.icon,
				!include
			);
			lastResponse.respond([result]);
			await setPreference(integration.id, !include);
			return true;
		}
		logger.warn(`Unable to find specified integration: ${integrationId} in settings`);
		return false;
	}
	const index = homeIntegrations.findIndex((entry) => entry.integration.id === integrationId);
	if (index !== -1) {
		homeIntegrations[index].include = !include;
		lastResponse.respond([
			await createResult(
				homeIntegrations[index].integration.id,
				homeIntegrations[index].integration.title,
				homeIntegrations[index].integration.description,
				homeIntegrations[index].integration.icon,
				!include
			)
		]);
		await setPreference(homeIntegrations[index].integration.id, !include);
		return true;
	}
	return false;
}
/**
 * Register all the workspace integrations.
 * @param integrationManager The integration manager.
 * @param integrationProvider The integration provider settings.
 */
export async function register(
	integrationManager: IntegrationManager,
	integrationProvider?: IntegrationProviderOptions
): Promise<void> {
	passedIntegrationManager = integrationManager;
	passedIntegrationProvider = integrationProvider;
	const integrations = integrationProvider?.integrations;

	if (Array.isArray(integrations)) {
		for (const integration of integrations) {
			if (integration.enabled) {
				const integrationPreference = await getPreference(integration.id);
				if (integrationPreference !== null) {
					// follow preference
					if (integrationPreference.include) {
						await initializeIntegration(integration);
					}
				} else if (integration.autoStart ?? true) {
					await initializeIntegration(integration);
				}
			}
		}
	}
}

/**
 * Deregister all the integrations.
 * @param integrationProvider The integration provider.
 */
export async function deregister(): Promise<void> {
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
	if (!passedIntegrationProvider) {
		logger.error("IntegrationProvider is not available, make sure your have called register");
	}

	const homeResponse: HomeSearchResponse = {
		results: [],
		context: {
			filters: []
		}
	};

	if (
		passedIntegrationProvider.isManagementEnabled &&
		query.startsWith(`/${passedIntegrationProvider.command ?? "integrations"}`)
	) {
		return getManagementResults();
	}

	const promises: Promise<HomeSearchResponse>[] = [];
	for (const homeIntegration of homeIntegrations) {
		if (homeIntegration.module.getSearchResults && homeIntegration.include) {
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
			logger.error(promiseResult.reason);
		}
	}

	return homeResponse;
}

/**
 * Get the help search entries for all the integration providers.
 * @returns The list of help entries.
 */
export async function getHelpSearchEntries(): Promise<HomeSearchResult[]> {
	if (!passedIntegrationProvider) {
		logger.error("IntegrationProvider is not available, make sure your have called register");
	}

	let results: HomeSearchResult[] = [];

	if (passedIntegrationProvider.isManagementEnabled) {
		const commandKeyword = passedIntegrationProvider.command ?? "integrations";
		const command = `/${commandKeyword}`;

		const helpEntry: HomeSearchResult = {
			key: "integration-provider-help",
			title: command,
			label: "Help",
			icon: passedIntegrationProvider.icon,
			actions: [],
			data: {
				providerId: "integration-provider"
			},
			template: CLITemplate.Custom,
			templateContent: await createHelp(
				command,
				[
					passedIntegrationProvider.commandDescription ??
						`Allows the management of ${commandKeyword} for this platform. You can decide whether enabled integrations should be included when a query is entered.`
				],
				[command]
			)
		};

		results.push(helpEntry);
	}
	for (const homeIntegration of homeIntegrations) {
		if (homeIntegration.module.getHelpSearchEntries && homeIntegration.include) {
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
		if (result.data?.providerId === "integration-provider") {
			const integrationId: string = result.data.integrationId;
			const include: boolean = result.data.include;
			return updateIntegrationStatus(lastResponse, integrationId, include);
		}
		const foundIntegration = homeIntegrations.find((hi) => hi.integration.id === result.data?.providerId);

		if (foundIntegration?.module?.itemSelection) {
			const handled = await foundIntegration.module.itemSelection(
				foundIntegration.integration,
				result,
				lastResponse
			);

			if (!handled) {
				logger.warn(`Error while trying to handle ${foundIntegration.integration.id} entry`, result.data);
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
