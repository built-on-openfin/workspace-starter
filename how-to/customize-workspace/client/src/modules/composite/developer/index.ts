import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { DeveloperActions } from "./actions";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new DeveloperActions()
};
