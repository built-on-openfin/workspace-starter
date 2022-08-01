export type ConnectionTypes = AppSourceConnection | SnapshotSourceConnection | ActionConnection;

export interface BaseConnection {
    type: "appSource"|"snapshotSource"|"actions";
}

export interface AppSourceConnection extends BaseConnection{
    manifestTypes?: string[];
    type: "appSource";
}

export interface ActionConnection extends BaseConnection{
    supportedActions?: string[];
    type: "actions";
}

export interface SnapshotSourceConnection extends BaseConnection {
    type: "snapshotSource";
}

export interface Connection {
    identity: OpenFin.Identity;
    validatePayload?: boolean;
    connectionTypes: ConnectionTypes [];
}

export interface ConnectionProviderOptions {
    connectionId: string;
    supportedActions: string[];
    connections: Connection [];
}
