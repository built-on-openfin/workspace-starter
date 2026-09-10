import type OpenFin from "@openfin/core";
import type { CustomSettings } from "./setting-shapes";

/**
 * A wrapper around the HERE manifest that adds custom settings.
 */
export interface WPSManifest extends Partial<Omit<OpenFin.Manifest, "assetsUrl" | "services">> {
	/**
	 * Custom settings for the HERE Core UI Platform.
	 */
	customSettings?: CustomSettings;
}

/**
 * A type alias for the HERE manifest.
 */
export type OpenFinManifest = Partial<Omit<OpenFin.Manifest, "assetsUrl" | "services">>;
