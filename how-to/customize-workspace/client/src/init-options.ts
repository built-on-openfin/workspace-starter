import { getCurrentSync } from "@openfin/workspace-platform";
import {
	InitOptionsHandler,
	InitOptionsModule,
	InitOptionsProviderOptions,
	UserAppConfigArgs
} from "./init-options-shapes";
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
const modules: { [key: string]: InitOptionsHandler } = {};

async function loadInitOptionsModule<T>(id: string, url: string, data: T): Promise<boolean> {
	try {
		if (modules[id] === undefined) {
			const mod: InitOptionsModule = await import(/* webpackIgnore: true */ url);
			const actionHandler = mod.handler;
			if (actionHandler.init !== undefined) {
				await actionHandler.init(data);
			}
			modules[id] = actionHandler;
		}
		return true;
	} catch (err) {
		console.error(`Init Options: Error loading module ${id} with url ${url}`, err);
		return false;
	}
}

function extractPayloadFromParams<T>(initOptions?: UserAppConfigArgs): T | undefined {
	try {
		if (typeof initOptions?.payload === "string") {
			const plainJson = atob(initOptions?.payload);
			const payload = JSON.parse(plainJson) as T;
			console.log("Init Options: Extracted payload", payload);
			return payload;
		}
	} catch (err) {
		console.error("Init Options: Error decoding payload, it should be Base64 encoded", initOptions, err);
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
			console.log(
				`Init Options: Notifying subscriber with subscription Id: ${subscriberId} of action: ${action}`
			);
			try {
				await availableListeners.get(subscriberId)(action, payload);
			} catch (error) {
				console.error(
					`Init Options: Error executing action: ${action} against registered listener: ${subscriberId}.`,
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
		console.log(
			`Init Options: Init param has been passed and it has a matching listener (${listenerId}). Passing on init options to listeners`
		);
		const availableListeners = listeners.get(listenerId);
		if (availableListeners !== undefined && availableListeners !== null) {
			const subscriberIds = Array.from(availableListeners.keys());

			for (let l = 0; l < subscriberIds.length; l++) {
				const subscriberId = subscriberIds[l];
				console.log(
					`Init Options: Notifying subscriber with subscription Id: ${subscriberId} of request: ${listenerId}`
				);
				try {
					await availableListeners.get(subscriberId)(initOptions);
				} catch (error) {
					console.error(
						`Init Options: Error executing handler for parameter: ${listenerId} against registered listener: ${subscriberId}.`,
						error
					);
				}
			}
		}
	}
}

async function queryOnLaunch(userAppConfigArgs?: UserAppConfigArgs) {
	if (userAppConfigArgs !== undefined) {
		console.log("Init Options: Received during startup:", userAppConfigArgs);
		if (userAppConfigArgs[actionParamName] !== undefined) {
			await notifyActionListeners(userAppConfigArgs);
		} else {
			await notifyListeners(userAppConfigArgs);
		}
	}
}

async function queryWhileRunning(event: { userAppConfigArgs?: UserAppConfigArgs }) {
	if (event?.userAppConfigArgs !== undefined) {
		console.log("Init Options: Received while platform is running:", event.userAppConfigArgs);
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
	if (Array.isArray(options?.modules)) {
		for (let i = 0; i < options.modules.length; i++) {
			const module = options.modules[i];
			if (Array.isArray(module?.supportedActions) && module.supportedActions.length > 0) {
				const isModuleLoaded = await loadInitOptionsModule(module.id, module.url, module.data);
				if (isModuleLoaded) {
					for (let a = 0; a < module.supportedActions.length; a++) {
						const supportedAction = module.supportedActions[a];
						registerActionListener(supportedAction, async (requestedAction: string, payload?: unknown) => {
							const actionHandler = modules[module.id];
							if (actionHandler !== undefined) {
								console.log(`Init Options: Action: ${requestedAction} being handled by module ${module.id}`);
								await actionHandler.action(requestedAction, payload);
							} else {
								console.warn(
									`Init Options: Unable to retrieve module with id: ${module.id} to execute action: ${requestedAction}`
								);
							}
						});
					}
				}
			}
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
		console.warn("Init Options: Please use registerActionListener if you wish to listen for an action.");
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
