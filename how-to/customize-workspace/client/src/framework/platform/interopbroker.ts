import {
	AppIdentifier,
	AppMetadata,
	ImplementationMetadata,
	IntentResolution,
	ResolveError
} from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import type { ClientIdentity } from "@openfin/core/src/OpenFin";
import type { AppIntent } from "@openfin/workspace-platform";
import type {
	IntentOptions,
	IntentResolverOptions,
	IntentPickerResponse,
	IntentRegistrationEntry,
	IntentRegistrationPayload,
	IntentTargetMetaData,
	ApiMetadata
} from "customize-workspace/shapes/interopbroker-shapes";
import { getApp, getAppsByIntent, getIntent, getIntentsByContext } from "../apps";
import * as connectionProvider from "../connections";
import { mapToAppMetaData as mapTo12AppMetaData } from "../fdc3/1.2/mapper";
import { mapToAppMetaData as mapTo20AppMetaData } from "../fdc3/2.0/mapper";
import { bringToFront, launch } from "../launch";
import { createLogger } from "../logger-provider";
import { manifestTypes } from "../manifest-types";
import { getSettings } from "../settings";
import type { AppsForIntent, PlatformApp, PlatformAppIdentifier } from "../shapes/app-shapes";

const logger = createLogger("InteropBroker");

