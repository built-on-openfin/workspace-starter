/**
 * Setting for the workspace integration.
 */
export interface WorkspacesSettings {
	/**
	 * Enable favorites, defaults to true.
	 */
	favoritesEnabled?: boolean;

	/**
	 * Images to display.
	 */
	images: {
		workspace: string;
	};
}
