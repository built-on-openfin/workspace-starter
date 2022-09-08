import type { ModuleImplementation, ModuleTypes } from "../../module-shapes";
import { FactSetActions } from "./actions";
import { FactSetAuthProvider } from "./auth-provider";
import { FactSetConditions } from "./conditions";
import { FactSetIntegration } from "./integration";
import { FactSetLifecycle } from "./lifecycle";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	auth: new FactSetAuthProvider(),
	actions: new FactSetActions(),
	conditions: new FactSetConditions(),
	lifecycle: new FactSetLifecycle(),
	integrations: new FactSetIntegration()
};
