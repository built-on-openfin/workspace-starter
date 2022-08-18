import { Logger } from "./logger-shapes";

export interface AuthProvider {
	init<T>(options: T, logger: Logger): Promise<void>;
	subscribe(
		to: "logged-in" | "before-logged-out" | "logged-out" | "session-expired",
		callback: () => Promise<void>
	): string;
	unsubscribe(from: string): void;
	isAuthenticationRequired(): Promise<boolean>;
	login(): Promise<boolean>;
	logout(): Promise<boolean>;
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
