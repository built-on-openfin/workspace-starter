import type { EndpointDefinition } from "../../../endpoint-shapes";
import type { Logger } from "../../../logger-shapes";
import { PlatformLocalStorage } from "./platform-local-storage";
import type { IPlatformStorage } from "./platform-storage-shapes";

let logger: Logger;

const storage: { [key: string]: IPlatformStorage<unknown> } = {};

function getStorage<T>(id: string): IPlatformStorage<T> {
	let localStorage: IPlatformStorage<T> = storage[id] as PlatformLocalStorage<T>;
	if (localStorage === undefined) {
		localStorage = new PlatformLocalStorage<T>(id, id, logger);
		storage[id] = localStorage;
	}
	return localStorage;
}

export async function init(options: unknown, log: Logger): Promise<void> {
	logger = log;
	logger.info("LocalStorageEndpoint", "Was passed the following options", options);
}

export async function action(
	endpointDefinition: EndpointDefinition<{ dataType: string; method: "REMOVE" | "SET" }>,
	request?: { id: string; payload?: unknown }
): Promise<boolean> {
	if (request === undefined) {
		logger.warn(
			"LocalStorageEndpoint",
			`A request is required for this action: ${endpointDefinition.id}. Returning false`
		);
		return false;
	}
	if (endpointDefinition.type !== "module") {
		logger.warn(
			"LocalStorageEndpoint",
			`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`
		);
		return false;
	}

	const { dataType, method } = endpointDefinition.options;
	const localStorage = getStorage<unknown>(dataType);

	if (method === "REMOVE") {
		const id: string = request.id;
		await localStorage.remove(id);
		return true;
	} else if (method === "SET") {
		if (request.payload === undefined) {
			logger.warn(
				"LocalStorageEndpoint",
				`The payload needs to be specified for this action: ${endpointDefinition.id}`
			);
			return false;
		}
		await localStorage.set(request.id, request.payload);
		return true;
	}
	return false;
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<{ dataType: string; method: "GET" | "GETALL" }>,
	request?: { id?: string; query?: string }
): Promise<unknown | null> {
	if (request === undefined) {
		logger.warn(
			"LocalStorageEndpoint",
			`A request is required for this request response: ${endpointDefinition.id}. Returning null.`
		);
		return null;
	}
	if (endpointDefinition.type !== "module") {
		logger.warn(
			"LocalStorageEndpoint",
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		return null;
	}

	const { dataType, method } = endpointDefinition.options;
	const localStorage = getStorage<unknown>(dataType);

	if (method === "GET") {
		if (request.id === undefined) {
			logger.warn(
				"LocalStorageEndpoint",
				`An id is required for this request response: ${endpointDefinition.id}. Returning null`
			);
			return null;
		}
		return localStorage.get(request.id);
	} else if (method === "GETALL") {
		return { data: await localStorage.getAll() };
	}
	return null;
}
