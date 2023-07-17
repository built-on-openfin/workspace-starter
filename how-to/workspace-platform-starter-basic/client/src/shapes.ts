import type { App } from "@openfin/workspace";

/**
 * The custom settings stored in the manifest.fin.json.
 */
export interface CustomSettings {
	/**
	 * The applications to populate in the platform.
	 */
	apps?: App[];
}

/**
 * The platform settings stored in the manifest.fin.json.
 */
export interface PlatformSettings {
	/**
	 * The id for the platform.
	 */
	id: string;

	/**
	 * The title for the platform.
	 */
	title: string;

	/**
	 * The icon for the platform.
	 */
	icon: string;
}
