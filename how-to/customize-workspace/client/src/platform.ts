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
import * as connectionProvider from "./connections";
import * as endpointProvider from "./endpoint";
import { interopOverride } from "./interopbroker";
import { createLogger, loggerProvider } from "./logger-provider";
import { overrideCallback } from "./platform-override";
import { getSettings, isValid as isSettingsValid } from "./settings";
import { CustomSettings } from "./shapes";
import { getThemes } from "./themes";

const logger = createLogger("Platform");

let platformInitialized = false;

async function onLogOutOrCancel() {
	if (platformInitialized) {
		logger.info("Calling quit on platform");
		const plat = getCurrentSync();
		await plat.quit();
	} else {
		logger.info("Platform not yet initialized. Closing provider window");
		const platformWindow = fin.Window.wrapSync(fin.me.identity);
		await platformWindow.close(true);
	}
}

async function manageAuthFlow() {
	logger.info("Authentication required. Requesting login");
	const userLoggedIn = await authProvider.login();
	if (!userLoggedIn) {
		// user cancelled the login process.
		// or exceeded tries.
		// stop the platform from starting.
		logger.warn(
			"User process was cancelled. At this point you should close the application so that the user can relaunch and try again. We are closing the platform"
		);
		await onLogOutOrCancel();
	}
	logger.info("Logged in");
}

async function setupPlatform(settings: CustomSettings) {
	logger.info("Initializing Core Services");
	await endpointProvider.init(settings?.endpointProvider);
	await connectionProvider.init(settings?.connectionProvider);
	await appProvider.init(settings?.appProvider, endpointProvider);

	logger.info("Initializing platform");
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();
	}

	logger.info("Specifying following browser options", browser);

	const customActions = await getActions(settings?.actionsProvider);
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
	if (!(await isSettingsValid())) {
		logger.error(
			"The application cannot startup as the source of the setting used to bootstrap this application is not from a valid host. Please update the the list or this logic if required"
		);
		return;
	}
	const settings = await getSettings();

	await loggerProvider.initialize(settings?.loggerProvider);

	logger.info("Initializing Auth Check");
	await authProvider.init(settings.authProvider);
	// in a real application you would feed in your own logger.
	if (isAuthenticationEnabled()) {
		const authenticationRequired = await authProvider.isAuthenticationRequired();
		if (authenticationRequired) {
			const loggedInSubscription = authProvider.subscribe("logged-in", async () => {
				logger.info("Platform logged in. Setting up platform");
				await setupPlatform(settings);
				logger.info("Unsubscribing from logged in events as platform has been initialized");
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
