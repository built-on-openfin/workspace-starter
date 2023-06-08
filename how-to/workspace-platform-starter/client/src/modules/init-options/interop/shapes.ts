import type OpenFin from "@openfin/core";

/**
 * Raise intent payload.
 */
export interface RaiseIntentPayload {
	/**
	 * The name of the intent.
	 */
	name: string;

	/**
	 * The context to raise.
	 */
	context: OpenFin.Context;
}

/**
 * Share context payload.
 */
export interface ShareContextPayload {
	/**
	 * The context group to share on.
	 */
	contextGroup: string;

	/**
	 * The context to share.
	 */
	context: OpenFin.Context;
}
