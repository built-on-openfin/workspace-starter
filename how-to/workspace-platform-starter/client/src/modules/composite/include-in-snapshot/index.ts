import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { IncludeInSnapshotActionsProvider } from "./actions";
import { IncludeInSnapshotConditionsProvider } from "./conditions";

/**
 * Define the entry points for the module.
 */
export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	actions: new IncludeInSnapshotActionsProvider(),
	conditions: new IncludeInSnapshotConditionsProvider()
};
