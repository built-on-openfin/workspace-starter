import type OpenFin from "@openfin/core";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import {
	BrowserButtonType,
	ColorSchemeOptionType,
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap,
	type ToolbarButton
} from "@openfin/workspace-platform";
import { DEFAULT_PALETTES } from "./default-palettes";

let currentColorScheme: Omit<ColorSchemeOptionType, "system">;
let currentPalette: CustomPaletteSet;

/**
 * Initialize the color scheme based on the platform settings.
 */
export async function initColorScheme(): Promise<void> {
	const platform = getCurrentSync();
	const initTheme = await platform.Theme.getSelectedScheme();
	console.log("Initial Color Scheme:", initTheme);
	await setColorScheme(initTheme);
}

/**
 * Set the color scheme and notify and components that need to change.
 * @param schemeType The color scheme to switch to.
 */
export async function setColorScheme(schemeType: ColorSchemeOptionType): Promise<void> {
	console.log("Color Scheme Changed:", schemeType);

	let finalScheme: Omit<ColorSchemeOptionType, "system">;

	// If the scheme is System then use media query to get the OS setting
	if (schemeType === ColorSchemeOptionType.System) {
		finalScheme = getSystemPreferredColorScheme();
	} else {
		finalScheme = schemeType;
	}

	// Get the current platform theme, always the first one
	const platform = getCurrentSync();
	const theme = await platform.Theme.getThemes();
	let palette: CustomPaletteSet;
	if (theme.length > 0) {
		if ("palette" in theme[0]) {
			palette = theme[0].palette;
		} else {
			palette = theme[0].palettes[finalScheme as "light" | "dark"];
		}
	} else {
		palette = DEFAULT_PALETTES[finalScheme as "light" | "dark"];
	}

	// Store the current scheme and palette
	currentColorScheme = finalScheme;
	currentPalette = palette;

	// Notify any components using the theming
	await notifyColorScheme();
}

/**
 * Update the toolbar icons of the any browser windows and notify any
 * other views that have the style preload script so that they can update
 * their color schemes.
 */
async function notifyColorScheme(): Promise<void> {
	const platform = getCurrentSync();

	// Iterate all the browser windows and update their buttons.
	const browserWindows = await platform.Browser.getAllWindows();
	for (const browserWindow of browserWindows) {
		await browserWindow.replaceToolbarOptions({ buttons: [getThemeButton()] });
	}

	// Broadcast a platform theme update so that views can change their colors.
	const appSessionContextGroup = await fin.me.interop.joinSessionContextGroup("platform/events");
	await appSessionContextGroup.setContext({
		type: "platform.theme",
		schemeType: currentColorScheme,
		palette: currentPalette
	} as OpenFin.Context);
}

/**
 * Get the theme button for the browser windows.
 * @returns The theming button.
 */
export function getThemeButton(): ToolbarButton {
	return {
		type: BrowserButtonType.Custom,
		iconUrl: `http://localhost:8080/common/icons/default/${currentColorScheme}/theme.svg`,
		action: {
			id: "change-theme"
		}
	};
}

/**
 * Get the actions that theming can handle.
 * @returns The map of actions.
 */
export function getThemeActions(): CustomActionsMap {
	return {
		"change-theme": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				const platform = getCurrentSync();

				// Set the color scheme for the platform, this will eventually
				// propagate back through the setSelectedScheme platform
				// override which will notify components to update
				if (currentColorScheme === ColorSchemeOptionType.Light) {
					await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Dark);
				} else {
					await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Light);
				}
			}
		}
	};
}

/**
 * Calculate the preferred color scheme based on the OS settings.
 * @returns Either dark or light depending on OS settings.
 */
function getSystemPreferredColorScheme(): Omit<ColorSchemeOptionType, "system"> {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return ColorSchemeOptionType.Dark;
	}
	return ColorSchemeOptionType.Light;
}
