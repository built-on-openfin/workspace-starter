import { Home } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register } from "./home";

const PLATFORM_ID = "register-with-platform-windows";
const PLATFORM_TITLE = "Register With Platform Windows";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Register Home
	await register(PLATFORM_ID, PLATFORM_TITLE, PLATFORM_ICON);

	// Show home
	await Home.show();

	// The apps that are launch from home will use the defaultWindowOptions
	// configured in manifest.fin.json
	// This configuration supplied a template for the windows
	// so they are styled by platform-window.html and driven by platform-window.ts
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initialising workspace platform");
	// We set the browser configuration to null to tell the platform we will
	// be using platform api windows
	await init({
		browser: null as unknown as undefined,
		theme: [
			{
				label: "Default",
				default: "dark",
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		]
	});
}
