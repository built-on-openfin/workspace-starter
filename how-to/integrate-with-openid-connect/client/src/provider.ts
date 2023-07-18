import type OpenFin from "@openfin/core";
import { type OidcAuthenticationResult, authenticate, enableLogging } from "@openfin/openid-connect";
import { init } from "@openfin/workspace-platform";
import type { CustomSettings } from "./shapes";

const PLATFORM_ID = "integrate-with-openid-connect";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let appWin: OpenFin.Window | undefined;
let appManifest: OpenFin.Application | undefined;
let authIsBusy: boolean = false;
let authResult: OidcAuthenticationResult | undefined;

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
		if (
			customSettings.auth.providerUrl === "<PROVIDERURL>" ||
			customSettings.auth.clientId === "<CLIENTID>"
		) {
			logInformation("The customSettings.auth in manifest.fin.json are not configured");
		} else {
			enableLogging();
			logInformation("Login page was automatically opened");
			await login(customSettings);
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
			const selectLaunchMode = document.querySelector<HTMLSelectElement>("#launchMode");
			if (selectLaunchMode) {
				if (selectLaunchMode.value === "window") {
					await launchAppWindow(customSettings);
				} else if (selectLaunchMode.value === "manifest") {
					await launchAppManifest(customSettings);
				}
			}
		});
	}

	const btnLogin = document.querySelector("#btnLogin");
	if (btnLogin) {
		btnLogin.addEventListener("click", async () => {
			logInformation("Login page was manually opened");
			await login(customSettings);
		});
	}

	const btnLogout = document.querySelector("#btnLogout");
	if (btnLogout) {
		btnLogout.addEventListener("click", async () => {
			logInformation("Logout page was manually triggered");
			await logout(customSettings);
		});
	}

	const selectLaunchMode = document.querySelector<HTMLSelectElement>("#launchMode");
	if (selectLaunchMode) {
		selectLaunchMode.addEventListener("change", () => {});
	}
}

/**
 * Login using the OIDC provider.
 * @param customSettings The custom settings.
 */
async function login(customSettings: CustomSettings): Promise<void> {
	if (customSettings.auth) {
		await setIsBusy(true);
		try {
			authResult = await authenticate(
				customSettings.auth.providerUrl,
				customSettings.auth.clientId,
				customSettings.auth.loginRedirectUrl
			);
			logInformation(`ID Token: ${authResult.idToken}`);
			logInformation(`User Info: ${JSON.stringify(authResult.userInfo)}`);
		} catch (err) {
			logInformation(`Error during login: ${formatError(err)}`);
		} finally {
			await setIsBusy(false);
		}
	}
}

/**
 * Logout using the OIDC provider.
 * @param customSettings The custom settings.
 */
async function logout(customSettings: CustomSettings): Promise<void> {
	if (authResult && customSettings.auth) {
		try {
			await authResult.logout(customSettings.auth.logoutRedirectUrl);
		} catch (err) {
			logInformation(`Error during logout: ${formatError(err)}`);
		}
	}
	authResult = undefined;
	await hideApp();
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
		logElem.textContent = `${logElem.textContent}${info}\n\n`;
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
 * Launch the application as a window.
 * @param customSettings The custom settings from the manifest.fin.json
 */
async function launchAppWindow(customSettings: CustomSettings): Promise<void> {
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
			url: customSettings?.appWindowUrl,
			customData: {
				idToken: authResult?.idToken
			}
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
 * Launch the application as a manifest.
 * @param customSettings The custom settings from the manifest.fin.json
 */
async function launchAppManifest(customSettings: CustomSettings): Promise<void> {
	if (!appManifest && customSettings.appManifestUrl) {
		appManifest = await fin.Application.startFromManifest(customSettings.appManifestUrl, {
			userAppConfigArgs: {
				idToken: authResult?.idToken
			}
		});

		await appManifest.addListener("closed", async () => {
			if (appManifest) {
				await appManifest.removeAllListeners();
				appManifest = undefined;
			}

			updateButtonStates();
		});

		updateButtonStates();
	}
}

/**
 * Hide the application page.
 */
async function hideApp(): Promise<void> {
	if (appWin) {
		await appWin.close(true);
	} else if (appManifest) {
		await appManifest.close(true);
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
		btnLogin.disabled = authIsBusy || authResult !== undefined;
	}

	const btnLogout = document.querySelector<HTMLButtonElement>("#btnLogout");
	if (btnLogout) {
		btnLogout.disabled = authIsBusy || authResult === undefined;
	}

	const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
	if (btnApp) {
		btnApp.disabled =
			authIsBusy || authResult === undefined || appWin !== undefined || appManifest !== undefined;
	}

	const selectLaunchMode = document.querySelector<HTMLSelectElement>("#launchMode");
	if (selectLaunchMode) {
		selectLaunchMode.disabled =
			authIsBusy || authResult === undefined || appWin !== undefined || appManifest !== undefined;
	}
}

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}
	return JSON.stringify(err);
}
