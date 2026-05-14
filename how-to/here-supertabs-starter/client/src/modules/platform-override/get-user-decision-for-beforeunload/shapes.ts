/**
 * Options for the get user decision for beforeunload platform override.
 */
export interface GetUserDecisionForBeforeunloadOptions {
	/**
	 * The title of the dialog window if there are unsaved content changes.
	 */
	title?: string;

	/**
	 * The message to show. Will replace the token {CLOSE_TYPE} with the string window, page or view depending on the close type.
	 */
	message?: string;

	/**
	 * The label for the button that cancels the close action because there are unsaved content changes: Defaults to Cancel.
	 */
	cancelButtonLabel?: string;

	/**
	 * The label for the button that continues the close action even if there are unsaved content changes.
	 */
	closeButtonLabel?: string;
}
