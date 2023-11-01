import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { InitOptionsLaunchWorkspaceHandler } from "./init-options";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	initOptions: new InitOptionsLaunchWorkspaceHandler()
};
