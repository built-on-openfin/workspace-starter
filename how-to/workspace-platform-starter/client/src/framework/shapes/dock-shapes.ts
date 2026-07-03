import type { DockProviderConfigWithIdentity } from "@openfin/workspace";
import type { DockAllowedWindowOptions, Dock3Config } from "@openfin/workspace-platform";
import type { PopupMenuStyles } from "./menu-shapes";

/**
 * Options for the dock provider.
 */
export interface DockProviderOptions {
	/**
	 * The id to use when registering against the dock component
	 */
	id: string;

	/**
	 * The title for your dock registration
	 */
	title: string;

	/**
	 * The icon to show in the dock component
	 */
	icon: string;

	/**
	 * Which workspace related icons should be hidden from the dock
	 */
	workspaceComponents?: {
		hideHomeButton?: boolean;
		hideWorkspacesButton?: boolean;
		hideNotificationsButton?: boolean;
		hideStorefrontButton?: boolean;
		/**
		 * Hides the content menu button. Only applicable when `dockType` is "3", the v1 dock has no
		 * equivalent button and this setting is ignored.
		 */
		hideContentButton?: boolean;
	};

	/**
	 * Disallow rearrangement of dock icons by setting this flag.
	 */
	disableUserRearrangement?: boolean;

	/**
	 * What apps, actions or drop downs should be made available via the dock.
	 */
	entries?: DockButtonTypes[];

	/**
	 * Configured a default for the popup menu style, defaults to platform.
	 */
	popupMenuStyle?: PopupMenuStyles;

	/**
	 * The type of the dock to target. The v1 version is the original dock that is provided as part of the @openfin/workspace package. The v3 version is the latest version of the dock and is platform specific and registered through @openfin/workspace-platform.
	 * The v3 dock can also be self-hosted. The default is 1.
	 */
	dockType?: "1" | "3";

	/**
	 * If using dock type 3 this allows you to specify additional options for the dock window.
	 */
	dock3WindowOptions?: DockAllowedWindowOptions;

	/**
	 * UI Configuration Options supported by Dock 3.0
	 */
	dock3UIConfig?: Dock3Config["uiConfig"];
}

/**
 * Shared properties for dock buttons.
 */
export interface DockButtonBase {
	/**
	 * The id for the dock entry.
	 */
	id: string;

	/**
	 * Is the dock entry visible.
	 */
	visible?: boolean;

	/**
	 * The tooltip to be shown for this button/entry
	 */
	tooltip?: string;

	/**
	 * The icon to use to distinguish this entry from others
	 */
	iconUrl?: string;

	/**
	 * Condition to determine if the item should be shown.
	 */
	conditions?: string[];
}

/**
 * A single app or a list of apps that are defined by the tags in the app definitions.
 */
export interface DockButtonAppsByTag extends DockButtonBase {
	/**
	 * Should this entry show a single app or a group of apps.
	 */
	display: "individual" | "group";

	/**
	 * The tags to use to find the single app or a collection of apps that need to be listed. This will be compared
	 * against the tags associated with apps returned from the app data sources.
	 */
	tags?: string[];

	/**
	 * Text to display if there are no entries because there are no tagged apps.
	 */
	noEntries?: string;
}

/**
 * A button which launches an app by it's id.
 */
export interface DockButtonApp extends DockButtonBase {
	/**
	 * Launch an app by it's id.
	 */
	appId: string;
}

/**
 * A button which launches an app by it's custom action.
 */
export interface DockButtonAction extends DockButtonBase {
	/**
	 * Launch an action.
	 */
	action: {
		/**
		 * The id of the action to fire
		 */
		id: string;
		/**
		 * data that should be passed to the action
		 */
		customData?: unknown;
	};
}

/**
 * Button type which shows a drop down.
 */
export interface DockButtonDropdown extends DockButtonBase {
	/**
	 * List of button options
	 */
	options: (
		| Omit<DockButtonAppsByTag, "id">
		| Omit<DockButtonApp, "id">
		| Omit<DockButtonAction, "id">
		| Omit<DockButtonDropdown, "id">
	)[];

	/**
	 * Text to display if there are no entries because conditions have excluded options.
	 */
	noEntries?: string;
}

/**
 * All of the button types for the dock.
 */
export type DockButtonTypes = DockButtonAppsByTag | DockButtonApp | DockButtonAction | DockButtonDropdown;

/**
 * Exposes some dock api methods through helpers.
 */
export interface DockClient {
	/**
	 * Implementation for getting the dock provider from persistent storage.
	 * @param id The id of the dock provider to get.
	 * @param defaultStorage The default method for storage.
	 * @returns The loaded config.
	 */
	loadConfig(
		id: string,
		defaultStorage: (id: string) => Promise<DockProviderConfigWithIdentity | undefined>
	): Promise<DockProviderConfigWithIdentity | undefined>;
	/**
	 * Implementation for saving a dock provider config to persistent storage.
	 * @param config The new dock config to save to persistent storage.
	 * @param defaultStorage The default method for storage.
	 * @returns nothing
	 */
	saveConfig(
		config: DockProviderConfigWithIdentity,
		defaultStorage: (config: DockProviderConfigWithIdentity) => Promise<void>
	): Promise<void>;
}
