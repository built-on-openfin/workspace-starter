import {
	BrowserButtonType,
	BrowserWindowModule,
	ColorSchemeOptionType,
	getCurrentSync,
	ToolbarButton
} from "@openfin/workspace-platform";
import type { CustomPaletteSet } from "@openfin/workspace/common/src/api/theming";
import { DEFAULT_PALETTES } from "./default-palettes";

let currentColorScheme: Omit<ColorSchemeOptionType, "system">;
let currentPalette: CustomPaletteSet;

function getSystemPreferredColorScheme(): Omit<ColorSchemeOptionType, "system"> {
	if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
		return ColorSchemeOptionType.Dark;
	}
	return ColorSchemeOptionType.Light;
}

export async function initColorScheme(): Promise<void> {
	const platform = getCurrentSync();
	const initTheme = await platform.Theme.getSelectedScheme();
	console.log("Initial Color Scheme:", initTheme);
	await setColorScheme(initTheme);
}

export function getColorScheme(): Omit<ColorSchemeOptionType, "system"> {
	return currentColorScheme;
}

export async function setColorScheme(schemeType: ColorSchemeOptionType): Promise<void> {
	console.log("Color Scheme Changed:", schemeType);

	let finalScheme: Omit<ColorSchemeOptionType, "system">;

	if (schemeType === ColorSchemeOptionType.System) {
		finalScheme = getSystemPreferredColorScheme();
	} else {
		finalScheme = schemeType;
	}

	const platform = getCurrentSync();
	const theme = await platform.Theme.getThemes();
	let palette: CustomPaletteSet;
	if (theme.length > 0) {
		if ("palette" in theme[0]) {
			palette = theme[0].palette;
		} else {
			palette = theme[0].palettes[finalScheme as string];
		}
	} else {
		palette = DEFAULT_PALETTES[finalScheme as string];
	}

	currentColorScheme = finalScheme;
	currentPalette = palette;

	await notifyColorScheme();
}

export async function notifyColorScheme(): Promise<void> {
	const platform = getCurrentSync();

	const browserWindows = await platform.Browser.getAllWindows();
	for (const browserWindow of browserWindows) {
		await updateBrowserWindowButtonsColorScheme(browserWindow);
	}

	const appSessionContextGroup = await fin.me.interop.joinSessionContextGroup("platform/events");

	await appSessionContextGroup.setContext({
		type: "platform.theme",
		schemeType: currentColorScheme,
		palette: currentPalette
	} as OpenFin.Context);
}

export async function themeToggle(): Promise<void> {
	const platform = getCurrentSync();
	if (currentColorScheme === ColorSchemeOptionType.Light) {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Dark);
	} else {
		await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Light);
	}
}

export function getThemeButton(): ToolbarButton {
	const webRoot = window.location.href.replace("platform/provider.html", "");
	return {
		type: BrowserButtonType.Custom,
		iconUrl: `${webRoot}common/icons/${currentColorScheme}/theme.svg`,
		action: {
			id: "change-theme"
		}
	};
}

export async function updateBrowserWindowButtonsColorScheme(
	browserWindow: BrowserWindowModule
): Promise<void> {
	await browserWindow.replaceToolbarOptions({ buttons: [getThemeButton()] });
}
