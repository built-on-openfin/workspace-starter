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
	 * The PKCE code verifier.
	 * cryptographically random string using the chars A-Z, a-z, 0-9 and the punctuation chars hyphen, period, underscore and tilde.
	 * see https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics
	 */
	pkceCodeVerifier: string;
	/**
	 * The PKCE code challenge.
	 * should be a calculated value of Base64-URL-encoded SHA256 hash of pkceCodeVerifier.
	 * see https://developer.okta.com/docs/guides/implement-grant-type/authcodepkce/main/#flow-specifics
	 */
	pkceCodeChallenge: string;
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
