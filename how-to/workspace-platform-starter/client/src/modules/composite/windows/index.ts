import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { WindowActions } from "./actions";
import { WindowMenus } from "./menus";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new WindowActions(),
	menus: new WindowMenus()
};
