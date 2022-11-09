import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type {
	Endpoint,
	EndpointDefinition,
	EndpointProviderOptions,
	FetchOptions
} from "./shapes/endpoint-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";

const logger = createLogger("Endpoint");

const endpointDefinitions: EndpointDefinition<unknown>[] = [];
let endpointModules: ModuleEntry<Endpoint>[] = [];

async function getModuleEndpoint(moduleId: string): Promise<Endpoint> {
	const endpoints = endpointModules.find((entry) => entry.definition.id === moduleId);

	if (endpoints === undefined) {
		logger.warn(`Specified Endpoint Module Id: ${moduleId} is not available`);
		return undefined;
	}

	return endpoints.implementation;
}

function getEndpointDefinition(endpointId: string): EndpointDefinition<unknown> {
	const endpoint = endpointDefinitions.find((entry) => entry.id === endpointId);

	if (endpoint === undefined) {
		logger.warn(`Specified Endpoint Id ${endpointId} is not available`);
	}

	return endpoint;
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

export async function init(options: EndpointProviderOptions, helpers: ModuleHelpers) {
	const newEndpoints = options?.endpoints || [];

	if (newEndpoints.length > 0) {
		logger.info("Adding the following endpoints to the endpoint provider", newEndpoints);
		endpointDefinitions.push(...newEndpoints);
	}

	endpointModules = await loadModules<never, Endpoint>(options, "endpoint");
	await initializeModules(endpointModules, helpers);
}

export function hasEndpoint(id: string) {
	return endpointDefinitions.some((entry) => entry.id === id);
}

export async function action<T>(endpointId: string, request?: T): Promise<boolean> {
	const endpoint = getEndpointDefinition(endpointId);

	if (endpoint === undefined) {
		return false;
	}

	const endpointType = endpoint.type;

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpointType === "fetch") {
		const { url, ...options } = endpoint.options;
		const req = getRequestOptions(url, options, request);
		if (req.options.method !== "GET" && req.options.method !== "POST") {
			logger.warn(
				`${endpointId} specifies a type: ${endpointType} with a method ${req.options.method} that is not supported.`
			);
			return false;
		}
		const response = await fetch(req.url, req.options);
		return response.ok;
	} else if (endpointType === "module") {
		const resolvedEndpoint = await getModuleEndpoint(endpoint.typeId);

		if (resolvedEndpoint === undefined) {
			return false;
		}
		return resolvedEndpoint.action(endpoint, request);
	}
	logger.warn(`${endpointId} specifies a type: ${endpointType} that is not supported`);
	return false;
}

export async function requestResponse<T, R>(endpointId: string, request?: T): Promise<R | null> {
	const endpoint = endpointDefinitions.find((entry) => entry.id === endpointId);

	if (endpoint === undefined) {
		return null;
	}

	const endpointType = endpoint.type;
	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpointType === "fetch") {
		const { url, ...options } = endpoint.options;
		const req = getRequestOptions(url, options, request);
		if (req.options.method !== "GET" && req.options.method !== "POST") {
			logger.warn(
				`${endpointId} specifies a type: ${endpointType} with a method ${req.options.method} that is not supported.`
			);
			return null;
		}
		const response = await fetch(req.url, req.options);

		if (response.ok) {
			const json = await response.json();
			return json as R;
		}
		return null;
	} else if (endpointType === "module") {
		const resolvedEndpoint = await getModuleEndpoint(endpoint.typeId);

		if (resolvedEndpoint === undefined) {
			return null;
		}
		return resolvedEndpoint.requestResponse<T, R>(endpoint, request);
	}
	logger.warn(`${endpointId} specifies a type: ${endpointType} that is not supported`);
	return null;
}
