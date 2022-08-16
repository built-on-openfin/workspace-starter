import { CustomThemes } from "@openfin/workspace-platform";
import { CustomPaletteSet } from "@openfin/workspace-platform/common/src/api/theming";
import { CustomSettings } from "./shapes";

let settings: CustomSettings;

async function getConfiguredSettings(): Promise<CustomSettings> {
	const app = await fin.Application.getCurrent();
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();

	if (manifest.customSettings !== undefined) {
		settings = manifest.customSettings;
	} else {
		settings = {};
	}

	return settings;
}

export async function getSettings(): Promise<CustomSettings> {
	if (settings === undefined) {
		settings = await getConfiguredSettings();
	}
	return settings;
}

function validatePalette(themePalette: CustomPaletteSet, themeLabel: string): CustomPaletteSet {
	const palette: Partial<CustomPaletteSet> = {};

	const keys = Object.keys(themePalette);

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
	const brandPrimaryValue = "#504CFF";
	const brandSecondaryKey = "brandSecondary";
	const brandSecondaryValue = "#383A40";
	const backgroundPrimaryKey = "backgroundPrimary";
	const backgroundPrimaryValue = "#111214";

	if (palette[brandPrimaryKey] === undefined) {
		console.warn(
			`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${brandPrimaryValue}`
		);
		palette[brandPrimaryKey] = brandPrimaryValue;
	}

	if (palette[brandSecondaryKey] === undefined) {
		console.warn(
			`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${brandSecondaryValue}`
		);
		palette[brandSecondaryKey] = brandSecondaryValue;
	}

	if (palette[backgroundPrimaryKey] === undefined) {
		console.warn(
			`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${backgroundPrimaryValue}`
		);
		palette[backgroundPrimaryKey] = backgroundPrimaryValue;
	}

	return palette as CustomPaletteSet;
}

export function validateThemes(themes: CustomThemes): CustomThemes {
	const validatedThemes: CustomThemes = [];

	if (Array.isArray(themes)) {
		for (let i = 0; i < themes.length; i++) {
			const themeToValidate = themes[i];
			const palette = validatePalette(themeToValidate.palette, themeToValidate.label);
			if (palette !== null) {
				themeToValidate.palette = palette;
			} else {
				// don't pass an empty object as there are no theme properties
				themeToValidate.palette = undefined;
			}
			validatedThemes.push(themeToValidate);
		}
	}

	return validatedThemes;
}
