import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { PageActions } from "./actions";
import { InitOptionsShowPageHandler } from "./init-options";
import { PageMenus } from "./menus";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new PageActions(),
	menus: new PageMenus(),
	initOptions: new InitOptionsShowPageHandler()
};
