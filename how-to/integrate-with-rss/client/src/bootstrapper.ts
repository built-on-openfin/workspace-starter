import { fin } from "@openfin/core";
import { findAndActivateView, launchPage, launchView, launchWindow } from "./browser";
import { deregister as deregisterHome, register as registerHome, show as showHome } from "./home";
import { deregister as deregisterIntegration, register as registerIntegration } from "./integrations";
import { getSettings } from "./settings";

export async function init() {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	console.log("Initialising the bootstrapper");
	const settings = await getSettings();

	await registerHome();
	await showHome();

	await registerIntegration(
		{
			launchView,
			launchPage,
			launchWindow,
			findAndActivateView
		},
		settings.integrationProvider
	);

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregisterIntegration(settings.integrationProvider);
		await deregisterHome();
		await fin.Platform.getCurrentSync().quit();
	});
}
