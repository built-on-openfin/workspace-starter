import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { ExampleContextProcessorEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new ExampleContextProcessorEndpoint()
};
