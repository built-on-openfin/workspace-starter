import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { FavoritesMenuProvider } from "./actions";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new FavoritesMenuProvider()
};
