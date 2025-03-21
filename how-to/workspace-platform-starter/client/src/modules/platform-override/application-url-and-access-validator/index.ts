import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ApplicationUrlAndAccessValidator } from "./platform-override";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	platformOverride: new ApplicationUrlAndAccessValidator()
};
