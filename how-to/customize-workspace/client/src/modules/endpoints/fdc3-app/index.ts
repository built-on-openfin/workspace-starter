import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import * as endpointImplementation from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: endpointImplementation
};
