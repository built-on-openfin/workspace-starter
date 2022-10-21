import type { Entity } from "@microsoft/microsoft-graph-types";

export interface Microsoft365Settings {
	clientId: string;
	tenantId: string;
	redirectUri: string;
	enableLibLogging: boolean;
	disableGraphExplorer: boolean;
	images: {
		microsoft365: string;
		teams: string;
		outlook: string;
		email: string;
		calendar: string;
		share: string;
		chat: string;
		call: string;
		contact: string;
		team: string;
		channel: string;
	};
}

export type Microsoft365ObjectTypes = "User" | "Contact" | "Message" | "Event" | "Team" | "Channel";

export interface ActionData {
	providerId: string;
	name?: string;
	emails?: string[];
	phone?: string;
	url?: string;
	urls?: { [id: string]: string };
	teamId?: string;
	channelId?: string;
	json?: unknown;
}

export interface ActionLoadingData {
	providerId: string;
	objType: string;
	obj: Entity;
	state: string;
}
