import { getSettings } from "./settings";
import { EndpointTypes, FetchOptions } from "./shapes";

let availableEndpoints: EndpointTypes[];

export async function init(endpoints: EndpointTypes[] = null) {
	if (endpoints !== null) {
		availableEndpoints = endpoints;
	} else {
		const settings = await getSettings();
		availableEndpoints = settings.endpointProvider.endpoints || [];
	}
}

function getRequestOptions(
	url: string,
	options: FetchOptions,
	request: unknown
): { url: string; options: FetchOptions } {
	if (options.method === "GET") {
		if (request !== undefined) {
			const keys = Object.keys(request);
			if (keys.length > 0) {
				const length = keys.length;
				for (let i = 0; i < length; i++) {
					url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]] as string));
				}
			}
		}
	} else if (options.method === "POST" && request !== undefined) {
		options.body = JSON.stringify(request);
	}

	return { url, options };
}

export async function action<T>(endpointId: string, request?: T): Promise<boolean> {
	const endpoint = availableEndpoints.find((entry) => entry.id === endpointId);

	if (endpoint === undefined) {
		console.warn(`${endpointId} is not available.`);
		return false;
	}

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpoint.type === "fetch") {
		const { url, ...options } = endpoint.options;
		const req = getRequestOptions(url, options, request);
		if (req.options.method !== "GET" && req.options.method !== "POST") {
			console.warn(
				`${endpointId} specifies a type: ${endpoint.type} with a method ${req.options.method} that is not supported.`
			);
			return false;
		}
		const response = await fetch(req.url, req.options);
		return response.ok;
	}
	console.warn(`${endpointId} specifies a type: ${endpoint.type} that is not supported.`);
	return false;
}

export async function requestResponse<T, R>(endpointId: string, request: T): Promise<R | null> {
	const endpoint = availableEndpoints.find((entry) => entry.id === endpointId);

	if (endpoint === undefined) {
		console.warn(`${endpointId} is not available.`);
		return null;
	}

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpoint.type === "fetch") {
		const { url, ...options } = endpoint.options;
		const req = getRequestOptions(url, options, request);
		if (req.options.method !== "GET" && req.options.method !== "POST") {
			console.warn(
				`${endpointId} specifies a type: ${endpoint.type} with a method ${req.options.method} that is not supported.`
			);
			return null;
		}
		const response = await fetch(req.url, req.options);

		if (response.ok) {
			const json = await response.json();
			return json as R;
		}
		return null;
	}
	console.warn(`${endpointId} specifies a type: ${endpoint.type} that is not supported.`);
	return null;
}
