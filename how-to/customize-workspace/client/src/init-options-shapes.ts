import type { ModuleImplementation, ModuleList } from "./module-shapes";

export interface InitOptionsHandler extends ModuleImplementation {
	supportedActions(): string[];
	action<T>(requestedAction: string, payload?: T): Promise<void>;
}

export interface UserAppConfigArgs {
	[key: string]: string;
}

export type InitOptionsProviderOptions = ModuleList;
