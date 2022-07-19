import { AuthModule, AuthProvider, AuthProviderOptions } from "./auth-shapes";

let logInfo = console.log;
let logWarning = console.warn;
let logError = console.error;
let authProvider: AuthProvider;
let authOptions: AuthProviderOptions;
let authEnabled = false;

export function isAuthenticationEnabled() {
	return authEnabled;
}

export async function init(options: AuthProviderOptions) {
	authOptions = options;
	if (authOptions === undefined || authOptions === null) {
		logInfo(
			"Unable to initialize authentication without settings. If this platform requires auth please ensure you have set the authProvider settings."
		);
		return;
	}

	if (authProvider === undefined) {
		if (
			authOptions.authProviderId !== undefined &&
			authOptions.authProviderId !== null &&
			authOptions.authProviderId.trim() !== "" &&
			Array.isArray(authOptions.modules)
		) {
			const moduleDefinition = authOptions.modules.find((entry) => entry.id === authOptions.authProviderId);
			if (moduleDefinition === undefined) {
				logWarning(`Specified Auth Module Id: ${authOptions.authProviderId} is not available.`);
				return;
			}

			try {
				const mod: AuthModule = await import(/* webpackIgnore: true */ moduleDefinition.url);
				authProvider = mod.authProvider;
				await authProvider.init(moduleDefinition.data);
				authEnabled = true;
				logInfo("Auth: Auth provider module initialized.");
			} catch (err) {
				logError(
					`Error loading module ${options.authProviderId} with url ${moduleDefinition.url}: ${err.message}`
				);
			}
		} else {
			logError("You must provide an authProvider id and a matching module to the auth init function.");
		}
	} else {
		logWarning("The auth provider has already been initialized.");
	}
}

export function subscribe(
	to: "logged-in" | "before-logged-out" | "logged-out" | "session-expired",
	callback: () => Promise<void>
): string {
	if (authProvider === undefined) {
		logWarning("Auth: Please initialize auth before trying to use subscribe.");
		return null;
	}
	return authProvider.subscribe(to, callback);
}

export function unsubscribe(from: string) {
	if (authProvider === undefined) {
		logWarning("Auth: Please initialize auth before trying to use unsubscribe.");
		return null;
	}
	return authProvider.unsubscribe(from);
}

export async function login(): Promise<boolean> {
	if (authProvider === undefined) {
		logWarning("Auth: Please initialize auth before trying to use login.");
		return false;
	}
	logInfo("Auth: Log in requested.");
	return authProvider.login();
}

export async function logout(): Promise<boolean> {
	if (authProvider === undefined) {
		logWarning("Auth: Please initialize auth before trying to use logout.");
		return false;
	}
	logInfo("Auth: Log out requested.");
	return authProvider.logout();
}

export async function isAuthenticationRequired(): Promise<boolean> {
	if (authProvider === undefined) {
		logInfo(
			"Auth: Auth may not be required for this app. If it is please initialize auth before trying to use isAuthenticationRequired."
		);
		return false;
	}
	logInfo("Auth: isAuthenticationRequired requested.");
	return authProvider.isAuthenticationRequired();
}

export async function getUserInfo<T>(): Promise<T> {
	if (authProvider === undefined) {
		logWarning("Auth: Please initialize auth before trying to use getUserInfo.");
		return null;
	}
	logInfo("Auth: getUserInfo requested.");
	return getUserInfo<T>();
}

export function setLogger(
	info: (message: string) => void,
	warn: (message: string) => void,
	error: (message: string) => void
): void {
	if (authProvider === undefined) {
		if (warn !== undefined) {
			warn("Auth: Please initialize auth before trying to use setLogger.");
		} else {
			logWarning("Auth: Please initialize auth before trying to use setLogger.");
		}
		return;
	}
	if (info !== undefined) {
		logInfo = info;
	}
	if (warn !== undefined) {
		logWarning = warn;
	}
	if (error !== undefined) {
		logError = error;
	}
	authProvider.setLogger(logInfo, logWarning, logError);
}
