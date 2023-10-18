import type OpenFin from "@openfin/core";
import { isEmpty } from "./utils";

/**
 * Provides x and y co-ordinates to position a window of a given size in relation to another window/view.
 * @param clientIdentity The identity of the view/window these x/y co-ordinates should be in relation to.
 * @param dimensions The dimensions of the window that will be placed in the center of the screen.
 * @param dimensions.height The height of the window that is going to be placed
 * @param dimensions.width The width of the window that is going to be placed.
 * @returns The x, y co-ordinates to position the window
 */
export async function getCenterPosition(
	clientIdentity: OpenFin.Identity,
	dimensions: { height: number; width: number }
): Promise<{ x: number; y: number } | undefined> {
	const monitorInfo = await getMonitorInfo(clientIdentity);
	const height = monitorInfo.availableRect.bottom - monitorInfo.availableRect.top;
	const width = monitorInfo.availableRect.right - monitorInfo.availableRect.left;

	// eslint-disable-next-line no-mixed-operators
	const x = monitorInfo.availableRect.left + width / 2 - dimensions.width / 2;
	// eslint-disable-next-line no-mixed-operators
	const y = monitorInfo.availableRect.top + height / 2 - dimensions.height / 2;

	return { x, y };
}

/**
 * Returns the monitor details for the monitor a view/window is placed on.
 * @param clientIdentity The identity of the view/window to check against.
 * @returns The monitor the view/window lives on or undefined if no match was found.
 */
export async function getMonitorInfo(clientIdentity: OpenFin.Identity): Promise<OpenFin.MonitorDetails> {
	let bounds: OpenFin.Bounds | undefined;
	let currentWindow: OpenFin.Window | undefined;

	try {
		const targetView = fin.View.wrapSync(clientIdentity);
		currentWindow = await targetView.getCurrentWindow();
	} catch {
		// we were not passed a view.
	}

	if (isEmpty(bounds)) {
		try {
			const targetWindow = currentWindow ?? fin.Window.wrapSync(clientIdentity);
			bounds = await targetWindow.getBounds();
		} catch {
			// it wasn't a window
		}
	}
	if (isEmpty(bounds)) {
		try {
			bounds = await fin.me.getBounds();
		} catch {
			// unable to get own bounds
		}
	}

	const monitorInfo = await fin.System.getMonitorInfo();
	if (!isEmpty(bounds)) {
		if (isMatchingMonitor(monitorInfo.primaryMonitor.availableRect, bounds)) {
			return monitorInfo.primaryMonitor;
		}

		for (const nonPrimaryMonitor of monitorInfo.nonPrimaryMonitors) {
			if (isMatchingMonitor(nonPrimaryMonitor.availableRect, bounds)) {
				return nonPrimaryMonitor;
			}
		}
	}
	// if no match is found return the primary monitor
	return monitorInfo.primaryMonitor;
}

/**
 * This checks to see if the bounds of a view or window fall within a specific monitor.
 * @param rect The rectangle of a specific monitor
 * @param bounds The bounds of the window you are checking against.
 * @returns Whether or not the passed monitor rect was a match.
 */
function isMatchingMonitor(rect: OpenFin.RectangleByEdgePositions, bounds: OpenFin.Bounds): boolean {
	return (
		rect.left <= bounds.left &&
		rect.right >= bounds.left &&
		rect.top <= bounds.top &&
		rect.bottom >= bounds.top
	);
}
