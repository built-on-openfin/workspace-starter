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

export type Microsoft365ObjectTypes =
	| "User"
	| "Contact"
	| "Message"
	| "Event"
	| "Team"
	| "Channel"
	| "ChatMessage";

export interface ActionData {
	providerId: string;
	name?: string;
	emails?: string[];
	phone?: string;
	url?: string;
	urls?: { [id: string]: string };
	teamId?: string;
	channelId?: string;
	chatId?: string;
	messageId?: string;
	json?: unknown;
}

export interface ActionLoadingData {
	providerId: string;
	objType: string;
	obj: Entity;
	state: string;
}

export interface GraphListResponse<T> {
	value?: T[];
}

export type GraphMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface GraphBatchRequest {
	id: string;
	url: string;
	method: GraphMethod;
	body?: unknown;
	headers?: { [id: string]: string };
}

export interface GraphBatchResponse<T = unknown> {
	responses: GraphBatchResponseItem<T>[];
}

export interface GraphBatchResponseItem<T = unknown> {
	body: T;
	headers: { [id: string]: string };
	id: string;
	status: number;
}
