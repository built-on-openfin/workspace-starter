import type OpenFin from "@openfin/core";
import type { AuthProvider } from "workspace-platform-starter/shapes/auth-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isNumber, isStringValue, randomUUID } from "workspace-platform-starter/utils";
import type { ExampleOptions, ExampleUser } from "./shapes";
import { EXAMPLE_AUTH_CURRENT_USER_KEY, clearCurrentUser, getCurrentUser } from "./util";

/**
 * Example authentication provider.
 */
export class ExampleAuthProvider implements AuthProvider<ExampleOptions> {
	private _authOptions?: ExampleOptions;

	private _logger?: Logger;

	private readonly _subscribeIdMap: { [key: string]: string };

	private readonly _loggedInSubscribers: { [id: string]: () => Promise<void> };

	private readonly _beforeLoggedOutSubscribers: { [id: string]: () => Promise<void> };

	private readonly _loggedOutSubscribers: { [id: string]: () => Promise<void> };

	private readonly _sessionExpiredSubscribers: { [id: string]: () => Promise<void> };

	private _authenticatedKey?: string;

	private _currentUser?: ExampleUser;

	private _authenticated?: boolean;

	private _sessionExpiryCheckId?: number;

	/**
	 * Create a new instance of ExampleAuthProvider.
	 */
	constructor() {
		this._subscribeIdMap = {};
		this._loggedInSubscribers = {};
		this._beforeLoggedOutSubscribers = {};
		this._loggedOutSubscribers = {};
		this._sessionExpiredSubscribers = {};
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("AuthExample");
		this._authenticatedKey = `${fin.me.identity.uuid}-EXAMPLE_AUTH_IS_AUTHENTICATED`;

		if (isEmpty(this._authOptions)) {
			this._logger.info(`Setting options: ${JSON.stringify(definition.data, null, 4)}`);
			this._authOptions = definition.data;
			this._authenticated = Boolean(localStorage.getItem(this._authenticatedKey));
			if (this._authenticated) {
				this._currentUser = getCurrentUser();
				this.checkForSessionExpiry();
			}
		} else {
			this._logger.warn("Options have already been set as init has already been called");
		}
	}

	/**
	 * Subscribe to one of the auth events.
	 * @param to The event to subscribe to.
	 * @param callback The callback to fire when the event occurs.
	 * @returns Subscription id for unsubscribing or undefined if event type is not available.
	 */
	public subscribe(
		to: "logged-in" | "before-logged-out" | "logged-out" | "session-expired",
		callback: () => Promise<void>
	): string | undefined {
		const key = randomUUID();
		let matchFound = false;
		switch (to) {
			case "logged-in": {
				matchFound = true;
				this._loggedInSubscribers[key] = callback;
				break;
			}
			case "before-logged-out": {
				matchFound = true;
				this._beforeLoggedOutSubscribers[key] = callback;
				break;
			}
			case "logged-out": {
				matchFound = true;
				this._loggedOutSubscribers[key] = callback;
				break;
			}
			case "session-expired": {
				matchFound = true;
				this._sessionExpiredSubscribers[key] = callback;
				break;
			}
		}

		if (matchFound) {
			this._subscribeIdMap[key] = to;
			this._logger?.info(`Subscription to ${to} events registered. Subscription Id: ${key}`);
			return key;
		}
	}

