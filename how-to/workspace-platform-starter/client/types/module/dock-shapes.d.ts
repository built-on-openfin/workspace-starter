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
	 * What apps should be made available via the dock
	 */
	apps?: DockButtonApp[];
	/**
	 * What custom actions should be made available via the dock
	 */
	buttons?: (DockButtonAction | DockButtonDropdown)[];
}
/**
 * Shared properties for dock buttons.
 */
export interface DockButtonBase {
	/**
	 * The tooltip to be shown for this button/entry
	 */
	tooltip?: string;
	/**
	 * The icon to use to distinguish this entry from others
	 */
	iconUrl?: string;
}
/**
 * A single app or a list of apps
 */
export interface DockButtonApp extends DockButtonBase {
	/**
	 * Should this entry show a single app or a group of apps.
	 */
	display: "individual" | "group";
	/**
	 * The tags to use to find the single app or a collection of apps that need to be listed. This will be compared
	 * against the tags associated with apps returned from the app data sources.
	 */
	tags?: string[];
}
/**
 * A button which launched an app or action.
 */
export interface DockButtonAction extends DockButtonBase {
	/**
	 * Should this action launch a specific app (the icon and tooltip will be pulled from the app if possible)
	 */
	appId?: string;
	/**
	 * If an appId isn't provided then provide details related to the action
	 */
	action?: {
		/**
		 * The id of the action to fire
		 */
		id: string;
		/**
		 * data that should be passed to the action
		 */
		customData: unknown;
	};
}
/**
 * Button type which shows a drop down.
 */
export interface DockButtonDropdown extends DockButtonBase {
	/**
	 * List of button options
	 */
	options: Omit<DockButtonAction, "iconUrl">[];
}
