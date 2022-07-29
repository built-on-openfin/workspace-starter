import { fin } from "@openfin/core";
import { deregister as deregisterDock, register as registerDock, show as showDock } from "./dock";
import { deregister as deregisterHome, register as registerHome, show as showHome } from "./home";
import {
	deregister as deregisterNotifications,
	register as registerNotifications,
	show as showNotifications
} from "./notifications";
import { deregister as deregisterStore, register as registerStore, show as showStore } from "./store";

export async function init() {
	await registerHome();
	await registerStore();
	await registerDock();
	await registerNotifications();

	await showHome();
	await showStore();
	await showDock();
	await showNotifications();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregisterStore();
		await deregisterHome();
		await deregisterDock();
		await deregisterNotifications();
		await fin.Platform.getCurrentSync().quit();
	});
}
