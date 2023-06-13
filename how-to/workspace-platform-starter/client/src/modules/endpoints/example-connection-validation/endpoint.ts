import type {
	ConnectionPayloadVerificationRequest,
	ConnectionPayloadVerificationResponse
} from "workspace-platform-starter/shapes/connection-shapes";
import type { Endpoint, EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "../../../framework/utils";

/**
 * Example connection validation endpoint.
 */
export class ConnectionValidationEndpoint implements Endpoint {
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
		this._logger = loggerCreator("ConnectionValidationEndpoint");
		this._logger.info("Was passed the following options", definition.data);
	}

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null of not handled.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<unknown>,
		request?: ConnectionPayloadVerificationRequest
	): Promise<ConnectionPayloadVerificationResponse> {
		const defaultValue = { isValid: false };

		if (endpointDefinition.type !== "module") {
			this._logger?.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return defaultValue;
		}
		if (!isEmpty(this._logger)) {
			this._logger.info(
				"This payload verification module is an example that always returns true. Please replace with one that validates the connection either locally or by using a rest service."
			);
			this._logger.info(`Supplied identity: ${JSON.stringify(request?.identity)}`);
			this._logger.info(`Supplied options: ${JSON.stringify(request?.options)}`);
		}
		defaultValue.isValid = true;
		this._logger?.info("Setting isValid to true");
		return defaultValue;
	}
}
