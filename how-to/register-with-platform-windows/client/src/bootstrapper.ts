import { deregister as deregisterHome, register as registerHome, show as showHome } from "./home";
import { getSettings } from "./settings";
import { deregister as deregisterStore, register as registerStore, show as showStore } from "./store";

export async function init() {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	console.log("Initialising the bootstrapper");
	const settings = await getSettings();
	let workspaceLoaded = false;
	const setupHome = settings?.bootstrap?.home ?? true;
	const setupStore = settings?.bootstrap?.store ?? true;

	if (setupHome) {
		// only register search logic once workspace is running
		await registerHome();
		workspaceLoaded = true;
		await showHome();
	}

	if (setupStore) {
		await registerStore();
		if (!workspaceLoaded) {
			await showStore();
		}
	}

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregisterStore();
		await deregisterHome();
		await fin.Platform.getCurrentSync().quit();
	});
}
