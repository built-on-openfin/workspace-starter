import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import type { ThemingPayload } from "./shapes";

export async function init(themingPayload?: ThemingPayload): Promise<void> {
	console.log("Initializing platform");

	// This is the default dark theme
	const darkPalette = {
		brandPrimary: "#504CFF",
		brandSecondary: "#383A40",
		backgroundPrimary: "#1E1F23",
		contentBackground1: "#000000",
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
	};

	await workspacePlatformInit({
		browser: {},
		theme: [
			{
				label: "theme",
				palette: {
					...darkPalette,
					...themingPayload?.palette
				}
			}
		]
	});
}
