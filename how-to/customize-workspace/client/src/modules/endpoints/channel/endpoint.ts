import { fin } from "@openfin/core";
import { EndpointDefinition } from "../../../endpoint-shapes";


export async function init(options: unknown): Promise<void> {
	console.log("Was passed the following options:", options);
}

export async function action(
	endpointDefinition: EndpointDefinition<{ channelName: string; actionName: string;
		payload?: unknown; wait?: boolean; uuid?: string;
		logInfo?: boolean; logWarn?: boolean; logError?: boolean; }>,
	request?: { payload?: unknown }
): Promise<boolean> {
	if (request === undefined) {
		console.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false.`);
		return false;
	}
	if (endpointDefinition.type !== "module") {
		console.warn(
			`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`
		);
		return false;
	}
	const logInfo = endpointDefinition?.options?.logInfo ?? true;
	const logWarn = endpointDefinition?.options?.logWarn ?? true;
	const logError = endpointDefinition?.options?.logError ?? true;

	if (endpointDefinition.options === undefined || endpointDefinition.options.actionName === undefined ||
		endpointDefinition.options.channelName === undefined) {
		if (logWarn) {
			console.warn(
				`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`
			);
		}
		return false;
	}

	try {
		const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName,
			{ wait: endpointDefinition.options.wait, payload: endpointDefinition.options.payload });
		if (endpointDefinition.options.uuid !== undefined &&
			endpointDefinition.options.uuid !== channel.providerIdentity.uuid) {
			if (logWarn) {
				console.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
			}
			return false;
		}
		if (logInfo) {
			console.log(`Sending action for endpoint id: ${endpointDefinition.id}`);
		}
		await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
		await channel.disconnect();
		return true;
	} catch (error) {
		if (logError) {
			console.error(`Error executing/or connecting to action. Endpoint with id: ${endpointDefinition.id}`, error);
		}
		return false;
	}
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<{ channelName: string; actionName: string;
		payload?: unknown; wait?: boolean; uuid?: string;
		logInfo?: boolean; logWarn?: boolean; logError?: boolean;
		default?: "object"|"array"; }>,
	request?: { payload?: unknown }
): Promise<unknown | null> {
	let defaultValue: unknown = null;

	if (endpointDefinition.type !== "module") {
		console.warn(
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		return defaultValue;
	}
	const logInfo = endpointDefinition?.options?.logInfo ?? true;
	const logWarn = endpointDefinition?.options?.logWarn ?? true;
	const logError = endpointDefinition?.options?.logError ?? true;

	if (endpointDefinition?.options?.default !== undefined) {
		if (endpointDefinition.options.default === "array") {
			defaultValue = [];
		} else if (endpointDefinition.options.default === "object") {
			defaultValue = {};
		}
	}
	if (endpointDefinition.options === undefined || endpointDefinition.options.actionName === undefined ||
		endpointDefinition.options.channelName === undefined) {
		if (logWarn) {
			console.warn(
				`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`
			);
		}
		return defaultValue;
	}
	try {
		const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName,
			{ wait: endpointDefinition.options.wait, payload: endpointDefinition.options.payload });
		if (endpointDefinition.options.uuid !== undefined &&
			endpointDefinition.options.uuid !== channel.providerIdentity.uuid) {
			if (logWarn) {
				console.warn(`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`);
			}
			return defaultValue;
		}
		if (logInfo) {
			console.log(`Sending request response for endpoint: ${endpointDefinition.id}`);
		}
		const response: unknown = await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
		await channel.disconnect();
		return response;
	} catch (error) {
		if (logError) {
			console.error(`Error executing request/response and connecting to endpoint with id: ${endpointDefinition.id}`, error);
		}
		return defaultValue;
	}
}
