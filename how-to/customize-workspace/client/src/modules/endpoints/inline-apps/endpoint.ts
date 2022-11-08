import type { App } from "@openfin/workspace";
import type { EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";

let logger: Logger;

export async function initialize(definition: ModuleDefinition, createLogger: LoggerCreator, helpers: ModuleHelpers) {
	logger = createLogger("Inline App Module");
	logger.info("Was passed the following options", definition.data);
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<{
		apps: App[];
	}>,
	request?: never
): Promise<App[]> {
	if (endpointDefinition.type !== "module") {
		logger.warn(
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		return [];
	}
	const results: App[] = endpointDefinition?.options?.apps ?? [];

	logger.info(
		`Returning ${results.length} app entries from the inline apps endpoint with id: ${endpointDefinition.id}`
	);

	return results;
}
