import type OpenFin from "@openfin/core";
import { init } from "@openfin/workspace-platform";
import { authenticationInit, expireAccessToken, login, logout } from "./auth";
import type { CustomSettings } from "./shapes";

const PLATFORM_ID = "integrate-with-okta";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let appWin: OpenFin.Window | undefined;
let authIsBusy: boolean = false;
let authenticated: boolean = false;

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// If the custom settings contain auth then initialize it
	const customSettings = await getManifestCustomSettings();

	// Get the DOM elements from the provider.html page and initialize them
	await initializeDOM(customSettings);

	// If we have the auth settings in manifest.fin.json the initial auth workflows
	if (customSettings?.auth) {
		if (customSettings.auth.domain === "<DOMAIN>") {
			logInformation("The customSettings.auth in manifest.fin.json are not configured");
		} else {
			await authenticationInit(
				customSettings.auth,
				PLATFORM_ID,
				async (isAuthenticated, userClaims) =>
					setIsAuthenticated(customSettings, isAuthenticated, userClaims),
				setIsBusy,
				logInformation
			);
		}
	} else {
		logInformation("There are no customSettings.auth in manifest.fin.json");
	}
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		]
	});
}

/**
 * Initialize workspace components.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}

/**
 * Initialize the DOM elements.
 * @param customSettings The custom settings from the manifest.fin.json
 */
async function initializeDOM(customSettings: CustomSettings): Promise<void> {
	const btnClear = document.querySelector("#btnClear");
	if (btnClear) {
		btnClear.addEventListener("click", async () => {
			logClear();
		});
	}

	const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
	if (btnApp) {
		btnApp.addEventListener("click", async () => {
			await showAppPage(customSettings);
		});
	}

	const btnLogin = document.querySelector("#btnLogin");
	if (btnLogin) {
		btnLogin.addEventListener("click", async () => {
			logInformation("Login page was manually opened");
			await login();
		});
	}

	const btnLogout = document.querySelector("#btnLogout");
	if (btnLogout) {
		btnLogout.addEventListener("click", async () => {
			logInformation("Logout page was manually triggered");
			await logout();
			await hideAppPage();
		});
	}

	const btnExpire = document.querySelector("#btnExpire");
	if (btnExpire) {
		btnExpire.addEventListener("click", async () => {
			logInformation("Access token was manually expired, app will close after next validity check");
			await expireAccessToken();
		});
	}
}

/**
 * Update the authentication state of the user.
 * @param customSettings The custom settings from the manifest.fin.json
 * @param isAuthenticated Is the user authenticated.
 * @param user The profile for the user.
 */
async function setIsAuthenticated(
	customSettings: CustomSettings,
	isAuthenticated: boolean,
	user?: unknown
): Promise<void> {
	authenticated = isAuthenticated;

	if (user) {
		logInformation("User Profile");
		logInformation(JSON.stringify(user));
	}

	updateButtonStates();

	if (authenticated) {
		await showAppPage(customSettings);
	} else {
		await hideAppPage();
	}
}

/**
 * Set the busy state for the app.
 * @param busy Is the app busy,
 */
async function setIsBusy(busy: boolean): Promise<void> {
	authIsBusy = busy;
	updateButtonStates();
}

/**
 * Log some information to the logging element.
 * @param info The information to log.
 */
function logInformation(info: string): void {
	const logElem = document.querySelector("#logOutput");

	if (logElem) {
		logElem.textContent = `${logElem.textContent + info}\n\n`;
		logElem.scrollTop = logElem.scrollHeight;
	}
}

/**
 * Clear the logging information.
 */
function logClear(): void {
	const logElem = document.querySelector("#logOutput");
	if (logElem) {
		logElem.textContent = "";
		logElem.scrollTop = 0;
	}
}

/**
 * Show the application page.
 * @param customSettings The custom settings from the manifest.fin.json
 */
async function showAppPage(customSettings: CustomSettings): Promise<void> {
	if (!appWin) {
		appWin = await fin.Window.create({
			name: `${PLATFORM_ID}-app`,
			alwaysOnTop: true,
			maximizable: false,
			minimizable: false,
			autoShow: true,
			defaultCentered: true,
			defaultHeight: 700,
			defaultWidth: 600,
			includeInSnapshots: false,
			resizable: false,
			showTaskbarIcon: false,
			url: customSettings?.auth?.appUrl
		});

		await appWin.on("closed", async () => {
			if (appWin) {
				await appWin.removeAllListeners();
				appWin = undefined;
			}

			updateButtonStates();
		});

		updateButtonStates();
	}
}

/**
 * Hide the application page.
 */
async function hideAppPage(): Promise<void> {
	if (appWin) {
		await appWin.close(true);
	} else {
		updateButtonStates();
	}
}

/**
 * Update the states of all the buttons based on the auth state.
 */
function updateButtonStates(): void {
	const btnLogin = document.querySelector<HTMLButtonElement>("#btnLogin");
	if (btnLogin) {
		btnLogin.disabled = authIsBusy || authenticated;
	}

	const btnLogout = document.querySelector<HTMLButtonElement>("#btnLogout");
	if (btnLogout) {
		btnLogout.disabled = authIsBusy || !authenticated;
	}

	const btnExpire = document.querySelector<HTMLButtonElement>("#btnExpire");
	if (btnExpire) {
		btnExpire.disabled = authIsBusy || !authenticated;
	}

	const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
	if (btnApp) {
		btnApp.disabled = authIsBusy || !authenticated || appWin !== undefined;
	}
}
