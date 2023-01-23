import type { ModuleImplementation, ModuleTypes } from "customize-workspace/shapes/module-shapes";
import { DeveloperActions } from "./actions";
import { DevAnalyticsModule } from "./analytics";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new DeveloperActions(),
	analytics: new DevAnalyticsModule()
};
