import type { OpenFin } from "@openfin/core";
import type { BrowserProviderOptions, WindowPositioningOptions } from "./browser-shapes";

/**
 * A utility object that provides common utility functions.
 */
interface Utils {
	/**
	 * Test if a value is a undefined or null.
	 * @param value The value to test.
	 * @returns True if the value is null or undefined.
	 */
	isEmpty(value: unknown): boolean;
	/**
	 * Test if a value is an object.
	 * @param value The value to test.
	 * @returns True if the value is an object.
	 */
	isObject(value: unknown): boolean;
	/**
	 * Test if a value is a string.
	 * @param value The value to test.
	 * @returns True if the value is a string.
	 */
	isString(value: unknown): boolean;
	/**
	 * Test if a value is a string that is not empty.
	 * @param value The value to test.
	 * @returns True if the value is a string that is not empty.
	 */
	isStringValue(value: unknown): boolean;
	/**
	 * Test if a value is a number.
	 * @param value The value to test.
	 * @returns True if the value is a number.
	 */
	isNumber(value: unknown): boolean;
	/**
	 * Test if a value is a number with a real value i.e. not NaN or Infinite.
	 * @param value The value to test.
	 * @returns True if the value is a number.
	 */
	isNumberValue(value: unknown): value is number;
	/**
	 * Test if a value is a boolean.
	 * @param value The value to test.
	 * @returns True if the value is a boolean.
	 */
	isBoolean(value: unknown): value is boolean;
	/**
	 * Test if a value is an integer.
	 * @param value The value to test.
	 * @returns True if the value is an integer.
	 */
	isInteger(value: unknown): value is number;
	/**
	 * Deep clone an object.
	 * @param obj The object to clone.
	 * @returns The clone of the object.
	 */
	objectClone<T>(obj: T): T;
	/**
	 * Do a deep comparison of the objects.
	 * @param obj1 The first object to compare.
	 * @param obj2 The second object to compare.
	 * @param matchPropertyOrder If true the properties must be in the same order.
	 * @returns True if the objects are the same.
	 */
	deepEqual(obj1: unknown, obj2: unknown, matchPropertyOrder?: boolean): boolean;
	/**
	 * Deep merge two objects.
	 * @param target The object to be merged into.
	 * @param sources The objects to merge into the target.
	 * @returns The merged object.
	 */
	deepMerge<T = unknown>(target: T, ...sources: T[]): T;
	/**
	 * Polyfills randomUUID if running in a non-secure context.
	 * @returns The random UUID.
	 */
	randomUUID(): string;
	/**
	 * Format an error to a readable string.
	 * @param err The error to format.
	 * @returns The formatted error.
	 */
	formatError(err: unknown): string;
	/**
	 * A basic string sanitize function that removes angle brackets <> from a string.
	 * @param content the content to sanitize
	 * @returns a string without angle brackets <>
	 */
	sanitizeString(content: unknown): string;
	/**
	 * Get the command line arguments from a command line string.
	 * Examples of command line strings: arg1 key1=value1 key2="value with spaces" key3='value3' key4='value with more spaces'`.
	 * @param commandLine The command line string.
	 * @returns The command line arguments or an empty array if none
	 */
	getCommandLineArgs(commandLine: string): string[];
}

/**
 * Utility functions for working with positioning of windows.
 */
interface UtilsPosition {
	/**
	 * Provides x and y co-ordinates to position a window of a given size in relation to another window/view.
	 * @param clientIdentity The identity of the view/window these x/y co-ordinates should be in relation to.
	 * @param dimensions The dimensions of the window that will be placed in the center of the screen.
	 * @param dimensions.width The width of the window that is going to be placed.
	 * @param dimensions.height The height of the window that is going to be placed.
	 * @returns The x, y co-ordinates to position the window
	 */
	centerContentInIdentity(
		clientIdentity: OpenFin.Identity,
		dimensions: { width: number; height: number }
	): Promise<{ x: number; y: number } | undefined>;
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
	centerContentInRect(
		availableRect: { left: number; top: number; right: number; bottom: number },
		contentDimensions: { width: number; height: number }
	): { x: number; y: number };
	/**
	 * Returns the monitor details for the monitor a view/window is placed on.
	 * @param clientIdentity The identity of the view/window to check against.
	 * @returns The monitor the view/window lives on or undefined if no match was found.
	 */
	getIdentityBounds(clientIdentity: OpenFin.Identity): Promise<OpenFin.Bounds | undefined>;
	/**
	 * Find the monitor which contains the point and returns it.
	 * @param point The point coord to locate.
	 * @param point.x The x coord
	 * @param point.y The y coord
	 * @returns The monitor containing the point.
	 */
	findMonitorContainingPoint(point: { x?: number; y?: number }): Promise<OpenFin.MonitorDetails>;
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
	pointInRect(
		point: { x: number; y: number },
		rect: { top: number; left: number; bottom: number; right: number }
	): boolean;
	/**
	 * Get the center for a bounding rectangle.
	 * @param bounds The rect
	 * @param bounds.top The rect top
	 * @param bounds.left The rect left
	 * @param bounds.width The rect width
	 * @param bounds.height The rect height
	 * @returns the x and y of the bounds center or an object not containing x or y.
	 */
	getBoundsCenter(bounds?: OpenFin.Bounds): { x?: number; y?: number };
	/**
	 * Given browser settings what window positioning options should be used?
	 * @param settings The browser settings that have been provided.
	 * @returns a set of window positioning options.
	 */
	getWindowPositionOptions(settings?: BrowserProviderOptions): Promise<WindowPositioningOptions>;
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
	getWindowPositionUsingStrategy(
		windowPositioningOptions?: WindowPositioningOptions,
		relatedTo?: OpenFin.MonitorDetails | OpenFin.Identity | { x: number; y: number }
	): Promise<{ left: number; top: number } | undefined>;
}

/**
 * Gets a collection of utility functions.
 */
export interface UtilClient {
	/**
	 * General utility functions.
	 */
	general: Utils;

	/**
	 * Utility functions for working with positioning of windows.
	 */
	position: UtilsPosition;
}
