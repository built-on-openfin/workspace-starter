import type {
	BrowserButtonType,
	BrowserInitConfig,
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
export type BrowserProviderOptions = Pick<
	BrowserInitConfig,
	"defaultWindowOptions" | "defaultPageOptions" | "defaultViewOptions"
> & {
	/**
	 * deprecated use `defaultWindowOptions` instead to specify settings that will apply to all workspace browser windows
	 * @deprecated use `defaultWindowOptions` instead.
	 * */
	windowOptions?: {
		/**
		 * deprecated use `defaultWindowOptions.workspacePlatform.title` instead.
		 * @deprecated use `defaultWindowOptions.workspacePlatform.title` instead.
		 * */
		title?: string;
		/**
		 * deprecated use `defaultWindowOptions.icon` instead.
		 * @deprecated use `defaultWindowOptions.icon` instead.
		 * */
		icon?: string;
		/**
		 * deprecated use `defaultWindowOptions.workspacePlatform.newTabUrl` instead.
		 * @deprecated use `defaultWindowOptions.workspacePlatform.newTabUrl` instead.
		 * */
		newTabUrl?: string;
		/**
		 * deprecated use `defaultWindowOptions.workspacePlatform.newPageUrl` instead.
		 * @deprecated use `defaultWindowOptions.workspacePlatform.newPageUrl` instead.
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
	/**
	 * This setting lets you configure options related to the menus shown in the browser.
	 * */
	menuOptions?: {
		/**
		 * Should the workspace default options be included or do you want to be specific about what should show in the menu.
		 * */
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
	};
	/**
	 * The strategy for window positioning.
	 */
	windowPositioningStrategy?: CascadingWindowOffsetStrategy;
};
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
export {};
