import { OktaAuth } from "@okta/okta-auth-js";
import { getSettings } from "./settings";
import type { OktaSettings } from "./shapes";
import { randomUUID } from "./uuid";

const STORAGE_REALM = "integrate-with-okta";
const STORE_ACCESS_TOKEN = "token";

let authSettings: OktaSettings;
let informationCallback: (info: string) => void;
let authWin: OpenFin.Window;
let appWin: OpenFin.Window;

/*
code_verifier: cryptographically random string using the chars A-Z, a-z, 0-9 and the punctuation chars hyphen, period, underscore and tilde.
codeChallenge: should be a calculated value of Base64-URL-encoded SHA256 hash of code_verifier.

Note: Okta access token are hard coded to expire in 60 minutes, when using the Okta auth servers.
https://support.okta.com/help/s/article/What-is-the-lifetime-of-the-JWT-tokens?language=en_US#:~:text=When%20using%20the%20Okta%20authorization,Refresh%20Token%3A%20100%20days
*/
const codeVerifier = "Zg6klgrnixQJ629GsawRMV8MjWvwRAr-vyvP1MHnB6X8WKZN";
const codeChallenge = "iF_7prUeJ6rr3jMG3LmhW3R1cZ2ecZavFqS0jtb6tzo";

export async function init(settings: OktaSettings, informationCb: (info: string) => void) {
	informationCallback = informationCb;

	informationCallback("Initialising the authentication");

	authSettings = settings;
	if (!authSettings) {
		informationCallback("Error: Settings missing cannot continue");
	}

	await login();
}

// PKCE workflow - https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
export async function login() {
	const sessionSettings = await getSettings();
	const state = randomUUID();

	removeProperty(STORE_ACCESS_TOKEN);

	const authUrl =
		`${sessionSettings.okta.domain}v1/authorize?client_id=${sessionSettings.okta.clientId}&scope=openid email phone address groups profile` +
		"&response_type=code" +
		"&response_mode=query" +
		"&nonce=nonceStatic" +
		`&redirect_uri=${sessionSettings.okta.loginUrl}` +
		`&code_challenge=${codeChallenge}
		&code_challenge_method=S256` +
		`&state=${state}&sessionToken=session_not_needed`;

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
	};

	await authWin.addListener("closed", async () => {
		if (authWin) {
			await cleanupWindow(true);
		}
	});

	completePoll = window.setInterval(async () => {
		const winUrl = await checkForUrls(authWin, [sessionSettings.okta.loginUrl]);
		console.log(`Inside completePoll - url: ${winUrl}`);

		if (winUrl) {
			const oktaCode = await getOktaCode(winUrl);
			console.log(`Okta code: ${oktaCode}`);

			if (oktaCode === undefined) {
				informationCallback("Get userInfo failed");
			} else {
				const token: string = await getOktaToken(oktaCode);

				if (token === undefined) {
					informationCallback("Could not retrieve access token.");
				} else {
					informationCallback(`Okta Token: ${token}`);
					saveProperty(STORE_ACCESS_TOKEN, token);
					await showAppPage();
				}
			}

			await cleanupWindow(false);
		}
	}, 100);
}

async function getOktaCode(urlAsString) {
	const url = new URL(String(urlAsString));
	const params = url.searchParams;
	return params.get("code");
}

// PKCE workflow - https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
export async function getOktaToken(oktaCode) {
	const sessionSettings = await getSettings();

	const fetchBody =
		"grant_type=authorization_code" +
		`&code=${oktaCode}` +
		`&client_id=${sessionSettings.okta.clientId}` +
		`&code_verifier=${codeVerifier}` +
		`&redirect_uri=${sessionSettings.okta.loginUrl}`;

	const url = `${sessionSettings.okta.domain}v1/token`;

	if (oktaCode) {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: fetchBody
		});
		if (!response.ok) {
			throw new Error("Unable to retrieve access token");
		}

		const tokenResponse = await response.json();
		const accessToken: string = tokenResponse.access_token;

		console.log(`Access Token: ${accessToken}`);

		localStorage.setItem("oktaToken", accessToken);
		return accessToken;
	}
}

export async function loginWithWidget() {
	const authUrl = "http://localhost:8080/widgetLogin.html";

	await showWindow(authUrl);
}

export async function logout() {
	const sessionSettings = await getSettings();

	informationCallback("Logout was called manually.");
	const config = {
		issuer: `${sessionSettings.okta.domain}/oauth2/default`,
		clientId: `${sessionSettings.okta.clientId}`,
		redirectUri: `${sessionSettings.okta.loginUrl}`,
		scopes: ["openid", "profile", "email"],
		tokenManager: {
			storage: "cookie"
		},
		transformAuthState,
		recoveryToken: ""
	};

	const authClient = new OktaAuth(config);

	authClient
		.signOut()
		// eslint-disable-next-line no-return-assign, promise/always-return
		.then(() => {
			informationCallback("Logout was successful.");
			removeProperty(STORE_ACCESS_TOKEN);
			location.reload();
		})
		.catch((err) => console.log(`error on sign out: ${err}`));
}

async function transformAuthState(_authClient, authState) {
	const promise = Promise.resolve(authState);

	if (authState.accessToken && authState.idToken) {
		authState.hasTokens = true;
	}
	return promise;
}

async function showWindow(url: string): Promise<OpenFin.Window> {
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

function saveProperty(propName: string, value: string): void {
	window.localStorage.setItem(`${STORAGE_REALM}/${propName}`, value);
}

function removeProperty(propName: string): void {
	window.localStorage.removeItem(`${STORAGE_REALM}/${propName}`);
}

async function checkForUrls(win: OpenFin.Window, urls: string[]): Promise<URL | undefined> {
	if (!win) {
		return undefined;
	}

	const winInfo = await win.getInfo();

	const isCompleteUrl = urls.some((u) => winInfo.url.includes(u));

	if (isCompleteUrl) {
		const returnedUrl = new URL(winInfo.url);
		const searchParams = returnedUrl.searchParams;
		if (searchParams.get("code") !== null) {
			return new URL(winInfo.url);
		}
	}

	return undefined;
}

async function showAppPage() {
	const settings = await getSettings();

	if (!appWin) {
		appWin = await fin.Window.create({
			name: "integrate-with-sso-app",
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
			url: settings?.okta?.appUrl
		});

		await appWin.on("closed", async () => {
			await appWin.removeAllListeners();
			appWin = undefined;
		});
	}
}
