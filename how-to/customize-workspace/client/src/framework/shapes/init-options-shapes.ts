import type { ModuleImplementation, ModuleList } from "./module-shapes";

export type InitOptionsLifecycle = "after-auth" | "after-bootstrap";

export interface InitOptionsHandlerOptions {
	supportedActions: string[];
	conditions?: string[];
	lifecycle?: InitOptionsLifecycle;
}

export interface InitOptionsHandler<O extends InitOptionsHandlerOptions = InitOptionsHandlerOptions>
	extends ModuleImplementation<O> {
	action(requestedAction: string, payload?: unknown): Promise<void>;
}

export interface UserAppConfigArgs {
	[key: string]: string;
}

/**
 * InitOptions Provider Options.
 * This is a list of modules that will be loaded and used to handle init params
 * (similar to query strings). The module data setting needs to specify
 * "supportedActions" and this should be an array of strings of the actions this module
 * supports. The init params used must specify action (which would map onto the action
 * supported) by your module and optionally payload if your module supports being passed
 * a payload (this should be a base64 encoded object when passed via init params).
 */
export type InitOptionsProviderOptions = ModuleList;
