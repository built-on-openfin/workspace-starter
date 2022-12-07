import * as auth0 from "auth0-js";
import { ofRandomUUID } from "./polyfill";
import type { AuthSettings } from "./shapes";

const STORAGE_REALM = "integrate-with-sso";
const STORE_ACCESS_TOKEN = "token";
const STORE_AUTH_STATE = "state";

let authSettings: AuthSettings;
let authWin: OpenFin.Window;
let authenticatedCallback: (isAuthenticated: boolean, userInfo?: auth0.Auth0UserProfile) => Promise<void>;
let busyCallback: (isBusy: boolean) => Promise<void>;
let informationCallback: (info: string) => void;
let pollTimerId: number | undefined;

export async function init(
	settings: AuthSettings,
	authenticatedCb: (isAuthenticated: boolean, userInfo?: auth0.Auth0UserProfile) => Promise<void>,
	busyCb: (isBusy: boolean) => Promise<void>,
	informationCb: (info: string) => void
) {
	authenticatedCallback = authenticatedCb;
	busyCallback = busyCb;
	informationCallback = informationCb;

	informationCallback("Initialising the authentication");

	authSettings = settings;
	if (!authSettings) {
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

function createWebAuth(): { webAuth: auth0.WebAuth; state: string } {
	let state = loadProperty(STORE_AUTH_STATE);
	if (!loadProperty(STORE_AUTH_STATE)) {
		state = ofRandomUUID();
		saveProperty(STORE_AUTH_STATE, state);
	}

	return {
		webAuth: new auth0.WebAuth({
			domain: authSettings.domain,
			clientID: authSettings.clientId,
			responseType: "token"
		}),
		state
	};
}

function loadProperty(propName: string): string {
	return window.localStorage.getItem(`${STORAGE_REALM}/${propName}`);
}

function saveProperty(propName: string, value: string): void {
	window.localStorage.setItem(`${STORAGE_REALM}/${propName}`, value);
}

function removeProperty(propName: string): void {
	window.localStorage.removeItem(`${STORAGE_REALM}/${propName}`);
}

async function checkTokenValidity(
	accessToken: string | undefined,
	showBusy: boolean
): Promise<auth0.Auth0UserProfile | undefined> {
	if (!accessToken) {
		return;
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

export async function login() {
	const { webAuth, state } = createWebAuth();

	const authUrl = webAuth.client.buildAuthorizeUrl({
		redirectUri: authSettings.loginUrl,
		responseType: "token",
		state
	});

	removeProperty(STORE_ACCESS_TOKEN);

	await busyCallback(true);

	authWin = await showWindow(authUrl);

	let completePoll: number | undefined;

	const cleanupWindow = async (isManualClose) => {
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
	};

	await authWin.addListener("closed", async () => {
		if (authWin) {
			await cleanupWindow(true);
		}
	});

	completePoll = window.setInterval(async () => {
		const winUrl = await checkForUrls(authWin, [authSettings.loginUrl]);

		if (winUrl) {
			const authenticatedResultOrError = await checkAuthenticationResult(winUrl);

			if (authenticatedResultOrError.err) {
				informationCallback(
					(authenticatedResultOrError.err.description ??
						authenticatedResultOrError.err.original?.message) as string
				);
				removeProperty(STORE_ACCESS_TOKEN);
			} else if (authenticatedResultOrError.result) {
				informationCallback(`Access token: ${authenticatedResultOrError.result.accessToken}`);
				saveProperty(STORE_ACCESS_TOKEN, authenticatedResultOrError.result.accessToken);
			}

			await cleanupWindow(false);

			if (authenticatedResultOrError.result) {
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
			}
		}
	}, 100);
}

export async function logout() {
	const { webAuth } = createWebAuth();

	// We include the federated support so that any 3rd party providers are also logged out
	// some providers do not return to the returnTo url after logout, so we need to monitor
	// for additional urls to check for logout complete
	const authUrl = webAuth.client.buildLogoutUrl({
		returnTo: authSettings.logoutUrls[0],
		federated: true
	});

	await busyCallback(true);
	authWin = await showWindow(authUrl);

	let completePoll: number | undefined;

	const cleanupWindow = async (isManualClose) => {
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
	};

	await authWin.addListener("closed", async () => {
		if (authWin) {
			await cleanupWindow(true);
		}
	});

	completePoll = window.setInterval(async () => {
		const winUrl = await checkForUrls(authWin, authSettings.logoutUrls);

		if (winUrl) {
			removeProperty(STORE_ACCESS_TOKEN);
			removeProperty(STORE_AUTH_STATE);
			await cleanupWindow(false);
			await authenticatedStateChanged(false);
		}
	}, 100);
}

export function expireAccessToken() {
	removeProperty(STORE_ACCESS_TOKEN);
	removeProperty(STORE_AUTH_STATE);
}

async function authenticatedStateChanged(
	isAuthenticated: boolean,
	userInfo?: auth0.Auth0UserProfile
): Promise<void> {
	pollTimerStop();
	await authenticatedCallback(isAuthenticated, userInfo);
	pollTimerStart(isAuthenticated);
}

function pollTimerStop() {
	if (pollTimerId) {
		window.clearInterval(pollTimerId);
		pollTimerId = undefined;
	}
}

function pollTimerStart(isAuthenticated: boolean) {
	if ((authSettings.verifyPollMs ?? 0) > 0 && isAuthenticated) {
		pollTimerId = window.setInterval(async () => {
			const accessToken = loadProperty(STORE_ACCESS_TOKEN);
			const userInfo = await checkTokenValidity(accessToken, false);
			if (!userInfo) {
				informationCallback("Access token no longer valid, logout");
				removeProperty(STORE_ACCESS_TOKEN);
				removeProperty(STORE_AUTH_STATE);
				await authenticatedStateChanged(false);
			} else {
				informationCallback("Access token still valid");
			}
		}, authSettings.verifyPollMs);
	}
}

async function checkForUrls(win: OpenFin.Window, urls: string[]): Promise<URL | undefined> {
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

async function checkAuthenticationResult(url: URL): Promise<
	| {
			result?: auth0.Auth0DecodedHash;
			err?: auth0.Auth0Error;
	  }
	| undefined
> {
	return new Promise<{
		result?: auth0.Auth0DecodedHash;
		err?: auth0.Auth0Error;
	}>((resolve) => {
		const { webAuth, state } = createWebAuth();
		webAuth.parseHash({ hash: url.hash, state }, (err, result) => {
			resolve({ result, err });
		});
	});
}

async function showWindow(url: string): Promise<OpenFin.Window> {
	return fin.Window.create({
		name: "integrate-with-sso-auth",
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
