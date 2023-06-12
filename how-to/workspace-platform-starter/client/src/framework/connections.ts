import type OpenFin from "@openfin/core";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { MANIFEST_TYPES } from "./manifest-types";
import type { PlatformApp } from "./shapes/app-shapes";
import type {
	AppSourceConnection,
	Connection,
	ConnectionPayloadVerificationRequest,
	ConnectionPayloadVerificationResponse,
	ConnectionProviderOptions,
	ConnectionValidationOptions,
	ConnectionValidationResponse,
	SnapshotSourceConnection
} from "./shapes/connection-shapes";
import { isEmpty, isStringValue, objectClone } from "./utils";

const APP_SOURCE_TYPE_ID = "appSource";
const SNAPSHOT_SOURCE_TYPE_ID = "snapshotSource";
const ACTIONS_TYPE_ID = "actions";

const logger = createLogger("Connections");

const connectedClients: { [key: string]: Connection } = {};
const registeredActions: { [key: string]: () => Promise<void> } = {};
let connectionOptions: ConnectionProviderOptions | undefined;
let connectionService: OpenFin.ChannelProvider;
let initialized = false;

/**
 * Initialize the connections.
 * @param options The options to initialize the connections.
 */
export async function init(options: ConnectionProviderOptions | undefined): Promise<void> {
	if (initialized) {
		return;
	}

	initialized = true;
	connectionOptions = options;

	const connectionId = connectionOptions?.connectionId;
	if (!isEmpty(connectionId)) {
		try {
			connectionService = await fin.InterApplicationBus.Channel.create(
				`${fin.me.identity.uuid}-${connectionId}`
			);
			logger.info("Configuring connection provider");
			connectionService.onConnection(async (identity, payload) => {
				// can reject a connection here by throwing an error
				logger.info("Client connection request identity", JSON.stringify(identity));
				logger.info("Client connection has request payload", !isEmpty(payload));

				const validatedConnection = await getConnectionListing(identity);
				let isValid = false;
				let errorMessage =
					"This connection has failed the validation check and cannot connect to the requested application";
				if (!isEmpty(validatedConnection)) {
					isValid = true;
					if (validatedConnection.validatePayload) {
						const response = await isConnectionValid(identity, payload);
						isValid = response.isValid;
					}
					if (isValid) {
						if (!isEmpty(connectedClients[identity.uuid])) {
							isValid = false;
							errorMessage = `This platform can only accept one connection from an external connection. The uuid (${identity.uuid}) is already registered.`;
						} else {
							// assign the passed identity
							validatedConnection.identity = identity;
							connectedClients[identity.uuid] = validatedConnection;
							logger.info(`The following connection has been added to the connected list: ${identity.uuid}`);
						}
					}
				}

				if (!isValid) {
					logger.warn(
						`The following connection has not been added to the connected list: ${identity.uuid} as it failed validation`
					);
					throw new Error(errorMessage);
				}
			});

			connectionService.onDisconnection(async (identity) => {
				logger.info(`Client disconnected uuid: ${identity.uuid}, name: ${identity.name}`);
				await disconnect(identity);
			});

			connectionService.register("action", async (payload, identity) => {
				logger.info("Action received from client", identity, payload);
				const result = await executeAction(identity, payload as { action: string });
				return { result };
			});

			connectionService.register("canAction", async (payload, identity) => {
				logger.info("Check for action permission received from client", identity, payload);
				const result = isActionSupported(identity, payload as { action: string });
				return { result };
			});

			connectionService.register("disconnect", async (payload, identity) => {
				logger.info("Request for disconnection received from client", identity, payload);
				await disconnect(identity);
			});
		} catch (error) {
			logger.error(
				"There was an error trying to create the channel that will act as connection provider. This functionality will not be available",
				error
			);
		}
	} else {
		logger.info("This platform is not configured to support a connectionProvider");
	}
}

/**
 * Manually register an action.
 * @param actionName The name of the actions.
 * @param action The actions method to call.
 * @returns True if the action was registered.
 */
export function registerAction(actionName: string, action: () => Promise<void>): boolean {
	if (isEmpty(registeredActions[actionName])) {
		logger.info(`Adding action ${actionName} to available actions list`);
		registeredActions[actionName] = action;
		return true;
	}
	logger.warn(`Not adding action ${actionName} to available actions list as it is already registered`);
	return false;
}

/**
 * Remove a registered actions.
 * @param actionName The name of the action to remove.
 * @returns True if the action was removed.
 */
export function clearAction(actionName: string): boolean {
	if (isEmpty(registeredActions[actionName])) {
		logger.warn(`Cannot remove action ${actionName} from available actions list as it is not registered`);
		return false;
	}
	delete registeredActions[actionName];
	logger.info(`Action ${actionName} cleared from available actions list`);
	return true;
}

/**
 * Get any connections that support apps.
 * @returns The list of connections supporting apps.
 */
export async function getConnectedAppSourceClients(): Promise<
	{
		identity: OpenFin.Identity;
		connectionData: AppSourceConnection;
	}[]
