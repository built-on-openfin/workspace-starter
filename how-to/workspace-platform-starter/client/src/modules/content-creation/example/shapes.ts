import type OpenFin from "@openfin/core";

/**
 * Settings for example content creation.
 */
export interface ExampleContentCreationSettings {
	/**
	 * Rules for the content creation.
	 */
	rules?: OpenFin.ContentCreationRule[];
}
