import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { DefaultWorkspaceActions } from "./actions";
import { ApplyDefaultWorkspaceProvider } from "./lifecycle";
import { SetDefaultWorkspaceProvider } from "./menus";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	menus: new SetDefaultWorkspaceProvider(),
	lifecycle: new ApplyDefaultWorkspaceProvider(),
	actions: new DefaultWorkspaceActions()
};
