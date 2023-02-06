import type { ModuleImplementation, ModuleTypes } from "../../shapes/module-shapes";
import { SalesforceIntegrationProvider } from "./integration-provider";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	integrations: new SalesforceIntegrationProvider()
};
