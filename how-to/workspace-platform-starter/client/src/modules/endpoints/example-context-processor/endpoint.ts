import type { EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import {
	type ContextProcessorEndpoint,
	type ContextToProcess,
	type ProcessedContext
} from "workspace-platform-starter/shapes/interopbroker-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue, objectClone } from "../../../framework/utils";
import { type ContextProcessorSettings } from "./shapes";

/**
 * Example context processor endpoint.
 */
export class ExampleContextProcessorEndpoint implements ContextProcessorEndpoint {
	/**
	 * Logged for messages.
	 */
	private _logger?: Logger;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers?: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("ExampleContextProcessorEndpoint");
		this._logger.info("Was passed the following options", definition.data);
	}

	/**
	 * Takes a context object and returns an enriched version.
	 * @param endpointDefinition The definition of the endpoint (which is passed by the endpoint provider).
	 * @param request The request containing the context to process that is passed by the interopbroker.
	 * @returns The response containing the enriched or original context object.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<ContextProcessorSettings>,
		request: ContextToProcess
	): Promise<ProcessedContext> {
		// decouple the request from the response.
		const response = { context: objectClone(request?.context) };

		if (endpointDefinition.type !== "module") {
			this._logger?.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return response;
		}

		this._logger?.info(
			"This is an example of an endpoint that can process a context object that was passed to the broker and needs processing."
		);

		if (request?.context?.type === "org.dayofinterest") {
			if (endpointDefinition?.options?.logContext) {
				this._logger?.info(
					`Context Type ${request.context.type} matched. Incoming context:`,
					request.context
				);
			}
			const contextId = request.context.id;
			if (contextId && !isEmpty(contextId.date)) {
				// we would do more validation in a real app
				const targetDate = new Date(contextId.date);
				if (!isStringValue(contextId.day)) {
					contextId.day = `${targetDate.getDate()}`;
				}
				if (!isStringValue(contextId.month)) {
					contextId.month = `${targetDate.getMonth() + 1}`;
				}
				if (!isStringValue(contextId.year)) {
					contextId.year = `${targetDate.getFullYear()}`;
				}
				if (!isStringValue(contextId.epoch)) {
					contextId.epoch = `${targetDate.getTime() / 1000}`;
				}
				if (!isStringValue(contextId.utc)) {
					contextId.utc = `${targetDate.toUTCString()}`;
				}
				if (!isStringValue(contextId.iso)) {
					contextId.iso = `${targetDate.toISOString()}`;
				}
				if (endpointDefinition?.options?.logContext) {
					this._logger?.info(
						`Context Type ${response.context.type} matched. Processed context:`,
						response.context
					);
				}
			} else {
				this._logger?.warn(
					`Unable to process ${request.context.type} as it did not have date as part of the id`
				);
			}
		}
		return response;
	}
}
