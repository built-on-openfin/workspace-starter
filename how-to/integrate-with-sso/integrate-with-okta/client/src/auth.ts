/* eslint-disable no-bitwise */
import type OpenFin from "@openfin/core";
import type { OktaSettings } from "./shapes";

let storageRealm: string | undefined;
const STORE_ACCESS_TOKEN = "token";

let oktaSettings: OktaSettings | undefined;
let authenticatedCallback: (
	isAuthenticated: boolean,
	userDetails?: { [id: string]: unknown }
) => Promise<void>;
let busyCallback: (isBusy: boolean) => Promise<void>;
let informationCallback: (info: string) => void;
let authWin: OpenFin.Window | undefined;
let pollTimerId: number | undefined;

/**
 * Initialize the authentication.
 * @param settings The settings for use for Auth0.
 * @param realm The realm to use for storage.
 * @param authenticatedCb The callback for the authentication state changing.
 * @param busyCb The callback to use to signify to the application that auth is busy.
 * @param informationCb The callback to tell the application about any information to log.
 */
export async function authenticationInit(
	settings: OktaSettings,
	realm: string,
	authenticatedCb: (isAuthenticated: boolean, userDetails?: { [id: string]: unknown }) => Promise<void>,
	busyCb: (isBusy: boolean) => Promise<void>,
	informationCb: (info: string) => void
): Promise<void> {
	oktaSettings = settings;
	storageRealm = realm;
	authenticatedCallback = authenticatedCb;
	busyCallback = busyCb;
	informationCallback = informationCb;

	informationCallback("Initialising the authentication");

	if (!oktaSettings) {
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
		const userDetails = await checkTokenValidity(accessToken, true);
		if (!userDetails) {
			informationCallback("Access token not valid, show login page");
			await login();
		} else {
			informationCallback("Access token valid, show application");
			await authenticatedStateChanged(true, userDetails);
		}
	}
}

/**
 * Perform the login workflow.
 * PKCE workflow - https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
 */
export async function login(): Promise<void> {
	removeProperty(STORE_ACCESS_TOKEN);

	await busyCallback(true);

	const state = randomUUID();

	const authUrl =
		`https://${oktaSettings?.domain}/oauth2/v1/authorize?client_id=${oktaSettings?.clientId}&scope=openid email phone address groups profile` +
		"&response_type=code" +
		"&response_mode=query" +
		"&nonce=nonceStatic" +
		`&redirect_uri=${oktaSettings?.loginUrl}` +
		`&code_challenge=${oktaSettings?.pkceCodeChallenge}` +
		"&code_challenge_method=S256" +
		`&state=${state}&sessionToken=session_not_needed`;

	authWin = await showWindow(authUrl);

	if (authWin) {
		await authWin.addListener("closed", async () => {
			await cleanupWindow(true);
		});

		await authWin.addListener("url-changed", async () => {
			await checkUrlHasChanged();
		});

		await checkUrlHasChanged();
	}
}

/**
 * Use the code to request an access token.
 * @param oktaCode The okta code to use to get the token.
 * @returns The token.
 */
export async function getAccessToken(oktaCode: string): Promise<string | undefined> {
	if (oktaCode) {
		try {
			const response = await fetch(`https://${oktaSettings?.domain}/oauth2/v1/token`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body:
					"grant_type=authorization_code" +
					`&code=${oktaCode}` +
					`&client_id=${oktaSettings?.clientId}` +
					`&code_verifier=${oktaSettings?.pkceCodeVerifier}` +
					`&redirect_uri=${oktaSettings?.loginUrl}`
			});

			if (!response.ok) {
				const err = await response.text();
				throw new Error(`Unable to retrieve access token\n${err}`);
			}

			const tokenResponse = await response.json();
			const accessToken: string = tokenResponse.access_token;

			console.log(`Access Token retrieved: ${accessToken}`);
			return accessToken;
		} catch (err) {
			informationCallback("Failed converting code to token");
			informationCallback(handleError(err));
		}
	}
}

/**
 * Start the logout workflow.
 */
export async function logout(): Promise<void> {
	informationCallback("Logout was called manually.");

	try {
		await expireAccessToken();
		await showWindow(oktaSettings?.logoutUrl);

		informationCallback("Logout was successful.");
	} catch (err) {
		informationCallback("Failed logging out");
		informationCallback(handleError(err));
	} finally {
		await authenticatedStateChanged(false);
	}
}

/**
 * Cleanup the login window.
 * @param isManualClose Was the window closed by the user.
 */
async function cleanupWindow(isManualClose: boolean): Promise<void> {
	if (authWin) {
		informationCallback(
			isManualClose
				? "Login page was manually closed"
				: "Login complete page was detected closing login window"
		);

		const win = authWin;
		authWin = undefined;

		await win.removeAllListeners();

		if (!isManualClose) {
			await win.close(true);
		}

		await busyCallback(false);
	}
}

/**
 * Check to see if the url has changed.
 */
