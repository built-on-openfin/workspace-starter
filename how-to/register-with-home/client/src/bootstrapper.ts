import { deregister, register, show } from "./home";

export async function init() {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	console.log("Initialising the bootstrapper");
	await register();
	await show();
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregister();
		await fin.Platform.getCurrentSync().quit();
	});
}
