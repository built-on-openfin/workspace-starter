import type { ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * InitOptions Provider Options. This is a list of modules that will be loaded and used to handle init params (similar
 * to query strings). The module data setting needs to specify "supportedActions" and this should be an array of strings
 * of the actions this module supports. The init params used must specify action (which would map onto the action
 * supported) by your module and optionally payload if your module supports being passed a payload (this should be a
 * base64 encoded object when passed via init params).
 */
export type InitOptionsProviderOptions = ModuleList;

/**
 * Module definition for init options handler.
 */
export interface InitOptionsHandler<O extends InitOptionsHandlerOptions = InitOptionsHandlerOptions>
	extends ModuleImplementation<O> {
	/**
	 * Handle the init options action.
	 * @param requestedAction The requested action.
	 * @param payload The payload for the action.
	 * @returns Nothing.
	 */
	action(requestedAction: string, payload?: unknown): Promise<void>;
}

/**
 * The lifecycle operations that can be used to initialize the handlers.
 */
export type InitOptionsLifecycle = "after-auth" | "after-bootstrap";

/**
 * The options for the init options handler.
 */
export interface InitOptionsHandlerOptions {
	/**
	 * The supported actions.
	 */
	supportedActions: string[];

	/**
	 * Conditions to check to the handlers.
	 */
	conditions?: string[];

	/**
	 * The handler only operates for this specific lifecycle operation.
	 */
	lifecycle?: InitOptionsLifecycle;
}

/**
 * The config type for init options.
 */
export interface UserAppConfigArgs {
	[key: string]: string;
}
