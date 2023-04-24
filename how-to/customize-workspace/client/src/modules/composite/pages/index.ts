import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { PageActions } from "./actions";
import { PageMenus } from "./menus";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new PageActions(),
	menus: new PageMenus()
};
