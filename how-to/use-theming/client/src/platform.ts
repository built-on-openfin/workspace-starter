import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import type { CustomThemeOptions, CustomThemeOptionsWithScheme } from "@openfin/workspace/client-api-platform/src/shapes";
import { DEFAULT_PALETTES } from "./defaultPalettes";
import type { ThemingPayload } from "./shapes";

export async function init(themingPayload?: ThemingPayload): Promise<void> {
	console.log("Initializing platform");

	let customTheme: CustomThemeOptions | CustomThemeOptionsWithScheme;
	if (themingPayload && "palette" in themingPayload) {
		customTheme = {
			label: "theme",
			palette: {
				...DEFAULT_PALETTES.dark,
				...themingPayload?.palette
			}
		};
	} else {
		customTheme = {
			label: "theme",
			palettes: {
				dark: {
					...DEFAULT_PALETTES.dark,
					...themingPayload?.palettes?.dark
				},
				light: {
					...DEFAULT_PALETTES.light,
					...themingPayload?.palettes?.light
				}
			}
		};
	}

	await workspacePlatformInit({
		browser: {},
		theme: [customTheme]
	});
}
