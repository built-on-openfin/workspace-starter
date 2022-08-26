import type { ModuleImplementation, ModuleTypes } from "../../../module-shapes";
import { OpacityActions } from "./actions";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new OpacityActions()
};
