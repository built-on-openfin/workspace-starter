import type { AppIdentifier } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import {
	OPEN_ERROR as OpenError,
	RESOLVE_ERROR as ResolveError
} from "workspace-platform-starter/fdc3/errors";
import type {
	IntentRegistrationEntry,
	ContextRegistrationEntry,
	BrokerClientConnection,
	IntentRegistrationPayload,
	CaptureApiPayload,
	ApiMetadata
} from "workspace-platform-starter/shapes/interopbroker-shapes";
import type { Logger } from "workspace-platform-starter/shapes/logger-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";

/**
 * Used to track client interactions with a broker.
 */
export class ClientRegistrationHelper {
	private readonly _logger: Logger;

	private readonly _lookupAppId: (clientIdentity: OpenFin.ClientIdentity) => Promise<string | undefined>;

	private readonly _clientReadyRequests: { [key: string]: (instanceId: string) => void };

	private readonly _trackedClientConnections: { [key: string]: BrokerClientConnection };

	private readonly _trackedContextHandlers: { [key: string]: ContextRegistrationEntry[] };

	private readonly _trackedIntentHandlers: { [key: string]: IntentRegistrationEntry[] };

	/**
	 * Create an instance of the Client Registration Helper.
	 * @param lookupAppId determine appId based on clientIdentity
	 * @param logger the logger to use.
	 */
	constructor(
		lookupAppId: (clientIdentity: OpenFin.ClientIdentity) => Promise<string | undefined>,
		logger: Logger
	) {
		this._logger = logger;
		this._lookupAppId = lookupAppId;
		this._clientReadyRequests = {};
		this._trackedClientConnections = {};
		this._trackedContextHandlers = {};
		this._trackedIntentHandlers = {};
	}

	/**
	 * The client has disconnected form the broker.
	 * @param clientIdentity The identity of the client that disconnected.
	 */
	public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
		this._logger.info("Client Disconnected.", clientIdentity);

		for (const [key, value] of Object.entries(this._trackedIntentHandlers)) {
			this._trackedIntentHandlers[key] = value.filter(
				(entry) => entry.clientIdentity.endpointId !== clientIdentity.endpointId
			);
		}