> {
	const connectionsToReturn: {
		identity: OpenFin.Identity;
		connectionData: AppSourceConnection;
	}[] = [];

	const availableConnections = Object.values(connectedClients);
	for (const connection of availableConnections) {
		const matchedConnection = connection.connectionTypes.find(
			(supportedConnectionType) => supportedConnectionType.type === APP_SOURCE_TYPE_ID
		);

		if (matchedConnection?.type === APP_SOURCE_TYPE_ID) {
			connectionsToReturn.push({ identity: connection.identity, connectionData: matchedConnection });
		}
	}

	return connectionsToReturn;
}

/**
 * Get any connected apps.
 * @returns The list of connected apps.
 */
export async function getConnectedApps(): Promise<PlatformApp[]> {
	const connectedSources = await getConnectedAppSourceClients();
	const apps: PlatformApp[] = [];

	for (const connectedSource of connectedSources) {
		const connectionApps: PlatformApp[] = await connectionService.dispatch(
			connectedSource.identity,
			"getApps"
		);
		const supportedManifestTypes: string[] = connectedSource?.connectionData?.manifestTypes ?? [];
		let validatedApps: PlatformApp[] = [];
		if (supportedManifestTypes.length > 0) {
			validatedApps = connectionApps.filter(
				(connectionApp) =>
					connectionApp.manifestType && supportedManifestTypes.includes(connectionApp.manifestType)
			);
		} else {
			validatedApps = connectionApps;
		}

		for (const app of validatedApps) {
			if (app.manifestType === MANIFEST_TYPES.Connection.id) {
				// ensure that if an app from a connection is marked as connection
				// then it should only be sent to itself and not another uuid
				app.manifest = connectedSource.identity.uuid;
			}
		}
		apps.push(...validatedApps);
	}

	return apps;
}

/**
 * Launch a connected app.
 * @param app The app to launch.
 * @returns The identity of the connection app.
 */
export async function launchConnectedApp(app: PlatformApp): Promise<OpenFin.Identity | undefined> {
	const connectedSources = await getConnectedAppSourceClients();
	const connectedSource = connectedSources.find((entry) => entry.identity.uuid === app.manifest);
	if (app.manifestType === MANIFEST_TYPES.Connection.id && !isEmpty(connectedSource)) {
		logger.info(`Launching app: ${app.appId} against connection: ${connectedSource.identity.uuid}`);
		await connectionService.dispatch(connectedSource.identity, "launchApp", app);
		return connectedSource.identity;
	}
	logger.warn(
		`A request to launch app ${app.appId} was not successful. Either the manifestType is not ${MANIFEST_TYPES.Connection.id}:${app.manifestType} or the connection ${app.manifest} is either not registered in the connectionProvider with ${APP_SOURCE_TYPE_ID} support or hasn't connected to this platform.`
	);
}

/**
 * Get connection snapshot source clients.
 * @returns The list of connected snapshot source clients.
 */
export async function getConnectedSnapshotSourceClients(): Promise<
	{ identity: OpenFin.Identity; connectionData: SnapshotSourceConnection }[]
> {
	const connectionsToReturn: { identity: OpenFin.Identity; connectionData: SnapshotSourceConnection }[] = [];

	const availableConnections = Object.values(connectedClients);
	for (const connection of availableConnections) {
		const matchedConnection = connection.connectionTypes.find(
			(supportedConnectionType) => supportedConnectionType.type === SNAPSHOT_SOURCE_TYPE_ID
		);

		if (matchedConnection?.type === SNAPSHOT_SOURCE_TYPE_ID) {
			connectionsToReturn.push({ identity: connection.identity, connectionData: matchedConnection });
		}
	}

	return connectionsToReturn;
}

/**
 * Check if a connection is valid.
 * @param identity The identity of the connection to check.
 * @param payload The payload to pass when checking the connection.
 * @param options The options for checking the connection.
 * @returns Response determining if the connection is valid.
 */
