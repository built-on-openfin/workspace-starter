import {
	ButtonStyle,
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import {
	closedownModule,
	closedownModules,
	initializeModule,
	initializeModules,
	loadModules
} from "./modules";
import * as platformSplashProvider from "./platform/platform-splash";
import type {
	EndpointIntegrationsPreferencesGetRequest,
	EndpointIntegrationsPreferencesGetResponse,
	EndpointIntegrationsPreferencesSetRequest,
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition,
	IntegrationProviderOptions
} from "./shapes/integrations-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import * as templateHelpers from "./templates";
import { createButton, createContainer, createHelp, createImage, createText, createTitle } from "./templates";
import { isEmpty, isStringValue } from "./utils";
import { getVersionInfo } from "./version";

const logger = createLogger("Integrations");

let integrationProviderOptions: IntegrationProviderOptions | undefined;
let integrationModules: ModuleEntry<
	IntegrationModule,
	IntegrationHelpers,
	unknown,
	IntegrationModuleDefinition
>[] = [];
let integrationHelpers: IntegrationHelpers;

const POPULATE_QUERY = "Populate Query";

const INTEGRATIONS_PREFERENCE_ENDPOINT_SET = "integration-preferences-set";
const INTEGRATIONS_PREFERENCE_ENDPOINT_GET = "integration-preferences-get";

/**
 * Initialize all the integrations.
 * @param options The integration provider settings.
 * @param helpers Module helpers to pass to any loaded modules.
 * @param setSearchQuery The set search query for the home component.
 */
export async function init(
	options: IntegrationProviderOptions | undefined,
	helpers: ModuleHelpers,
	setSearchQuery: (query: string) => Promise<void>
): Promise<void> {
	if (options) {
		options.modules = options.modules ?? options.integrations;
		logger.info("Initializing integrations.");
		integrationProviderOptions = options;
		integrationHelpers = {
			...helpers,
			templateHelpers,
			openUrl: async (url): Promise<void> => fin.System.openUrlWithBrowser(url),
			setSearchQuery
		};

		// Map the old moduleUrl properties to url
		if (options.modules) {
			for (const integration of options.modules) {
				integration.url = integration.url ?? integration.moduleUrl;
				delete integration.moduleUrl;
			}
		}

		// Load the modules
		integrationModules = await loadModules<
			IntegrationModule,
			IntegrationHelpers,
			unknown,
			IntegrationModuleDefinition
		>(options, "integrations");

		// Now filter the list to those with autoStart set, or nothing set
		const initModules: ModuleEntry<IntegrationModule, IntegrationHelpers>[] = [];
		for (const integration of integrationModules) {
			const integrationPreference = await getPreferences(integration.definition.id);
			integration.definition.autoStart =
				integrationPreference?.autoStart ?? integration.definition.autoStart ?? true;
			if (integration.definition.autoStart) {
				initModules.push(integration);
			}
		}

		// Initialize just the auto start modules
		await initializeModules(initModules, integrationHelpers, async (def) => {
			await platformSplashProvider.updateProgress(`${def.title} Integration`);
		});
		logger.info("Integrations has been initialized.");
	}
}

/**
 * Close down all the integrations.
 */
export async function closedown(): Promise<void> {
	await closedownModules("integrations");
}

/**
 * Get the search results from all the integration providers.
 * @param query The query to get the search results for.
 * @param filters The filters to apply to the search results.
 * @param lastResponse The last search response used for updating existing results.
 * @param selectedSources Selected sources filters list.
 * @param options Options for the search query.
 * @param options.queryMinLength The minimum length before a query is actioned.
 * @param options.queryAgainst The fields in the data to query against.
 * @param options.isSuggestion Is the query from a suggestion.
 * @returns The search results and new filters.
 */
export async function getSearchResults(
	query: string,
	filters: CLIFilter[],
	lastResponse: HomeSearchListenerResponse,
	selectedSources: string[],
	options: {
		queryMinLength?: number;
		queryAgainst?: string[];
		isSuggestion?: boolean;
	}
): Promise<HomeSearchResponse & { sourceFilters?: string[] }> {
	const homeResponse: HomeSearchResponse & { sourceFilters?: string[] } = {
		results: [],
		context: {
			filters: []
		},
		sourceFilters: []
	};
	const sourceFilters: string[] = [];

	if (!isEmpty(integrationProviderOptions)) {
		if (
			integrationProviderOptions.isManagementEnabled &&
			query.startsWith(`/${integrationProviderOptions.command ?? "integrations"}`)
		) {
			return getManagementResults();
		}

		const promises: Promise<HomeSearchResponse>[] = [];
		for (const integrationModule of integrationModules) {
			if (
				integrationModule.isInitialized &&
				integrationModule.implementation.getSearchResults &&
				((integrationModule.definition.excludeFromSourceFilter ?? selectedSources.length === 0) ||
					selectedSources.includes(integrationModule.definition.title))
			) {
				promises.push(
					integrationModule.implementation.getSearchResults(query, filters, lastResponse, options)
				);
			}
			if (!integrationModule.definition.excludeFromSourceFilter) {
				sourceFilters.push(integrationModule.definition.title);
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
	}

	return {
		...homeResponse,
		sourceFilters
	};
}

/**
 * Get the search results from all the integration providers.
 * @param query The query to get the search results for.
 * @param lastResponse The last search response used for updating existing results.
 * @param selectedSources Selected sources filters list.
 * @param options Options for the search query.
 * @param options.queryMinLength The minimum length before a query is actioned.
 * @param options.queryAgainst The fields in the data to query against.
 * @param options.isSuggestion Is the query from a suggestion.
 * @returns The search results and new filters.
 */
export async function getSearchResultsProgress(
	query: string,
	lastResponse: HomeSearchListenerResponse,
	selectedSources: string[],
	options: {
		queryMinLength?: number;
		queryAgainst?: string[];
		isSuggestion?: boolean;
	}
): Promise<HomeSearchResult[]> {
	let homeResponse: HomeSearchResult[] = [];

	if (!isEmpty(integrationProviderOptions)) {
		const promises: Promise<HomeSearchResult[]>[] = [];
		for (const integrationModule of integrationModules) {
			if (
				integrationModule.isInitialized &&
				integrationModule.implementation.getSearchResultsProgress &&
				((integrationModule.definition.excludeFromSourceFilter ?? selectedSources.length === 0) ||
					selectedSources.includes(integrationModule.definition.title))
			) {
				promises.push(
					integrationModule.implementation.getSearchResultsProgress(query, lastResponse, options)
				);
			}
		}

		const promiseResults = await Promise.allSettled(promises);
		for (const promiseResult of promiseResults) {
			if (promiseResult.status === "fulfilled") {
				if (Array.isArray(promiseResult.value)) {
					homeResponse = homeResponse.concat(promiseResult.value);
				}
			} else {
				logger.error(promiseResult.reason);
			}
		}
	}

	return homeResponse;
}

/**
 * Get the help search entries for all the integration providers.
 * @returns The list of help entries.
 */
export async function getHelpSearchEntries(): Promise<HomeSearchResult[]> {
	if (!integrationProviderOptions) {
		logger.error("IntegrationProvider is not available, make sure your have called init");
		return [];
	}

	let results: HomeSearchResult[] = [];

	if (integrationProviderOptions.isManagementEnabled) {
		const commandKeyword = integrationProviderOptions.command ?? "integrations";
		const command = `/${commandKeyword}`;

		const helpEntry: HomeSearchResult = {
			key: "integration-provider-help",
			title: command,
			label: "Help",
			icon: integrationProviderOptions.icon,
			actions: [{ name: POPULATE_QUERY, hotkey: "enter" }],
			data: {
				providerId: "integration-provider",
				populateQuery: `/${integrationProviderOptions.command ?? "integrations"}`
			},
			template: CLITemplate.Custom,
			templateContent: await createHelp(
				command,
				[
					integrationProviderOptions.commandDescription ??
						`Allows the management of ${commandKeyword} for this platform. You can decide whether enabled integrations should be included when a query is entered.`
				],
				[command]
			)
		};

		results.push(helpEntry);
	}

	for (const integrationModule of integrationModules) {
		if (integrationModule.isInitialized && integrationModule.implementation.getHelpSearchEntries) {
			try {
				const helpSearchEntries = await integrationModule.implementation.getHelpSearchEntries();

				if (integrationHelpers?.setSearchQuery) {
					for (const helpEntry of helpSearchEntries) {
						if (helpEntry.data?.populateQuery) {
							helpEntry.actions = helpEntry.actions ?? [];
							helpEntry.actions.push({ name: POPULATE_QUERY, hotkey: "enter" });
						}
					}
				}

				results = results.concat(helpSearchEntries);
			} catch (err) {
				logger.error(`Failed creating search entries for module ${integrationModule.definition.id}`, err);
			}
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
	lastResponse: HomeSearchListenerResponse
): Promise<boolean> {
	if (result.data) {
		if (
			integrationHelpers?.setSearchQuery &&
			result.action.trigger === "user-action" &&
			result.action.name === POPULATE_QUERY &&
			isStringValue(result.data?.populateQuery)
		) {
			await integrationHelpers.setSearchQuery(result.data.populateQuery as string);
			return true;
		}

		if (result.data?.providerId === "integration-provider") {
			if (result.action.trigger === "user-action") {
				const integrationId: string = result.data.integrationId;
				const autoStart: boolean = result.data.autoStart;
				return updateIntegrationStatus(lastResponse, integrationId, !autoStart);
			}
			return false;
		}

		const foundIntegration = integrationModules.find((hi) => hi.definition.id === result.data?.providerId);
		if (foundIntegration?.implementation?.itemSelection) {
			return foundIntegration.implementation.itemSelection(result, lastResponse);
		}
	}

	return false;
}

/**
 * Get the home results for integration management.
 * @returns The home results.
 */
export async function getManagementResults(): Promise<HomeSearchResponse> {
	const homeResponse: HomeSearchResponse = {
		results: [],
		context: {
			filters: []
		}
	};

	if (!integrationProviderOptions) {
		logger.error("IntegrationProvider is not available, make sure your have called init");
		return homeResponse;
	}

	for (const integrationModule of integrationModules) {
		const result = await createResult(
			integrationModule.definition.id,
			integrationModule.definition.title,
			integrationModule.definition.description,
			integrationModule.definition.icon,
			integrationModule?.isInitialized ?? false
		);
		homeResponse.results.push(result);
	}

	if (homeResponse.results.length === 0) {
		const description =
			"You either have no integrations listed or none of them are enabled. Please check with support if you believe you should have access to integrations";
		const noEntries: HomeSearchResult = {
			key: "integration-provider-no-results",
			title: "No integrations available",
			data: {},
			actions: [],
			icon: integrationProviderOptions.icon,
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

/**
 * Set a preferences using an endpoint.
 * @param integrationId The integration id to set the preference for.
 * @param preferences The preferences for the integration.
 * @param preferences.autoStart The autoStart preference.
 */
async function setPreferences(integrationId: string, preferences: { autoStart: boolean }): Promise<void> {
	if (endpointProvider.hasEndpoint(INTEGRATIONS_PREFERENCE_ENDPOINT_SET)) {
		const versionInfo = await getVersionInfo();

		const success = await endpointProvider.action<EndpointIntegrationsPreferencesSetRequest>(
			INTEGRATIONS_PREFERENCE_ENDPOINT_SET,
			{
				platform: fin.me.identity.uuid,
				metaData: {
					version: {
						workspacePlatformClient: versionInfo.workspacePlatformClient,
						platformClient: versionInfo.platformClient
					}
				},
				id: integrationId,
				payload: preferences
			}
		);
		if (success) {
			logger.info(`Saved integration: ${integrationId} preference. AutoStart: ${preferences.autoStart}`);
		} else {
			logger.info(
				`Unable to save integration: ${integrationId} preference. AutoStart: ${preferences.autoStart}`
			);
		}
	}
}

/**
 * Get the preferences for the integration.
 * @param integrationId The integration to get the preferences for.
 * @returns The preferences if they exist.
 */
async function getPreferences(integrationId: string): Promise<{ autoStart: boolean } | undefined> {
	if (endpointProvider.hasEndpoint(INTEGRATIONS_PREFERENCE_ENDPOINT_GET)) {
		const preferences = await endpointProvider.requestResponse<
			EndpointIntegrationsPreferencesGetRequest,
			EndpointIntegrationsPreferencesGetResponse
		>(INTEGRATIONS_PREFERENCE_ENDPOINT_GET, {
			platform: fin.me.identity.uuid,
			id: integrationId
		});
		if (!isEmpty(preferences?.payload)) {
			logger.info(`Retrieved preference for integration: ${integrationId}`);
		} else {
			logger.info(`Unable to get preference for integration: ${integrationId}`);
		}
		return preferences?.payload;
	}
}

/**
 * Update the status of an integration result.
 * @param lastResponse The last response to use for the update.
 * @param integrationId The integration to update.
 * @param shouldAutoStart The autoStart flag.
 * @returns True if the integration status was updated.
 */
async function updateIntegrationStatus(
	lastResponse: HomeSearchListenerResponse,
	integrationId: string,
	shouldAutoStart: boolean
): Promise<boolean> {
	if (!integrationProviderOptions) {
		logger.error("IntegrationProvider is not available, make sure your have called init");
	}

	const integration = integrationModules.find((entry) => entry.definition.id === integrationId);
	if (isEmpty(integration)) {
		logger.warn(`Unable to find specified integration: ${integrationId} in enabled modules`);
		return false;
	}

	if (shouldAutoStart && !integration.isInitialized) {
		await initializeModule(integration, integrationHelpers);
	} else if (!shouldAutoStart && integration.isInitialized) {
		await closedownModule(integration);
	}

	const result = await createResult(
		integration.definition.id,
		integration.definition.title,
		integration.definition.description,
		integration.definition.icon,
		shouldAutoStart
	);
	lastResponse.respond([result]);

	await setPreferences(integration.definition.id, { autoStart: shouldAutoStart });

	return true;
}

/**
 * Create an integration result.
 * @param id The id of the integration.
 * @param name The name of the integration.
 * @param description The description of the integration.
 * @param icon The icon of the integration.
 * @param autoStart Does the integration auto start.
 * @returns The search result.
 */
async function createResult(
	id: string,
	name: string,
	description: string | undefined,
	icon: string | undefined,
	autoStart: boolean
): Promise<HomeSearchResult> {
	const buttonAction = autoStart ? "Turn Off Integration" : "Turn On Integration";

	return {
		key: `integration-${id}`,
		title: `${name}`,
		icon,
		actions: [],
		data: {
			providerId: "integration-provider",
			integrationId: id,
			autoStart
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
						await createButton(
							autoStart ? ButtonStyle.Primary : ButtonStyle.Secondary,
							"btnText",
							buttonAction
						)
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
				icon: icon ?? "",
				status: `Integration State: ${autoStart ? "On" : "Off"}`,
				btnText: buttonAction
			}
		}
	};
}
