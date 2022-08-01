import { fin } from "@openfin/core";
import {
	BrowserInitConfig,
	getCurrentSync,
	init as workspacePlatformInit
} from "@openfin/workspace-platform";
import { getActions } from "./actions";
import * as appProvider from "./apps";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import { getDefaultWindowOptions } from "./browser";
import * as endpointProvider from "./endpoint";
import * as connectionProvider from "./connections";
import { interopOverride } from "./interopbroker";
import { overrideCallback } from "./platform-override";
import { getSettings } from "./settings";
import { CustomSettings } from "./shapes";
import { getThemes } from "./themes";

let platformInitialized = false;

async function onLogOutOrCancel() {
	if (platformInitialized) {
		console.log("Calling quit on platform.");
		const plat = getCurrentSync();
		await plat.quit();
	} else {
		console.log("Platform not yet initialized. Closing provider window.");
		const platformWindow = fin.Window.wrapSync(fin.me.identity);
		await platformWindow.close(true);
	}
}

async function manageAuthFlow() {
	console.log(`Authentication required. Requesting login.`);
	const userLoggedIn = await authProvider.login();
	if (!userLoggedIn) {
		// user cancelled the login process.
		// or exceeded tries.
		// stop the platform from starting.
		console.warn(`User process was cancelled. At this point you 
		should close the application so that the user can relaunch and 
		try again. We are closing the platform.`);
		await onLogOutOrCancel();
	}
	console.log(`Logged in.`);
}

async function setupPlatform(settings: CustomSettings) {
	console.log("Initializing Core Services");
	await endpointProvider.init(settings?.endpointProvider);
	await connectionProvider.init(settings?.connectionProvider);
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

	platformInitialized = true;
}

export async function init() {
	console.log("Initializing Auth Check");
	const settings = await getSettings();
	await authProvider.init(settings.authProvider);
	// in a real application you would feed in your own logger.
	if (isAuthenticationEnabled()) {
		authProvider.setLogger(console.log, console.warn, console.error);
		const authenticationRequired = await authProvider.isAuthenticationRequired();
		if (authenticationRequired) {
			const loggedInSubscription = authProvider.subscribe("logged-in", async () => {
				console.log("Platform logged in. Setting up platform.");
				await setupPlatform(settings);
				console.log("Unsubscribing from logged in events as platform has been initialized.");
				authProvider.unsubscribe(loggedInSubscription);
			});
			await manageAuthFlow();
		} else {
			await setupPlatform(settings);
		}

		// check for session expiry
		authProvider.subscribe("session-expired", manageAuthFlow);

		// check for logout
		authProvider.subscribe("logged-out", onLogOutOrCancel);
	} else {
		await setupPlatform(settings);
	}
}
