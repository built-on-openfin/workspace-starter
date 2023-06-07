import type { Endpoint, EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { PlatformLocalStorage } from "./platform-local-storage";
import type { IPlatformStorage } from "./platform-storage-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

export class LocalStorageEndpoint implements Endpoint {
	private _logger: Logger;

	private _loggerCreator: LoggerCreator;

	private _storage: { [key: string]: IPlatformStorage<unknown> } = {};

	/**
	 * Create a new instance of InlineAppModuleEndpoint
	 */
	constructor() {
		this._storage = {};
	}

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	) {
		this._loggerCreator = loggerCreator;
		this._logger = loggerCreator("LocalStorageEndpoint");
		this._logger.info("Was passed the following options", definition.data);
	}

	/**
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns True if processed.
	 */
	public async action(
		endpointDefinition: EndpointDefinition<{ dataType: string; method: "REMOVE" | "SET" }>,
		request?: { id: string; payload?: unknown }
	): Promise<boolean> {
		if (isEmpty(request)) {
			this._logger.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
			return false;
		}
		if (endpointDefinition.type !== "module") {
			this._logger.warn(
				`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`
			);
			return false;
		}

		const { dataType, method } = endpointDefinition.options;
		const localStorage = this.getStorage<unknown>(dataType as string);

		if (method === "REMOVE") {
			const id: string = request.id;
			await localStorage.remove(id);
			return true;
		} else if (method === "SET") {
			if (isEmpty(request.payload)) {
				this._logger.warn(`The payload needs to be specified for this action: ${endpointDefinition.id}`);
				return false;
			}
			await localStorage.set(request.id, request.payload);
			return true;
		}
		return false;
	}

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null of not handled.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<{ dataType: string; method: "GET" }>,
		request?: { id?: string; query?: string }
	): Promise<unknown | null> {
		if (endpointDefinition.type !== "module") {
			this._logger.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return null;
		}

		const { dataType, method } = endpointDefinition.options;
		const localStorage = this.getStorage<unknown>(dataType as string);

		if (method === "GET") {
			if (isEmpty(request?.id)) {
				return localStorage.getAll();
			}
			return localStorage.get(request.id);
		}
		return null;
	}

	private getStorage<T>(id: string): IPlatformStorage<T> {
		let localStorage: IPlatformStorage<T> = this._storage[id] as PlatformLocalStorage<T>;
		if (isEmpty(localStorage)) {
			localStorage = new PlatformLocalStorage<T>(id, id, this._loggerCreator);
			this._storage[id] = localStorage;
		}
		return localStorage;
	}
}
