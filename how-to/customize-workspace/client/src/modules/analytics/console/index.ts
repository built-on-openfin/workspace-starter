import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { ConsoleAnalyticsModule } from "./analytics-module";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	analytics: new ConsoleAnalyticsModule()
};
