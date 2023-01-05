import type { CustomSettings, PlatformApp } from "customize-workspace/shapes";
import type { EndpointDefinition, FetchOptions } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";
import type { ExampleEndpointOptions, ExampleUserRoleMapping } from "./shapes";
import { getCurrentUser } from "./util";

let logger: Logger;
let userSessionKey: string;
let roleMapping: { [key: string]: ExampleUserRoleMapping };
let definitionData: ModuleDefinition<ExampleEndpointOptions>;

function getRequestOptions(
	url: string,
	options: FetchOptions,
	request: unknown
): { url: string; options: FetchOptions } {
	if (options.method === "GET") {
		if (request !== undefined) {
			const keys = Object.keys(request);
			if (keys.length > 0) {
				const length = keys.length;
				for (let i = 0; i < length; i++) {
					url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]] as string));
				}
			}
		}
	} else if (options.method === "POST" && request !== undefined) {
		options.body = JSON.stringify(request);
	}

	return { url, options };
}

function applyCurrentUserToApps(apps: PlatformApp[] = []): PlatformApp[] {
	const currentUser = getCurrentUser(userSessionKey);
	if (
		currentUser === null ||
		roleMapping === undefined ||
		roleMapping[currentUser.role] === undefined ||
		roleMapping[currentUser.role].excludeAppsWithTag === undefined
	) {
		return apps;
	}
	const excludeTag = roleMapping[currentUser.role].excludeAppsWithTag;
	const filteredApps: PlatformApp[] = [];
	for (let i = 0; i < apps.length; i++) {
		if (Array.isArray(apps[i].tags)) {
			let include = true;
			for (let t = 0; t < apps[i].tags.length; t++) {
				const tag: string = apps[i].tags[t];
				if (excludeTag.includes(tag)) {
					include = false;
					break;
				}
			}
			if (include) {
				filteredApps.push(apps[i]);
			}
		} else {
			filteredApps.push(apps[i]);
		}
	}
	return filteredApps;
}

function applyCurrentUserToSettings(settings: CustomSettings): CustomSettings {
	const currentUser = getCurrentUser(userSessionKey);
	if (currentUser === null || roleMapping === undefined || roleMapping[currentUser.role] === undefined) {
		return settings;
	}

	if (Array.isArray(settings?.endpointProvider?.modules)) {
		settings.endpointProvider.modules.push({
			data: definitionData,
			enabled: definitionData.enabled,
			id: definitionData.id,
			description: definitionData.description,
			icon: definitionData.icon,
			info: definitionData.info,
			title: definitionData.title,
			url: definitionData.url
		});
		if (
			Array.isArray(settings?.endpointProvider?.endpoints) &&
			Array.isArray(settings?.appProvider?.endpointIds)
		) {
			const appEndpoints = settings?.appProvider?.endpointIds;
			for (let i = 0; i < appEndpoints.length; i++) {
				if (typeof appEndpoints[i] === "string") {
					const endpointToUpdate = settings.endpointProvider.endpoints.find(
						(endpointEntry) => endpointEntry.id === appEndpoints[i] && endpointEntry.type === "fetch"
					);
					endpointToUpdate.type = "module";
					if (endpointToUpdate.type === "module") {
						endpointToUpdate.typeId = definitionData.id;
					}
				}
			}
		}
	}

	if (
		Array.isArray(settings?.themeProvider?.themes) &&
		settings?.themeProvider?.themes.length > 0 &&
		roleMapping[currentUser.role].preferredScheme !== undefined
	) {
		// eslint-disable-next-line @typescript-eslint/dot-notation
		settings.themeProvider.themes[0]["default"] = roleMapping[currentUser.role].preferredScheme;
	}

	const excludeMenuActionIds = roleMapping[currentUser.role].excludeMenuAction;

	if (Array.isArray(excludeMenuActionIds)) {
		if (
			Array.isArray(settings?.browserProvider?.globalMenu) &&
			settings?.browserProvider?.globalMenu.length > 0
		) {
			for (let i = 0; i < settings?.browserProvider?.globalMenu.length; i++) {
				const globalMenuActionId: string = settings.browserProvider.globalMenu[i]?.data?.action?.id;
				if (excludeMenuActionIds.includes(globalMenuActionId)) {
					settings.browserProvider.globalMenu[i].include = false;
				}
			}
		}

		if (
			Array.isArray(settings?.browserProvider?.pageMenu) &&
			settings?.browserProvider?.pageMenu.length > 0
		) {
			for (let i = 0; i < settings?.browserProvider?.pageMenu.length; i++) {
				const pageMenuActionId: string = settings.browserProvider.pageMenu[i]?.data?.action?.id;
				if (excludeMenuActionIds.includes(pageMenuActionId)) {
					settings.browserProvider.pageMenu[i].include = false;
				}
			}
		}

		if (
			Array.isArray(settings?.browserProvider?.viewMenu) &&
			settings?.browserProvider?.viewMenu.length > 0
		) {
			for (let i = 0; i < settings?.browserProvider?.viewMenu.length; i++) {
				const viewMenuActionId: string = settings.browserProvider.viewMenu[i]?.data?.action?.id;
				if (excludeMenuActionIds.includes(viewMenuActionId)) {
					settings.browserProvider.viewMenu[i].include = false;
				}
			}
		}
	}

	return settings;
}

export async function initialize(
	definition: ModuleDefinition<ExampleEndpointOptions>,
	createLogger: LoggerCreator,
	helpers?: never
) {
	logger = createLogger("ExampleAuthEndpoint");
	logger.info("Was passed the following options", definition.data);
	userSessionKey = definition?.data?.userSessionId;
	roleMapping = definition?.data?.roleMapping;
	definitionData = definition;
}

export async function requestResponse(
	endpointDefinition: EndpointDefinition<FetchOptions>,
	request?: unknown
): Promise<unknown> {
	if (endpointDefinition.type !== "module") {
		logger.warn(
			`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
		);
		return null;
	}
	if (logger !== undefined) {
		logger.info(
			"This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION."
		);
	}

	const { url, ...options } = endpointDefinition.options;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const req = getRequestOptions(url, options, request);
	if (req.options.method !== "GET" && req.options.method !== "POST") {
		logger.warn(
			`${endpointDefinition.id} specifies a type: ${endpointDefinition.type} with a method ${req.options.method} that is not supported.`
		);
		return null;
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const response = await fetch(req.url, req.options);

	if (response.ok) {
		const json = await response.json();
		if (Array.isArray(json)) {
			// returned apps
			return applyCurrentUserToApps(json) as unknown;
		}
		// settings
		return applyCurrentUserToSettings(json) as unknown;
	}
	return null;
}
