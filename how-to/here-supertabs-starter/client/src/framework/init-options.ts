import type OpenFin from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";
import { checkConditions } from "./conditions";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type {
	InitOptionsActionHandler,
	ActionHandlerContext,
	InitOptionsHandler,
	InitOptionsHandlerOptions,
	InitOptionsLifecycle,
	InitOptionsProviderOptions,
	UserAppConfigArgs,
	InitOptionsListener
} from "./shapes/init-options-shapes";
import type { ModuleHelpers } from "./shapes/module-shapes";
import { isEmpty, isStringValue, randomUUID } from "./utils";

const ACTION_PARAM_NAME = "action";
const ACTION_PAYLOAD_PARAM_NAME = "payload";
const NO_PARAM_NAME = "-----default-if-no-param-----";

const logger = createLogger("InitOptions");

let actionListeners: {
	[action: string]: {
		[subscriptionId: string]: {
			lifecycle: InitOptionsLifecycle;
			actionHandler: InitOptionsActionHandler;
		};
	};
} = {};
let actionListenerMap: { [key: string]: string } = {};
const listeners: {
	[paramName: string]: {
		[subscriptionId: string]: InitOptionsListener;
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
				async (requestedAction: string, payload: unknown, context: ActionHandlerContext) => {
					if (
						await checkConditions(platform, initOptionsModule.definition.data?.conditions, {
							callerType: "init-options",
							customData: {
								module: initOptionsModule,
								supportedAction
							}
						})
					) {
						logger.info(
							`Action: ${requestedAction} being handled by module ${initOptionsModule.definition.id}`
						);
						await initOptionsModule.implementation.action(requestedAction, payload, context);
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

	if (!isEmpty(customInitOptions?.userAppConfigArgs)) {
		logger.info("Received during startup", customInitOptions?.userAppConfigArgs);
		if (!isEmpty(customInitOptions?.userAppConfigArgs[ACTION_PARAM_NAME])) {
			await notifyActionListeners(customInitOptions?.userAppConfigArgs, lifecycle, "launch");
		} else {
			await notifyListeners(customInitOptions?.userAppConfigArgs, "launch");
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
	actionHandler: InitOptionsActionHandler
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
 * @param handler The handler to call when a match on the param name occurs.
 * @param paramName The param name to look for in the init option. If not specified then it is a function to be called if no params are passed.
 * @returns The subscription id that can be used to remove the listener.
 */
export function registerListener(handler: InitOptionsListener, paramName?: string): string | undefined {
	if (paramName === ACTION_PARAM_NAME) {
		logger.warn("Please use registerActionListener if you wish to listen for an action");
		return;
	}
	if (!isStringValue(paramName)) {
		paramName = NO_PARAM_NAME;
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
	if (!isEmpty(listenerMap[subscriptionId])) {
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
	if (!isEmpty(actionListenerMap[id])) {
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
function extractPayloadFromParams<T>(initOptions?: OpenFin.UserAppConfigArgs): T | undefined {
	try {
		const base64Payload = initOptions?.payload;
		if (isStringValue(base64Payload)) {
			const plainJson = atob(base64Payload);
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
 * @param context The context calling the action handler.
 */
async function notifyActionListeners(
	initOptions: OpenFin.UserAppConfigArgs,
	lifecycle: InitOptionsLifecycle,
	context: ActionHandlerContext
): Promise<void> {
	const action = initOptions[ACTION_PARAM_NAME];
	const payload = !isEmpty(initOptions[ACTION_PAYLOAD_PARAM_NAME])
		? extractPayloadFromParams(initOptions)
		: undefined;
	const availableListeners = actionListeners[Array.isArray(action) ? action[0] : action];
	if (!isEmpty(availableListeners)) {
		const subscriberIds = Object.keys(availableListeners);

		for (const subscriberId of subscriberIds) {
			logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of action: ${action}`);
			const listener = availableListeners[subscriberId];

			if (listener?.lifecycle === lifecycle) {
				try {
					const listen = availableListeners[subscriberId];
					if (listen) {
						await listen.actionHandler(Array.isArray(action) ? action[0] : action, payload, context);
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
 * @param context The context calling the action handler.
 */
async function notifyListeners(
	initOptions: OpenFin.UserAppConfigArgs,
	context: ActionHandlerContext
): Promise<void> {
	const customParamIds = Object.keys(listeners);
	let listenerId: string | undefined;

	for (const id of customParamIds) {
		if (!isEmpty(initOptions[id])) {
			listenerId = id;
			break;
		}
	}

	if (isEmpty(listenerId) && (isEmpty(initOptions) || Object.keys(initOptions).length === 0)) {
		logger.info("No init options passed, calling default listeners");
		listenerId = NO_PARAM_NAME;
	}

	if (!isEmpty(listenerId)) {
		logger.info(
			`Init param has been passed and it has a matching listener (${listenerId}). Passing on init options to listeners`
		);
		const availableListeners = listeners[listenerId];
		if (!isEmpty(availableListeners)) {
			const subscriberIds = Object.keys(availableListeners);

			for (const subscriberId of subscriberIds) {
				logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of request: ${listenerId}`);

				try {
					const listen = availableListeners[subscriberId];
					if (listen) {
						await listen(initOptions, context);
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
async function queryWhileRunning(
	event: Extract<OpenFin.ApplicationEvent, { type: "run-requested" }>
): Promise<void> {
	if (!isEmpty(event?.userAppConfigArgs)) {
		logger.info("Received while platform is running", event.userAppConfigArgs);
		if (!isEmpty(event.userAppConfigArgs[ACTION_PARAM_NAME])) {
			await notifyActionListeners(event.userAppConfigArgs, "after-bootstrap", "running");
		} else {
			await notifyListeners(event.userAppConfigArgs, "running");
		}
	} else {
		logger.info("Received while platform is running but no init options were passed");
	}
}
