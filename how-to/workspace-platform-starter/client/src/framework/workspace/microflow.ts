import { Integrations } from "@openfin/workspace";
import type { WorkflowIntegration } from "@openfin/workspace-platform";
import { createLogger } from "../logger-provider";
import type { MicroflowProviderOptions } from "../shapes/microflow-shapes";
import { isEmpty } from "../utils";

const logger = createLogger("Microflows");

let microflowOptions: MicroflowProviderOptions | undefined;
let microflows: { [key: string]: WorkflowIntegration };
const requiresSearchInitialization: string[] = [];

/**
 * This function uses the passed configuration to create an instance of each required microflow and
 * creates a list of microflows that still need their search integration initialized.
 */
async function initializeMicroflows(): Promise<void> {
	const microflowDefinitions = microflowOptions?.microflows ?? [];
	if (microflowDefinitions.length > 0) {
		logger.info("Initializing defined and enabled Microflows.");
	}
	for (const microflowDefinition of microflowDefinitions) {
		if (isEmpty(microflowDefinition.enabled) || microflowDefinition.enabled) {
			if (isEmpty(microflows)) {
				microflows = {};
			}
			switch (microflowDefinition.type) {
				case "ms365": {
					try {
						if (!isEmpty(microflowDefinition.data)) {
							const ms365Microflow = new Integrations.Microsoft365WorkflowIntegration(
								microflowDefinition.data
							);
							microflows[microflowDefinition.id] = ms365Microflow;
							logger.info(`Initialized microflow with id: ${microflowDefinition.id}`);
							if (microflowDefinition.data?.workflows?.search?.disableAutoInitialize) {
								requiresSearchInitialization.push(microflowDefinition.id);
								logger.info(
									`Microflow with id: ${microflowDefinition.id} is not auto registered against home. Adding to the queue for later initialization.`
								);
							}
						} else {
							logger.warn(
								`Unable to initialize microflow with id: ${microflowDefinition.id} as it did not have a configuration specified via it's data setting.`
							);
						}
					} catch (error) {
						logger.error(
							`Error initializing microflow with id: ${microflowDefinition.id} and type: ${microflowDefinition.type}`,
							error
						);
					}
					break;
				}
				default: {
					logger.error(
						`Unable to add microflow definition with id: ${microflowDefinition.id} as the type: ${microflowDefinition.type} is unsupported.`
					);
				}
			}
		}
	}
}

/**
 * Initialize the microflow provider.
 * @param options Options for the microflow provider.
 * @returns Nothing.
 */
export async function init(options: MicroflowProviderOptions | undefined): Promise<void> {
	if (!isEmpty(options)) {
		logger.info("MicroflowProvider initialized with options.");
	}
	microflowOptions = options;
}

/**
 * This function initializes the microflow instances if not already initialized and
 * returns them as an array of instances.
 * @returns An array of WorkflowIntegrations.
 */
export async function register(): Promise<WorkflowIntegration[]> {
	if (isEmpty(microflows)) {
		await initializeMicroflows();
	}
	if (isEmpty(microflows)) {
		return [];
	}
	return Object.values(microflows);
}

/**
 * Called in order to initialize any microflows that were instantiated but not not automatically initialized.
 * @returns Nothing.
 */
export async function initializeWorkflows(): Promise<void> {
	if (requiresSearchInitialization.length > 0) {
		logger.info(`Registering ${requiresSearchInitialization.length} microflows against Home`);
		for (const id of requiresSearchInitialization) {
			try {
				logger.info(`Initializing workflow search for microflow ${id}.`);
				await microflows[id]?.initializeWorkflow("search");
				logger.info(`Workflow search for microflow ${id} initialized.`);
			} catch (error) {
				logger.error(`Error initializing microflow with id: ${id}. It had the following error`, error);
			}
		}
		requiresSearchInitialization.length = 0;
	}
}

/**
 * Determines whether or not we have at least one registered microflow that has been initialized.
 * @returns Nothing
 */
export function hasRegisteredMicroflows(): boolean {
	return (
		!isEmpty(microflows) && Object.values(microflows)?.length > 0 && requiresSearchInitialization.length === 0
	);
}
