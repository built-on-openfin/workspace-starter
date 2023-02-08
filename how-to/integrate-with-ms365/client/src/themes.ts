import { ColorSchemeOptionType, CustomThemes, getCurrentSync } from "@openfin/workspace-platform";
import type { CustomPaletteSet, CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";
import { DEFAULT_PALETTES } from "./default-palletes";
import { getSettings } from "./settings";
import { ColorSchemeMode } from "./shapes/theme-shapes";

let validatedThemes: CustomThemeOptions[];

function getSystemPreferredColorScheme(): ColorSchemeMode {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return ColorSchemeMode.Dark;
	}
	return ColorSchemeMode.Light;
}

export async function getCurrentColorSchemeMode(): Promise<ColorSchemeMode> {
	// No theme currently set so try and work it out
	try {
		const platform = getCurrentSync();
		// Get the selected theme from the platform
		const selectedTheme = await platform.Theme.getSelectedScheme();

		if (selectedTheme === ColorSchemeOptionType.System) {
			// If set to system then find out what that really means
			return getSystemPreferredColorScheme();
		} else if (selectedTheme === ColorSchemeOptionType.Dark) {
			return ColorSchemeMode.Dark;
		} else if (selectedTheme === ColorSchemeOptionType.Light) {
			return ColorSchemeMode.Light;
		}
	} catch {
		// Platform probably not running yet, don't set a default as we want
		// subsequent successful calls to populate it when the platform is running
	}

	return ColorSchemeMode.Dark;
}

export async function getCurrentPalette(): Promise<CustomPaletteSet> {
	const themes = await getThemes();
	const colorScheme = await getCurrentColorSchemeMode();

	if (themes.length === 0) {
		return DEFAULT_PALETTES[colorScheme];
	}

	if ("palette" in themes[0]) {
		return themes[0].palette;
	}

	return themes[0].palettes[colorScheme];
}

export async function getThemes(): Promise<CustomThemes> {
	if (!validatedThemes) {
		const settings = await getSettings();
		validatedThemes = validateThemes(settings?.themeProvider?.themes);
	}
	return validatedThemes.slice();
}

export function validateThemes(themes: CustomThemeOptions[]): CustomThemeOptions[] {
	const customThemes: CustomThemeOptions[] = [];

	if (Array.isArray(themes)) {
		const preferredColorScheme = getSystemPreferredColorScheme();

		for (let i = 0; i < themes.length; i++) {
			const themeToValidate = themes[i];
			const palette = validatePalette(themeToValidate.palette, themeToValidate.label);
			if (palette !== null) {
				themeToValidate.palette = palette;
			} else {
				// don't pass an empty object as there are no theme properties
				themeToValidate.palette = undefined;
			}
			if (themeToValidate.label.toLowerCase() === preferredColorScheme) {
				console.log(
					`Found a theme that matches system color scheme preferences and making it the default theme: ${preferredColorScheme}`
				);
				customThemes.unshift(themeToValidate);
			} else {
				customThemes.push(themeToValidate);
			}
		}
	}

	return customThemes;
}

function validatePalette(
	themePalette: CustomPaletteSet | undefined,
	themeLabel: string
): CustomPaletteSet | null {
	if (!themePalette) {
		return null;
	}

	const keys = Object.keys(themePalette);
	if (keys.length === 0) {
		return null;
	}

	const palette: CustomPaletteSet = {
		...DEFAULT_PALETTES.dark
	};

	for (const key of keys) {
		if (
			themePalette[key] !== undefined &&
			themePalette[key] !== null &&
			themePalette[key].trim().length > 0
		) {
			palette[key] = themePalette[key];
		}
	}

	const brandPrimaryKey = "brandPrimary";
	const brandSecondaryKey = "brandSecondary";
	const backgroundPrimaryKey = "backgroundPrimary";

	if (!themePalette[brandPrimaryKey]) {
		console.warn(
			`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark[brandPrimaryKey]}`
		);
	}

	if (!themePalette[brandSecondaryKey]) {
		console.warn(
			`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark[brandSecondaryKey]}`
		);
	}

	if (!themePalette[backgroundPrimaryKey]) {
		console.warn(
			`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark[backgroundPrimaryKey]}`
		);
	}

	return palette;
}
