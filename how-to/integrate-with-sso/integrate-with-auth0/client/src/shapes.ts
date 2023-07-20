/**
 * Definition for the custom settings in manifest.fin.json
 */
export interface CustomSettings {
	/**
	 * The settings for authentication.
	 */
	auth?: Auth0Settings;
}

/**
 * The auth settings.
 */
export interface Auth0Settings {
	/**
	 * Domain to use for Auth0 authentication.
	 */
	domain: string;
	/**
	 * ClientId to use for Auth0 authentication.
	 */
	clientId: string;
	/**
	 * The login url to display on modal.
	 */
	loginUrl: string;
	/**
	 * The logout urls to monitor for when logging out.
	 */
	logoutUrls: string[];
	/**
	 * The url of the application to launch on auth success.
	 */
	appUrl: string;
	/**
	 * How often to poll to check for valid token.
	 */
	verifyPollMs?: number;
}
