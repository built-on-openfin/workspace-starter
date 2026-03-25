import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { ExampleInteropOverride } from "./interop-override";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	interopOverride: new ExampleInteropOverride()
};
