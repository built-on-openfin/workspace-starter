import type { ModuleImplementation, ModuleTypes } from "here-workspace-starter/shapes/module-shapes";
import { ChannelEndpoint } from "./endpoint";

export const entryPoints: { [type in ModuleTypes]?: ModuleImplementation } = {
	endpoint: new ChannelEndpoint()
};
