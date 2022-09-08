import type { AuthEventTypes, AuthProvider } from "../../auth-shapes";
import type { Logger, LoggerCreator } from "../../logger-shapes";
import type { ModuleDefinition } from "../../module-shapes";
import type { FactSetAuthOptions } from "./shapes";

/**
 * Provider authentication features for FactSet.
 */
export class FactSetAuthProvider implements AuthProvider<FactSetAuthOptions> {
	/**
	 * The logger.
	 */
	private _logger: Logger;

	/**
	 * Map of subscriber ids.
	 */
	private readonly _subscriptionIds: { [key: string]: AuthEventTypes };

	/**
	 * Subscribers for the logged in event.
	 */
	private readonly _eventSubscribers: { [key in AuthEventTypes]?: Map<string, () => Promise<void>> } = {};

	/**
	 * Is the provider authenticated.
	 */
	private _isAuthenticated: boolean;

	/**
	 * The settings for the auth provider.
	 */
	private _settings: FactSetAuthOptions;

	/**
	 * Idpid supplied from query params.
	 */
	private _idpid?: string;

	/**
	 * Create a new instance of FactSetAuthProvider.
	 */
	constructor() {
		this._subscriptionIds = {};
		this._eventSubscribers = {
			"logged-in": new Map(),
			"before-logged-out": new Map(),
			"logged-out": new Map(),
			"session-expired": new Map()
		};
		this._isAuthenticated = false;
	}

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<FactSetAuthOptions>,
		loggerCreator: LoggerCreator,
		helpers: unknown
	): Promise<void> {
		this._settings = definition.data;
		this._logger = loggerCreator("FactSetAuthProvider");

		const app = fin.Application.getCurrentSync();
		const info = await app.getInfo();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const queryParams = (info.initialOptions as any).userAppConfigArgs;
		this._idpid = queryParams?.idpid;
	}

	/**
	 * Subscribe to one of the auth events.
	 * @param to The event to subscribe to.
	 * @param callback The callback to fire when the event occurs.
	 * @returns Subscription id for unsubscribing or undefined if event type is not available.
	 */
	public subscribe(to: AuthEventTypes, callback: () => Promise<void>): string | undefined {
		if (!this._eventSubscribers[to]) {
			this._logger.error(`Subscription to event type ${to} which does not exist`);
			return;
		}

		const key = crypto.randomUUID();

		this._eventSubscribers[to].set(key, callback);
		this._subscriptionIds[key] = to;

		this._logger.info(`Subscription to ${to} events registered. Subscription Id: ${key}`);

		return key;
	}

	/**
	 * Unsubscribe from an already subscribed event.
	 * @param subscriptionId The id of the subscription returned from subscribe.
	 * @returns True if the unsubscribe was successful.
	 */
	public unsubscribe(subscriptionId: string): boolean {
		const eventType = this._subscriptionIds[subscriptionId];
		if (eventType === undefined) {
			this._logger.warn(
				`You have tried to unsubscribe with a subscription id ${subscriptionId} that is invalid`
			);
			return false;
		}
		delete this._subscriptionIds[subscriptionId];

		if (this._eventSubscribers[eventType].has(subscriptionId)) {
			this._eventSubscribers[eventType].delete(subscriptionId);
			this._logger.info(
				`Subscription to ${eventType} events with subscription Id: ${subscriptionId} has been cleared`
			);
			return true;
		}

		this._logger.warn(
			`Subscription to ${eventType} events with subscription Id: ${subscriptionId} could not be cleared as we do not have a register of that event type.`
		);

		return false;
	}

	/**
	 * Does the auth provider require authentication.
	 * @returns True if authentication is required.
	 */
	public async isAuthenticationRequired(): Promise<boolean> {
		return !this._isAuthenticated;
	}

	/**
	 * Perform the login operation on the auth provider.
	 * @returns True if the login was successful.
	 */
	public async login(): Promise<boolean> {
		this._logger.info("Login requested");

		if (this._isAuthenticated) {
			this._logger.info("User already authenticated");
		} else {
			this._isAuthenticated = await this.getAuthenticationFromUser();
		}

		if (this._isAuthenticated) {
			await this.notifySubscribers("logged-in");
		}

		return this._isAuthenticated;
	}

	/**
	 * Perform the logout operation on the auth provider.
	 * @returns True if the logout was successful.
	 */
	public async logout(): Promise<boolean> {
		return true;
	}

	/**
	 * Get user information from the auth provider.
	 */
	public async getUserInfo<T>(): Promise<T> {
		return undefined;
	}

	/**
	 * Notify subscribers of an event.
	 * @param eventType The type of event to notify.
	 */
	private async notifySubscribers(eventType: AuthEventTypes): Promise<void> {
		const subscribers = this._eventSubscribers[eventType];
		const subscriberIds = Array.from(subscribers.keys());
		subscriberIds.reverse();

		for (const subscriberId of subscriberIds) {
			this._logger.info(
				`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`
			);
			await subscribers.get(subscriberId)();
		}
	}

	/**
	 * Prompt the user for authentication credentials.
	 * @returns True if the authentication was successful.
	 */
	private async getAuthenticationFromUser(): Promise<boolean> {
		// If we open the app url and we are not authentication it will redirect
		// to the login page, we then periodically check the window to see if it
		// is still on the login url, if it has changed then we have successfully
		// logged in
		let win = await this.openLoginWindow();

		const authMatch = new RegExp(this._settings.authenticatedUrl, "i");

		try {
			if (win !== undefined) {
				// If the window url is already the authenticated one return without showing
				const info = await win.getInfo();
				if (authMatch.test(info.url)) {
					this._logger.info("Auth Window url matched authenticated url");
					await win.close(true);
					return true;
				}

				// No matching url so show the window
				await win.show(true);
			}
		} catch (error) {
			this._logger.error(
				`Error while checking if login window automatically redirected. Error ${error.message}`
			);
			// Error getting the info so show the window
			if (win !== undefined) {
				await win.show(true);
			}
		}

		return new Promise<boolean>((resolve, reject) => {
			let statusCheck: number;

			win
				.addListener("closed", async () => {
					if (win) {
						window.clearInterval(statusCheck);
						statusCheck = undefined;
						this._logger.info("Auth Window cancelled by user");
						win = undefined;
						resolve(false);
					}
				})
				.catch(() => {});

			statusCheck = window.setInterval(async () => {
				if (win !== undefined) {
					const info = await win.getInfo();

					if (authMatch.test(info.url)) {
						this._logger.info("Auth Window url matched authenticated url");
						window.clearInterval(statusCheck);
						await win.removeAllListeners();
						await win.close(true);
						resolve(true);
					}
				} else {
					resolve(false);
				}
			}, this._settings.checkLoginStatusInSeconds ?? 1 * 1000);

			return true;
		});
	}

	private async openLoginWindow(): Promise<OpenFin.Window> {
		let idpid = "";

		if (this._idpid !== undefined) {
			this._logger.info("FactSet Login used idpid", this._idpid);
			idpid = `?idpid=${this._idpid}`;
		}

		return fin.Window.create({
			alwaysOnTop: true,
			maximizable: false,
			minimizable: false,
			autoShow: false,
			defaultCentered: true,
			defaultHeight: 700,
			defaultWidth: 600,
			includeInSnapshots: false,
			name: "factset-login",
			resizable: false,
			saveWindowState: false,
			showTaskbarIcon: false,
			url: `${this._settings.authenticatedUrl}/${idpid}`
		});
	}
}
