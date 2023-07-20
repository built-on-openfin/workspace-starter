import {
	Dock,
	Home,
	Storefront,
	type StorefrontFooter,
	type StorefrontLandingPage,
	type WorkspaceButton
} from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { dockGetCustomActions, register } from "./dock";

let registerButton: HTMLButtonElement | null;
let showButton: HTMLButtonElement | null;
let minimizeButton: HTMLButtonElement | null;
let deregisterButton: HTMLButtonElement | null;
let showHomeButton: HTMLInputElement | null;
let showNotificationButton: HTMLInputElement | null;
let showStorefrontButton: HTMLInputElement | null;
let showWorkspacesButton: HTMLInputElement | null;
let customIconUrlInput: HTMLInputElement | null;
let customOpenUrlInput: HTMLInputElement | null;
let enableRearrangementButton: HTMLInputElement | null;

const PLATFORM_ID = "register-with-dock-basic";
const PLATFORM_TITLE = "Register With Dock Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

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
		// Get the custom actions from the dock which will be triggered
		// when the buttons are clicked
		customActions: dockGetCustomActions()
	});
}

/**
 * Initialize minimal workspace components for home/store so that the buttons show on dock.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async () => ({ results: [] }),
		onResultDispatch: async () => {}
	});

	await Storefront.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		getApps: async () => [],
		getLandingPage: async () => ({}) as StorefrontLandingPage,
		getNavigation: async () => [],
		getFooter: async () => ({ logo: { src: PLATFORM_ICON }, links: [] }) as unknown as StorefrontFooter,
		launchApp: async () => {}
	});

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Initialize the DOM elements.
 */
async function initializeDOM(): Promise<void> {
	registerButton = document.querySelector<HTMLButtonElement>("#register");
	showButton = document.querySelector<HTMLButtonElement>("#show");
	minimizeButton = document.querySelector<HTMLButtonElement>("#minimize");
	deregisterButton = document.querySelector<HTMLButtonElement>("#deregister");
	showHomeButton = document.querySelector<HTMLInputElement>("#showHomeButton");
	showNotificationButton = document.querySelector<HTMLInputElement>("#showNotificationButton");
	showStorefrontButton = document.querySelector<HTMLInputElement>("#showStorefrontButton");
	showWorkspacesButton = document.querySelector<HTMLInputElement>("#showWorkspacesButton");
	enableRearrangementButton = document.querySelector<HTMLInputElement>("#enableRearrangement");
	customIconUrlInput = document.querySelector<HTMLInputElement>("#customIconUrl");
	customOpenUrlInput = document.querySelector<HTMLInputElement>("#customOpenUrl");

	if (registerButton && deregisterButton && showButton && minimizeButton) {
		setStates(false);

		registerButton.addEventListener("click", async () => {
			setStates(null);
			try {
				const workspaceComponents: WorkspaceButton[] = [];

				if (showHomeButton?.checked) {
					workspaceComponents.push("home");
				}
				if (showNotificationButton?.checked) {
					workspaceComponents.push("notifications");
				}
				if (showStorefrontButton?.checked) {
					workspaceComponents.push("store");
				}
				if (showWorkspacesButton?.checked) {
					workspaceComponents.push("switchWorkspace");
				}

				// Perform the dock registration which will configure
				// it and add the buttons/menus
				await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON, {
					workspaceComponents,
					disableUserRearrangement: !(enableRearrangementButton?.checked ?? true),
					customIconUrl: customIconUrlInput?.value ?? "",
					customOpenUrl: customOpenUrlInput?.value ?? ""
				});
				setStates(true);
			} catch (err) {
				console.error("Error registering dock provider", err);
				setStates(false);
			}
		});

		deregisterButton.addEventListener("click", async () => {
			setStates(false);
			await Dock.deregister();
		});

		showButton.addEventListener("click", async () => {
			await Dock.show();
		});

		minimizeButton.addEventListener("click", async () => {
			await Dock.minimize();
		});
	}
}

/**
 * Set the states of the DOM elements depending on the registration state.
 * @param isRegistered Is the dock registered.
 */
function setStates(isRegistered: boolean | null): void {
	if (
		registerButton &&
		deregisterButton &&
		showButton &&
		minimizeButton &&
		showHomeButton &&
		showNotificationButton &&
		showStorefrontButton &&
		showWorkspacesButton &&
		enableRearrangementButton &&
		customIconUrlInput &&
		customOpenUrlInput
	) {
		registerButton.disabled = isRegistered === null || isRegistered;
		deregisterButton.disabled = isRegistered === null || !isRegistered;
		showButton.disabled = isRegistered === null || !isRegistered;
		minimizeButton.disabled = isRegistered === null || !isRegistered;
		showHomeButton.disabled = isRegistered === null || isRegistered;
		showNotificationButton.disabled = isRegistered === null || isRegistered;
		showStorefrontButton.disabled = isRegistered === null || isRegistered;
		showWorkspacesButton.disabled = isRegistered === null || isRegistered;
		enableRearrangementButton.disabled = isRegistered === null || isRegistered;
		customIconUrlInput.disabled = isRegistered === null || isRegistered;
		customOpenUrlInput.disabled = isRegistered === null || isRegistered;
	}
}
