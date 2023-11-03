import type OpenFin from "@openfin/core";
import type { LaunchStrategy } from "@openfin/snap-sdk";
import type { App } from "@openfin/workspace";

/**
 * Extend the app definition to have more information.
 */
export type PlatformApp = App | PlatformAppInlineAppAsset;

/**
 * Extend the app definition for inline app assets.
 */
export type PlatformAppInlineAppAsset = Omit<App, "manifest"> & {
	/**
	 * The manifest type for an inline app asset.
	 */
	manifestType: "inline-appasset";

	/**
	 * The different types of content that can be contained in the manifest.
	 */
	manifest: AppAssetInfoWithLaunchStrategy;
};

/**
 * Type for the inline app asset with included snap launch strategy.
 */
export type AppAssetInfoWithLaunchStrategy = Omit<OpenFin.AppAssetInfo, "args"> & {
	/**
	 * Replace the args with string array which matches the strategy.
	 */
	args?: string[];

	/**
	 * Snap launch strategy.
	 */
	launchStrategy?: LaunchStrategy;
};

/**
 * The custom settings section defined in the manifest.
 */
export interface CustomSettings {
	/**
	 * The snap provider options.
	 */
	snapProvider?: SnapProviderOptions;
}

/**
 * The snap provider options.
 */
export interface SnapProviderOptions {
	/**
	 * The platform id to register with the snap server.
	 */
	platformId?: string;

	/**
	 * Show the Snap SDK debug window.
	 */
	showDebugWindow?: boolean;
}
