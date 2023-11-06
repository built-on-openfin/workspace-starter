import type OpenFin from "@openfin/core";
import { CLITemplate, Home, type App } from "@openfin/workspace";
import { init, type WorkspacePlatformProvider } from "@openfin/workspace-platform";
import { getApps, launchApp } from "./apps";
import type { CustomSettings } from "./shapes";
import * as Snap from "./snap";

const PLATFORM_ID = "integrate-with-snap";
const PLATFORM_TITLE = "Integrate With Snap";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Initialize dummy workspace components.
	await initializeWorkspaceComponents();

	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();
	if (manifest.appAssets?.[0].src === "SNAP_ASSET_URL") {
		console.error(
			"Please request the SNAP_ASSET_URL from OpenFin and update manifest.fin.json before running the sample"
		);
	}

	const customSettings = await getManifestCustomSettings(manifest);

	customSettings.snapProvider ??= {};
	customSettings.snapProvider.platformId ??= PLATFORM_ID;

	// Initialize the snap components
	await Snap.initialize(customSettings.snapProvider);
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
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
		overrideCallback
	});
}

/**
 * Bring the platform to life.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	console.log("Initializing the bootstrapper");

	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async () => {
			const apps = await getApps();
			return {
				// Always return just the apps list in home
				results: apps.map((app) => ({
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
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Create a class which overrides the platform provider.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Override the getSnapshot platform method so that we can add the native window integration.
		 * @param payload The Payload for the snapshot.
		 * @param identity Identity of the entity that called getSnapshot.
		 * @returns The snapshot.
		 */
		public async getSnapshot(payload: undefined, identity: OpenFin.Identity): Promise<OpenFin.Snapshot> {
			const snapshot = await super.getSnapshot(payload, identity);

			return Snap.decorateSnapshot(snapshot);
		}

		/**
		 * Override the applySnapshot so that we can include native window integrations.
		 * @param payload The payload for the apply snapshot.
		 * @param identity The identity of the entity that called applySnapshot.
		 */
		public async applySnapshot(
			payload: OpenFin.ApplySnapshotPayload,
			identity?: OpenFin.Identity
		): Promise<void> {
			await Snap.prepareToApplyDecoratedSnapshot();

			await super.applySnapshot(payload, identity);

			await Snap.applyDecoratedSnapshot(payload.snapshot);
		}
	}

	return new Override();
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @param manifest The manifest to load the custom settings from.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(manifest: OpenFin.Manifest): Promise<CustomSettings> {
	return (manifest as OpenFin.Manifest & { customSettings?: CustomSettings }).customSettings ?? {};
}
