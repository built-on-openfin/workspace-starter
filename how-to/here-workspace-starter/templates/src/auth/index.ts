import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { ExampleAuthProvider } from "./auth";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	auth: new ExampleAuthProvider()
};
