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
import type { EntityDepartment, EntityItem, EntityMember, EntityOrganization, TreeSettings } from "./shapes";

/**
 * Implement the integration provider for Tree structured data.
 */
export class TreeIntegrationProvider implements IntegrationModule<TreeSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "tree";

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
	private _definition: ModuleDefinition<TreeSettings> | undefined;

	/**
	 * The organization data.
	 */
	private _orgData: EntityOrganization[];

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<TreeSettings>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._definition = definition;

		const orgResponse = await fetch(definition.data.orgUrl);
		this._orgData = await orgResponse.json();
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
				key: `${TreeIntegrationProvider._PROVIDER_ID}-help`,
				title: "/tree",
				label: "Help",
				actions: [],
				data: {
					providerId: TreeIntegrationProvider._PROVIDER_ID
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"/tree",
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
			result.action.name === TreeIntegrationProvider._DETAILS_ACTION
		) {
			const path: string[] = result.data.path;

			await this._integrationHelpers.setSearchQuery(path.join("/"));

			return true;
		} else if (
			result.action.trigger === "user-action" &&
			result.action.name === TreeIntegrationProvider._BACK_ACTION
		) {
			const type: string = result.data.entity.type;
			const path: string[] = result.data.path;

			let newPath = [];
			if (type === "member") {
				newPath = [path[0], path[1]];
			} else if (type === "department") {
				newPath = [path[0], ""];
			}

			await this._integrationHelpers.setSearchQuery(newPath.join("/"));

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
		let results: HomeSearchResult[] = [];

		const parts = query.split("/");

		const queryOrg = new RegExp(parts[0], "i");
		const matchingOrgs: EntityOrganization[] = this._orgData.filter(
			(o) => queryOrg.test(o.id) || queryOrg.test(o.name)
		);

		if (parts.length === 1) {
			results = await Promise.all(matchingOrgs.map(async (o) => this.createResult(o, [o.name, ""])));
		} else if (parts.length >= 2) {
			const queryDep = new RegExp(parts[1], "i");
			for (const org of matchingOrgs) {
				let deps: EntityDepartment[] = [];
				if (parts[1].length === 0) {
					deps = deps.concat(org.departments);
				} else {
					deps = deps.concat(org.departments.filter((d) => queryDep.test(d.id) || queryDep.test(d.name)));
				}

				if (parts.length === 2) {
					results = results.concat(
						await Promise.all(deps.map(async (d) => this.createResult(d, [org.name, d.name, ""])))
					);
				} else if (parts.length === 3) {
					const queryMem = new RegExp(parts[2], "i");

					for (const dep of deps) {
						let mems: EntityMember[] = [];
						if (parts[2].length === 0) {
							mems = mems.concat(dep.members);
						} else {
							mems = mems.concat(dep.members.filter((m) => queryMem.test(m.id) || queryMem.test(m.name)));
						}

						results = results.concat(
							await Promise.all(mems.map(async (m) => this.createResult(m, [org.name, dep.name, m.name])))
						);
					}
				}
			}
		}

		return {
			results
		};
	}

	/**
	 * Create a search result.
	 * @param entity The entity for the item.
	 * @param path The full path to the item.
	 * @returns The search result.
	 */
	private async createResult(entity: EntityItem, path: string[]): Promise<HomeSearchResult> {
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
					TreeIntegrationProvider._BACK_ACTION,
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
					TreeIntegrationProvider._DETAILS_ACTION,
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
					name: TreeIntegrationProvider._DETAILS_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: TreeIntegrationProvider._PROVIDER_ID,
				entity,
				path
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
