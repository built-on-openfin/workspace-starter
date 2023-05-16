import type { CustomSettings } from "customize-workspace/shapes";
import type { Endpoint, EndpointDefinition, FetchOptions } from "customize-workspace/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import type { AppWithTagsOrCategories, ExampleEndpointOptions, ExampleUserRoleMapping } from "./shapes";
import { getCurrentUser } from "./util";

export class ExampleAuthEndpoint implements Endpoint<ExampleEndpointOptions> {
	private _definition: ModuleDefinition<ExampleEndpointOptions>;

	private _logger: Logger;

	private _roleMapping: { [key: string]: ExampleUserRoleMapping };

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleEndpointOptions>,
		createLogger: LoggerCreator,
		helpers?: ModuleHelpers
	) {
		this._logger = createLogger("ExampleAuthEndpoint");
		this._logger.info("Was passed the following options", definition.data);
		this._roleMapping = definition?.data?.roleMapping;
		this._definition = definition;
	}

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null of not handled.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<FetchOptions>,
		request?: unknown
	): Promise<
		CustomSettings | AppWithTagsOrCategories[] | { applications: AppWithTagsOrCategories[] } | null
	> {
		if (endpointDefinition.type !== "module") {
			this._logger.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return null;
		}
		if (this._logger !== undefined) {
			this._logger.info(
				"This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION."
			);
		}

		const { url, ...options }: FetchOptions = endpointDefinition.options;

		const req = this.getRequestOptions(url as string, options, request);
		if (req.options.method !== "GET" && req.options.method !== "POST") {
			this._logger.warn(
				`${endpointDefinition.id} specifies a type: ${endpointDefinition.type} with a method ${req.options.method} that is not supported.`
			);
			return null;
		}

		const response = await fetch(req.url, req.options as RequestInit);

		if (response.ok) {
			const json = await response.json();

			if (Array.isArray(json)) {
				// returned apps
				return this.applyCurrentUserToApps(json as AppWithTagsOrCategories[]);
			} else if (Array.isArray(json.applications)) {
				return {
					applications: this.applyCurrentUserToApps(json.applications as AppWithTagsOrCategories[])
				};
			}
			// settings
			return this.applyCurrentUserToSettings(json as CustomSettings);
		}
		return null;
	}

	private getRequestOptions(
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

	private applyCurrentUserToApps(apps: AppWithTagsOrCategories[]): AppWithTagsOrCategories[] {
		const currentUser = getCurrentUser();
		if (
			currentUser === null ||
			this._roleMapping === undefined ||
			this._roleMapping[currentUser.role] === undefined ||
			this._roleMapping[currentUser.role].excludeAppsWithTag === undefined
		) {
			return apps;
		}
		const excludeTag = this._roleMapping[currentUser.role].excludeAppsWithTag;

		const applications: AppWithTagsOrCategories[] = [];
		if (Array.isArray(apps)) {
			for (const app of apps) {
				const lookup: string[] = app.tags ?? app.categories;
				if (Array.isArray(lookup)) {
					if (this.includeInResponse(lookup, excludeTag)) {
						applications.push(app);
					}
				} else {
					applications.push(app);
				}
			}
		}
		return applications;
	}

	private includeInResponse(tags: string[], excludeTags: string[]): boolean {
		let include = true;
		if (!Array.isArray(excludeTags)) {
			return true;
		}
		for (const tag of tags) {
			const currentTag: string = tag;
			if (excludeTags.includes(currentTag)) {
				include = false;
				break;
			}
		}
		return include;
	}

	private applyCurrentUserToSettings(settings: CustomSettings): CustomSettings {
		const currentUser = getCurrentUser();
		if (
			currentUser === null ||
			this._roleMapping === undefined ||
			this._roleMapping[currentUser.role] === undefined
		) {
			return settings;
		}

		if (Array.isArray(settings?.endpointProvider?.modules)) {
			settings.endpointProvider.modules.push({
				data: this._definition,
				enabled: this._definition.enabled,
				id: this._definition.id,
				description: this._definition.description,
				icon: this._definition.icon,
				info: this._definition.info,
				title: this._definition.title,
				url: this._definition.url
			});
			if (
				Array.isArray(settings?.endpointProvider?.endpoints) &&
				Array.isArray(settings?.appProvider?.endpointIds)
			) {
				const appEndpoints = settings?.appProvider?.endpointIds;
				let count = 0;
				const updateEndpoints = [];
				for (const endpoint of appEndpoints) {
					if (typeof endpoint === "string") {
						if (endpoint.startsWith("http")) {
							updateEndpoints.push({ position: count, url: endpoint });
						} else {
							const endpointToUpdate = settings.endpointProvider.endpoints.find(
								(endpointEntry) => endpointEntry.id === endpoint && endpointEntry.type === "fetch"
							);
							if (endpointToUpdate !== undefined) {
								endpointToUpdate.type = "module";
								// this if condition check is here to make typescript happy with the endpoint so that typeId can be set
								if (endpointToUpdate.type === "module") {
									endpointToUpdate.typeId = this._definition.id;
								}
							}
						}
					}
					count++;
				}

				if (updateEndpoints.length > 0) {
					if (settings.endpointProvider === undefined) {
						settings.endpointProvider = {
							endpoints: []
						};
					}
					for (const newEndpointEntry of updateEndpoints) {
						const endpointId = `auth-example-endpoint-${newEndpointEntry.position}`;
						settings.appProvider.endpointIds[newEndpointEntry.position] = endpointId;
						settings.endpointProvider.endpoints.push({
							id: endpointId,
							type: "module",
							typeId: this._definition.id,
							options: {
								method: "GET",
								url: newEndpointEntry.url
							}
						});
					}
				}
			}
		}

		if (
			Array.isArray(settings?.themeProvider?.themes) &&
			settings.themeProvider.themes.length > 0 &&
			this._roleMapping[currentUser.role].preferredScheme !== undefined
		) {
			settings.themeProvider.themes[0].default =
				this._roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
			const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
			this._logger.warn(
				"This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart."
			);
			localStorage.removeItem(storedSchemePreference);
		}

		const excludeMenuActionIds = this._roleMapping[currentUser.role].excludeMenuAction;
		const excludeMenuModuleIds = this._roleMapping[currentUser.role].excludeMenuModule;

		if (Array.isArray(excludeMenuActionIds)) {
			if (
				Array.isArray(settings?.browserProvider?.globalMenu) &&
				settings.browserProvider.globalMenu.length > 0
			) {
				for (const globalMenuEntry of settings.browserProvider.globalMenu) {
					const globalMenuActionId: string = globalMenuEntry?.data?.action?.id;
					if (excludeMenuActionIds.includes(globalMenuActionId)) {
						globalMenuEntry.include = false;
					}
				}
			}
			if (
				Array.isArray(settings?.browserProvider?.pageMenu) &&
				settings.browserProvider.pageMenu.length > 0
			) {
				for (const pageMenuEntry of settings.browserProvider.pageMenu) {
					const pageMenuActionId: string = pageMenuEntry?.data?.action?.id;
					if (excludeMenuActionIds.includes(pageMenuActionId)) {
						pageMenuEntry.include = false;
					}
				}
			}
			if (
				Array.isArray(settings?.browserProvider?.viewMenu) &&
				settings.browserProvider.viewMenu.length > 0
			) {
				for (const viewMenuEntry of settings.browserProvider.viewMenu) {
					const viewMenuActionId: string = viewMenuEntry?.data?.action?.id;
					if (excludeMenuActionIds.includes(viewMenuActionId)) {
						viewMenuEntry.include = false;
					}
				}
			}
		}
		if (Array.isArray(excludeMenuModuleIds) && Array.isArray(settings?.menusProvider?.modules)) {
			for (const menuModule of settings.menusProvider.modules) {
				const menuModuleId: string = menuModule.id;
				if (excludeMenuModuleIds.includes(menuModuleId)) {
					menuModule.enabled = false;
				}
			}
		}

		return settings;
	}
}
