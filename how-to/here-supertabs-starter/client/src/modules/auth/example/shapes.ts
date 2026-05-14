/**
 * Options for example auth provider.
 */
export interface ExampleOptions {
	/**
	 * Auto login the provider.
	 */
	autoLogin?: boolean;

	/**
	 * The url to check for authenticated status.
	 */
	authenticatedUrl: string;

	/**
	 * The url to open for login.
	 */
	loginUrl: string;

	/**
	 * The url to open for logout.
	 */
	logoutUrl: string;

	/**
	 * The height of the login window.
	 */
	loginHeight?: number;

	/**
	 * The width of the lowing window.
	 */
	loginWidth?: number;

	/**
	 * The interval to use for checking login status.
	 */
	checkLoginStatusInSeconds?: number;

	/**
	 * The interval to use for checking validity status.
	 */
	checkSessionValidityInSeconds?: number;

	/**
	 * Custom data.
	 */
	customData?: {
		users?: ExampleUser[];
	};
}

/**
 * Example user data.
 */
export interface ExampleUser {
	/**
	 * User name.
	 */
	name: string;

	/**
	 * User email.
	 */
	email: string;

	/**
	 * User role.
	 */
	role: string;
}

/**
 * Endpoint options for authentication.
 */
export interface ExampleEndpointOptions {
	/**
	 * Role mapping data.
	 */
	roleMapping: { [key: string]: ExampleUserRoleMapping };
}

/**
 * Config for role mapping.
 */
export interface ExampleUserRoleMapping {
	/**
	 * Exclude apps for role.
	 */
	excludeAppsWithTag: string[];

	/**
	 * Preferred color scheme.
	 */
	preferredScheme: string;

	/**
	 * Exclude menu actions.
	 */
	excludeMenuAction: string[];

	/**
	 * Exclude menu modules.
	 */
	excludeMenuModule: string[];
}

/**
 * Application with tags or categories.
 */
export type AppWithTagsOrCategories = { [id: string]: unknown } & { categories?: []; tags?: [] };
