import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { WindowActions } from "./actions";
import { WindowMenus } from "./menus";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new WindowActions(),
	menus: new WindowMenus()
};
