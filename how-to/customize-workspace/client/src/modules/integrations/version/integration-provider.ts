import type {
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { IntegrationHelpers, IntegrationModule } from "customize-workspace/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";

/**
 * Implement the integration provider for version info.
 */
export class VersionProvider implements IntegrationModule<unknown> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "version";

	/**
	 * The command to display the version.
	 * @internal
	 */
	private static readonly _VERSION_COMMAND = "/version";

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
	private _definition: ModuleDefinition<unknown> | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<unknown>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._definition = definition;
		this._logger = loggerCreator("VersionProvider");
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${VersionProvider._PROVIDER_ID}-help`,
				title: VersionProvider._VERSION_COMMAND,
				label: "Help",
				icon: this._definition?.icon,
				actions: [],
				data: {
					providerId: VersionProvider._PROVIDER_ID,
					populateQuery: VersionProvider._VERSION_COMMAND
				},
				template: "Custom" as CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					VersionProvider._VERSION_COMMAND,
					["The version commands lists the version information related to this platform."],
					[VersionProvider._VERSION_COMMAND]
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
		if (query.length < 2 || !VersionProvider._VERSION_COMMAND.startsWith(query)) {
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
			tableData.push([keys[i], (versionInfo[keys[i]] ?? "unknown") as string]);
		}

		data.title = "Versions";

		const result = {
			key: "version-info",
			title: VersionProvider._VERSION_COMMAND,
			label: "Version",
			icon: this._definition?.icon,
			actions,
			data: {
				providerId: VersionProvider._PROVIDER_ID
			},
			template: "Custom" as CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createTitle("title", undefined, undefined, {
							marginBottom: "10px",
							borderBottom: `1px solid ${palette.background6}`
						}),
						await this._integrationHelpers.templateHelpers.createTable(tableData, [], 0, data)
					],
					{
						padding: "10px"
					}
				),
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
