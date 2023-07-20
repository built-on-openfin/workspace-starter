import { type StoreRegistration, Storefront } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register, storeGetCustomActions } from "./store";

const PLATFORM_ID = "register-with-store-basic";
const PLATFORM_TITLE = "Register With Store Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let storeRegistration: StoreRegistration | undefined;

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
		],
		// Get the custom actions from the store which will be triggered
		// when the buttons are clicked
		customActions: storeGetCustomActions()
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
		if (storeRegistration) {
			await Storefront.deregister(PLATFORM_ID);
		}

		await fin.Platform.getCurrentSync().quit();
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
			storeRegistration = await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON);
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
			storeRegistration = undefined;
		});

		showStore.addEventListener("click", async () => {
			await Storefront.show();
		});

		hideStore.addEventListener("click", async () => {
			await Storefront.hide();
		});
	}
}
