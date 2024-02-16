import type {
	CLIFilter,
	CLITemplate,
	CustomTemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { Page, WorkspacePlatformModule } from "@openfin/workspace-platform";
import {
	FAVORITE_TYPE_NAME_PAGE,
	type FavoriteClient,
	type FavoriteEntry,
	type FavoriteInfo,
	type FavoriteTypeNames
} from "workspace-platform-starter/shapes/favorite-shapes";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition
} from "workspace-platform-starter/shapes/integrations-shapes";
import type {
	FavoriteChangedLifecyclePayload,
	PageChangedLifecyclePayload
} from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue, randomUUID } from "workspace-platform-starter/utils";
import type { PagesSettings } from "./shapes";

/**
 * Implement the integration provider for pages.
 */
export class PagesProvider implements IntegrationModule<PagesSettings> {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 200;

	/**
	 * The key to use for launching a page.
	 * @internal
	 */
	private static readonly _ACTION_LAUNCH_PAGE = "Launch Page";

	/**
	 * The key to use for deleting a page.
	 * @internal
	 */
	private static readonly _ACTION_DELETE_PAGE = "Delete Page";

	/**
	 * The key to use for sharing a page.
	 * @internal
	 */
	private static readonly _ACTION_SHARE_PAGE = "Share Page";

	/**
	 * The module definition.
	 * @internal
	 */
	private _definition: IntegrationModuleDefinition<PagesSettings> | undefined;

	/**
	 * The settings from config.
	 * @internal
	 */
	private _settings?: PagesSettings;

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
	 * The last results.
	 */
	private _lastResults?: HomeSearchResult[];

	/**
	 * Subscription id for theme-changed lifecycle event.
	 */
	private _themeChangedSubscriptionId: string | undefined;

	/**
	 * Subscription id for favorite-changed lifecycle event.
	 */
	private _favChangedSubscriptionId: string | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<PagesSettings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._settings = definition.data;
		this._integrationHelpers = helpers;
		this._logger = loggerCreator("PagesProvider");
		this._definition = definition;

