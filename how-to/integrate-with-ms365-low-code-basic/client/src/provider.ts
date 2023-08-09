import type OpenFin from "@openfin/core";
import { Home, Integrations } from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import type { WorkflowIntegration } from "@openfin/workspace-platform";
import type { CustomSettings } from "./shapes";

const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	await initializeWorkspacePlatform();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
	const customSettings = await getManifestCustomSettings();
	const integrations: WorkflowIntegration[] = [];
	if (customSettings.ms365) {
		const msft365WorkflowIntegration = new Integrations.Microsoft365WorkflowIntegration({
			connect: {
				clientId: customSettings.ms365.clientId,
				redirectUri: customSettings.ms365.redirectUri,
				tenantId: customSettings.ms365.tenantId
			}
		});
		integrations.push(msft365WorkflowIntegration);
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
		integrations
	});
	await Home.show();
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest. These settings could come from a service instead.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
