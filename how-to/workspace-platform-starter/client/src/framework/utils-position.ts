import type OpenFin from "@openfin/core";
import { isEmpty } from "./utils";

/**
 * Provides x and y co-ordinates to position a window of a given size in relation to another window/view.
 * @param clientIdentity The identity of the view/window these x/y co-ordinates should be in relation to.
 * @param dimensions The dimensions of the window that will be placed in the center of the screen.
 * @param dimensions.width The width of the window that is going to be placed.
 * @param dimensions.height The height of the window that is going to be placed.
 * @returns The x, y co-ordinates to position the window
 */
export async function centerContentInIdentity(
	clientIdentity: OpenFin.Identity,
	dimensions: { width: number; height: number }
): Promise<{ x: number; y: number } | undefined> {
	const bounds = await getIdentityBounds(clientIdentity);
	const boundsCenter = getBoundsCenter(bounds);
	const monitorInfo = await findMonitorContainingPoint(boundsCenter);
	return centerContentInRect(monitorInfo.availableRect, dimensions);
}

/**
 * Provides x and y co-ordinates to position content of a given size in relation to a rect.
 * @param availableRect The available rect to position the content in.
 * @param availableRect.left The available rect left to position the content in.
 * @param availableRect.top The available rect top to position the content in.
 * @param availableRect.right The available rect right to position the content in.
 * @param availableRect.bottom The available rect bottom to position the content in.
 * @param contentDimensions The dimensions of the content that will be placed in the center of the screen.
 * @param contentDimensions.width The width of the content that is going to be placed.
 * @param contentDimensions.height The height of the content that is going to be placed.
 * @returns The x, y co-ordinates to position the content
 */
export function centerContentInRect(
	availableRect: { left: number; top: number; right: number; bottom: number },
	contentDimensions: { width: number; height: number }
): { x: number; y: number } {
	const height = availableRect.bottom - availableRect.top;
	const width = availableRect.right - availableRect.left;
	const dividedRectWidth = width / 2;
	const dividedRectHeight = height / 2;
	const dividedDimensionWidth = contentDimensions.width / 2;
	const dividedDimensionHeight = contentDimensions.height / 2;
	const x = availableRect.left + dividedRectWidth - dividedDimensionWidth;
	const y = availableRect.top + dividedRectHeight - dividedDimensionHeight;

	return { x, y };
}

/**
 * Returns the monitor details for the monitor a view/window is placed on.
 * @param clientIdentity The identity of the view/window to check against.
 * @returns The monitor the view/window lives on or undefined if no match was found.
 */
export async function getIdentityBounds(
	clientIdentity: OpenFin.Identity
): Promise<OpenFin.Bounds | undefined> {
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

	return bounds;
}

/**
 * Find the monitor which contains the point and returns it.
 * @param point The point coord to locate.
 * @param point.x The x coord
 * @param point.y The y coord
 * @returns The monitor containing the point.
 */
export async function findMonitorContainingPoint(point: {
	x?: number;
	y?: number;
}): Promise<OpenFin.MonitorDetails> {
	const monitorInfo = await fin.System.getMonitorInfo();

	const x = point.x;
	const y = point.y;
	if (!isEmpty(x) && !isEmpty(y)) {
		for (const monitor of monitorInfo.nonPrimaryMonitors) {
			if (pointInRect({ x, y }, monitor.monitorRect)) {
				return monitor;
			}
		}
	}

	return monitorInfo.primaryMonitor;
}

/**
 * Is the point in the rectangle.
 * @param point The coord to match.
 * @param point.x The x coord.
 * @param point.y The y coord.
 * @param rect The rect.
 * @param rect.top The rect top.
 * @param rect.left The rect left.
 * @param rect.bottom The rect bottom.
 * @param rect.right The rect right.
 * @returns True if the point is in the rect.
 */
export function pointInRect(
	point: { x: number; y: number },
	rect: {
		top: number;
		left: number;
		bottom: number;
		right: number;
	}
): boolean {
	return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}

/**
 * Get the center for a bounding rectangle.
 * @param bounds The rect
 * @param bounds.top The rect top
 * @param bounds.left The rect left
 * @param bounds.width The rect bottom
 * @param bounds.hgith The rect right
 * @returns True if the point is in the rect.
 */
export function getBoundsCenter(bounds?: OpenFin.Bounds): { x?: number; y?: number } {
	let boundsCenterX;
	let boundsCenterY;
	if (!isEmpty(bounds)) {
		const halfWidth = bounds.width / 2;
		const halfHeght = bounds.height / 2;
		boundsCenterX = bounds.left + halfWidth;
		boundsCenterY = bounds.top + halfHeght;
	}
	return { x: boundsCenterX, y: boundsCenterY };
}
