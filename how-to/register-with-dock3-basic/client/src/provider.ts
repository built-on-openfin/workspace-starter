import { Home, Storefront, type StorefrontFooter, type StorefrontLandingPage } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import type { Dock3Button, Dock3Config, Dock3Provider } from "@openfin/workspace-platform";
import { initializeDock3API } from "./dock";
import type { Dock3ProviderSettings } from "./dock";
import getDock3Provider from "./dock-providers";

let initializeButton: HTMLButtonElement | null;
let minimizeButton: HTMLButtonElement | null;
let shutdownButton: HTMLButtonElement | null;
let showHomeButton: HTMLInputElement | null;
let showNotificationButton: HTMLInputElement | null;
let showContentMenuButton: HTMLInputElement | null;
let showStorefrontButton: HTMLInputElement | null;
let showWorkspacesButton: HTMLInputElement | null;
let enableContentMenuBookmarking: HTMLInputElement | null;
let skipSavedConfig: HTMLInputElement | null;
let saveWindowState: HTMLInputElement | null;
let defaultCentered: HTMLInputElement | null;
let defaultTopPos: HTMLInputElement | null;
let defaultLeftPos: HTMLInputElement | null;
let setGoogleConfig: HTMLButtonElement | null;
let setBarclaysConfig: HTMLButtonElement | null;
let setARCoreConfig: HTMLButtonElement | null;
let setNamelessConfig: HTMLButtonElement | null;

let dockConfig: Dock3Config | undefined;
let dockProvider: Dock3Provider | undefined;

const PLATFORM_ID = "register-with-dock3-basic";
const PLATFORM_TITLE = "Register With Dock3 Basic";
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
		]
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
	initializeButton = document.querySelector<HTMLButtonElement>("#initialize");
	minimizeButton = document.querySelector<HTMLButtonElement>("#minimize");
	shutdownButton = document.querySelector<HTMLButtonElement>("#shutdown");
	showHomeButton = document.querySelector<HTMLInputElement>("#showHomeButton");
	showContentMenuButton = document.querySelector<HTMLInputElement>("#showContentMenuButton");
	showNotificationButton = document.querySelector<HTMLInputElement>("#showNotificationButton");
	showStorefrontButton = document.querySelector<HTMLInputElement>("#showStorefrontButton");
	showWorkspacesButton = document.querySelector<HTMLInputElement>("#showWorkspacesButton");
	defaultLeftPos = document.querySelector<HTMLInputElement>("#defaultLeftPos");
	defaultTopPos = document.querySelector<HTMLInputElement>("#defaultTopPos");
	setGoogleConfig = document.querySelector<HTMLButtonElement>("#setGoogleConfig");
	setBarclaysConfig = document.querySelector<HTMLButtonElement>("#setBarclaysConfig");
	setARCoreConfig = document.querySelector<HTMLButtonElement>("#setARCoreConfig");
	setNamelessConfig = document.querySelector<HTMLButtonElement>("#setNamelessConfig");
	enableContentMenuBookmarking = document.querySelector<HTMLInputElement>("#enableContentMenuBookmarking");
	skipSavedConfig = document.querySelector<HTMLInputElement>("#skipSavedConfig");
	saveWindowState = document.querySelector<HTMLInputElement>("#saveWindowState");
	defaultCentered = document.querySelector<HTMLInputElement>("#defaultCentered");

	if (
		initializeButton &&
		shutdownButton &&
		minimizeButton &&
		setGoogleConfig &&
		setBarclaysConfig &&
		setARCoreConfig &&
		setNamelessConfig &&
		enableContentMenuBookmarking
	) {
		setStates(false);

		initializeButton.addEventListener("click", async () => {
			setStates(null);
			try {
				// Perform the dock3 initialization which will configure
				// it and add the buttons/menus
				dockConfig = getDockConfig("google");

				const settings: Dock3ProviderSettings = {
					skipSavedDockProviderConfig: skipSavedConfig?.checked ?? true,
					saveWindowState: saveWindowState?.checked ?? false,
					defaultCentered: defaultCentered?.checked ?? false,
					defaultLeft: Number(defaultLeftPos?.value ?? Number.NaN),
					defaultTop: Number(defaultTopPos?.value ?? Number.NaN)
				};

				dockProvider = await initializeDock3API(settings, dockConfig);

				setStates(true);
			} catch (err) {
				console.error("Error initializing dock3 provider", err);
				setStates(false);
			}
		});

		/**
		 * Add event listener to shut down the dock
		 */
		shutdownButton.addEventListener("click", async () => {
			await dockProvider?.shutdown();
			dockProvider = undefined;
			console.log("Dock3 Provider shut down");
			setStates(false);
		});

		/**
		 * Add event listener to minimize the dock
		 */
		minimizeButton.addEventListener("click", async () => {
			const dockWindow = dockProvider?.getWindowSync();
			if (dockWindow) {
				await dockProvider?.getWindowSync().minimize();
			}
		});

		/**
		 * Add event listener to update the dock config
		 */
		setGoogleConfig.addEventListener("click", async () => {
			await dockProvider?.updateConfig(getDockConfig("google"));
		});

		/**
		 * Add event listener to update the dock config
		 */
		setBarclaysConfig.addEventListener("click", async () => {
			await dockProvider?.updateConfig(getDockConfig("barclays"));
		});

		/**
		 * Add event listener to update the dock config
		 */
		setARCoreConfig.addEventListener("click", async () => {
			await dockProvider?.updateConfig(getDockConfig("arcore"));
		});

		/**
		 * Add event listener to update the dock config
		 */
		setNamelessConfig.addEventListener("click", async () => {
			await dockProvider?.updateConfig(getDockConfig("nameless"));
		});

		enableContentMenuBookmarking.addEventListener("change", async (e) => {
			if (dockProvider) {
				const prevConfig = dockProvider.config;
				await dockProvider.updateConfig({
					...prevConfig,
					uiConfig: {
						...prevConfig.uiConfig,
						contentMenu: {
							...prevConfig.uiConfig?.contentMenu,
							enableBookmarking: enableContentMenuBookmarking?.checked ?? false
						}
					}
				});
			}
		});
	}
}

