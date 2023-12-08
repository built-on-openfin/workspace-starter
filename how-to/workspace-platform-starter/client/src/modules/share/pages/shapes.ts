import type OpenFin from "@openfin/core";
import type { Page } from "@openfin/workspace-platform";
import type { ShareConfirmationType } from "workspace-platform-starter/shapes/share-shapes";

/**
 * Options for the pages share provider.
 */
export interface PagesShareProviderOptions {
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
export interface PageShareEntryPayload {
	/**
	 * Identity of the window performing the share.
	 */
	windowIdentity?: OpenFin.Identity;

	/**
	 * The page id being shared.
	 */
	pageId?: string;

	/**
	 * The page being shared.
	 */
	page?: Page;
}
