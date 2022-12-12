import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import { DEFAULT_PALETTES } from "./defaultPalettes";
import type { ThemingPayload } from "./shapes";

export async function init(themingPayload?: ThemingPayload): Promise<void> {
	console.log("Initializing platform");

	let palette;
	let palettes;
	if ("palette" in themingPayload) {
		palette = {
			...DEFAULT_PALETTES.dark,
			...themingPayload?.palette
		};
	} else {
		palettes = {
			dark: {
				...DEFAULT_PALETTES.dark,
				...themingPayload.palettes?.dark
			},
			light: {
				...DEFAULT_PALETTES.light,
				...themingPayload.palettes?.light
			}
		};
	}

	await workspacePlatformInit({
		browser: {},
		theme: [
			{
				label: "theme",
				palette,
				palettes
			}
		]
	});
}
