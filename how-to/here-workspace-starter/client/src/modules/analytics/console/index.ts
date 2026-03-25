import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ConsoleAnalyticsModule } from "./analytics";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	analytics: new ConsoleAnalyticsModule()
};
