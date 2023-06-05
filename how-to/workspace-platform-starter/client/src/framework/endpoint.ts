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
const endpointDefinitions: EndpointDefinition[] = [];
let modules: ModuleEntry<Endpoint>[] = [];

/**
 * Initialize the endpoint provider.
 * @param options The options for the endpoint provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(options: EndpointProviderOptions | undefined, helpers: ModuleHelpers): Promise<void> {
	if (options) {
		const newEndpoints = options.endpoints ?? [];

		if (newEndpoints.length > 0) {
			logger.info("Adding the following endpoints to the endpoint provider", newEndpoints);
			endpointDefinitions.push(...newEndpoints);
		}

		modules = await loadModules<never, Endpoint>(options, "endpoint");
		await initializeModules(modules, helpers);
	}
}

/**
 * Does the endpoint with the specified id exist.
 * @param id The id to check for existence.
 * @returns True if the endpoint exists.
 */
export function hasEndpoint(id: string): boolean {
	return endpointDefinitions.some((entry) => entry.id === id);
}

/**
 * Perform an action on an endpoint.
 * @param endpointId The id of the endpoint to perform the action on.
 * @param request The request to send.
 * @returns True if the action was performed successfully.
 */
export async function action<T>(endpointId: string, request?: T): Promise<boolean> {
	const endpoint = getEndpointDefinition(endpointId);

	if (endpoint === undefined) {
		return false;
	}

	const endpointType = endpoint.type;

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpointType === "fetch") {
		const { url, ...options } = endpoint.options;
		if (url) {
			const req = getRequestOptions(url, options, request);
			if (req.options.method !== "GET" && req.options.method !== "POST") {
				logger.warn(
					`${endpointId} specifies a type: ${endpointType} with a method ${req.options.method} that is not supported.`
				);
				return false;
			}
			const response = await fetch(req.url, req.options);
			return response.ok;
		}
	} else if (endpointType === "module") {
		const resolvedEndpoint = await getModuleEndpoint(endpoint.typeId);

		if (!resolvedEndpoint?.action) {
			return false;
		}
		return resolvedEndpoint.action(endpoint, request);
	}
	logger.warn(`${endpointId} specifies a type: ${endpointType} that is not supported`);
	return false;
}

/**
 * Perform a request/response on an endpoint.
 * @param endpointId The id of the endpoint to perform the request/response on.
 * @param request The request to send.
 * @returns The response from the endpoint.
 */
export async function requestResponse<T, R>(endpointId: string, request?: T): Promise<R | undefined> {
	const endpoint = endpointDefinitions.find((entry) => entry.id === endpointId);

	if (endpoint === undefined) {
		return;
	}

	const endpointType = endpoint.type;

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpointType === "fetch") {
		const { url, ...options } = endpoint.options;
		if (url) {
			const req = getRequestOptions(url, options, request);
			if (req.options.method !== "GET" && req.options.method !== "POST") {
				logger.warn(
					`${endpointId} specifies a type: ${endpointType} with a method ${req.options.method} that is not supported.`
				);
				return;
			}
			const response = await fetch(req.url, req.options);

			if (response.ok) {
				const json = await response.json();
				return json as R;
			}
		}
		return;
	} else if (endpointType === "module") {
		const resolvedEndpoint = await getModuleEndpoint(endpoint.typeId);

		if (!resolvedEndpoint?.requestResponse) {
			return;
		}
		return resolvedEndpoint.requestResponse(endpoint, request) as R;
	}
	logger.warn(`${endpointId} specifies a type: ${endpointType} that is not supported`);
}

/**
 * Get a module endpoint by its id.
 * @param moduleId The module id to get the endpoint for.
 * @returns The endpoint for the module.
 */
async function getModuleEndpoint(moduleId: string): Promise<Endpoint | undefined> {
	const endpoints = modules.find((entry) => entry.definition.id === moduleId);

	if (endpoints === undefined) {
		logger.warn(`Specified Endpoint Module Id: ${moduleId} is not available`);
		return;
	}

	return endpoints.implementation;
}

/**
 * Get the endpoint definition.
 * @param endpointId The endpoint id to get the definition for.
 * @returns The endpoint definition.
 */
function getEndpointDefinition(endpointId: string): EndpointDefinition | undefined {
	const endpoint = endpointDefinitions.find((entry) => entry.id === endpointId);

	if (endpoint === undefined) {
		logger.warn(`Specified Endpoint Id ${endpointId} is not available`);
	}

	return endpoint;
}

/**
 * Get the request options from the fetch options.
 * @param url The url.
 * @param options The fetch options.
 * @param request The question to get the options form.
 * @returns The options for the request.
 */
function getRequestOptions(
	url: string,
	options: FetchOptions,
	request: unknown
): { url: string; options: FetchOptions } {
	if (options.method === "GET") {
		if (request !== undefined) {
			const requestParams = request as { [id: string]: string };
			const keys = Object.keys(requestParams);
			if (keys.length > 0) {
				const length = keys.length;
				for (let i = 0; i < length; i++) {
					url = url.replace(`[${keys[i]}]`, encodeURIComponent(requestParams[keys[i]]));
				}
			}
		}
	} else if (options.method === "POST" && request !== undefined) {
		options.body = JSON.stringify(request);
	}

	return { url, options };
}
