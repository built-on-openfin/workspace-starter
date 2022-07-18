let logInfo = console.log;
let logWarning = console.warn;
let logError = console.error;
let authRequiredCallback: (authenticationRequired: boolean) => void;
let authenticated: boolean;
let authOptions: ExampleOptions;
interface ExampleOptions {
	autoLogin: boolean;
	authenticatedUrl: string;
	loginUrl: string;
	logoutUrl: string;
	loginHeight: number;
	loginWidth: number;
	checkLoginStatusInSeconds: number;
	checkSessionValidityInSeconds: number;
}

const EXAMPLE_AUTH_AUTHENTICATED_KEY = "EXAMPLE_AUTH_IS_AUTHENTICATED";

async function openLoginWindow(url: string): Promise<OpenFin.Window> {
	return fin.Window.create({
		name: "example-auth-log-in",
		alwaysOnTop: true,
		maximizable: false,
		minimizable: false,
		autoShow: false,
		defaultCentered: true,
		defaultHeight: authOptions.loginHeight ?? 250,
		defaultWidth: authOptions.loginWidth ?? 400,
		includeInSnapshots: false,
		resizable: false,
		showTaskbarIcon: false,
		saveWindowState: false,
		url
	});
}

async function openLogoutWindow(url: string): Promise<OpenFin.Window> {
	return fin.Window.create({
		name: "example-auth-log-out",
		maximizable: false,
		minimizable: false,
		autoShow: false,
		defaultCentered: true,
		defaultHeight: authOptions.loginHeight ?? 250,
		defaultWidth: authOptions.loginWidth ?? 400,
		includeInSnapshots: false,
		resizable: false,
		showTaskbarIcon: false,
		saveWindowState: false,
		url
	});
}

async function checkAuth(url: string): Promise<boolean> {
	const windowToCheck = await fin.Window.create({
		name: "example-auth-check-window",
		alwaysOnTop: true,
		maximizable: false,
		minimizable: false,
		autoShow: false,
		defaultHeight: authOptions.loginHeight ?? 250,
		defaultWidth: authOptions.loginWidth ?? 400,
		includeInSnapshots: false,
		resizable: false,
		showTaskbarIcon: false,
		saveWindowState: false,
		url
	});
	let isAuthenticated = false;
	try {
		const info = await windowToCheck.getInfo();
		if (info.url === authOptions.authenticatedUrl) {
			isAuthenticated = true;
		}
	} catch (error) {
		logError(`Error encountered while checking session.`, error);
	} finally {
		if (windowToCheck !== undefined) {
			await windowToCheck.close(true);
		}
	}
	return isAuthenticated;
}

async function getAuthenticationFromUser(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		openLoginWindow(authOptions.loginUrl)
			.then(async (win) => {
				try {
					if (win !== undefined) {
						const info = await win.getInfo();
						if (info.url === authOptions.authenticatedUrl) {
							await win.close(true);
							resolve(true);
							return true;
						}
						await win.show(true);
					}
				} catch (error) {
					logError(`Error while checking if login window automatically redirected. Error ${error.message}`);
					if (win !== undefined) {
						await win.show(true);
					}
				}

				let statusCheck: number;

				await win.addListener("closed", async () => {
					if (win) {
						window.clearInterval(statusCheck);
						statusCheck = undefined;
						logInfo("Example Auth: Auth Window cancelled by user.");
						win = undefined;
						resolve(false);
						return false;
					}
				});
				statusCheck = window.setInterval(async () => {
					if (win !== undefined) {
						const winInfo = await win.getInfo();
						if (winInfo.url === authOptions.authenticatedUrl) {
							window.clearInterval(statusCheck);
							await win.removeAllListeners();
							await win.close(true);
							resolve(true);
							return true;
						}
					} else {
						resolve(false);
						return false;
					}
				}, authOptions.checkLoginStatusInSeconds ?? 1 * 1000);
				return true;
			})
			.catch((error) => {
				console.error(`Error while trying to authenticate the user`, error);
			});
	});
}

