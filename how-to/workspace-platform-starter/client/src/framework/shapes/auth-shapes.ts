import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * Auth Provider Options. Specify a single auth module if your application requires authentication before allowing the
 * user to use the platform.
 */
export type AuthProviderOptions = ModuleList;

/**
 * Definition for module which provides authentication features.
 */
export interface AuthProvider<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
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
	 * @returns The user information, the type is unknown as it is dependent on the auth provider.
	 */
	getUserInfo(): Promise<unknown>;
}

/**
 * The types of events that an auth provider can emit.
 */
export type AuthEventTypes = "logged-in" | "before-logged-out" | "logged-out" | "session-expired";
