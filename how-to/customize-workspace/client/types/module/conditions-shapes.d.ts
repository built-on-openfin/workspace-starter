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
/**
 * A list of modules that provide a set of conditions. The function for this
 * condition will return true or false to indicate if the condition is met.
 * Conditions are used in a number of places (for example menu options)
 * */
export type ConditionsProviderOptions = ModuleList;
