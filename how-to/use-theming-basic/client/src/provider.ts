import { CLITemplate, Home, type App } from "@openfin/workspace";
import {
	ColorSchemeOptionType,
	CustomActionCallerType,
	getCurrentSync,
	init
} from "@openfin/workspace-platform";
import * as Notifications from "@openfin/workspace/notifications";
import { getApps, launchApp } from "./apps";

const PLATFORM_ID = "use-theming-basic";
const PLATFORM_TITLE = "Use Theming Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());
	await addListeners();
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser
	console.log("DOM ready, initializing platform");
	await initializeWorkspacePlatform();
});

/**
 * Initialize the HERE Core UI Platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing HERE Core UI Platform");
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
				label: "Custom Theme",
				seed: {
					"brand.base.dark": "#140611",
					"brand.accent.dark": "#FFD6D2",
					"brand.base.light": "#FFFFFF",
					"brand.accent.light": "#641E55"
				},
				overrides: {
					light: {
						"icon.symbol": "http://localhost:8080/common/images/favicon-32x32.png"
					},
					dark: {
						"icon.symbol": "http://localhost:8080/common/images/favicon-32x32.png"
					}
				}
			}
		],
		customActions: {
			"swap-theme": async (e): Promise<void> => {
				if (
					e.callerType === CustomActionCallerType.CustomButton ||
					e.callerType === CustomActionCallerType.CustomDropdownItem
				) {
					await toggleTheme();
				}
			}
		}
	});
}

/**
 * Initialize minimal HERE Core UI Components for home/store so that the buttons show on dock.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	console.log("Initializing Home and Notifications");
	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async () => ({
			// Always return just the apps list in home
			results: getApps().map((app) => ({
				key: app.appId,
				title: app.title,
				icon: app.icons[0]?.src,
				data: app,
				label: "View",
				actions: [{ name: "Launch View", hotkey: "enter" }],
				description: app.description,
				shortDescription: app.description,
				template: CLITemplate.SimpleText,
				templateContent: app.description
			}))
		}),
		onResultDispatch: async (result) => {
			// We only have apps, so just launch them
			await launchApp(result.data as App);
		}
	});

	await Home.show();

	await Notifications.register({
		notificationsPlatformOptions: {
			id: PLATFORM_ID,
			icon: PLATFORM_ICON,
			title: PLATFORM_TITLE
		}
	});

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await Home.deregister(PLATFORM_ID);
		await Notifications.deregister(PLATFORM_ID);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Adding Listeners to the Platform Window for Testing.
 */
async function addListeners(): Promise<void> {
	const toggleButton = document.querySelector<HTMLButtonElement>("#toggleTheme");
	if (toggleButton) {
		toggleButton.addEventListener("click", async () => {
			await toggleTheme();
		});
	}
}


/**
 * Sends a channel message to all the views which have the theming
 * preload script included, so that they can also update their colors.
 * @param schemeType The new scheme type to display.
 */
async function updateViewTheme(schemeType?: ColorSchemeOptionType): Promise<void> {
	// If a scheme wasn't explicitly passed, ask the platform for the
	// currently selected one.  This allows callers (such as our toggle
	// helper) to simply call updateViewTheme() without knowing the
	// current state.
	const platform = getCurrentSync();
	if (schemeType === undefined) {
		schemeType = await platform.Theme.getSelectedScheme();
	}

	const themes = await platform.Theme.getGeneratedPalettes();
	console.log(`Themes: ${JSON.stringify(themes)}`);

	// when we eventually wire up the palette communication to the views
	// we'll reuse the schemeType determined above.  the old commented
	// logic looked like this:
	//	// let scheme: "dark" | "light";
	//	// if (schemeType === ColorSchemeOptionType.System || !schemeType) {
	//	//	scheme = getSystemPreferredColorScheme();
	//	//} else {
	//	//	scheme = schemeType;
	//	//}
	//	// ...send palette via interop...
}

/**
 * Flip between light and dark themes.  The button click handler can call
 * this function; it will determine the active scheme and then request the
 * opposite one from the platform.  After switching we forward the new
 * scheme to `updateViewTheme` so that any preload views can receive the
 * updated palette.
 */
async function toggleTheme(): Promise<void> {
	const platform = getCurrentSync();
	const current = await platform.Theme.getSelectedScheme();
	console.log(`Toggling Current scheme: ${current}`);
	let next: ColorSchemeOptionType;

	// system and undefined are treated as light by default; adjust if you
	// want a different fallback behaviour.
	switch (current) {
		case "dark":
			next = ColorSchemeOptionType.Light;
			break;
		case "light":
			next = ColorSchemeOptionType.Dark;
			break;
		default:
			next = ColorSchemeOptionType.Light;
	}

	await platform.Theme.setSelectedScheme(next);
	// make sure the views know about the change too
	await updateViewTheme(next);
}

// expose helper for UI button handlers or debugging

/**
 * If the HERE color scheme is set to System we need to work out
 * if the OS is currently set to dark or light.
 * @returns The OS preference for color scheme.
 */
// function getSystemPreferredColorScheme(): "dark" | "light" {
// 	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
// 		return "dark";
// 	}
// 	return "light";
// }
