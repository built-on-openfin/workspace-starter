export interface Microsoft365Settings {
	clientId: string;
	tenantId: string;
	redirectUri: string;
	enableLibLogging: boolean;
	disableGraphExplorer: boolean;
	images: {
		teams: string;
		outlook: string;
		email: string;
		calendar: string;
		share: string;
		chat: string;
		call: string;
		contact: string;
	};
}

export type Microsoft365ObjectTypes = "User" | "Contact" | "Message" | "Event";
