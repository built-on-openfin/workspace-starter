import {
	OpenError,
	ResolveError,
	type AppIdentifier,
	type AppMetadata,
	type ImplementationMetadata,
	type IntentResolution
} from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import { getApp, getApps } from "../apps";
import * as connectionProvider from "../connections";
import { hasEndpoint, requestResponse } from "../endpoint";
import { mapToAppMetaData as mapTo12AppMetaData } from "../fdc3/1.2/mapper";
import { mapToAppMetaData as mapTo20AppMetaData } from "../fdc3/2.0/mapper";
import { bringToFront, launch } from "../launch";
import { createLogger } from "../logger-provider";
import { MANIFEST_TYPES } from "../manifest-types";
import { getSettings } from "../settings";
import type { AppsForIntent, PlatformApp, PlatformAppIdentifier } from "../shapes/app-shapes";
import type { AppMetadata as AppMetadataV1Point2 } from "../shapes/fdc3-1-2-shapes";
import type {
	ApiMetadata,
	CaptureApiPayload,
	ContextToProcess,
	IntentOptions,
	OpenOptions,
	IntentResolverResponse,
	IntentRegistrationPayload,
	IntentResolverOptions,
	IntentTargetMetaData,
	ProcessedContext
} from "../shapes/interopbroker-shapes";
import { formatError, isEmpty, isString, isStringValue, sanitizeString } from "../utils";
import { AppIntentHelper } from "./broker/app-intent-helper";
import { ClientRegistrationHelper } from "./broker/client-registration-helper";
import { IntentResolverHelper } from "./broker/intent-resolver-helper";

const logger = createLogger("InteropBroker");

/**
 * Override the platform interop.
 * @param InteropBroker The base interop broker class.
 * @returns The overloaded broker.
 */
