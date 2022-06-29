import { fin } from "@openfin/core";
import {
	login as authenticationLogin,
	logout as authenticationLogout,
	expireAccessToken as authenticationExpireAccessToken
} from "./auth";
import { init as bootstrap } from "./bootstrapper";
import { init as initialisePlatform } from "./platform";
import { getSettings } from "./settings";

let appWin: OpenFin.Window;
let authIsBusy: boolean;
let authenticated: boolean;

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();

	await platform.once("platform-api-ready", async () => bootstrap());

	initDom();

	await initialisePlatform();
});

export async function isAuthenticated(isAuthed: boolean, userProfile: { name: string }) {
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

	const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
	btnApp.addEventListener("click", async () => {
		await showAppPage();
	});

	const btnLogin = document.querySelector("#btnLogin");
	btnLogin.addEventListener("click", async () => {
		logInformation("Login page was manually opened");
		await authenticationLogin();
	});

	const btnLogout = document.querySelector("#btnLogout");
	btnLogout.addEventListener("click", async () => {
		logInformation("Logout page was manually opened");
		await authenticationLogout();
	});

	const btnExpire = document.querySelector("#btnExpire");
	btnExpire.addEventListener("click", () => {
		logInformation("Access token was manually expired, app will close after next validity check");
		authenticationExpireAccessToken();
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
			url: settings?.auth?.appUrl
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

	const btnLogout = document.querySelector<HTMLButtonElement>("#btnLogout");
	btnLogout.disabled = authIsBusy || !authenticated;

	const btnExpire = document.querySelector<HTMLButtonElement>("#btnExpire");
	btnExpire.disabled = authIsBusy || !authenticated;

	const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
	btnApp.disabled = authIsBusy || !authenticated || appWin !== undefined;
}
