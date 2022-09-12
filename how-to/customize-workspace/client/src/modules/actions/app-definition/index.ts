import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { AppDefinitionActions } from "./actions";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new AppDefinitionActions()
};
