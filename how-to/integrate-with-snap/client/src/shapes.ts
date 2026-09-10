import type OpenFin from "@openfin/core";
import type Snap from "@openfin/snap-sdk";
import type { LaunchStrategy, ServerOptions } from "@openfin/snap-sdk";
import type { App } from "@openfin/workspace";

/**
 * Extend the app definition to have more information.
 */
export type PlatformApp = App | PlatformAppInlineAppAsset;

/**
 * Payload for applying a Snap snapshot.
 */
export interface ApplySnapSnapshotPayload {
	/**
	 * The Snap snapshot to apply.
	 */
	snapshot: Snap.SnapSnapshot;

	/**
	 * Options for applying the snapshot.
	 */
	options?: OpenFin.ApplySnapshotOptions;
}

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
	 * The server options to pass to the snap server.
	 */
	serverOptions?: ServerOptions;
}
