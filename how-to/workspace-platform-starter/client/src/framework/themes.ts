import type OpenFin from "@openfin/core";
import { ColorSchemeOptionType, getCurrentSync } from "@openfin/workspace-platform";
import type { CustomPaletteSet } from "@openfin/workspace/common/src/api/theming";
import { DEFAULT_PALETTES } from "./default-palettes";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import { getSettings } from "./settings";
import { ColorSchemeMode, type PlatformCustomTheme, type PlatformCustomThemes } from "./shapes/theme-shapes";
import { isStringValue } from "./utils";

const logger = createLogger("Themes");

let validatedThemes: PlatformCustomThemes;
let colorSchemeMode: ColorSchemeMode;

/**
 * Does the platform support color schemes.
 * @returns True if color schemes are supported.
 */
export async function supportsColorSchemes(): Promise<boolean> {
	const themes = await getThemes();
	if (themes.length === 0) {
		// out of the box we support a light and dark color scheme
		return true;
	}

	if ("palette" in themes[0]) {
		// the old palette structure doesn't support light and dark color schemes
		return false;
	}

	return true;
}

/**
 * Get the current palette.
 * @returns The current palette.
 */
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

/**
 * Get the current color scheme mode.
 * @returns The color scheme mode.
 */
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
					// we want to check for default regardless of palette or palettes as a way of indicating
					// what scheme the palette follows if it is a single palette or the one to pick if there
					// is a light and dark palette rather than just defaulting to dark if the label match is
					// unsuccessful
					colorSchemeMode = (themes[0].default as ColorSchemeMode) ?? ColorSchemeMode.Dark;

					// If this is an old format theme just see if the label matches light
					if ("palette" in themes[0] && themes[0].label.toLowerCase().includes("light")) {
						colorSchemeMode = ColorSchemeMode.Light;
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

/**
 * Set the color scheme mode and notify anybody listening to the change.
 * @param colorScheme The color scheme to set.
 */
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

/**
 * Get the id of the current theme.
 * @returns The current theme id.
 */
export async function getCurrentThemeId(): Promise<string> {
	const themes = await getThemes();
	if (themes.length === 0) {
		return "default";
	}

	return themes[0].id ?? themes[0].label;
}

/**
 * Get the current icon folder.
 * @returns The current icon folder.
 */
export async function getCurrentIconFolder(): Promise<string> {
	const themes = await getThemes();
	if (themes.length === 0) {
		return "default";
	}

	return themes[0].iconFolder ?? themes[0].id ?? themes[0].label;
}

/**
 * Notify that the color scheme has changed.
 */
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

/**
 * Get all the themes.
 * @returns The validate themes.
 */
export async function getThemes(): Promise<PlatformCustomThemes> {
	if (!validatedThemes) {
		const settings = await getSettings();
		validatedThemes = validateThemes(settings?.themeProvider?.themes);
	}
	return validatedThemes.slice();
}

/**
 * Validate any custom themes.
 * @param themes The themes to validate.
 * @returns The validated themes.
 */
export function validateThemes(themes?: PlatformCustomThemes): PlatformCustomThemes {
	const platformThemes: PlatformCustomThemes = [];

	if (Array.isArray(themes)) {
		const preferredColorScheme = getSystemPreferredColorScheme();

		for (const theme of themes) {
			const themeToValidate: Partial<PlatformCustomTheme> = theme;

			// perform defensive check in case null or undefined is specified.
			if ("palette" in themeToValidate && (themeToValidate.palette === null || themeToValidate.palette === undefined)) {
				delete themeToValidate.palette;
			}

			if ("palettes" in themeToValidate && (themeToValidate.palettes === null || themeToValidate.palettes === undefined)) {
				delete themeToValidate.palettes;
			}

			if ("palette" in themeToValidate || "palettes" in themeToValidate) {
				let isValid = false;
				if ("palette" in themeToValidate) {
					themeToValidate.palette = validatePalette(
						themeToValidate.palette,
						themeToValidate.label ?? "",
						DEFAULT_PALETTES[ColorSchemeMode.Dark]
					);
					isValid = themeToValidate.palette !== undefined;
				} else if ("palettes" in themeToValidate) {
					const palettes = {
						dark: validatePalette(
							themeToValidate.palettes?.[ColorSchemeMode.Dark],
							themeToValidate.label ?? "",
							DEFAULT_PALETTES[ColorSchemeMode.Dark]
						),
						light: validatePalette(
							themeToValidate.palettes?.[ColorSchemeMode.Light],
							themeToValidate.label ?? "",
							DEFAULT_PALETTES[ColorSchemeMode.Light]
						)
					};
					isValid =
						palettes[ColorSchemeMode.Dark] !== undefined &&
						palettes[ColorSchemeMode.Light] !== undefined;

					themeToValidate.palettes = palettes as { dark: CustomPaletteSet; light: CustomPaletteSet };
				}

				if (isValid) {
					if (hasScheme(themeToValidate as PlatformCustomTheme, preferredColorScheme)) {
						logger.info(
							`Found a theme that matches system color scheme preferences and making it the default theme: ${preferredColorScheme}`
						);
						platformThemes.unshift(themeToValidate as PlatformCustomTheme);
					} else {
						platformThemes.push(themeToValidate as PlatformCustomTheme);
					}
				} else {
					logger.warn(`Found a theme that does not contain any colors: ${themeToValidate.id ?? themeToValidate.label}`);
				}
			}
		}
	}

	return platformThemes;
}

/**
 * Toggle the color scheme.
 */
export async function toggleScheme(): Promise<void> {
	const platform = getCurrentSync();
	if (colorSchemeMode === ColorSchemeMode.Light) {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Dark);
	} else {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Light);
	}
}

