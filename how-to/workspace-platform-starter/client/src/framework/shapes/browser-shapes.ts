import type {
	BrowserInitConfig,
	GlobalContextMenuOptionType,
	PageTabContextMenuOptionType,
	ToolbarButton,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import type { MenuEntry, PopupMenuStyles } from "./menu-shapes";

/**
 * Browser Provider Options includes the default window/page and view options.
 */
export type BrowserProviderOptions = Pick<
	BrowserInitConfig,
	"defaultWindowOptions" | "defaultPageOptions" | "defaultViewOptions" | "title"
> & {
	/**
	 * This setting lets you override the default workspace browser buttons and specify your own.
	 */
	toolbarButtons?: WorkspacePlatformToolbarButton[];

	/**
	 * This setting lets you customize the default workspace browser main menu and specify your own.
	 */
	globalMenu?: MenuEntry<GlobalContextMenuOptionType>[];

	/**
	 * This setting lets you customize the page right click context menu and add your own entries.
	 */
	pageMenu?: MenuEntry<PageTabContextMenuOptionType>[];

	/**
	 * This setting lets you customize the view right click context menu and add your own entries.
	 */
	viewMenu?: MenuEntry<ViewTabMenuOptionType>[];

	/**
	 * This setting lets you configure options related to the menus shown in the browser.
	 */
	menuOptions?: {
		/**
		 * Should the workspace default options be included or do you want to be specific about what should show in the
		 * menu.
		 */
		includeDefaults?: {
			/**
			 * Should we include all the default options for the global menu? Default is true.
			 */
			globalMenu?: boolean;

			/**
			 * Should we include all the default options for the page menu? Default is true.
			 */
			pageMenu?: boolean;

			/**
			 * Should we include all the default options for the view menu? Default is true.
			 */
			viewMenu?: boolean;
		};

		/**
		 * Style the menus, if no options are provided it will use the build in version.
		 */
		styles?: {
			/**
			 * Override the style for the global menu (top left icon)
			 */
			globalMenu?: PopupMenuStyles;
			/**
			 * Override the style for the page menu (right click on page tab)
			 */
			pageMenu?: PopupMenuStyles;
			/**
			 * Override the style for the view menu (right click on view tab)
			 */
			viewMenu?: PopupMenuStyles;
		};
	};

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
	 * Some options for whether or not a closing page will prompt the user to save unsaved changes.
	 */
	unsavedPagePromptStrategy?: UnsavedPagePromptStrategy;
};

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
