import type { ModuleImplementation, ModuleTypes } from "workspace-platform-starter/shapes/module-shapes";
import { ExampleAuthProvider } from "./auth";
import { ExampleAuthEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	auth: new ExampleAuthProvider(),
	endpoint: new ExampleAuthEndpoint()
};
