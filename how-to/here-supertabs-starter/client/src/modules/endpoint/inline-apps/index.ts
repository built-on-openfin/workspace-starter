import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { InlineAppModuleEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new InlineAppModuleEndpoint()
};
