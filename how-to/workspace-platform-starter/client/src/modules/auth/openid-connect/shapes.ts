/**
 * Options for the openid connect auth provider.
 */
export interface OpenIdConnectProviderOptions {
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

	/**
	 * Scopes to request from the auth provider.
	 */
	scopes?: string[];

	/**
	 * Enable logging for the package.
	 */
	enableLogging?: boolean;

	/**
	 * The interval between polling for valid session.
	 */
	checkSessionValidityInSeconds?: number;
}
