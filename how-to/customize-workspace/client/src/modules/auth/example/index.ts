import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import * as authImplementation from "./auth-provider";
import * as endpointImplementation from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	auth: authImplementation,
	endpoint: endpointImplementation
};
