import { createLogger } from "./logger-provider";
import { initializeModule, loadModules } from "./modules";
import type { AuthProvider, AuthProviderOptions } from "./shapes/auth-shapes";
import type { ModuleHelpers } from "./shapes/module-shapes";
import { isEmpty } from "./utils";

const logger = createLogger("Auth");

let authOptions: AuthProviderOptions | undefined;
let authProvider: AuthProvider;
let isInitialized: boolean = false;
let authEnabled = false;

/**
 * Initialize the authentication provider.
 * @param options The options for the authentication provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(options: AuthProviderOptions | undefined, helpers: ModuleHelpers): Promise<void> {
	authOptions = options;
	if (isEmpty(authOptions)) {
		logger.info(
			"Unable to initialize authentication without settings. If this platform requires auth please ensure you have set the authProvider settings"
		);
		return;
	}

	if (!isInitialized) {
		isInitialized = true;

		const authModules = await loadModules<AuthProvider>(authOptions, "auth");
		if (authModules.length > 0) {
			if (authModules.length > 1) {
				logger.warn("You have more than one auth module enabled, only the first will be used");
			}

			await initializeModule<AuthProvider>(authModules[0], helpers);
			authProvider = authModules[0].implementation;
			authEnabled = true;
		}
	} else {
		logger.warn("The auth provider has already been initialized");
	}
}

/**
 * Is the authentication enabled.
 * @returns True if authentication is enabled.
 */
export function isAuthenticationEnabled(): boolean {
	return authEnabled;
}

/**
 * Subscribe to the authentication events.
 * @param to The event to subscribe to.
 * @param callback The callback to fire when the event occurs.
 * @returns A subscription id to unsubscribe with
 */
export function subscribe(
	to: "logged-in" | "before-logged-out" | "logged-out" | "session-expired",
	callback: (payload?: unknown) => Promise<void>
): string | undefined {
	if (isEmpty(authProvider)) {
		logger.warn("Please initialize auth before trying to use subscribe");
		return;
	}

	// If the subscription is for logged-in event then we wrap the callback
	// so that we can optionally pass the user info back to subscribers
	let wrappedCallback: (() => Promise<void>) | undefined;
	if (to === "logged-in") {
		wrappedCallback = async (): Promise<void> => {
			setTimeout(async () => {
				await callback(authOptions?.includeLoggedInUserInfo ?? true ? await getUserInfo() : undefined);
			}, 0);
		};
	}

	const subscriptionId = authProvider.subscribe(to, wrappedCallback ?? callback);

	// If we are already logged in then call the method immediately on the next refresh cycle
	if (to === "logged-in") {
		setTimeout(async () => {
			if (wrappedCallback && !(await isAuthenticationRequired())) {
				await wrappedCallback();
			}
		}, 0);
	}

	return subscriptionId;
}

/**
 * Unsubscribe the supplied subscription id.
 * @param subscriptionId Subscription id.
 * @returns True if the unsubscribe was successful.
 */
export function unsubscribe(subscriptionId: string): boolean {
	if (isEmpty(authProvider)) {
		logger.warn("Please initialize auth before trying to use unsubscribe");
		return false;
	}
	return authProvider.unsubscribe(subscriptionId);
}

/**
 * Start the login workflow for authentication.
 * @returns True if the login was successful.
 */
export async function login(): Promise<boolean> {
	if (isEmpty(authProvider)) {
		logger.warn("Please initialize auth before trying to use login");
		return false;
	}
	logger.info("Log in requested");
	return authProvider.login();
}

/**
 * Start the logout workflow.
 * @returns True if the logout was successful.
 */
export async function logout(): Promise<boolean> {
	if (isEmpty(authProvider)) {
		logger.warn("Please initialize auth before trying to use logout");
		return false;
	}
	logger.info("Log out requested");
	return authProvider.logout();
}

/**
 * Does the platform require authentication.
 * @returns True if authentication is required.
 */
export async function isAuthenticationRequired(): Promise<boolean> {
	if (isEmpty(authProvider)) {
		logger.info(
			"Auth may not be required for this app. If it is please initialize auth before trying to use isAuthenticationRequired"
		);
		return false;
	}
	logger.info("isAuthenticationRequired requested");
	return authProvider.isAuthenticationRequired();
}

/**
 * Get the user information for the logged in user.
 * @returns The user info.
 */
export async function getUserInfo(): Promise<unknown> {
	if (isEmpty(authProvider)) {
		logger.warn("Please initialize auth before trying to use getUserInfo");
		return null;
	}
	logger.info("getUserInfo requested");
	return authProvider.getUserInfo();
}
