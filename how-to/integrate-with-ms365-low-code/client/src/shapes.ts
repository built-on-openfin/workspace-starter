/**
 * Custom settings for the application.
 */
export interface CustomSettings {
	/**
	 * The settings for ms365.
	 */
	ms365?: Microsoft365Settings;
}

/**
 * Settings for the MS365 integration.
 */
export interface Microsoft365Settings {
	/**
	 * The client id for the MS365 connection.
	 */
	clientId: string;
	/**
	 * The tenant id for the MS365 connection.
	 */
	tenantId: string;
	/**
	 * The redirect url to detect when the user has logged in.
	 */
	redirectUri: string;
}
