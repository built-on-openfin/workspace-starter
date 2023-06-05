import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { ExampleContextProcessorEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new ExampleContextProcessorEndpoint()
};
