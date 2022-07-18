import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { getActions } from "./actions";
import * as appProvider from "./apps";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import { getDefaultWindowOptions } from "./browser";
import * as endpointProvider from "./endpoint";
import { interopOverride } from "./interopbroker";
import { overrideCallback } from "./platform-override";
import { getSettings, getThemes } from "./settings";

export async function init() {
	console.log("Initializing Core Services");
	const settings = await getSettings();
	await authProvider.init(settings.authProvider);
	// in a real application you would feed in your own logger.
	if (isAuthenticationEnabled()) {
		authProvider.setLogger(console.log, console.warn, console.error);
		if (await authProvider.isAuthenticationRequired()) {
			console.log(`Authentication required. Requesting login.`);
			const userLoggedIn = await authProvider.login();
			if (!userLoggedIn) {
				// user cancelled the login process.
				// or exceeded tries.
				// stop the platform from starting.
				console.warn(`User process was cancelled. At this point you 
				should close the application so that the user can relaunch and 
				try again. We are closing the provider window before bootstrapping the platform.`);
				const platformWindow = fin.Window.wrapSync(fin.me.identity);
				await platformWindow.close(true);
				return;
			}
			console.log(`Logged in.`);
		} else {
			console.log(`Authentication not required.`);
		}
	}

	await endpointProvider.init(settings?.endpointProvider);
	await appProvider.init(settings?.appProvider, endpointProvider);

	console.log("Initializing platform");
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();
	}

	console.log("Specifying following browser options:", browser);

	const customActions = await getActions();
	const theme = await getThemes();

	await workspacePlatformInit({
		browser,
		theme,
		customActions,
		interopOverride,
		overrideCallback
	});
}
