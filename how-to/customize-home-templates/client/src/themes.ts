import { ColorSchemeOptionType, getCurrentSync } from "@openfin/workspace-platform";
import type { CustomPaletteSet } from "@openfin/workspace/common/src/api/theming";
import { DEFAULT_PALETTES } from "./default-palettes";
import { ColorSchemeMode } from "./shapes/theme-shapes";

let colorSchemeMode: ColorSchemeMode;

function getSystemPreferredColorScheme(): ColorSchemeMode {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return ColorSchemeMode.Dark;
	}
	return ColorSchemeMode.Light;
}

export async function getCurrentPalette(): Promise<CustomPaletteSet> {
	const colorScheme = await getCurrentColorSchemeMode();

	return DEFAULT_PALETTES[colorScheme];
}

export async function getCurrentColorSchemeMode(): Promise<ColorSchemeMode> {
	if (!colorSchemeMode) {
		// No theme currently set so try and work it out
		try {
			const platform = getCurrentSync();
			// Get the selected theme from the platform
			const selectedTheme = await platform.Theme.getSelectedScheme();

			if (selectedTheme === ColorSchemeOptionType.System) {
				// If set to system then find out what that really means
				colorSchemeMode = getSystemPreferredColorScheme();
			} else if (selectedTheme === ColorSchemeOptionType.Dark) {
				colorSchemeMode = ColorSchemeMode.Dark;
			} else if (selectedTheme === ColorSchemeOptionType.Light) {
				colorSchemeMode = ColorSchemeMode.Light;
			}

			// The theme from the platform could be null if none selected
			// so use the themes config to work it out
			if (!colorSchemeMode) {
				colorSchemeMode = ColorSchemeMode.Dark;
			}
		} catch {
			// Platform probably not running yet, don't set a default as we want
			// subsequent successful calls to populate it when the platform is running
		}
	}

	return colorSchemeMode ?? ColorSchemeMode.Dark;
}
