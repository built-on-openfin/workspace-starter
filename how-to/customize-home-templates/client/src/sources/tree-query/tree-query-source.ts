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
	TreeQuerySettings
} from "./shapes";

/**
 * Implement the source for Tree structured data.
 */
export class TreeQuerySource {
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
	 * The helpers for the source.
	 * @internal
	 */
	private _helpers: { setSearchQuery: (query: string) => Promise<void> } | undefined;

	/**
	 * The settings for the source.
	 * @internal
	 */
	private _definition: { id: string; data?: TreeQuerySettings } | undefined;

	/**
	 * The organization data.
	 */
	private _orgData?: EntityOrganization[];

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @param helpers.setSearchQuery Method for repopulating the search query.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: { id: string; data?: TreeQuerySettings },
		loggerCreator: () => void,
		helpers: {
			setSearchQuery: (query: string) => Promise<void>;
		}
	): Promise<void> {
		this._definition = definition;
		this._helpers = helpers;

		const orgResponse = await fetch(`${definition.data?.rootUrl}organizations-query.json`);
		this._orgData = await orgResponse.json();
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition?.id}-help`,
				title: "/tree-query",
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
						title: "/tree-query",
						"desc-0": "Start typing the name of an organization to find the data.",
						"line-0": "acme"
					}
				}
			}
		];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the get search results.
	 * @param options.isSuggestion Is the query a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			isSuggestion: boolean;
		}
	): Promise<HomeSearchResponse> {
		let results: HomeSearchResult[] = [];

		if (query.length > 0) {
			const parts = query.split("/");

			const queryOrg = new RegExp(parts[0], "i");
			const matchingOrgs: EntityOrganization[] | undefined = this._orgData?.filter(
				(o) => queryOrg.test(o.id) || queryOrg.test(o.name)
			);

			if (matchingOrgs) {
				if (parts.length === 1) {
					results = await Promise.all(matchingOrgs.map(async (o) => this.createResult(o, [o.name, ""], "")));
				} else if (parts.length >= 2) {
					const queryDep = new RegExp(parts[1], "i");
					for (const org of matchingOrgs) {
						let deps: EntityDepartment[] = org.departments;
						if (parts[1].length > 0) {
							deps = deps.filter((d) => queryDep.test(d.id) || queryDep.test(d.name));
						}

						if (parts.length === 2) {
							results = results.concat(
								await Promise.all(
									deps.map(async (d) => this.createResult(d, [org.name, d.name, ""], org.name))
								)
							);
						} else if (parts.length === 3) {
							const queryMem = new RegExp(parts[2], "i");

							for (const dep of deps) {
								let mems: EntityMember[] = dep.members;
								if (parts[2].length > 0) {
									mems = mems.filter((m) => queryMem.test(m.id) || queryMem.test(m.name));
								}

								results = results.concat(
									await Promise.all(
										mems.map(async (m) => this.createResult(m, [org.name, dep.name, m.name], `${org.name}/`))
									)
								);
							}
						}
					}
				}
			}
		}

		return {
			results
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
		if (
			result.action.trigger === "user-action" &&
			result.action.name === TreeQuerySource._DETAILS_ACTION &&
			this._helpers?.setSearchQuery
		) {
			const path: string[] = result.data.path;

			await this._helpers.setSearchQuery(path.join("/"));

			return true;
		} else if (
			result.action.trigger === "user-action" &&
			result.action.name === TreeQuerySource._BACK_ACTION &&
			this._helpers?.setSearchQuery
		) {
			const query: string = result.data.query;

			await this._helpers.setSearchQuery(query);

			return true;
		}
		return false;
	}

	/**
	 * Create a search result.
	 * @param entity The entity for the item.
	 * @param path The full path to the item.
	 * @param query The original query.
	 * @returns The search result.
	 */
	private async createResult(entity: EntityItem, path: string[], query: string): Promise<HomeSearchResult> {
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
				action: TreeQuerySource._BACK_ACTION,
				style: { fontSize: "12px" }
			});
		}

		if (data.navigateAction) {
			buttons.push({
				type: "Button",
				buttonStyle: ButtonStyle.Primary,
				children: [{ type: "Text", dataKey: "navigateAction", style: { fontSize: "12px" } }],
				action: TreeQuerySource._DETAILS_ACTION,
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
					name: TreeQuerySource._DETAILS_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				entity,
				path,
				query
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: {
					type: "Container",
					style: { display: "flex", flexDirection: "column", flex: "1", padding: "10px" },
					children
				},
				data
			}
		};
	}
}
