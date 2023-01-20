import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { ConsoleLogProvider } from "./log";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	log: new ConsoleLogProvider()
};
