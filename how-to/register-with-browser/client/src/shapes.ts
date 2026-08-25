import type { IconSize } from "@openfin/workspace-platform";

/**
 * The custom settings stored in the manifest.fin.json
 */
export interface CustomSettings {
	/**
	 * Browser icon size `large` or `default`
	 */
	browserIconSize?: IconSize;
}
