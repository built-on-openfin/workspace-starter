import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { LocalStorageEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new LocalStorageEndpoint()
};
