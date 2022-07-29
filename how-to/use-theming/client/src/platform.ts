import { fin } from "@openfin/core";
import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import { CustomPaletteSet } from "@openfin/workspace/common/src/api/theming";

interface CustomUserAppArgs {
	userAppConfigArgs: {
		palette: string;
	};
}

export async function init() {
	console.log("Initializing platform");

	// This is the default dark theme
	const darkPalette = {
		brandPrimary: "#504CFF",
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
	};

	// Find any palette options passed on the command line and override the default palette
	const app = fin.Application.getCurrentSync();
	const appInfo = await app.getInfo();
	let customPalette = extractPaletteFromOptions(
		appInfo.initialOptions as OpenFin.ApplicationCreationOptions & CustomUserAppArgs
	);
	if (customPalette) {
		console.log("Loaded customPalette from command line", customPalette);
	}

	// If there is a palette stored in local storage use that as it is from
	// a restart requested, but then remove it
	const loadedRunPalette = window.localStorage.getItem("customPalette");
	if (loadedRunPalette) {
		customPalette = JSON.parse(loadedRunPalette) as Partial<CustomPaletteSet>;
		console.log("Loaded customPalette from localStorage", customPalette);
		window.localStorage.removeItem("customPalette");
	}

	// If run was requested when we are already running restart the app
	// as we can only update the palette by re-initialising the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.Application.addListener("run-requested", async (params: CustomUserAppArgs) => {
		console.log("Run requested with new palette", params.userAppConfigArgs?.palette);
		const runPalette = extractPaletteFromOptions(params);
		window.localStorage.setItem("customPalette", JSON.stringify(runPalette));
		await app.restart();
	});

	await workspacePlatformInit({
		browser: {},
		theme: [
			{
				label: "theme",
				palette: {
					...darkPalette,
					...customPalette
				}
			}
		]
	});
}

function extractPaletteFromOptions(customUserAppArgs: CustomUserAppArgs): Partial<CustomPaletteSet> {
	if (typeof customUserAppArgs?.userAppConfigArgs?.palette === "string") {
		try {
			const plainJson = atob(customUserAppArgs?.userAppConfigArgs?.palette);
			const customPalette = JSON.parse(plainJson) as CustomPaletteSet;
			console.log("Custom palette", customPalette);
			return customPalette;
		} catch (err) {
			console.error("Error decoding palette", err);
		}
	}

	return {};
}