function checkForSessionExpiry() {
	if (
		authOptions?.checkSessionValidityInSeconds !== undefined &&
		authOptions?.checkSessionValidityInSeconds > -1
	) {
		setTimeout(async () => {
			const stillAuthenticated = await checkAuth(authOptions.loginUrl);
			if (stillAuthenticated) {
				logInfo("Example Auth: Session Still Active.");
				checkForSessionExpiry();
			} else {
				logInfo(`Example Auth: Session not valid. Killing session and notifying registered callback that authentication is required. This check is configured in the data for this example auth module.
				Set checkSessionValidityInSeconds to -1 in the authProvider module definition if you wish to disable this check.`);
				authenticated = false;
				localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
				if (authRequiredCallback !== undefined) {
					authRequiredCallback(true);
				}
			}
		}, authOptions.checkSessionValidityInSeconds * 1000);
	}
}

export async function init(options: unknown) {
	if (authOptions === undefined) {
		logInfo("Example Auth: Setting options.");
		authOptions = options as ExampleOptions;
		authenticated = Boolean(localStorage.getItem(EXAMPLE_AUTH_AUTHENTICATED_KEY));
		if (authenticated) {
			checkForSessionExpiry();
		}
	} else {
		logWarning("Example Auth: Options have already been set as init has already been called.");
	}
}

export async function login(): Promise<boolean> {
	logInfo("Example Auth: login requested");
	if (authenticated) {
		logInfo("User already authenticated");
		return authenticated;
	}
	if (authOptions.autoLogin) {
		logInfo("Example Auth: autoLogin enabled in auth provide module settings. Fake logged in.");
		authenticated = true;
	} else {
		authenticated = await getAuthenticationFromUser();
	}

	if (authenticated) {
		localStorage.setItem(EXAMPLE_AUTH_AUTHENTICATED_KEY, authenticated.toString());
		checkForSessionExpiry();
	}

	return authenticated;
}

export async function logout(): Promise<boolean> {
	return new Promise<boolean>((resolve, reject) => {
		if (authenticated === undefined || !authenticated) {
			logError("Example Auth: You have requested to log out but are not logged in.");
			resolve(false);
			return false;
		}
		logInfo("Example Auth: Log out requested.");
		authenticated = false;
		localStorage.removeItem(EXAMPLE_AUTH_AUTHENTICATED_KEY);
		if (
			authOptions.logoutUrl !== undefined &&
			authOptions.logoutUrl !== null &&
			authOptions.loginUrl.trim().length > 0
		) {
			openLogoutWindow(authOptions.logoutUrl)
				.then((win) => {
					// give time for the logout window to load.
					setTimeout(async () => {
						await win.close();
						resolve(true);
						return true;
					}, 2000);
					return true;
				})
				.catch((error) => {
					logError(`Error while launching logout window. ${error}`);
					resolve(false);
					return false;
				});
		} else {
			resolve(true);
			return true;
		}
	});
}

export async function isAuthenticationRequired(
	callback?: (authenticationRequired: boolean) => void
): Promise<boolean> {
	if (callback !== undefined) {
		if (authRequiredCallback === undefined) {
			logInfo("Example Auth: Assigning passed callback");
			authRequiredCallback = callback;
		} else {
			logWarning("Example Auth: This is only a sample and only accepts one callback registration.");
		}
	}

	if (authenticated === undefined) {
		authenticated = false;
	}
	return !authenticated;
}

export async function getUserInfo<T>(): Promise<T> {
	if (authenticated === undefined || !authenticated) {
		logWarning("Example Auth: Unable to retrieve user info unless the user is authenticated.");
	} else {
		logInfo("Example Auth: This example does not return any user info. Returning null.");
	}
	return null;
}

export function setLogger(
	info: (message: string) => void,
	warn: (message: string) => void,
	error: (message: string) => void
): void {
	if (info !== undefined) {
		logInfo = info;
	}
	if (warn !== undefined) {
		logWarning = warn;
	}
	if (error !== undefined) {
		logError = error;
	}
}
