import type { ModuleImplementation, ModuleTypes } from "../../../module-shapes";
import * as initOptionsImplementation from "./init-actions";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	initOptions: initOptionsImplementation
};
