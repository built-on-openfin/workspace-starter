/* eslint-disable linebreak-style */
import { init as authenticationInit } from "./auth";
import {
	isAuthenticated as providerIsAuthenticated,
	isBusy as providerIsBusy,
	logInformation
} from "./provider";
import { getSettings } from "./settings";

export async function init() {
	console.log("Initialising the bootstrapper");

	const providerWindow = fin.Window.getCurrentSync();

	await providerWindow.once("close-requested", async () => {
		await fin.Platform.getCurrentSync().quit();
	});

	const settings = await getSettings();

	await authenticationInit(settings?.okta, providerIsAuthenticated, providerIsBusy, logInformation);
}
