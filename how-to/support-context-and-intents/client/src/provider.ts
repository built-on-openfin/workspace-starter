import { cloudInteropOverride } from "@openfin/cloud-interop";
import type OpenFin from "@openfin/core";
import { CLITemplate, Home, type App, type HomeSearchListenerRequest } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { getApps, launchApp } from "./apps";
import { createInteropOverride } from "./interopbroker";
import type { CustomSettings } from "./shapes";

const PLATFORM_ID = "support-context-and-intents";
const PLATFORM_TITLE = "Support Context and Intents";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// Load the settings from the manifest
	const customSettings = await getManifestCustomSettings();

	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents(customSettings));

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(customSettings);
});

/**
 * Initialize the workspace platform.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspacePlatform(customSettings: CustomSettings): Promise<void> {
	console.log("Initializing workspace platform");

	const defaultBroker = createInteropOverride(customSettings);
	const interopOverride: OpenFin.ConstructorOverride<OpenFin.InteropBroker>[] = [defaultBroker];

	if (
		customSettings?.cloudInteropProvider?.enabled === true &&
		customSettings?.cloudInteropProvider?.connectParams !== undefined
	) {
		console.log("Initializing the cloud interop override");
		const initializedCloudInteropOverride = (await cloudInteropOverride(
			customSettings?.cloudInteropProvider?.connectParams
		)) as unknown as OpenFin.ConstructorOverride<OpenFin.InteropBroker>;
		interopOverride.push(initializedCloudInteropOverride);
	}

	await init({
		browser: {
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
		// Use an override for the platform interop to handle the context and intents
		interopOverride
	});
}

/**
 * Bring the platform to life.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspaceComponents(customSettings: CustomSettings): Promise<void> {
	console.log("Initializing the bootstrapper");

	// Register with home and show it
	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async (request: HomeSearchListenerRequest) => {
			// Get the list of all the apps
			let apps = await getApps(customSettings.appProvider);

			if (request.query.length >= 3) {
				// Filter them by title if we have a query
				apps = apps.filter((app) => app.title.toLowerCase().includes(request.query.toLowerCase()));
			}

			return {
				// Always return just the apps list in home
				results: apps.map((app) => ({
					key: app.appId,
					title: app.title,
					icon: app.icons[0]?.src,
					data: app,
					label: app.manifestType === "inline-appasset" || app.manifestType === "external" ? "App" : "View",
					actions: [{ name: "Launch", hotkey: "enter" }],
					description: app.description,
					shortDescription: app.description,
					template: CLITemplate.SimpleText,
					templateContent: app.description
				}))
			};
		},
		onResultDispatch: async (result) => {
			// We only have apps, so just launch them
			await launchApp(result.data as App);
		}
	});

	await Home.show();

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await Home.deregister(PLATFORM_ID);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
