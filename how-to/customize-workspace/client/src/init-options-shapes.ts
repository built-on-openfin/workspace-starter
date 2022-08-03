export interface InitOptionsHandler {
	init(data?: unknown): Promise<void>;
	action<T>(requestedAction: string, payload?: T): Promise<void>;
}
export interface InitOptionsModule {
	handler: InitOptionsHandler;
}

export interface InitOptionsModuleDefinition {
	id: string;
	url: string;
	data?: unknown;
	supportedActions: string[];
}
export interface InitOptionsProviderOptions {
	modules?: InitOptionsModuleDefinition[];
}

export interface UserAppConfigArgs {
	[key: string]: string;
}
