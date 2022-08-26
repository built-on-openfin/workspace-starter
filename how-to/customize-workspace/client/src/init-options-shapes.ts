import type { ModuleImplementation, ModuleList } from "./module-shapes";

export interface InitOptionsHandlerOptions {
	supportedActions: string[];
}

export interface InitOptionsHandler<O extends InitOptionsHandlerOptions = InitOptionsHandlerOptions>
	extends ModuleImplementation<O> {
	action<T>(requestedAction: string, payload?: T): Promise<void>;
}

export interface UserAppConfigArgs {
	[key: string]: string;
}

export type InitOptionsProviderOptions = ModuleList;
