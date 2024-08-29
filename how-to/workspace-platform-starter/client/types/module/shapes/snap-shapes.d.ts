import type OpenFin from "@openfin/core";
import type { LayoutClient } from "@openfin/snap-sdk";
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
/**
 * Represents the snap provider of a platform to be used as part of a platform override if needed.
 */
export interface SnapProvider {
	/**
	 * Is snapping enabled.
	 * @returns True if snapping is enabled.
	 */
	isEnabled(): boolean;
	/**
	 * Decorate a snapshot with the native window information.
	 * @param snapshot The snapshot to decorate.
	 * @returns The decorated snapshot.
	 */
	decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot>;
	/**
	 * Apply a decorated snapshot.
	 * @param snapshot The snapshot to apply.
	 * @param existingApps A list of the existing apps registered with snap.
	 * @returns nothing.
	 */
	applyDecoratedSnapshot(snapshot: OpenFin.Snapshot, existingApps: LayoutClient[]): Promise<void>;
	/**
	 * Prepare to apply a decorated snapshot.
	 * @returns List of existing app ids with their windows.
	 */
	prepareToApplyDecoratedSnapshot(): Promise<LayoutClient[]>;
}
