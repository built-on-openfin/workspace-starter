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

	/**
	 * The display mode to use when displaying a confirmation.
	 */
	confirmationMode?: ShareConfirmationType;
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
 * Type of share confirmation.
 */
export type ShareConfirmationType = "notification" | "modal" | "none";

/**
 * Type of share status.
 */
export type ShareConfirmationStatus = "shared" | "loaded" | "error";

/**
 * Share confirmation options.
 */
export interface ShareConfirmationOptions {
	/**
	 * The title for the confirmation.
	 */
	title: string;

	/**
	 * The icon for the confirmation.
	 */
	iconUrl?: string;

	/**
	 * The message for the confirmation.
	 */
	message: string;

	/**
	 * The status of the notification.
	 */
	status: ShareConfirmationStatus;
}

/**
 * The client providing share methods
 */
export interface ShareClient {
	/**
	 * Check if the share type is enabled.
	 * @param type The type of share to check.
	 * @returns True if the share type is enabled.
	 */
	typeEnabled(type: string): Promise<boolean>;

	/**
	 * Perform a share of the specified type.
	 * @param type The type of share to perform.
	 * @param payload The data to associate with the share.
	 * @returns Nothing.
	 */
	share(type: string, payload?: unknown): Promise<void>;

	/**
	 * Display a confirmation for the share.
	 * @param confirmationOptions The confirmation options.
	 * @param confirmationType The type of confirmation to show.
	 * @param parentIdentity The identity of the parent window.
	 * @returns Nothing.
	 */
	confirmation(
		confirmationOptions: ShareConfirmationOptions,
		confirmationType: ShareConfirmationType | undefined,
		parentIdentity?: OpenFin.Identity
	): Promise<void>;
}
