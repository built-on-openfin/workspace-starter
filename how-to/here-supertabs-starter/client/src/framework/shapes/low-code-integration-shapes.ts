import type { Microsoft365IntegrationConfig } from "@openfin/workspace-platform/client-api/src/integrations";
import type { ModuleDefinition } from "./module-shapes";
/**
 * A definition consisting of common settings across Low Code integrations (similar to modules) to help describe the entry and a type and data that helps
 * identify the type of Low Code integration the entry is about.
 */
export interface LowCodeIntegrationDefinition
	extends Omit<ModuleDefinition<Microsoft365IntegrationConfig>, "url"> {
	/**
	 * The types of supported Low Code Integration
	 */
	type: "ms365";
}

/**
 * The options available when utilizing Low Code Integrations.
 */
export interface LowCodeIntegrationProviderOptions {
	/**
	 * An array of low code integration definitions to use.
	 */
	modules: LowCodeIntegrationDefinition[];
}
