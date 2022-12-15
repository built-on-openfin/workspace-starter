import { ColorSchemeOptionType, getCurrentSync } from "@openfin/workspace-platform";
import type {
	CustomPaletteSet,
	CustomThemeOptions,
	CustomThemeOptionsWithScheme,
	CustomThemes
} from "@openfin/workspace/common/src/api/theming";
import { DEFAULT_PALETTES } from "./default-palettes";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import { getSettings } from "./settings";
import { ColorSchemeMode } from "./shapes/theme-shapes";

const logger = createLogger("Themes");

let validatedThemes: CustomThemes;
let colorSchemeMode: ColorSchemeMode;

function getSystemPreferredColorScheme(): ColorSchemeMode {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return ColorSchemeMode.Dark;
	}
	return ColorSchemeMode.Light;
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

				const themes = await getThemes();
				if (themes.length > 0) {
					// If this is an old format theme just see if the label matches light
					if ("palette" in themes[0]) {
						if (themes[0].label.toLowerCase().includes("light")) {
							colorSchemeMode = ColorSchemeMode.Light;
						} else {
							colorSchemeMode = ColorSchemeMode.Dark;
						}
					} else {
						// Its new format so look at the default mode if it has one
						colorSchemeMode = (themes[0].default as ColorSchemeMode) ?? ColorSchemeMode.Dark;
					}
				}
			}
		} catch {
			// Platform probably not running yet, don't set a default as we want
			// subsequent successful calls to populate it when the platform is running
		}
	}

	return colorSchemeMode ?? ColorSchemeMode.Dark;
}

export async function setCurrentColorSchemeMode(colorScheme: ColorSchemeOptionType): Promise<void> {
	if (colorScheme === ColorSchemeOptionType.System) {
		colorSchemeMode = getSystemPreferredColorScheme();
	} else if (colorScheme === ColorSchemeOptionType.Light) {
		colorSchemeMode = ColorSchemeMode.Light;
	} else {
		colorSchemeMode = ColorSchemeMode.Dark;
	}

	await notifyColorScheme();
}

export async function notifyColorScheme(): Promise<void> {
	const platform = getCurrentSync();
	const settings = await getSettings();

	await fireLifecycleEvent(platform, "theme-changed");

	const appSessionContextGroup = await fin.me.interop.joinSessionContextGroup("platform/events");

	await appSessionContextGroup.setContext({
		type: "platform.theme",
		prefix: settings?.themeProvider?.cssVarPrefix,
		schemeNames: settings?.themeProvider?.schemaNames,
		schemeType: await getCurrentColorSchemeMode(),
		palette: await getCurrentPalette()
	} as OpenFin.Context);
}

export async function getDefaultPalettes(): Promise<{ [id: string]: CustomPaletteSet }> {
	return DEFAULT_PALETTES;
}

export async function getThemes(): Promise<CustomThemes> {
	if (!validatedThemes) {
		const settings = await getSettings();
		validatedThemes = validateThemes(settings?.themeProvider?.themes);
	}
	return validatedThemes.slice();
}

export function validateThemes(themes: CustomThemes): CustomThemes {
	const customThemes: CustomThemes = [];

	if (Array.isArray(themes)) {
		const preferredColorScheme = getSystemPreferredColorScheme();

		for (let i = 0; i < themes.length; i++) {
			const themeToValidate = themes[i];
			if ("palette" in themeToValidate) {
				themeToValidate.palette = validatePalette(
					themeToValidate.palette,
					themeToValidate.label,
					DEFAULT_PALETTES[ColorSchemeMode.Dark]
				);
			} else {
				themeToValidate.palettes[ColorSchemeMode.Dark] = validatePalette(
					themeToValidate.palettes[ColorSchemeMode.Dark],
					themeToValidate.label,
					DEFAULT_PALETTES[ColorSchemeMode.Dark]
				);
				themeToValidate.palettes[ColorSchemeMode.Light] = validatePalette(
					themeToValidate.palettes[ColorSchemeMode.Light],
					themeToValidate.label,
					DEFAULT_PALETTES[ColorSchemeMode.Light]
				);
			}

			if (hasScheme(themes[i], preferredColorScheme)) {
				logger.info(
					`Found a theme that matches system color scheme preferences and making it the default theme: ${preferredColorScheme}`
				);
				customThemes.unshift(themes[i]);
			} else {
				customThemes.push(themes[i]);
			}
		}
	}

	return customThemes;
}

function validatePalette(
	themePalette: CustomPaletteSet | undefined,
	themeLabel: string,
	defaultPalette: CustomPaletteSet
): CustomPaletteSet | undefined {
	if (!themePalette) {
		return undefined;
	}

	const keys = Object.keys(themePalette);
	if (keys.length === 0) {
		return undefined;
	}

	// Fill all the palette properties from the default palette as a default
	const combinedPalette = {
		...defaultPalette
	};

	// Then override with any from the theme palette
	for (const key of keys) {
		if (
			themePalette[key] !== undefined &&
			themePalette[key] !== null &&
			themePalette[key].trim().length > 0
		) {
			combinedPalette[key] = themePalette[key];
		}
	}

	const brandPrimaryKey = "brandPrimary";
	const brandSecondaryKey = "brandSecondary";
	const backgroundPrimaryKey = "backgroundPrimary";

	if (!themePalette[brandPrimaryKey]) {
		logger.warn(
			`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${defaultPalette.brandPrimary}`
		);
	}

	if (!themePalette[brandSecondaryKey]) {
		logger.warn(
			`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${defaultPalette.brandSecondary}`
		);
	}

	if (!themePalette[backgroundPrimaryKey]) {
		logger.warn(
			`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${defaultPalette.brandPrimary}`
		);
	}

	return combinedPalette;
}

function hasScheme(theme: CustomThemeOptions | CustomThemeOptionsWithScheme, scheme: string): boolean {
	if ("palette" in theme) {
		return theme.label.toLowerCase().includes(scheme);
	}

	return theme.palettes[scheme] !== undefined;
}

export async function toggleTheme(): Promise<void> {
	const platform = getCurrentSync();
	if (colorSchemeMode === ColorSchemeMode.Light) {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Dark);
	} else {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Light);
	}
}
