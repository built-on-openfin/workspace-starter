import {
	BrowserButtonType,
	ColorSchemeOptionType,
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap,
	type ToolbarButton
} from "@openfin/workspace-platform";

let currentColorScheme: Omit<ColorSchemeOptionType, "system">;

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

	// Store the current scheme
	currentColorScheme = finalScheme;

	// Notify any components using the theming
	await notifyColorScheme();
}

/**
 * Update toolbar buttons on all browser windows.
 */
async function notifyColorScheme(): Promise<void> {
	const platform = getCurrentSync();

	// Iterate all the browser windows and update their buttons.
	const browserWindows = await platform.Browser.getAllWindows();
	for (const browserWindow of browserWindows) {
		await browserWindow.replaceToolbarOptions({ buttons: [getThemeButton()] });
	}
}

/**
 * Get the theme button for the browser windows.
 * @returns The theming button.
 */
export function getThemeButton(): ToolbarButton {
	return {
		type: BrowserButtonType.Custom,
		tooltip: "Theme",
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
				await toggleTheme();
			}
		}
	};
}

/**
 * Toggle the selected scheme between light and dark.
 */
export async function toggleTheme(): Promise<void> {
	const platform = getCurrentSync();

	// Set the color scheme for the platform, this will eventually
	// propagate back through the setSelectedScheme platform
	// override which will notify components to update.
	if (currentColorScheme === ColorSchemeOptionType.Light) {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Dark);
	} else {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Light);
	}
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
