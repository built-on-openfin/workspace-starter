/* eslint-disable no-bitwise */
import type OpenFin from "@openfin/core";
import * as auth0 from "auth0-js";
import type { Auth0Settings } from "./shapes";

const STORE_ACCESS_TOKEN = "token";
const STORE_AUTH_STATE = "state";

let storageRealm: string | undefined;
let auth0Settings: Auth0Settings;
let authWin: OpenFin.Window | undefined;
let authenticatedCallback: (isAuthenticated: boolean, userInfo?: auth0.Auth0UserProfile) => Promise<void>;
let busyCallback: (isBusy: boolean) => Promise<void>;
let informationCallback: (info: string) => void;
let pollTimerId: number | undefined;

/**
 * Initialize the authentication.
 * @param settings The settings for use for Auth0.
 * @param realm The realm for storage.
 * @param authenticatedCb The callback for the authentication state changing.
 * @param busyCb The callback to use to signify to the application that auth is busy.
 * @param informationCb The callback to tell the application about any information to log.
 */
export async function authenticationInit(
	settings: Auth0Settings,
	realm: string,
	authenticatedCb: (isAuthenticated: boolean, userInfo?: auth0.Auth0UserProfile) => Promise<void>,
	busyCb: (isBusy: boolean) => Promise<void>,
	informationCb: (info: string) => void
): Promise<void> {
	auth0Settings = settings;
	storageRealm = realm;
	authenticatedCallback = authenticatedCb;
	busyCallback = busyCb;
	informationCallback = informationCb;

	informationCallback("Initialising the authentication");

	if (!auth0Settings) {
		informationCallback("Error: Settings missing cannot continue");
		return;
	}

	informationCallback("Checking for existing token");
	const accessToken = loadProperty(STORE_ACCESS_TOKEN);
	if (!accessToken) {
		informationCallback("Access token does not exist, show login page");
		await login();
	} else {
		informationCallback("Check session validity");
		const userInfo = await checkTokenValidity(accessToken, true);
		if (!userInfo) {
			informationCallback("Access token not valid, show login page");
			await login();
		} else {
			informationCallback("Access token valid, show application");
			await authenticatedStateChanged(true, userInfo);
		}
	}
}

/**
 * Create the Auth0 authentication client.
 * @returns The created client and current state.
 */
function createWebAuth(): { webAuth: auth0.WebAuth; state: string } {
	let state = loadProperty(STORE_AUTH_STATE);
	if (!state) {
		state = randomUUID();
		saveProperty(STORE_AUTH_STATE, state);
	}

	return {
		webAuth: new auth0.WebAuth({
			domain: auth0Settings.domain,
			clientID: auth0Settings.clientId,
			responseType: "token"
		}),
		state
	};
}

/**
 * Check to see if a token is still valid.
 * @param accessToken The token to test.
 * @param showBusy Update the busy information.
 * @returns The user profile if the token is still valid.
 */
async function checkTokenValidity(
	accessToken: string | undefined,
	showBusy: boolean
): Promise<auth0.Auth0UserProfile | null> {
	if (!accessToken) {
		return null;
	}
	if (showBusy) {
		await busyCallback(showBusy);
	}

	return new Promise<auth0.Auth0UserProfile | null>((resolve) => {
		const { webAuth } = createWebAuth();
		webAuth.client.userInfo(accessToken, async (err, userInfo) => {
			if (showBusy) {
				await busyCallback(false);
			}
			if (err) {
				informationCallback("Check session: failed");
				informationCallback((err.original?.message ?? err.description) as string);
				resolve(null);
			} else {
				resolve(userInfo);
			}
		});
	});
}

/**
 * Start the login workflow with Auth0.
 */
