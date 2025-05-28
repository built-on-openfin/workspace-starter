import type OpenFin from "@openfin/core";
import type { IconSize } from "@openfin/workspace-platform";

/**
 * The custom settings stored in the manifest.fin.json
 */
export interface CustomSettings {
	/**
	 * The settings for the launch bar window.
	 */
	launchBarWindowSettings?: LaunchBarWindowSettings;
	/**
	 * Browser icon size `large` or `default`
	 */
	browserIconSize?: IconSize;
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
