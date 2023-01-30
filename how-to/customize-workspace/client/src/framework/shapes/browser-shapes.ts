import type {
	BrowserButtonType,
	CustomBrowserButtonConfig,
	GlobalContextMenuOptionType,
	PageTabContextMenuOptionType,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import type { MenuEntry } from "./menu-shapes";

interface PreDefinedButtonConfig {
	/** Type of default browser button */
	type: BrowserButtonType;
	/** Button name text when hovered over */
	tooltip?: string;
	/** icon URL for icon image */
	iconUrl?: string;
	/** should this button be disabled so that it is visible but can't be selected */
	disabled?: boolean;
}

type ToolbarButton = CustomBrowserButtonConfig | PreDefinedButtonConfig;

export interface ToolbarButtonDefinition {
	/** A unique id for your button */
	id: string;
	/** Should this definition be included in the list of buttons */
	include: boolean;
	/** Details about the button itself */
	button: ToolbarButton;
	/** If the button is included should there be conditions related to whether or not it is shown (e.g. authenticated) */
	conditions?: string[];
}

/**
 * Browser Provider Options
 */
export interface BrowserProviderOptions {
	/**
	 * Window Options that will apply to all workspace browser windows
	 * */
	windowOptions: {
		/**
		 * The title that will show for every browser window
		 * */
		title?: string;
		/**
		 * The icon to show for every browser window (specify something that will be supported on the taskbar as well)
		 * */
		icon?: string;
		/**
		 * Not specifying this setting means a + sign will not appear alongside view tabs inside a page.
		 * If you specify a url then the + sign will show and when selected it will load a view with that
		 * url into the layout.
		 * */
		newTabUrl?: string;
		/**
		 * Not specifying this setting means a + sign will not appear alongside page tabs inside a window.
		 * If you specify a url then the + sign will show and when selected it will add a new page to the window
		 * and the page will load a single view with this url.
		 * */
		newPageUrl?: string;
	};
	/**
	 * This setting lets you override the default workspace browser buttons and specify your own.
	 * */
	toolbarButtons?: ToolbarButtonDefinition[];
	/**
	 * This setting lets you customize the default workspace browser main menu and specify your own.
	 * */
	globalMenu?: MenuEntry<GlobalContextMenuOptionType>[];
	/**
	 * This setting lets you customize the page right click context menu and add your own entries.
	 * */
	pageMenu?: MenuEntry<PageTabContextMenuOptionType>[];
	/**
	 * This setting lets you customize the view right click context menu and add your own entries.
	 * */
	viewMenu?: MenuEntry<ViewTabMenuOptionType>[];
}
