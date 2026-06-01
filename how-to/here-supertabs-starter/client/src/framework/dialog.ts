import type OpenFin from "@openfin/core";
import { createLogger } from "./logger-provider";
import type { ConfirmationDialogOptions, DialogProviderOptions } from "./shapes/dialog-shapes";
import { getCurrentColorSchemeMode, getCurrentPalette } from "./themes";
import { randomUUID } from "./utils";

const logger = createLogger("Dialog");
let dialogOptions: DialogProviderOptions | undefined;

/**
 * Initialize the dialog options.
 * @param options The options for the dialog.
 */
export async function init(options?: DialogProviderOptions): Promise<void> {
	dialogOptions = options;
}

/**
 * Display a confirmation dialog.
 * @param options The options for the dialog.
 * @param parentWindowIdentity The parent window to display the dialog over.
 * @returns The result of the dialog.
 */
export async function showConfirmation<T = unknown>(
	options: ConfirmationDialogOptions<T>,
	parentWindowIdentity?: OpenFin.Identity
): Promise<
	| {
			id: string;
			customData?: T;
	  }
	| undefined
> {
	const currentPalette = await getCurrentPalette();
	const colorScheme = await getCurrentColorSchemeMode();

	const parentWindow = parentWindowIdentity
		? fin.Window.wrapSync(parentWindowIdentity)
		: fin.Window.getCurrentSync();
	const popupUrl = dialogOptions?.dialogHtml ?? "http://localhost:8080/common/popups/dialog/index.html";

	logger.info("Showing confirmation dialog", options);

	// Do a simple markdown to html conversion, this needs to be more powerful
	// as it only replaces line breaks and bold and italic.
	options.message = options.message.replace(/\n/g, "<br>");
	options.message = options.message.replace(/\*{3}(.*?)\*{3}/g, "<b><i>$1</i></b>");
	options.message = options.message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
	options.message = options.message.replace(/\*(.*?)\*/g, "<i>$1</i>");

	let parentBounds;

	if (parentWindowIdentity) {
		parentBounds = await parentWindow.getBounds();
	} else {
		const monitorInfo = await fin.System.getMonitorInfo();
		const rect = monitorInfo.primaryMonitor.availableRect;
		parentBounds = { width: rect.right - rect.left, height: rect.bottom - rect.top };
	}

	const width = dialogOptions?.defaultWidth ?? 500;
	const height = dialogOptions?.defaultHeight ?? 250;
	const x = (parentBounds.width - width) / 2;
	const y = (parentBounds.height - height) / 2;

	const result = await parentWindow.showPopupWindow({
		name: `modal-${randomUUID()}`,
		initialOptions: {
			showTaskbarIcon: false,
			defaultCentered: true,
			// contextMenu: false,
			backgroundColor: currentPalette?.backgroundPrimary,
			customData: {
				...options,
				palette: currentPalette,
				colorScheme
			}
		},
		x,
		y,
		width,
		height,
		url: popupUrl,
		blurBehavior: "modal"
	});

	if (result.result === "clicked") {
		logger.info("Dialog Result", result.data);
		return result.data;
	}
	logger.info("Dialog dismissed");
}
