import type OpenFin from "@openfin/core";
import { init } from "@openfin/workspace-platform";

const PLATFORM_TITLE = "Integrate with Bloomberg Basic";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
	await init({
		browser: {
			title: PLATFORM_TITLE,
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
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
		],
		// Override the platform interop so that we can handle intents
		interopOverride
	});
}

/**
 * Bring the platform to life.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Override the platform interop.
 * @param InteropBroker The base interop broker class.
 * @returns The overloaded broker.
 */
function interopOverride(InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>): OpenFin.InteropBroker {
	/**
	 * Extend the InteropBroker to handle intents.
	 */
	class InteropOverride extends InteropBroker {
		/**
		 * Override the fire intent callback to always target the BBG window.
		 * @param intent The intent to handle.
		 */
		public async handleFiredIntent(intent: OpenFin.Intent): Promise<void> {
			console.log("Received request for a raised intent:", intent);
			const targetIdentity = { uuid: fin.me.identity.uuid, name: "bbgTest" };
			await super.setIntentTarget(intent, targetIdentity);
		}
	}

	return new InteropOverride();
}
