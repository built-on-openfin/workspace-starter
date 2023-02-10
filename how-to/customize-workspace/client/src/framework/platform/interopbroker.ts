import type { AppIntent } from "@openfin/workspace-platform";
import { getApp, getAppsByIntent, getIntent, getIntentsByContext } from "../apps";
import * as connectionProvider from "../connections";
import { launchSnapshot, launchView, launchWindow } from "../launch";
import { createLogger } from "../logger-provider";
import { manifestTypes } from "../manifest-types";
import { getSettings } from "../settings";
import type { PlatformApp } from "../shapes/app-shapes";

const logger = createLogger("InteropBroker");

const OPEN_APP_NOT_FOUND = "AppNotFound";
const NO_APPS_FOUND = "NoAppsFound";
const RESOLVER_TIMEOUT = "ResolverTimeout";

export function interopOverride(
	InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>,
	provider?: OpenFin.ChannelProvider,
	options?: OpenFin.InteropBrokerOptions,
	...args: unknown[]
): OpenFin.InteropBroker {
	class InteropOverride extends InteropBroker {
		public async launchAppWithIntent(app: PlatformApp, intent: OpenFin.Intent) {
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
		}): Promise<{
			appId: string;
			intent: Partial<AppIntent>;
		}> {
			// show menu
			// launch a new window and optionally pass the available intents as customData.apps as part of the window options
			// the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
			const settings = await getSettings();

			const height = settings?.platformProvider?.intentPicker?.height || 400;
			const width = settings?.platformProvider?.intentPicker?.width || 400;
			// this logic runs in the provider so we are using it as a way of determining the root (so it works with root hosting and subdirectory based hosting if a url is not provided)
			const url =
				settings?.platformProvider?.intentPicker.url ||
				window.location.href.replace("platform/provider.html", "common/windows/intents/picker.html");

			const winOption = {
				name: "intent-picker",
				includeInSnapshot: false,
				fdc3InteropApi: "1.2",
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
			contextForIntent: { type: string; metadata?: { target?: string } },
			clientIdentity
		) {
			const availableIntents = await getIntentsByContext(contextForIntent.type);
			if (availableIntents.length === 0) {
				throw new Error(NO_APPS_FOUND);
			}
			const intent = {
				context: contextForIntent,
				name: undefined,
				displayName: undefined
			};
			let targetApp: PlatformApp;
			let targetAppIntent;
			let targetAppIntentCount = 0;

			if (
				contextForIntent.metadata?.target !== undefined &&
				contextForIntent.metadata?.target !== null &&
				contextForIntent.metadata?.target.trim().length > 0
			) {
				targetApp = await getApp(contextForIntent.metadata?.target);
			}

			if (targetApp !== undefined && Array.isArray(targetApp.intents)) {
				for (let i = 0; i < targetApp.intents.length; i++) {
					targetAppIntent = targetApp.intents[i];
					if (
						Array.isArray(targetAppIntent.contexts) &&
						targetAppIntent.contexts.includes(contextForIntent.type)
					) {
						targetAppIntentCount++;
					}
				}
			}

			if (targetApp !== undefined && targetAppIntent !== undefined && targetAppIntentCount === 1) {
				// a preferred name for an app was given with the context object
				// the app existed and it supported the context type and there was only one intent that supported
				// that context type. Launch the app with that intent otherwise present the user with a list of
				// everything that supports that context type
				intent.name = targetAppIntent.name;
				intent.displayName = targetAppIntent.name;
				const intentResolver = await this.launchAppWithIntent(targetApp, intent);
				if (intentResolver === null) {
					throw new Error(NO_APPS_FOUND);
				}
				return intentResolver;
			}

			if (availableIntents.length === 1) {
				intent.name = availableIntents[0].intent.name;
				intent.displayName = availableIntents[0].intent.name;
				if (availableIntents[0].apps.length === 1) {
					const intentResolver = await this.launchAppWithIntent(availableIntents[0].apps[0], intent);
					if (intentResolver === null) {
						throw new Error(NO_APPS_FOUND);
					}
					return intentResolver;
				}
				if (availableIntents[0].apps.length > 1) {
					try {
						const userSelection = await this.launchAppPicker({
							apps: availableIntents[0].apps,
							intent
						});

						const selectedApp = availableIntents[0].apps.find(
							(entry) => entry.appId === userSelection.appId && entry.appId !== undefined
						);
						if (selectedApp !== null && selectedApp !== undefined) {
							const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
							if (intentResolver === null) {
								throw new Error(NO_APPS_FOUND);
							}
							return intentResolver;
						}
						logger.error("We were returned a non existent appId to launch with the intent");
						throw new Error(NO_APPS_FOUND);
					} catch {
						logger.error("App for intent by context not selected/launched", intent);
						throw new Error(RESOLVER_TIMEOUT);
					}
				}
			} else {
				try {
					const userSelection = await this.launchAppPicker({
						intent,
						intents: availableIntents
					});

					const selectedIntent = availableIntents.find(
						(entry) => entry.intent.name === userSelection.intent.name
					);

					if (selectedIntent === undefined) {
						logger.error(
							"The user selected an intent but it's name doesn't match the available intents",
							userSelection
						);
						throw new Error(NO_APPS_FOUND);
					}
					const selectedApp = selectedIntent.apps.find(
						(entry) => entry.appId === userSelection.appId && entry.appId !== undefined
					);
					if (selectedApp !== null && selectedApp !== undefined) {
						intent.displayName = userSelection.intent.displayName;
						intent.name = userSelection.intent.name;
						const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
						if (intentResolver === null) {
							throw new Error(NO_APPS_FOUND);
						}
						return intentResolver;
					}
					logger.error("We were returned a non existent appId to launch with the intent");
					throw new Error(NO_APPS_FOUND);
				} catch {
					logger.error("App for intent by context not selected/launched", intent);
					throw new Error(RESOLVER_TIMEOUT);
				}
			}
		}

		public async handleFiredIntent(intent: OpenFin.Intent) {
			logger.info("Received request for a raised intent", intent);
			let intentApps = await getAppsByIntent(intent.name);
			let targetApp: PlatformApp;
			let targetAppSpecified: boolean = false;
			let targetAppId: string;

			if (
				intent.metadata?.target !== undefined &&
				intent.metadata?.target !== null &&
				intent.metadata?.target.trim().length > 0
			) {
				targetAppSpecified = true;
				targetAppId = intent.metadata?.target as string;
				targetApp = await getApp(targetAppId);
				if (targetApp === undefined) {
					// check to see if you have been passed a specific identity for a view that should be targeted instead of an app
					const targetIdentity = await this.getTargetIdentity(intent.metadata?.target);
					if (targetIdentity !== undefined) {
						logger.info(
							"We were passed a view identity instead of an app entry when raising/firing an intent. We will fire the intent at that as it exists and no app entry exists with that name.:",
							targetIdentity,
							intent
						);
						await super.setIntentTarget(intent, targetIdentity);
						return {
							source: targetIdentity.name
						};
					}
				}
			}

			if (intentApps.length === 0) {
				logger.info("No apps support this intent");
				throw new Error(NO_APPS_FOUND);
			}

			if (targetAppSpecified && targetApp === undefined) {
				logger.info(`Selected appId was specified: ${targetAppId} but does not exist. Returning error.`);
				throw new Error(NO_APPS_FOUND);
			}

			if (targetApp !== undefined) {
				if (!intentApps.includes(targetApp)) {
					logger.info(
						`Selected appId was specified: ${targetAppId} but does it does not support the intent`,
						intent
					);
					throw new Error(NO_APPS_FOUND);
				}
				logger.info("Assigning selected application with intent", intent);
				intentApps = [targetApp];
			}

			if (intentApps.length === 1) {
				// handle single entry
				const intentResolver = await this.launchAppWithIntent(intentApps[0], intent);
				if (intentResolver === null) {
					throw new Error(NO_APPS_FOUND);
				}
				return intentResolver;
			}
			// show menu
			// launch a new window and optionally pass the available intents as customData.apps as part of the window options
			// the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
			try {
				const userSelection = await this.launchAppPicker({
					apps: intentApps,
					intent
				});
				if (intentApps === undefined) {
					logger.warn("We should have a list of apps to search from");
					intentApps = [];
				}
				const selectedApp = intentApps.find(
					(entry) => entry.appId === userSelection.appId && entry.appId !== undefined
				);
				if (selectedApp !== null && selectedApp !== undefined) {
					const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
					if (intentResolver === null) {
						throw new Error(NO_APPS_FOUND);
					}
					return intentResolver;
				}
				logger.error("We were returned a non existent appId to launch with the intent");
				throw new Error(NO_APPS_FOUND);
			} catch {
				logger.error("App for intent not selected/launched", intent);
				throw new Error(RESOLVER_TIMEOUT);
			}
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
				const result = await this.handleFiredIntent(openAppIntent);
				return { appId: result.source };
			} catch (intentError) {
				if (intentError?.message === NO_APPS_FOUND) {
					throw new Error(OPEN_APP_NOT_FOUND);
				}
				throw intentError;
			}
		}
	}

	return new InteropOverride(provider, options, ...args);
}
