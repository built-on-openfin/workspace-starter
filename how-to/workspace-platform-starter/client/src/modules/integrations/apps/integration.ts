import type {
	CLIFilter,
	CLIFilterOptionType,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { PlatformApp } from "workspace-platform-starter/shapes/app-shapes";
import type {
	IntegrationHelpers,
	IntegrationModule
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import type { AppSettings } from "./shapes";

/**
 * Implement the integration provider for apps.
 */
export class AppProvider implements IntegrationModule<AppSettings> {
	/**
	 * The key used to filter out by tag.
	 * @internal
	 */
	private static readonly _HOME_TAG_FILTERS = "tags";

	/**
	 * Provider id.
	 * @internal
	 */
	private _providerId: string;

	/**
	 * The settings from config.
	 */
	private _settings: AppSettings;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _logger: Logger;

	/**
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The last search response.
	 */
	private _lastResponse?: HomeSearchListenerResponse;

	/**
	 * The last query.
	 */
	private _lastQuery?: string;

	/**
	 * The last query min length.
	 */
	private _lastQueryMinLength?: number;

	/**
	 * The last query against array.
	 */
	private _lastQueryAgainst?: string[];

	/**
	 * The last query against array.
	 */
	private _lastCLIFilters?: CLIFilter[];

	/**
	 * The last app results.
	 */
	private _lastAppResults?: PlatformApp[];

	/** The list of the ids of the last set of results */
	private _lastResultIds?: string[];

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<AppSettings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._settings = definition.data;
		this._integrationHelpers = helpers;
		this._logger = loggerCreator("AppProvider");
		this._providerId = definition.id;
		this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
			await this.rebuildResults();
		});
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength: number;
			queryAgainst: string[];
		}
	): Promise<HomeSearchResponse> {
		const queryLower = query.toLowerCase();
		this._lastResponse = lastResponse;
		const appResponse: HomeSearchResponse = await this.getResults(queryLower, filters, options);

		return appResponse;
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		let handled = false;
		if (result.action.trigger === "user-action") {
			const data: {
				app: { appId?: string };
			} = result.data;

			if (data?.app?.appId) {
				handled = true;
				await this._integrationHelpers.launchApp(data.app.appId);
			}
		}

		return handled;
	}

	private async getResults(
		queryLower: string,
		filters: CLIFilter[],
		options: {
			queryMinLength: number;
			queryAgainst: string[];
		},
		cachedApps?: PlatformApp[]
	): Promise<HomeSearchResponse> {
		const apps: PlatformApp[] = cachedApps ?? (await this._integrationHelpers.getApps());
		this._lastAppResults = apps;
		this._lastQuery = queryLower;
		this._lastQueryMinLength = options?.queryMinLength;
		this._lastQueryAgainst = options?.queryAgainst;
		this._lastCLIFilters = filters;
		const appSearchEntries = await this.mapAppEntriesToSearchEntries(apps);

		const tags: string[] = [];

		if (appSearchEntries.length > 0) {
			const finalResults = appSearchEntries.filter((entry) => {
				let textMatchFound = true;
				let filterMatchFound = true;

				const isCommand = queryLower.startsWith("/");

				if (queryLower.length >= options.queryMinLength || isCommand) {
					textMatchFound = options.queryAgainst.some((target) => {
						const path = target.split(".");
						if (path.length === 1) {
							const targetValue = entry[path[0]];

							if (typeof targetValue === "string") {
								const lowerTarget = targetValue.toLowerCase();
								if (isCommand) {
									return lowerTarget.startsWith(queryLower);
								}
								return lowerTarget.includes(queryLower);
							}
						} else if (path.length === 2) {
							const specifiedTarget = entry[path[0]];
							let targetValue: string | string[];
							if (!isEmpty(specifiedTarget)) {
								targetValue = specifiedTarget[path[1]];
							}

							if (typeof targetValue === "string") {
								const lowerTarget = targetValue.toLowerCase();
								if (isCommand) {
									return lowerTarget.startsWith(queryLower);
								}
								return lowerTarget.includes(queryLower);
							}

							if (Array.isArray(targetValue)) {
								if (
									targetValue.length > 0 &&
									typeof targetValue[0] === "string" &&
									targetValue.some((matchTarget) => matchTarget.toLowerCase().startsWith(queryLower))
								) {
									return true;
								}
								this._logger.warn(
									`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${specifiedTarget}`
								);
							}
						} else {
							this._logger.warn(
								"The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings"
							);
						}
						return false;
					});
				}

				const tagFilters = Array.isArray(filters)
					? filters.filter((f) => f.id === AppProvider._HOME_TAG_FILTERS)
					: [];
				if (tagFilters.length > 0) {
					filterMatchFound = tagFilters.some((filter) => {
						if (Array.isArray(filter.options)) {
							if (!isEmpty(entry.data?.app?.tags)) {
								return filter.options.every(
									(option) => !option.isSelected || entry.data.app.tags.includes(option.value)
								);
							}
						} else if (filter.options.isSelected && !isEmpty(entry.data?.app?.tags)) {
							return entry.data.app.tags.includes(filter.options.value);
						}
						return true;
					});
				}

				if (textMatchFound && Array.isArray(entry.data?.app?.tags)) {
					tags.push(...(entry.data.app.tags as string[]));
				}
				return textMatchFound && filterMatchFound;
			});

			this._lastResultIds = finalResults.map((entry) => entry.key);

			return {
				results: finalResults,
				context: {
					filters: this.getSearchFilters(tags.filter(Boolean))
				}
			};
		}
		this._lastResultIds = [];
		return {
			results: [],
			context: {
				filters: []
			}
		};
	}

	private getSearchFilters(tags: string[]): CLIFilter[] {
		if (Array.isArray(tags)) {
			const filters: CLIFilter[] = [];
			const uniqueTags = [...new Set(tags)].sort();
			const tagFilter: CLIFilter = {
				id: AppProvider._HOME_TAG_FILTERS,
				title: "Tags",
				type: "MultiSelect" as CLIFilterOptionType.MultiSelect,
				options: []
			};

			for (const tag of uniqueTags) {
				if (Array.isArray(tagFilter.options)) {
					tagFilter.options.push({
						value: tag,
						isSelected: false
					});
				}
			}

			filters.push(tagFilter);
			return filters;
		}
		return [];
	}

	private async mapAppEntriesToSearchEntries(apps: PlatformApp[]): Promise<HomeSearchResult[]> {
		const appResults: HomeSearchResult[] = [];
		if (Array.isArray(apps)) {
			for (const app of apps) {
				const action = { name: "Launch View", hotkey: "enter" };
				const entry: Partial<HomeSearchResult> = {
					key: app.appId,
					title: app.title,
					data: { app, providerId: this._providerId }
				};

				const manifestTypeMapping = this._settings.manifestTypeMapping[app.manifestType];

				if (!isEmpty(manifestTypeMapping)) {
					if (isStringValue(manifestTypeMapping.entryLabel)) {
						entry.label = manifestTypeMapping.entryLabel;
					}
					if (isStringValue(manifestTypeMapping.actionName)) {
						action.name = manifestTypeMapping.actionName;
					}
				}

				entry.actions = [action];
				entry.icon = this.getAppIcon(app);

				if (!isEmpty(app.description)) {
					entry.description = app.description;
					entry.shortDescription = app.description;
				}

				entry.template = "Custom" as CLITemplate.Custom;
				entry.templateContent = await this._integrationHelpers.templateHelpers.createApp(
					app,
					entry.icon,
					action.name
				);

				appResults.push(entry as HomeSearchResult);
			}
		}
		return appResults;
	}

	private getAppIcon(app: PlatformApp): string | undefined {
		if (Array.isArray(app.icons) && app.icons.length > 0) {
			return app.icons[0].src as string;
		}
	}

	private async rebuildResults(): Promise<void> {
		if (!isEmpty(this._lastResponse) && Array.isArray(this._lastResultIds)) {
			this._logger.info("Rebuilding results...");
			const lastResultIds = this._lastResultIds.slice();
			const appResponse = await this.getResults(
				this._lastQuery,
				this._lastCLIFilters,
				{ queryMinLength: this._lastQueryMinLength, queryAgainst: this._lastQueryAgainst },
				this._lastAppResults
			);
			const removeResultIds = lastResultIds.filter((id) => !this._lastResultIds.includes(id));
			if (removeResultIds.length > 0) {
				this._lastResponse.revoke(...removeResultIds);
			}
			this._lastResponse.respond(appResponse.results);
			this._logger.info("Results rebuilt.");
		}
	}
}
