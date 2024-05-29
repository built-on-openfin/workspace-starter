import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import {
	getCurrentSync,
	type AppIntent,
	type BrowserSnapshot,
	type PageLayout
} from "@openfin/workspace-platform";
import { getApp, getAppsByIntent, getIntent, getIntentsByContext } from "./apps";
import type { CustomSettings } from "./shapes";

const NO_APPS_FOUND = "NoAppsFound";
const RESOLVER_TIMEOUT = "ResolverTimeout";

/**
 * Create an override for the platform interop.
 * @param customSettings Custom settings to initialize the platform.
 * @returns The override for the interop broker.
 */
export function createInteropOverride(
	customSettings: CustomSettings
): OpenFin.ConstructorOverride<OpenFin.InteropBroker> {
	return (Base: OpenFin.Constructor<OpenFin.InteropBroker>) =>
		/**
		 * In Interop Broker Implementation that supports fdc3 1.2
		 */
		class InteropOverride extends Base {
			/**
			 * Launch an applications with a specific intent.
			 * @param app The app to launch.
			 * @param intent The intent to launch the app with.
			 * @returns The source and version of the app that was launched if there was one.
			 */
			public async launchAppWithIntent(
				app: App,
				intent: OpenFin.Intent
			): Promise<
				| {
						source: string;
						version?: string;
				  }
				| undefined
			> {
				console.log("Launching app with intent.");

				if (
					app.manifestType !== "view" &&
					app.manifestType !== "inline-view" &&
					app.manifestType !== "snapshot"
				) {
					// optional logic show a prompt to the user to let them know
					console.warn("Unable to raise intent against app as only view/snapshot based apps are supported.");
					return;
				}

				if (app.manifestType === "view" || app.manifestType === "inline-view") {
					console.log(`The supporting app is a view (${app.manifestType})`);

					const identity = await launchView(app);
					if (!identity) {
						// optional logic show a prompt to the user to let them know
						console.warn("Unable to raise intent against view as no identity was returned.");
						return;
					}
					await super.setIntentTarget(intent, identity);
				}

				if (app.manifestType === "snapshot") {
					console.log("The supporting app is a view.");

					const identities = await launchSnapshot(app);
					if (!identities) {
						// optional logic show a prompt to the user to let them know
						console.warn("Unable to raise intent against target as no identity was returned.");
						return;
					}
					for (const identity of identities) {
						await super.setIntentTarget(intent, identity);
					}
				}

				return {
					source: app.appId,
					version: app.version
				};
			}

			/**
			 * Get the target identity of the requested app.
			 * @param appId The app id to get the target for.
			 * @returns The identity of the target app.
			 */
			public async getTargetIdentity(appId: string | undefined): Promise<OpenFin.Identity | undefined> {
				if (!appId) {
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

			/**
			 * Launch a picker to chose an application for an intent.
			 * @param launchOptions The launch options for the app.
			 * @param launchOptions.apps The optional list of apps to display.
			 * @param launchOptions.intent The optional intent to support.
			 * @param launchOptions.intents The optional intents to pick from.
			 * @returns The picked app.
			 */
			public async launchAppPicker(launchOptions: {
				apps?: App[];
				intent?: Partial<AppIntent>;
				intents?: { intent: Partial<AppIntent>; apps: App[] }[];
			}): Promise<
				| {
						appId: string;
						intent: Partial<AppIntent>;
				  }
				| undefined
			> {
				// show menu
				// launch a new window and optionally pass the available intents as customData.apps as part of the window options
				// the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
				const height = customSettings?.platformProvider?.intentPicker?.height ?? 400;
				const width = customSettings?.platformProvider?.intentPicker?.width ?? 400;

				// this logic runs in the provider so we are using it as a way of determining the root (so it works with root hosting and subdirectory based hosting if a url is not provided)
				const url =
					customSettings?.platformProvider?.intentPicker?.url ??
					"http://localhost:8080/common/windows/intents/picker.html";

				const winOption: OpenFin.WindowCreationOptions = {
					name: "intent-picker",
					includeInSnapshots: false,
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
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const getIntentSelection = (webWindow as any).getIntentSelection;

					if (getIntentSelection) {
						const selectedAppId = await getIntentSelection();
						return selectedAppId as {
							appId: string;
							intent: AppIntent;
						};
					}
				} catch {
					console.error("App for intent not selected/launched.", launchOptions.intent);
				}
			}

			/**
			 * Is the connection for the specific identity authorized.
			 * @param identity The identity of the connection to check.
			 * @param payload The optional payload.
			 * @returns True if the connection is authorized.
			 */
			public async isConnectionAuthorized(identity: OpenFin.Identity, payload?: unknown): Promise<boolean> {
				console.log(
					"Interop connection being made by the following identity with payload:",
					identity,
					payload
				);
				// perform connection validation checks here if required and return false if it shouldn't be allowed.
				return true;
			}

			/**
			 * Is the action authorized.
			 * @param action The action to test for being authorized.
			 * @param payload The payload to use in the test.
			 * @param identity The identity of the client being asked about the action.
			 * @returns True if the action is authorized.
			 */
			public async isActionAuthorized(
				action: string,
				payload: unknown,
				identity: OpenFin.ClientIdentity
			): Promise<boolean> {
				console.log("Interop Broker is action authorized:", action, payload, identity);
				// perform check here if you wish and return true/false accordingly
				return true;
			}

			/**
			 * Get the information for the intents by context.
			 * @param context The context to get the information for.
			 * @param context.type The type of the context.
			 * @param clientIdentity The identity of the client to get the information from.
			 * @returns The information about the intents for the context.
			 */
			public async handleInfoForIntentsByContext(
				context: { type: string },
				clientIdentity: OpenFin.Identity
			): Promise<
				{
					intent: { name: string; displayName: string };
					apps: { name: string; appId: string; title: string }[];
				}[]
			> {
				const intents = await getIntentsByContext(customSettings?.appProvider, context.type);

				if (intents.length === 0) {
					throw new Error(NO_APPS_FOUND);
				}

				return intents.map((entry) => ({
					intent: entry.intent,
					apps: entry.apps.map((app) => ({
						name: app.appId,
						appId: app.appId,
						title: app.title
					}))
				}));
			}

			/**
			 * Get the information for the apps by intent.
			 * @param intentOptions The options for the intent.
			 * @param intentOptions.name The name of the intent.
			 * @param intentOptions.context The optional context for the intent.
			 * @param intentOptions.context.type The context type.
			 * @param clientIdentity The client identity to get the information from.
			 * @returns The information about the intents for the context.
			 */
			public async handleInfoForIntent(
				intentOptions: { name: string; context?: { type: string } },
				clientIdentity: OpenFin.Identity
			): Promise<{
				intent: { name: string; displayName: string };
				apps: { name: string; appId: string; title: string }[];
			}> {
				const result = await getIntent(
					customSettings?.appProvider,
					intentOptions.name,
					intentOptions.context?.type
				);
				if (!result) {
					throw new Error(NO_APPS_FOUND);
				}

				return {
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
			}

			/**
			 * Handle and intent for the fired context.
			 * @param contextForIntent The context for the intent.
			 * @param contextForIntent.type Tht type of the context.
			 * @param contextForIntent.metadata The metadata for the context.
			 * @param contextForIntent.metadata.target The optional target for the context.
			 * @param clientIdentity The identity of the client to handle the intent.
			 * @returns The application details for the app that handled the intent.
			 */
			public async handleFiredIntentForContext(
				contextForIntent: { type: string; metadata?: { target?: string } },
				clientIdentity: OpenFin.Identity
			): Promise<
				| {
						source: string;
						version?: string;
				  }
				| undefined
			> {
				const availableIntents = await getIntentsByContext(
					customSettings?.appProvider,
					contextForIntent.type
				);
				if (availableIntents.length === 0) {
					throw new Error(NO_APPS_FOUND);
				}
				const intent: OpenFin.Intent & { displayName?: string } = {
					context: contextForIntent,
					name: "",
					displayName: undefined
				};
				let targetApp: App | undefined;
				let targetAppIntent;
				let targetAppIntentCount = 0;

				if (contextForIntent.metadata?.target !== undefined) {
					targetApp = await getApp(customSettings?.appProvider, contextForIntent.metadata?.target);
				}

				if (targetApp !== undefined && Array.isArray(targetApp.intents)) {
					for (const element of targetApp.intents) {
						targetAppIntent = element;
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
					if (!intentResolver) {
						throw new Error(NO_APPS_FOUND);
					}
					return intentResolver;
				}

				if (availableIntents.length === 1) {
					intent.name = availableIntents[0].intent.name;
					intent.displayName = availableIntents[0].intent.name;
					if (availableIntents[0].apps.length === 1) {
						const intentResolver = await this.launchAppWithIntent(availableIntents[0].apps[0], intent);
						if (!intentResolver) {
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

							if (userSelection) {
								const selectedApp = availableIntents[0].apps.find(
									(entry) => entry.appId === userSelection.appId && entry.appId !== undefined
								);
								if (selectedApp) {
									const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
									if (!intentResolver) {
										throw new Error(NO_APPS_FOUND);
									}
									return intentResolver;
								}
							}
							console.error("We were returned a non existent appId to launch with the intent.");
							throw new Error(NO_APPS_FOUND);
						} catch {
							console.error("App for intent by context not selected/launched.", intent);
							throw new Error(RESOLVER_TIMEOUT);
						}
					}
				} else {
					try {
						const userSelection = await this.launchAppPicker({
							intent,
							intents: availableIntents
						});

						if (userSelection) {
							const selectedIntent = availableIntents.find(
								(entry) => entry.intent.name === userSelection.intent.name
							);

							if (selectedIntent === undefined) {
								console.error(
									"The user selected an intent but it's name doesn't match the available intents.",
									userSelection
								);
								throw new Error(NO_APPS_FOUND);
							}
							const selectedApp = selectedIntent.apps.find(
								(entry) => entry.appId === userSelection.appId && entry.appId !== undefined
							);
							if (selectedApp) {
								intent.displayName = userSelection.intent.displayName;
								intent.name = userSelection.intent?.name ?? "";
								const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
								if (!intentResolver) {
									throw new Error(NO_APPS_FOUND);
								}
								return intentResolver;
							}
						}
						console.error("We were returned a non existent appId to launch with the intent.");
						throw new Error(NO_APPS_FOUND);
					} catch {
						console.error("App for intent by context not selected/launched.", intent);
						throw new Error(RESOLVER_TIMEOUT);
					}
				}
			}

			/**
			 * Handle an intent that was fired.
			 * @param intent The intent that was fired.
			 * @returns The source and version of the application that was opened.
			 */
			public async handleFiredIntent(intent: OpenFin.Intent): Promise<
				| {
						source: string;
						version?: string;
				  }
				| undefined
			> {
				console.log("Received request for a raised intent:", intent);
				let intentApps = await getAppsByIntent(customSettings?.appProvider, intent.name);
				let targetApp: App | undefined;

				if (intent.metadata?.target) {
					targetApp = await getApp(customSettings?.appProvider, intent.metadata.target as string);
					if (targetApp === undefined) {
						// check to see if you have been passed a specific identity for a view that should be targeted instead of an app
						const targetIdentity = await this.getTargetIdentity(intent.metadata?.target as string);
						if (targetIdentity) {
							console.log(
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
					console.log("No apps support this intent.");
					throw new Error(NO_APPS_FOUND);
				}

				if (targetApp !== undefined && intentApps.includes(targetApp)) {
					console.log("Assigning selected application with intent.", intent);
					intentApps = [targetApp];
				}

				if (intentApps.length === 1) {
					// handle single entry
					const intentResolver = await this.launchAppWithIntent(intentApps[0], intent);
					if (!intentResolver) {
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
						console.warn("We should have a list of apps to search from.");
						intentApps = [];
					}
					const selectedApp = intentApps.find(
						(entry) => entry.appId === userSelection?.appId && entry.appId !== undefined
					);
					if (selectedApp) {
						const intentResolver = await this.launchAppWithIntent(selectedApp, intent);
						if (!intentResolver) {
							throw new Error(NO_APPS_FOUND);
						}
						return intentResolver;
					}
					console.error("We were returned a non existent appId to launch with the intent.");
					throw new Error(NO_APPS_FOUND);
				} catch {
					console.error("App for intent not selected/launched.", intent);
					throw new Error(RESOLVER_TIMEOUT);
				}
			}
		};
}

/**
 * Launch an application as a view.
 * @param viewApp The application to launch as a view.
 * @returns The identity of the view that was launched.
 */
async function launchView(viewApp: App): Promise<OpenFin.Identity | undefined> {
	if (!viewApp) {
		console.warn("No app was passed to launchView");
		return;
	}

	if (viewApp.manifestType !== "view" && viewApp.manifestType !== "inline-view") {
		console.warn("The app passed was not of manifestType view or inline-view.");
		return;
	}
	let manifest: OpenFin.ViewOptions;

	if (viewApp.manifestType === "view") {
		if (!viewApp.manifest) {
			return;
		}
		const manifestResponse = await fetch(viewApp.manifest);
		manifest = await manifestResponse.json();
	} else {
		// conversion because of manifestType. In most use cases manifest is always a path to an executable or to a manifest file. For views we are demonstrating how it could be used
		// for passing the manifest inline
		manifest = viewApp.manifest as unknown as OpenFin.ViewOptions;
	}

	const name = manifest.name;
	let identity = { uuid: fin.me.identity.uuid, name };
	const wasNameSpecified = name !== undefined;
	let viewExists = false;

	if (wasNameSpecified) {
		viewExists = await doesViewExist(identity);
	}

	if (!viewExists) {
		try {
			const platform = getCurrentSync();
			const createdView = await platform.createView(manifest);
			identity = createdView.identity;
		} catch (err) {
			console.error("Error launching view", err);
			return;
		}
	}
	return identity;
}

/**
 * Launch a snapshot based application.
 * @param snapshotApp The snapshot application to launch.
 * @returns The identity of the views in the snapshot that was launched.
 */
async function launchSnapshot(snapshotApp: App): Promise<OpenFin.Identity[] | undefined> {
	if (!snapshotApp) {
		console.warn("No app was passed to launchSnapshot");
		return;
	}

	if (snapshotApp.manifestType !== "snapshot") {
		console.warn("The app passed was not of manifestType snapshot.");
		return;
	}

	if (!snapshotApp.manifest) {
		return;
	}

	const manifestResponse = await fetch(snapshotApp.manifest);
	const manifest: BrowserSnapshot = await manifestResponse.json();

	const windows = manifest.windows;
	const windowsToCreate = [];

	if (Array.isArray(windows)) {
		const windowsToGather: string[] = [];
		const viewIds: OpenFin.Identity[] = [];

		for (const win of windows) {
			const getViewIdsForLayout = findViewNames(win.layout as PageLayout);
			if (getViewIdsForLayout.length === 0) {
				const uuid = randomUUID();
				const name = `internal-generated-window-${uuid}`;
				win.name = name;
				windowsToCreate.push(win);
				windowsToGather.push(name);
			} else {
				// we have views. Grab the first one to validate existence.
				const viewId = getViewIdsForLayout[0];

				for (const entry of getViewIdsForLayout) {
					viewIds.push({ name: entry, uuid: fin.me.identity.uuid });
				}

				// these views should be readonly and cannot be pulled out of the page or closed
				if (!(await doesViewExist({ name: viewId, uuid: fin.me.identity.uuid }))) {
					windowsToCreate.push(win);
				}
			}
		}

		manifest.windows = windowsToCreate;

		if (windowsToCreate.length > 0) {
			const platform = getCurrentSync();
			try {
				await platform.applySnapshot(manifest);
			} catch (err) {
				console.error("Error trying to apply snapshot to platform.", err, manifest);
			}
		}

		for (const window of windowsToGather) {
			const windowViewIds = await getViewIdentities({ name: window, uuid: fin.me.identity.uuid });
			viewIds.push(...windowViewIds);
		}

		return viewIds;
	}
}

/**
 * Find the names of all the views in the layout.
 * @param layout The layout to find the view names in.
 * @returns The list of view names.
 */
function findViewNames(layout: PageLayout): string[] {
	const collectedNames: string[] = [];

	JSON.stringify(layout, (_, nestedValue) => {
		// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
		if (nestedValue?.name?.length && nestedValue.url !== undefined) {
			collectedNames.push(nestedValue.name as string);
		}
		return nestedValue as unknown;
	});

	return collectedNames;
}

/**
 * Does the view exist?
 * @param identity The identity of the view to find.
 * @returns True if the view exists.
 */
async function doesViewExist(identity: OpenFin.Identity): Promise<boolean> {
	const view = fin.View.wrapSync(identity);
	let exists = false;
	try {
		await view.getInfo();
		const viewHost = await view.getCurrentWindow();
		await viewHost.bringToFront();
		exists = true;
	} catch {
		exists = false;
	}
	return exists;
}

/**
 * Get all the view identities for the specified window.
 * @param identity The identity of the window to find its views.
 * @returns The list of view identities for the window.
 */
async function getViewIdentities(identity: OpenFin.Identity): Promise<OpenFin.Identity[]> {
	try {
		const win = fin.Window.wrapSync(identity);
		const views = await win.getCurrentViews();
		const viewIdentities = views.map((view) => view.identity);
		await win.setAsForeground();
		return viewIdentities;
	} catch {
		return [];
	}
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c: string): string {
		// eslint-disable-next-line no-bitwise
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
