export interface AuthSettings {
	loginUrl: string;
	logoutUrl: string;
	appUrl: string;
}

export interface CustomSettings {
	auth?: AuthSettings;
}
