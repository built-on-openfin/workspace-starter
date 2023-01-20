import type {
	ButtonStyle,
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	Page,
	TemplateFragment
} from "@openfin/workspace";
import type { IntegrationHelpers, IntegrationModule } from "customize-workspace/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";
import type { ColorSchemeMode } from "customize-workspace/shapes/theme-shapes";
import type { PagesSettings } from "./shapes";

/**
 * Implement the integration provider for pages.
 */
export class PagesProvider implements IntegrationModule<PagesSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "pages";

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
		const platform = this._integrationHelpers.getPlatform();
		const pages = await platform.Storage.getPages();
		const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
		const iconFolder: string = await this._integrationHelpers.getCurrentIconFolder();
		const queryLower = query.toLowerCase();

		let pageResults: HomeSearchResult[] = [];

		if (Array.isArray(pages)) {
			const shareEnabled: boolean = await this._integrationHelpers.condition("sharing");

			pageResults = pages
				.filter(
					(pg) =>
						query.length === 0 ||
						(query.length >= options.queryMinLength && pg.title.toLowerCase().includes(queryLower))
				)
				.map((pg: Page) => this.getPageTemplate(pg.pageId, pg.title, shareEnabled, iconFolder, colorScheme));
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
					const platform = this._integrationHelpers.getPlatform();
					const pageToLaunch = await platform.Storage.getPage(data.pageId);
					await this._integrationHelpers.launchPage(pageToLaunch);
				} else if (result.action.name === PagesProvider._ACTION_DELETE_PAGE) {
					const platform = this._integrationHelpers.getPlatform();
					await platform.Storage.deletePage(data.pageId);
					lastResponse.revoke(result.key);
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

	private getPageTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		iconFolder: string,
		colorScheme: ColorSchemeMode
	): HomeSearchResult {
		let actions = [];

		if (shareEnabled) {
			actions.push({
				name: PagesProvider._ACTION_SHARE_PAGE,
				hotkey: "CmdOrCtrl+Shift+S"
			});
		}
		actions = actions.concat([
			{
				name: PagesProvider._ACTION_DELETE_PAGE,
				hotkey: "CmdOrCtrl+Shift+D"
			},
			{
				name: PagesProvider._ACTION_LAUNCH_PAGE,
				hotkey: "Enter"
			}
		]);
		const layout = this.getOtherPageTemplate(shareEnabled);

		return {
			key: id,
			title,
			label: "Page",
			icon: this._settings.images.page.replace("{scheme}", colorScheme as string),
			actions,
			data: {
				providerId: PagesProvider._PROVIDER_ID,
				pageTitle: title,
				pageId: id,
				tags: ["page"]
			},
			template: "Custom" as CLITemplate.Custom,
			templateContent: {
				layout,
				data: {
					title,
					instructions: "Use the buttons below to interact with your saved Page:",
					openText: "Launch",
					deleteText: "Delete",
					shareText: "Share"
				}
			}
		};
	}

	private getOtherPageTemplate(enableShare: boolean): TemplateFragment {
		const actionButtons: TemplateFragment[] = [
			{
				type: "Button",
				style: {
					display: "flex",
					flexDirection: "column",
					width: "80px"
				},
				action: PagesProvider._ACTION_LAUNCH_PAGE,
				children: [
					{
						type: "Text",
						dataKey: "openText",
						optional: false
					}
				]
			},
			{
				type: "Button",
				buttonStyle: "primary" as ButtonStyle.Primary,
				style: {
					display: "flex",
					flexDirection: "column",
					width: "80px",
					marginLeft: "10px",
					marginRight: "10px"
				},
				action: PagesProvider._ACTION_DELETE_PAGE,
				children: [
					{
						type: "Text",
						dataKey: "deleteText",
						optional: false
					}
				]
			}
		];

		if (enableShare) {
			actionButtons.push({
				type: "Button",
				buttonStyle: "primary" as ButtonStyle.Primary,
				style: {
					display: "flex",
					flexDirection: "column",
					width: "80px"
				},
				action: PagesProvider._ACTION_SHARE_PAGE,
				children: [
					{
						type: "Text",
						dataKey: "shareText",
						optional: false
					}
				]
			});
		}
		return {
			type: "Container",
			style: {
				paddingTop: "10px",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				{
					type: "Text",
					dataKey: "title",
					style: {
						fontWeight: "bold",
						fontSize: "16px",
						textAlign: "center"
					}
				},
				{
					type: "Text",
					dataKey: "description",
					optional: true,
					style: {
						paddingLeft: "10px",
						paddingRight: "10px"
					}
				},
				{
					type: "Text",
					dataKey: "instructions",
					style: {
						fontWeight: "bold",
						paddingTop: "10px",
						paddingBottom: "10px",
						paddingLeft: "10px",
						paddingRight: "10px"
					}
				},
				{
					type: "Container",
					style: {
						display: "flex",
						flexFlow: "row wrap",
						justifyContent: "center",
						paddingTop: "10px",
						paddingBottom: "10px"
					},
					children: actionButtons
				}
			]
		};
	}
}
