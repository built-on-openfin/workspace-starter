import { Home } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register } from "./home";

const PLATFORM_ID = "use-theming-basic";
const PLATFORM_TITLE = "Use Theming Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(PLATFORM_ICON);

	// Register the home component
	await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON);

	// Show the home component
	await Home.show();
});

/**
 * Initialize the workspace platform.
 * @param icon The icon to use in windows.
 */
async function initializeWorkspacePlatform(icon: string): Promise<void> {
	console.log("Initialising workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon,
				workspacePlatform: {
					pages: [],
					favicon: icon
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "light",
				palettes: {
					light: {
						brandPrimary: "#0A76D3",
						brandSecondary: "#1E1F23",
						backgroundPrimary: "#FAFBFE",
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
						textInactive: "#7D808A",
						contentBackground1: "#0A76D3",
						contentBackground2: "#000000",
						contentBackground3: "#000000",
						contentBackground4: "#000000",
						contentBackground5: "#000000"
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
						textInactive: "#7D808A",
						contentBackground1: "#0A76D3",
						contentBackground2: "#000000",
						contentBackground3: "#000000",
						contentBackground4: "#000000",
						contentBackground5: "#000000"
					}
				}
			}
		]
	});
}
