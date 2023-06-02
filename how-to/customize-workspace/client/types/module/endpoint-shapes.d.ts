import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
export interface EndpointProvider {
	init: (options: unknown, helpers: ModuleHelpers) => Promise<void>;
	hasEndpoint(id: string): boolean;
	action<T>(endpointId: string, request?: T): Promise<boolean>;
	requestResponse<T, R>(endpointId: string, request?: T): Promise<R | null>;
}
export interface Endpoint<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns True if processed.
	 */
	action?(endpointDefinition: EndpointDefinition<unknown>, request?: unknown): Promise<boolean>;
	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null of not handled.
	 */
	requestResponse?(
		endpointDefinition: EndpointDefinition<unknown>,
		request?: unknown
	): Promise<unknown | null>;
}
/** Endpoint provider options */
export interface EndpointProviderOptions extends ModuleList {
	/** An array of endpoint definitions that can either use the built in fetch support or load modules that provide different implementations for executing actions or performing request/response actions */
	endpoints?: EndpointDefinition<unknown>[];
}
interface BaseEndpointDefinition<O> {
	/**
	 * A unique id for this endpoint. This ID will be called by the platform.
	 * In the future you may change what the implementation for this endpoint
	 * is but you can keep the same endpoint id and request/response objects
	 * in order to not require changes from the platform.
	 * */
	id: string;
	/** Indicates the type of endpoint that this is. Is it a module based endpoint or does it use an endpoint type supported by the platform */
	type: "module" | "fetch";
	/** The data to be passed to this endpoint when it is called so that it knows how to act */
	options?: O;
}
type ModuleEndpointDefinition<O> = BaseEndpointDefinition<O> & {
	/** This indicates that this endpoint depends on a module that needs to be loaded in order for it to work */
	type: "module";
	/** The id of the module that should be loaded */
	typeId: string;
};
type FetchEndpointDefinition<O> = BaseEndpointDefinition<O> & {
	/** This uses the built in support for fetch and the options will be the fetch options */
	type: "fetch";
};
/** An endpoint entry definition */
export type EndpointDefinition<O> = FetchEndpointDefinition<FetchOptions> | ModuleEndpointDefinition<O>;
export interface FetchOptions {
	url?: string;
	body?: string;
	method?: "GET" | "POST";
	credentials?: "omit" | "same-origin" | "include";
	mode?: "no-cors" | "cors" | "same-origin";
	cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";
	redirect?: "manual" | "follow" | "error";
	referrerPolicy?:
		| "no-referrer"
		| "no-referrer-when-downgrade"
		| "origin"
		| "origin-when-cross-origin"
		| "same-origin"
		| "strict-origin"
		| "strict-origin-when-cross-origin"
		| "unsafe-url";
	headers?: {
		[key: string]: string;
	};
}
export {};