export async function isConnectionValid<T>(
	identity: OpenFin.Identity,
	payload?: unknown,
	options?: ConnectionValidationOptions<T>
): Promise<ConnectionValidationResponse> {
	const responseToReturn: ConnectionValidationResponse = { isValid: false };

	try {
		if (isEmpty(identity?.uuid)) {
			logger.warn(
				"An identity without a UUID was passed to the validate connection function. Validation cannot happen.",
				identity,
				options
			);
			return responseToReturn;
		}

		if (isEmpty(connectionOptions?.connections)) {
			if (options?.type === "broker") {
				logger.info(
					"No connection provider options specified and broker connection requested. Implementing default broker behavior which is to allow a connection."
				);
				responseToReturn.isValid = true;
				return responseToReturn;
			}
			logger.warn(
				"A connection verification request was made but connection provider options have not been defined so we cannot validate the connection request."
			);
			return responseToReturn;
		}

		const listedConnection = await getConnectionListing(identity);

		if (isEmpty(listedConnection)) {
			logger.warn("Connection is not allowed so unable to validate request", identity);
			return responseToReturn;
		}
		if (listedConnection.validatePayload) {
			const connectionValidationEndpoint = connectionOptions?.connectionValidationEndpoint;
			if (!isStringValue(connectionValidationEndpoint)) {
				logger.warn(
					"This connection has been defined as requiring payload verification but the platform has not provided a connection validation endpoint to use for the verification process. For backwards compatibility this connection is valid unless the broker specifies it wishes to validate."
				);
				responseToReturn.isValid = true;
				return responseToReturn;
			}
			if (endpointProvider.hasEndpoint(connectionValidationEndpoint)) {
				const request = { identity, payload, options };
				logger.info(`Connection validation being handled by endpoint: ${connectionValidationEndpoint}`);
				const response = await endpointProvider.requestResponse<
					ConnectionPayloadVerificationRequest,
					ConnectionPayloadVerificationResponse
				>(connectionValidationEndpoint, request);
				if (!response?.isValid) {
					logger.warn(`Connection validation request for ${JSON.stringify(identity)} failed validation`);
					return responseToReturn;
				}
				logger.info("Connection has passed validation.");
			} else {
				logger.warn(
					"This connection has been defined as requiring payload verification but the specified connectionValidationEndpoint is not a valid endpoint."
				);
				return responseToReturn;
			}
		}

		const optionsType = options?.type;
		if (!isEmpty(optionsType)) {
			const supportedType = listedConnection.connectionTypes.find((entry) => entry.type === optionsType);
			if (isEmpty(supportedType)) {
				logger.warn(
					`The connection that is being validated does not support the required connection type: ${optionsType}`
				);
				return responseToReturn;
			}
			logger.info("Connection type requested is supported.");
		}
		responseToReturn.isValid = true;
	} catch (err) {
		logger.error("An error occurred while trying to valid a connection request.", err);
	}
	logger.info("Returning: ", responseToReturn);

	return responseToReturn;
}

/**
 * Is the specified action supported by the connection.
 * @param identity The identity of the connection to test.
 * @param payload The payload containing the actions to test.
 * @param payload.action The actions to test.
 * @returns True if the action is supported.
 */
function isActionSupported(identity: OpenFin.Identity, payload: { action: string }): boolean {
	const requestingClient = connectedClients[identity.uuid];
	const actionId = payload?.action;
	const requestedAction = registeredActions[actionId];
	const actionSettings = requestingClient.connectionTypes.find((entry) => entry.type === ACTIONS_TYPE_ID);
	let supportedActions = connectionOptions?.supportedActions ?? [];

	if (actionSettings?.type === ACTIONS_TYPE_ID) {
		if (Array.isArray(actionSettings.supportedActions) && actionSettings.supportedActions.length > 0) {
			supportedActions = actionSettings.supportedActions;
		}
		if (!isEmpty(requestedAction) && supportedActions.includes(actionId)) {
			return true;
		}
	}
	return false;
}

/**
 * Execute an action on a connection.
 * @param identity The identity of the connection to perform the action on.
 * @param payload The payload containing the action.
 * @param payload.action The action to execute.
 * @returns True if the action was executed.
 */
async function executeAction(identity: OpenFin.Identity, payload: { action: string }): Promise<boolean> {
	const actionId = payload?.action;
	if (isActionSupported(identity, payload)) {
		const requestedAction = registeredActions[actionId];
		logger.info(`Executing action: ${actionId} on behalf of connection: ${identity.uuid}`);
		await requestedAction();
		return true;
	}

	logger.info(
		`Not Executing action: ${actionId} on behalf of connection: ${identity.uuid} as the action was either not provided or not listed in the supported ${ACTIONS_TYPE_ID} definition.`
	);
	return false;
}

/**
 * Disconnect the connection.
 * @param identity The identity of the connection to disconnect.
 */
async function disconnect(identity: OpenFin.Identity): Promise<void> {
	delete connectedClients[identity.uuid];
	const connectedClientIds = Object.keys(connectedClients);
	// disconnect from channel?
	if (connectedClientIds.length === 0) {
		// this logic can be updated to not disconnect or disconnect after a window of time
		logger.info("No connections left");
	}
}

/**
 * Gets the connection associated with an identity.
 * @param identity The identity to get the connection for.
 * @returns The connection if there is one.
 */
async function getConnectionListing(identity: OpenFin.Identity): Promise<Connection | undefined> {
	// Look for a connection with a specified uuid
	const listedConnection = connectionOptions?.connections.find(
		(entry) => entry.identity.uuid === identity.uuid
	);

	if (!isEmpty(listedConnection)) {
		return listedConnection;
	}

	// No connection found so look for a wildcard uuid
	const defaultConnection = connectionOptions?.connections.find((entry) => entry.identity.uuid === "*");
	if (!isEmpty(defaultConnection)) {
		logger.info(
			`A specific listing for connection ${identity.uuid} isn't listed but there is a default * entry and it will be used for this connection.`
		);
		const identityWithDefaults: Connection = objectClone(defaultConnection);
		identityWithDefaults.identity = identity;
		return identityWithDefaults;
	}

	return defaultConnection;
}
