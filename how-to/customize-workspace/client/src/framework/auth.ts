import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type { AuthProvider, AuthProviderOptions } from "./shapes/auth-shapes";

const logger = createLogger("Auth");

let authProvider: AuthProvider;
let authOptions: AuthProviderOptions;
let authEnabled = false;

export function isAuthenticationEnabled() {
	return authEnabled;
}

export async function init(options: AuthProviderOptions) {
	authOptions = options;
	if (authOptions === undefined || authOptions === null) {
		logger.info(
			"Unable to initialize authentication without settings. If this platform requires auth please ensure you have set the authProvider settings"
		);
		return;
	}

	if (authProvider === undefined) {
		const authModules = await loadModules<AuthProvider>(authOptions, "auth");
		await initializeModules<AuthProvider>(authModules);

		if (authModules.length > 1) {
			logger.warn("You have more than one auth module enabled, only the first will be used");
		}

		if (authModules.length > 0) {
			authProvider = authModules[0].implementation;
			authEnabled = true;
		}
	} else {
		logger.warn("The auth provider has already been initialized");
	}
}

export function subscribe(
	to: "logged-in" | "before-logged-out" | "logged-out" | "session-expired",
	callback: () => Promise<void>
): string {
	if (authProvider === undefined) {
		logger.warn("Please initialize auth before trying to use subscribe");
		return null;
	}
	return authProvider.subscribe(to, callback);
}

export function unsubscribe(from: string) {
	if (authProvider === undefined) {
		logger.warn("Please initialize auth before trying to use unsubscribe");
		return null;
	}
	return authProvider.unsubscribe(from);
}

export async function login(): Promise<boolean> {
	if (authProvider === undefined) {
		logger.warn("Please initialize auth before trying to use login");
		return false;
	}
	logger.info("Log in requested");
	return authProvider.login();
}

export async function logout(): Promise<boolean> {
	if (authProvider === undefined) {
		logger.warn("Please initialize auth before trying to use logout");
		return false;
	}
	logger.info("Log out requested");
	return authProvider.logout();
}

export async function isAuthenticationRequired(): Promise<boolean> {
	if (authProvider === undefined) {
		logger.info(
			"Auth may not be required for this app. If it is please initialize auth before trying to use isAuthenticationRequired"
		);
		return false;
	}
	logger.info("isAuthenticationRequired requested");
	return authProvider.isAuthenticationRequired();
}

export async function getUserInfo<T>(): Promise<T> {
	if (authProvider === undefined) {
		logger.warn("Please initialize auth before trying to use getUserInfo");
		return null;
	}
	logger.info("getUserInfo requested");
	return getUserInfo<T>();
}
