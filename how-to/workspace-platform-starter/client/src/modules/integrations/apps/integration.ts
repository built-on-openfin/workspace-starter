import type {
	CLIFilter,
	CLIFilterOptionType,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { NotificationCreatedEvent, NotificationOptions } from "@openfin/workspace/notifications";
import type { FavoriteChangedLifecyclePayload, NotificationClient } from "workspace-platform-starter/shapes";
import type { ManifestTypeId, PlatformApp } from "workspace-platform-starter/shapes/app-shapes";
import {
	FAVORITE_TYPE_NAME_APP,
	type FavoriteClient,
	type FavoriteEntry,
	type FavoriteInfo
} from "workspace-platform-starter/shapes/favorite-shapes";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isObject, isStringValue, randomUUID } from "workspace-platform-starter/utils";
import type { AppManifestTypeMapping, AppSettings } from "./shapes";

/**
 * Implement the integration provider for apps.
 */
export class AppProvider implements IntegrationModule<AppSettings> {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 0;

	/**
	 * The key used to filter out by tag.
	 * @internal
	 */
	private static readonly _HOME_TAG_FILTERS = "tags";

	/**
	 * Provider id.
	 * @internal
	 */
	private _providerId?: string;

	/**
	 * The module definition.
	 * @internal
	 */
	private _definition: IntegrationModuleDefinition<AppSettings> | undefined;

	/**
	 * The settings from config.
	 */
	private _settings?: AppSettings;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _logger?: Logger;

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

	/**
	 * The list of the ids of the last set of results
	 */
	private _lastResultIds?: string[];

	/**
	 * Subscription id for theme-changed lifecycle event.
	 */
	private _themeChangedSubscriptionId: string | undefined;

	/**
	 * Subscription id for favorite-changed lifecycle event.
	 */
	private _favChangedSubscriptionId: string | undefined;

	/**
	 * Notification client if available.
	 */
	private _notificationClient: NotificationClient | undefined;

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
		this._definition = definition;
		this._logger = loggerCreator("AppProvider");
		this._providerId = definition.id;

