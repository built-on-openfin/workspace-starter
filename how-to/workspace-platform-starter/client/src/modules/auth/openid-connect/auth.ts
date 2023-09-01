import {
	authenticate,
	enableLogging,
	validateIdToken,
	type OidcAuthenticationResult,
	type UserInfoClaims
} from "@openfin/openid-connect";
import type { AuthEventTypes, AuthProvider } from "workspace-platform-starter/shapes/auth-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { formatError, isEmpty, isNumber, isStringValue, randomUUID } from "workspace-platform-starter/utils";
import type { OpenIdConnectProviderOptions } from "./shapes";

/**
 * Implementation for the openid connect auth provider.
 */
export class OpenIdConnectProvider implements AuthProvider<OpenIdConnectProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<OpenIdConnectProviderOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Map a subscription id to an event.
	 * @internal
	 */
	private readonly _subscribeIdMap: { [key: string]: AuthEventTypes };

	/**
	 * Callbacks for event subscribers.
	 * @internal
	 */
	private readonly _eventSubscribers: { [event in AuthEventTypes]?: { [id: string]: () => Promise<void> } };

	/**
	 * The result of the authentication request.
	 */
	private _authResult: OidcAuthenticationResult | undefined;

	/**
	 * Session expiry timer.
	 */
	private _sessionExpiryTimerId: number | undefined;

	/**
	 * Create a new instance of OpenIdConnectProvider.
	 */
	constructor() {
		this._subscribeIdMap = {};
		this._eventSubscribers = {};
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<OpenIdConnectProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("OpenIdConnectProvider");

		this._logger.info("Initializing");

		if (this._definition.data?.enableLogging) {
			enableLogging();
		}

		const providerUrl = this._definition.data?.providerUrl;
		const clientId = this._definition.data?.clientId;
		const loginRedirectUrl = this._definition.data?.loginRedirectUrl;
		const logoutRedirectUrl = this._definition.data?.logoutRedirectUrl;

		if (!isStringValue(providerUrl)) {
			this._logger.error("providerUrl is not configured");
		}

		if (!isStringValue(clientId)) {
			this._logger.error("ClientId is not configured");
		}

		if (!isStringValue(loginRedirectUrl)) {
			this._logger.error("loginRedirectUrl is not configured");
		}

		if (!isStringValue(logoutRedirectUrl)) {
			this._logger.error("logoutRedirectUrl is not configured");
		}
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		if (this._sessionExpiryTimerId) {
			window.clearTimeout(this._sessionExpiryTimerId);
			this._sessionExpiryTimerId = undefined;
		}
	}

	/**
	 * Subscribe to one of the auth events.
	 * @param to The event to subscribe to.
	 * @param callback The callback to fire when the event occurs.
	 * @returns Subscription id for unsubscribing or undefined if event type is not available.
	 */
	public subscribe(to: AuthEventTypes, callback: () => Promise<void>): string | undefined {
		const subscriptionId = randomUUID();

		const toMap = this._eventSubscribers[to] ?? {};
		toMap[subscriptionId] = callback;
		this._eventSubscribers[to] = toMap;

		this._subscribeIdMap[subscriptionId] = to;
		this._logger?.info(`Subscription to ${to} events registered. Subscription Id: ${subscriptionId}`);

		return subscriptionId;
	}

	/**
	 * Unsubscribe from an already subscribed event.
	 * @param subscriptionId The id of the subscription returned from subscribe.
	 * @returns True if the unsubscribe was successful.
	 */
	public unsubscribe(subscriptionId: string): boolean {
		const eventType = this._subscribeIdMap[subscriptionId];
		if (isEmpty(eventType)) {
			this._logger?.warn(`You have tried to unsubscribe with a key ${subscriptionId} that is invalid`);
			return false;
		}

		const eventSubscribers = this._eventSubscribers[eventType];
		if (!isEmpty(eventSubscribers)) {
			delete eventSubscribers[subscriptionId];
		}

		if (this._subscribeIdMap[subscriptionId]) {
			delete this._subscribeIdMap[subscriptionId];
			this._logger?.info(
				`Subscription to ${eventType} events with subscription Id: ${subscriptionId} has been cleared`
			);
			return true;
		}

		this._logger?.warn(
			`Subscription to ${eventType} events with subscription Id: ${subscriptionId} could not be cleared as we do not have a register of that event type.`
		);
		return false;
	}

	/**
	 * Does the auth provider require authentication.
	 * @returns True if authentication is required.
	 */
	public async isAuthenticationRequired(): Promise<boolean> {
		return isEmpty(this._authResult);
	}

	/**
	 * Perform the login operation on the auth provider.
	 * @returns True if the login was successful.
	 */
	public async login(): Promise<boolean> {
		const providerUrl = this._definition?.data?.providerUrl;
		const clientId = this._definition?.data?.clientId;
		const loginRedirectUrl = this._definition?.data?.loginRedirectUrl;
		const scopes = this._definition?.data?.scopes;

		if (isStringValue(providerUrl) && isStringValue(clientId) && isStringValue(loginRedirectUrl)) {
			try {
				this._authResult = await authenticate(providerUrl, clientId, loginRedirectUrl, scopes);
				await this.notifySubscribers("logged-in");
				this.checkForSessionExpiry();
				return true;
			} catch (err) {
				this._logger?.error("Authentication failed", formatError(err));
			}
		}

		return false;
	}

	/**
	 * Perform the logout operation on the auth provider.
	 * @returns True if the logout was successful.
	 */
	public async logout(): Promise<boolean> {
		if (this._authResult) {
			if (this._sessionExpiryTimerId) {
				window.clearTimeout(this._sessionExpiryTimerId);
				this._sessionExpiryTimerId = undefined;
			}

			const logoutRedirectUrl = this._definition?.data?.logoutRedirectUrl;
			if (isStringValue(logoutRedirectUrl)) {
				try {
					await this.notifySubscribers("before-logged-out");
					await this._authResult.logout(logoutRedirectUrl);
				} catch (err) {
					this._logger?.error("Logout failed", formatError(err));
				} finally {
					await this.notifySubscribers("logged-out");
				}
			}
			this._authResult = undefined;
		}
		return true;
	}

	/**
	 * Get user information from the auth provider.
	 * @returns The user information, the type is unknown as it is dependent on the auth provider.
	 */
	public async getUserInfo(): Promise<UserInfoClaims | undefined> {
		if (this._authResult) {
			return this._authResult.userInfo;
		}
	}

	/**
	 * Notify subscribers of an event change.
	 * @param authEventType The type of authentication event to send to.
	 */
	private async notifySubscribers(authEventType: AuthEventTypes): Promise<void> {
		const subscribers = this._eventSubscribers[authEventType];

		if (subscribers) {
			const subscriberIds = Object.keys(subscribers);
			subscriberIds.reverse();

			for (const subscriberId of subscriberIds) {
				this._logger?.info(
					`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${authEventType}`
				);
				await subscribers[subscriberId]();
			}
		}
	}

	/**
	 * Check to see if a session has expired.
	 */
	private checkForSessionExpiry(): void {
		const validity = this._definition?.data?.checkSessionValidityInSeconds;
		if (isNumber(validity) && validity > 0 && isEmpty(this._sessionExpiryTimerId)) {
			this._sessionExpiryTimerId = window.setTimeout(async () => {
				this._sessionExpiryTimerId = undefined;

				const idToken = this._authResult?.idToken;
				const providerUrl = this._definition?.data?.providerUrl;
				const clientId = this._definition?.data?.clientId;

				let isValid = false;

				if (isStringValue(idToken) && isStringValue(providerUrl) && isStringValue(clientId)) {
					try {
						const result = await validateIdToken(idToken, clientId, providerUrl);

						isValid = result.valid;
					} catch (err) {
						this._logger?.error("Failed validating token", formatError(err));
					}
				}

				if (isValid) {
					this._logger?.info("Session Still Active");
					this.checkForSessionExpiry();
				} else {
					this._logger?.info("Session not valid");
					this._authResult = undefined;
					await this.notifySubscribers("session-expired");
				}
			}, validity * 1000);
		}
	}
}
