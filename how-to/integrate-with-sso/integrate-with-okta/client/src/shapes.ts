/**
 * Definition for the custom settings in manifest.fin.json
 */
export interface CustomSettings {
	/**
	 * The settings for authentication.
	 */
	auth?: OktaSettings;
}

/**
 * The setting to configure okta.
 */
export interface OktaSettings {
	/**
	 * The domain for communicating with okta.
	 */
	domain: string;
	/**
	 * ClientId to use for Okta authentication.
	 */
	clientId: string;
	/**
	 * The login url to display on modal.
	 */
	loginUrl: string;
	/**
	 * The url to use when logging out.
	 */
	logoutUrl: string;
	/**
	 * The url of the application to launch on auth success.
	 */
	appUrl: string;
	/**
	 * How often to poll to check for valid token.
	 */
	verifyPollMs?: number;
}
