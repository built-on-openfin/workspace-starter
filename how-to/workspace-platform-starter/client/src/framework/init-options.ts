import type OpenFin from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";
import { checkConditions } from "./conditions";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type { ModuleHelpers } from "./shapes";
import type {
	InitOptionsHandler,
	InitOptionsHandlerOptions,
	InitOptionsLifecycle,
	InitOptionsProviderOptions,
	UserAppConfigArgs
} from "./shapes/init-options-shapes";
import { randomUUID } from "./utils";

const ACTION_PARAM_NAME = "action";
const ACTION_PAYLOAD_PARAM_NAME = "payload";

const logger = createLogger("InitOptions");

let actionListeners: {
	[action: string]: {
		[subscriptionId: string]: {
			lifecycle: InitOptionsLifecycle;
			actionHandler: <T>(requestedAction: string, payload?: T) => Promise<void>;
		};
	};
} = {};
let actionListenerMap: { [key: string]: string } = {};
const listeners: {
	[paramName: string]: {
		[subscriptionId: string]: (initOptions: UserAppConfigArgs) => Promise<void>;
	};
} = {};
const listenerMap: { [key: string]: string } = {};

/**
 * Initialize the init options provider.
 * @param options The options for the init options provider.
 * @param helpers Module helpers to pass to any loaded modules.
 * @param lifecycle When is the init being called during the bootstrap lifecycle.
 */
export async function init(
	options: InitOptionsProviderOptions | undefined,
	helpers: ModuleHelpers,
	lifecycle: InitOptionsLifecycle
): Promise<void> {
	// Init can be called multiple times, so reset any action listeners from modules
	actionListeners = {};
	actionListenerMap = {};

	logger.info("Initializing init options provider.");
	const initOptionsModules = await loadModules<InitOptionsHandler, unknown, InitOptionsHandlerOptions>(
		options,
		"initOptions"
	);

	await initializeModules<InitOptionsHandler, ModuleHelpers, InitOptionsHandlerOptions>(
		initOptionsModules,
		helpers
	);

	const platform = getCurrentSync();

	for (const initOptionsModule of initOptionsModules) {
		const supportedActions = initOptionsModule.definition.data?.supportedActions ?? [];
		for (const supportedAction of supportedActions) {
			registerActionListener(
				supportedAction,
				initOptionsModule.definition.data?.lifecycle ?? "after-bootstrap",
				async (requestedAction: string, payload?: unknown) => {
					if (await checkConditions(platform, initOptionsModule.definition.data?.conditions)) {
						logger.info(
							`Action: ${requestedAction} being handled by module ${initOptionsModule.definition.id}`
						);
						await initOptionsModule.implementation.action(requestedAction, payload);
					}
				}
			);
		}
	}

	const app = fin.Application.getCurrentSync();
	const appInfo = await app.getInfo();
	const customInitOptions = appInfo.initialOptions as OpenFin.ApplicationCreationOptions & {
		userAppConfigArgs?: UserAppConfigArgs;
	};

	if (customInitOptions?.userAppConfigArgs !== undefined) {
		logger.info("Received during startup", customInitOptions?.userAppConfigArgs);
		if (customInitOptions?.userAppConfigArgs[ACTION_PARAM_NAME] !== undefined) {
			await notifyActionListeners(customInitOptions?.userAppConfigArgs, lifecycle);
		} else {
			await notifyListeners(customInitOptions?.userAppConfigArgs);
		}
	}

	if (lifecycle === "after-bootstrap") {
		await platform.Application.addListener("run-requested", queryWhileRunning);
	}
	logger.info("Init options provider initialized.");
}

/**
 * Manually register an action listener.
 * @param action The action to register.
 * @param lifecycle The lifecycle event it is used by.
 * @param actionHandler The handle to call when it is triggered.
 * @returns A subscription id that can be used to remove the listener.
 */
export function registerActionListener(
	action: string,
	lifecycle: InitOptionsLifecycle,
	actionHandler: <T>(requestedAction: string, payload?: T) => Promise<void>
): string {
	const subscriptionId = randomUUID();
	if (!actionListeners[action]) {
		actionListeners[action] = {};
	}
	actionListeners[action][subscriptionId] = {
		lifecycle,
		actionHandler
	};
	actionListenerMap[subscriptionId] = action;
	return subscriptionId;
}

/**
 * Manually register a listener.
 * @param paramName The param name to look for in the init option.
 * @param handler The handler to call when a match on the param name occurs.
 * @returns The subscription id that can be used to remove the listener.
 */
