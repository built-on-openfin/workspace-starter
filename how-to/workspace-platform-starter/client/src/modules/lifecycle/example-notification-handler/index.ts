import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ExampleNotificationHandlerProvider } from "./lifecycle";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	lifecycle: new ExampleNotificationHandlerProvider()
};
