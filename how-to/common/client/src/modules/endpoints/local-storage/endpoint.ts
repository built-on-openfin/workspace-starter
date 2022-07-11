import { EndpointDefinition } from "../endpoint-shapes";
import { PlatformLocalStorage } from "./platform-local-storage";
import { IPlatformStorage } from "./platform-storage-shapes";

const storage: { [key: string]: IPlatformStorage<unknown> } = {};

function getStorage<T>(id: string): IPlatformStorage<T> {
	let localStorage: IPlatformStorage<T> = storage[id] as PlatformLocalStorage<T>;
	if (localStorage === undefined) {
		localStorage = new PlatformLocalStorage<T>(id, id);
		storage[id] = localStorage;
	}
	return localStorage;
}

export async function init(options: unknown): Promise<void> {
	console.log("Was passed the following options:", options);
}

export async function action(endpointDefinition: EndpointDefinition<{ dataType: string; method: "REMOVE" | "SET" }>, request?: { id: string; payload?: unknown }): Promise<boolean> {
	if (request === undefined) {
		console.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false.`);
		return false;
	}
	const options = endpointDefinition.options;
	const localStorage = getStorage<unknown>(options.dataType);

	if (options.method === "REMOVE") {
		const id: string = request.id;
		await localStorage.remove(id);
		return true;
	} else if (options.method === "SET") {
		if (request.payload === undefined) {
			console.warn(`The payload needs to be specified for this action: ${endpointDefinition.id}`);
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
		console.warn(`A request is required for this request response: ${endpointDefinition.id}. Returning null.`);
		return null;
	}
	const options = endpointDefinition.options;
	const localStorage = getStorage<unknown>(options.dataType);

	if (options.method === "GET") {
		if (request.id === undefined) {
			console.warn(`An id is required for this request response: ${endpointDefinition.id}. Returning null.`);
			return null;
		}
		return localStorage.get(request.id);
	} else if (options.method === "GETALL") {
		return { data: await localStorage.getAll() };
	}
	return null;
}
