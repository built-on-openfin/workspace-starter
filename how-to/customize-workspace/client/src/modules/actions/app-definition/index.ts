import type { ModuleImplementation, ModuleTypes } from "../../../module-shapes";
import { AppDefinitionActions } from "./actions";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new AppDefinitionActions()
};
