import { init } from "@openfin/workspace-platform";

window.addEventListener("DOMContentLoaded", async () => {
	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();
	let workspaceAsar: { alias: string } | undefined;
	if (Array.isArray(manifest.appAssets) && manifest.appAssets.length > 0) {
		workspaceAsar = manifest.appAssets[0];
	}

	await initializeWorkspacePlatform(workspaceAsar);
});

/**
 * Initialize the workspace platform.
 * @param workspaceAsar The entry representing an app asset with the workspace browser settings.
 * @param workspaceAsar.alias the alias of the app asset.
 */
async function initializeWorkspacePlatform(workspaceAsar?: { alias: string }): Promise<void> {
	console.log(`Initializing workspace platform with asar: ${workspaceAsar?.alias ?? "none"}`);
	await init({
		browser: {
			defaultWindowOptions: {
				workspacePlatform: {
					icon: "https://www.here.io/icon2.png",
					favicon: "https://www.here.io/favicon.ico",
					pages: []
				}
			}
		},
		workspaceAsar
	});
}
