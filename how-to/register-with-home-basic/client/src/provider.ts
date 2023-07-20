import { Home, type HomeRegistration } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register } from "./home";

const PLATFORM_ID = "register-with-home-basic";
const PLATFORM_TITLE = "Register With Home Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let homeRegistration: HomeRegistration | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Get the DOM elements from the provider.html page and initialize them
	await initializeDOM();
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
 * Bring the platform to life.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	console.log("Initializing the bootstrapper");

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		if (homeRegistration) {
			await Home.deregister(PLATFORM_ID);
		}

		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	const registerButton = document.querySelector<HTMLButtonElement>("#register");
	const deregisterButton = document.querySelector<HTMLButtonElement>("#deregister");
	const showButton = document.querySelector<HTMLButtonElement>("#show");
	const hideButton = document.querySelector<HTMLButtonElement>("#hide");
	const queryInput = document.querySelector<HTMLInputElement>("#query");
	const goButton = document.querySelector<HTMLButtonElement>("#go");

	if (registerButton && deregisterButton && showButton && hideButton && queryInput && goButton) {
		// Disable all the buttons until the platform is registered
		showButton.disabled = true;
		hideButton.disabled = true;
		deregisterButton.disabled = true;
		queryInput.disabled = true;
		goButton.disabled = true;

		// Wire up the button click event listeners
		registerButton.addEventListener("click", async () => {
			homeRegistration = await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON);
			showButton.disabled = false;
			hideButton.disabled = false;
			deregisterButton.disabled = false;
			registerButton.disabled = true;
			queryInput.disabled = false;
			goButton.disabled = false;
		});

		deregisterButton.addEventListener("click", async () => {
			showButton.disabled = true;
			hideButton.disabled = true;
			deregisterButton.disabled = true;
			registerButton.disabled = false;
			queryInput.disabled = true;
			goButton.disabled = true;
			homeRegistration = undefined;
			queryInput.value = "";
			await Home.deregister(PLATFORM_ID);
		});

		showButton.addEventListener("click", async () => {
			await Home.show();
		});

		hideButton.addEventListener("click", async () => {
			await Home.hide();
		});

		goButton.addEventListener("click", async () => {
			if (homeRegistration) {
				await Home.show();
				await homeRegistration.setSearchQuery(queryInput.value);
			}
		});
	}
}
