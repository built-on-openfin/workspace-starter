import type OpenFin from "@openfin/core";
import { CLITemplate, Home, type App } from "@openfin/workspace";
import {
	ColorSchemeOptionType,
	getCurrentSync,
	init,
	type CustomThemeOptionsWithScheme,
	type WorkspacePlatformProvider
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

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Now that the platform has initialized get the initial state
	// of the theme and update the style preload channel with it
	const schemeType = await platform.Theme.getSelectedScheme();
	await updateViewTheme(schemeType);
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
				default: "light",
				palettes: {
					light: {
						brandPrimary: "#0A76D3",
						brandSecondary: "#1E1F23",
						backgroundPrimary: "#FAFBFE",
						background1: "#FFFFFF",
						background2: "#FAFBFE",
						background3: "#F3F5F8",
						background4: "#ECEEF1",
						background5: "#DDDFE4",
						background6: "#C9CBD2",
						statusSuccess: "#35C759",
						statusWarning: "#F48F00",
						statusCritical: "#BE1D1F",
						statusActive: "#0498FB",
						inputBackground: "#ECEEF1",
						inputColor: "#1E1F23",
						inputPlaceholder: "#383A40",
						inputDisabled: "#7D808A",
						inputFocused: "#C9CBD2",
						textDefault: "#1E1F23",
						textHelp: "#2F3136",
						textInactive: "#7D808A",
						contentBackground1: "#0A76D3",
						contentBackground2: "#000000",
						contentBackground3: "#000000",
						contentBackground4: "#000000",
						contentBackground5: "#000000",
						linkDefault: "#6CADE5",
						linkHover: "#0A76D3"
					},
					dark: {
						brandPrimary: "#0A76D3",
						brandSecondary: "#383A40",
						backgroundPrimary: "#1E1F23",
						background1: "#111214",
						background2: "#1E1F23",
						background3: "#24262B",
						background4: "#2F3136",
						background5: "#383A40",
						background6: "#53565F",
						statusSuccess: "#35C759",
						statusWarning: "#F48F00",
						statusCritical: "#BE1D1F",
						statusActive: "#0498FB",
						inputBackground: "#53565F",
						inputColor: "#FFFFFF",
						inputPlaceholder: "#C9CBD2",
						inputDisabled: "#7D808A",
						inputFocused: "#C9CBD2",
						textDefault: "#FFFFFF",
						textHelp: "#C9CBD2",
						textInactive: "#7D808A",
						contentBackground1: "#0A76D3",
						contentBackground2: "#000000",
						contentBackground3: "#000000",
						contentBackground4: "#000000",
						contentBackground5: "#000000",
						linkDefault: "#6CADE5",
						linkHover: "#0A76D3"
					}
				}
			}
		],
		// Override some platform methods so we can be notified of the color scheme changing
		overrideCallback
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
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Override the platform methods so that we can intercept the
	 * color scheme changing.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * The color scheme was changed.
		 * @param schemeType The scheme it was changed to.
		 * @returns Nothing.
		 */
		public async setSelectedScheme(schemeType: ColorSchemeOptionType): Promise<void> {
			// Override the platform callback to we can detect the theme has changed
			// and send this information to all the views with the preload script.
			await updateViewTheme(schemeType);
			return super.setSelectedScheme(schemeType);
		}
	}
	return new Override();
}

/**
 * Sends a channel message to all the views which have the theming
 * preload script included, so that they can also update their colors.
 * @param schemeType The new scheme type to display.
 */
async function updateViewTheme(schemeType: ColorSchemeOptionType): Promise<void> {
	const platform = getCurrentSync();
	const themes = await platform.Theme.getThemes();

	let scheme: "dark" | "light";
	if (schemeType === ColorSchemeOptionType.System || !schemeType) {
		scheme = getSystemPreferredColorScheme();
	} else {
		scheme = schemeType;
	}

	// Get the current palette from the platform based on the selected scheme.
	const currentPalette = (themes[0] as CustomThemeOptionsWithScheme).palettes[scheme];

	// Broadcast a message using interop so that any views with the style preload
	// scripts can react and update their UIs accordingly
	const finMeInterop = fin.Interop.connectSync(fin.me.uuid, {});
	const appSessionContextGroup = await finMeInterop.joinSessionContextGroup("platform/events");
	await appSessionContextGroup.setContext({
		type: "platform.theme",
		schemeType: scheme,
		palette: currentPalette
	} as OpenFin.Context);
}

/**
 * If the OpenFin color scheme is set to System we need to work out
 * if the OS is currently set to dark or light.
 * @returns The OS preference for color scheme.
 */
function getSystemPreferredColorScheme(): "dark" | "light" {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}
	return "light";
}
