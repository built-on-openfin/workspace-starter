import { fin } from "@openfin/core";
import { deregister as deregisterHome, register as registerHome, show as showHome } from "./home";

export async function init() {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	console.log("Initialising the bootstrapper");

	// only register search logic once workspace is running
	await registerHome();
	await showHome();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregisterHome();
		await fin.Platform.getCurrentSync().quit();
	});
}
