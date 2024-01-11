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
