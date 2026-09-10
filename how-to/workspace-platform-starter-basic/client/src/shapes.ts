import type { App } from "@openfin/workspace";
import type { CustomThemes } from "@openfin/workspace-platform";

/**
 * The custom settings stored in the manifest.fin.json.
 */
export interface CustomSettings {
	/**
	 * Url of JSON file to load apps from, can be combined the the apps property.
	 */
	appsUrl?: string;

	/**
	 * The applications to populate in the platform.
	 */
	apps?: App[];

	/**
	 * Should the browser show the plus sign and load a url.
	 */
	newPageUrl?: string;

	/**
	 * Should the browser show the plus sign and load a url.
	 */
	newTabUrl?: string;

	/**
	 * The default theme to use for the platform.
	 */
	theme?: CustomThemes;
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
