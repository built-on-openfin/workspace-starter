import type { AuthEventTypes, AuthProvider } from "workspace-platform-starter/shapes/auth-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, randomUUID } from "workspace-platform-starter/utils";
import type { ExampleAuthProviderOptions } from "./shapes";

/**
 * Implementation for the example auth provider.
 */
export class ExampleAuthProvider implements AuthProvider<ExampleAuthProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition?: ModuleDefinition<ExampleAuthProviderOptions>;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers?: ModuleHelpers;

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
	 * Create a new instance of ExampleAuthProvider.
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
		definition: ModuleDefinition<ExampleAuthProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleAuthProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
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
		// TODO: Add logic to determine if authentication is required.
		return true;
	}

	/**
	 * Perform the login operation on the auth provider.
	 * @returns True if the login was successful.
	 */
	public async login(): Promise<boolean> {
		// TODO: Add logic to perform a login.
		return true;
	}

	/**
	 * Perform the logout operation on the auth provider.
	 * @returns True if the logout was successful.
	 */
	public async logout(): Promise<boolean> {
		// TODO: Add logic to perform a logout
		return true;
	}

	/**
	 * Get user information from the auth provider.
	 * @returns The user information, the type is unknown as it is dependent on the auth provider.
	 */
	public async getUserInfo(): Promise<unknown> {
		// TODO: Add logic to get the user information
		return true;
	}
}
