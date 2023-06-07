import type {
	CLIFilter,
	CLITemplate,
	CustomTemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	Page
} from "@openfin/workspace";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	IntegrationHelpers,
	IntegrationModule
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
	 * Provider id.
	 * @internal
	 */
	private _providerId: string;

	/**
	 * The settings from config.
	 */
	private _settings: PagesSettings;

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
		this._providerId = definition.id;
		this._integrationHelpers.subscribeLifecycleEvent(
			"page-changed",
			async (platform: WorkspacePlatformModule, payload: PageChangedLifecyclePayload) => {
				if (payload.action === "create") {
					await this.rebuildResults(platform);
				} else if (payload.action === "update") {
					const lastResult = this._lastResults?.find((res) => res.key === payload.id);
					if (lastResult) {
						lastResult.title = payload.page.title;
						lastResult.data.workspaceTitle = payload.page.title;
						(lastResult.templateContent as CustomTemplate).data.title = payload.page.title;
						this.resultAddUpdate([lastResult]);
					}
				} else if (payload.action === "delete") {
					this.resultRemove(payload.id as string);
				}
			}
		);
		this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
			const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
			await this.rebuildResults(platform);
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
		const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
		const pages: Page[] = await platform.Storage.getPages();
		const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
		const queryLower = query.toLowerCase();

		this._lastResponse = lastResponse;
		this._lastQuery = queryLower;
		this._lastQueryMinLength = options.queryMinLength;

		const pageResults: HomeSearchResult[] = await this.buildResults(
			pages,
			queryLower,
			options.queryMinLength,
			colorScheme
		);

		this._lastResults = pageResults;

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
					const platform = this._integrationHelpers.getPlatform();
					const pageToLaunch = await platform.Storage.getPage(data.pageId);
					await this._integrationHelpers.launchPage(pageToLaunch);
				} else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
					const platform = this._integrationHelpers.getPlatform();
					await platform.Storage.deletePage(data.pageId);
					// Deleting the page will eventually trigger the "delete" lifecycle
					// event which will remove it from the result list
				} else if (result.action.name === PagesProvider._ACTION_SHARE_PAGE) {
					await this._integrationHelpers.share({ pageId: data.pageId });
				} else {
					handled = false;
					this._logger.warn(`Unrecognized action for page selection: ${data.pageId}`);
				}
			}
		}

		return handled;
	}

	private async getPageTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		colorScheme: ColorSchemeMode
	): Promise<HomeSearchResult> {
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
			title,
			label: "Page",
			icon,
			actions,
			data: {
				providerId: this._providerId,
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

	private async rebuildResults(platform: WorkspacePlatformModule): Promise<void> {
		const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();

		const pages: Page[] = await platform.Storage.getPages();
		const results = await this.buildResults(pages, this._lastQuery, this._lastQueryMinLength, colorScheme);
		this.resultAddUpdate(results);
	}

	private async buildResults(
		pages: Page[],
		query: string,
		queryMinLength: number,
		colorScheme: ColorSchemeMode
	): Promise<HomeSearchResult[]> {
		let results: HomeSearchResult[] = [];

		if (Array.isArray(pages)) {
			const shareEnabled: boolean = await this._integrationHelpers.condition("sharing");

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