		for (const [key, value] of Object.entries(this._trackedContextHandlers)) {
			this._trackedContextHandlers[key] = value.filter(
				(entry) => entry.clientIdentity.endpointId !== clientIdentity.endpointId
			);
		}
		this.removeTrackedClientConnection(clientIdentity);
	}

	/**
	 * Handle an intent handler being registered.
	 * @param payload The payload.
	 * @param clientIdentity The client identity.
	 * @returns Nothing.
	 */
	public async intentHandlerRegistered(
		payload: IntentRegistrationPayload,
		clientIdentity: OpenFin.ClientIdentity
	): Promise<void> {
		this._logger.info("intentHandlerRegistered:", payload, clientIdentity);
		if (!isEmpty(payload)) {
			const intentName: string = payload.handlerId.replace("intent-handler-", "");

			let trackedIntentHandler = this._trackedIntentHandlers[intentName];

			if (isEmpty(trackedIntentHandler)) {
				trackedIntentHandler = [];
				this._trackedIntentHandlers[intentName] = trackedIntentHandler;
			}

			const trackedHandler = this._trackedIntentHandlers[intentName].find(
				(entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId
			);

			if (isEmpty(trackedHandler)) {
				this._logger.info(
					`intentHandler endpoint not registered. Registering ${clientIdentity.endpointId} against intent ${intentName} and looking up app name.`
				);
				const appId = await this._lookupAppId(clientIdentity);

				if (isEmpty(appId)) {
					this._logger.warn(
						"Unable to determine app id based on name. This app will not be tracked via intent handler registration."
					);
					return;
				}
				this._trackedIntentHandlers[intentName].push({
					fdc3Version: payload.fdc3Version,
					clientIdentity,
					appId
				});
				this._logger.info(
					`intentHandler endpoint: ${clientIdentity.endpointId} registered against intent: ${intentName} and app Id: ${appId}.`
				);
			}

			const clientReadyKey = this.getClientReadyKey(clientIdentity, "intent", intentName);
			if (!isEmpty(this._clientReadyRequests[clientReadyKey])) {
				this._logger.info("Resolving client ready request.");
				this._clientReadyRequests[clientReadyKey](clientIdentity.endpointId);
			}
		}
	}

	/**
	 * A context handler has been registered against the broker.
	 * @param payload The payload from a context listener registration.
	 * @param payload.contextType The context type that the client is listening for.
	 * @param payload.handlerId The handler Id for this listener.
	 * @param clientIdentity The identity of the application that is adding the context handler.
	 */
	public async contextHandlerRegistered(
		payload: { contextType: string | undefined; handlerId: string },
		clientIdentity: OpenFin.ClientIdentity
	): Promise<void> {
		this._logger.info("contextHandlerRegistered:", payload, clientIdentity);
		if (!isEmpty(payload?.handlerId)) {
			const contextTypeName: string = payload?.contextType ?? "*";
			const handlerId = payload.handlerId;
			let trackedContextHandler = this._trackedContextHandlers[contextTypeName];

			if (isEmpty(trackedContextHandler)) {
				trackedContextHandler = [];
				this._trackedContextHandlers[contextTypeName] = trackedContextHandler;
			}

			const trackedHandler = this._trackedContextHandlers[contextTypeName].find(
				(entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId
			);

			if (isEmpty(trackedHandler)) {
				this._logger.info(
					`contextHandler endpoint not registered. Registering ${clientIdentity.endpointId} against context handler for context type ${contextTypeName} and looking up app name.`
				);
				const appId = await this._lookupAppId(clientIdentity);

				if (isEmpty(appId)) {
					this._logger.warn(
						"Unable to determine app id based on name. This app will not be tracked via context handler registration."
					);
					return;
				}
				this._trackedContextHandlers[contextTypeName].push({
					clientIdentity,
					appId,
					handlerId
				});
				this._logger.info(
					`contextHandler endpoint: ${clientIdentity.endpointId} registered against context type: ${contextTypeName} and app Id: ${appId}.`
				);
			}

			const clientReadyKey = this.getClientReadyKey(clientIdentity, "context", contextTypeName);
			if (!isEmpty(this._clientReadyRequests[clientReadyKey])) {
				this._logger.info("Resolving client ready request.");
				this._clientReadyRequests[clientReadyKey](clientIdentity.endpointId);
			}
		}
	}

	/**
	 * Capture the connection and API version.
	 * @param id The client identity to capture from.
	 * @param payload The payload.
	 */
	public async clientConnectionRegistered(
		id: OpenFin.ClientIdentity & { connectionUrl?: string; entityType?: string },
		payload?: CaptureApiPayload
	): Promise<void> {
		const key = `${id.uuid}-${id.name}`;
		let apiVersion: ApiMetadata | undefined;
		if (isEmpty(this._trackedClientConnections[key])) {
			if (id.uuid !== fin.me.identity.uuid) {
				const payloadApiVersion = payload?.apiVersion;
				if (!isEmpty(payloadApiVersion) && !isEmpty(payloadApiVersion?.type)) {
					apiVersion = payloadApiVersion;
				} else if (isStringValue(id.connectionUrl)) {
					// if they haven't specified apiVersion meta data and it is external and has a url then we will assume fdc3 2.0
					apiVersion = { type: "fdc3", version: "2.0" };
				} else {
					// if a native app has specified a preference through apiVersion then we assume interop
					apiVersion = { type: "interop" };
				}
			} else {
				const entityType = id.entityType;
				if (!isEmpty(entityType)) {
					switch (entityType) {
						case "window": {
							apiVersion = await this.captureWindowApiUsage(id);
							break;
						}
						case "view": {
							apiVersion = await this.captureViewApiUsage(id);
							break;
						}
						default: {
							this._logger.warn(
								`We currently do not check for entity types that are not views or windows. Entity type: ${entityType}`
							);
						}
					}
				} else {
					apiVersion = await this.captureViewApiUsage(id);
					if (isEmpty(apiVersion)) {
						// perhaps it is a window
						apiVersion = await this.captureWindowApiUsage(id);
					}
				}
			}
			const brokerClientConnection: BrokerClientConnection = {
				clientIdentity: id,
				apiMetadata: apiVersion
			};

			this._trackedClientConnections[key] = brokerClientConnection;
			const clientReadyKey = this.getClientReadyKey(id, "connection");
			if (!isEmpty(this._clientReadyRequests[clientReadyKey])) {
				this._logger.info("Resolving client ready request.");
				this._clientReadyRequests[clientReadyKey](id.endpointId);
			}
		}
	}

	/**
	 * Get a context handler that matches the context type name and instance id.
	 * @param contextTypeName the name of the context the listener is registered for.
	 * @param instanceId the instanceId you wish to check for.
	 * @returns The ContextRegistrationEntry or undefined.
	 */
	public getRegisteredContextHandler(
		contextTypeName: string,
		instanceId: string
	): ContextRegistrationEntry | undefined {
		const trackedHandler = this._trackedContextHandlers[contextTypeName]?.find(
			(entry) => entry.clientIdentity.endpointId === instanceId
		);
		return trackedHandler;
	}

	/**
	 * Handle FDC3 find instances for app instances that have registered for an intent.
	 * @param app The app identifier to find.
	 * @param clientIdentity The client identity.
	 * @param type the type of app instances you are after. CONNECTED = anything that has connected to the broker and INTENT means an APP that has registered an Intent Handler.
	 * @returns The instance of the app.
	 */
	public async findAppInstances(
		app: AppIdentifier,
		clientIdentity: OpenFin.ClientIdentity,
		type: "connected" | "intent" = "connected"
	): Promise<AppIdentifier[]> {
		const endpointApps: { [key: string]: AppIdentifier } = {};

		if (type === "intent") {
			for (const [, value] of Object.entries(this._trackedIntentHandlers)) {
				const entries = value.filter((entry) => entry.appId === app.appId);
				for (const entry of entries) {
					endpointApps[entry.clientIdentity.endpointId] = {
						appId: entry.appId ?? "",
						instanceId: entry.clientIdentity.endpointId
					};
				}
			}
			return Object.values(endpointApps);
		}

		for (const [, value] of Object.entries(this._trackedClientConnections)) {
			const trackedAppId = await this._lookupAppId(value.clientIdentity);
			if (trackedAppId === app.appId && isEmpty(endpointApps[value.clientIdentity.endpointId])) {
				endpointApps[value.clientIdentity.endpointId] = {
					appId: app.appId ?? "",
					instanceId: value.clientIdentity.endpointId
				};
			}
		}

		return Object.values(endpointApps);
	}

	/**
	 * Get the api version for the identity.
	 * @param id The identity to get the api version for.
	 * @returns The api metadata.
	 */
	public getApiVersion(id: OpenFin.Identity): ApiMetadata | undefined {
		const key = `${id.uuid}-${id.name}`;
		const apiVersion: ApiMetadata | undefined = this._trackedClientConnections[key]?.apiMetadata;
		return apiVersion;
	}

	/**
	 * Handle client ready event for opening and awaiting a connection to the broker.
	 * @param identity The identity of the client.
	 * @param timeout The timeout to wait for the client.
	 * @returns The instance id.
	 */
	public async onConnectionClientReady(identity: OpenFin.Identity, timeout: number = 15000): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const clientIdentity = this.getClientIdentity(identity);
			if (!isEmpty(clientIdentity)) {
				resolve(clientIdentity.endpointId);
			}
			const key = this.getClientReadyKey(identity, "connection");
			const timerId = setTimeout(() => {
				if (!isEmpty(this._clientReadyRequests[key])) {
					delete this._clientReadyRequests[key];
					reject(ResolveError.TargetInstanceUnavailable);
				}
			}, timeout);
			this._clientReadyRequests[key] = (instanceId: string): void => {
				clearTimeout(timerId);
				// clear the callback asynchronously
				delete this._clientReadyRequests[key];
				resolve(instanceId);
			};
		});
	}

	/**
	 * Handle client ready event for intent handling.
	 * @param identity The identity of the client.
	 * @param intentName The intent name.
	 * @param timeout The timeout to wait for the client.
	 * @returns The instance id.
	 */
	public async onIntentClientReady(
		identity: OpenFin.Identity,
		intentName: string,
		timeout: number = 15000
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const registeredHandlers = this._trackedIntentHandlers[intentName];
			let existingInstanceId: string | undefined;
			if (!isEmpty(registeredHandlers)) {
				for (const handler of registeredHandlers) {
					if (
						handler.clientIdentity.uuid === identity.uuid &&
						handler.clientIdentity.name === identity.name
					) {
						existingInstanceId = handler.clientIdentity.endpointId;
						break;
					}
				}
			}
			if (!isEmpty(existingInstanceId)) {
				resolve(existingInstanceId);
			}
			const key = this.getClientReadyKey(identity, "intent", intentName);
			const timerId = setTimeout(() => {
				if (!isEmpty(this._clientReadyRequests[key])) {
					delete this._clientReadyRequests[key];
					reject(ResolveError.IntentDeliveryFailed);
				}
			}, timeout);
			this._clientReadyRequests[key] = (instanceId: string): void => {
				clearTimeout(timerId);
				// clear the callback asynchronously
				delete this._clientReadyRequests[key];
				resolve(instanceId);
			};
		});
	}

	/**
	 * Handle client ready event for context handling.
	 * @param identity The identity of the client.
	 * @param contextTypeName The contextType name.
	 * @param timeout The timeout to wait for the client.
	 * @returns The instance id.
	 */
	public async onContextClientReady(
		identity: OpenFin.Identity,
		contextTypeName: string,
		timeout: number = 15000
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const contextRegisteredHandlers = this._trackedContextHandlers[contextTypeName];
			const globalRegisteredHandlers = this._trackedContextHandlers["*"];
			let existingContextHandlerInstanceId: string | undefined;

			if (!isEmpty(contextRegisteredHandlers)) {
				for (const handler of contextRegisteredHandlers) {
					if (
						handler.clientIdentity.uuid === identity.uuid &&
						handler.clientIdentity.name === identity.name
					) {
						existingContextHandlerInstanceId = handler.clientIdentity.endpointId;
						break;
					}
				}
			}

			if (!isEmpty(globalRegisteredHandlers) && isEmpty(existingContextHandlerInstanceId)) {
				for (const handler of globalRegisteredHandlers) {
					if (
						handler.clientIdentity.uuid === identity.uuid &&
						handler.clientIdentity.name === identity.name
					) {
						existingContextHandlerInstanceId = handler.clientIdentity.endpointId;
						break;
					}
				}
			}
			if (!isEmpty(existingContextHandlerInstanceId)) {
				resolve(existingContextHandlerInstanceId);
				return;
			}

			const contextKey = this.getClientReadyKey(identity, "context", contextTypeName);
			const globalKey = this.getClientReadyKey(identity, "context", "*");
			const timerId = setTimeout(() => {
				const hasContextRequest = !isEmpty(this._clientReadyRequests[contextKey]);
				const hasGlobalRequest = !isEmpty(this._clientReadyRequests[globalKey]);

				if (hasContextRequest || hasGlobalRequest) {
					delete this._clientReadyRequests[contextKey];
					delete this._clientReadyRequests[globalKey];
					reject(OpenError.AppTimeout);
				}
			}, timeout);
			let isResolved = false;
			this._clientReadyRequests[contextKey] = (instanceId: string): void => {
				clearTimeout(timerId);
				if (!isResolved) {
					isResolved = true;
					// clear the callback asynchronously
					delete this._clientReadyRequests[contextKey];
					delete this._clientReadyRequests[globalKey];
					resolve(instanceId);
				}
			};
			this._clientReadyRequests[globalKey] = (instanceId: string): void => {
				clearTimeout(timerId);
				if (!isResolved) {
					isResolved = true;
					// clear the callback asynchronously
					delete this._clientReadyRequests[contextKey];
					delete this._clientReadyRequests[globalKey];
					resolve(instanceId);
				}
			};
		});
	}

	/**
	 * Get the client identity given a standard identity.
	 * @param id The identity to get the client identity for.
	 * @returns The client identity if available.
	 */
	private getClientIdentity(id: OpenFin.Identity): OpenFin.ClientIdentity | undefined {
		const key = `${id.uuid}-${id.name}`;
		const clientIdentity: OpenFin.ClientIdentity | undefined =
			this._trackedClientConnections[key]?.clientIdentity;
		return clientIdentity;
	}

	/**
	 * Remove the tracking for the identity.
	 * @param id The identity to remove the connection information for.
	 */
	private removeTrackedClientConnection(id: OpenFin.Identity): void {
		const key = `${id.uuid}-${id.name}`;
		delete this._trackedClientConnections[key];
	}

	/**
	 * Get the fdc3 usage from a window.
	 * @param id The if of the view to get the info from.
	 * @returns The api metadata.
	 */
	private async captureWindowApiUsage(id: OpenFin.ClientIdentity): Promise<ApiMetadata | undefined> {
		try {
			const target = fin.Window.wrapSync(id);
			const options = await target.getOptions();
			if (!isEmpty(options.fdc3InteropApi)) {
				return {
					type: "fdc3",
					version: options.fdc3InteropApi
				};
			}
		} catch {}
	}

	/**
	 * Get the dc3 usage from a view.
	 * @param id The id of the window to get the info from.
	 * @returns The api metadata.
	 */
	private async captureViewApiUsage(id: OpenFin.ClientIdentity): Promise<ApiMetadata | undefined> {
		try {
			const target = fin.View.wrapSync(id);
			const options = await target.getOptions();
			if (!isEmpty(options.fdc3InteropApi)) {
				return {
					type: "fdc3",
					version: options.fdc3InteropApi
				};
			}
		} catch {}
	}

	/**
	 * Get a key that can be used for an identity and client.
	 * @param identity The identity to use in the key.
	 * @param type The type of ready event you are looking for
	 * @param name The name of the type if required to use in the key
	 * @returns The key.
	 */
	private getClientReadyKey(
		identity: OpenFin.Identity,
		type: "connection" | "context" | "intent",
		name?: string
	): string {
		if (isEmpty(name)) {
			return `${identity.uuid}/${identity.name}/${type}`;
		}
		return `${identity.uuid}/${identity.name}/${type}/${name}`;
	}
}
