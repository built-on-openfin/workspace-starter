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
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { PageChangedLifecyclePayload } from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type { ColorSchemeMode } from "workspace-platform-starter/shapes/theme-shapes";
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
			this._integrationHelpers.subscribeLifecycleEvent(
				"page-changed",
				async (platform: WorkspacePlatformModule, unknownPayload: unknown): Promise<void> => {
					const payload = unknownPayload as PageChangedLifecyclePayload;
					if (payload.action === "create") {
						await this.rebuildResults(platform);
					} else if (payload.action === "update") {
						const lastResult = this._lastResults?.find((res) => res.key === payload.id);
						if (lastResult && payload.page) {
							lastResult.title = payload.page.title;
							lastResult.data.workspaceTitle = payload.page.title;
							(lastResult.templateContent as CustomTemplate).data.title = payload.page.title;
							this.resultAddUpdate([lastResult]);
						}
					} else if (payload.action === "delete") {
						this.resultRemove(payload.id);
					}
				}
			);
			this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
				if (this._integrationHelpers?.getPlatform) {
					const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
					await this.rebuildResults(platform);
				}
			});
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
		let pageResults: HomeSearchResult[] = [];

		if (this._integrationHelpers?.getPlatform) {
			const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
			const pages: Page[] = await platform.Storage.getPages();
			const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
			const queryLower = query.toLowerCase();

			this._lastResponse = lastResponse;
			this._lastQuery = queryLower;
			this._lastQueryMinLength = options.queryMinLength;

			pageResults = await this.buildResults(pages, queryLower, options.queryMinLength, colorScheme);

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
			const data: {
				pageId?: string;
			} = result.data;

			if (data?.pageId) {
				handled = true;

				if (result.action.name === PagesProvider._ACTION_LAUNCH_PAGE) {
					if (this._integrationHelpers?.getPlatform && this._integrationHelpers?.launchPage) {
						const platform = this._integrationHelpers.getPlatform();
						const pageToLaunch = await platform.Storage.getPage(data.pageId);
						await this._integrationHelpers.launchPage(pageToLaunch, undefined, this._logger);
					}
				} else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
					if (this._integrationHelpers?.getPlatform) {
						const platform = this._integrationHelpers.getPlatform();
						await platform.Storage.deletePage(data.pageId);
						// Deleting the page will eventually trigger the "delete" lifecycle
						// event which will remove it from the result list
					}
				} else if (result.action.name === PagesProvider._ACTION_SHARE_PAGE) {
					if (this._integrationHelpers?.share) {
						await this._integrationHelpers.share({ type: "page", pageId: data.pageId });
					}
				} else {
					handled = false;
					this._logger?.warn(`Unrecognized action for page selection: ${data.pageId}`);
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
	 * @param colorScheme The current color scheme.
	 * @returns The home result.
	 */
	private async getPageTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		colorScheme: ColorSchemeMode
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

			const icon = this._settings.images.page.replace("{scheme}", colorScheme as string);

			const layoutData = await this._integrationHelpers.templateHelpers.createLayout(
				title,
				icon,
				[await this._integrationHelpers.templateHelpers.createText("instructions")],
				actionButtons
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
					tags: ["page"]
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
		if (this._integrationHelpers && this._lastQuery && this._lastQueryMinLength) {
			const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();

			const pages: Page[] = await platform.Storage.getPages();
			const results = await this.buildResults(pages, this._lastQuery, this._lastQueryMinLength, colorScheme);
			this.resultAddUpdate(results);
		}
	}

	/**
	 * Build the results for the pages.
	 * @param pages The list of workspaces to build the results for.
	 * @param query The query.
	 * @param queryMinLength The min query length.
	 * @param colorScheme The color scheme.
	 * @returns The list of home search results.
	 */
	private async buildResults(
		pages: Page[],
		query: string,
		queryMinLength: number,
		colorScheme: ColorSchemeMode
	): Promise<HomeSearchResult[]> {
		let results: HomeSearchResult[] = [];

		if (this._integrationHelpers && Array.isArray(pages)) {
			let shareEnabled: boolean = false;
			if (this._integrationHelpers.condition) {
				shareEnabled = await this._integrationHelpers.condition("sharing");
			}

			const pgsProm = pages
				.filter(
					(pg) =>
						query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query))
				)
				.sort((a, b) => a.title.localeCompare(b.title))
				.map(async (pg: Page) => this.getPageTemplate(pg.pageId, pg.title, shareEnabled, colorScheme));

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
}
