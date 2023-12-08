import type OpenFin from "@openfin/core";
import type { ShareConfirmationType } from "workspace-platform-starter/shapes/share-shapes";

/**
 * Options for the workspaces share provider.
 */
export interface WorkspacesShareProviderOptions {
	/**
	 * The display mode to use when displaying a confirmation.
	 */
	confirmationMode?: ShareConfirmationType;

	/**
	 * The endpoint id to use for getting storage.
	 */
	getEndpointId: string;

	/**
	 * The endpoint id to use for setting storage.
	 */
	setEndpointId: string;

	/**
	 * Images to display in confirmations.
	 */
	images: {
		/**
		 * Defaults to theme error.svg
		 */
		error: string;

		/**
		 * Defaults to theme success.svg
		 */
		success: string;
	};
}

/**
 * The payload for a page share entry.
 */
export interface WorkspacesShareEntryPayload {
	/**
	 * Identity of the window performing the share.
	 */
	windowIdentity?: OpenFin.Identity;

	/**
	 * The workspace id being shared.
	 */
	workspaceId?: string;
}
