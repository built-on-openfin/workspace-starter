import type OpenFin from "@openfin/core";
/**
 * The options for the dialog provider.
 */
export interface DialogProviderOptions {
	/**
	 * The location of the HTML to use for dialog page.
	 * defaults to http://localhost:8080/common/popups/dialog/index.html
	 */
	dialogHtml?: string;
	/**
	 * Default width for the dialogs, defaults to 500.
	 */
	defaultWidth?: number;
	/**
	 * Default height for the dialogs, defaults to 250.
	 */
	defaultHeight?: number;
}
/**
 * The client providing dialog methods
 */
export interface DialogClient {
	/**
	 * Display a confirmation dialog.
	 * @param options The options for the dialog.
	 * @param parentWindow The parent window to display the dialog over.
	 * @returns The result of the dialog.
	 */
	showConfirmation<T = unknown>(
		options: ConfirmationDialogOptions<T>,
		parentWindow?: OpenFin.Identity
	): Promise<
		| {
				id: string;
				customData?: T;
		  }
		| undefined
	>;
}
/**
 * Options for displaying a confirmation dialog.
 */
export interface ConfirmationDialogOptions<T = unknown> {
	/**
	 * The title of the dialog.
	 */
	title: string;
	/**
	 * The icon to display in the dialog.
	 */
	iconUrl?: string;
	/**
	 * The message to display in the dialog.
	 */
	message: string;
	/**
	 * The confirmation buttons to display, if undefined a default OK button will be displayed.
	 */
	buttons?: DialogButton<T>[];
}
/**
 * A dialog button.
 */
export interface DialogButton<T = unknown> {
	/**
	 * The label to display on the button.
	 */
	label: string;
	/**
	 * The id of the button.
	 */
	id: string;
	/**
	 * The data to return when the button is clicked.
	 */
	customData?: T;
}
