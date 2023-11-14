import type OpenFin from "@openfin/core";

/**
 * The options for the snap provider.
 */
export interface SnapProviderOptions {
	/**
	 * Is snap enabled, defaults to false.
	 */
	enabled?: boolean;

	/**
	 * The id to use for launching the server.
	 */
	id?: string;

	/**
	 * The asset for the Snap server.
	 */
	serverAssetInfo?: OpenFin.AppAssetInfo;

	/**
	 * Show the snap debug window.
	 */
	showDebugWindow?: boolean;
}
