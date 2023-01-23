import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import * as initOptionsImplementation from "./init-options";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	initOptions: initOptionsImplementation
};
