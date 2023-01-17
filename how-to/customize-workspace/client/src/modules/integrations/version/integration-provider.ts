import type {
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	TemplateFragment
} from "@openfin/workspace";
import type { IntegrationHelpers, IntegrationModule } from "customize-workspace/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";
import type { TemplateHelpers } from "customize-workspace/shapes/template-shapes";
import type { VersionInfo } from "customize-workspace/shapes/version-shapes";

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
				title: "/version",
				label: "Help",
				icon: this._definition?.icon,
				actions: [],
				data: {
					providerId: VersionProvider._PROVIDER_ID
				},
				template: "Custom" as CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"/version",
					["The version commands lists the version information related to this platform."],
					["/version"]
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
		const possibleMatches = ["/v", "/ve", "/ver", "/vers", "/versi", "/versio", "/version"];

		if(!possibleMatches.includes(query.toLowerCase())) {
			return {
				results: []
			};
		}
		const versionInfo = await this._integrationHelpers.getVersionInfo();

		const actions = [];

		const data = {};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const keys = Object.keys(versionInfo);

		for (let i = 0; i < keys.length; i++) {
			data[`${keys[i]}Label`] = keys[i];
			data[`${keys[i]}`] = versionInfo[keys[i]];
		}

		const result = {
			key: "version-info",
			title: "/Version",
			label: "Version",
			icon: this._definition?.icon,
			actions,
			data: {
				providerId: VersionProvider._PROVIDER_ID
			},
			template: "Custom" as CLITemplate.Custom,
			templateContent: {
				layout: await this.getVersionTemplate(this._integrationHelpers.templateHelpers, versionInfo),
				data
			}
		};
		const versionResult: HomeSearchResult[] = [result];

		return {
			results: versionResult
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

	private async getVersionTemplate(
		templateHelpers: TemplateHelpers,
		versionInfo: VersionInfo
	): Promise<TemplateFragment> {
		const versions: TemplateFragment[] = [];
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const keys = Object.keys(versionInfo);

		for (let i = 0; i < keys.length; i++) {
			const row: TemplateFragment = await templateHelpers.createContainer(
				"row",
				[
					await templateHelpers.createText(`${keys[i]}Label`, 12, { fontWeight: "bold" }),
					await templateHelpers.createText(`${keys[i]}`, 12)
				],
				{
					justifyContent: "space-between"
				}
			);
			versions.push(row);
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return templateHelpers.createContainer("column", versions, {
			padding: "10px"
		});
	}
}
