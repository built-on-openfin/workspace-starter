import { themeBuilderApp } from "./apps";
import { launchView } from "./browser";
import { deregister as deregisterDock, register as registerDock, show as showDock } from "./dock";
import { deregister as deregisterHome, register as registerHome, show as showHome } from "./home";
import {
	deregister as deregisterNotifications,
	register as registerNotifications,
	show as showNotifications
} from "./notifications";
import type { ThemeDisplayOptions } from "./shapes";
import { deregister as deregisterStore, register as registerStore, show as showStore } from "./store";

export async function init(themeDisplayOptions?: ThemeDisplayOptions) {
	await registerHome();
	await registerStore();
	await registerDock();
	await registerNotifications();

	if (themeDisplayOptions?.home ?? true) {
		await showHome();
	}
	if (themeDisplayOptions?.store ?? true) {
		await showStore();
	}
	if (themeDisplayOptions?.dock ?? true) {
		await showDock();
	}
	if (themeDisplayOptions?.notifications ?? true) {
		await showNotifications();
	}
	if (themeDisplayOptions?.browser ?? true) {
		const manifestResponse = await fetch(themeBuilderApp.manifest);
		const json = await manifestResponse.json();
		await launchView(json as OpenFin.ViewOptions);
	}

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregisterStore();
		await deregisterHome();
		await deregisterDock();
		await deregisterNotifications();
		await fin.Platform.getCurrentSync().quit();
	});
}
