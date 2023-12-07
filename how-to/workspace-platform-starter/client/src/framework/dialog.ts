import { createLogger } from "./logger-provider";
import type { ConfirmationDialogOptions } from "./shapes/dialog-shapes";

const logger = createLogger("Tray");

/**
 * Display a confirmation dialog.
 * @param options The options for the dialog.
 * @returns The result of the dialog.
 */
export async function showConfirmation<T = unknown>(
	options: ConfirmationDialogOptions<T>
): Promise<
	| {
			id: string;
			customData?: T;
	  }
	| undefined
> {
	logger.info("Showing dialog", options.title);
	return undefined;
}
