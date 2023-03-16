import { AppIdentifier, AppMetadata, ResolveError } from "@finos/fdc3";
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
import { launchSnapshot, launchView, launchWindow } from "../launch";
import { createLogger } from "../logger-provider";
import { manifestTypes } from "../manifest-types";
import { getSettings } from "../settings";
import type { AppsForIntent, PlatformApp } from "../shapes/app-shapes";

const logger = createLogger("InteropBroker");

const OPEN_APP_NOT_FOUND = "AppNotFound";
const NO_APPS_FOUND = "NoAppsFound";

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

function getSource(appIdentifier: AppIdentifier, usesAppIdentifier: boolean): string | AppIdentifier {
	if (usesAppIdentifier) {
		return appIdentifier;
	}
	return appIdentifier.appId;
}

export function interopOverride(
	InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>
): OpenFin.InteropBroker {
	class InteropOverride extends InteropBroker {
		private readonly _registeredIntentHandlers = new Map<string, IntentRegistrationEntry[]>();

		public async launchAppWithIntent(app: PlatformApp, intent: OpenFin.Intent, instanceId?: string) {
			logger.info("Launching app with intent");

			if (
				app.manifestType !== manifestTypes.view.id &&
				app.manifestType !== manifestTypes.inlineView.id &&
				app.manifestType !== manifestTypes.window.id &&
				app.manifestType !== manifestTypes.inlineWindow.id &&
				app.manifestType !== manifestTypes.snapshot.id
			) {
				// optional logic show a prompt to the user to let them know
				logger.warn(
					"Unable to raise intent against app as only view/snapshot and window based apps are supported"
				);
				return null;
			}

			if (app.manifestType === manifestTypes.view.id || app.manifestType === manifestTypes.inlineView.id) {
				logger.info(`The supporting app is a view (${app.manifestType})`);

				const identity = await launchView(app);
				if (identity === null) {
					// optional logic show a prompt to the user to let them know
					logger.warn("Unable to raise intent against view as no identity was returned");
					return null;
				}
				await super.setIntentTarget(intent, identity);
			}

			if (
				app.manifestType === manifestTypes.window.id ||
				app.manifestType === manifestTypes.inlineWindow.id
			) {
				logger.info(`The supporting app is a classic window (${app.manifestType})`);

				const identity = await launchWindow(app);
				if (identity === null) {
					// optional logic show a prompt to the user to let them know
					logger.warn("Unable to raise intent against classic window as no identity was returned");
					return null;
				}
				await super.setIntentTarget(intent, identity);
			}

			if (app.manifestType === manifestTypes.snapshot.id) {
				logger.info("The supporting app is a view");

				const identities = await launchSnapshot(app);
				if (identities === null) {
					// optional logic show a prompt to the user to let them know
					logger.warn("Unable to raise intent against target as no identity was returned");
					return null;
				}
				for (let i = 0; i < identities.length; i++) {
					await super.setIntentTarget(intent, identities[i]);
				}
			}

			return {
				source: app.appId,
				version: app.version
			};
		}

		public async getTargetIdentity(appId) {
			if (appId === undefined || appId === null) {
				return;
			}
			const passedIdentity = appId.split("@");
			const name = passedIdentity[0];
			let uuid = fin.me.identity.uuid;
			if (passedIdentity.length === 2) {
				uuid = passedIdentity[1];
			}
			const resolvedIdentity = { uuid, name };

			try {
				const targetView = await fin.View.wrap({ uuid, name });
				await targetView.getInfo();
				// passed identity found
				return resolvedIdentity;
			} catch {
				// passed identity does not exist
			}
		}

		public async launchAppPicker(launchOptions: {
			apps?: PlatformApp[];
			intent?: Partial<AppIntent>;
			intents?: { intent: Partial<AppIntent>; apps: PlatformApp[] }[];
		}): Promise<IntentPickerResponse> {
			// show menu
			// launch a new window and optionally pass the available intents as customData.apps as part of the window options
			// the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
			const settings = await getSettings();

			const height = settings?.platformProvider?.intentPicker?.height || 650;
			const width = settings?.platformProvider?.intentPicker?.width || 550;
			// this logic runs in the provider so we are using it as a way of determining the root (so it works with root hosting and subdirectory based hosting if a url is not provided)
			const url =
				settings?.platformProvider?.intentPicker.url ||
				window.location.href.replace("platform/provider.html", "common/windows/intents/picker.html");

			const winOption = {
				name: "intent-picker",
				includeInSnapshot: false,
				fdc3InteropApi: "2.0",
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
				throw new Error(NO_APPS_FOUND);
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
				throw new Error(NO_APPS_FOUND);
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
		) {
			const targetAppIdentifier = getApplicationIdentity(contextForIntent.metadata);
			const intent = {
				context: contextForIntent,
				name: undefined,
				displayName: undefined
			};

			// app specified flow
			if (targetAppIdentifier !== undefined) {
				return this.handleTargetedIntent(
					targetAppIdentifier,
					intent,
					true,
					usesApplicationIdentity(contextForIntent.metadata),
					clientIdentity
				);
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
						return intentResolver;
					}
				}
				userSelection = await this.launchAppPicker({
					apps: intentsForSelection[0].apps,
					intent
				});
			} else {
				userSelection = await this.launchAppPicker({
					intent,
					intents: intentsForSelection
				});
			}
			const intentResolver = await this.handleIntentPickerSelection(
				userSelection,
				intent,
				usesApplicationIdentity(contextForIntent.metadata)
			);
			return intentResolver;
		}

		public async handleFiredIntent(
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<{ source: string; version: string } | { source: unknown }> {
			logger.info("Received request for a raised intent", intent);
			const targetAppIdentifier = getApplicationIdentity(intent.metadata);

			if (targetAppIdentifier !== undefined) {
				return this.handleTargetedIntent(
					targetAppIdentifier,
					intent,
					false,
					usesApplicationIdentity(intent.metadata),
					clientIdentity
				);
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
				if (appInstances.length === 0) {
					const intentResolver = await this.launchAppWithIntent(intentApps[0], intent);
					if (intentResolver === null) {
						throw new Error(ResolveError.NoAppsFound);
					}
					return intentResolver;
				}
			}

			const userSelection = await this.launchAppPicker({
				apps: intentApps,
				intent
			});

			const intentResolver = await this.handleIntentPickerSelection(
				userSelection,
				intent,
				usesApplicationIdentity(intent.metadata)
			);
			return intentResolver;
		}

		public async fdc3HandleOpen(
			fdc3OpenOptions: { app: (PlatformApp & { name?: string }) | string; context: OpenFin.Context },
			clientIdentity: OpenFin.ClientIdentity
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		): Promise<any> {
			if (fdc3OpenOptions?.app === undefined || fdc3OpenOptions?.app === null) {
				logger.error("A request to fdc3.open did not pass an fdc3OpenOptions object");
				throw new Error(OPEN_APP_NOT_FOUND);
			}

			const requestedId =
				typeof fdc3OpenOptions.app === "string"
					? fdc3OpenOptions.app
					: fdc3OpenOptions.app.appId ?? fdc3OpenOptions.app.name;
			const openAppIntent: OpenFin.Intent = {
				context: fdc3OpenOptions.context,
				name: "OpenApp",
				metadata: {
					target: requestedId
				}
			};
			logger.info(
				`A request to Open has been sent to the platform by uuid: ${clientIdentity?.uuid}, name: ${clientIdentity?.name}, endpointId: ${clientIdentity.endpointId} with passed context:`,
				fdc3OpenOptions.context
			);
			try {
				const result = await this.handleFiredIntent(openAppIntent, clientIdentity);
				return { appId: result.source };
			} catch (intentError) {
				if (intentError?.message === NO_APPS_FOUND) {
					throw new Error(OPEN_APP_NOT_FOUND);
				}
				throw intentError;
			}
		}

		public async clientDisconnected(clientIdentity: OpenFin.ClientIdentity): Promise<void> {
			logger.info("Client Disconnected.", clientIdentity);
			const availableIntentHandlers = this._registeredIntentHandlers.entries();
			const cleanupIndex: { [key: string]: number } = {};

			for (const intentClients of availableIntentHandlers) {
				const intentEndpointIndex = intentClients[1].findIndex(
					(entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId
				);
				if (intentEndpointIndex !== -1) {
					cleanupIndex[intentClients[0]] = intentEndpointIndex;
				}
			}
			const relatedIntents = Object.keys(cleanupIndex);

			for (const intent of relatedIntents) {
				logger.info(
					`Removing client with endpoint Id: ${clientIdentity.endpointId} and name: ${clientIdentity.name} from instance list for intent: ${intent}`
				);
				const intentToUpdate = this._registeredIntentHandlers.get(intent);
				intentToUpdate.splice(cleanupIndex[intent], 1);
				this._registeredIntentHandlers.set(intent, intentToUpdate);
			}
			await super.clientDisconnected(clientIdentity);
		}

		public async fdc3HandleFindInstances(
			app: AppIdentifier,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<AppIdentifier[]> {
			const endpointApps: { [key: string]: AppIdentifier } = {};
			for (const entry of this._registeredIntentHandlers) {
				for (const instance of entry[1]) {
					if (instance.appId !== undefined && instance.appId === app.appId) {
						endpointApps[instance.clientIdentity.endpointId] = {
							appId: instance.appId,
							instanceId: instance.clientIdentity.endpointId
						};
					}
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
				return appMetadata;
			}
			throw new Error("TargetAppUnavailable");
		}

		public async invokeContextHandler(
			clientIdentity: OpenFin.ClientIdentity,
			handlerId: string,
			context: OpenFin.Context
		): Promise<void> {
			logger.info("invokeContextHandler:", clientIdentity, handlerId, context);
			await super.invokeContextHandler(clientIdentity, handlerId, context);
		}

		public async invokeIntentHandler(
			clientIdentity: OpenFin.ClientIdentity,
			handlerId: string,
			intent: OpenFin.Intent
		): Promise<void> {
			logger.info("invokeIntentHandler", clientIdentity, handlerId, intent);
			await super.invokeIntentHandler(clientIdentity, handlerId, intent);
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

		public contextHandlerRegistered(
			{
				contextType,
				handlerId
			}: {
				contextType: string | undefined;
				handlerId: string;
			},
			clientIdentity: OpenFin.ClientIdentity
		): void {
			logger.info("contextHandlerRegistered:", contextType, handlerId);
			super.contextHandlerRegistered({ contextType, handlerId }, clientIdentity);
		}

		public async intentHandlerRegistered(
			payload: IntentRegistrationPayload,
			clientIdentity: OpenFin.ClientIdentity
		): Promise<void> {
			logger.info("intentHandlerRegistered:", payload, clientIdentity);
			if (payload !== undefined) {
				const intentName: string = payload.handlerId.replace("intent-handler-", "");

				let intentHandlers: IntentRegistrationEntry[] = this._registeredIntentHandlers.get(intentName);

				if (intentHandlers === undefined) {
					intentHandlers = [];
				}

				const handler = intentHandlers.find(
					(entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId
				);

				if (handler === undefined) {
					const nameParts = clientIdentity.name.split("/");
					let app: PlatformApp;

					if (nameParts.length === 1) {
						app = await getApp(nameParts[0]);
					}
					if (nameParts.length === 2) {
						app = await getApp(nameParts[0]);
					}
					if (nameParts.length > 2) {
						app = await getApp(`${nameParts[0]}/${nameParts[1]}`);
					}

					logger.info("intentHandler endpoint not registered. Registering.", payload, clientIdentity);
					intentHandlers.push({ fdc3Version: payload.fdc3Version, clientIdentity, appId: app?.appId });
				}

				this._registeredIntentHandlers.set(intentName, intentHandlers);
			}
			await super.intentHandlerRegistered(payload, clientIdentity);
		}

		public removeContextHandler(
			{
				handlerId
			}: {
				handlerId: string;
			},
			clientIdentity: OpenFin.ClientIdentity
		): void {
			logger.info("removeContextHandler:", handlerId, clientIdentity);
			super.removeContextHandler({ handlerId }, clientIdentity);
		}

		private async handleIntentPickerSelection(
			userSelection: IntentPickerResponse,
			intent: OpenFin.Intent<OpenFin.IntentMetadata<IntentTargetMetaData>>,
			usesAppIdentity: boolean
		) {
			try {
				const selectedApp = await getApp({ appId: userSelection.appId });
				const response = {
					version: selectedApp.version,
					source: getSource(
						{ appId: userSelection.appId, instanceId: userSelection.instanceId },
						usesAppIdentity
					),
					intent
				};
				if (userSelection.instanceId !== undefined) {
					// an instance of an application was selected
					const allConnectedClients = await this.getAllClientInfo();
					let identity: OpenFin.Identity;
					const clientInfo = allConnectedClients.find(
						(connectedClient) => connectedClient.endpointId === userSelection.instanceId
					);
					if (clientInfo !== undefined) {
						// the connected instance is available
						identity = { uuid: clientInfo.uuid, name: clientInfo.name };
						await super.setIntentTarget(intent, identity);
						return response;
					}
				}
				const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
				if (intentResolver === null) {
					throw new Error(ResolveError.NoAppsFound);
				}
				return response;
			} catch {
				logger.error("App for intent by context not selected/launched", intent);
				throw new Error(ResolveError.ResolverTimeout);
			}
		}

		private async handleTargetedIntent(
			targetAppIdentifier: AppIdentifier,
			intent: OpenFin.Intent,
			targetByContext: boolean,
			useAppIdentifier: boolean,
			clientIdentity: ClientIdentity
		) {
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
				if (targetByContext) {
					return intentEntry.contexts?.includes(intent.context.type);
				}
				return intentEntry.name === intent.name;
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
					const allConnectedClients = await this.getAllClientInfo();
					let identity: OpenFin.Identity;
					const clientInfo = allConnectedClients.find(
						(connectedClient) => connectedClient.endpointId === targetAppIdentifier.instanceId
					);
					if (clientInfo !== undefined) {
						// the connected instance is available
						identity = { uuid: clientInfo.uuid, name: clientInfo.name };
						await super.setIntentTarget(intent, identity);
						return {
							version: targetApp.version,
							source: getSource(targetAppIdentifier, useAppIdentifier),
							intent
						};
					}
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

			const userSelection = await this.launchAppPicker({
				intent,
				intents: intentsForSelection
			});

			return this.handleIntentPickerSelection(userSelection, intent, useAppIdentifier);
		}
	}

	return new InteropOverride();
}