export async function login(): Promise<void> {
	const { webAuth, state } = createWebAuth();

	const authUrl = webAuth.client.buildAuthorizeUrl({
		redirectUri: auth0Settings.loginUrl,
		responseType: "token",
		state
	});

	removeProperty(STORE_ACCESS_TOKEN);

	await busyCallback(true);

	authWin = await showWindow(authUrl);

	let completePoll: number | undefined;

	/**
	 * Cleanup the login window.
	 * @param isManualClose Was the window closed by the user.
	 */
	async function cleanupWindow(isManualClose: boolean): Promise<void> {
		informationCallback(
			isManualClose
				? "Login page was manually closed"
				: "Login complete page was detected closing login window"
		);
		if (completePoll) {
			window.clearInterval(completePoll);
			completePoll = undefined;
		}
		if (authWin) {
			const win = authWin;
			authWin = undefined;

			await win.removeAllListeners();
			if (!isManualClose) {
				await win.close(true);
			}
		}
		await busyCallback(false);
	}

	await authWin.addListener("closed", async () => {
		if (authWin) {
			await cleanupWindow(true);
		}
	});

	completePoll = window.setInterval(async () => {
		const winUrl = await checkForUrls(authWin, [auth0Settings.loginUrl]);

		if (winUrl) {
			const authenticatedResultOrError = await checkAuthenticationResult(winUrl);

			if (authenticatedResultOrError?.err) {
				informationCallback(
					(authenticatedResultOrError.err.description ??
						authenticatedResultOrError.err.original?.message) as string
				);
				removeProperty(STORE_ACCESS_TOKEN);
			} else if (authenticatedResultOrError?.result?.accessToken) {
				informationCallback(`Access token: ${authenticatedResultOrError.result.accessToken}`);
				saveProperty(STORE_ACCESS_TOKEN, authenticatedResultOrError.result.accessToken);
			}

			await cleanupWindow(false);

			if (authenticatedResultOrError?.result?.accessToken) {
				informationCallback("Authenticated, show application");

				webAuth.client.userInfo(authenticatedResultOrError.result.accessToken, async (err, userInfo) => {
					if (err) {
						informationCallback("Get userInfo failed");
						informationCallback((err.original?.message ?? err.description) as string);
						await authenticatedStateChanged(false);
					} else {
						informationCallback("Get userInfo success");
						await authenticatedStateChanged(true, userInfo);
					}
				});
			} else {
				informationCallback("No access token in the authentication result");
				await authenticatedStateChanged(false);
			}
		}
	}, 100);
}

/**
 * Start the logout workflow for Auth0.
 */
export async function logout(): Promise<void> {
	const { webAuth } = createWebAuth();

	// We include the federated support so that any 3rd party providers are also logged out
	// some providers do not return to the returnTo url after logout, so we need to monitor
	// for additional urls to check for logout complete
	const authUrl = webAuth.client.buildLogoutUrl({
		returnTo: auth0Settings.logoutUrls[0],
		federated: true
	});

	await busyCallback(true);
	authWin = await showWindow(authUrl);

	let completePoll: number | undefined;

	/**
	 * Cleanup the login window.
	 * @param isManualClose Was the window closed by the user.
	 */
	async function cleanupWindow(isManualClose: boolean): Promise<void> {
		informationCallback(
			isManualClose
				? "Logout page was manually closed"
				: "Logout complete page was detected closing logout window"
		);
		if (completePoll) {
			window.clearInterval(completePoll);
			completePoll = undefined;
		}
		if (authWin) {
			const win = authWin;
			authWin = undefined;

			await win.removeAllListeners();
			if (!isManualClose) {
				await win.close(true);
			}
		}
		await busyCallback(false);
	}

	await authWin.addListener("closed", async () => {
		if (authWin) {
			await cleanupWindow(true);
		}
	});

	completePoll = window.setInterval(async () => {
		const winUrl = await checkForUrls(authWin, auth0Settings.logoutUrls);

		if (winUrl) {
			removeProperty(STORE_ACCESS_TOKEN);
			removeProperty(STORE_AUTH_STATE);
			await cleanupWindow(false);
			await authenticatedStateChanged(false);
		}
	}, 100);
}

/**
 * Expire the access token by removing it from storage.
 * The verification polling will then logout.
 */
export function expireAccessToken(): void {
	removeProperty(STORE_ACCESS_TOKEN);
	removeProperty(STORE_AUTH_STATE);
}

/**
 * The authentication state has changed to restart polling if necessary.
 * @param isAuthenticated Is the user authenticated.
 * @param userInfo The user info.
 */
