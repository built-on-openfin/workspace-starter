import { createLogger } from "workspace-platform-starter/logger-provider";
import type {
	EndpointClientOptions,
	EndpointClient as EndpointClientInterface
} from "./shapes/endpoint-shapes";

/**
 * An endpoint client providing access to endpoint modules/functionality used this platform.
 */
export class EndpointClient implements EndpointClientInterface {
	private readonly _options: EndpointClientOptions;

	private readonly _endpointProvider: EndpointClientInterface;

	private readonly _logger;

	/**
	 * Endpoint options.
	 * @param options Endpoint options.
	 * @param endpointProvider The endpointProvider to execute client requests (if allowed) against.
	 */
	constructor(options: EndpointClientOptions, endpointProvider: EndpointClientInterface) {
		this._options = options;
		this._endpointProvider = endpointProvider;
		this._logger = createLogger(`Endpoint Client:${this._options.id}`);
	}

	/**
	 * Does the endpoint with the specified id exist.
	 * @param id The id to check for existence.
	 * @returns True if the endpoint exists.
	 */
	public hasEndpoint(id: string): boolean {
		if (!Array.isArray(this._options?.endpointIds)) {
			return false;
		}
		const supportedEndpointId = this._options.endpointIds.some((entry) => entry === "*" || entry === id);
		if (supportedEndpointId) {
			return this._endpointProvider.hasEndpoint(id);
		}
		return false;
	}

	/**
	 * Perform an action on an endpoint.
	 * @param endpointId The id of the endpoint to perform the action on.
	 * @param request The request to send.
	 * @returns True if the action was performed successfully.
	 */
	public async action<T>(endpointId: string, request?: T): Promise<boolean> {
		if (this.hasEndpoint(endpointId)) {
			return this._endpointProvider.action(endpointId, request);
		}
		this._logger.warn(
			`The endpoint Id ${endpointId} does not exist or you do not have permission to use it for this action. Returning false.`
		);
		return false;
	}

	/**
	 * Perform a request/response on an endpoint.
	 * @param endpointId The id of the endpoint to perform the request/response on.
	 * @param request The request to send.
	 * @returns The response from the endpoint.
	 */
	public async requestResponse<T, R>(endpointId: string, request?: T): Promise<R | undefined> {
		if (this.hasEndpoint(endpointId)) {
			return this._endpointProvider.requestResponse(endpointId, request);
		}
		this._logger.warn(
			`The endpoint Id ${endpointId} does not exist or you do not have permission to use it for a request/response. Returning undefined.`
		);
	}

	/**
	 * Perform a request/response on an endpoint.
	 * @param endpointId The id of the endpoint to perform the request/response on.
	 * @param request The request to send.
	 * @returns The readable stream from the endpoint.
	 */
	public async requestStream<T, R>(endpointId: string, request?: T): Promise<ReadableStream<R> | undefined> {
		if (this.hasEndpoint(endpointId)) {
			return this._endpointProvider.requestStream(endpointId, request);
		}
		this._logger.warn(
			`The endpoint Id ${endpointId} does not exist or you do not have permission to use it for a requestStream. Returning undefined.`
		);
	}
}
