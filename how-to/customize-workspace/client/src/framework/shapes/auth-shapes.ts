import type { ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * The types of events that an auth provider can emit.
 */
export type AuthEventTypes = "logged-in" | "before-logged-out" | "logged-out" | "session-expired";

/**
 * Definition for module which provides authentication features.
 */
export interface AuthProvider<O = unknown, H = unknown> extends ModuleImplementation<O, H> {
	/**
	 * Subscribe to one of the auth events.
	 * @param to The event to subscribe to.
	 * @param callback The callback to fire when the event occurs.
	 * @returns Subscription id for unsubscribing or undefined if event type is not available.
	 */
	subscribe(to: AuthEventTypes, callback: () => Promise<void>): string | undefined;

	/**
	 * Unsubscribe from an already subscribed event.
	 * @param subscriptionId The id of the subscription returned from subscribe.
	 * @returns True if the unsubscribe was successful.
	 */
	unsubscribe(subscriptionId: string): boolean;

	/**
	 * Does the auth provider require authentication.
	 * @returns True if authentication is required.
	 */
	isAuthenticationRequired(): Promise<boolean>;

	/**
	 * Perform the login operation on the auth provider.
	 * @returns True if the login was successful.
	 */
	login(): Promise<boolean>;

	/**
	 * Perform the logout operation on the auth provider.
	 * @returns True if the logout was successful.
	 */
	logout(): Promise<boolean>;

	/**
	 * Get user information from the auth provider.
	 */
	getUserInfo<T>(): Promise<T>;
}

export type AuthProviderOptions = ModuleList;
