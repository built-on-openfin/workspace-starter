import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { DynamicMenuProvider } from "./actions";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new DynamicMenuProvider()
};
