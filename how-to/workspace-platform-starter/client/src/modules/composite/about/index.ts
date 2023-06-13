import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { AboutActions } from "./actions";
import { AboutConditions } from "./conditions";
import { AboutProvider } from "./integration";
import { AboutMenus } from "./menus";
import type { SharedState } from "./shapes";

const sharedState: SharedState = {};
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	integrations: new AboutProvider(),
	conditions: new AboutConditions(sharedState),
	actions: new AboutActions(sharedState),
	menus: new AboutMenus()
};
