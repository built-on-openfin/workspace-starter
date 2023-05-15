import { CLITemplate, Home } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { register } from "./home";
import { getApps, launchApp } from "./apps";

const PLATFORM_ID = "register-with-platform-windows";
const PLATFORM_TITLE = "Register With Platform Windows";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

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

/**
 * Bring the platform to life.
 */
export async function initializeWorkspaceComponents(): Promise<void> {
	console.log("Initialising the bootstrapper");

	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async () => ({
			// Always return just the apps list in home
			results: getApps().map((app) => ({
				key: app.appId,
				title: app.title,
				icon: app.icons[0]?.src,
				data: app,
				label: "View",
				actions: [{ name: "Launch View", hotkey: "enter" }],
				description: app.description,
				shortDescription: app.description,
				template: CLITemplate.SimpleText,
				templateContent: app.description
			}))
		}),
		onResultDispatch: async (result) => {
			// We only have apps, so just launch them
			await launchApp(result.data as App);
		}
	);

	await Home.show();

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await Home.deregister(PLATFORM_ID);

		await fin.Platform.getCurrentSync().quit();
	});
}