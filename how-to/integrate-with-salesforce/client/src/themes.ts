import type { CustomThemes } from "@openfin/workspace-platform";
import type { CustomPaletteSet, CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";
import { getSettings } from "./settings";
import { ColorSchemeMode } from "./shapes/theme-shapes";

const DEFAULT_PALETTES: { [id: string]: CustomPaletteSet } = {
	light: {
		brandPrimary: "#0A76D3",
		brandSecondary: "#1E1F23",
		backgroundPrimary: "#1E1F23",
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
		textInactive: "#7D808A"
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
		textInactive: "#7D808A"
	}
};

let validatedThemes: CustomThemeOptions[];

function getSystemPreferredColorScheme(): "light" | "dark" {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}
	return "light";
}

export async function getCurrentColorSchemeMode(): Promise<ColorSchemeMode> {
	return ColorSchemeMode.Dark;
}

export async function getCurrentPalette(): Promise<CustomPaletteSet> {
	const themes = await getThemes();
	if (themes.length === 0) {
		return DEFAULT_PALETTES.dark;
	}
	if ("palette" in themes[0]) {
		return themes[0].palette;
	}
	return themes[0].palettes.dark;
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
			`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark.brandPrimary}`
		);
	}

	if (!themePalette[brandSecondaryKey]) {
		console.warn(
			`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark.brandSecondary}`
		);
	}

	if (!themePalette[backgroundPrimaryKey]) {
		console.warn(
			`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${DEFAULT_PALETTES.dark.brandPrimary}`
		);
	}

	return palette;
}
