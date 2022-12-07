import type { ChannelProvider } from "@openfin/core/src/api/interappbus/channel/provider";
import type { App } from "@openfin/workspace";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";
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

const logger = createLogger("Connections");

let connectionService: ChannelProvider;
const connectedClients: { [key: string]: Connection } = {};
const registeredActions: { [key: string]: () => Promise<void> } = {};
const appSourceTypeId = "appSource";
const snapshotSourceTypeId = "snapshotSource";
const actionsTypeId = "actions";
let initialized = false;
let connectionOptions: ConnectionProviderOptions;

function isActionSupported(identity: OpenFin.Identity, payload: { action: string }) {
	const requestingClient = connectedClients[identity.uuid];
	const actionId = payload?.action;
	const requestedAction = registerAction[actionId];
	const actionSettings = requestingClient.connectionTypes.find((entry) => entry.type === actionsTypeId);
	let supportedActions = connectionOptions.supportedActions ?? [];

	if (actionSettings?.type === actionsTypeId) {
		if (Array.isArray(actionSettings.supportedActions) && actionSettings.supportedActions.length > 0) {
			supportedActions = actionSettings.supportedActions;
		}
		if (requestedAction !== undefined && supportedActions.includes(actionId)) {
			return true;
		}
	}
	return false;
}

async function executeAction(identity: OpenFin.Identity, payload: { action: string }): Promise<boolean> {
	const actionId = payload?.action;
	if (isActionSupported(identity, payload)) {
		const requestedAction = registerAction[actionId];
		logger.info(`Executing action: ${actionId} on behalf of connection: ${identity.uuid}`);
		await requestedAction();
		return true;
	}

	logger.info(
		`Not Executing action: ${actionId} on behalf of connection: ${identity.uuid} as the action was either not provided or not listed in the supported ${actionsTypeId} definition.`
	);
	return false;
}

async function disconnect(identity) {
	delete connectedClients[identity.uuid];
	const connectedClientIds = Object.keys(connectedClients);
	// disconnect from channel?
	if (connectedClientIds.length === 0) {
		// this logic can be updated to not disconnect or disconnect after a window of time
		logger.info("No connections left");
	}
}

async function getConnectionListing(identity: OpenFin.Identity): Promise<Connection> {
	const listedConnection = connectionOptions.connections.find(
		(entry) => entry.identity.uuid === identity.uuid
	);

	if (listedConnection !== undefined) {
		return listedConnection;
	}

	const defaultConnection = connectionOptions.connections.find((entry) => entry.identity.uuid === "*");
	if (defaultConnection !== undefined) {
		logger.info(
			`A specific listing for connection ${identity.uuid} isn't listed but there is a default * entry and it will be used for this connection.`
		);
		const identityWithDefaults: Connection = JSON.parse(JSON.stringify(defaultConnection));
		identityWithDefaults.identity = identity;
		return identityWithDefaults;
	}
	return defaultConnection;
}

