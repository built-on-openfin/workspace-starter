import type OpenFin from "@openfin/core";
import type { ManifestTypeId } from "./app-shapes";
/**
 * Options for the connection provider.
 */
export interface ConnectionProviderOptions {
	/**
	 * The channel id that external apps will use to connect to this platform (it will be prefixed with your platform's
	 * uuid e.g. your-uuid-connection-id)
	 */
	connectionId: string;
	/**
	 * If you want to validate the payload passed by connecting apps you can specify the endpoint id that should receive
	 * the payload and return whether or not it is valid.
	 */
	connectionValidationEndpoint?: string;
	/**
	 * The connection provider can have actions registered against it from the platform. This provides a default list of
	 * actions that connections should be able to use if actions are enabled for that connection.
	 */
	supportedActions: string[];
	/**
	 * An array of connections that this platform allows being connected from. By specifying * as the uuid you can allow
	 * any connection and give it certain capabilities. You can then specify specific uuids with more capabilities.
	 */
	connections: Connection[];
}
/**
 * The connection details.
 */
export interface Connection {
	/**
	 * The identity uuid of the incoming connection or * as a wildcard. We currently do not restrict down to the name
	 * level so it can be blank or omitted.
	 */
	identity: OpenFin.Identity;
	/**
	 * Should we check the payload be validated for this connection when it connects.
	 */
	validatePayload?: boolean;
	/**
	 * An array of the connection types this connection will be permitted to use.
	 */
	connectionTypes: ConnectionTypes[];
}
/**
 * Names for all the connection types.
 */
type ConnectionTypeNames = "appSource" | "snapshotSource" | "actions" | "broker";
/**
 * The base connection type.
 */
export interface BaseConnection {
	/**
	 * The type of connection capabilities allocated to this connection.
	 */
	type: ConnectionTypeNames;
}
/**
 * Specific type for an app source connection.
 */
export interface AppSourceConnection extends BaseConnection {
	/**
	 * The appSource connection type allows connections to provide a list of apps that can show up in home and the
	 * store. Apps with manifest type id connection will be send back to the connection on selection (e.g. a child view)
	 */
	type: "appSource";
	/**
	 * If a connection is allowed to provide apps do you wish to limit the manifest types they can provide you with. The
	 * connection type must be supported if it is an app entry where the selection should go back to the connection.
	 */
	manifestTypes?: ManifestTypeId[];
}
/**
 * Specific type for an action connection.
 */
export interface ActionConnection extends BaseConnection {
	/**
	 * The actions connection type allows connections to execute a list of actions that the platform will carry out e.g.
	 * show-home
	 */
	type: "actions";
	/**
	 * If you want to provide a different set of available actions to a specific connection then you can do so here.
	 */
	supportedActions?: string[];
}
/**
 * Specific type for a snapshot source connection.
 */
export interface SnapshotSourceConnection extends BaseConnection {
	/**
	 * The snapshotSource connection type allows connections to be accepted as a snapshot source
	 */
	type: "snapshotSource";
}
/**
 * Specific type for a broker connection.
 */
export interface BrokerConnection extends BaseConnection {
	/**
	 * The broker connection type allows connections to connect to our broker in order to react to context sharing.
	 */
	type: "broker";
}
/**
 * All the types of connections.
 */
export type ConnectionTypes =
	| AppSourceConnection
	| SnapshotSourceConnection
	| ActionConnection
	| BrokerConnection;
/**
 * Validation options for a connection.
 */
export interface ConnectionValidationOptions<T> {
	/**
	 * The type of connection capabilities allocated to this connection.
	 */
	type: ConnectionTypeNames;
	/**
	 * The details to pass for validation.
	 */
	details?: T;
}
/**
 * Response to a request for validation.
 */
export interface ConnectionValidationResponse {
	/**
	 * Is the connection valid.
	 */
	isValid: boolean;
	/**
	 * Additional details about the connection validity.
	 */
	details?: {
		[key: string]: boolean;
	};
}
/**
 * The payload used for a connection verification request.
 */
export interface ConnectionPayloadVerificationRequest<T = unknown> {
	/**
	 * The identity of the sender.
	 */
	identity: OpenFin.Identity;
	/**
	 * An additional payload used in verification.
	 */
	payload: unknown;
	/**
	 * Any options to use while validating.
	 */
	options?: ConnectionValidationOptions<T>;
}
/**
 * Response from the verification request.
 */
export interface ConnectionPayloadVerificationResponse {
	/**
	 * Is the connection valid.
	 */
	isValid: boolean;
}
export {};
