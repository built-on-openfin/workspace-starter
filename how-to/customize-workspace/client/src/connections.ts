import { fin } from "@openfin/core";
import { ChannelProvider } from "@openfin/core/src/api/interappbus/channel/provider";
import { App } from "@openfin/workspace";
import {
	AppSourceConnection,
	Connection,
	ConnectionProviderOptions,
	SnapshotSourceConnection
} from "./connection-shapes";

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

	if (actionSettings.type === actionsTypeId) {
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
		console.log(`Executing action: ${actionId} on behalf of connection: ${identity.uuid}`);
		await requestedAction();
		return true;
	}

	console.log(
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
		console.log(`No connections left.`);
	}
}

export async function init(options: ConnectionProviderOptions) {
	if (initialized) {
		return;
	}
	initialized = true;
	connectionOptions = options;
	if (connectionOptions?.connectionId !== undefined) {
		connectionService = await fin.InterApplicationBus.Channel.create(connectionOptions.connectionId);
		console.log(`Configuring connection provider.`);
		connectionService.onConnection((identity, payload) => {
			// can reject a connection here by throwing an error
			console.log("Client connection request identity:", JSON.stringify(identity));
			console.log("Client connection request payload:", JSON.stringify(payload));

			const validatedConnection = connectionOptions.connections.find(
				(entry) => entry.identity.uuid === identity.uuid
			);
			let isValid = false;
			let errorMessage =
				"This connection has failed the validation check and cannot connect to the requested application.";
			if (validatedConnection !== undefined) {
				isValid = true;
				if (validatedConnection.validatePayload) {
					console.warn(
						`This connection has specified payload validation but that check needs to be implemented. UUID: ${validatedConnection.identity.uuid}`
					);
					isValid = true;
				}
				if (isValid) {
					if (connectedClients[identity.uuid] !== undefined) {
						isValid = false;
						errorMessage = `This platform can only accept one connection from an external connection. The uuid (${identity.uuid}) is already registered.`;
					} else {
						// assign the passed identity
						validatedConnection.identity = identity;
						connectedClients[identity.uuid] = validatedConnection;
						console.log(`The following connection has been added to the connected list: ${identity.uuid}`);
					}
				}
			}

			if (!isValid) {
				console.warn(
					`The following connection has not been added to the connected list: ${identity.uuid} as it failed validation`
				);
				throw new Error(errorMessage);
			}
		});

		connectionService.onDisconnection(async (identity) => {
			console.log(`Client disconnected uuid: ${identity.uuid}, name: ${identity.name}`);
			await disconnect(identity);
		});

		connectionService.register("action", async (payload, identity) => {
			console.log("Action received from client:", identity, payload);
			const result = await executeAction(identity, payload as { action: string });
			return { result };
		});

		connectionService.register("canAction", async (payload, identity) => {
			console.log("Check for action permission received from client:", identity, payload);
			const result = isActionSupported(identity, payload as { action: string });
			return { result };
		});
	} else {
		console.log(`This platform is not configured to support a connectionProvider.`);
	}
}

export function registerAction(actionName: string, action: () => Promise<void>): boolean {
	if (registeredActions[actionName] === undefined) {
		console.log(`Adding action ${actionName} to available actions list.`);
		registerAction[actionName] = action;
		return true;
	}
	console.warn(`Not adding action ${actionName} to available actions list as it is already registered.`);
	return false;
}

export function clearAction(actionName: string): boolean {
	if (registeredActions[actionName] === undefined) {
		console.warn(`Cannot remove action ${actionName} from available actions list as it is not registered.`);
		return false;
	}
	delete registeredActions[actionName];
	console.log(`Action ${actionName} cleared from available actions list.`);
	return true;
}

export async function getConnectedAppSourceClients() {
	const connections: {
		identity: OpenFin.Identity;
		connectionData: AppSourceConnection;
	}[] = [];

	const availableConnections = Object.values(connectedClients);
	for (const connection of availableConnections) {
		const matchedConnection = connection.connectionTypes.find(
			(supportedConnectionType) => supportedConnectionType.type === appSourceTypeId
		);

		if (matchedConnection?.type === appSourceTypeId) {
			connections.push({ identity: connection.identity, connectionData: matchedConnection });
		}
	}

	return connections;
}

export async function getConnectedApps(): Promise<App[]> {
	const connectedSources = await getConnectedAppSourceClients();
	const apps: App[] = [];
	for (let i = 0; i < connectedSources.length; i++) {
		const returnedApplications: App[] = await connectionService.dispatch(
			connectedSources[i].identity,
			"getApps"
		);
		const manifestTypes = connectedSources[i]?.connectionData?.manifestTypes;
		let validatedApps: App[] = [];
		if (Array.isArray(manifestTypes) && manifestTypes.length > 0) {
			validatedApps = returnedApplications.filter((entry) => manifestTypes.includes(entry.manifestType));
		} else {
			validatedApps = returnedApplications;
		}
		for (let v = 0; v < validatedApps.length; v++) {
			if (validatedApps[v].manifestType === "connection") {
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
	const manifestType = "connection";
	const connectedSource = connectedSources.find((entry) => entry.identity.uuid === app.manifest);
	if (app.manifestType === manifestType && connectedSource !== undefined) {
		console.log(`Launching app: ${app.appId} against connection: ${connectedSource.identity.uuid}`);
		await connectionService.dispatch(connectedSource.identity, "launchApp", app);
	} else {
		console.warn(
			`A request to launch app ${app.appId} was not successful. Either the manifestType is not ${manifestType}:${app.manifestType} or the connection ${app.manifest} is either not registered in the connectionProvider with ${appSourceTypeId} support or hasn't connected to this platform.`
		);
	}
}

export async function getConnectedSnapshotSourceClients() {
	const connections: { identity: OpenFin.Identity; connectionData: SnapshotSourceConnection }[] = [];

	const availableConnections = Object.values(connectedClients);
	for (const connection of availableConnections) {
		const matchedConnection = connection.connectionTypes.find(
			(supportedConnectionType) => supportedConnectionType.type === snapshotSourceTypeId
		);

		if (matchedConnection?.type === snapshotSourceTypeId) {
			connections.push({ identity: connection.identity, connectionData: matchedConnection });
		}
	}

	return connections;
}
