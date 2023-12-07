/**
 * The client providing dialog methods
 */
export interface DialogClient {
	/**
	 * Display a confirmation dialog.
	 * @param options The options for the dialog.
	 * @returns The result of the dialog.
	 */
	showConfirmation<T = unknown>(
		options: ConfirmationDialogOptions<T>
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
	icon: string;
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
