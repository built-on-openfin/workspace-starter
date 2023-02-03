/* eslint-disable linebreak-style */
import { login as authenticationLogin } from "./auth";
import { init as bootstrap } from "./bootstrapper";
import { init as initialisePlatform } from "./platform";
import { getSettings } from "./settings";
import type { OktaIdentitySettings } from "./shapes";

let appWin: OpenFin.Window;
let authIsBusy: boolean;
let authenticated: boolean;

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();

	await platform.once("platform-api-ready", async () => bootstrap());

	initDom();

	await initialisePlatform();
});

export async function isAuthenticated(isAuthed: boolean, userProfile: OktaIdentitySettings) {
	authenticated = isAuthed;

	if (userProfile) {
		logInformation("User Profile");
		logInformation(JSON.stringify(userProfile));
	}

	updateButtonStates();

	if (authenticated) {
		await showAppPage();
	} else {
		await hideAppPage();
	}
}

export async function isBusy(busy) {
	authIsBusy = busy;
	updateButtonStates();
}

export function logInformation(info: string) {
	const logElem = document.querySelector("#logOutput");

	logElem.textContent = `${logElem.textContent + info}\n\n`;
	logElem.scrollTop = logElem.scrollHeight;
}

function logClear() {
	const logElem = document.querySelector("#logOutput");
	logElem.textContent = "";
	logElem.scrollTop = 0;
}

function initDom() {
	const btnClear = document.querySelector("#btnClear");
	btnClear.addEventListener("click", async () => {
		logClear();
	});

	const btnLogin = document.querySelector("#btnLogin");
	btnLogin.addEventListener("click", async () => {
		logInformation("Login page was manually opened");
		await authenticationLogin();
	});
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
			url: settings?.okta.appUrl
		});

		await appWin.on("closed", async () => {
			await appWin.removeAllListeners();
			appWin = undefined;
			updateButtonStates();
		});

		updateButtonStates();
	}
}

async function hideAppPage() {
	if (appWin) {
		await appWin.close(true);
	} else {
		updateButtonStates();
	}
}

function updateButtonStates() {
	const btnLogin = document.querySelector<HTMLButtonElement>("#btnLogin");
	btnLogin.disabled = authIsBusy || authenticated;
}