/**
 * Validate a palette.
 * @param themePalette The palette to validate.
 * @param themeLabel The label for the theme.
 * @param defaultPalette The default palette to backfill missing colors.
 * @returns The validated palette.
 */
function validatePalette(
	themePalette: CustomPaletteSet | undefined,
	themeLabel: string,
	defaultPalette: CustomPaletteSet
): CustomPaletteSet | undefined {
	if (!themePalette) {
		return undefined;
	}

	const keys = Object.keys(themePalette) as (keyof CustomPaletteSet)[];
	if (keys.length === 0) {
		return undefined;
	}

	// Fill all the palette properties from the default palette as a default
	const combinedPalette = {
		...defaultPalette
	};

	// Then override with any from the theme palette
	for (const key of keys) {
		const val = themePalette[key];
		if (isStringValue(val)) {
			combinedPalette[key] = val;
		}
	}

	const brandPrimaryKey = "brandPrimary";
	const brandSecondaryKey = "brandSecondary";
	const backgroundPrimaryKey = "backgroundPrimary";

	if (!themePalette[brandPrimaryKey]) {
		logger.warn(
			`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${defaultPalette[brandPrimaryKey]}`
		);
	}

	if (!themePalette[brandSecondaryKey]) {
		logger.warn(
			`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${defaultPalette[brandSecondaryKey]}`
		);
	}

	if (!themePalette[backgroundPrimaryKey]) {
		logger.warn(
			`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${defaultPalette[backgroundPrimaryKey]}`
		);
	}

	return combinedPalette;
}

/**
 * Do we have the requested color scheme.
 * @param theme The theme to test.
 * @param scheme The scheme to look for.
 * @returns True if we have the color scheme in our theme.
 */
function hasScheme(theme: PlatformCustomTheme, scheme: string): boolean {
	if ("palette" in theme) {
		return theme.label.toLowerCase().includes(scheme);
	}

	if ("palettes" in theme) {
		return theme.palettes[scheme as ColorSchemeMode] !== undefined;
	}

	return false;
}

/**
 * Get the system preferred color scheme.
 * @returns The system color scheme.
 */
function getSystemPreferredColorScheme(): ColorSchemeMode {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return ColorSchemeMode.Dark;
	}
	return ColorSchemeMode.Light;
}