export function interopOverride(
	InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>
): OpenFin.InteropBroker {
	class InteropOverride extends InteropBroker {
		private readonly _trackedIntentHandlers: { [key: string]: IntentRegistrationEntry[] } = {};

		private readonly _clientReadyRequests: { [key: string]: (instanceId: string) => void } = {};

		private readonly _trackedClientConnections: { [key: string]: ApiMetadata } = {};

		private _intentResolverOptions: IntentResolverOptions;

		private _intentOptions: IntentOptions;

		private _unregisteredApp: PlatformApp;

		constructor() {
			super();
			logger.info("Interop Broker Constructor fetching settings.");
			getSettings()
				.then((customSettings) => {
					if (customSettings?.platformProvider !== undefined) {
						let intentResolverOptions: IntentResolverOptions;
						if (
							customSettings?.platformProvider?.interop?.intentResolver === undefined &&
							customSettings?.platformProvider?.intentPicker !== undefined
						) {
							logger.warn(
								"Please use platformProvider.interop.intentResolver instead of platformProvider.intentPicker for your settings."
							);
							intentResolverOptions = customSettings.platformProvider.intentPicker;
						} else {
							intentResolverOptions = customSettings?.platformProvider?.interop?.intentResolver;
						}
						this._intentResolverOptions = {
							height: 715,
							width: 665,
							fdc3InteropApi: "2.0",
							url: window.location.href.replace(
								"platform/provider.html",
								"common/windows/intents/instance-picker.html"
							),
							title: "Intent Resolver",
							...intentResolverOptions
						};
						// eslint-disable-next-line max-len
						this._intentOptions = {
							intentTimeout: 5000,
							...customSettings?.platformProvider?.interop?.intentOptions
						};
						this._unregisteredApp = customSettings?.platformProvider?.interop?.unregisteredApp;
						if (this._unregisteredApp !== undefined) {
							this._unregisteredApp.manifestType = manifestTypes.unregisteredApp.id;
						}
						return true;
					}
					return false;
				})
				.catch((error) => {
					logger.error("Settings unavailable at broker construction.", error);
				});
		}

		public async isConnectionAuthorized(id: OpenFin.ClientIdentity, payload?: unknown): Promise<boolean> {
			logger.info("Interop connection being made by the following identity. About to verify connection", id);
			const response = await connectionProvider.isConnectionValid(id, payload, { type: "broker" });
			if (!response.isValid) {
				logger.warn(`Connection request from ${JSON.stringify(id)} was validated and rejected.`);
			} else {
				logger.info("Connection validation request was validated and is valid.");
				if (id.uuid === fin.me.identity.uuid) {
					// determine what api they are using.
				}
			}
			if (response.isValid) {
				await this.captureApiVersion(id, payload);
			}
			return response.isValid;
		}

		public async isActionAuthorized(
			action: string,
			payload: unknown,
			identity: OpenFin.ClientIdentity
		): Promise<boolean> {
			logger.info("Is action authorized", action, payload, identity);
			// perform check here if you wish and return true/false accordingly
			return true;
		}

		public async handleInfoForIntentsByContext(
			contextOptions: OpenFin.Context | OpenFin.FindIntentsByContextOptions,
			clientIdentity: OpenFin.ClientIdentity
		) {
			const apiVersion: ApiMetadata = this.getApiVersion(clientIdentity);
			let requestedContextType: string;
			let requestedResultType: string;
			let request: { context: { type: string }; metadata: { resultType: string } };
			// eslint-disable-next-line @typescript-eslint/dot-notation
			if (contextOptions["type"] !== undefined) {
				// eslint-disable-next-line @typescript-eslint/dot-notation
				requestedContextType = contextOptions["type"];
			} else {
				request = contextOptions as { context: { type: string }; metadata: { resultType: string } };
				requestedContextType = request?.context?.type;
				requestedResultType = request?.metadata?.resultType;
			}
			const intents = await getIntentsByContext(requestedContextType, requestedResultType);

			if (intents.length === 0) {
				throw new Error(ResolveError.NoAppsFound);
			}

			const isFDC32 = apiVersion?.type === "fdc3" && apiVersion.version === "2.0";
			const mappedIntents = intents.map((entry) => ({
				intent: entry.intent,
				apps: entry.apps.map((app) => {
					let resultType: string;
					if (
						app?.interop?.intents?.listensFor !== undefined &&
						app.interop.intents.listensFor[entry.intent.name] !== undefined
					) {
						resultType = app.interop.intents.listensFor[entry.intent.name].resultType;
					}
					const appEntry = isFDC32 ? mapTo20AppMetaData(app, resultType) : mapTo12AppMetaData(app);

					return appEntry;
				})
			}));

			return mappedIntents;
		}

		public async handleInfoForIntent(
			intentOptions: OpenFin.InfoForIntentOptions,
			clientIdentity: OpenFin.ClientIdentity
		) {
			const apiVersion: ApiMetadata = this.getApiVersion(clientIdentity);
			let contextType: string;
			if (intentOptions?.context?.type !== undefined && intentOptions?.context.type !== "fdc3.nothing") {
				contextType = intentOptions?.context.type;
			}

			const result = await getIntent(intentOptions.name, contextType, intentOptions?.metadata?.resultType);
			if (result === null) {
				throw new Error(ResolveError.NoAppsFound);
			}
			const isFDC32 = apiVersion?.type === "fdc3" && apiVersion.version === "2.0";
			const response = {
				intent: result.intent,
				apps: result.apps.map((app) => {
					let resultType: string;
					if (
						app?.interop?.intents?.listensFor !== undefined &&
						app.interop.intents.listensFor[result.intent.name] !== undefined
					) {
						resultType = app.interop.intents.listensFor[result.intent.name].resultType;
					}
					const appEntry = isFDC32 ? mapTo20AppMetaData(app, resultType) : mapTo12AppMetaData(app);

					return appEntry;
				})
			};

			return response;
		}

		public async handleFiredIntentForContext(
			contextForIntent: { type: string; metadata?: OpenFin.IntentMetadata<IntentTargetMetaData> },
			clientIdentity: ClientIdentity
		): Promise<Omit<IntentResolution, "getResult"> | { source: string; version: string }> {
			const targetAppIdentifier = this.getApplicationIdentity(contextForIntent.metadata);
			const usesAppIdentity = this.usesApplicationIdentity(clientIdentity);
			const intent = {
				context: contextForIntent,
				name: undefined,
				displayName: undefined
			};

			// app specified flow
			if (targetAppIdentifier !== undefined) {
				const intentResolver = await this.handleTargetedIntent(
					targetAppIdentifier,
					intent,
					true,
					clientIdentity
				);
				return this.shapeIntentResolver(intentResolver, usesAppIdentity);
			}

			const intentsForSelection: AppsForIntent[] = await getIntentsByContext(contextForIntent.type);

			// check for unregistered app intent handlers (if enabled)
			const unregisteredAppIntents = await this.getUnregisteredAppIntentByContext(
				contextForIntent.type,
				clientIdentity
			);

			if (unregisteredAppIntents.length > 0) {
				const unregisteredApp: PlatformApp = this._unregisteredApp;
				const matchedIntents: string[] = [];
				for (const intentForSelection of intentsForSelection) {
					if (unregisteredAppIntents.includes(intentForSelection.intent.name)) {
						intentForSelection.apps.push(unregisteredApp);
						matchedIntents.push(intentForSelection.intent.name);
					}
				}
				const missingIntentMatches = unregisteredAppIntents.filter(
					(intentName) => !matchedIntents.includes(intentName)
				);

				for (const missingIntentMatch of missingIntentMatches) {
					const missingIntent = unregisteredApp.intents.find((entry) => entry.name === missingIntentMatch);
					intentsForSelection.push({
						intent: { name: missingIntent.name, displayName: missingIntent.displayName },
						apps: [unregisteredApp]
					});
				}
			}

			if (intentsForSelection.length === 0) {
				// no available intents for the context
				throw new Error(ResolveError.NoAppsFound);
			}

			let userSelection: IntentPickerResponse;

			if (intentsForSelection.length === 1) {
				const intentForSelection = intentsForSelection[0];
				// only one intent matches the passed context
				intent.name = intentForSelection.intent.name;
				intent.displayName = intentForSelection.intent.displayName;

				if (intentForSelection.apps.length === 1) {
					const appInstances = await this.fdc3HandleFindInstances(intentForSelection.apps[0], clientIdentity);
					// if there are no instances launch a new one otherwise present the choice to the user
					// by falling through to the next code block
					if (appInstances.length === 0) {
						const intentResolver = await this.launchAppWithIntent(intentForSelection.apps[0], intent);
						if (intentResolver === null) {
							throw new Error(ResolveError.NoAppsFound);
						}
						return this.shapeIntentResolver(intentResolver, usesAppIdentity);
					}
				}
				userSelection = await this.launchIntentPicker({
					apps: intentsForSelection[0].apps,
					intent
				});
			} else {
				userSelection = await this.launchIntentPicker({
					intent,
					intents: intentsForSelection
				});
			}
			// update intent with user selection
			intent.displayName = userSelection.intent.displayName;
			intent.name = userSelection.intent.name;
			const intentResolver = await this.handleIntentPickerSelection(userSelection, intent);
			return this.shapeIntentResolver(intentResolver, usesAppIdentity);
		}

		public async handleFiredIntent(
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<Omit<IntentResolution, "getResult"> | { source: string; version: string }> {
			logger.info("Received request for a raised intent", intent);
			const targetAppIdentifier = this.getApplicationIdentity(intent.metadata);
			const usesAppIdentifier = this.usesApplicationIdentity(clientIdentity);

			if (targetAppIdentifier !== undefined) {
				const intentResolver = await this.handleTargetedIntent(
					targetAppIdentifier,
					intent,
					false,
					clientIdentity
				);
				return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
			}

			const intentApps = await getAppsByIntent(intent.name);

			if (await this.canAddUnregisteredApp(clientIdentity, intent.name)) {
				// We have unregistered app instances that support this intent and support for unregistered instances is enabled
				intentApps.push(this._unregisteredApp);
			}

			if (intentApps.length === 0) {
				logger.info("No apps support this intent");
				throw new Error(ResolveError.NoAppsFound);
			}

			if (intentApps.length === 1) {
				// handle single entry
				const appInstances = await this.fdc3HandleFindInstances(intentApps[0], clientIdentity);
				// if there are no instances launch a new one otherwise present the choice to the user
				// by falling through to the next code block
				let appInstanceId: string;
				if (appInstances.length === 1) {
					appInstanceId = appInstances[0].instanceId;
				}
				if (appInstances.length === 0 || this.useSingleInstance(intentApps[0])) {
					const intentResolver = await this.launchAppWithIntent(intentApps[0], intent, appInstanceId);
					if (intentResolver === null) {
						throw new Error(ResolveError.NoAppsFound);
					}
					return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
				}
			}

			const userSelection = await this.launchIntentPicker({
				apps: intentApps,
				intent
			});

			const intentResolver = await this.handleIntentPickerSelection(userSelection, intent);
			return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
		}

		public async fdc3HandleOpen(
			fdc3OpenOptions: { app: (PlatformApp & { name?: string }) | string; context: OpenFin.Context },
			clientIdentity: OpenFin.ClientIdentity
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		): Promise<AppIdentifier> {
			if (fdc3OpenOptions?.app === undefined || fdc3OpenOptions?.app === null) {
				logger.error("A request to fdc3.open did not pass an fdc3OpenOptions object");
				throw new Error(ResolveError.NoAppsFound);
			}

			const requestedId =
				typeof fdc3OpenOptions.app === "string"
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
				const result = await this.handleFiredIntent(openAppIntent, clientIdentity);
				const identity: { appId: string; instanceId: string } = { appId: undefined, instanceId: undefined };
				if (typeof result.source === "string") {
					identity.appId = result.source;
				} else {
					identity.appId = result.source.appId;
					identity.instanceId = result.source.instanceId;
				}
				return identity;
			} catch (intentError) {
				if (intentError?.message === ResolveError.NoAppsFound) {
					throw new Error(ResolveError.NoAppsFound);
				}
				throw intentError;
			}
		}

		public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
			logger.info("Client Disconnected.", clientIdentity);

			for (const [key, value] of Object.entries(this._trackedIntentHandlers)) {
				this._trackedIntentHandlers[key] = value.filter(
					(entry) => entry.clientIdentity.endpointId !== clientIdentity.endpointId
				);
			}
			this.removeApiVersion(clientIdentity);
			await super.clientDisconnected(clientIdentity);
		}

		public async fdc3HandleFindInstances(
			app: AppIdentifier,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<AppIdentifier[]> {
			const endpointApps: { [key: string]: AppIdentifier } = {};

			for (const [, value] of Object.entries(this._trackedIntentHandlers)) {
				const entries = value.filter((entry) => entry.appId === app.appId);
				for (const entry of entries) {
					endpointApps[entry.clientIdentity.endpointId] = {
						appId: entry.appId,
						instanceId: entry.clientIdentity.endpointId
					};
				}
			}

			return Object.values(endpointApps);
		}

		public async fdc3HandleGetAppMetadata(
			app: AppIdentifier,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<AppMetadata> {
			logger.info("fdc3HandleGetAppMetadata call received.", app, clientIdentity);
			// this will only be called by FDC3 2.0+
			let platformApp = await getApp(app.appId);
			if ((platformApp === undefined || platformApp === null) && app.appId === this._unregisteredApp?.appId) {
				platformApp = this._unregisteredApp;
			}
			if (platformApp !== undefined && platformApp !== null) {
				const appMetaData: AppMetadata = mapTo20AppMetaData(platformApp);
				if (app.instanceId !== undefined) {
					const allConnectedClients = await this.getAllClientInfo();
					const connectedClient = allConnectedClients.find((client) => client.endpointId === app.instanceId);
					if (connectedClient !== undefined && connectedClient.uuid === fin.me.identity.uuid) {
						const identity = { uuid: connectedClient.uuid, name: connectedClient.name };
						let title: string;
						let preview: string;
						try {
							if (connectedClient.entityType === "window") {
								const instanceWindow = fin.Window.wrapSync(identity);
								const isUserWindow = await instanceWindow.isShowing();
								if (isUserWindow) {
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
				if (appId !== undefined) {
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

		public async intentHandlerRegistered(
			payload: IntentRegistrationPayload,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<void> {
			logger.info("intentHandlerRegistered:", payload, clientIdentity);
			if (payload !== undefined) {
				const intentName: string = payload.handlerId.replace("intent-handler-", "");

				let trackedIntentHandler = this._trackedIntentHandlers[intentName];

				if (trackedIntentHandler === undefined) {
					trackedIntentHandler = [];
					this._trackedIntentHandlers[intentName] = trackedIntentHandler;
				}

				const trackedHandler = this._trackedIntentHandlers[intentName].find(
					(entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId
				);

				if (trackedHandler === undefined) {
					logger.info(
						`intentHandler endpoint not registered. Registering ${clientIdentity.endpointId} against intent ${intentName} and looking up app name.`
					);
					const appId = await this.lookupAppId(clientIdentity);

					if (appId === undefined) {
						logger.warn(
							"Unable to determine app id based on name. This app will not be tracked via intent handler registration."
						);
						return;
					}
					this._trackedIntentHandlers[intentName].push({
						fdc3Version: payload.fdc3Version,
						clientIdentity,
						appId
					});
					logger.info(
						`intentHandler endpoint: ${clientIdentity.endpointId} registered against intent: ${intentName} and app Id: ${appId}.`
					);
				}

				const clientReadyKey = this.getClientReadyKey(clientIdentity, intentName);
				if (this._clientReadyRequests[clientReadyKey] !== undefined) {
					logger.info("Resolving client ready request.");
					this._clientReadyRequests[clientReadyKey](clientIdentity.endpointId);
				}
			}
			await super.intentHandlerRegistered(payload, clientIdentity);
		}

		private async launchAppWithIntent(
			app: PlatformApp,
			intent: OpenFin.Intent,
			instanceId?: string
		): Promise<Omit<IntentResolution, "getResult">> {
			logger.info("Launching app with intent");
			let platformIdentities: PlatformAppIdentifier[] = [];
			let existingInstance = true;

			if (instanceId !== undefined) {
				// an instance of an application was selected
				const allConnectedClients = await this.getAllClientInfo();
				const clientInfo = allConnectedClients.find(
					(connectedClient) => connectedClient.endpointId === instanceId
				);
				if (clientInfo !== undefined) {
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
				if (platformIdentities.length === 0) {
					throw new Error(ResolveError.IntentDeliveryFailed);
				}
				existingInstance = false;
				if (platformIdentities.length === 1) {
					const intentTimeout: number = this._intentOptions.intentTimeout;
					// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
					instanceId = await this.onClientReady(platformIdentities[0], intent.name, intentTimeout);
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

		private async launchIntentPicker(launchOptions: {
			apps?: PlatformApp[];
			intent?: Partial<AppIntent>;
			intents?: { intent: Partial<AppIntent>; apps: PlatformApp[] }[];
		}): Promise<IntentPickerResponse> {
			// show menu
			// launch a new window and optionally pass the available intents as customData.apps as part of the window options
			// the window can then use raiseIntent against a specific app (the selected one).
			const height = this._intentResolverOptions.height;
			const width = this._intentResolverOptions.width;
			const interopApiVersion = this._intentResolverOptions.fdc3InteropApi;
			// this logic runs in the provider so we are using it as a way of determining the root (so it works with root hosting and subdirectory based hosting if a url is not provided)
			const url = this._intentResolverOptions.url;
			const winOption = {
				name: "intent-picker",
				includeInSnapshot: false,
				fdc3InteropApi: interopApiVersion,
				defaultWidth: width,
				defaultHeight: height,
				showTaskbarIcon: false,
				saveWindowState: false,
				defaultCentered: true,
				customData: {
					title: this._intentResolverOptions?.title,
					apps: launchOptions.apps,
					intent: launchOptions.intent,
					intents: launchOptions.intents,
					unregisteredAppId: this._unregisteredApp?.appId
				},
				url,
				frame: false,
				autoShow: true,
				alwaysOnTop: true
			};

			const win = await fin.Window.create(winOption);
			const webWindow = win.getWebWindow();
			try {
				// eslint-disable-next-line @typescript-eslint/dot-notation
				const selectedAppId = await webWindow["getIntentSelection"]();
				return selectedAppId as {
					appId: string;
					instanceId?: string;
					intent: AppIntent;
				};
			} catch (error) {
				let message: string;
				if (typeof error === "string") {
					message = error;
				} else {
					message = error?.message;
				}

				if (message?.includes(ResolveError.UserCancelled)) {
					logger.info("App for intent not selected/launched by user", launchOptions.intent);
					throw new Error(message);
				}
				logger.error("Unexpected error from intent picker/resolver for intent", launchOptions.intent);
				throw new Error(ResolveError.ResolverUnavailable);
			}
		}

		private async handleIntentPickerSelection(
			userSelection: IntentPickerResponse,
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>
		): Promise<Omit<IntentResolution, "getResult">> {
			let selectedApp = await getApp({ appId: userSelection.appId });
			if ((selectedApp === undefined || selectedApp === null) && this._unregisteredApp !== undefined) {
				selectedApp = this._unregisteredApp;
			}
			const instanceId: string = userSelection.instanceId;
			const intentResolver = await this.launchAppWithIntent(selectedApp, intent, instanceId);
			if (intentResolver === null) {
				throw new Error(ResolveError.NoAppsFound);
			}
			return intentResolver;
		}

		private async handleTargetedIntent(
			targetAppIdentifier: AppIdentifier,
			intent: OpenFin.Intent,
			targetByContext: boolean,
			clientIdentity: ClientIdentity
		): Promise<Omit<IntentResolution, "getResult">> {
			// app specified flow
			const intentsForSelection: AppsForIntent[] = [];
			let targetApp = await getApp(targetAppIdentifier.appId);

			// if the specified app isn't available then let the caller know
			if (targetApp === undefined || targetApp === null) {
				if (
					targetAppIdentifier.instanceId !== undefined &&
					targetAppIdentifier.appId === this._unregisteredApp?.appId
				) {
					targetApp = this._unregisteredApp;
				}
				throw new Error(ResolveError.TargetAppUnavailable);
			}
			// if an instanceId is specified then check to see if it is valid and if it isn't inform the caller
			if (targetAppIdentifier.instanceId !== undefined) {
				const availableAppInstances = await this.fdc3HandleFindInstances(targetAppIdentifier, clientIdentity);
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
				if (intent?.context?.type !== undefined) {
					contextMatch = intentEntry.contexts?.includes(intent.context.type);
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
				if (targetAppIdentifier.instanceId !== undefined) {
					const intentResolver = await this.launchAppWithIntent(
						targetApp,
						intent,
						targetAppIdentifier.instanceId
					);
					return intentResolver;
				}
				const specifiedAppInstances = await this.fdc3HandleFindInstances(targetApp, clientIdentity);
				if (specifiedAppInstances.length === 0) {
					const intentResolver = await this.launchAppWithIntent(targetApp, intent);
					if (intentResolver === null) {
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
			let userSelection: IntentPickerResponse;
			if (intentsForSelection.length === 1) {
				userSelection = await this.launchIntentPicker({
					apps: intentsForSelection[0].apps,
					intent
				});
			} else {
				userSelection = await this.launchIntentPicker({
					intent,
					intents: intentsForSelection
				});
			}

			return this.handleIntentPickerSelection(userSelection, intent);
		}

		private shapeIntentResolver(
			intentResolver: Omit<IntentResolution, "getResult">,
			usesAppIdentifier: boolean
		): Omit<IntentResolution, "getResult"> | { source: string; version: string } {
			if (usesAppIdentifier) {
				return intentResolver;
			}
			return { source: intentResolver.source.appId, version: intentResolver.version };
		}

		private useSingleInstance(app: PlatformApp): boolean {
			return app?.instanceMode === "single";
		}

		private async captureWindowApiUsage(id: OpenFin.ClientIdentity): Promise<ApiMetadata> {
			try {
				const target = fin.Window.wrapSync(id);
				const options = await target.getOptions();
				if (options.fdc3InteropApi !== undefined) {
					return {
						type: "fdc3",
						version: options.fdc3InteropApi
					};
				}
			} catch {
				return null;
			}
		}

		private async captureViewApiUsage(id: OpenFin.ClientIdentity): Promise<ApiMetadata> {
			try {
				const target = fin.View.wrapSync(id);
				const options = await target.getOptions();
				if (options.fdc3InteropApi !== undefined) {
					return {
						type: "fdc3",
						version: options.fdc3InteropApi
					};
				}
			} catch {
				return null;
			}
		}

		private async captureApiVersion(
			id: OpenFin.ClientIdentity,
			payload?: { apiVersion?: { type: "interop" | "fdc3"; version: string } }
		) {
			const key = `${id.uuid}-${id.name}`;
			let apiVersion: ApiMetadata;
			if (this._trackedClientConnections[key] === undefined) {
				if (id.uuid !== fin.me.identity.uuid) {
					if (payload?.apiVersion?.type !== undefined) {
						this._trackedClientConnections[key] = payload?.apiVersion;
						// eslint-disable-next-line @typescript-eslint/dot-notation
					} else if (id["connectionUrl"] !== undefined) {
						// if they haven't specified apiVersion meta data and it is external and has a url then we will assume fdc3 2.0
						this._trackedClientConnections[key] = { type: "fdc3", version: "2.0" };
					} else {
						// if a native app has specified a preference through apiVersion then we assume interop
						this._trackedClientConnections[key] = { type: "interop" };
					}
				} else {
					// eslint-disable-next-line @typescript-eslint/dot-notation
					const entityType = id["entityType"];
					if (entityType !== undefined) {
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
								logger.warn(
									`We currently do not check for entity types that are not views or windows. Entity type: ${entityType}`
								);
							}
						}
					} else {
						apiVersion = await this.captureViewApiUsage(id);
						if (apiVersion === null) {
							// perhaps it is a window
							apiVersion = await this.captureWindowApiUsage(id);
						}
					}
				}
			}
			if (apiVersion !== null && apiVersion !== undefined) {
				this._trackedClientConnections[key] = apiVersion;
			}
		}

		private getApiVersion(id: OpenFin.Identity): ApiMetadata {
			const key = `${id.uuid}-${id.name}`;
			const apiVersion: ApiMetadata = this._trackedClientConnections[key];
			return apiVersion;
		}

		private removeApiVersion(id: OpenFin.Identity): void {
			const key = `${id.uuid}-${id.name}`;
			delete this._trackedClientConnections[key];
		}

		private getClientReadyKey(identity: OpenFin.Identity, intentName: string): string {
			return `${identity.uuid}/${identity.name}/${intentName}`;
		}

		private async onClientReady(
			identity: OpenFin.Identity,
			intentName: string,
			timeout: number = 5000
		): Promise<string> {
			return new Promise<string>((resolve, reject) => {
				const registeredHandlers = this._trackedIntentHandlers[intentName];
				let existingInstanceId: string;
				if (registeredHandlers !== undefined) {
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
				if (existingInstanceId !== undefined) {
					resolve(existingInstanceId);
				}
				const key = this.getClientReadyKey(identity, intentName);
				const timerId = setTimeout(() => {
					if (this._clientReadyRequests[key] !== undefined) {
						delete this._clientReadyRequests[key];
						reject(ResolveError.IntentDeliveryFailed);
					}
				}, timeout);
				this._clientReadyRequests[key] = (instanceId: string) => {
					clearTimeout(timerId);
					// clear the callback asynchronously
					delete this._clientReadyRequests[key];
					resolve(instanceId);
				};
			});
		}

		private async getPreviewImage(target: {
			capturePage: (options: { format?: string; quality?: number }) => Promise<string>;
		}): Promise<string> {
			const preview = await target.capturePage({ format: "jpg", quality: 85 });
			if (preview !== undefined && preview !== null && preview !== "") {
				return preview;
			}
			return undefined;
		}

		private async getUnregisteredAppIntentByContext(type: string, clientIdentity: ClientIdentity) {
			const intentNames: string[] = [];
			const supportedIntentNames: string[] = [];
			if (this?._unregisteredApp === undefined) {
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
			return intentNames;
		}

		private async canAddUnregisteredApp(clientIdentity: ClientIdentity, intentName?: string) {
			if (this?._unregisteredApp === undefined) {
				return false;
			}
			if (
				intentName !== undefined &&
				this._unregisteredApp.intents.findIndex((intent) => intent.name === intentName) === -1
			) {
				return false;
			}
			const instances = await this.fdc3HandleFindInstances(
				{ appId: this._unregisteredApp.appId },
				clientIdentity
			);
			return instances.length > 0;
		}

		private getApplicationIdentity(metadata: OpenFin.IntentMetadata<IntentTargetMetaData>): AppIdentifier {
			if (metadata?.target === undefined || metadata.target === null) {
				return undefined;
			}
			if (typeof metadata.target === "string") {
				if (metadata.target.trim().length === 0) {
					return undefined;
				}
				return { appId: metadata.target };
			}

			if (metadata.target?.appId === undefined) {
				return undefined;
			}

			return { appId: metadata.target.appId, instanceId: metadata.target.instanceId };
		}

		private usesApplicationIdentity(clientIdentity: OpenFin.ClientIdentity): boolean {
			const apiMetadata = this.getApiVersion(clientIdentity);
			if (apiMetadata === undefined) {
				return false;
			}
			return apiMetadata.type === "fdc3" && apiMetadata.version === "2.0";
		}

		private async lookupAppId(clientIdentity: OpenFin.ClientIdentity): Promise<string> {
			const nameParts = clientIdentity.name.split("/");
			let app: PlatformApp;

			if (nameParts.length === 1 || nameParts.length === 2) {
				app = await getApp(nameParts[0]);
			}
			if (nameParts.length > 2) {
				app = await getApp(`${nameParts[0]}/${nameParts[1]}`);
			}

			const appNotFound = app === undefined || app === null;

			if (appNotFound && clientIdentity.uuid !== fin.me.identity.uuid) {
				logger.warn("Lookup made by a non-registered app that is outside of this platform.", clientIdentity);
				return;
			}

			if (appNotFound && this._unregisteredApp === undefined) {
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
			return app.appId;
		}
	}

	return new InteropOverride();
}
