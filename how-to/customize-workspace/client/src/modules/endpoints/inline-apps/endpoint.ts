import type { PlatformApp } from "customize-workspace/shapes/app-shapes";
import type { EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";

let logger: Logger;

export async function initialize(
	definition: ModuleDefinition,
	createLogger: LoggerCreator,
	helpers: ModuleHelpers
) {
	logger = createLogger("Inline App Module");
	logger.info("Was passed the following options", definition.data);
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<{
		apps: PlatformApp[];
	}>,
	request?: never
): Promise<PlatformApp[]> {
	if (endpointDefinition.type !== "module") {
		logger.warn(
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		return [];
	}
	const results: PlatformApp[] = endpointDefinition?.options?.apps ?? [];

	logger.info(
		`Returning ${results.length} app entries from the inline apps endpoint with id: ${endpointDefinition.id}`
	);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return results;
}
