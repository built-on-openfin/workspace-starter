import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	TemplateFragment,
	ButtonStyle
} from "@openfin/workspace";
import type { IntegrationHelpers, IntegrationModule } from "../../shapes/integrations-shapes";
import type { ModuleDefinition } from "../../shapes/module-shapes";
import type {
	EntityDepartment,
	EntityItem,
	EntityMember,
	EntityOrganization,
	TreeInlineSettings
} from "./shapes";

/**
 * Implement the integration provider for Tree structured data.
 */
export class TreeInlineIntegrationProvider implements IntegrationModule<TreeInlineSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "tree-inline";

	/**
	 * The key to use for a details result.
	 * @internal
	 */
	private static readonly _DETAILS_ACTION = "Details";

	/**
	 * The key to use for a back result.
	 * @internal
	 */
	private static readonly _BACK_ACTION = "Back";

	/**
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _definition: ModuleDefinition<TreeInlineSettings> | undefined;

	/**
	 * The organization data.
	 */
	private _orgData: EntityOrganization[];

	/**
	 * The last results;
	 */
	private _lastResults: HomeSearchResult[];

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<TreeInlineSettings>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._definition = definition;

		const orgResponse = await fetch(definition.data.orgUrl);
		this._orgData = await orgResponse.json();
		this._lastResults = [];
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${TreeInlineIntegrationProvider._PROVIDER_ID}-help`,
				title: "/tree-inline",
				label: "Help",
				actions: [],
				data: {
					providerId: TreeInlineIntegrationProvider._PROVIDER_ID
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"/tree-inline",
					["Start typing the name of an organization to find the data."],
					["acme"]
				)
			}
		];
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
		if (
			result.action.trigger === "user-action" &&
			result.action.name === TreeInlineIntegrationProvider._DETAILS_ACTION
		) {
			const entity: EntityItem = result.data.entity;

			let results: HomeSearchResult[];
			if (entity?.type === "organization") {
				const org = entity as EntityOrganization;
				results = await Promise.all(
					org.departments.map(async (d) => this.createResult(d, this._lastResults))
				);
			} else if (entity?.type === "department") {
				const dep = entity as EntityDepartment;
				results = await Promise.all(dep.members.map(async (m) => this.createResult(m, this._lastResults)));
			}

			if (results) {
				lastResponse.revoke(...this._lastResults.map((r) => r.key));
				lastResponse.respond(results);
				this._lastResults = results;
			}

			return true;
		} else if (
			result.action.trigger === "user-action" &&
			result.action.name === TreeInlineIntegrationProvider._BACK_ACTION
		) {
			const parentResults: HomeSearchResult[] = result.data.parentResults;

			if (parentResults) {
				lastResponse.revoke(...this._lastResults.map((r) => r.key));
				lastResponse.respond(parentResults);
				this._lastResults = parentResults;
			}

			return true;
		}
		return false;
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		this._lastResults = [];

		if (query.length > 0) {
			const queryOrg = new RegExp(query, "i");
			const matchingOrgs: EntityOrganization[] = this._orgData.filter(
				(o) => queryOrg.test(o.id) || queryOrg.test(o.name)
			);

			this._lastResults = await Promise.all(matchingOrgs.map(async (o) => this.createResult(o, [])));
		}

		return {
			results: this._lastResults
		};
	}

	/**
	 * Create a search result.
	 * @param entity The entity for the item.
	 * @param parentResults The parent results.
	 * @param query The original query.
	 * @returns The search result.
	 */
	private async createResult(
		entity: EntityItem,
		parentResults: HomeSearchResult[]
	): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const data: { [id: string]: string } = {
			title: entity.name,
			navigateBackAction: "Back"
		};

		const children: TemplateFragment[] = [
			await this._integrationHelpers.templateHelpers.createTitle("title", undefined, undefined, {
				marginBottom: "10px",
				borderBottom: `1px solid ${palette.background6}`
			})
		];

		const mainContent: TemplateFragment[] = [];
		if (entity.type === "organization") {
			mainContent.push(await this._integrationHelpers.templateHelpers.createText("childCount"));
			data.childCount = `Departments: ${(entity as EntityOrganization).departments.length.toString()}`;
			data.navigateAction = "Departments";
			delete data.navigateBackAction;
		} else if (entity.type === "department") {
			mainContent.push(await this._integrationHelpers.templateHelpers.createText("childCount"));
			data.childCount = `Members: ${(entity as EntityDepartment).members.length.toString()}`;
			data.navigateAction = "Members";
		} else {
			data.role = `Role: ${(entity as EntityMember).role}`;
			mainContent.push(await this._integrationHelpers.templateHelpers.createText("role"));
		}

		children.push(
			await this._integrationHelpers.templateHelpers.createContainer("column", mainContent, {
				flex: 1
			})
		);

		const buttons: TemplateFragment[] = [];
		if (data.navigateBackAction) {
			buttons.push(
				await this._integrationHelpers.templateHelpers.createButton(
					ButtonStyle.Primary,
					"navigateBackAction",
					TreeInlineIntegrationProvider._BACK_ACTION,
					{
						fontSize: "12px"
					}
				)
			);
		}

		if (data.navigateAction) {
			buttons.push(
				await this._integrationHelpers.templateHelpers.createButton(
					ButtonStyle.Primary,
					"navigateAction",
					TreeInlineIntegrationProvider._DETAILS_ACTION,
					{
						fontSize: "12px"
					}
				)
			);
		}

		children.push(
			await this._integrationHelpers.templateHelpers.createContainer("row", buttons, {
				justifyContent: "flex-end",
				gap: "10px"
			})
		);

		return {
			key: `tree-${entity.id}`,
			title: entity.name,
			label: entity.type,
			actions: [
				{
					name: TreeInlineIntegrationProvider._DETAILS_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: TreeInlineIntegrationProvider._PROVIDER_ID,
				entity,
				parentResults
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer("column", children, {
					padding: "10px",
					flex: 1
				}),
				data
			}
		};
	}
}
