import type { PlatformApp } from "customize-workspace/shapes/app-shapes";
import type { Endpoint, EndpointDefinition } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import * as fdc3OnePointTwoHelper from "./fdc3-1-2-helper";
import type { AppDefinition as AppDefinitionOnePointTwo } from "./fdc3-1-2-shapes";
import * as fdc3TwoPointZeroHelper from "./fdc3-2-0-helper";
import type { AppDefinition as AppDefinitionTwoPointZero } from "./fdc3-2-0-shapes";

export class FDC3AppMapperEndpoint implements Endpoint {
	private _logger: Logger;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(definition: ModuleDefinition, createLogger: LoggerCreator, helpers: ModuleHelpers) {
		this._logger = createLogger("FDC3AppMapperEndpoint");
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
			fdc3Version: string;
			fallbackIcon: string;
		}>,
		request?: unknown[] | { applications: unknown[] }
	): Promise<PlatformApp[]> {
		const results: PlatformApp[] = [];

		if (endpointDefinition.type !== "module") {
			this._logger.warn(
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
		for (let i = 0; i < applications.length; i++) {
			let platformApp: PlatformApp;
			if (fdc3Version === "1.2") {
				const passedApp: AppDefinitionOnePointTwo = applications[i] as AppDefinitionOnePointTwo;
				platformApp = {
					appId: passedApp.appId,
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
			} else if (fdc3Version === "2.0") {
				const passedApp: AppDefinitionTwoPointZero = applications[i] as AppDefinitionTwoPointZero;
				platformApp = {
					appId: passedApp.appId,
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
			}
			if (!Array.isArray(platformApp.icons)) {
				platformApp.icons = [];
			}
			if (platformApp.icons.length === 0 && endpointDefinition.options?.fallbackIcon !== undefined) {
				platformApp.icons.push({ src: endpointDefinition.options.fallbackIcon });
			}
			results.push(platformApp);
		}
		if (applications.length > 0 && results.length === 0) {
			this._logger.warn(`Unsupported FDC3 version passed: ${fdc3Version}. Unable to map apps.`);
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return results;
	}
}
