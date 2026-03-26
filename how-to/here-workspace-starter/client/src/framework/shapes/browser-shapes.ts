import type { ToolbarButton } from "@openfin/workspace-platform";

/**
 * ENTERPRISE OVERRIDES IGNORE MOST OF THESE
 * Browser Provider Options includes the default window/page and view options.
 */
// TODO:/ ANY FOR NOW, need to rework the browser window creation stuff ENTIRELY
export type BrowserProviderOptions = any;
/**
 * Options for window positioning.
 */
export interface WindowPositioningOptions {
	/**
	 * The strategy for window positioning.
	 */
	windowPositioningStrategy?: CascadingWindowOffsetStrategy;

	/**
	 * By default we implement a Window Positioning Strategy that will try and position launched windows with an
	 * offset. The way the windows are offset can be configured by specifying windowPositioningStrategy.
	 * If you want to turn this off (e.g. automation tests that do not care about the layout of windows) then you
	 * can set this value to true.
	 */
	disableWindowPositioningStrategy?: boolean;

	/**
	 * The default position for new windows.
	 */
	defaults?: {
		top?: number;
		left?: number;
	};
}

/**
 * The cascading window strategy for positioning new windows.
 */
export interface CascadingWindowOffsetStrategy {
	/**
	 * The x offset to increment by for each new window, defaults to 30.
	 */
	x?: number;

	/**
	 * The y offset to increment by for each new window, defaults to 30.
	 */
	y?: number;

	/**
	 * The maximum number increment, before resetting to start, defaults to 8.
	 */
	maxIncrements?: number;
}

/**
 * Toolbar button with can be visibility options.
 */
export interface WorkspacePlatformToolbarButton {
	/**
	 * A unique id for your button
	 */
	id: string;

	/**
	 * Should this definition be included in the list of buttons
	 */
	include: boolean;

	/**
	 * Details about the button itself
	 */
	button: ToolbarButton;

	/**
	 * If the button is included should there be conditions related to whether or not it is shown (e.g. authenticated)
	 */
	conditions?: string[];
}

/**
 * The behavior you wish to have when a page is closed and there are unsaved changes.
 * - default: Show a modal asking the user if they want to save changes.
 * - skip-untitled: Skip the modal if the page is untitled.
 * - never: Never show the modal.
 */
export type UnsavedPagePromptStrategy = "default" | "skip-untitled" | "never";

/**
 * The strategy for bringing a window to the front.
 */
export type BringToFrontStrategy = "setAsForeground" | "bringToFront" | "bringToFrontAndFocus";
