import { login as authenticationLogin, loginWithWidget as authenticationLoginWithWidget } from "./auth";
import { init as bootstrap } from "./bootstrapper";
import { init as initialisePlatform } from "./platform";

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();

	await platform.once("platform-api-ready", async () => bootstrap());

	initDom();

	await initialisePlatform();
});

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

	const btnLoginWidget = document.querySelector("#btnLoginWidget");
	btnLoginWidget.addEventListener("click", async () => {
		logInformation("Login using Widget was manually opened");
		await authenticationLoginWithWidget();
	});
}