		if (this._integrationHelpers.subscribeLifecycleEvent) {
			this._themeChangedSubscriptionId = this._integrationHelpers.subscribeLifecycleEvent(
				"theme-changed",
				async () => {
					await this.rebuildResults();
				}
			);

			this._favChangedSubscriptionId =
				this._integrationHelpers.subscribeLifecycleEvent<FavoriteChangedLifecyclePayload>(
					"favorite-changed",
					async (_: unknown, payload?: FavoriteChangedLifecyclePayload) => {
						if (!isEmpty(payload)) {
							await this.updateAppFavoriteButtons(payload);
						}
					}
				);

			if (!isEmpty(this._integrationHelpers.getNotificationClient)) {
				this._integrationHelpers.subscribeLifecycleEvent("after-bootstrap", async () => {
					if (!isEmpty(this._integrationHelpers?.getNotificationClient)) {
						this._notificationClient = await this._integrationHelpers?.getNotificationClient();
						// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
						const eventListener = (event: NotificationCreatedEvent) => {
							this._logger?.info(
								`Notification Created by App: type: ${event.type} notification id: ${event.notification.id}`
							);
						};
						this._notificationClient?.addEventListener("notification-created", eventListener);
						this._notificationClient?.addEventListener("notification-closed", () => this._logger?.info("Notification by app closed."));
						this._notificationClient?.addEventListener("notification-toast-dismissed", () => this._logger?.info("Notification by app toast dismissed."));
						this._notificationClient?.addEventListener("notifications-count-changed", (event) => this._logger?.info("Notification by app count changed.", event.count));
						
						setTimeout(() => {
							this._notificationClient?.removeEventListener("notification-created", eventListener);
						}, 90000);
					}
				});
			}
		}
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		if (this._integrationHelpers?.unsubscribeLifecycleEvent) {
			if (isStringValue(this._themeChangedSubscriptionId)) {
				this._integrationHelpers.unsubscribeLifecycleEvent(this._themeChangedSubscriptionId, "theme-changed");
				this._themeChangedSubscriptionId = undefined;
			}

			if (isStringValue(this._favChangedSubscriptionId)) {
				this._integrationHelpers.unsubscribeLifecycleEvent(
					this._favChangedSubscriptionId,
					"favorite-changed"
				);
				this._favChangedSubscriptionId = undefined;
			}
		}
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
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength: number;
			queryAgainst: string[];
			isSuggestion?: boolean;
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
			if (
				(this._definition?.data?.favoritesEnabled ?? true) &&
				result.action.name.endsWith("favorite") &&
				result.data?.app
			) {
				if (this._integrationHelpers?.getFavoriteClient) {
					const favClient = await this._integrationHelpers.getFavoriteClient();
					if (favClient) {
						if (result.action.name.startsWith("un")) {
							if (!isEmpty(result.data?.favoriteId) && favClient.deleteSavedFavorite) {
								await favClient.deleteSavedFavorite(result.data.favoriteId);
							}
						} else if (favClient.setSavedFavorite) {
							await favClient.setSavedFavorite({
								id: randomUUID(),
								type: FAVORITE_TYPE_NAME_APP,
								typeId: result.key,
								label: result.title,
								icon: result.icon
							});
						}

						handled = true;
					}
				}
			} else if (this._integrationHelpers?.launchApp) {
				const data: {
					app: { appId?: string };
				} = result.data;

				if (data?.app?.appId) {
					handled = true;
					await this._integrationHelpers.launchApp(data.app.appId);
				}

				if (!isEmpty(this._notificationClient)) {
					const notification: NotificationOptions = {
						title: `app id: ${data?.app?.appId}`,
						body: "This is a simple notification",
						toast: "transient",
						category: "default",
						template: "markdown",
						id: randomUUID()
					};
					await this._notificationClient.create(notification);
					const allNotifications = await this._notificationClient.getAll();
					const notificationCount: NotificationOptions = {
						title: `app. notification count: ${allNotifications.length}`,
						body: "This is a app notification count",
						toast: "transient",
						category: "default",
						template: "markdown"
					};
					await this._notificationClient.create(notificationCount);
				}
			}
		}

		return handled;
	}

	/**
	 * Get the results for the apps.
	 * @param queryLower The query.
	 * @param filters The filters to apply.
	 * @param options The query options.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @param cachedApps The cached apps.
	 * @returns The search response.
	 */
	private async getResults(
		queryLower: string,
		filters: CLIFilter[],
		options: {
			queryMinLength: number;
			queryAgainst: string[];
			isSuggestion?: boolean;
		},
		cachedApps?: PlatformApp[]
	): Promise<HomeSearchResponse> {
		if (this._integrationHelpers?.getApps) {
			this._lastQuery = queryLower;
			this._lastQueryMinLength = options?.queryMinLength;
			this._lastQueryAgainst = options?.queryAgainst;
			this._lastCLIFilters = filters;

			let apps: PlatformApp[] = cachedApps ?? (await this._integrationHelpers.getApps());
			let matchQuery = queryLower;

			if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers.getFavoriteClient) {
				const favClient = await this._integrationHelpers.getFavoriteClient();
				if (favClient) {
					const info = favClient.getInfo();
					if (info.isEnabled && isStringValue(info.command)) {
						const isSupported =
							isEmpty(info.enabledTypes) || info.enabledTypes.includes(FAVORITE_TYPE_NAME_APP);
						if (isSupported && queryLower === info.command) {
							const favoriteApps = await favClient.getSavedFavorites(FAVORITE_TYPE_NAME_APP);
							const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
							apps = apps.filter((a) => favIds.includes(a.appId));
							matchQuery = "";
						}
					}
				}
			}

			this._lastAppResults = apps;
			const appSearchEntries = await this.mapAppEntriesToSearchEntries(apps);

			const tags: string[] = [];

			if (appSearchEntries.length > 0) {
				const finalResults = appSearchEntries.filter((entry) => {
					let textMatchFound = true;
					let filterMatchFound = true;

					const isCommand = matchQuery.startsWith("/");

					if (matchQuery.length >= options.queryMinLength || isCommand) {
						textMatchFound = options.queryAgainst.some((target) => {
							const entryObject = entry as unknown as {
								[id: string]: string | string[] | { [id: string]: string | string[] };
							};
							const path = target.split(".");
							if (path.length === 1) {
								const targetValue: { [id: string]: string | string[] } | string | string[] | undefined =
									entryObject[path[0]];

								if (isStringValue(targetValue)) {
									const lowerTarget = targetValue.toLowerCase();
									if (isCommand) {
										return lowerTarget.startsWith(matchQuery);
									}
									return lowerTarget.includes(matchQuery);
								}
							} else if (path.length === 2) {
								const specifiedTarget = entryObject[path[0]] as { [id: string]: string | string[] };

								if (isObject(specifiedTarget)) {
									let targetValue: string | string[] | undefined;
									if (!isEmpty(specifiedTarget)) {
										targetValue = specifiedTarget[path[1]];
									}

									if (isStringValue(targetValue)) {
										const lowerTarget = targetValue.toLowerCase();
										if (isCommand) {
											return lowerTarget.startsWith(matchQuery);
										}
										return lowerTarget.includes(matchQuery);
									}

									if (Array.isArray(targetValue)) {
										if (
											targetValue.length > 0 &&
											isStringValue(targetValue[0]) &&
											targetValue.some((mt) => mt.toLowerCase().startsWith(matchQuery))
										) {
											return true;
										}
										this._logger?.warn(
											`Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: ${JSON.stringify(
												specifiedTarget
											)}`
										);
									}
								}
							} else {
								this._logger?.warn(
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
		}
		this._lastResultIds = [];
		return {
			results: [],
			context: {
				filters: []
			}
		};
	}

	/**
	 * Get search filters.
	 * @param tags The tags to create the filters from.
	 * @returns The filters.
	 */
	private getSearchFilters(tags: string[]): CLIFilter[] {
		if (Array.isArray(tags)) {
			const filters: CLIFilter[] = [];
			const uniqueTags = [...new Set(tags)].sort((a, b) => a.localeCompare(b));
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

	/**
	 * Maps platform apps to search results.
	 * @param apps The apps to convert.
	 * @returns The search results.
	 */
	private async mapAppEntriesToSearchEntries(apps: PlatformApp[]): Promise<HomeSearchResult[]> {
		const appResults: HomeSearchResult[] = [];
		if (Array.isArray(apps)) {
			let favInfo: FavoriteInfo | undefined;
			let favClient: FavoriteClient | undefined;
			let savedFavorites: FavoriteEntry[] | undefined;
			const colorScheme = (await this._integrationHelpers?.getCurrentColorSchemeMode()) ?? "dark";

			if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers?.getFavoriteClient) {
				favClient = await this._integrationHelpers.getFavoriteClient();
				if (favClient) {
					favInfo = favClient.getInfo();
					if (favInfo.isEnabled) {
						const isSupported =
							isEmpty(favInfo.enabledTypes) || favInfo.enabledTypes.includes(FAVORITE_TYPE_NAME_APP);
						if (isSupported) {
							savedFavorites = await favClient.getSavedFavorites(FAVORITE_TYPE_NAME_APP);
						} else {
							favInfo = undefined;
						}
					}
				}
			}

			for (const app of apps) {
				const favoriteId = savedFavorites?.find((f) => f.typeId === app.appId)?.id;
				const res = await this.mapAppEntryToSearchEntry(
					app,
					this._settings?.manifestTypeMapping,
					favInfo,
					favoriteId,
					colorScheme
				);
				if (res) {
					appResults.push(res);
				}
			}
		}
		return appResults;
	}

	/**
	 * Map a single app to a search result.
	 * @param app The app to map.
	 * @param typeMapping The type mappings to include.
	 * @param favInfo The favorites info if it is enabled.
	 * @param favoriteId The id of the favorite.
	 * @param colorScheme The color scheme.
	 * @returns The search result.
	 */
	private async mapAppEntryToSearchEntry(
		app: PlatformApp,
		typeMapping: AppManifestTypeMapping | undefined,
		favInfo: FavoriteInfo | undefined,
		favoriteId: string | undefined,
		colorScheme: string
	): Promise<HomeSearchResult | undefined> {
		const manifestType = app.manifestType;
		if (isStringValue(manifestType)) {
			const action = { name: "Launch View", hotkey: "enter" };
			const entry: Partial<HomeSearchResult> = {
				key: app.appId,
				score: this._definition?.baseScore ?? AppProvider._DEFAULT_BASE_SCORE,
				title: app.title,
				data: { app, providerId: this._providerId, favoriteId }
			};

			if (!isEmpty(typeMapping)) {
				const manifestTypeMapping = typeMapping[manifestType as ManifestTypeId];

				if (!isEmpty(manifestTypeMapping)) {
					if (isStringValue(manifestTypeMapping.entryLabel)) {
						entry.label = manifestTypeMapping.entryLabel;
					}
					if (isStringValue(manifestTypeMapping.actionName)) {
						action.name = manifestTypeMapping.actionName;
					}
				}
			}

			entry.actions = [action];
			entry.icon = this.getAppIcon(app);

			if (!isEmpty(app.description)) {
				entry.description = app.description;
				entry.shortDescription = app.description;
			}

			const headerButtons: { icon: string; action: string }[] = [];

			if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon) {
				const icon = (!isEmpty(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon).replace(
					"{scheme}",
					colorScheme
				);
				headerButtons.push({
					icon,
					action: !isEmpty(favoriteId) ? "unfavorite" : "favorite"
				});
			}

			entry.template = "Custom" as CLITemplate.Custom;
			entry.templateContent = await this._integrationHelpers?.templateHelpers.createApp(
				app,
				entry.icon ?? "",
				action.name,
				headerButtons
			);

			return entry as HomeSearchResult;
		}
	}

	/**
	 * Get the icon for an application.
	 * @param app The application to get the icon for.
	 * @returns The icon.
	 */
	private getAppIcon(app: PlatformApp): string | undefined {
		if (Array.isArray(app.icons) && app.icons.length > 0) {
			return app.icons[0].src;
		}
	}

	/**
	 * Rebuild the results if the theme changes.
	 */
	private async rebuildResults(): Promise<void> {
		if (
			!isEmpty(this._lastResponse) &&
			Array.isArray(this._lastResultIds) &&
			this._lastQuery &&
			this._lastCLIFilters &&
			this._lastQueryAgainst &&
			this._lastQueryMinLength &&
			this._lastResultIds
		) {
			this._logger?.info("Rebuilding results...");
			const lastResultIds = this._lastResultIds.slice();
			const appResponse = await this.getResults(
				this._lastQuery,
				this._lastCLIFilters,
				{ queryMinLength: this._lastQueryMinLength, queryAgainst: this._lastQueryAgainst },
				this._lastAppResults
			);
			const removeResultIds = lastResultIds.filter((id) => !this._lastResultIds?.includes(id));
			if (removeResultIds.length > 0) {
				this._lastResponse.revoke(...removeResultIds);
			}
			this._lastResponse.respond(appResponse.results);
			this._logger?.info("Results rebuilt.");
		}
	}

	/**
	 * Update the app buttons if the favorites have changed.
	 * @param payload The payload of the favorite change.
	 */
	private async updateAppFavoriteButtons(payload: FavoriteChangedLifecyclePayload): Promise<void> {
		const favorite: FavoriteEntry = payload.favorite;

		if (
			!isEmpty(this._lastResponse) &&
			this._integrationHelpers?.getFavoriteClient &&
			(payload.action === "set" || payload.action === "delete") &&
			!isEmpty(favorite) &&
			favorite.type === FAVORITE_TYPE_NAME_APP &&
			this._lastAppResults
		) {
			const favClient = await this._integrationHelpers.getFavoriteClient();
			if (favClient) {
				const favInfo = favClient.getInfo();
				if (favInfo) {
					const colorScheme = (await this._integrationHelpers?.getCurrentColorSchemeMode()) ?? "dark";

					if (this._lastQuery === favInfo.command && payload.action === "delete") {
						this._lastResponse.revoke(favorite.typeId);
					} else if (this._lastAppResults) {
						let lastApp = this._lastAppResults.find((a) => a.appId === favorite.typeId);

						// If it wasn't in the last results add it, but only if we are in fav command
						if (!lastApp && this._integrationHelpers.getApp && this._lastQuery === favInfo.command) {
							lastApp = await this._integrationHelpers.getApp(favorite.typeId);
						}

						if (!isEmpty(lastApp)) {
							const rebuilt = await this.mapAppEntryToSearchEntry(
								lastApp,
								this._settings?.manifestTypeMapping,
								favInfo,
								payload.action === "set" ? favorite.id : undefined,
								colorScheme
							);

							if (rebuilt) {
								this._lastResponse.respond([rebuilt]);
							}
						}
					}
				}
			}
		}
	}
}
