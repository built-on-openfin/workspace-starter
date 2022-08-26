import type { ModuleImplementation, ModuleTypes } from "../../../module-shapes";
import { ConsoleLogProvider } from "./log-provider";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	log: new ConsoleLogProvider()
};
