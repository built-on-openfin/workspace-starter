import { EndpointClient } from "./endpoint-client";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type {
	Endpoint,
	EndpointClientDefaultOptions,
	EndpointClientOptions,
	EndpointDefinition,
	EndpointProviderOptions,
	FetchOptions,
	EndpointClient as EndpointClientInterface
} from "./shapes/endpoint-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import { isEmpty, isStringValue, objectClone } from "./utils";

const SUPPORTED_HTTP_METHODS: string[] = ["GET", "POST", "DELETE", "PUT", "PATCH"];

const logger = createLogger("Endpoint");
const endpointDefinitions: EndpointDefinition[] = [];
let modules: ModuleEntry<Endpoint>[] = [];
let isInitialized = false;
let allowEndpointClientCreation: boolean = true;
let restrictEndpointClientCreationToListed = true;
let endpointClientOptions: EndpointClientOptions[];
let endpointClientDefaults: EndpointClientDefaultOptions;
let endpointProvider: EndpointClientInterface;

/**
 * Initialize the endpoint provider.
 * @param options The options for the endpoint provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: EndpointProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		const newEndpoints = options.endpoints ?? [];

		if (newEndpoints.length > 0) {
			logger.info("Adding the following endpoints to the endpoint provider", newEndpoints);
			endpointDefinitions.push(...newEndpoints);
		}

		modules = await loadModules<never, Endpoint>(options, "endpoint");
		await initializeModules(modules, helpers);
		isInitialized = true;
		restrictEndpointClientCreationToListed = options?.endpointClients?.restrictToListed ?? true;
		endpointClientOptions = options?.endpointClients?.clientOptions ?? [];
		endpointClientDefaults = {
			...options?.endpointClients?.defaults
		};
		if (restrictEndpointClientCreationToListed && endpointClientOptions.length === 0) {
			allowEndpointClientCreation = false;
		}
		endpointProvider = {
			hasEndpoint,
			action,
			requestResponse,
			requestStream
		};
	}
}

/**
 * Returns a restricted endpoint client that helps isolate the endpoints that
 * can be used by a client inside of a platform.
 * @param options The options to help with the client restriction.
 * @returns The endpoint client.
 */
export async function getEndpointClient(options: EndpointClientOptions): Promise<EndpointClient | undefined> {
	if (!isInitialized) {
		logger.warn("A endpoint client was requested before the endpoint provider was registered.", options);
		return undefined;
	}

	if (!allowEndpointClientCreation) {
		logger.warn(
			"Endpoint client creation is disabled. If you this is not expected please check you Endpoint Provider -> Endpoint Clients settings."
		);
		return undefined;
	}

	const listedClientOptions = endpointClientOptions.find((optionEntry) => optionEntry.id === options.id);

	if (restrictEndpointClientCreationToListed && isEmpty(listedClientOptions)) {
		logger.warn(
			`Endpoint client creation is limited to those listed in the endpoint clients section of the endpoint provider. We have been unable to find an entry with the id: ${options.id}. `
		);
		return undefined;
	}

	if (!isEmpty(listedClientOptions) && listedClientOptions.enabled === false) {
		logger.warn(
			`The options passed to create a endpoint client was a listed entry and it's enabled setting is set to false so a endpoint client will not be created. Id: ${options.id}`
		);
		return undefined;
	}

	const clientOptions = Object.assign(options, endpointClientDefaults, listedClientOptions ?? {});

	return new EndpointClient(clientOptions, endpointProvider);
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

	if (isEmpty(endpoint)) {
		return false;
	}

	const endpointType = endpoint.type;

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpointType === "fetch") {
		const { url, ...options } = endpoint.options;
		if (url) {
			const req = getRequestOptions(url, options, request);
			if (!isStringValue(req.options.method) || !SUPPORTED_HTTP_METHODS.includes(req.options.method)) {
				logger.warn(
					`${endpointId} specifies a type: ${endpointType} with a method ${req.options.method} that is not supported.`
				);
				return false;
			}
			try {
				const response = await fetch(req.url, req.options);
				return response.ok;
			} catch (err) {
				logger.error(`${endpointId} action returned an error during fetch`, err);
			}
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

	if (isEmpty(endpoint)) {
		return;
	}

	const endpointType = endpoint.type;

	// currently only fetch is supported but you could load different implementations of this intent based on type
	if (endpointType === "fetch") {
		const { url, ...options } = endpoint.options;
		let targetUrl = url;
		if (isEmpty(targetUrl)) {
			const requestClone = objectClone(request) as { [id: string]: string };
			// was we passed a url in the request?
			targetUrl = requestClone.url;
		}
		if (targetUrl) {
			const req = getRequestOptions(targetUrl, options, request);
			if (!isStringValue(req.options.method) || !SUPPORTED_HTTP_METHODS.includes(req.options.method)) {
				logger.warn(
					`${endpointId} specifies a type: ${endpointType} with a method ${req.options.method} that is not supported.`
				);
				return;
			}
			try {
				const response = await fetch(req.url, req.options);

				if (response.ok) {
					const json = await response.json();
					return json as R;
				}
			} catch (err) {
				logger.error(`${endpointId} requestResponse returned an error during fetch`, err);
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
 * Perform a requestStream on an endpoint.
 * @param endpointId The id of the endpoint to perform the requestStream on.
 * @param request The request to send.
 * @returns The readable stream response from the endpoint.
 */
export async function requestStream<T, R>(
	endpointId: string,
	request?: T
): Promise<ReadableStream<R> | undefined> {
	const endpoint = endpointDefinitions.find((entry) => entry.id === endpointId);

	if (isEmpty(endpoint)) {
		return;
	}

	const endpointType = endpoint.type;

	if (endpointType === "module") {
		const resolvedEndpoint = await getModuleEndpoint(endpoint.typeId);

		if (!resolvedEndpoint?.requestStream) {
			return;
		}
		return resolvedEndpoint.requestStream(endpoint, request) as Promise<ReadableStream<R>>;
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

	if (isEmpty(endpoints)) {
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

	if (isEmpty(endpoint)) {
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
	const requestClone = objectClone(request) as { [id: string]: string };

	if (!isEmpty(requestClone)) {
		// Replace any url params with request object parameters
		// and remove them from the requestClone for all HTTP methods
		const keys = Object.keys(requestClone);
		for (const key of keys) {
			const substituteKey = `[${key}]`;
			if (url.includes(substituteKey)) {
				url = url.replace(substituteKey, encodeURIComponent(requestClone[key]));
				delete requestClone[key];
			}
		}

		options.headers = options.headers ?? {};
		options.headers.Accept = "application/json";

		// Send the body as JSON only for post, put and patch
		if (options.method === "POST" || options.method === "PUT" || options.method === "PATCH") {
			options.body = JSON.stringify(requestClone);
			options.headers["Content-Type"] = "application/json";
		}
	}

	return { url, options };
}