export function interopOverride(
	InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>
): OpenFin.InteropBroker {
	/**
	 * Extend the InteropBroker to handle intents.
	 */
	class InteropOverride extends InteropBroker {
		private _intentOptions?: IntentOptions;

		private _openOptions?: OpenOptions;

		private _unregisteredApp: PlatformApp | undefined;

		private readonly _appIntentHelper: AppIntentHelper;

		private readonly _clientRegistrationHelper: ClientRegistrationHelper;

		private _intentResolverHelper?: IntentResolverHelper;

		/**
		 * Create a new instance of InteropBroker.
		 */
		constructor() {
			super();
			logger.info("Interop Broker Constructor fetching settings.");
			this._appIntentHelper = new AppIntentHelper(getApps, logger);
			this._clientRegistrationHelper = new ClientRegistrationHelper(
				async (clientIdentity: OpenFin.ClientIdentity) => this.lookupAppId(clientIdentity),
				logger
			);
			getSettings()
				.then((customSettings) => {
					if (!isEmpty(customSettings?.platformProvider)) {
						if (
							isEmpty(customSettings?.platformProvider?.interop?.intentResolver) &&
							!isEmpty(customSettings?.platformProvider?.intentPicker)
						) {
							logger.warn(
								"Please use platformProvider.interop.intentResolver instead of platformProvider.intentPicker for your settings."
							);
						}
						const intentResolverOptions: IntentResolverOptions = customSettings?.platformProvider?.interop
							?.intentResolver ??
							customSettings.platformProvider.intentPicker ?? {
								fdc3InteropApi: "2.0",
								url: `${customSettings?.platformProvider?.rootUrl}/common/windows/intents/instance-picker.html`,
								title: "Intent Resolver"
							};
						this._intentResolverHelper = new IntentResolverHelper(
							intentResolverOptions,
							logger,
							customSettings?.platformProvider?.interop?.unregisteredApp?.appId
						);
						this._intentOptions = {
							intentTimeout: 15000,
							...customSettings?.platformProvider?.interop?.intentOptions
						};
						this._openOptions = {
							openStrategy: "fdc3",
							...customSettings?.platformProvider?.interop?.openOptions
						};
						this._unregisteredApp = customSettings?.platformProvider?.interop?.unregisteredApp;
						if (!isEmpty(this._unregisteredApp)) {
							this._unregisteredApp.manifestType = MANIFEST_TYPES.UnregisteredApp.id;
						}
						return true;
					}
					return false;
				})
				.catch((error) => {
					logger.error("Settings unavailable at broker construction.", error);
				});
		}

		/**
		 * Is the connection authorized.
		 * @param id The id of the client identity to check.
		 * @param payload The payload to send with the authorization check.
		 * @returns True if the connection is authorized.
		 */
		public async isConnectionAuthorized(id: OpenFin.ClientIdentity, payload?: unknown): Promise<boolean> {
			logger.info("Interop connection being made by the following identity. About to verify connection", id);
			const response = await connectionProvider.isConnectionValid(id, payload, { type: "broker" });
			if (response.isValid) {
				logger.info("Connection validation request was validated and is valid.");
				await this._clientRegistrationHelper.clientConnectionRegistered(id, payload as CaptureApiPayload);
			} else {
				logger.warn(`Connection request from ${JSON.stringify(id)} was validated and rejected.`);
			}
			return response.isValid;
		}

		/**
		 * Sets a context for the context group of the incoming current entity.
		 * @param sentContext New context to set.
		 * @param sentContext.context The context to send.
		 * @param clientIdentity Identity of the client sender.
		 */
		public async setContext(
			sentContext: { context: OpenFin.Context },
			clientIdentity: OpenFin.ClientIdentity
		): Promise<void> {
			sentContext.context = await this.processContext(sentContext.context);
			super.setContext(sentContext, clientIdentity);
		}

		/**
		 * Handle the information for intents by context.
		 * @param contextOptions The context options.
		 * @param clientIdentity The client.
		 * @returns The intents mapped to app metadata.
		 */
		public async handleInfoForIntentsByContext(
			contextOptions: OpenFin.Context | OpenFin.FindIntentsByContextOptions,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<
			{
				intent: { name: string; displayName?: string };
				apps: (AppMetadataV1Point2 | AppMetadata)[];
			}[]
		> {
			let requestedContextType: string;
			let requestedResultType: string | undefined;
			let request: { context: { type: string }; metadata: { resultType: string } };
			const apiVersion: ApiMetadata | undefined =
				this._clientRegistrationHelper.getApiVersion(clientIdentity);

			if ("type" in contextOptions) {
				requestedContextType = contextOptions.type;
			} else {
				request = contextOptions as { context: { type: string }; metadata: { resultType: string } };
				requestedContextType = request.context.type;
				requestedResultType = request.metadata.resultType;
			}
			const intents = await this._appIntentHelper.getIntentsByContext(
				requestedContextType,
				requestedResultType
			);

			if (intents.length === 0) {
				throw new Error(ResolveError.NoAppsFound);
			}

			const isFDC32 = apiVersion?.type === "fdc3" && apiVersion.version === "2.0";
			const mappedIntents = intents.map((entry) => ({
				intent: entry.intent,
				apps: entry.apps.map((app) => {
					let resultType: string | undefined;
					const listensFor = app?.interop?.intents?.listensFor;
					if (!isEmpty(listensFor) && !isEmpty(listensFor[entry.intent.name])) {
						resultType = listensFor[entry.intent.name].resultType;
					}
					const appEntry = isFDC32 ? mapTo20AppMetaData(app, resultType) : mapTo12AppMetaData(app);

					return appEntry;
				})
			}));

			return mappedIntents;
		}

		/**
		 * Handle the information for and intent.
		 * @param intentOptions The intent options.
		 * @param clientIdentity The client.
		 * @returns The intents mapped to app metadata.
		 */
		public async handleInfoForIntent(
			intentOptions: OpenFin.InfoForIntentOptions,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<{
			intent: { name: string; displayName?: string };
			apps: (AppMetadataV1Point2 | AppMetadata)[];
		}> {
			const apiVersion: ApiMetadata | undefined =
				this._clientRegistrationHelper.getApiVersion(clientIdentity);
			let contextType: string | undefined;

			const optContextType = intentOptions?.context?.type;
			if (!isEmpty(optContextType) && optContextType !== "fdc3.nothing") {
				contextType = optContextType;
			}

			const result = await this._appIntentHelper.getIntent(
				intentOptions.name,
				contextType,
				intentOptions?.metadata?.resultType
			);
			if (isEmpty(result)) {
				throw new Error(ResolveError.NoAppsFound);
			}

			const isFDC32 = apiVersion?.type === "fdc3" && apiVersion.version === "2.0";
			const response = {
				intent: result.intent,
				apps: result.apps.map((app) => {
					let resultType: string | undefined;
					const listensFor = app?.interop?.intents?.listensFor;
					if (!isEmpty(listensFor) && !isEmpty(listensFor[result.intent.name])) {
						resultType = listensFor[result.intent.name].resultType;
					}
					const appEntry = isFDC32 ? mapTo20AppMetaData(app, resultType) : mapTo12AppMetaData(app);

					return appEntry;
				})
			};

			return response;
		}

		/**
		 * Handle the fired intent for context.
		 * @param contextForIntent The context for the intent.
		 * @param contextForIntent.type The type of the intent.
		 * @param contextForIntent.metadata The metadata for the intent.
		 * @param clientIdentity The client identity.
		 * @returns The intent resolution.
		 */
		public async handleFiredIntentForContext(
			contextForIntent: { type: string; metadata?: OpenFin.IntentMetadata<IntentTargetMetaData> },
			clientIdentity: OpenFin.ClientIdentity
		): Promise<Omit<IntentResolution, "getResult"> | { source: string; version?: string }> {
			const targetAppIdentifier = this.getApplicationIdentity(contextForIntent.metadata);
			const usesAppIdentity = this.usesApplicationIdentity(clientIdentity);
			const intent: Partial<OpenFin.Intent & { displayName?: string }> = {
				context: contextForIntent
			};

			const intentsForSelection: AppsForIntent[] = await this._appIntentHelper.getIntentsByContext(
				contextForIntent.type
			);

			// app specified flow
			if (!isEmpty(targetAppIdentifier)) {
				const targetApp = await getApp(targetAppIdentifier.appId);

				if (isEmpty(targetApp)) {
					throw new Error(ResolveError.TargetAppUnavailable);
				}
				if (
					!targetApp?.interop?.intents?.listensFor ||
					!Object.values(targetApp.interop.intents.listensFor).some((listenedForIntent) =>
						listenedForIntent.contexts.includes(contextForIntent.type)
					)
				) {
					throw new Error(ResolveError.NoAppsFound);
				}
				const intentResolver = await this.handleTargetedIntent(
					targetAppIdentifier,
					intent as OpenFin.Intent,
					true,
					clientIdentity
				);
				return this.shapeIntentResolver(intentResolver, usesAppIdentity);
			}

			// check for unregistered app intent handlers (if enabled)
			const unregisteredAppIntents = await this.getUnregisteredAppIntentByContext(
				contextForIntent.type,
				clientIdentity
			);

			if (unregisteredAppIntents.length > 0 && !isEmpty(this._unregisteredApp)) {
				const matchedIntents: string[] = [];
				for (const intentForSelection of intentsForSelection) {
					if (unregisteredAppIntents.includes(intentForSelection.intent.name)) {
						intentForSelection.apps.push(this._unregisteredApp);
						matchedIntents.push(intentForSelection.intent.name);
					}
				}
				const missingIntentMatches = unregisteredAppIntents.filter(
					(intentName) => !matchedIntents.includes(intentName)
				);

				for (const missingIntentMatch of missingIntentMatches) {
					const missingIntent = this._unregisteredApp.intents?.find(
						(entry) => entry.name === missingIntentMatch
					);
					if (missingIntent) {
						intentsForSelection.push({
							intent: { name: missingIntent.name, displayName: missingIntent.displayName },
							apps: [this._unregisteredApp]
						});
					}
				}
			}

			let userSelection: IntentResolverResponse | undefined;

			if (intentsForSelection.length === 1) {
				const intentForSelection = intentsForSelection[0];
				// only one intent matches the passed context
				intent.name = intentForSelection.intent.name;
				intent.displayName = intentForSelection.intent.displayName;

				if (intentForSelection.apps.length === 1) {
					const appInstances = await this._clientRegistrationHelper.findAppInstances(
						intentForSelection.apps[0],
						clientIdentity,
						"intent"
					);
					// if there are no instances launch a new one otherwise present the choice to the user
					// by falling through to the next code block
					if (appInstances.length === 0 || this.createNewInstance(intentForSelection.apps[0])) {
						const intentResolver = await this.launchAppWithIntent(
							intentForSelection.apps[0],
							intent as OpenFin.Intent
						);
						if (isEmpty(intentResolver)) {
							throw new Error(ResolveError.NoAppsFound);
						}
						return this.shapeIntentResolver(intentResolver, usesAppIdentity);
					}
				}
				userSelection = await this._intentResolverHelper?.launchIntentResolver(
					{
						apps: intentsForSelection[0].apps,
						intent
					},
					clientIdentity
				);
			} else {
				userSelection = await this._intentResolverHelper?.launchIntentResolver(
					{
						intent,
						intents: intentsForSelection
					},
					clientIdentity
				);
			}
			// update intent with user selection
			if (isEmpty(userSelection)) {
				throw new Error(ResolveError.ResolverUnavailable);
			}
			intent.displayName = userSelection.intent.displayName;
			intent.name = userSelection.intent.name;
			const intentResolver = await this.handleIntentPickerSelection(userSelection, intent as OpenFin.Intent);
			return this.shapeIntentResolver(intentResolver, usesAppIdentity);
		}

		/**
		 * Handle a fired intent.
		 * @param intent The intent to handle.
		 * @param clientIdentity The client identity.
		 * @returns The intent resolution.
		 */
		public async handleFiredIntent(
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<Omit<IntentResolution, "getResult"> | { source: string; version?: string }> {
			logger.info("Received request for a raised intent", intent);
			const targetAppIdentifier = this.getApplicationIdentity(intent.metadata);
			const usesAppIdentifier = this.usesApplicationIdentity(clientIdentity);

			const matchedIntents = await this._appIntentHelper.getIntent(intent.name, intent?.context?.type);
			const intentApps: PlatformApp[] = [];

			if (!isEmpty(matchedIntents)) {
				intentApps.push(...matchedIntents.apps);
			}
			if (!isEmpty(targetAppIdentifier)) {
				const targetApp = await getApp(targetAppIdentifier.appId);
				if (isEmpty(targetApp)) {
					throw new Error(ResolveError.TargetAppUnavailable);
				}
				// ensure that the specified app is one of the intent apps
				if (!intentApps.some((app) => app.appId === targetAppIdentifier.appId)) {
					throw new Error(ResolveError.NoAppsFound);
				}
				const intentResolver = await this.handleTargetedIntent(
					targetAppIdentifier,
					intent,
					false,
					clientIdentity
				);
				return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
			}

			if (
				this._unregisteredApp &&
				(await this.canAddUnregisteredApp(clientIdentity, intent.name, intent?.context?.type))
			) {
				// We have unregistered app instances that support this intent and support for unregistered instances is enabled
				intentApps.push(this._unregisteredApp);
			}

			if (intentApps.length === 0) {
				logger.info("No apps support this intent");
				throw new Error(ResolveError.NoAppsFound);
			}

			if (intentApps.length === 1) {
				// handle single entry
				const appInstances = await this._clientRegistrationHelper.findAppInstances(
					intentApps[0],
					clientIdentity,
					"intent"
				);
				// if there are no instances launch a new one otherwise present the choice to the user
				// by falling through to the next code block
				let appInstanceId: string | undefined;
				if (appInstances.length === 1) {
					appInstanceId = appInstances[0].instanceId;
				}
				if (
					appInstances.length === 0 ||
					this.useSingleInstance(intentApps[0]) ||
					this.createNewInstance(intentApps[0])
				) {
					const intentResolver = await this.launchAppWithIntent(intentApps[0], intent, appInstanceId);
					if (isEmpty(intentResolver)) {
						throw new Error(ResolveError.NoAppsFound);
					}
					return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
				}
			}

			const userSelection = await this._intentResolverHelper?.launchIntentResolver(
				{
					apps: intentApps,
					intent
				},
				clientIdentity
			);

			if (isEmpty(userSelection)) {
				throw new Error(ResolveError.ResolverUnavailable);
			}

			const intentResolver = await this.handleIntentPickerSelection(userSelection, intent);
			return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
		}

		/**
		 * Handle the FDC3 open.
		 * @param fdc3OpenOptions The options for the open.
		 * @param fdc3OpenOptions.app The platform app or its id.
		 * @param fdc3OpenOptions.context The context being opened.
		 * @param clientIdentity The client identity.
		 * @returns The application identifier.
		 */
		public async fdc3HandleOpen(
			fdc3OpenOptions: { app: PlatformApp | string; context: OpenFin.Context },
			clientIdentity: OpenFin.ClientIdentity
		): Promise<AppIdentifier> {
			if (isEmpty(fdc3OpenOptions?.app)) {
				logger.error("A request to fdc3.open did not pass an fdc3OpenOptions object");
				throw new Error(ResolveError.NoAppsFound);
			}

			const requestedId = isString(fdc3OpenOptions.app)
				? fdc3OpenOptions.app
				: fdc3OpenOptions.app.appId ?? fdc3OpenOptions.app.name;
			const openAppIntent: OpenFin.Intent = {
				context: fdc3OpenOptions.context,
				name: "OpenApp",
				metadata: {
					target: { appId: requestedId }
				}
			};
			logger.info(
				`A request to Open has been sent to the platform by uuid: ${clientIdentity?.uuid}, name: ${clientIdentity?.name}, endpointId: ${clientIdentity.endpointId} with passed context:`,
				fdc3OpenOptions.context
			);
			try {
				const isOpenByIntent = this._openOptions?.openStrategy === "intent";
				let appId: string | undefined;
				let instanceId: string | undefined;

				const requestedApp = await getApp(requestedId);
				if (isEmpty(requestedApp)) {
					throw new Error(OpenError.AppNotFound);
				}

				if (isOpenByIntent) {
					const result = await this.launchAppWithIntent(requestedApp, openAppIntent);
					if (isString(result.source)) {
						appId = result.source;
					} else {
						appId = result.source.appId;
						instanceId = result.source.instanceId;
					}
				} else {
					const platformIdentities = await launch(requestedApp);
					if (!isEmpty(platformIdentities) && platformIdentities?.length > 0) {
						appId = platformIdentities[0].appId;
						const openTimeout: number | undefined = this._openOptions?.connectionTimeout;
						// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
						instanceId = await this._clientRegistrationHelper.onConnectionClientReady(
							platformIdentities[0],
							openTimeout
						);
						if (platformIdentities.length > 1) {
							logger.warn(
								"Open can only return one app and instance id and multiple instances were launched as a result. Returning the first instance. Returned instances: ",
								platformIdentities
							);
						}
						if (!isEmpty(fdc3OpenOptions?.context)) {
							const contextTimeout: number | undefined = this._intentOptions?.intentTimeout;
							const contextTypeName = fdc3OpenOptions.context.type;
							// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
							const clientReadyInstanceId = await this._clientRegistrationHelper.onContextClientReady(
								platformIdentities[0],
								contextTypeName,
								contextTimeout
							);

							let trackedHandler = this._clientRegistrationHelper.getRegisteredContextHandler(
								contextTypeName,
								clientReadyInstanceId
							);

							if (isEmpty(trackedHandler)) {
								trackedHandler = this._clientRegistrationHelper.getRegisteredContextHandler(
									"*",
									clientReadyInstanceId
								);
							}

							if (!isEmpty(trackedHandler)) {
								await super.invokeContextHandler(
									trackedHandler.clientIdentity,
									trackedHandler.handlerId,
									fdc3OpenOptions.context
								);
							} else {
								logger.warn(
									`Unable to send context of type ${contextTypeName} opened app ${appId} with instanceId of ${clientReadyInstanceId} as we cannot find a tracked context handler.`
								);
							}
						}
					}
				}

				if (!isEmpty(appId)) {
					return { appId, instanceId };
				}

				// if no id returned then the likelihood is that there was a problem launching the application as a result of the open request.
				throw new Error(OpenError.ErrorOnLaunch);
			} catch (openError) {
				const error = formatError(openError);
				if (
					error === ResolveError.TargetInstanceUnavailable ||
					error === ResolveError.IntentDeliveryFailed ||
					error === ResolveError.TargetInstanceUnavailable ||
					error === OpenError.AppTimeout
				) {
					throw new Error(OpenError.AppTimeout);
				}
				throw openError;
			}
		}

		/**
		 * The client has disconnected form the broker.
		 * @param clientIdentity The identity of the client that disconnected.
		 */
		public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
			await this._clientRegistrationHelper.clientDisconnected(clientIdentity);
			await super.clientDisconnected(clientIdentity);
		}

		/**
		 * Handle FDC3 find instances.
		 * @param app The app identifier to find.
		 * @param clientIdentity The client identity.
		 * @returns The instance of the app.
		 */
		public async fdc3HandleFindInstances(
			app: AppIdentifier,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<AppIdentifier[]> {
			return this._clientRegistrationHelper.findAppInstances(app, clientIdentity);
		}

		/**
		 * Handle request to get FDC3 app metadata.
		 * @param app The app to get the metadata for.
		 * @param clientIdentity The client identity.
		 * @returns The app metadata.
		 */
		public async fdc3HandleGetAppMetadata(
			app: AppIdentifier,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<AppMetadata> {
			logger.info("fdc3HandleGetAppMetadata call received.", app, clientIdentity);
			// this will only be called by FDC3 2.0+
			let platformApp = await getApp(app.appId);
			if (isEmpty(platformApp) && app.appId === this._unregisteredApp?.appId) {
				platformApp = this._unregisteredApp;
			}
			if (!isEmpty(platformApp)) {
				const appMetaData: AppMetadata = mapTo20AppMetaData(platformApp);
				if (!isEmpty(app.instanceId)) {
					const allConnectedClients = await this.getAllClientInfo();
					const connectedClient = allConnectedClients.find((client) => client.endpointId === app.instanceId);
					if (!isEmpty(connectedClient) && connectedClient.uuid === fin.me.identity.uuid) {
						const identity = { uuid: connectedClient.uuid, name: connectedClient.name };
						let title: string | undefined;
						let preview: string | undefined;
						try {
							if (connectedClient.entityType === "window") {
								const instanceWindow = fin.Window.wrapSync(identity);
								const isVisibleUserWindow = await instanceWindow.isShowing();
								if (isVisibleUserWindow) {
									const windowInfo = await instanceWindow.getInfo();
									title = windowInfo.title;
									preview = await this.getPreviewImage(instanceWindow);
								}
							} else {
								const instanceView = fin.View.wrapSync(identity);
								const viewInfo = await instanceView.getInfo();
								title = viewInfo.title;
								preview = await this.getPreviewImage(instanceView);
							}
						} catch (error) {
							logger.warn(
								`A connected client could not be queried for data. It could be it hasn't unregistered itself from the broker. AppId: ${app.appId}, instanceId: ${app.instanceId}, name: ${identity.name}`,
								error
							);
						}
						if (!isEmpty(title)) {
							// ensure no element tags are provided in the title
							// we don't know how this information will be used
							// and title hasn't come from the app directory
							title = sanitizeString(title);
						}
						const instanceAppMeta: AppMetadata = {
							...appMetaData,
							instanceId: app.instanceId,
							instanceMetadata: { title, preview }
						};
						return instanceAppMeta;
					}
				}
				return appMetaData;
			}
			throw new Error("TargetAppUnavailable");
		}

		/**
		 * Handle the request to get FDC3 info.
		 * @param payload The payload.
		 * @param payload.fdc3Version The version info to get.
		 * @param clientIdentity The client identity.
		 * @returns The info.
		 */
		public async fdc3HandleGetInfo(
			payload: {
				fdc3Version: string;
			},
			clientIdentity: OpenFin.ClientIdentity
		): Promise<unknown> {
			logger.info("fdc3HandleGetInfo", payload, clientIdentity);
			if (payload?.fdc3Version === "2.0") {
				const response: ImplementationMetadata = (await super.fdc3HandleGetInfo(
					payload,
					clientIdentity
				)) as ImplementationMetadata;
				const appId = await this.lookupAppId(clientIdentity);
				if (!isEmpty(appId)) {
					const updatedResponse = {
						...response,
						appMetadata: { appId, instanceId: clientIdentity.endpointId }
					};
					return updatedResponse;
				}
				return response;
			}
			return super.fdc3HandleGetInfo(payload, clientIdentity);
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
			await this._clientRegistrationHelper.intentHandlerRegistered(payload, clientIdentity);
			await super.intentHandlerRegistered(payload, clientIdentity);
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
			await this._clientRegistrationHelper.contextHandlerRegistered(payload, clientIdentity);
			super.contextHandlerRegistered(payload, clientIdentity);
		}

		/**
		 * Launch an app with intent.
		 * @param app The application to launch.
		 * @param intent The intent to open it with.
		 * @param instanceId The instance of the app.
		 * @returns The intent resolution.
		 */
		private async launchAppWithIntent(
			app: PlatformApp,
			intent: OpenFin.Intent,
			instanceId?: string
		): Promise<Omit<IntentResolution, "getResult">> {
			logger.info("Launching app with intent");
			let platformIdentities: PlatformAppIdentifier[] | undefined = [];
			let existingInstance = true;

			if (!isEmpty(intent?.context)) {
				intent.context = await this.processContext(intent.context);
			}

			if (!isEmpty(instanceId)) {
				// an instance of an application was selected
				const allConnectedClients = await this.getAllClientInfo();
				const clientInfo = allConnectedClients.find(
					(connectedClient) => connectedClient.endpointId === instanceId
				);
				if (!isEmpty(clientInfo)) {
					logger.info(`App Id: ${app.appId} and instance Id: ${instanceId} was provided and found.`);
					// the connected instance is available
					platformIdentities.push({
						uuid: clientInfo.uuid,
						name: clientInfo.name,
						appId: app.appId,
						instanceId: clientInfo.endpointId
					});
				} else {
					throw new Error(ResolveError.TargetInstanceUnavailable);
				}
			}

			if (platformIdentities.length === 0) {
				platformIdentities = await launch(app);
				if (!platformIdentities?.length) {
					throw new Error(ResolveError.IntentDeliveryFailed);
				}
				existingInstance = false;
				if (platformIdentities.length === 1) {
					const intentTimeout: number | undefined = this._intentOptions?.intentTimeout;
					// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
					try {
						instanceId = await this._clientRegistrationHelper.onIntentClientReady(
							platformIdentities[0],
							intent.name,
							intentTimeout
						);
					} catch (intentReadyError) {
						logger.warn(
							"An error occurred while getting a instance to target an intent at.",
							intentReadyError
						);
						throw new Error(ResolveError.IntentDeliveryFailed);
					}
				}
			}

			for (const target of platformIdentities) {
				await super.setIntentTarget(intent, target);
				if (existingInstance) {
					try {
						await bringToFront(app, [target]);
					} catch (bringToFrontError) {
						logger.warn(
							`There was an error bringing app: ${target.appId}, and instance ${target.instanceId} with name: ${target.name} to front.`,
							bringToFrontError
						);
					}
				}
			}

			return {
				source: { appId: app.appId, instanceId },
				version: app.version,
				intent: intent.name
			};
		}

		/**
		 * Handle the intent picker selection.
		 * @param userSelection The user selection from the intent picker.
		 * @param intent The intent.
		 * @returns The intent resolution.
		 */
		private async handleIntentPickerSelection(
			userSelection: IntentResolverResponse,
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>
		): Promise<Omit<IntentResolution, "getResult">> {
			let selectedApp = await getApp(userSelection.appId);
			if (isEmpty(selectedApp) && !isEmpty(this._unregisteredApp)) {
				selectedApp = this._unregisteredApp;
			}
			if (isEmpty(selectedApp)) {
				throw new Error(ResolveError.NoAppsFound);
			}
			const instanceId: string | undefined = userSelection.instanceId;
			const intentResolver = await this.launchAppWithIntent(selectedApp, intent, instanceId);
			if (isEmpty(intentResolver)) {
				throw new Error(ResolveError.NoAppsFound);
			}
			return intentResolver;
		}

		/**
		 * Handle a targeted intent.
		 * @param targetAppIdentifier The identifier for the target app.
		 * @param intent The intent.
		 * @param targetByContext Perform the target by context.
		 * @param clientIdentity The client identity.
		 * @returns The intent resolution.
		 */
		private async handleTargetedIntent(
			targetAppIdentifier: AppIdentifier,
			intent: OpenFin.Intent,
			targetByContext: boolean,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<Omit<IntentResolution, "getResult">> {
			// app specified flow
			const intentsForSelection: AppsForIntent[] = [];
			let targetApp = await getApp(targetAppIdentifier.appId);

			// if the specified app isn't available then let the caller know
			if (isEmpty(targetApp)) {
				if (
					!isEmpty(targetAppIdentifier.instanceId) &&
					targetAppIdentifier.appId === this._unregisteredApp?.appId
				) {
					targetApp = this._unregisteredApp;
				} else {
					throw new Error(ResolveError.TargetAppUnavailable);
				}
			}
			// if an instanceId is specified then check to see if it is valid and if it isn't inform the caller
			if (!isEmpty(targetAppIdentifier.instanceId)) {
				const availableAppInstances = await this._clientRegistrationHelper.findAppInstances(
					targetAppIdentifier,
					clientIdentity,
					"intent"
				);
				if (
					availableAppInstances.length === 0 ||
					!availableAppInstances.some(
						(entry) =>
							// eslint-disable-next-line max-len
							entry.appId === targetAppIdentifier.appId && entry.instanceId === targetAppIdentifier.instanceId
					)
				) {
					throw new Error(ResolveError.TargetInstanceUnavailable);
				}
			}

			if (!Array.isArray(targetApp.intents) || targetApp.intents.length === 0) {
				// an app was specified but it doesn't have any intents. Indicate that something is wrong
				throw new Error(ResolveError.TargetAppUnavailable);
			}

			const supportedIntents = targetApp.intents.filter((intentEntry) => {
				let contextMatch: boolean = true;
				const contextType = intent.context?.type;
				if (!isEmpty(contextType)) {
					contextMatch = intentEntry.contexts?.includes(contextType);
					if (targetByContext) {
						return contextMatch;
					}
				}
				return intentEntry.name === intent.name && contextMatch;
			});

			if (supportedIntents.length === 0) {
				// the specified app does have intent support but just none that support this context type
				throw new Error(ResolveError.TargetAppUnavailable);
			}

			if (supportedIntents.length === 1) {
				// a preferred name for an app was given with the context object
				// the app existed and it supported the context type and there was only one intent that supported
				// that context type. Launch the app with that intent otherwise present the user with a list of
				// everything that supports that context type
				intent.name = supportedIntents[0].name;
				// check for instances
				if (!isEmpty(targetAppIdentifier.instanceId)) {
					const intentResolver = await this.launchAppWithIntent(
						targetApp,
						intent,
						targetAppIdentifier.instanceId
					);
					return intentResolver;
				}
				const specifiedAppInstances = await this._clientRegistrationHelper.findAppInstances(
					targetApp,
					clientIdentity,
					"intent"
				);
				if (specifiedAppInstances.length === 0 || this.createNewInstance(targetApp)) {
					const intentResolver = await this.launchAppWithIntent(targetApp, intent);
					if (isEmpty(intentResolver)) {
						throw new Error(ResolveError.IntentDeliveryFailed);
					}
					return intentResolver;
				}
			}

			for (const supportedIntent of supportedIntents) {
				const appForIntent: AppsForIntent = {
					apps: [targetApp],
					intent: { name: supportedIntent.name, displayName: supportedIntent.displayName }
				};
				intentsForSelection.push(appForIntent);
			}
			let userSelection: IntentResolverResponse | undefined;
			if (intentsForSelection.length === 1) {
				if (
					!isStringValue(intent.name) &&
					!isEmpty(intentsForSelection[0]?.intent?.name) &&
					!isEmpty(intent?.context) &&
					!isEmpty(intent?.context?.type)
				) {
					logger.info(
						`A request to raise an intent was passed and the intent name was not passed but a context was ${intent?.context?.type} with 1 matching intent. Name: ${intentsForSelection[0]?.intent?.name},  Display Name: ${intentsForSelection[0]?.intent?.displayName}. Updating intent object.`
					);
					intent.name = intentsForSelection[0]?.intent?.name;
				}
				userSelection = await this._intentResolverHelper?.launchIntentResolver(
					{
						apps: intentsForSelection[0].apps,
						intent
					},
					clientIdentity
				);
			} else {
				userSelection = await this._intentResolverHelper?.launchIntentResolver(
					{
						intent,
						intents: intentsForSelection
					},
					clientIdentity
				);
				if (!isStringValue(intent.name) && !isEmpty(userSelection?.intent?.name)) {
					logger.info(
						`A request to raise an intent was passed and the following intent was selected (from a selection of ${intentsForSelection.length}). Name: ${userSelection?.intent?.name},  Display Name: ${userSelection?.intent?.displayName}. Updating intent object.`
					);
					intent.name = userSelection?.intent?.name ?? intent.name;
				}
			}
			if (isEmpty(userSelection)) {
				throw new Error(ResolveError.ResolverUnavailable);
			}

			return this.handleIntentPickerSelection(userSelection, intent);
		}

		/**
		 * Shape the intent resolver.
		 * @param intentResolver The intent resolver to shape.
		 * @param usesAppIdentifier Should it use the app identifier.
		 * @returns The shaped intent resolver.
		 */
		private shapeIntentResolver(
			intentResolver: Omit<IntentResolution, "getResult">,
			usesAppIdentifier: boolean
		): Omit<IntentResolution, "getResult"> | { source: string; version?: string } {
			if (usesAppIdentifier) {
				return intentResolver;
			}
			return { source: intentResolver.source.appId, version: intentResolver.version };
		}

		/**
		 * Should we use a single instance of the app.
		 * @param app The app to check.
		 * @returns True if we should use a single instance.
		 */
		private useSingleInstance(app: PlatformApp): boolean {
			return app?.instanceMode === "single";
		}

		/**
		 * Should we always use a new instance of the app.
		 * @param app The app to check.
		 * @returns True if we should always use a new instance.
		 */
		private createNewInstance(app: PlatformApp): boolean {
			return app?.instanceMode === "new";
		}

		/**
		 * Get a preview image for a window/view.
		 * @param target The target identity to capture.
		 * @param target.capturePage The capture page method of the entity.
		 * @param target.identity The identity of the entity being captured.
		 * @returns The captured preview image.
		 */
		private async getPreviewImage(target: {
			capturePage: (options?: OpenFin.CapturePageOptions) => Promise<string>;
			identity: OpenFin.Identity;
		}): Promise<string | undefined> {
			try {
				const preview = await target.capturePage({ format: "jpg", quality: 85 });
				if (isStringValue(preview)) {
					return preview;
				}
			} catch (error) {
				logger.error(
					`Error while trying to capture a preview image of the view/window: ${target.identity.name}`,
					error
				);
			}
		}

		/**
		 * Get the unregistered app intent by context.
		 * @param type The context type to get.
		 * @param clientIdentity The client identity.
		 * @returns The list of supported intents.
		 */
		private async getUnregisteredAppIntentByContext(
			type: string,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<string[]> {
			const intentNames: string[] = [];
			const supportedIntentNames: string[] = [];
			if (isEmpty(this?._unregisteredApp)) {
				return intentNames;
			}
			if (Array.isArray(this?._unregisteredApp?.intents)) {
				for (const intent of this._unregisteredApp.intents) {
					if (intent.contexts.includes(type)) {
						const intentName: string = intent.name;
						intentNames.push(intentName);
					}
				}
			}

			if (intentNames.length > 0) {
				// now we need to check if there are any instances as this app can not be launched as it is a placeholder for unregistered instances
				for (const intentName of intentNames) {
					if (await this.canAddUnregisteredApp(clientIdentity, intentName)) {
						supportedIntentNames.push(intentName);
					}
				}
			}
			// the unregisteredAppMeta data lists the supported intents but we only want to return intents that have active instances ready
			return supportedIntentNames;
		}

		/**
		 * Can we add an unregistered app.
		 * @param clientIdentity The client identity.
		 * @param intentName The intent name.
		 * @param contextType The context type.
		 * @returns True if we can add the app.
		 */
		private async canAddUnregisteredApp(
			clientIdentity: OpenFin.ClientIdentity,
			intentName?: string,
			contextType?: string
		): Promise<boolean> {
			if (isEmpty(this?._unregisteredApp)) {
				return false;
			}

			const listensFor = this._unregisteredApp?.interop?.intents?.listensFor;

			if (!isEmpty(intentName) && (isEmpty(listensFor) || isEmpty(listensFor[intentName]))) {
				return false;
			}

			if (
				!isEmpty(contextType) &&
				!isEmpty(listensFor) &&
				!isEmpty(intentName) &&
				!listensFor[intentName].contexts.includes(contextType)
			) {
				return false;
			}

			const instances = await this._clientRegistrationHelper.findAppInstances(
				{ appId: this._unregisteredApp.appId },
				clientIdentity,
				"intent"
			);

			return instances.length > 0;
		}

		/**
		 * Get an application identity.
		 * @param metadata The metadata for the app.
		 * @returns The app identifier.
		 */
		private getApplicationIdentity(
			metadata: OpenFin.IntentMetadata<IntentTargetMetaData> | undefined
		): AppIdentifier | undefined {
			const target = metadata?.target;
			if (isEmpty(target)) {
				return;
			}
			if (isString(target)) {
				if (target.trim().length === 0) {
					return undefined;
				}
				return { appId: target };
			}

			if (isEmpty(target.appId)) {
				return undefined;
			}

			return { appId: target.appId, instanceId: target.instanceId };
		}

		/**
		 * Does the app use application identity.
		 * @param clientIdentity The client app to check.
		 * @returns True if the app uses application identity.
		 */
		private usesApplicationIdentity(clientIdentity: OpenFin.ClientIdentity): boolean {
			const apiMetadata = this._clientRegistrationHelper.getApiVersion(clientIdentity);
			if (isEmpty(apiMetadata)) {
				return false;
			}
			return apiMetadata.type === "fdc3" && apiMetadata.version === "2.0";
		}

		/**
		 * Lookup an application identity.
		 * @param clientIdentity The client identity to use.
		 * @returns The application identity.
		 */
		private async lookupAppId(clientIdentity: OpenFin.ClientIdentity): Promise<string | undefined> {
			const nameParts = clientIdentity.name.split("/");
			let app: PlatformApp | undefined;

			if (nameParts.length === 1 || nameParts.length === 2) {
				app = await getApp(nameParts[0]);
			}
			if (nameParts.length > 2) {
				app = await getApp(`${nameParts[0]}/${nameParts[1]}`);
			}

			const appNotFound = isEmpty(app);

			if (appNotFound && clientIdentity.uuid !== fin.me.identity.uuid) {
				logger.warn("Lookup made by a non-registered app that is outside of this platform.", clientIdentity);
				return;
			}

			if (appNotFound && isEmpty(this._unregisteredApp)) {
				logger.warn(
					"Lookup made by a non-registered app that falls under this platform. No unregistered placeholder app is specified.",
					clientIdentity
				);
				return;
			}

			if (appNotFound) {
				app = this._unregisteredApp;
				logger.info("Assigned the following unregistered app to represent the app.", app);
			}
			return app?.appId;
		}

		/**
		 * Process a context.
		 * @param context The context to process.
		 * @returns The processed context.
		 */
		private async processContext(context: OpenFin.Context): Promise<OpenFin.Context> {
			const endpointId = `interopbroker.process.${context.type}`;
			if (hasEndpoint(endpointId)) {
				logger.info(`Processing context ${context.type} with endpoint ${endpointId}`);
				const processedContext = await requestResponse<ContextToProcess, ProcessedContext>(endpointId, {
					context
				});
				if (processedContext?.context) {
					return processedContext?.context;
				}
			}
			return context;
		}
	}

	return new InteropOverride();
}
