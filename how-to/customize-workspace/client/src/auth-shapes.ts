import type { ModuleImplementation, ModuleList } from "./module-shapes";

export interface AuthProvider extends ModuleImplementation {
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

export type AuthProviderOptions = ModuleList;
