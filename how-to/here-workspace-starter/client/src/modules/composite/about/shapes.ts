import type OpenFin from "@openfin/core";
import type { MenuEntryDynamic } from "workspace-platform-starter/shapes/menu-shapes";

/**
 * State to share between the module components.
 */
export interface SharedState {
	/**
	 * The about window settings.
	 */
	aboutWindow?: OpenFin.WindowOptions;
}

/**
 * Settings for the about actions.
 */
export interface AboutActionSettings {
	/**
	 * The window display options.
	 */
	windowOptions: OpenFin.WindowOptions;
}

/**
 * Settings for the about provider.
 */
export interface AboutProviderSettings {
	/**
	 * The title.
	 */
	title?: string;

	/**
	 * The description.
	 */
	description?: string;

	/**
	 * Exclude version types.
	 */
	excludeVersionType?: string[];

	/**
	 * Mapping of types to version.
	 */
	versionTypeMap?: { [key: string]: string };
}

/**
 * Settings for the about menu.
 */
export interface AboutMenusSettings {
	/**
	 * The entries for the menu.
	 */
	entries?: {
		[id: string]: MenuEntryDynamic;
	};
}
