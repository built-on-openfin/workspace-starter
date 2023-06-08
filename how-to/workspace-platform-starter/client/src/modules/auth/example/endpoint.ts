import type {
	Endpoint,
	EndpointDefinition,
	FetchOptions
} from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { CustomSettings } from "workspace-platform-starter/shapes/setting-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { AppWithTagsOrCategories, ExampleEndpointOptions, ExampleUserRoleMapping } from "./shapes";
import { getCurrentUser } from "./util";

/**
 * Example authentication endpoint.
 */
export class ExampleAuthEndpoint implements Endpoint<ExampleEndpointOptions> {
	private _definition?: ModuleDefinition<ExampleEndpointOptions>;

	private _logger?: Logger;

	private _roleMapping?: { [key: string]: ExampleUserRoleMapping };

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleEndpointOptions>,
		loggerCreator: LoggerCreator,
		helpers?: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("ExampleAuthEndpoint");
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
			this._logger?.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return null;
		}
		if (!isEmpty(this._logger)) {
			this._logger.info(
				"This auth endpoint module is an example that that simulates requesting a http endpoint and manipulating it based on the current example user as if it was the server doing the manipulation. DO NOT USE THIS MODULE IN PRODUCTION."
			);
		}

		const { url, ...options }: FetchOptions = endpointDefinition.options;

		const req = this.getRequestOptions(url as string, options, request as { [id: string]: string });
		if (req.options.method !== "GET" && req.options.method !== "POST") {
			this._logger?.warn(
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

	/**
	 * Convert the options to request data.
	 * @param url The url.
	 * @param options The options.
	 * @param request The request object to convert.
	 * @returns The converted options.
	 */
	private getRequestOptions(
		url: string,
		options: FetchOptions,
		request: { [id: string]: string }
	): { url: string; options: FetchOptions } {
		if (options.method === "GET") {
			if (!isEmpty(request)) {
				const keys = Object.keys(request);
				if (keys.length > 0) {
					const length = keys.length;
					for (let i = 0; i < length; i++) {
						url = url.replace(`[${keys[i]}]`, encodeURIComponent(request[keys[i]]));
					}
				}
			}
		} else if (options.method === "POST" && !isEmpty(request)) {
			options.body = JSON.stringify(request);
		}

		return { url, options };
	}

	/**
	 * Apply the current user settings to the applications.
	 * @param apps The list of apps.
	 * @returns The list of apps filtered for use by the user.
	 */
	private applyCurrentUserToApps(apps: AppWithTagsOrCategories[]): AppWithTagsOrCategories[] {
		const currentUser = getCurrentUser();
		if (
			isEmpty(currentUser) ||
			isEmpty(this._roleMapping) ||
			isEmpty(this._roleMapping[currentUser.role]) ||
			isEmpty(this._roleMapping[currentUser.role].excludeAppsWithTag)
		) {
			return apps;
		}
		const excludeTag = this._roleMapping[currentUser.role].excludeAppsWithTag;

		const applications: AppWithTagsOrCategories[] = [];
		if (Array.isArray(apps)) {
			for (const app of apps) {
				const lookup: string[] | undefined = app.tags ?? app.categories;
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

	/**
	 * Compare the tags with the exclude list to see if they should be used.
	 * @param tags The tags to check.
	 * @param excludeTags The exclude list to check against.
	 * @returns True if the item should be included.
	 */
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

	/**
	 * Apply the user settings to the custom settings.
	 * @param settings The settings to filter.
	 * @returns The filtered settings.
	 */
	private applyCurrentUserToSettings(settings: CustomSettings): CustomSettings {
		const currentUser = getCurrentUser();
		if (
			isEmpty(currentUser) ||
			isEmpty(this._roleMapping) ||
			isEmpty(this._roleMapping[currentUser.role]) ||
			isEmpty(this._definition)
		) {
			return settings;
		}

		const modules = settings?.endpointProvider?.modules;
		if (Array.isArray(modules)) {
			modules.push({
				data: this._definition,
				enabled: this._definition.enabled,
				id: this._definition.id,
				description: this._definition.description,
				icon: this._definition.icon,
				info: this._definition.info,
				title: this._definition.title,
				url: this._definition.url
			});
			const appEndpointProviders = settings?.endpointProvider?.endpoints;
			const appEndpointIds = settings?.appProvider?.endpointIds;
			if (Array.isArray(appEndpointProviders) && Array.isArray(appEndpointIds)) {
				let count = 0;
				const updateEndpoints = [];
				for (const endpoint of appEndpointIds) {
					if (typeof endpoint === "string") {
						if (endpoint.startsWith("http")) {
							updateEndpoints.push({ position: count, url: endpoint });
						} else {
							const endpointToUpdate = appEndpointProviders.find(
								(endpointEntry) => endpointEntry.id === endpoint && endpointEntry.type === "fetch"
							);
							if (!isEmpty(endpointToUpdate)) {
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
					if (isEmpty(settings.endpointProvider)) {
						settings.endpointProvider = {
							endpoints: []
						};
					}
					for (const newEndpointEntry of updateEndpoints) {
						const endpointId = `auth-example-endpoint-${newEndpointEntry.position}`;
						appEndpointIds[newEndpointEntry.position] = endpointId;
						appEndpointProviders.push({
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

		const themeProvider = settings.themeProvider;

		if (
			!isEmpty(themeProvider) &&
			Array.isArray(themeProvider.themes) &&
			themeProvider.themes.length > 0 &&
			!isEmpty(this._roleMapping[currentUser.role].preferredScheme)
		) {
			themeProvider.themes[0].default =
				this._roleMapping[currentUser.role].preferredScheme === "dark" ? "dark" : "light";
			const storedSchemePreference = `${fin.me.identity.uuid}-SelectedColorScheme`;
			this._logger?.warn(
				"This is a demo module where we are clearing the locally stored scheme preference in order to show different scheme's light/dark based on user selection. This means that it will always be set to what is in the role mapping initially and not what it is set to locally on restart."
			);
			localStorage.removeItem(storedSchemePreference);
		}

		const excludeMenuActionIds = this._roleMapping[currentUser.role].excludeMenuAction;
		const excludeMenuModuleIds = this._roleMapping[currentUser.role].excludeMenuModule;

		const browserProviders = settings.browserProvider;
		if (!isEmpty(browserProviders) && Array.isArray(excludeMenuActionIds)) {
			if (Array.isArray(browserProviders.globalMenu) && browserProviders.globalMenu.length > 0) {
				for (const globalMenuEntry of browserProviders.globalMenu) {
					const globalMenuActionId: string | undefined = globalMenuEntry?.data?.action?.id;
					if (globalMenuActionId && excludeMenuActionIds.includes(globalMenuActionId)) {
						globalMenuEntry.include = false;
					}
				}
			}
			if (Array.isArray(browserProviders.pageMenu) && browserProviders.pageMenu.length > 0) {
				for (const pageMenuEntry of browserProviders.pageMenu) {
					const pageMenuActionId: string | undefined = pageMenuEntry?.data?.action?.id;
					if (pageMenuActionId && excludeMenuActionIds.includes(pageMenuActionId)) {
						pageMenuEntry.include = false;
					}
				}
			}
			if (Array.isArray(browserProviders.viewMenu) && browserProviders.viewMenu.length > 0) {
				for (const viewMenuEntry of browserProviders.viewMenu) {
					const viewMenuActionId: string | undefined = viewMenuEntry?.data?.action?.id;
					if (viewMenuActionId && excludeMenuActionIds.includes(viewMenuActionId)) {
						viewMenuEntry.include = false;
					}
				}
			}
		}

		const menusProvider = settings.menusProvider;
		if (
			!isEmpty(menusProvider) &&
			Array.isArray(excludeMenuModuleIds) &&
			Array.isArray(menusProvider.modules)
		) {
			for (const menuModule of menusProvider.modules) {
				const menuModuleId: string = menuModule.id;
				if (excludeMenuModuleIds.includes(menuModuleId)) {
					menuModule.enabled = false;
				}
			}
		}

		return settings;
	}
}
