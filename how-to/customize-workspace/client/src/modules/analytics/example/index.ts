import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { ExampleConsoleAnalyticsModule } from "./analytics-module";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	analytics: new ExampleConsoleAnalyticsModule()
};
