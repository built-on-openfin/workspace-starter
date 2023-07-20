import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { InitOptionsInteropHandler } from "./init-options";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	initOptions: new InitOptionsInteropHandler()
};
