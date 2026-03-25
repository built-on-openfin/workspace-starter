import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ViewPositionContentCreationProvider } from "./content-creation";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	contentCreation: new ViewPositionContentCreationProvider()
};
