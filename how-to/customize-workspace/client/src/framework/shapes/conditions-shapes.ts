import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

export interface ConditionMap {
	[id: string]: (platform: WorkspacePlatformModule) => Promise<boolean>;
}

export interface Conditions<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the conditions from the module.
	 */
	get(): Promise<ConditionMap>;
}

export type ConditionsProviderOptions = ModuleList;
