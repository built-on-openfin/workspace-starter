import type OpenFin from "@openfin/core";
import type { ManifestTypeId } from "./app-shapes";
export type ConnectionTypes =
	| AppSourceConnection
	| SnapshotSourceConnection
	| ActionConnection
	| BrokerConnection;
export interface ConnectionValidationOptions<T> extends BaseConnection {
	details?: T;
}
export interface ConnectionValidationResponse {
	isValid: boolean;
	details?: {
		[key: string]: boolean;
	};
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
	/** The type of connection capabilities allocated to this connection */
	type: "appSource" | "snapshotSource" | "actions" | "broker";
}
export interface AppSourceConnection extends BaseConnection {
	/** If a connection is allowed to provide apps do you wish to limit the manifest types they can provide you with. The connection type must be supported if it is an app entry where the selection should go back to the connection. */
	manifestTypes?: ManifestTypeId[];
	/** The appSource connection type allows connections to provide a list of apps that can show up in home and the store. Apps with manifest type id connection will be send back to the connection on selection (e.g. a child view) */
	type: "appSource";
}
export interface ActionConnection extends BaseConnection {
	/** If you want to provide a different set of available actions to a specific connection then you can do so here */
	supportedActions?: string[];
	/** The actions connection type allows connections to execute a list of actions that the platform will carry out e.g. show-home */
	type: "actions";
}
export interface SnapshotSourceConnection extends BaseConnection {
	/** The snapshotSource connection type allows connections to be accepted as a snapshot source */
	type: "snapshotSource";
}
export interface BrokerConnection extends BaseConnection {
	/** The broker connection type allows connections to connect to our broker in order to react to context sharing */
	type: "broker";
}
export interface Connection {
	/** The identity uuid of the incoming connection or * as a wildcard. We currently do not restrict down to the name level so it can be blank or omitted.  */
	identity: OpenFin.Identity;
	/** Should we check the payload be validated for this connection when it connects */
	validatePayload?: boolean;
	/** An array of the connection types this connection will be permitted to use */
	connectionTypes: ConnectionTypes[];
}
export interface ConnectionProviderOptions {
	/** The channel id that external apps will use to connect to this platform (it will be prefixed with your platform's uuid e.g. your-uuid-connection-id) */
	connectionId: string;
	/**
	 * If you want to validate the payload passed by connecting apps you can
	 * specify the endpoint id that should receive the payload and return whether
	 * or not it is valid.
	 * */
	connectionValidationEndpoint?: string;
	/**
	 * The connection provider can have actions registered against it from the platform.
	 * This provides a default list of actions that connections should be able to use if
	 * actions are enabled for that connection.
	 * */
	supportedActions: string[];
	/** An array of connections that this platform allows being connected from.
	 * By specifying * as the uuid you can allow any connection and give it certain
	 * capabilities. You can then specify specific uuids with more capabilities. */
	connections: Connection[];
}
