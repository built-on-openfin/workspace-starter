export interface ExampleUser {
	name: string;
	email: string;
	role: string;
}

export interface ExampleOptions {
	autoLogin: boolean;
	authenticatedUrl: string;
	loginUrl: string;
	logoutUrl: string;
	loginHeight: number;
	loginWidth: number;
	checkLoginStatusInSeconds: number;
	checkSessionValidityInSeconds: number;
	customData?: {
		userSessionId?: string;
		users?: ExampleUser[];
	};
}

export interface ExampleEndpointOptions {
	userSessionId?: string;
	roleMapping: { [key: string]: ExampleUserRoleMapping };
}

export interface ExampleUserRoleMapping {
	excludeAppsWithTag: string[];
	preferredScheme: string;
	excludeMenuAction: string[];
}
