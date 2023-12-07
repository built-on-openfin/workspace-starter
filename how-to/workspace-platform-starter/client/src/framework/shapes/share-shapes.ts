import type OpenFin from "@openfin/core";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * A list of modules that provide sharing.
 */
export interface ShareProviderOptions extends ModuleList {
	/**
	 * Is sharing enabled, defaults to true.
	 */
	enabled?: boolean;
}

/**
 * The module definition for shares.
 */
export interface Share<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the list of share types supported by the module.
	 * @returns Nothing.
	 */
	getShareTypes(): Promise<string[]>;

	/**
	 * Get the shares from the module.
	 * @param windowIdentity The window identity to get the shares for.
	 * @returns Nothing.
	 */
	getEntries(windowIdentity: OpenFin.Identity): Promise<ShareEntry[] | undefined>;

	/**
	 * Perform the share for the given entry.
	 * @param type The type of share to perform.
	 * @param payload The data to associate with the share.
	 * @returns Nothing.
	 */
	share(type: string, payload?: unknown): Promise<void>;

	/**
	 * Handle a share activation.
	 * @param type The type of the share.
	 * @param payload The payload for the share.
	 * @returns Nothing.
	 */
	handle(type: string, payload?: unknown): Promise<void>;
}

/**
 * An entry for sharing.
 */
export interface ShareEntry {
	/**
	 * The type of the share entry.
	 */
	type: string;

	/**
	 * The label of the share entry.
	 */
	label: string;

	/**
	 * Custom data for the share entry.
	 */
	payload?: unknown;
}

/**
 * The client providing share methods
 */
export interface ShareClient {
	/**
	 * Perform a share of the specified type.
	 * @param type The type of share to perform.
	 * @param payload The data to associate with the share.
	 * @returns Nothing.
	 */
	share(type: string, payload?: unknown): Promise<void>;
}
