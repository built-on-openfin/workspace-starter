import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { FavoriteLocalStorageProvider } from "./endpoint";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new FavoriteLocalStorageProvider()
};