/**
 * Set the states of the DOM elements depending on the registration state.
 * @param isInitialized Is the dock initialized.
 */
function setStates(isInitialized: boolean | null): void {
	if (
		initializeButton &&
		shutdownButton &&
		minimizeButton &&
		showHomeButton &&
		showNotificationButton &&
		showContentMenuButton &&
		showStorefrontButton &&
		showWorkspacesButton &&
		setGoogleConfig &&
		setBarclaysConfig &&
		setARCoreConfig &&
		setNamelessConfig &&
		skipSavedConfig &&
		defaultCentered &&
		saveWindowState
	) {
		initializeButton.disabled = isInitialized === null || isInitialized;
		shutdownButton.disabled = isInitialized === null || !isInitialized;
		minimizeButton.disabled = isInitialized === null || !isInitialized;
		showHomeButton.disabled = isInitialized === null || isInitialized;
		showNotificationButton.disabled = isInitialized === null || isInitialized;
		showContentMenuButton.disabled = isInitialized === null || isInitialized;
		showStorefrontButton.disabled = isInitialized === null || isInitialized;
		showWorkspacesButton.disabled = isInitialized === null || isInitialized;
		setGoogleConfig.disabled = isInitialized === null || !isInitialized;
		setBarclaysConfig.disabled = isInitialized === null || !isInitialized;
		setARCoreConfig.disabled = isInitialized === null || !isInitialized;
		setNamelessConfig.disabled = isInitialized === null || !isInitialized;
		skipSavedConfig.disabled = isInitialized === null || isInitialized;
		defaultCentered.disabled = isInitialized === null || isInitialized;
		saveWindowState.disabled = isInitialized === null || isInitialized;
	}
}

/**
 * Build dock3 config.
 * @param configName name of configuration to use (ie google, barclays, etc)
 * @returns dock3 config object
 */
function getDockConfig(configName: "google" | "barclays" | "arcore" | "nameless"): Dock3Config {
	const config = getDock3Provider(configName);

	const dockButtons: Dock3Button[] = [];

	if (showHomeButton?.checked) {
		dockButtons.push("home");
	}
	if (showNotificationButton?.checked) {
		dockButtons.push("notifications");
	}
	if (showContentMenuButton?.checked) {
		dockButtons.push("contentMenu");
	}
	if (showStorefrontButton?.checked) {
		dockButtons.push("store");
	}
	if (showWorkspacesButton?.checked) {
		dockButtons.push("switchWorkspace");
	}

	config.defaultDockButtons = dockButtons;

	config.uiConfig = {
		contentMenu: {
			enableBookmarking: enableContentMenuBookmarking?.checked ?? false
		}
	};

	return config;
}
