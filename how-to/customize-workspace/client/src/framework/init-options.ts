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
import { randomUUID } from "./uuid";

const logger = createLogger("InitOptions");

let actionListeners = new Map<
	string,
	Map<
		string,
		{
			lifecycle: InitOptionsLifecycle;
			actionHandler: <T>(requestedAction: string, payload?: T) => Promise<void>;
		}
	>
> = new Map<
	string,
	Map<
		string,
		{
			lifecycle: InitOptionsLifecycle;
			actionHandler: <T>(requestedAction: string, payload?: T) => Promise<void>;
		}
	>
>();
let actionListenerMap: { [key: string]: string } = {};
const listeners: Map<string, Map<string, (initOptions: UserAppConfigArgs) => Promise<void>>> = new Map<
	string,
	Map<string, (initOptions: UserAppConfigArgs) => Promise<void>>
>();
const listenerMap: { [key: string]: string } = {};
const ACTION_PARAM_NAME = "action";
const ACTION_PAYLOAD_PARAM_NAME = "payload";

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

async function notifyActionListeners(initOptions: UserAppConfigArgs, lifecycle: InitOptionsLifecycle) {
	const action = initOptions[ACTION_PARAM_NAME];
	const payload =
		initOptions[ACTION_PAYLOAD_PARAM_NAME] !== undefined ? extractPayloadFromParams(initOptions) : undefined;
	const availableListeners = actionListeners.get(action);
	if (availableListeners !== undefined && availableListeners !== null) {
		const subscriberIds = Array.from(availableListeners.keys());

		for (const subscriberId of subscriberIds) {
			logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of action: ${action}`);
			const listener = availableListeners.get(subscriberId);

			if (listener?.lifecycle === lifecycle) {
				try {
					await availableListeners.get(subscriberId).actionHandler(action, payload);
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

async function notifyListeners(initOptions: UserAppConfigArgs) {
	const customParamIds = Array.from(listeners.keys());
	let listenerId: string;
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
		const availableListeners = listeners.get(listenerId);
		if (availableListeners !== undefined && availableListeners !== null) {
			const subscriberIds = Array.from(availableListeners.keys());

			for (const subscriberId of subscriberIds) {
				logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of request: ${listenerId}`);

				try {
					await availableListeners.get(subscriberId)(initOptions);
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

async function queryWhileRunning(event: { userAppConfigArgs?: UserAppConfigArgs }) {
	if (event?.userAppConfigArgs !== undefined) {
		logger.info("Received while platform is running", event.userAppConfigArgs);
		if (event.userAppConfigArgs[ACTION_PARAM_NAME] !== undefined) {
			await notifyActionListeners(event.userAppConfigArgs, "after-bootstrap");
		} else {
			await notifyListeners(event.userAppConfigArgs);
		}
	}
}

export async function init(
	options: InitOptionsProviderOptions,
	lifecycle: InitOptionsLifecycle,
	helpers: ModuleHelpers
) {
	// Init can be called multiple times, so reset any action listeners from modules
	actionListeners = new Map();
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

export function registerActionListener(
	action: string,
	lifecycle: InitOptionsLifecycle,
	actionHandler: <T>(requestedAction: string, payload?: T) => Promise<void>
): string {
	const key = randomUUID();
	if (!actionListeners.has(action)) {
		actionListeners.set(action, new Map());
	}
	const handlers = actionListeners.get(action);
	handlers.set(key, {
		lifecycle,
		actionHandler
	});
	actionListeners.set(action, handlers);
	actionListenerMap[key] = action;
	return key;
}

export function registerListener(
	paramName: string,
	handler: (initOptions: UserAppConfigArgs) => Promise<void>
): string {
	if (paramName === ACTION_PARAM_NAME) {
		logger.warn("Please use registerActionListener if you wish to listen for an action");
		return null;
	}
	const key = randomUUID();
	if (!listeners.has(paramName)) {
		listeners.set(paramName, new Map());
	}
	const handlers = listeners.get(paramName);
	handlers.set(key, handler);
	listeners.set(paramName, handlers);
	listenerMap[key] = paramName;
	return key;
}

export function removeListener(id: string): boolean {
	let removed = false;
	if (listenerMap[id] !== undefined) {
		const paramName = listenerMap[id];
		const listener = listeners.get(paramName);
		delete listenerMap[id];
		if (listener?.has(id)) {
			listener.delete(id);
			removed = true;
		}
	}
	return removed;
}

export function removeActionListener(id: string): boolean {
	let removed = false;
	if (actionListenerMap[id] !== undefined) {
		const action = actionListenerMap[id];
		const actionListener = actionListeners.get(action);
		delete actionListenerMap[id];
		if (actionListener?.has(id)) {
			actionListener.delete(id);
			removed = true;
		}
	}
	return removed;
}
