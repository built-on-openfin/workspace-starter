import { AppIdentifier, AppMetadata, IntentResolution, ResolveError } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import type { ClientIdentity } from "@openfin/core/src/OpenFin";
import type { AppIntent } from "@openfin/workspace-platform";
import type {
	IntentPickerResponse,
	IntentRegistrationEntry,
	IntentRegistrationPayload,
	IntentTargetMetaData
} from "customize-workspace/shapes/interopbroker-shapes";
import { getApp, getAppsByIntent, getIntent, getIntentsByContext } from "../apps";
import * as connectionProvider from "../connections";
import { bringToFront, launch } from "../launch";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";
import type { AppsForIntent, PlatformApp, PlatformAppIdentifier } from "../shapes/app-shapes";

const logger = createLogger("InteropBroker");

function getApplicationIdentity(metadata: OpenFin.IntentMetadata<IntentTargetMetaData>): AppIdentifier {
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

function usesApplicationIdentity(metadata: OpenFin.IntentMetadata<IntentTargetMetaData>): boolean {
	return !(metadata?.target === undefined || metadata.target === null || typeof metadata.target === "string");
}

export function interopOverride(
	InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>
): OpenFin.InteropBroker {
	class InteropOverride extends InteropBroker {
		private readonly _trackedIntentHandlers: { [key: string]: IntentRegistrationEntry[] } = {};

		private readonly _clientReadyRequests: { [key: string]: (instanceId: string) => void } = {};

		public async isConnectionAuthorized(id: OpenFin.Identity, payload?: unknown): Promise<boolean> {
			logger.info("Interop connection being made by the following identity. About to verify connection", id);
			const response = await connectionProvider.isConnectionValid(id, payload, { type: "broker" });
			if (!response.isValid) {
				logger.warn(`Connection request from ${JSON.stringify(id)} was validated and rejected.`);
			} else {
				logger.info("Connection validation request was validated and is valid.");
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

		public async handleInfoForIntentsByContext(context: { type: string }, clientIdentity) {
			const intents = await getIntentsByContext(context.type);

			if (intents.length === 0) {
				throw new Error(ResolveError.NoAppsFound);
			}

			const mappedIntents = intents.map((entry) => ({
				intent: entry.intent,
				apps: entry.apps.map((app) => ({
					name: app.appId,
					appId: app.appId,
					title: app.title
				}))
			}));

			return mappedIntents;
		}

		public async handleInfoForIntent(
			intentOptions: { name: string; context?: { type: string } },
			clientIdentity
		) {
			const result = await getIntent(intentOptions.name, intentOptions.context?.type);
			if (result === null) {
				throw new Error(ResolveError.NoAppsFound);
			}
			const response = {
				intent: result.intent,
				apps: result.apps.map((app) => {
					const appEntry = {
						name: app.appId,
						appId: app.appId,
						title: app.title
					};
					return appEntry;
				})
			};

			return response;
		}

		public async handleFiredIntentForContext(
			contextForIntent: { type: string; metadata?: OpenFin.IntentMetadata<IntentTargetMetaData> },
			clientIdentity: ClientIdentity
		): Promise<Omit<IntentResolution, "getResult"> | { source: string; version: string }> {
			const targetAppIdentifier = getApplicationIdentity(contextForIntent.metadata);
			const usesAppIdentity = usesApplicationIdentity(contextForIntent.metadata);
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
			const targetAppIdentifier = getApplicationIdentity(intent.metadata);
			const usesAppIdentifier = usesApplicationIdentity(intent.metadata);

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
			logger.info("fdc3handlegetappmeta call received.", app, clientIdentity);
			const appMetadata = await getApp(app.appId);
			if (appMetadata !== undefined && appMetadata !== null) {
				if (app.instanceId !== undefined) {
					const allConnectedClients = await this.getAllClientInfo();
					const connectedClient = allConnectedClients.find((client) => client.endpointId === app.instanceId);
					if (connectedClient !== undefined && connectedClient.uuid === fin.me.identity.uuid) {
						const identity = { uuid: connectedClient.uuid, name: connectedClient.name };
						let title: string;
						let preview: string;
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
						const instanceAppMeta = {
							...appMetadata,
							instanceId: app.instanceId,
							instanceMetadata: { title, preview }
						};
						return instanceAppMeta;
					}
				}
				return appMetadata;
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
						`intentHandler endpoint not registered. Registering ${clientIdentity.endpointId} against intent ${intentName}.`
					);
					const nameParts = clientIdentity.name.split("/");
					let app: PlatformApp;

					if (nameParts.length === 1 || nameParts.length === 2) {
						app = await getApp(nameParts[0]);
					}
					if (nameParts.length > 2) {
						app = await getApp(`${nameParts[0]}/${nameParts[1]}`);
					}

					this._trackedIntentHandlers[intentName].push({
						fdc3Version: payload.fdc3Version,
						clientIdentity,
						appId: app?.appId
					});
					logger.info(
						`intentHandler endpoint: ${clientIdentity.endpointId} registered against intent: ${intentName} and app Id: ${app.appId}.`
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
					// if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
					instanceId = await this.onClientReady(platformIdentities[0], intent.name);
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
			// the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
			const settings = await getSettings();

			const height = settings?.platformProvider?.intentPicker?.height || 715;
			const width = settings?.platformProvider?.intentPicker?.width || 665;
			const interopApiVersion = settings?.platformProvider?.intentPicker?.fdc3InteropApi || "2.0";
			// this logic runs in the provider so we are using it as a way of determining the root (so it works with root hosting and subdirectory based hosting if a url is not provided)
			const url =
				settings?.platformProvider?.intentPicker.url ||
				window.location.href.replace("platform/provider.html", "common/windows/intents/instance-picker.html");

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
					apps: launchOptions.apps,
					intent: launchOptions.intent,
					intents: launchOptions.intents
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
			} catch {
				logger.error("App for intent not selected/launched", launchOptions.intent);
				return null;
			}
		}

		private async handleIntentPickerSelection(
			userSelection: IntentPickerResponse,
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>
		): Promise<Omit<IntentResolution, "getResult">> {
			try {
				const selectedApp = await getApp({ appId: userSelection.appId });
				const instanceId: string = userSelection.instanceId;
				const intentResolver = await this.launchAppWithIntent(selectedApp, intent, instanceId);
				if (intentResolver === null) {
					throw new Error(ResolveError.NoAppsFound);
				}
				return intentResolver;
			} catch {
				logger.error("App for intent by context not selected/launched", intent);
				throw new Error(ResolveError.ResolverTimeout);
			}
		}

		private async handleTargetedIntent(
			targetAppIdentifier: AppIdentifier,
			intent: OpenFin.Intent,
			targetByContext: boolean,
			clientIdentity: ClientIdentity
		): Promise<Omit<IntentResolution, "getResult">> {
			// app specified flow
			const intentsForSelection: AppsForIntent[] = [];
			const targetApp = await getApp(targetAppIdentifier.appId);

			// if the specified app isn't available then let the caller know
			if (targetApp === undefined || targetApp === null) {
				throw new Error(ResolveError.TargetAppUnavailable);
			}
			// if an instanceId is specified then check to see if it is valid and if it isn't inform the caller
			if (targetAppIdentifier.instanceId !== undefined) {
				const availableAppInstances = await this.fdc3HandleFindInstances(targetAppIdentifier, clientIdentity);
				if (availableAppInstances.length === 0 || !availableAppInstances.includes(targetAppIdentifier)) {
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
			return app?.customConfig?.instanceMode === "single";
		}

		private getClientReadyKey(identity: OpenFin.Identity, intentName: string): string {
			return `${identity.uuid}/${identity.name}/${intentName}`;
		}

		private async onClientReady(identity: OpenFin.Identity, intentName: string): Promise<string> {
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
						reject(ResolveError.ResolverUnavailable);
					}
				}, 5000);
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
	}

	return new InteropOverride();
}
