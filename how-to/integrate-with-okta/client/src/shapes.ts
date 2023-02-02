/* eslint-disable linebreak-style */
export interface OktaSettings {
	domain: string;
	clientId: string;
	loginUrl: string;
	logoutUrls: string;
	appUrl: string;
	redirectUrl: string;
	verifyPollMs?: number;
}

export interface OktaIdentitySettings {
	accessToken: string;
	userId: string;
	userName: string;
	displayName: string;
}

export interface CustomSettings {
	okta?: OktaSettings;
}
