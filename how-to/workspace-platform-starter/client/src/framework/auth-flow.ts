import * as authProvider from "./auth";
import { getDefaultHelpers } from "./modules";
import * as PlatformSplash from "./platform/platform-splash";
import { isValidHostForManifest } from "./settings";
import type { AuthProviderOptions, Logger, ModuleHelpers } from "./shapes";

let platformInitialized = false;
let logger: Logger | undefined;

/**
 * Initialize the authentication flow.
 * @param options Options for the auth provider.
 * @param next The next method to call in the auth chain.
 * @param initLogger Logger for outputting any information.
 * @param listenForAuthChanges Listen for the events from the auth provider.
 * @returns The result of the next method call.
 */
export async function init(
	options: AuthProviderOptions | undefined,
	next: () => Promise<boolean>,
	initLogger: Logger,
	listenForAuthChanges: boolean = false
): Promise<boolean> {
	logger = initLogger;

	if (!(await isValidHostForManifest())) {
		logger.error(
			"The application cannot startup as the source of the setting used to bootstrap this application is not from a valid host. Please update the the list or this logic if required"
		);
		return false;
	}

	logger.info("Initializing Auth Check");
	const moduleHelpers: ModuleHelpers = getDefaultHelpers();
	await authProvider.init(options, moduleHelpers);

	if (authProvider.isAuthenticationEnabled()) {
		await PlatformSplash.updateProgress("Authentication");

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
					initLogger.info("Platform logged in. Setting up platform");
					platformInitialized = await next();
					initLogger.info("Unsubscribing from logged in events as platform has been initialized");
					if (loggedInSubscription) {
						authProvider.unsubscribe(loggedInSubscription);
					}
					resolve(platformInitialized);
				});

				manageAuthFlow()
					.then((_) => {
						initLogger.info("Manage Auth Flow executed.");
						return true;
					})
					.catch((reason) => {
						reject(reason);
					});
			});
		}
	}
	return next();
}

/**
 * Process the authentication flow being cancelled or logged out.
 */
async function onLogOutOrCancel(): Promise<void> {
	if (platformInitialized) {
		logger?.info("Calling quit on platform");
		const plat = fin.Platform.getCurrentSync();
		await plat.quit();
	} else {
		logger?.info("Platform not yet initialized. Closing provider window");
		const platformWindow = fin.Window.wrapSync(fin.me.identity);
		await platformWindow.close(true);
	}
}
/**
 * Login the user and handle results.
 */
async function manageAuthFlow(): Promise<void> {
	logger?.info("Authentication required. Requesting login");
	const userLoggedIn = await authProvider.login();
	if (userLoggedIn) {
		logger?.info("Logged in");
	} else {
		// user cancelled the login process.
		// or exceeded tries.
		// stop the platform from starting.
		logger?.warn(
			"User process was cancelled. At this point you should close the application so that the user can relaunch and try again. We are closing the platform"
		);
		await onLogOutOrCancel();
	}
}
