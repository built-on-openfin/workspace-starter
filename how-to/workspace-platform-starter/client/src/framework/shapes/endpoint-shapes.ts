import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * Endpoint provider options
 */
export interface EndpointProviderOptions extends ModuleList {
	/**
	 * An array of endpoint definitions that can either use the built in fetch support or load modules that provide
	 * different implementations for executing actions or performing request/response actions
	 */
	endpoints?: EndpointDefinition[];

	/**
	 * A collection of rules and settings for endpoint clients that fall under this platform.
	 */
	endpointClients?: EndpointClients;
}

/**
 * Definition for an endpoint provider module.
 */
export interface Endpoint<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns True if processed.
	 */
	action?(endpointDefinition: EndpointDefinition, request?: unknown): Promise<boolean>;

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null if not handled.
	 */
	requestResponse?(endpointDefinition: EndpointDefinition, request?: unknown): Promise<unknown>;

	/**
	 * Handle a request for a stream of data.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null if not handled.
	 */
	requestStream?(
		endpointDefinition: EndpointDefinition,
		request?: unknown
	): Promise<ReadableStream<unknown> | undefined>;
}

/**
 * Definition for the platform endpoint provider.
 */
export interface EndpointProvider {
	/**
	 * Initialize the endpoint provider.
	 * @param options The options for the endpoint provider.
	 * @param helpers Module helpers to pass to any loaded modules.
	 */
	init: (options: EndpointProviderOptions | undefined, helpers: ModuleHelpers) => Promise<void>;

	/**
	 * Does the endpoint with the specified id exist.
	 * @param id The id to check for existence.
	 * @returns True if the endpoint exists.
	 */
	hasEndpoint(id: string): boolean;

	/**
	 * Perform an action on an endpoint.
	 * @param endpointId The id of the endpoint to perform the action on.
	 * @param request The request to send.
	 * @returns True if the action was performed successfully.
	 */
	action<T>(endpointId: string, request?: T): Promise<boolean>;

	/**
	 * Perform a request/response on an endpoint.
	 * @param endpointId The id of the endpoint to perform the request/response on.
	 * @param request The request to send.
	 * @returns The response from the endpoint.
	 */
	requestResponse<T, R>(endpointId: string, request?: T): Promise<R | undefined>;

	/**
	 * Perform a request/response on an endpoint.
	 * @param endpointId The id of the endpoint to perform the request/response on.
	 * @param request The request to send.
	 * @returns The stream from the endpoint.
	 */
	requestStream<T, R>(endpointId: string, request?: T): Promise<ReadableStream<R> | undefined>;
}

/**
 * A client to access controlled access to endpoints using the endpoint provider for guidance.
 */
export type EndpointClient = Omit<EndpointProvider, "init">;

/**
 * Shared properties for endpoints.
 */
interface BaseEndpointDefinition {
	/**
	 * A unique id for this endpoint. This ID will be called by the platform. In the future you may change what the
	 * implementation for this endpoint is but you can keep the same endpoint id and request/response objects in order
	 * to not require changes from the platform.
	 */
	id: string;

	/**
	 * Indicates the type of endpoint that this is. Is it a module based endpoint or does it use an endpoint type
	 * supported by the platform
	 */
	type: "module" | "fetch";
}

/**
 * Specific endpoint type for modules.
 */
export type ModuleEndpointDefinition<O> = BaseEndpointDefinition & {
	/**
	 * This indicates that this endpoint depends on a module that needs to be loaded in order for it to work
	 */
	type: "module";

	/**
	 * The id of the module that should be loaded.
	 */
	typeId: string;

	/**
	 * The data to be passed to this endpoint when it is called so that it knows how to act
	 */
	options?: O;
};

/**
 * Specific endpoint type for fetching.
 */
export type FetchEndpointDefinition = BaseEndpointDefinition & {
	/**
	 * This uses the built in support for fetch and the options will be the fetch options
	 */
	type: "fetch";
	/**
	 * The data to be passed to this endpoint when it is called so that it knows how to act
	 */
	options: FetchOptions;
};

/**
 * All the types for endpoints.
 */
export type EndpointDefinition<O = unknown> = FetchEndpointDefinition | ModuleEndpointDefinition<O>;

/**
 * Options for fetching
 */
export interface FetchOptions {
	/**
	 * The url to fetch from.
	 */
	url?: string;

	/**
	 * The body to send with the fetch.
	 */
	body?: string;

	/**
	 * The HTTP methods for fetch.
	 */
	method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

	/**
	 * Credentials to send with the fetch.
	 */
	credentials?: "omit" | "same-origin" | "include";

	/**
	 * Cors mode for requests.
	 */
	mode?: "no-cors" | "cors" | "same-origin";

	/**
	 * Caching for the connection.
	 */
	cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";

	/**
	 * How to handle redirects.
	 */
	redirect?: "manual" | "follow" | "error";

	/**
	 * The referrer policy to use.
	 */
	referrerPolicy?:
		| "no-referrer"
		| "no-referrer-when-downgrade"
		| "origin"
		| "origin-when-cross-origin"
		| "same-origin"
		| "strict-origin"
		| "strict-origin-when-cross-origin"
		| "unsafe-url";

	/**
	 * Additional headers to send with the fetch.
	 */
	headers?: { [key: string]: string };
}

/**
 * A collection of rules and settings for endpoint clients that fall under this platform.
 */
export interface EndpointClients {
	/**
	 * Should the notification client be passed only to those
	 * listed or should all modules receive it but the list acts
	 * as an override. Default is true.
	 */
	restrictToListed?: boolean;

	/**
	 * What default options should be applied against this platform
	 */
	defaults?: EndpointClientDefaultOptions;

	/**
	 * If restricted to listed is true (the default) then an entry needs to exist for each module id
	 * that should be provided with a endpoint client. Otherwise all modules
	 * will be provided with a endpoint client using the default rules if provided.
	 * If restrictToListed is false the clients list can still be used to disable
	 * specific modules by specifying their id and enabled: false. It also allows you
	 * to specify overrides for specific modules regardless of the restrictToListed setting.
	 */
	clientOptions?: EndpointClientOptions[];
}

/**
 * A set of default options that will apply against all endpoint clients unless they
 * have a setting of their own.
 */
export interface EndpointClientDefaultOptions {
	/**
	 * The list of specific endpoint Ids that clients should be able to access. * = access to all endpoints. We would recommend being restrictive and only provide * if needed to specific modules.
	 */
	endpointIds?: string[];
}

/**
 * Options that allow you to influence the behavior of the notification client.
 */
export interface EndpointClientOptions extends EndpointClientDefaultOptions {
	/**
	 * The id that acts as the reference to a module id
	 */
	id: string;

	/**
	 * Should this module have a endpoint client. Default is true.
	 */
	enabled?: boolean;
}
