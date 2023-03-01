import { OktaAuth } from "@okta/okta-auth-js";
import { getAccessToken } from "./app";
import { getSettings } from "./settings";
import type { OktaSettings } from "./shapes";

let authSettings: OktaSettings;
let informationCallback: (info: string) => void;

/*
code_verifier: cryptographically random string using the chars A-Z, a-z, 0-9 and the punctuation chars hyphen, period, underscore and tilde.
codeChallenge: should be a calculated value of Base64-URL-encoded SHA256 hash of code_verifier.
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
}

function makeid(length): string {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

// PKCE workflow - https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
export async function login() {
	const sessionSettings = await getSettings();
	const state = makeid(32);

	const authUrl =
		`${sessionSettings.okta.domain}v1/authorize?client_id=${sessionSettings.okta.clientId}&scope=openid email phone address groups profile` +
		"&response_type=code" +
		"&response_mode=query" +
		"&nonce=nonceStatic" +
		`&redirect_uri=${sessionSettings.okta.redirectUrl}` +
		`&code_challenge=${codeChallenge}
		&code_challenge_method=S256` +
		`&state=${state}&sessionToken=session_not_needed`;

	await showWindow(authUrl);
}

// PKCE workflow - https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce
export async function getOktaToken(oktaCode) {
	const sessionSettings = await getSettings();

	const fetchBody = "grant_type=authorization_code" +
	`&code=${oktaCode}` +
	`&client_id=${sessionSettings.okta.clientId}` +
	`&code_verifier=${codeVerifier}` +
	`&redirect_uri=${sessionSettings.okta.redirectUrl}`;

	const url = `${sessionSettings.okta.domain}v1/token`;

	let oktaAccessToken;

	if (oktaCode) {
		await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: fetchBody
			})
			.then(async (response) => {
				if (!response.ok) {
					throw new Error("Unable to retrieve access token");
				}

				return response.json();
				})
			// eslint-disable-next-line promise/always-return
			.then((data) => {
				const accessToken = data.access_token;
				oktaAccessToken = accessToken;
				console.log(`Access Token: ${accessToken}`);
				// informationCallback(`Access Token: ${accessToken}`); --> Error: TypeError informationCallback is not a function ???
				localStorage.setItem("oktaToken", String(accessToken));
				return String(accessToken);
				})
			.catch((error) => {
				console.log(`Error thrown: ${error}`);
				throw error;
				});
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
		redirectUri: `${sessionSettings.okta.redirectUrl}`,
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
			localStorage.removeItem("oktaToken");
			location.reload();
			// returnToPlatform())
		})
		.catch((err) => console.log(`error on sign out: ${err}`));
}

function returnToPlatform() {
	window.location.href = "http://localhost:8080/platform/provider.html";
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

