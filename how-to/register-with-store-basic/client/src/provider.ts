import { Storefront } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register, storeGetCustomActions } from "./store";

const PLATFORM_ID = "register-with-store-basic";
const PLATFORM_TITLE = "Register With Store Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(PLATFORM_ICON);

	// Get the DOM elements from the provider.html page and initialize them
	await initializeDOM();
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
		],
		// Get the custom actions from the store which will be triggered
		// when the buttons are clicked
		customActions: storeGetCustomActions()
	});
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	const registerStore = document.querySelector<HTMLButtonElement>("#register");
	const showStore = document.querySelector<HTMLButtonElement>("#show");
	const hideStore = document.querySelector<HTMLButtonElement>("#hide");
	const deregisterStore = document.querySelector<HTMLButtonElement>("#deregister");

	if (showStore && hideStore && deregisterStore && registerStore) {
		showStore.disabled = true;
		hideStore.disabled = true;
		deregisterStore.disabled = true;
		registerStore.disabled = false;

		registerStore.addEventListener("click", async () => {
			registerStore.disabled = true;
			await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON);
			showStore.disabled = false;
			hideStore.disabled = false;
			deregisterStore.disabled = false;
		});

		deregisterStore.addEventListener("click", async () => {
			showStore.disabled = true;
			hideStore.disabled = true;
			deregisterStore.disabled = true;
			registerStore.disabled = false;
			await Storefront.deregister(PLATFORM_ID);
		});

		showStore.addEventListener("click", async () => {
			await Storefront.show();
		});

		hideStore.addEventListener("click", async () => {
			await Storefront.hide();
		});
	}
}
