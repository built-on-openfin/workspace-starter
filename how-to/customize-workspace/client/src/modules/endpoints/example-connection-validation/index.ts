import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { ConnectionValidationEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new ConnectionValidationEndpoint()
};