export function registerListener(
	paramName: string,
	handler: (initOptions: UserAppConfigArgs) => Promise<void>
): string | undefined {
	if (paramName === ACTION_PARAM_NAME) {
		logger.warn("Please use registerActionListener if you wish to listen for an action");
		return;
	}
	const subscriptionId = randomUUID();
	if (!listeners[paramName]) {
		listeners[paramName] = {};
	}
	listeners[paramName][subscriptionId] = handler;
	listenerMap[subscriptionId] = paramName;
	return subscriptionId;
}

/**
 * Remove a listener by subscription id.
 * @param subscriptionId The id to remove.
 * @returns True if the item was removed.
 */
export function removeListener(subscriptionId: string): boolean {
	let removed = false;
	if (listenerMap[subscriptionId] !== undefined) {
		const paramName = listenerMap[subscriptionId];
		const listener = listeners[paramName];
		delete listenerMap[subscriptionId];
		if (listener[subscriptionId]) {
			delete listener[subscriptionId];
			removed = true;
		}
	}
	return removed;
}

/**
 * Remove an action listener by subscription id.
 * @param id The id to remove.
 * @returns True if the item was removed.
 */
export function removeActionListener(id: string): boolean {
	let removed = false;
	if (actionListenerMap[id] !== undefined) {
		const action = actionListenerMap[id];
		const actionListener = actionListeners[action];
		delete actionListenerMap[id];
		if (actionListener[id]) {
			delete actionListener[id];
			removed = true;
		}
	}
	return removed;
}

/**
 * Try and extract params from the init options params.
 * @param initOptions The init param to extract from.
 * @returns The extract payload.
 */
function extractPayloadFromParams<T>(initOptions?: UserAppConfigArgs): T | undefined {
	try {
		if (typeof initOptions?.payload === "string") {
			const plainJson = atob(initOptions?.payload);
			const payload = JSON.parse(plainJson) as T;
			logger.info("Extracted payload", payload);
			return payload;
		}
	} catch (err) {
		logger.error("Error decoding payload, it should be Base64 encoded", initOptions, err);
	}
}

/**
 * Notify anybody subscribed to the action listeners.
 * @param initOptions The init options to extract from.
 * @param lifecycle The lifecycle event to use.
 */
async function notifyActionListeners(initOptions: UserAppConfigArgs, lifecycle: InitOptionsLifecycle): Promise<void> {
	const action = initOptions[ACTION_PARAM_NAME];
	const payload =
		initOptions[ACTION_PAYLOAD_PARAM_NAME] !== undefined ? extractPayloadFromParams(initOptions) : undefined;
	const availableListeners = actionListeners[action];
	if (availableListeners !== undefined && availableListeners !== null) {
		const subscriberIds = Object.keys(availableListeners);

		for (const subscriberId of subscriberIds) {
			logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of action: ${action}`);
			const listener = availableListeners[subscriberId];

			if (listener?.lifecycle === lifecycle) {
				try {
					const listen = availableListeners[subscriberId];
					if (listen) {
						await listen.actionHandler(action, payload);
					}
				} catch (error) {
					logger.error(
						`Error executing action: ${action} against registered listener: ${subscriberId}.`,
						error
					);
				}
			}
		}
	}
}

/**
 * Notify anybody subscribed to the listeners.
 * @param initOptions The init options to extract from.
 */
async function notifyListeners(initOptions: UserAppConfigArgs): Promise<void> {
	const customParamIds = Object.keys(listeners);
	let listenerId: string | undefined;

	for (const id of customParamIds) {
		if (initOptions[id] !== undefined) {
			listenerId = id;
			break;
		}
	}

	if (listenerId !== undefined) {
		logger.info(
			`Init param has been passed and it has a matching listener (${listenerId}). Passing on init options to listeners`
		);
		const availableListeners = listeners[listenerId];
		if (availableListeners !== undefined && availableListeners !== null) {
			const subscriberIds = Object.keys(availableListeners);

			for (const subscriberId of subscriberIds) {
				logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of request: ${listenerId}`);

				try {
					const listen = availableListeners[subscriberId];
					if (listen) {
						await listen(initOptions);
					}
				} catch (error) {
					logger.error(
						`Error executing handler for parameter: ${listenerId} against registered listener: ${subscriberId}.`,
						error
					);
				}
			}
		}
	}
}

/**
 * Handle an init options event triggered when the app was already started.
 * @param event The event container the new init options.
 * @param event.userAppConfigArgs The config args containing the init options.
 */
async function queryWhileRunning(event: { userAppConfigArgs?: UserAppConfigArgs }): Promise<void> {
	if (event?.userAppConfigArgs !== undefined) {
		logger.info("Received while platform is running", event.userAppConfigArgs);
		if (event.userAppConfigArgs[ACTION_PARAM_NAME] !== undefined) {
			await notifyActionListeners(event.userAppConfigArgs, "after-bootstrap");
		} else {
			await notifyListeners(event.userAppConfigArgs);
		}
	}
}
