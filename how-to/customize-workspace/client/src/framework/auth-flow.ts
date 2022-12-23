import * as authProvider from "./auth";
import { getDefaultHelpers } from "./modules";
import { getConfiguredSettings, isValid as isSettingsValid } from "./settings";
import type { Logger, ModuleHelpers } from "./shapes";
import type { PlatformProviderOptions } from "./shapes/platform-shapes";

let platformInitialized = false;
let providedLogger: Logger;

async function onLogOutOrCancel() {
	if (platformInitialized) {
		providedLogger.info("Calling quit on platform");
		const plat = fin.Platform.getCurrentSync();
		await plat.quit();
	} else {
		providedLogger.info("Platform not yet initialized. Closing provider window");
		const platformWindow = fin.Window.wrapSync(fin.me.identity);
		await platformWindow.close(true);
	}
}

async function manageAuthFlow() {
	providedLogger.info("Authentication required. Requesting login");
	const userLoggedIn = await authProvider.login();
	if (!userLoggedIn) {
		// user cancelled the login process.
		// or exceeded tries.
		// stop the platform from starting.
		providedLogger.warn(
			"User process was cancelled. At this point you should close the application so that the user can relaunch and try again. We are closing the platform"
		);
		await onLogOutOrCancel();
	}
	providedLogger.info("Logged in");
}

export async function init(
	next: (platformSettings?: PlatformProviderOptions) => Promise<boolean>,
	logger: Logger,
	listenForAuthChanges: boolean = false
) {
	providedLogger = logger;
	if (!(await isSettingsValid())) {
		providedLogger.error(
			"The application cannot startup as the source of the setting used to bootstrap this application is not from a valid host. Please update the the list or this logic if required"
		);
		return false;
	}
	const settings = await getConfiguredSettings();

	providedLogger.info("Initializing Auth Check");
	const moduleHelpers: ModuleHelpers = getDefaultHelpers(settings);
	await authProvider.init(settings?.authProvider, moduleHelpers);

	if (authProvider.isAuthenticationEnabled()) {
		const authenticationRequired = await authProvider.isAuthenticationRequired();
		if (listenForAuthChanges) {
			// check for session expiry
			authProvider.subscribe("session-expired", manageAuthFlow);

			// check for logout
			authProvider.subscribe("logged-out", onLogOutOrCancel);
		}
		if (authenticationRequired) {
			return new Promise<boolean>((resolve, reject) => {
				const loggedInSubscription = authProvider.subscribe("logged-in", async () => {
					providedLogger.info("Platform logged in. Setting up platform");
					platformInitialized = await next(settings.platformProvider);
					providedLogger.info("Unsubscribing from logged in events as platform has been initialized");
					authProvider.unsubscribe(loggedInSubscription);
					resolve(platformInitialized);
				});
				manageAuthFlow()
					.then((_) => {
						logger.info("Manage Auth Flow executed.");
						return true;
					})
					.catch((reason) => {
						reject(reason);
					});
			});
		}
		platformInitialized = await next(settings.platformProvider);
	} else {
		platformInitialized = await next(settings.platformProvider);
	}
	return platformInitialized;
}
