import type {
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	TemplateFragment
} from "@openfin/workspace";
import type {
	IntegrationHelpers,
	IntegrationModule
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type { AboutProviderSettings } from "./shapes";

/**
 * Implement the integration provider for about info.
 */
export class AboutProvider implements IntegrationModule<unknown> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "about";

	/**
	 * The command to display the about information.
	 * @internal
	 */
	private static readonly _ABOUT_COMMAND = "/about";

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
	 * The settings for the integration.
	 * @internal
	 */
	private _definition: ModuleDefinition<AboutProviderSettings> | undefined;

	/**
	 * Provided alternate labels for the version types
	 * @internal
	 */
	private _versionTypeMap: { [key: string]: string };

	/**
	 * Provided alternate labels for the version types
	 * @internal
	 */
	private _excludeVersionType: string[];

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<AboutProviderSettings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._definition = definition;
		this._versionTypeMap = definition?.data?.versionTypeMap ?? {};
		this._excludeVersionType = definition?.data?.excludeVersionType ?? [];
		this._logger = loggerCreator("AboutProvider");
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${AboutProvider._PROVIDER_ID}-help`,
				title: AboutProvider._ABOUT_COMMAND,
				label: "Help",
				icon: this._definition?.icon,
				actions: [],
				data: {
					providerId: AboutProvider._PROVIDER_ID,
					populateQuery: AboutProvider._ABOUT_COMMAND
				},
				template: "Custom" as CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					AboutProvider._ABOUT_COMMAND,
					["The about command lists the version information related to this platform."],
					[AboutProvider._ABOUT_COMMAND]
				)
			}
		];
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
		if (query.length < 2 || !AboutProvider._ABOUT_COMMAND.startsWith(query)) {
			return {
				results: []
			};
		}
		const palette = await this._integrationHelpers.getCurrentPalette();

		const versionInfo = await this._integrationHelpers.getVersionInfo();

		const actions = [];

		const data: { [id: string]: string } = {};

		const tableData: string[][] = [];
		tableData.push(["Version Type", "Version"]);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const keys = Object.keys(versionInfo);

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (!this._excludeVersionType.includes(key)) {
				const label = this._versionTypeMap[key] ?? keys[i];
				tableData.push([label, (versionInfo[keys[i]] ?? "unknown") as string]);
			}
		}

		data.title = this._definition?.data?.title ?? "Versions";

		const children: TemplateFragment[] = [];
		const titleFragment = (await this._integrationHelpers.templateHelpers.createTitle(
			"title",
			undefined,
			undefined,
			{
				marginBottom: "10px",
				borderBottom: `1px solid ${palette.background6}`
			}
		)) as TemplateFragment;

		children.push(titleFragment);

		if (!isEmpty(this._definition?.data?.description)) {
			data.description = this._definition.data.description;
			const descriptionFragment = (await this._integrationHelpers.templateHelpers.createText(
				"description",
				undefined,
				{
					marginBottom: "10px"
				}
			)) as TemplateFragment;
			children.push(descriptionFragment);
		}

		const tableFragment = (await this._integrationHelpers.templateHelpers.createTable(
			tableData,
			[],
			0,
			data
		)) as TemplateFragment;

		children.push(tableFragment);

		const result = {
			key: "about-info",
			title: AboutProvider._ABOUT_COMMAND,
			label: "Version",
			icon: this._definition?.icon,
			actions,
			data: {
				providerId: AboutProvider._PROVIDER_ID
			},
			template: "Custom" as CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer("column", children, {
					padding: "10px"
				}),
				data
			}
		};

		return {
			results: [result]
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
		return true;
	}
}
