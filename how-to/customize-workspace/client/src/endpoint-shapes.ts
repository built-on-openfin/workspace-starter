export interface EndpointProvider {
	init: (options: unknown) => Promise<void>;
	hasEndpoint(id: string): boolean;
	action<T>(endpointId: string, request?: T): Promise<boolean>;
	requestResponse<T, R>(endpointId: string, request?: T): Promise<R | null>;
}

export interface Endpoint {
	init: (options: unknown) => Promise<void>;
	action<T>(endpointDefinition: EndpointDefinition, request?: T): Promise<boolean>;
	requestResponse<T, R>(endpointDefinition: EndpointDefinition, request?: T): Promise<R | null>;
}

export interface EndpointModule {
	endpoint: Endpoint;
}
export interface EndpointModuleDefinition {
	id: string;
	url: string;
	data?: unknown;
}

export interface EndpointProviderOptions {
	modules?: EndpointModuleDefinition[];
	endpoints?: EndpointDefinition[];
}

interface BaseEndpointDefinition<O> {
	id: string;
	type: string;
	options?: O;
}

type ModuleEndpointDefinition<O> = BaseEndpointDefinition<O> & {
	type: "module";
	typeId: string;
};

// We could include more in this type

type FetchEndpointDefinition = BaseEndpointDefinition<FetchOptions & { url: string }> & {
	type: "fetch";
};

// We could include more in this type
export type EndpointDefinition = FetchEndpointDefinition | ModuleEndpointDefinition<unknown>;

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
	headers?: { [key: string]: string };
}
