import type { ModuleImplementation, ModuleTypes } from "../../../module-shapes";
import { ConsoleLogProvider } from "./logProvider";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	log: new ConsoleLogProvider()
};
