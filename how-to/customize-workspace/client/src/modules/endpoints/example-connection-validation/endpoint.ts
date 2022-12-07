import type {
	ConnectionPayloadVerificationRequest,
	ConnectionPayloadVerificationResponse
} from "customize-workspace/shapes/connection-shapes";
import type { EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";

let logger: Logger;

export async function initialize(definition: ModuleDefinition, createLogger: LoggerCreator, helpers?: never) {
	logger = createLogger("ConnectionValidationEndpoint");
	logger.info("Was passed the following options", definition.data);
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<unknown>,
	request?: ConnectionPayloadVerificationRequest<unknown>
): Promise<ConnectionPayloadVerificationResponse> {
	const defaultValue = { isValid: false };

	if (endpointDefinition.type !== "module") {
		logger.warn(
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		return defaultValue;
	}
	if (logger !== undefined) {
		logger.info(
			"This payload verification module is an example that always returns true. Please replace with one that validates the connection either locally or by using a rest service."
		);
		logger.info(`Supplied identity: ${JSON.stringify(request?.identity)}`);
		logger.info(`Supplied options: ${JSON.stringify(request?.options)}`);
	}
	defaultValue.isValid = true;
	logger.info("Setting isValid to true");
	return defaultValue;
}
