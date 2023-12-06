import type OpenFin from "@openfin/core";
import type { CustomSettings } from "./setting-shapes";

/**
 * A wrapper around the OpenFin manifest that adds custom settings.
 */
export interface WPSManifest extends Partial<Omit<OpenFin.Manifest, "assetsUrl" | "services">> {
	/**
	 * Custom settings for the workspace platform.
	 */
	customSettings?: CustomSettings;
}

/**
 * A type alias for the OpenFin manifest.
 */
export type OpenFinManifest = Partial<Omit<OpenFin.Manifest, "assetsUrl" | "services">>;