		if (this._integrationHelpers.subscribeLifecycleEvent) {
			this._integrationHelpers.subscribeLifecycleEvent<PageChangedLifecyclePayload>(
				"page-changed",
				async (platform: WorkspacePlatformModule, payload?: PageChangedLifecyclePayload): Promise<void> => {
					if (payload?.action === "create") {
						await this.rebuildResults(platform);
					} else if (payload?.action === "update") {
						const lastResult = this._lastResults?.find((res) => res.key === payload.id);
						if (lastResult && payload.page) {
							lastResult.title = payload.page.title;
							lastResult.data.workspaceTitle = payload.page.title;
							(lastResult.templateContent as CustomTemplate).data.title = payload.page.title;

							this.resultAddUpdate([lastResult]);

							const { favoriteClient } = await this.getFavInfo(FAVORITE_TYPE_NAME_PAGE);
							if (favoriteClient?.setSavedFavorite) {
								const saved = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_PAGE);
								const favorite = await saved?.find((f) => f.typeId === payload.id);
								if (favorite) {
									favorite.label = payload.page.title;
									await favoriteClient.setSavedFavorite(favorite);
								}
							}
						}
					} else if (payload?.action === "delete") {
						this.resultRemove(payload.id);

						const { favoriteClient } = await this.getFavInfo(FAVORITE_TYPE_NAME_PAGE);
						if (favoriteClient?.deleteSavedFavorite) {
							const saved = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_PAGE);
							const favorite = await saved?.find((f) => f.typeId === payload.id);
							if (favorite) {
								await favoriteClient.deleteSavedFavorite(favorite.id);
							}
						}
					}
				}
			);
			this._themeChangedSubscriptionId = this._integrationHelpers.subscribeLifecycleEvent(
				"theme-changed",
				async () => {
					if (this._integrationHelpers?.getPlatform) {
						const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
						await this.rebuildResults(platform);
					}
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
			queryMinLength?: number;
			queryAgainst?: string[];
			isSuggestion?: boolean;
		}
	): Promise<HomeSearchResponse> {
		let pageResults: HomeSearchResult[] = [];

		if (this._integrationHelpers?.getPlatform) {
			const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
			const queryLower = query.toLowerCase();
			const queryMinLength = options?.queryMinLength ?? 3;

			let pages: Page[] = await platform.Storage.getPages();
			let matchQuery = queryLower;

			this._lastResponse = lastResponse;
			this._lastQuery = queryLower;
			this._lastQueryMinLength = queryMinLength;

			const { favoriteClient, favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_PAGE);

			if (
				favoriteInfo?.isEnabled &&
				isStringValue(favoriteInfo?.command) &&
				queryLower === favoriteInfo.command &&
				favoriteClient
			) {
				const favoriteApps = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_PAGE);
				const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
				pages = pages.filter((a) => favIds.includes(a.pageId));
				matchQuery = "";
			}

			pageResults = await this.buildResults(pages, matchQuery, queryMinLength);

			this._lastResults = pageResults;
		}

		return {
			results: pageResults
		};
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
			if (result.action.name.endsWith("favorite") && result.data?.pageId) {
				const { favoriteClient } = await this.getFavInfo(FAVORITE_TYPE_NAME_PAGE);
				if (favoriteClient) {
					if (result.action.name.startsWith("un")) {
						if (!isEmpty(result.data?.favoriteId) && favoriteClient.deleteSavedFavorite) {
							await favoriteClient.deleteSavedFavorite(result.data.favoriteId);
						}
					} else if (favoriteClient.setSavedFavorite) {
						await favoriteClient.setSavedFavorite({
							id: randomUUID(),
							type: FAVORITE_TYPE_NAME_PAGE,
							typeId: result.key,
							label: result.title,
							icon: this._settings?.images.page
						});
					}

					handled = true;
				}
			} else {
				const data: {
					pageId?: string;
				} = result.data;

				if (data?.pageId) {
					handled = true;

					if (result.action.name === PagesProvider._ACTION_LAUNCH_PAGE) {
						if (this._integrationHelpers?.getPlatform && this._integrationHelpers?.launchPage) {
							await this._integrationHelpers.launchPage(data.pageId, undefined, this._logger);
						}
					} else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
						if (this._integrationHelpers?.getPlatform) {
							const platform = this._integrationHelpers.getPlatform();
							await platform.Storage.deletePage(data.pageId);
							// Deleting the page will eventually trigger the "delete" lifecycle
							// event which will remove it from the result list
						}
					} else if (
						result.action.name === PagesProvider._ACTION_SHARE_PAGE &&
						this._integrationHelpers?.getShareClient
					) {
						const shareClient = await this._integrationHelpers.getShareClient();
						if (shareClient) {
							await shareClient.share("page", { pageId: data.pageId });
						}
					} else {
						handled = false;
						this._logger?.warn(`Unrecognized action for page selection: ${data.pageId}`);
					}
				}
			}
		}

		return handled;
	}

	/**
	 * Get the template for a page.
	 * @param id The id of the item.
	 * @param title The title of the page.
	 * @param shareEnabled Is sharing enabled.
	 * @param favInfo The favorites info if it is enabled.
	 * @param favoriteId The id of the favorite.
	 * @returns The home result.
	 */
	private async getPageTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		favInfo: FavoriteInfo | undefined,
		favoriteId: string | undefined
	): Promise<HomeSearchResult> {
		if (this._integrationHelpers && this._settings) {
			const actions = [
				{
					name: PagesProvider._ACTION_LAUNCH_PAGE,
					hotkey: "Enter"
				},
				{
					name: PagesProvider._ACTION_DELETE_PAGE,
					hotkey: "CmdOrCtrl+Shift+D"
				}
			];
			const actionButtons: { title: string; action: string }[] = [
				{
					title: "Launch",
					action: PagesProvider._ACTION_LAUNCH_PAGE
				},
				{
					title: "Delete",
					action: PagesProvider._ACTION_DELETE_PAGE
				}
			];

			if (shareEnabled) {
				actions.push({
					name: PagesProvider._ACTION_SHARE_PAGE,
					hotkey: "CmdOrCtrl+Shift+S"
				});
				actionButtons.push({
					title: "Share",
					action: PagesProvider._ACTION_SHARE_PAGE
				});
			}

			const themeClient = await this._integrationHelpers.getThemeClient();
			const icon = await themeClient.themeUrl(this._settings.images.page);

			const headerButtons: { icon: string; action: string }[] = [];

			if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon) {
				const favoriteIcon = await themeClient.themeUrl(
					!isEmpty(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon
				);
				if (favoriteIcon) {
					headerButtons.push({
						icon: favoriteIcon,
						action: !isEmpty(favoriteId) ? "unfavorite" : "favorite"
					});
				}
			}

			const layoutData = await this._integrationHelpers.templateHelpers.createLayout(
				title,
				icon,
				[await this._integrationHelpers.templateHelpers.createText("instructions")],
				actionButtons,
				headerButtons
			);

			return {
				key: id,
				score: this._definition?.baseScore ?? PagesProvider._DEFAULT_BASE_SCORE,
				title,
				label: "Page",
				icon,
				actions,
				data: {
					providerId: this._definition?.id,
					pageTitle: title,
					pageId: id,
					tags: ["page"],
					favoriteId
				},
				template: "Custom" as CLITemplate.Custom,
				templateContent: {
					layout: layoutData.layout,
					data: {
						...layoutData.data,
						instructions: "Use the buttons below to interact with your saved page"
					}
				}
			};
		}
		return {
			key: id,
			score: this._definition?.baseScore ?? PagesProvider._DEFAULT_BASE_SCORE,
			title,
			label: "Page",
			actions: [],
			data: {
				providerId: this._definition?.id,
				pageTitle: title,
				pageId: id,
				tags: ["page"]
			},
			template: "Plain" as CLITemplate.Plain,
			templateContent: undefined
		};
	}

	/**
	 * Rebuild the results after color scheme change.
	 * @param platform The workspace platform.
	 */
	private async rebuildResults(platform: WorkspacePlatformModule): Promise<void> {
		if (this._integrationHelpers && !isEmpty(this._lastQuery) && !isEmpty(this._lastQueryMinLength)) {
			const pages: Page[] = await platform.Storage.getPages();
			const results = await this.buildResults(pages, this._lastQuery, this._lastQueryMinLength);
			this.resultAddUpdate(results);
		}
	}

	/**
	 * Build the results for the pages.
	 * @param pages The list of workspaces to build the results for.
	 * @param query The query.
	 * @param queryMinLength The min query length.
	 * @returns The list of home search results.
	 */
	private async buildResults(
		pages: Page[],
		query: string,
		queryMinLength: number
	): Promise<HomeSearchResult[]> {
		let results: HomeSearchResult[] = [];

		if (this._integrationHelpers && Array.isArray(pages)) {
			let shareEnabled: boolean = false;
			if (this._integrationHelpers?.getShareClient) {
				const shareClient = await this._integrationHelpers.getShareClient();
				if (shareClient) {
					shareEnabled = await shareClient.typeEnabled("page");
				}
			}

			const { favoriteClient, favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_PAGE);
			let savedFavorites: FavoriteEntry[] | undefined;

			if (favoriteClient) {
				savedFavorites = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_PAGE);
			}

			const pgsProm = pages
				.filter(
					(pg) =>
						query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query))
				)
				.sort((a, b) => a.title.localeCompare(b.title))
				.map(async (pg: Page) => {
					const favoriteId = savedFavorites?.find((f) => f.typeId === pg.pageId)?.id;

					return this.getPageTemplate(pg.pageId, pg.title, shareEnabled, favoriteInfo, favoriteId);
				});

			results = await Promise.all(pgsProm);
		}

		return results;
	}

	/**
	 * Add or update a result.
	 * @param results The results to add or update.
	 */
	private resultAddUpdate(results: HomeSearchResult[]): void {
		if (this._lastResults) {
			for (const result of results) {
				const resultIndex = this._lastResults.findIndex((res) => res.key === result.key);
				if (resultIndex >= 0) {
					this._lastResults.splice(resultIndex, 1, result);
				} else {
					this._lastResults.push(result);
				}
			}
		}
		if (this._lastResponse) {
			this._lastResponse.respond(results);
		}
	}

	/**
	 * Remove a result.
	 * @param id The id of the item to remove.
	 */
	private resultRemove(id: string): void {
		if (this._lastResults) {
			const resultIndex = this._lastResults.findIndex((res) => res.key === id);
			if (resultIndex >= 0) {
				this._lastResults.splice(resultIndex, 1);
			}
		}
		if (this._lastResponse) {
			this._lastResponse.revoke(id);
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
			(payload.action === "set" || payload.action === "delete") &&
			!isEmpty(favorite) &&
			favorite.type === FAVORITE_TYPE_NAME_PAGE &&
			this._lastResults &&
			this._integrationHelpers
		) {
			const { favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_PAGE);

			if (this._lastQuery === favoriteInfo?.command && payload.action === "delete") {
				this._lastResponse.revoke(favorite.typeId);
			} else if (this._lastResults) {
				const lastPage = this._lastResults.find((pg) => pg.key === favorite.typeId);

				if (!isEmpty(lastPage)) {
					let shareEnabled: boolean = false;
					if (this._integrationHelpers?.getShareClient) {
						const shareClient = await this._integrationHelpers.getShareClient();
						if (shareClient) {
							shareEnabled = await shareClient.typeEnabled("page");
						}
					}

					const rebuilt = await this.getPageTemplate(
						lastPage.key,
						lastPage.title,
						shareEnabled,
						favoriteInfo,
						payload.action === "set" ? favorite.id : undefined
					);

					this._lastResponse.respond([rebuilt]);
				}
			}
		}
	}

	/**
	 * Get the favorite info and client if they are enabled.
	 * @param favoriteTypeNames The type of client to get.
	 * @returns The favorite info and client.
	 */
	private async getFavInfo(
		favoriteTypeNames: FavoriteTypeNames
	): Promise<{ favoriteClient: FavoriteClient | undefined; favoriteInfo: FavoriteInfo | undefined }> {
		let favoriteInfo: FavoriteInfo | undefined;
		let favoriteClient: FavoriteClient | undefined;

		if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers?.getFavoriteClient) {
			favoriteClient = await this._integrationHelpers.getFavoriteClient();
			if (favoriteClient) {
				favoriteInfo = favoriteClient.getInfo();
				if (favoriteInfo.isEnabled) {
					const isSupported = favoriteInfo?.enabledTypes?.includes(favoriteTypeNames) ?? true;
					if (!isSupported) {
						favoriteInfo = undefined;
						favoriteClient = undefined;
					}
				}
			}
		}

		return {
			favoriteClient,
			favoriteInfo
		};
	}
}
