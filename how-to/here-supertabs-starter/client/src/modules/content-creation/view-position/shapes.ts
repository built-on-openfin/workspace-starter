import type OpenFin from "@openfin/core";

/**
 * Settings for view position content creation.
 */
export interface ViewPositionContentCreationSettings {
	/**
	 * Rules for the content creation.
	 */
	rules?: OpenFin.ContentCreationRule[];

	/**
	 * Presents the option of having a default behavior if the window.open features doesn't specify one and a view is targeted.
	 */
	defaultViewPosition?: "right" | "left" | "top" | "bottom" | "stack-left" | "stack-right";
}