async function checkUrlHasChanged(): Promise<void> {
	const winUrl = await checkForUrls(authWin, [oktaSettings?.loginUrl]);
	console.log(`Inside completePoll - url: ${winUrl}`);

	if (winUrl) {
		const oktaCode = winUrl.searchParams.get("code");
		console.log(`Okta code: ${oktaCode}`);

		await cleanupWindow(false);

		if (oktaCode) {
			const accessToken = await getAccessToken(oktaCode);

			if (accessToken === undefined) {
				informationCallback("Could not retrieve access token.");
				await authenticatedStateChanged(false);
			} else {
				informationCallback(`Okta Token: ${accessToken}`);
				saveProperty(STORE_ACCESS_TOKEN, accessToken);

				let userDetails: { [id: string]: unknown } | undefined;
				try {
					userDetails = await checkTokenValidity(accessToken, false);
				} catch {}
				await authenticatedStateChanged(true, userDetails);
			}
		} else {
			informationCallback("No code in the login url");
			await authenticatedStateChanged(false);
		}
	}
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
): Promise<{ [id: string]: unknown } | undefined> {
	if (!accessToken) {
		return;
	}

	try {
		if (showBusy) {
			await busyCallback(showBusy);
		}

		const response = await fetch(`https://${oktaSettings?.domain}/oauth2/v1/userinfo`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		const json = await response.json();
		return json;
	} catch (err) {
		informationCallback("Check session: failed");
		informationCallback(handleError(err));
	} finally {
		if (showBusy) {
			await busyCallback(false);
		}
	}
}

/**
 * Convert the error into a readable string.
 * @param err The error to convert.
 * @returns Readable version of the error.
 */
function handleError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	}
	const errObj = err as { original: { message?: string }; description?: string };
	if (errObj.original?.message) {
		return errObj.original.message;
	} else if (errObj.description) {
		return errObj.description;
	}
	return JSON.stringify(errObj);
}

/**
 * Show an auth window.
 * @param url The url to load in the window.
 * @returns The created window.
 */
async function showWindow(url: string | undefined): Promise<OpenFin.Window | undefined> {
	if (!url) {
		return;
	}
	return fin.Window.create({
		name: "integrate-with-okta-auth",
		alwaysOnTop: true,
		maximizable: false,
		minimizable: false,
		autoShow: true,
		defaultCentered: true,
		defaultHeight: 800,
		defaultWidth: 600,
		includeInSnapshots: false,
		resizable: false,
		showTaskbarIcon: false,
		saveWindowState: false,
		url
	});
}

/**
 * Expire the access token by removing it from storage.
 * The verification polling will then logout.
 */
export async function expireAccessToken(): Promise<void> {
	const accessToken = loadProperty(STORE_ACCESS_TOKEN);
	if (accessToken) {
		try {
			await fetch(`https://${oktaSettings?.domain}/oauth2/v1/revoke`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: `client_id=${oktaSettings?.clientId}&token_type_hint=access_token&token=${accessToken}`
			});
		} catch (err) {
			informationCallback("Revoke failed");
			informationCallback(handleError(err));
		} finally {
			removeProperty(STORE_ACCESS_TOKEN);
		}
	}
}

/**
 * The authentication state has changed to restart polling if necessary.
 * @param isAuthenticated Is the user authenticated.
 * @param userDetails Details for the logged in user.
 */
async function authenticatedStateChanged(
	isAuthenticated: boolean,
	userDetails?: { [id: string]: unknown }
): Promise<void> {
	pollTimerStop();
	await authenticatedCallback(isAuthenticated, userDetails);
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
	if ((oktaSettings?.verifyPollMs ?? 0) > 0 && isAuthenticated) {
		pollTimerId = window.setInterval(async () => {
			const accessToken = loadProperty(STORE_ACCESS_TOKEN);
			if (accessToken) {
				const userInfo = await checkTokenValidity(accessToken, false);
				if (!userInfo) {
					informationCallback("Access token no longer valid, logout");
					removeProperty(STORE_ACCESS_TOKEN);
					await authenticatedStateChanged(false);
				} else {
					informationCallback("Access token still valid");
				}
			} else {
				informationCallback("Access token not found, logout");
				await authenticatedStateChanged(false);
			}
		}, oktaSettings?.verifyPollMs);
	}
}

/**
 * Check to see if the window is displaying one of the specified urls with a partial match.
 * @param win The window to check.
 * @param urls The urls to look for.
 * @returns The complete url if it has one it was looking for.
 */
async function checkForUrls(
	win: OpenFin.Window | undefined,
	urls: (string | undefined)[]
): Promise<URL | undefined> {
	if (!win) {
		return undefined;
	}

	const winInfo = await win.getInfo();
	const isCompleteUrl = urls.some((u) => u && winInfo.url.startsWith(u));

	if (isCompleteUrl) {
		return new URL(winInfo.url);
	}

	return undefined;
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
