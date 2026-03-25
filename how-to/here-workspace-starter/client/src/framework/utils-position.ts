import type OpenFin from "@openfin/core";
import type { BrowserProviderOptions, WindowPositioningOptions } from "./shapes/browser-shapes";
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

	return { x: Math.round(x), y: Math.round(y) };
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
 * @param bounds.width The rect width
 * @param bounds.height The rect height
 * @returns the x and y of the bounds center or an object not containing x or y.
 */
export function getBoundsCenter(bounds?: OpenFin.Bounds): { x?: number; y?: number } {
	let boundsCenterX: number | undefined;
	let boundsCenterY: number | undefined;
	if (!isEmpty(bounds)) {
		const halfWidth = bounds.width / 2;
		const halfHeight = bounds.height / 2;
		boundsCenterX = bounds.left + halfWidth;
		boundsCenterY = bounds.top + halfHeight;
		return { x: Math.round(boundsCenterX), y: Math.round(boundsCenterY) };
	}
	return {};
}

/**
 * Given browser settings what window positioning options should be used?
 * @param settings The browser settings that have been provided.
 * @returns a set of window positioning options.
 */
export async function getWindowPositionOptions(
	settings?: BrowserProviderOptions
): Promise<WindowPositioningOptions> {
	const windowPositioningOptions: WindowPositioningOptions = {};
	windowPositioningOptions.defaults = {};
	if (!isEmpty(settings)) {
		windowPositioningOptions.windowPositioningStrategy = settings.windowPositioningStrategy;
		windowPositioningOptions.disableWindowPositioningStrategy = settings.disableWindowPositioningStrategy;
		if (!isEmpty(settings?.defaultWindowOptions?.defaultLeft)) {
			windowPositioningOptions.defaults.left = settings.defaultWindowOptions.defaultLeft;
		}
		if (!isEmpty(settings?.defaultWindowOptions?.defaultTop)) {
			windowPositioningOptions.defaults.top = settings.defaultWindowOptions.defaultTop;
		}
	}
	if (isEmpty(windowPositioningOptions.defaults.left) || isEmpty(windowPositioningOptions.defaults.top)) {
		const app = await fin.Application.getCurrent();
		const platformManifest: OpenFin.Manifest = await app.getManifest();
		if (!isEmpty(platformManifest?.platform?.defaultWindowOptions?.defaultLeft)) {
			windowPositioningOptions.defaults.left = platformManifest.platform.defaultWindowOptions.defaultLeft;
		}
		if (!isEmpty(platformManifest?.platform?.defaultWindowOptions?.defaultTop)) {
			windowPositioningOptions.defaults.top = platformManifest.platform.defaultWindowOptions.defaultTop;
		}
	}
	return windowPositioningOptions;
}

/**
 * Get the window position using a strategy.
 * @param windowPositioningOptions The options for window positioning.
 * @param windowPositioningOptions.windowPositioningStrategy The strategy for window positioning.
 * @param windowPositioningOptions.windowPositioningStrategy.x The x coordinate.
 * @param windowPositioningOptions.windowPositioningStrategy.y The y coordinate.
 * @param windowPositioningOptions.disableWindowPositioningStrategy Whether to disable the window positioning strategy.
 * @param relatedTo The related monitor or identity or x/y position.
 * @returns The x and y coordinates of the window position.
 */
export async function getWindowPositionUsingStrategy(
	windowPositioningOptions?: WindowPositioningOptions,
	relatedTo?: OpenFin.MonitorDetails | OpenFin.Identity | { x: number; y: number }
): Promise<{ left: number; top: number } | undefined> {
	if (windowPositioningOptions?.disableWindowPositioningStrategy === true) {
		return;
	}
	let targetMonitor: OpenFin.MonitorDetails | undefined;

	if (isEmpty(relatedTo)) {
		const monitors = await fin.System.getMonitorInfo();
		targetMonitor = monitors.primaryMonitor;
	} else if (!isEmpty(relatedTo) && "monitorRect" in relatedTo) {
		targetMonitor = relatedTo;
	} else if (!isEmpty(relatedTo) && "x" in relatedTo) {
		targetMonitor = await findMonitorContainingPoint(relatedTo);
	} else {
		const bounds = await getIdentityBounds(relatedTo);
		if (isEmpty(bounds)) {
			const monitors = await fin.System.getMonitorInfo();
			targetMonitor = monitors.primaryMonitor;
		} else {
			targetMonitor = await findMonitorContainingPoint({ x: bounds.left, y: bounds.top });
		}
	}
	const windowDefaultLeft = windowPositioningOptions?.defaults?.left ?? 0;
	const windowDefaultTop = windowPositioningOptions?.defaults?.top ?? 0;

	// Get the available rect for the display so we can take in to account
	// OS menus, task bar etc
	const availableLeft = targetMonitor.availableRect.left;
	const availableTop = targetMonitor.availableRect.top;
	const windowOffsetsX: number = windowPositioningOptions?.windowPositioningStrategy?.x ?? 30;
	const windowOffsetsY: number = windowPositioningOptions?.windowPositioningStrategy?.y ?? 30;
	const windowOffsetsMaxIncrements: number =
		windowPositioningOptions?.windowPositioningStrategy?.maxIncrements ?? 8;
	const visibleWindows = await getAllVisibleWindows();
	// Get the top left bounds for all the visible windows
	const topLeftBounds = await Promise.all(
		visibleWindows.map(async (win) => {
			try {
				const bounds = await win.getBounds();
				return {
					left: bounds.left,
					top: bounds.top,
					right: bounds.left + windowOffsetsX,
					bottom: bounds.top + windowOffsetsY
				};
			} catch {
				// return a dummy entry.
				return {
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				};
			}
		})
	);

	let minCountVal: number = 1000;
	let minCountIndex = windowOffsetsMaxIncrements;

	// Now see how many windows appear in each increment slot
	for (let i = 0; i < windowOffsetsMaxIncrements; i++) {
		const xPos = i * windowOffsetsX;
		const yPos = i * windowOffsetsY;
		const leftPos = windowDefaultLeft + xPos;
		const topPos = windowDefaultTop + yPos;
		const foundWins = topLeftBounds.filter(
			(topLeftWinBounds) =>
				topLeftWinBounds.left >= leftPos + availableLeft &&
				topLeftWinBounds.right <= leftPos + windowOffsetsX + availableLeft &&
				topLeftWinBounds.top >= topPos + availableTop &&
				topLeftWinBounds.bottom <= topPos + windowOffsetsY + availableTop
		);
		// If this slot has less than the current minimum use this slot
		if (foundWins.length < minCountVal) {
			minCountVal = foundWins.length;
			minCountIndex = i;
		}
	}

	const xOffset = minCountIndex * windowOffsetsX;
	const x = windowDefaultLeft + xOffset + availableLeft;
	const yOffset = minCountIndex * windowOffsetsY;
	const y = windowDefaultTop + yOffset + availableTop;

	return { left: x, top: y };
}

/**
 * Get a list of all the visible windows in the platform.
 * @returns The list of visible windows.
 */
export async function getAllVisibleWindows(): Promise<OpenFin.Window[]> {
	const platform = fin.Platform.getCurrentSync();
	const windows = await platform.Application.getChildWindows();
	const availableWindows: OpenFin.Window[] = [];
	for (const currentWindow of windows) {
		try {
			const isShowing = await currentWindow.isShowing();
			if (isShowing) {
				availableWindows.push(currentWindow);
			}
		} catch {
			// if the window is destroyed before determining if it is showing then
			// we should move to the next window but not throw.
		}
	}
	return availableWindows;
}
