import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { ExampleNotificationServiceProvider } from "./lifecycle";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	lifecycle: new ExampleNotificationServiceProvider()
};
