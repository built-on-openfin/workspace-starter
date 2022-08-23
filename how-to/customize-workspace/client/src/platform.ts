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
import { logger } from "./logger-provider";
import { overrideCallback } from "./platform-override";
import { getSettings, isValid as isSettingsValid } from "./settings";
import { CustomSettings } from "./shapes";
import { getThemes } from "./themes";

const LOGGER_GROUP = "Platform";

let platformInitialized = false;

async function onLogOutOrCancel() {
	if (platformInitialized) {
		logger.info(LOGGER_GROUP, "Calling quit on platform");
		const plat = getCurrentSync();
		await plat.quit();
	} else {
		logger.info(LOGGER_GROUP, "Platform not yet initialized. Closing provider window");
		const platformWindow = fin.Window.wrapSync(fin.me.identity);
		await platformWindow.close(true);
	}
}

async function manageAuthFlow() {
	logger.info(LOGGER_GROUP, "Authentication required. Requesting login");
	const userLoggedIn = await authProvider.login();
	if (!userLoggedIn) {
		// user cancelled the login process.
		// or exceeded tries.
		// stop the platform from starting.
		logger.warn(
			LOGGER_GROUP,
			"User process was cancelled. At this point you should close the application so that the user can relaunch and try again. We are closing the platform"
		);
		await onLogOutOrCancel();
	}
	logger.info(LOGGER_GROUP, "Logged in");
}

async function setupPlatform(settings: CustomSettings) {
	logger.info(LOGGER_GROUP, "Initializing Core Services");
	await endpointProvider.init(settings?.endpointProvider);
	await connectionProvider.init(settings?.connectionProvider);
	await appProvider.init(settings?.appProvider, endpointProvider);

	logger.info(LOGGER_GROUP, "Initializing platform");
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();
	}

	logger.info(LOGGER_GROUP, "Specifying following browser options", browser);

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
	if (!(await isSettingsValid())) {
		logger.error(
			LOGGER_GROUP,
			"The application cannot startup as the source of the setting used to bootstrap this application is not from a valid host. Please update the the list or this logic if required"
		);
		return;
	}
	const settings = await getSettings();

	await logger.initialize(settings?.loggerProvider);

	logger.info(LOGGER_GROUP, "Initializing Auth Check");
	await authProvider.init(settings.authProvider, logger);
	// in a real application you would feed in your own logger.
	if (isAuthenticationEnabled()) {
		const authenticationRequired = await authProvider.isAuthenticationRequired();
		if (authenticationRequired) {
			const loggedInSubscription = authProvider.subscribe("logged-in", async () => {
				logger.info(LOGGER_GROUP, "Platform logged in. Setting up platform");
				await setupPlatform(settings);
				logger.info(LOGGER_GROUP, "Unsubscribing from logged in events as platform has been initialized");
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
