import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { InitOptionsLaunchAppHandler } from "./init-options";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	initOptions: new InitOptionsLaunchAppHandler()
};
