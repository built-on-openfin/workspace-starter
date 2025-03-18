import type { OpenFin } from "@openfin/core";
import type { CustomSettings, SnapProviderOptions } from "./shapes";

/**
 * Gets settings from the manifest.
 * @param showDebugWindow Whether to enable the debug window regardless of manifest settings.
 * @returns The snap provider options from the manifest.
 */
export async function getSettings(showDebugWindow?: boolean): Promise<SnapProviderOptions> {
	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();
	if (manifest.appAssets?.[0]?.src === "SNAP_ASSET_URL") {
		console.error(
			"Please request the SNAP_ASSET_URL from OpenFin and update manifest.fin.json before running the sample"
		);
	}
	const settings = await getManifestCustomSettings(manifest);
	settings.snapProvider ??= {};
	if (settings.snapProvider.serverOptions === undefined) {
		settings.snapProvider.serverOptions = {
			showDebug: showDebugWindow
		};
	}
	return settings.snapProvider;
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @param manifest The manifest to load the custom settings from.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(manifest: OpenFin.Manifest): Promise<CustomSettings> {
	return (manifest as OpenFin.Manifest & { customSettings?: CustomSettings }).customSettings ?? {};
}
