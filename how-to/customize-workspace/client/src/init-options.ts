import { fin } from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";
const actionListeners: Map<string, Map<string, (payload: unknown) => Promise<void>>> = new Map();
const actionListenerMap: { [key: string]: string } = {};
const listeners: Map<string,
Map<string, (initOptions: { [key: string]: string|boolean|number }) => Promise<void>>> = new Map();
const listenerMap: { [key: string]: string } = {};
let initialized = false;
const actionParamName = "action";
const actionPayloadName = "payload";

function extractPayloadFromParams<T>(initParams?: InitParams): T | undefined {
	try {
		if (typeof initParams?.payload === "string") {
			const plainJson = atob(initParams?.payload);
			const payload = JSON.parse(plainJson) as T;
			console.log("Extracted payload", payload);
			return payload;
		}
	} catch (err) {
		console.error("Error decoding payload, it should be Base64 encoded", initParams, err);
	}
}

async function notifyActionListeners(initOptions: { [key: string]: string | boolean | number}) {
    const action = initOptions[actionParamName] as string;
    const payloadAsBase64 = initOptions[actionPayloadName] as string; 
    const availableListeners = actionListeners.get(action);
    if (availableListeners !== undefined && availableListeners !== null) {
        const payload = 
    }
    const subscriberIds = Array.from(subscribers.keys());
	subscriberIds.reverse();

	for (let i = 0; i < subscriberIds.length; i++) {
		const subscriberId = subscriberIds[i];
		logInfo(
			`Example Auth: Notifying subscriber with subscription Id: ${subscriberId} of event type: ${eventType}`
		);
		await subscribers.get(subscriberId)();
	}
}

async function queryOnLaunch(userAppConfigArgs?: { shareId: string }) {
	console.log("Received during startup:", userAppConfigArgs);
    if (userAppConfigArgs[actionParamName] !== undefined) {
        await notifyActionListeners(userAppConfigArgs);
    } else {
        await notifyListeners(userAppConfigArgs);
    }
}

async function queryWhileRunning(event: { userAppConfigArgs?: { shareId: string } }) {
	if (event?.userAppConfigArgs?.shareId !== undefined) {
		console.log(event.userAppConfigArgs);
		if (event.userAppConfigArgs[actionParamName] !== undefined) {
            await notifyActionListeners(event.userAppConfigArgs);
        } else {
            await notifyListeners(event.userAppConfigArgs);
        }
	}
}

export async function init() {
    if (initialized) {
        return;
    }
    initialized = true;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    fin["desktop"].main(queryOnLaunch);
	const platform = getCurrentSync();
	await platform.Application.addListener("run-requested", queryWhileRunning);
}

export function registerActionListener<T>(action: string, actionHandler: (payload: T) => Promise<void>): string {
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

export function registerListener(paramName: string,
    handler: (initOptions: {[key: string]: string|number|boolean}) => Promise<void>): string {
    if (paramName === actionParamName) {
        console.warn("Please use registerActionListener if you wish to listen for an action.");
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
