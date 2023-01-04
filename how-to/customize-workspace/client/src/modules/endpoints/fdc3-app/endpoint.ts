import type { PlatformApp } from "customize-workspace/shapes/app-shapes";
import type { EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import * as fdc3OnePointTwoHelper from "./fdc3-1-2-helper";
import type { AppDefinition as AppDefinitionOnePointTwo } from "./fdc3-1-2-shapes";
import * as fdc3TwoPointZeroHelper from "./fdc3-2-0-helper";
import type { AppDefinition as AppDefinitionTwoPointZero } from "./fdc3-2-0-shapes";

let logger: Logger;

export async function initialize(
	definition: ModuleDefinition,
	createLogger: LoggerCreator,
	helpers: ModuleHelpers
) {
	logger = createLogger("FDC3 App Mapper");
	logger.info("Was passed the following options", definition.data);
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<{
		fdc3Version: string;
	}>,
	request?: unknown[] | { applications: unknown[] }
): Promise<PlatformApp[]> {
	const results: PlatformApp[] = [];

	if (endpointDefinition.type !== "module") {
		logger.warn(
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return results;
	}
	const fdc3Version = endpointDefinition?.options?.fdc3Version ?? "1.2";
	let applications;

	if (Array.isArray(request)) {
		applications = request;
	} else {
		applications = request.applications;
	}
	if (fdc3Version === "1.2") {
		for (let i = 0; i < applications.length; i++) {
			const passedApp: AppDefinitionOnePointTwo = applications[i] as AppDefinitionOnePointTwo;
			const platformApp: PlatformApp = {
				appId: passedApp.appId,
				name: passedApp.name,
				title: passedApp.title || passedApp.name,
				manifestType: passedApp.manifestType,
				manifest: fdc3OnePointTwoHelper.getManifest(passedApp) as string,
				description: passedApp.description,
				intents: passedApp.intents,
				tags: fdc3OnePointTwoHelper.getTags(passedApp),
				version: passedApp.version,
				publisher: passedApp.publisher,
				contactEmail: passedApp.contactEmail,
				supportEmail: passedApp.supportEmail,
				icons: fdc3OnePointTwoHelper.getIcons(passedApp.icons),
				images: fdc3OnePointTwoHelper.getImages(passedApp.images),
				private: fdc3OnePointTwoHelper.getPrivate(passedApp)
			};
			results.push(platformApp);
		}
	} else if (fdc3Version === "2.0") {
		for (let i = 0; i < applications.length; i++) {
			const passedApp: AppDefinitionTwoPointZero = applications[i] as AppDefinitionTwoPointZero;
			const platformApp: PlatformApp = {
				appId: passedApp.appId,
				name: passedApp.name,
				title: passedApp.title || passedApp.name,
				manifestType: fdc3TwoPointZeroHelper.getManifestType(passedApp),
				manifest: fdc3TwoPointZeroHelper.getManifest(passedApp) as string,
				description: passedApp.description,
				intents: fdc3TwoPointZeroHelper.getIntents(passedApp),
				tags: passedApp.categories,
				version: passedApp.version,
				publisher: passedApp.publisher,
				contactEmail: passedApp.contactEmail,
				supportEmail: passedApp.supportEmail,
				icons: passedApp.icons,
				images: passedApp.screenshots,
				private: fdc3TwoPointZeroHelper.getPrivate(passedApp)
			};
			results.push(platformApp);
		}
	} else {
		logger.warn(`Unsupported FDC3 version passed: ${fdc3Version}. Unable to map apps.`);
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return results;
}