	/**
	 * Unsubscribe from an already subscribed event.
	 * @param subscriptionId The id of the subscription returned from subscribe.
	 * @returns True if the unsubscribe was successful.
	 */
	public unsubscribe(subscriptionId: string): boolean {
		let matchFound = false;
		const eventType = this._subscribeIdMap[subscriptionId];
		if (isEmpty(eventType)) {
			this._logger?.warn(`You have tried to unsubscribe with a key ${subscriptionId} that is invalid`);
			return false;
		}

		switch (eventType) {
			case "logged-in": {
				matchFound = true;
				delete this._loggedInSubscribers[subscriptionId];
				break;
			}
			case "before-logged-out": {
				matchFound = true;
				delete this._beforeLoggedOutSubscribers[subscriptionId];
				break;
			}
			case "logged-out": {
				matchFound = true;
				delete this._loggedOutSubscribers[subscriptionId];
				break;
			}
			case "session-expired": {
				matchFound = true;
				delete this._sessionExpiredSubscribers[subscriptionId];
				break;
			}
		}

		delete this._subscribeIdMap[subscriptionId];
		if (matchFound) {
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
		if (isEmpty(this._authenticated)) {
			this._authenticated = false;
		}
		return !this._authenticated;
	}

	/**
	 * Perform the login operation on the auth provider.
	 * @returns True if the login was successful.
	 */
	public async login(): Promise<boolean> {
		this._logger?.info("login requested");
		if (this._authenticated) {
			this._logger?.info("User already authenticated");
			return this._authenticated;
		}
		if (this._authOptions?.autoLogin) {
			this._logger?.info("autoLogin enabled in auth provide module settings. Fake logged in");
			this._authenticated = true;
		} else {
			this._authenticated = await this.getAuthenticationFromUser();
		}

		if (this._authenticated) {
			if (this._authenticatedKey) {
				localStorage.setItem(this._authenticatedKey, this._authenticated.toString());
			}
			this.checkForSessionExpiry();
			await this.notifySubscribers("logged-in", this._loggedInSubscribers);
		} else {
			clearCurrentUser();
		}

		return this._authenticated;
	}

	/**
	 * Perform the logout operation on the auth provider.
	 * @returns True if the logout was successful.
	 */
	public async logout(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.handleLogout(resolve)
				.then(async () => {
					this._logger?.info("Log out called");
					return true;
				})
				.catch(async (error) => {
					this._logger?.error(`Error while trying to log out ${error}`);
				});
		});
	}

	/**
	 * Get user information from the auth provider.
	 * @returns The user information.
	 */
	public async getUserInfo(): Promise<unknown> {
		if (isEmpty(this._authenticated) || !this._authenticated) {
			this._logger?.warn("Unable to retrieve user info unless the user is authenticated");
			return;
		}
		this._logger?.info("This example returns a user if it was provided to the example login");

		return this._currentUser;
	}

	/**
	 * Get the authentication from the user.
	 * @returns True if authenticated.
	 */
	private async getAuthenticationFromUser(): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			if (this._authOptions) {
				this.openLoginWindow(this._authOptions.loginUrl)
					.then(async (openedWin) => {
						let win: OpenFin.Window | undefined = openedWin;
						if (this._authOptions) {
							const authMatch = new RegExp(this._authOptions.authenticatedUrl, "i");

							try {
								if (!isEmpty(win)) {
									const info = await win.getInfo();
									if (authMatch.test(info.url)) {
										await win.close(true);
										return resolve(true);
									}
									await win.show(true);
								}
							} catch (error) {
								this._logger?.error(
									`Error while checking if login window automatically redirected. Error ${this.formatError(
										error
									)}`
								);
								if (!isEmpty(win)) {
									await win.show(true);
								}
							}

							let statusCheck: number | undefined;

							await win.addListener("closed", async () => {
								if (win) {
									window.clearInterval(statusCheck);
									statusCheck = undefined;
									this._logger?.info("Auth Window cancelled by user");
									win = undefined;
									return resolve(false);
								}
							});
							statusCheck = window.setInterval(async () => {
								if (!isEmpty(win)) {
									const info = await win.getInfo();
									if (authMatch.test(info.url)) {
										window.clearInterval(statusCheck);
										await win.removeAllListeners();
										await win.close(true);
										return resolve(true);
									}
								} else {
									return resolve(false);
								}
							}, this._authOptions.checkLoginStatusInSeconds ?? 1 * 1000);
							return true;
						}
						return false;
					})
					.catch((error) => {
						this._logger?.error("Error while trying to authenticate the user", error);
					});
			}
		});
	}

	/**
	 * Check to see if a session has expired.
	 */
	private checkForSessionExpiry(): void {
		const validity = this._authOptions?.checkSessionValidityInSeconds;
		if (isNumber(validity) && validity > -1 && isEmpty(this._sessionExpiryCheckId)) {
			this._sessionExpiryCheckId = window.setTimeout(async () => {
				if (this._authOptions) {
					this._sessionExpiryCheckId = undefined;
					const stillAuthenticated = await this.checkAuth(this._authOptions.loginUrl);
					if (stillAuthenticated) {
						this._logger?.info("Session Still Active");
						this.checkForSessionExpiry();
					} else {
						this._logger?.info(
							"Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module. Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check"
						);
						this._authenticated = false;
						if (this._authenticatedKey) {
							localStorage.removeItem(this._authenticatedKey);
						}
						clearCurrentUser();
						await this.notifySubscribers("session-expired", this._sessionExpiredSubscribers);
					}
				}
			}, validity * 1000);
		}
	}

	/**
	 * Notify subscribers of an event change.
	 * @param eventType The event to notify.
	 * @param subscribers The subscribers for the event.
	 */
	private async notifySubscribers(
		eventType: string,
		subscribers: { [id: string]: () => Promise<void> }
	): Promise<void> {
		const subscriberIds = Object.keys(subscribers);
		subscriberIds.reverse();

		for (let i = 0; i < subscriberIds.length; i++) {
			const subscriberId = subscriberIds[i];
			this._logger?.info(
				`Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`
			);
			await subscribers[subscriberId]();
		}
	}

	/**
	 * Handle logout.
	 * @param resolve The resolve method to call after logout.
	 * @returns Nothing.
	 */
	private async handleLogout(resolve: (success: boolean) => void): Promise<void> {
		if (isEmpty(this._authenticated) || !this._authenticated) {
			this._logger?.error("You have requested to log out but are not logged in");
			resolve(false);
			return;
		}
		this._logger?.info("Log out requested");
		await this.notifySubscribers("before-logged-out", this._beforeLoggedOutSubscribers);
		this._authenticated = false;
		if (this._authenticatedKey) {
			localStorage.removeItem(this._authenticatedKey);
		}
		clearCurrentUser();
		const logoutUrl = this._authOptions?.logoutUrl;
		if (isStringValue(logoutUrl)) {
			try {
				const win = await this.openLogoutWindow(logoutUrl);
				setTimeout(async () => {
					await win.close();
					await this.notifySubscribers("logged-out", this._loggedOutSubscribers);
					resolve(true);
				}, 2000);
			} catch (error) {
				this._logger?.error(`Error while launching logout window. ${error}`);
				return resolve(false);
			}
		} else {
			await this.notifySubscribers("logged-out", this._loggedOutSubscribers);
			resolve(true);
		}
	}

	/**
	 * Open the login window.
	 * @param url The url to open for the login window.
	 * @returns The window that was created.
	 */
	private async openLoginWindow(url: string): Promise<OpenFin.Window> {
		const enrichedCustomData = {
			currentUserKey: EXAMPLE_AUTH_CURRENT_USER_KEY,
			...this._authOptions?.customData
		};
		return fin.Window.create({
			name: "example-auth-log-in",
			alwaysOnTop: true,
			maximizable: false,
			minimizable: false,
			autoShow: false,
			defaultCentered: true,
			defaultHeight: this._authOptions?.loginHeight ?? 325,
			defaultWidth: this._authOptions?.loginWidth ?? 400,
			includeInSnapshots: false,
			resizable: false,
			showTaskbarIcon: false,
			saveWindowState: false,
			url,
			customData: enrichedCustomData
		});
	}

	/**
	 * Open the logout window.
	 * @param url The url for the logout window.
	 * @returns The window created.
	 */
	private async openLogoutWindow(url: string): Promise<OpenFin.Window> {
		return fin.Window.create({
			name: "example-auth-log-out",
			maximizable: false,
			minimizable: false,
			autoShow: false,
			defaultCentered: true,
			defaultHeight: this._authOptions?.loginHeight ?? 325,
			defaultWidth: this._authOptions?.loginWidth ?? 400,
			includeInSnapshots: false,
			resizable: false,
			showTaskbarIcon: false,
			saveWindowState: false,
			url
		});
	}

	/**
	 * Check the authentication status.
	 * @param url The url to open to check.
	 * @returns True if authenticated.
	 */
	private async checkAuth(url: string): Promise<boolean> {
		const windowToCheck = await fin.Window.create({
			name: "example-auth-check-window",
			alwaysOnTop: true,
			maximizable: false,
			minimizable: false,
			autoShow: false,
			defaultHeight: this._authOptions?.loginHeight ?? 325,
			defaultWidth: this._authOptions?.loginWidth ?? 400,
			includeInSnapshots: false,
			resizable: false,
			showTaskbarIcon: false,
			saveWindowState: false,
			url
		});
		let isAuthenticated = false;
		try {
			const info = await windowToCheck.getInfo();
			if (info.url === this._authOptions?.authenticatedUrl) {
				isAuthenticated = true;
			}
		} catch (error) {
			this._logger?.error("Error encountered while checking session", error);
		} finally {
			if (!isEmpty(windowToCheck)) {
				await windowToCheck.close(true);
			}
		}
		return isAuthenticated;
	}

	/**
	 * Format an error to a readable string.
	 * @param err The error to format.
	 * @returns The formatted error.
	 */
	private formatError(err: unknown): string {
		if (err instanceof Error) {
			return err.message;
		} else if (typeof err === "string") {
			return err;
		}
		return JSON.stringify(err);
	}
}
