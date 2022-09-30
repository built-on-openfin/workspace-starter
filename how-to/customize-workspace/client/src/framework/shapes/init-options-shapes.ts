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

export type InitOptionsProviderOptions = ModuleList;
