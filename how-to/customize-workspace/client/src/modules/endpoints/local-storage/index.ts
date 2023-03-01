import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { LocalStorageEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new LocalStorageEndpoint()
};
