import type { PlatformApp } from "customize-workspace/shapes/app-shapes";
import type { Endpoint, EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";

export class InlineAppModuleEndpoint implements Endpoint {
	private _logger: Logger;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(definition: ModuleDefinition, createLogger: LoggerCreator, helpers: ModuleHelpers) {
		this._logger = createLogger("InlineAppModuleEndpoint");
		this._logger.info("Was passed the following options", definition.data);
	}

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null of not handled.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<{
			apps: PlatformApp[];
		}>,
		request?: unknown
	): Promise<PlatformApp[]> {
		if (endpointDefinition.type !== "module") {
			this._logger.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return [];
		}
		const results: PlatformApp[] = endpointDefinition?.options?.apps ?? [];

		this._logger.info(
			`Returning ${results.length} app entries from the inline apps endpoint with id: ${endpointDefinition.id}`
		);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return results;
	}
}