export async function init(options: ConnectionProviderOptions) {
	if (initialized) {
		return;
	}
	initialized = true;
	connectionOptions = options;
	if (connectionOptions?.connectionId !== undefined) {
		try {
			connectionService = await fin.InterApplicationBus.Channel.create(
				`${fin.me.identity.uuid}-${connectionOptions.connectionId}`
			);
			logger.info("Configuring connection provider");
			connectionService.onConnection(async (identity, payload) => {
				// can reject a connection here by throwing an error
				logger.info("Client connection request identity", JSON.stringify(identity));
				logger.info("Client connection has request payload", payload !== undefined);

				const validatedConnection = await getConnectionListing(identity);
				let isValid = false;
				let errorMessage =
					"This connection has failed the validation check and cannot connect to the requested application";
				if (validatedConnection !== undefined) {
					isValid = true;
					if (validatedConnection.validatePayload) {
						const response = await isConnectionValid(identity, payload);
						isValid = response.isValid;
					}
					if (isValid) {
						if (connectedClients[identity.uuid] !== undefined) {
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

export function registerAction(actionName: string, action: () => Promise<void>): boolean {
	if (registeredActions[actionName] === undefined) {
		logger.info(`Adding action ${actionName} to available actions list`);
		registerAction[actionName] = action;
		return true;
	}
	logger.warn(`Not adding action ${actionName} to available actions list as it is already registered`);
	return false;
}

export function clearAction(actionName: string): boolean {
	if (registeredActions[actionName] === undefined) {
		logger.warn(`Cannot remove action ${actionName} from available actions list as it is not registered`);
		return false;
	}
	delete registeredActions[actionName];
	logger.info(`Action ${actionName} cleared from available actions list`);
	return true;
}

export async function getConnectedAppSourceClients() {
	const connectionsToReturn: {
		identity: OpenFin.Identity;
		connectionData: AppSourceConnection;
	}[] = [];

	const availableConnections = Object.values(connectedClients);
	for (const connection of availableConnections) {
		const matchedConnection = connection.connectionTypes.find(
			(supportedConnectionType) => supportedConnectionType.type === appSourceTypeId
		);

		if (matchedConnection?.type === appSourceTypeId) {
			connectionsToReturn.push({ identity: connection.identity, connectionData: matchedConnection });
		}
	}

	return connectionsToReturn;
}

export async function getConnectedApps(): Promise<App[]> {
	const connectedSources = await getConnectedAppSourceClients();
	const apps: App[] = [];
	for (let i = 0; i < connectedSources.length; i++) {
		const returnedApplications: App[] = await connectionService.dispatch(
			connectedSources[i].identity,
			"getApps"
		);
		const supportedManifestTypes = connectedSources[i]?.connectionData?.manifestTypes;
		let validatedApps: App[] = [];
		if (Array.isArray(supportedManifestTypes) && supportedManifestTypes.length > 0) {
			validatedApps = returnedApplications.filter((entry) =>
				supportedManifestTypes.includes(entry.manifestType)
			);
		} else {
			validatedApps = returnedApplications;
		}
		for (let v = 0; v < validatedApps.length; v++) {
			if (validatedApps[v].manifestType === manifestTypes.connection.id) {
				// ensure that if an app from a connection is marked as connection
				// then it should only be sent to itself and not another uuid
				validatedApps[v].manifest = connectedSources[i].identity.uuid;
			}
		}
		apps.push(...validatedApps);
	}
	return apps;
}

export async function launchConnectedApp(app: App) {
	const connectedSources = await getConnectedAppSourceClients();
	const connectedSource = connectedSources.find((entry) => entry.identity.uuid === app.manifest);
	if (app.manifestType === manifestTypes.connection.id && connectedSource !== undefined) {
		logger.info(`Launching app: ${app.appId} against connection: ${connectedSource.identity.uuid}`);
		await connectionService.dispatch(connectedSource.identity, "launchApp", app);
	} else {
		logger.warn(
			`A request to launch app ${app.appId} was not successful. Either the manifestType is not ${manifestTypes.connection.id}:${app.manifestType} or the connection ${app.manifest} is either not registered in the connectionProvider with ${appSourceTypeId} support or hasn't connected to this platform.`
		);
	}
}

export async function getConnectedSnapshotSourceClients() {
	const connectionsToReturn: { identity: OpenFin.Identity; connectionData: SnapshotSourceConnection }[] = [];

	const availableConnections = Object.values(connectedClients);
	for (const connection of availableConnections) {
		const matchedConnection = connection.connectionTypes.find(
			(supportedConnectionType) => supportedConnectionType.type === snapshotSourceTypeId
		);

		if (matchedConnection?.type === snapshotSourceTypeId) {
			connectionsToReturn.push({ identity: connection.identity, connectionData: matchedConnection });
		}
	}

	return connectionsToReturn;
}
export async function isConnectionValid<T>(
	identity: OpenFin.Identity,
	payload?: unknown,
	options?: ConnectionValidationOptions<T>
): Promise<ConnectionValidationResponse> {
	const responseToReturn: ConnectionValidationResponse = { isValid: false };
	try {
		if (identity?.uuid === undefined) {
			logger.warn(
				"An identity without a UUID was passed to the validate connection function. Validation cannot happen.",
				identity,
				options
			);
			return responseToReturn;
		}

		if (connectionOptions === undefined || connectionOptions?.connections === undefined) {
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

		if (listedConnection === undefined) {
			logger.warn("Connection is not allowed so unable to validate request", identity);
			return responseToReturn;
		}
		if (listedConnection.validatePayload) {
			if (
				connectionOptions.connectionValidationEndpoint === undefined ||
				connectionOptions.connectionValidationEndpoint === null ||
				connectionOptions.connectionValidationEndpoint.trim() === ""
			) {
				logger.warn(
					"This connection has been defined as requiring payload verification but the platform has not provided a connection validation endpoint to use for the verification process. For backwards compatibility this connection is valid unless the broker specifies it wishes to validate."
				);
				responseToReturn.isValid = true;
				return responseToReturn;
			}
			if (endpointProvider.hasEndpoint(connectionOptions.connectionValidationEndpoint)) {
				const request = { identity, payload, options };
				logger.info(
					`Connection validation being handled by endpoint: ${connectionOptions.connectionValidationEndpoint}`
				);
				const response = await endpointProvider.requestResponse<
					ConnectionPayloadVerificationRequest<unknown>,
					ConnectionPayloadVerificationResponse
				>(connectionOptions.connectionValidationEndpoint, request);
				if (!response.isValid) {
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
		if (options?.type !== undefined) {
			const supportedType = listedConnection.connectionTypes.find((entry) => entry.type === options.type);
			if (supportedType === undefined) {
				logger.warn(
					`The connection that is being validated does not support the required connection type: ${options.type}`
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
