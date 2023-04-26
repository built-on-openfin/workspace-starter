import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	type TemplateFragment,
	ButtonStyle
} from "@openfin/workspace";
import type {
	EntityDepartment,
	EntityItem,
	EntityMember,
	EntityOrganization,
	TreeInlineSettings
} from "./shapes";

/**
 * Implement the source for Tree structured data.
 */
export class TreeInlineSource {
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
	 * The settings for the source.
	 * @internal
	 */
	private _definition: { id: string; icon: string; data?: TreeInlineSettings } | undefined;

	/**
	 * The organization data.
	 */
	private _orgData?: EntityOrganization[];

	/**
	 * The last results;
	 */
	private _lastResults?: HomeSearchResult[];

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.icon The icon for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: { id: string; icon: string; data?: TreeInlineSettings },
		loggerCreator: () => void
	): Promise<void> {
		this._definition = definition;

		const orgResponse = await fetch(`${definition.data?.rootUrl}organizations-inline.json`);
		this._orgData = await orgResponse.json();
		this._lastResults = [];
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition?.id}-help`,
				title: "/tree-inline",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "title",
								style: {
									color: "#FFFFFF",
									fontSize: "16px",
									fontWeight: "bold",
									marginBottom: "10px",
									borderBottom: "1px solid #53565F"
								}
							},
							{ type: "Text", dataKey: "desc-0", style: { fontSize: "12px", padding: "6px 0px" } },
							{
								type: "Container",
								style: {
									display: "flex",
									flexDirection: "column",
									padding: "10px",
									marginTop: "6px",
									backgroundColor: "#53565F",
									color: "#FFFFFF",
									borderRadius: "5px",
									overflow: "auto"
								},
								children: [
									{
										type: "Text",
										dataKey: "line-0",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									}
								]
							}
						]
					},
					data: {
						title: "/tree-inline",
						"desc-0": "Start typing the name of an organization to find the data.",
						"line-0": "dock"
					}
				}
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
		if (result.action.trigger === "user-action" && result.action.name === TreeInlineSource._DETAILS_ACTION) {
			const entity: EntityItem = result.data.entity;

			let results: HomeSearchResult[] | undefined;
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
				if (this._lastResults) {
					lastResponse.revoke(...this._lastResults.map((r) => r.key));
				}
				lastResponse.respond(results);
				this._lastResults = results;
			}

			return true;
		} else if (
			result.action.trigger === "user-action" &&
			result.action.name === TreeInlineSource._BACK_ACTION
		) {
			const parentResults: HomeSearchResult[] = result.data.parentResults;

			if (parentResults) {
				if (this._lastResults) {
					lastResponse.revoke(...this._lastResults.map((r) => r.key));
				}
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
			const matchingOrgs: EntityOrganization[] | undefined = this._orgData?.filter(
				(o) => queryOrg.test(o.id) || queryOrg.test(o.name)
			);

			if (matchingOrgs) {
				this._lastResults = await Promise.all(matchingOrgs.map(async (o) => this.createResult(o, [])));
			}
		}

		return {
			results: this._lastResults
		};
	}

	/**
	 * Create a search result.
	 * @param entity The entity for the item.
	 * @param parentResults The parent results.
	 * @returns The search result.
	 */
	private async createResult(
		entity: EntityItem,
		parentResults?: HomeSearchResult[]
	): Promise<HomeSearchResult> {
		const data: { [id: string]: string } = {
			title: entity.name,
			navigateBackAction: "Back"
		};

		const children: TemplateFragment[] = [
			{
				type: "Text",
				dataKey: "title",
				style: {
					color: "#FFFFFF",
					fontSize: "16px",
					fontWeight: "bold",
					marginBottom: "10px",
					borderBottom: "1px solid #53565F"
				}
			}
		];

		const mainContent: TemplateFragment[] = [];
		if (entity.type === "organization") {
			mainContent.push({ type: "Text", dataKey: "childCount", style: { fontSize: "14px" } });
			data.childCount = `Departments: ${(entity as EntityOrganization).departments.length.toString()}`;
			data.navigateAction = "Departments";
			delete data.navigateBackAction;
		} else if (entity.type === "department") {
			mainContent.push({ type: "Text", dataKey: "childCount", style: { fontSize: "14px" } });
			data.childCount = `Members: ${(entity as EntityDepartment).members.length.toString()}`;
			data.navigateAction = "Members";
		} else {
			data.role = `Role: ${(entity as EntityMember).role}`;
			mainContent.push({ type: "Text", dataKey: "role", style: { fontSize: "14px" } });
		}

		children.push({
			type: "Container",
			style: { display: "flex", flexDirection: "column", flex: 1 },
			children: mainContent
		});

		const buttons: TemplateFragment[] = [];
		if (data.navigateBackAction) {
			buttons.push({
				type: "Button",
				buttonStyle: ButtonStyle.Primary,
				children: [{ type: "Text", dataKey: "navigateBackAction", style: { fontSize: "12px" } }],
				action: TreeInlineSource._BACK_ACTION,
				style: { fontSize: "12px" }
			});
		}

		if (data.navigateAction) {
			buttons.push({
				type: "Button",
				buttonStyle: ButtonStyle.Primary,
				children: [{ type: "Text", dataKey: "navigateAction", style: { fontSize: "12px" } }],
				action: TreeInlineSource._DETAILS_ACTION,
				style: { fontSize: "12px" }
			});
		}

		children.push({
			type: "Container",
			style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "10px" },
			children: buttons
		});

		return {
			key: `tree-${entity.id}`,
			title: entity.name,
			label: entity.type,
			actions: [
				{
					name: TreeInlineSource._DETAILS_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				entity,
				parentResults
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: {
					type: "Container",
					style: { display: "flex", flexDirection: "column", flex: 1, padding: "10px" },
					children
				},
				data
			}
		};
	}
}
