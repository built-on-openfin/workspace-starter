import { getSettings } from "./settings";
import type { OktaSettings, OktaIdentitySettings } from "./shapes";

let authSettings: OktaSettings;
let busyCallback: (isBusy: boolean) => Promise<void>;
let informationCallback: (info: string) => void;

export async function init(
	settings: OktaSettings,
	authenticatedCb: (isAuthenticated: boolean, userInfo?: OktaIdentitySettings) => Promise<void>,
	busyCb: (isBusy: boolean) => Promise<void>,
	informationCb: (info: string) => void
) {
	busyCallback = busyCb;
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

export async function login() {
	const sessionSettings = await getSettings();
	const codeChallenge = makeid(32);
	const state = makeid(32);

	const authUrl =
		`${sessionSettings.okta.domain}v1/authorize?client_id=${sessionSettings.okta.clientId}&scope=openid email phone address groups profile` +
		"&response_type=code" +
		"&response_mode=query" +
		"&nonce=nonceStatic" +
		`&code_challenge=${codeChallenge}
		&code_challenge_method=S256` +
		`&redirect_uri=${sessionSettings.okta.redirectUrl}
		&state=${state}
		&sessionToken=session_not_needed`;

	await busyCallback(true);

	await showWindow(authUrl);
}

async function showWindow(url: string): Promise<OpenFin.Window> {
	return fin.Window.create({
		name: "integrate-with-okta-auth",
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
