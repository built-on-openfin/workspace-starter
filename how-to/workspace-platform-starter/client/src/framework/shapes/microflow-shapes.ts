import type { Microsoft365IntegrationConfig } from "@openfin/workspace-platform/client-api/src/integrations";
import type { ModuleDefinition } from "./module-shapes";
/**
 * A definition consisting of common settings across Microflows (similar to modules) to help describe the entry and a type and data that helps
 * identify the type of Microflow the entry is about.
 */
export interface MicroflowDefinition extends Omit<ModuleDefinition<Microsoft365IntegrationConfig>, "url"> {
	/**
	 * The types of supported Microflow
	 */
	type: "MS365";
}

/**
 * The options available when utilizing Microflows.
 */
export interface MicroflowProviderOptions {
	/**
	 * An array of Microflow definitions to use.
	 */
	microflows: MicroflowDefinition[];
}
