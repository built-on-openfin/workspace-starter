import { Home, type HomeRegistration } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register } from "./home";

const PLATFORM_ID = "register-with-home-basic";
const PLATFORM_TITLE = "Register With Home Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(PLATFORM_ICON);

	// Get the DOM elements from the provider.html page
	const registerButton = document.querySelector<HTMLButtonElement>("#register");
	const deregisterButton = document.querySelector<HTMLButtonElement>("#deregister");
	const showButton = document.querySelector<HTMLButtonElement>("#show");
	const hideButton = document.querySelector<HTMLButtonElement>("#hide");
	const queryInput = document.querySelector<HTMLInputElement>("#query");
	const goButton = document.querySelector<HTMLButtonElement>("#go");

	if (registerButton && deregisterButton && showButton && hideButton && queryInput && goButton) {
		let homeRegistration: HomeRegistration | undefined;

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
});

/**
 * Initialize the workspace platform.
 * @param icon The icon to use in windows.
 */
async function initializeWorkspacePlatform(icon: string): Promise<void> {
	console.log("Initialising workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon,
				workspacePlatform: {
					pages: [],
					favicon: icon
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
