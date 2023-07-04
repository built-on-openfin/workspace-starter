import { Integrations } from "@openfin/workspace";
import type { WorkflowIntegration } from "@openfin/workspace-platform";
import { createLogger } from "../logger-provider";
import type { LowCodeIntegrationProviderOptions } from "../shapes/low-code-integration-shapes";
import { isEmpty } from "../utils";

const logger = createLogger("Low Code Integrations");

let lowCodeIntegrationProviderOptions: LowCodeIntegrationProviderOptions | undefined;
let lowCodeIntegrations: { [key: string]: WorkflowIntegration };
const requiresSearchInitialization: string[] = [];

/**
 * This function uses the passed configuration to create an instance of each required low code integration and
 * creates a list of low code integrations that still need their search integration initialized.
 */
async function initializeLowCodeIntegrations(): Promise<void> {
	const lowCodeDefinitions = lowCodeIntegrationProviderOptions?.lowCodeIntegrations ?? [];
	if (lowCodeDefinitions.length > 0) {
		logger.info("Initializing defined and enabled Low Code Integrations.");
	}
	for (const lowCodeDefinition of lowCodeDefinitions) {
		if (isEmpty(lowCodeDefinition.enabled) || lowCodeDefinition.enabled) {
			if (isEmpty(lowCodeIntegrations)) {
				lowCodeIntegrations = {};
			}
			switch (lowCodeDefinition.type) {
				case "ms365": {
					try {
						if (!isEmpty(lowCodeDefinition.data)) {
							const ms365Integration = new Integrations.Microsoft365WorkflowIntegration(
								lowCodeDefinition.data
							);
							lowCodeIntegrations[lowCodeDefinition.id] = ms365Integration;
							logger.info(`Initialized low code integration with id: ${lowCodeDefinition.id}`);
							if (lowCodeDefinition.data?.workflows?.search?.disableAutoInitialize) {
								requiresSearchInitialization.push(lowCodeDefinition.id);
								logger.info(
									`Low Code Integration with id: ${lowCodeDefinition.id} is not auto registered against home. Adding to the queue for later initialization.`
								);
							}
						} else {
							logger.warn(
								`Unable to initialize Low Code Integration with id: ${lowCodeDefinition.id} as it did not have a configuration specified via it's data setting.`
							);
						}
					} catch (error) {
						logger.error(
							`Error initializing Low Code Integration with id: ${lowCodeDefinition.id} and type: ${lowCodeDefinition.type}`,
							error
						);
					}
					break;
				}
				default: {
					logger.error(
						`Unable to add Low Code Integration definition with id: ${lowCodeDefinition.id} as the type: ${lowCodeDefinition.type} is unsupported.`
					);
				}
			}
		}
	}
}

/**
 * Initialize the Low Code Integration provider.
 * @param options Options for the Low Code Integration Provider.
 * @returns Nothing.
 */
export async function init(options: LowCodeIntegrationProviderOptions | undefined): Promise<void> {
	if (!isEmpty(options)) {
		logger.info("LowCodeIntegrationProvider initialized with options.");
		lowCodeIntegrationProviderOptions = options;
	}
}

/**
 * This function initializes the low code integration instances if not already initialized and
 * returns them as an array of instances.
 * @returns An array of WorkflowIntegrations.
 */
export async function register(): Promise<WorkflowIntegration[]> {
	if (isEmpty(lowCodeIntegrations)) {
		await initializeLowCodeIntegrations();
	}
	if (isEmpty(lowCodeIntegrations)) {
		return [];
	}
	return Object.values(lowCodeIntegrations);
}

/**
 * Called in order to initialize any low code integrations that were instantiated but not not automatically initialized.
 * @returns Nothing.
 */
export async function initializeWorkflows(): Promise<void> {
	if (requiresSearchInitialization.length > 0) {
		logger.info(`Registering ${requiresSearchInitialization.length} low code integrations against Home`);
		for (const id of requiresSearchInitialization) {
			try {
				logger.info(`Initializing workflow search for low code integration ${id}.`);
				await lowCodeIntegrations[id]?.initializeWorkflow("search");
				logger.info(`Workflow search for low code integration ${id} initialized.`);
			} catch (error) {
				logger.error(
					`Error initializing low code integration with id: ${id}. It had the following error`,
					error
				);
			}
		}
		requiresSearchInitialization.length = 0;
	}
}

/**
 * Determines whether or not we have at least one registered low code integration that has been initialized.
 * @returns Nothing
 */
export function hasRegisteredIntegrations(): boolean {
	return (
		!isEmpty(lowCodeIntegrations) &&
		Object.values(lowCodeIntegrations)?.length > 0 &&
		requiresSearchInitialization.length === 0
	);
}