async function authenticatedStateChanged(
	isAuthenticated: boolean,
	userInfo?: auth0.Auth0UserProfile
): Promise<void> {
	pollTimerStop();
	await authenticatedCallback(isAuthenticated, userInfo);
	pollTimerStart(isAuthenticated);
}

/**
 * Stop the token verification polling timer.
 */
function pollTimerStop(): void {
	if (pollTimerId) {
		window.clearInterval(pollTimerId);
		pollTimerId = undefined;
	}
}

/**
 * Start the token verification polling timer.
 * @param isAuthenticated Is the user authenticated.
 */
function pollTimerStart(isAuthenticated: boolean): void {
	if ((auth0Settings.verifyPollMs ?? 0) > 0 && isAuthenticated) {
		pollTimerId = window.setInterval(async () => {
			const accessToken = loadProperty(STORE_ACCESS_TOKEN);
			if (accessToken) {
				const userInfo = await checkTokenValidity(accessToken, false);
				if (!userInfo) {
					informationCallback("Access token no longer valid, logout");
					removeProperty(STORE_ACCESS_TOKEN);
					removeProperty(STORE_AUTH_STATE);
					await authenticatedStateChanged(false);
				} else {
					informationCallback("Access token still valid");
				}
			} else {
				informationCallback("Access token not found, logout");
				removeProperty(STORE_AUTH_STATE);
				await authenticatedStateChanged(false);
			}
		}, auth0Settings.verifyPollMs);
	}
}

/**
 * Check to see if the window is displaying one of the specified urls with a partial match.
 * @param win The window to check.
 * @param urls The urls to look for.
 * @returns The complete url if it has one it was looking for.
 */
async function checkForUrls(win: OpenFin.Window | undefined, urls: string[]): Promise<URL | undefined> {
	if (!win) {
		return undefined;
	}

	const winInfo = await win.getInfo();
	const isCompleteUrl = urls.some((u) => winInfo.url.includes(u));

	if (isCompleteUrl) {
		return new URL(winInfo.url);
	}

	return undefined;
}

/**
 * Check the url to see if it has an authentication token in it.
 * @param url The url to check.
 * @returns The decoded auth token if there is one.
 */
async function checkAuthenticationResult(url: URL): Promise<
	| {
			result: auth0.Auth0DecodedHash | null;
			err: auth0.Auth0Error | null;
	  }
	| undefined
> {
	return new Promise<{
		result: auth0.Auth0DecodedHash | null;
		err: auth0.Auth0Error | null;
	}>((resolve) => {
		const { webAuth, state } = createWebAuth();
		webAuth.parseHash({ hash: url.hash, state }, (err, result) => {
			resolve({ result, err });
		});
	});
}

/**
 * Show an auth window.
 * @param url The url to load in the window.
 * @returns The created window.
 */
async function showWindow(url: string): Promise<OpenFin.Window> {
	return fin.Window.create({
		name: "integrate-with-auth0-auth",
		alwaysOnTop: true,
		maximizable: false,
		minimizable: false,
		autoShow: true,
		defaultCentered: true,
		defaultHeight: 700,
		defaultWidth: 600,
		includeInSnapshots: false,
		resizable: false,
		showTaskbarIcon: false,
		saveWindowState: false,
		url
	});
}

/**
 * Load a property from local storage.
 * @param propName The name of the property to load.
 * @returns The property loaded from local storage.
 */
function loadProperty(propName: string): string | null {
	return window.localStorage.getItem(`${storageRealm}/${propName}`);
}

/**
 * Save a property to local storage.
 * @param propName The property to save.
 * @param value The value of the property.
 */
function saveProperty(propName: string, value: string): void {
	window.localStorage.setItem(`${storageRealm}/${propName}`, value);
}

/**
 * Remove a property from local storage.
 * @param propName The name of the property to remove.
 */
function removeProperty(propName: string): void {
	window.localStorage.removeItem(`${storageRealm}/${propName}`);
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
export function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Generate a random hex number based on a string version of a number.
	 * @param c The input value.
	 * @returns The random hex number.
	 */
	function getRandomHex(c: string): string {
		return (
			Number(c) ^
			(window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
		).toString(16);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
