import type OpenFin from "@openfin/core";
import type { Page } from "@openfin/workspace-platform";

/**
 * Options for the pages share provider.
 */
export interface PagesShareProviderOptions {
	/**
	 * The display mode to use when displaying a confirmation.
	 */
	confirmationMode?: "notification" | "dialog" | "none";

	/**
	 * The endpoint id to use for storage.
	 */
	endpointId: string;
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
