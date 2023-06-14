import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ExampleLogProvider } from "./log";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	log: new ExampleLogProvider()
};
