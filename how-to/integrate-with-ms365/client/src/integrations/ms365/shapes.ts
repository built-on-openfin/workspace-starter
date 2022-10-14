export interface Microsoft365Settings {
	clientId: string;
	tenantId: string;
	redirectUri: string;
	images: {
		teamsLogo: string;
		email: string;
		calendar: string;
		share: string;
		chat: string;
		call: string;
		contact: string;
	};
}
