import type OpenFin from "@openfin/core";

/**
 * The custom settings stored in the manifest.fin.json
 */
export interface CustomSettings {
	/**
	 * The settings for the launch bar window.
	 */
	launchBarWindowSettings?: LaunchBarWindowSettings;
}

/**
 * The settings for the launch bar window.
 */
export interface LaunchBarWindowSettings extends OpenFin.WindowCreationOptions {
	/**
	 * The url of the launch bar.
	 */
	url: string;
}
