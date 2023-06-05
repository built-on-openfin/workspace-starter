import type { EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import {
	type ContextProcessorEndpoint,
	type ContextToProcess,
	type ProcessedContext
} from "customize-workspace/shapes/interopbroker-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import { type ContextProcessorSettings } from "./shapes";

export class ExampleContextProcessorEndpoint implements ContextProcessorEndpoint {
	private _logger: Logger;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		createLogger: LoggerCreator,
		helpers?: ModuleHelpers
	) {
		this._logger = createLogger("ExampleContextProcessorEndpoint");
		this._logger.info("Was passed the following options", definition.data);
	}

	/**
	 * Takes a context object and returns an enriched version
	 * @param endpointDefinition The definition of the endpoint (which is passed by the endpoint provider).
	 * @param request The request containing the context to process that is passed by the interopbroker.
	 * @returns The response containing the enriched or original context object.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<ContextProcessorSettings>,
		request: ContextToProcess
	): Promise<ProcessedContext> {
		// decouple the request from the response.
		const response = { context: JSON.parse(JSON.stringify(request?.context)) };

		if (endpointDefinition.type !== "module") {
			this._logger.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return response;
		}

		this._logger.info(
			"This is an example of an endpoint that can process a context object that was passed to the broker and needs processing."
		);

		if (request?.context?.type === "org.dayofinterest") {
			if (endpointDefinition?.options?.logContext) {
				this._logger.info(`Context Type ${request.context.type} matched. Incoming context:`, request.context);
			}
			if (request.context.id?.date !== undefined) {
				// we would do more validation in a real app
				const targetDate = new Date(request.context.id.date);
				if (!this.isValid(response.context.id.day)) {
					response.context.id.day = `${targetDate.getDate()}`;
				}
				if (!this.isValid(response.context.id.month)) {
					response.context.id.month = `${targetDate.getMonth() + 1}`;
				}
				if (!this.isValid(response.context.id.year)) {
					response.context.id.year = `${targetDate.getFullYear()}`;
				}
				if (!this.isValid(response.context.id.epoch)) {
					response.context.id.epoch = `${targetDate.getTime() / 1000}`;
				}
				if (!this.isValid(response.context.id.utc)) {
					response.context.id.utc = `${targetDate.toUTCString()}`;
				}
				if (!this.isValid(response.context.id.iso)) {
					response.context.id.iso = `${targetDate.toISOString()}`;
				}
				if (endpointDefinition?.options?.logContext) {
					this._logger.info(
						`Context Type ${response.context.type} matched. Processed context:`,
						response.context
					);
				}
			} else {
				this._logger.warn(
					`Unable to process ${request.context.type} as it did not have date as part of the id`
				);
			}
		}
		return response;
	}

	/**
	 * Does the id need to be set
	 * @param id The property from within the id object.
	 */
	private isValid(id: string): boolean {
		return id !== undefined && id !== null && id.trim().length > 0;
	}
}
