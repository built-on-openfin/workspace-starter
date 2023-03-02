import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { FDC3AppMapperEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new FDC3AppMapperEndpoint()
};
