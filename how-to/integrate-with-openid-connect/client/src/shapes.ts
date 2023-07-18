/**
 * Definition for the custom settings in manifest.fin.json
 */
export interface CustomSettings {
	/**
	 * The settings for authentication.
	 */
	auth?: OpenIdConnectSettings;

	/**
	 * The url of the application window to launch on auth success.
	 */
	appWindowUrl?: string;

	/**
	 * The url of the application manifest to launch on auth success.
	 */
	appManifestUrl?: string;
}

/**
 * The setting to configure OpenId Connect.
 */
export interface OpenIdConnectSettings {
	/**
	 * The provider url for authentication.
	 */
	providerUrl: string;

	/**
	 * ClientId to use for authentication.
	 */
	clientId: string;

	/**
	 * The login url to display on redirect.
	 */
	loginRedirectUrl: string;

	/**
	 * The logout url to display on redirect.
	 */
	logoutRedirectUrl: string;
}
