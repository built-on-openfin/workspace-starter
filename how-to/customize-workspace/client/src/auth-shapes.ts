export interface AuthProvider {
	init<T>(options: T): Promise<void>;
	isAuthenticationRequired(callback: (authenticationRequired: boolean) => void): Promise<boolean>;
	login(): Promise<boolean>;
	logout(): Promise<boolean>;
	setLogger(
		info: (message: string) => void,
		warn: (message: string) => void,
		error: (message: string) => void
	): void;
	getUserInfo<T>(): Promise<T>;
}

export interface AuthModule {
	authProvider: AuthProvider;
}

export interface AuthModuleDefinition {
	id: string;
	url: string;
	data?: unknown;
}

export interface AuthProviderOptions {
	modules?: AuthModuleDefinition[];
	authProviderId?: string;
}
