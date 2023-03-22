import {
	ButtonStyle,
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeRegistration,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";
import { checkCondition } from "./conditions";
import * as endpointProvider from "./endpoint";
import { launch } from "./launch";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";
import {
	closedownModule,
	closedownModules,
	initializeModule,
	initializeModules,
	loadModules
} from "./modules";
import { launchPage, launchView } from "./platform/browser";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition,
	IntegrationProviderOptions
} from "./shapes/integrations-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import { share } from "./share";
import * as templateHelpers from "./templates";
import { createButton, createContainer, createHelp, createImage, createText, createTitle } from "./templates";

const logger = createLogger("Integrations");

let integrationProviderOptions: IntegrationProviderOptions;
let integrationModules: ModuleEntry<
	IntegrationModule,
	IntegrationHelpers,
	unknown,
	IntegrationModuleDefinition
>[] = [];
let integrationHelpers: IntegrationHelpers;

const POPULATE_QUERY = "Populate Query";

/**
 * Initialise all the integrations.
 * @param integrationOptions The integration provider settings.
 */
export async function init(
	options: IntegrationProviderOptions,
	helpers: ModuleHelpers,
	homeRegistration: HomeRegistration
): Promise<void> {
	if (options) {
		options.modules = options.modules ?? options.integrations;

		integrationProviderOptions = options;
		integrationHelpers = {
			...helpers,
			templateHelpers,
			launchView,
			launchPage,
			launchSnapshot: async (manifestUrl) =>
				launch({
					manifestType: manifestTypes.snapshot.id,
					manifest: manifestUrl,
					appId: "",
					title: "",
					icons: null,
					publisher: null
				}),
			openUrl: async (url) => fin.System.openUrlWithBrowser(url),
			setSearchQuery: homeRegistration.setSearchQuery
				? async (query) => homeRegistration.setSearchQuery(query)
				: undefined,
			condition: async (conditionId) => {
				const platform = getCurrentSync();
				return checkCondition(platform, conditionId);
			},
			share,
			getPlatform: getCurrentSync
		};

		// Map the old moduleUrl properties to url
		for (const integration of options.modules) {
			integration.url = integration.url ?? integration.moduleUrl;
			delete integration.moduleUrl;
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
			const integrationPreference = await getPreference(integration.definition.id);
			integration.definition.autoStart =
				integrationPreference?.autoStart ?? integration.definition.autoStart ?? true;
			if (integration.definition.autoStart) {
				initModules.push(integration);
			}
		}

		// Initialize just the auto start modules
		await initializeModules(initModules, integrationHelpers);
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
 * @returns The search results and new filters.
 */
export async function getSearchResults(
	query: string,
	filters: CLIFilter[],
	lastResponse: HomeSearchListenerResponse,
	selectedSources: string[],
	options: {
		queryMinLength: number;
		queryAgainst: string[];
	}
): Promise<HomeSearchResponse & { sourceFilters?: string[] }> {
	const homeResponse: HomeSearchResponse & { sourceFilters?: string[] } = {
		results: [],
		context: {
			filters: []
		},
		sourceFilters: []
	};

	if (!integrationProviderOptions) {
		return homeResponse;
	}

	if (
		integrationProviderOptions.isManagementEnabled &&
		query.startsWith(`/${integrationProviderOptions.command ?? "integrations"}`)
	) {
		return getManagementResults();
	}

	const promises: Promise<HomeSearchResponse>[] = [];
	const sourceFilters: string[] = [];
	for (const integrationModule of integrationModules) {
		if (
			integrationModule.isInitialised &&
			integrationModule.implementation.getSearchResults &&
			(integrationModule.definition.excludeFromSourceFilter ||
				selectedSources.length === 0 ||
				selectedSources.includes(integrationModule.definition.title))
		) {
			promises.push(integrationModule.implementation.getSearchResults(query, filters, lastResponse, options));
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

	return {
		...homeResponse,
		sourceFilters
	};
}

/**
 * Get the help search entries for all the integration providers.
 * @returns The list of help entries.
 */
export async function getHelpSearchEntries(): Promise<HomeSearchResult[]> {
	if (!integrationProviderOptions) {
		logger.error("IntegrationProvider is not available, make sure your have called init");
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
			actions: [],
			data: {
				providerId: "integration-provider"
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
		if (integrationModule.isInitialised && integrationModule.implementation.getHelpSearchEntries) {
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
	lastResponse?: HomeSearchListenerResponse
): Promise<boolean> {
	if (result.data) {
		if (
			integrationHelpers?.setSearchQuery &&
			result.action.trigger === "user-action" &&
			result.action.name === POPULATE_QUERY &&
			typeof result.data?.populateQuery === "string"
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
			const handled = await foundIntegration.implementation.itemSelection(result, lastResponse);

			if (!handled) {
				logger.warn(`Error while trying to handle ${foundIntegration.definition.id} entry`, result.data);
			}

			return handled;
		}
	}

	return false;
}

export async function getManagementResults(): Promise<HomeSearchResponse> {
	if (!integrationProviderOptions) {
		logger.error("IntegrationProvider is not available, make sure your have called init");
	}

	const homeResponse: HomeSearchResponse = {
		results: [],
		context: {
			filters: []
		}
	};

	for (const integrationModule of integrationModules) {
		const result = await createResult(
			integrationModule.definition.id,
			integrationModule.definition.title,
			integrationModule.definition.description,
			integrationModule.definition.icon,
			integrationModule?.isInitialised ?? false
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

async function setPreference(integrationId: string, autoStart: boolean) {
	const integrationPreferenceEndpointId = "integration-preferences-set";
	if (endpointProvider.hasEndpoint(integrationPreferenceEndpointId)) {
		const success = await endpointProvider.action<{ id: string; payload: { autoStart: boolean } }>(
			integrationPreferenceEndpointId,
			{ id: integrationId, payload: { autoStart } }
		);
		if (success) {
			logger.info(`Saved integration: ${integrationId} preference. AutoStart: ${autoStart}`);
		} else {
			logger.info(`Unable to save integration: ${integrationId} preference. AutoStart: ${autoStart}`);
		}
	}
}

async function getPreference(integrationId: string): Promise<{ autoStart: boolean }> {
	const integrationPreferenceEndpointId = "integration-preferences-get";
	if (endpointProvider.hasEndpoint(integrationPreferenceEndpointId)) {
		const preference = await endpointProvider.requestResponse<{ id: string }, { autoStart: boolean }>(
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
	shouldAutoStart: boolean
): Promise<boolean> {
	if (!integrationProviderOptions) {
		logger.error("IntegrationProvider is not available, make sure your have called init");
	}

	const integration = integrationModules.find((entry) => entry.definition.id === integrationId);
	if (integration === undefined) {
		logger.warn(`Unable to find specified integration: ${integrationId} in enabled modules`);
		return false;
	}

	if (shouldAutoStart && !integration.isInitialised) {
		await initializeModule(integration, integrationHelpers);
	} else if (!shouldAutoStart && integration.isInitialised) {
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

	await setPreference(integration.definition.id, shouldAutoStart);

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
	description: string,
	icon: string,
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
				icon,
				status: `Integration State: ${autoStart ? "On" : "Off"}`,
				btnText: buttonAction
			}
		}
	};
}
