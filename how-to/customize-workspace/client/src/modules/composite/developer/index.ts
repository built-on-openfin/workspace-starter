import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { DeveloperActions } from "./actions";
import { DevAnalyticsModule } from "./analytics";
import { DeveloperMenus } from "./menus";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new DeveloperActions(),
	analytics: new DevAnalyticsModule(),
	menus: new DeveloperMenus()
};
