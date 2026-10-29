import { init } from "@openfin/workspace-platform";

window.addEventListener("DOMContentLoaded", async () => {
	await initializeWorkspacePlatform();
});

/**
 * Initialize the HERE Core UI Platform with a minimal Browser configuration.
 * Page translation is enabled by Runtime when HERE_GOOGLE_API_KEY is set at startup.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing HERE Core UI Platform for browser page translation demo");
	await init({
		browser: {
			defaultWindowOptions: {
				workspacePlatform: {
					icon: "https://www.here.io/icon2.png",
					favicon: "https://www.here.io/favicon.ico",
					pages: []
				}
			}
		}
	});
}
