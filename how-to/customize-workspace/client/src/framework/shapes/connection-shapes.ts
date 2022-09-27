export type ConnectionTypes = AppSourceConnection | SnapshotSourceConnection | ActionConnection;

export interface ConnectionValidationOptions<T> extends BaseConnection {
	details?: T;
}

export interface ConnectionValidationResponse {
	isValid: boolean;
	details?: { [key: string]: boolean };
}

export interface ConnectionPayloadVerificationRequest<T> {
	identity: OpenFin.Identity;
	payload: unknown;
	options?: ConnectionValidationOptions<T>;
}

export interface ConnectionPayloadVerificationResponse {
	isValid: boolean;
}

export interface BaseConnection {
	type: "appSource" | "snapshotSource" | "actions" | "broker";
}

export interface AppSourceConnection extends BaseConnection {
	manifestTypes?: string[];
	type: "appSource";
}

export interface ActionConnection extends BaseConnection {
	supportedActions?: string[];
	type: "actions";
}

export interface BrokerConnection extends BaseConnection {
	type: "broker";
}

export interface SnapshotSourceConnection extends BaseConnection {
	type: "snapshotSource";
}

export interface Connection {
	identity: OpenFin.Identity;
	validatePayload?: boolean;
	connectionTypes: ConnectionTypes[];
}

export interface ConnectionProviderOptions {
	connectionId: string;
	connectionValidationEndpoint: string;
	supportedActions: string[];
	connections: Connection[];
}
