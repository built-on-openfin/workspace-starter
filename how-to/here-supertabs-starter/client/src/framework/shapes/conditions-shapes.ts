import type OpenFin from "@openfin/core";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { DockButtonTypes } from "./dock-shapes";
import type { InitOptionsHandler, InitOptionsHandlerOptions } from "./init-options-shapes";
import type { MenuEntry } from "./menu-shapes";
import type { ModuleEntry, ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * Definition for conditions module type.
 */
export interface Conditions<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the conditions from the module.
	 * @returns Map of the conditions from the module.
	 */
	get(): Promise<ConditionMap>;
}

/**
 * A list of modules that provide a set of conditions. The function for this condition will return true or false to
 * indicate if the condition is met. Conditions are used in a number of places (for example menu options)
 */
export type ConditionsProviderOptions = ModuleList;

/**
 * The types that can call conditions.
 */
export type ConditionCallerTypes = "dock" | "browser" | "menu" | "init-options";

/**
 * Type for the context in condition callbacks.
 */
export interface ConditionContext {
	/**
	 * The caller of the condition check.
	 */
	callerType: ConditionCallerTypes;

	/**
	 * Data from the caller.
	 */
	customData?: unknown;
}

/**
 * Type for the dock context in condition callbacks.
 */
export interface ConditionContextDock extends ConditionContext {
	/**
	 * The caller of the condition check.
	 */
	callerType: "dock";

	/**
	 * Data from the caller.
	 */
	customData?: DockButtonTypes;
}

/**
 * Type for the browser context in condition callbacks.
 */
export interface ConditionContextBrowser extends ConditionContext {
	/**
	 * The caller of the condition check.
	 */
	callerType: "browser";

	/**
	 * Data from the caller.
	 */
	customData?: OpenFin.PlatformWindowCreationOptions;
}

/**
 * Type for the menu context in condition callbacks.
 */
export interface ConditionContextMenu extends ConditionContext {
	/**
	 * The caller of the condition check.
	 */
	callerType: "menu";

	/**
	 * Data from the caller.
	 */
	customData?: MenuEntry;
}

/**
 * Type for the init options context in condition callbacks.
 */
export interface ConditionContextInitOptions extends ConditionContext {
	/**
	 * The caller of the condition check.
	 */
	callerType: "init-options";

	/**
	 * Data from the caller.
	 */
	customData?: {
		/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
		module: ModuleEntry<InitOptionsHandler<InitOptionsHandlerOptions>, unknown, InitOptionsHandlerOptions>;
		supportedAction: string;
	};
}

/**
 * All the condition context types.
 */
export type ConditionContextTypes =
	| ConditionContextDock
	| ConditionContextBrowser
	| ConditionContextMenu
	| ConditionContextInitOptions;

/**
 * Callback that a condition must implement.
 */
export type ConditionCallback = (
	platform: WorkspacePlatformModule,
	context?: ConditionContextTypes
) => Promise<boolean>;

/**
 * Map containing conditions from the module.
 */
export interface ConditionMap {
	[id: string]: ConditionCallback;
}

/**
 * Condition client wrapper for module helpers.
 */
export interface ConditionsClient {
	/**
	 * Lets you check to see if a defined condition is true or false.
	 * @param conditionId The condition to check for.
	 * @param contextType What is the context for checking this condition.
	 * @returns whether the condition is true or false
	 */
	check(conditionId: string, contextType?: ConditionContextTypes): Promise<boolean>;

	/**
	 * Notify the platform that a condition has changed, a lifecycle event will be triggered.
	 * @param conditionId The id of the condition that has changed.
	 * @returns Nothing.
	 */
	changed(conditionId?: string): Promise<void>;
}
