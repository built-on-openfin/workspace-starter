import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ExampleIntegrationsProvider } from "./integrations";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	integrations: new ExampleIntegrationsProvider()
};
