import { getCurrentSync } from "@openfin/workspace-platform";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type {
	InitOptionsHandler,
	InitOptionsHandlerOptions,
	InitOptionsProviderOptions,
	UserAppConfigArgs
} from "./shapes/init-options-shapes";

const logger = createLogger("InitOptions");

const actionListeners: Map<
	string,
	Map<string, <T>(requestedAction: string, payload?: T) => Promise<void>>
> = new Map();
const actionListenerMap: { [key: string]: string } = {};
const listeners: Map<string, Map<string, (initOptions: UserAppConfigArgs) => Promise<void>>> = new Map();
const listenerMap: { [key: string]: string } = {};
let initialized = false;
const actionParamName = "action";
const actionPayloadParamName = "payload";

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

async function notifyActionListeners(initOptions: UserAppConfigArgs) {
	const action = initOptions[actionParamName];
	const payload =
		initOptions[actionPayloadParamName] !== undefined ? extractPayloadFromParams(initOptions) : undefined;
	const availableListeners = actionListeners.get(action);
	if (availableListeners !== undefined && availableListeners !== null) {
		const subscriberIds = Array.from(availableListeners.keys());

		for (let i = 0; i < subscriberIds.length; i++) {
			const subscriberId = subscriberIds[i];
			logger.info(`Notifying subscriber with subscription Id: ${subscriberId} of action: ${action}`);
			try {
				await availableListeners.get(subscriberId)(action, payload);
			} catch (error) {
				logger.error(
					`Error executing action: ${action} against registered listener: ${subscriberId}.`,
					error
				);
			}
		}
	}
}

async function notifyListeners(initOptions: UserAppConfigArgs) {
	const customParamIds = Array.from(listeners.keys());
	let listenerId: string;
	for (let i = 0; i < customParamIds.length; i++) {
		if (initOptions[customParamIds[i]] !== undefined) {
			listenerId = customParamIds[i];
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

			for (let l = 0; l < subscriberIds.length; l++) {
				const subscriberId = subscriberIds[l];
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

async function queryOnLaunch(userAppConfigArgs?: UserAppConfigArgs) {
	if (userAppConfigArgs !== undefined) {
		logger.info("Received during startup", userAppConfigArgs);
		if (userAppConfigArgs[actionParamName] !== undefined) {
			await notifyActionListeners(userAppConfigArgs);
		} else {
			await notifyListeners(userAppConfigArgs);
		}
	}
}

async function queryWhileRunning(event: { userAppConfigArgs?: UserAppConfigArgs }) {
	if (event?.userAppConfigArgs !== undefined) {
		logger.info("Received while platform is running", event.userAppConfigArgs);
		if (event.userAppConfigArgs[actionParamName] !== undefined) {
			await notifyActionListeners(event.userAppConfigArgs);
		} else {
			await notifyListeners(event.userAppConfigArgs);
		}
	}
}

export async function init(options?: InitOptionsProviderOptions) {
	if (initialized) {
		return;
	}
	initialized = true;

	const initOptionsModules = await loadModules<InitOptionsHandler, unknown, InitOptionsHandlerOptions>(
		options,
		"initOptions"
	);

	await initializeModules<InitOptionsHandler, unknown, InitOptionsHandlerOptions>(initOptionsModules);

	for (const initOptionsModule of initOptionsModules) {
		const supportedActions = initOptionsModule.definition.data?.supportedActions ?? [];
		for (const supportedAction of supportedActions) {
			registerActionListener(supportedAction, async (requestedAction: string, payload?: unknown) => {
				logger.info(`Action: ${requestedAction} being handled by module ${initOptionsModule.definition.id}`);
				await initOptionsModule.implementation.action(requestedAction, payload);
			});
		}
	}

	const app = fin.Application.getCurrentSync();
	const appInfo = await app.getInfo();
	const customInitOptions = appInfo.initialOptions as OpenFin.ApplicationCreationOptions & {
		userAppConfigArgs?: UserAppConfigArgs;
	};

	await queryOnLaunch(customInitOptions?.userAppConfigArgs);

	const platform = getCurrentSync();
	await platform.Application.addListener("run-requested", queryWhileRunning);
}

export function registerActionListener(
	action: string,
	actionHandler: <T>(requestedAction: string, payload?: T) => Promise<void>
): string {
	const key = crypto.randomUUID();
	if (!actionListeners.has(action)) {
		actionListeners.set(action, new Map());
	}
	const handlers = actionListeners.get(action);
	handlers.set(key, actionHandler);
	actionListeners.set(action, handlers);
	actionListenerMap[key] = action;
	return key;
}

export function registerListener(
	paramName: string,
	handler: (initOptions: UserAppConfigArgs) => Promise<void>
): string {
	if (paramName === actionParamName) {
		logger.warn("Please use registerActionListener if you wish to listen for an action");
		return null;
	}
	const key = crypto.randomUUID();
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
