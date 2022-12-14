import { init as workspacePlatformInit, CustomActionCallerType } from "@openfin/workspace-platform";
import type {
	CustomActionPayload,
	CustomThemeOptions,
	CustomThemeOptionsWithScheme
} from "@openfin/workspace/client-api-platform/src/shapes";
import { DEFAULT_PALETTES } from "./defaultPalettes";
import { overrideCallback } from "./platform-override";
import type { ThemingPayload } from "./shapes";
import { getThemeButton, initColorScheme, themeToggle } from "./themes";

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
		browser: {
			defaultWindowOptions: {
				workspacePlatform: {
					pages: null,
					toolbarOptions: {
						buttons: [getThemeButton()]
					}
				}
			}
		},
		overrideCallback,
		theme: [customTheme],
		customActions: {
			"change-theme": async (payload: CustomActionPayload) => {
				if (payload.callerType === CustomActionCallerType.CustomButton) {
					await themeToggle();
				}
			}
		}
	});

	await initColorScheme();
}
