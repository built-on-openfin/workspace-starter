import {
	ButtonStyle,
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	TemplateFragment,
	TemplateFragmentTypes
} from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";
import type { IntegrationHelpers, IntegrationModule } from "customize-workspace/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";
import type { ColorSchemeMode } from "customize-workspace/shapes/theme-shapes";

/**
 * Implement the integration provider for workspaces.
 */
export class WorkspacesProvider implements IntegrationModule {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "workspaces";

	/**
	 * The key to use for launching a workspace.
	 * @internal
	 */
	private static readonly _ACTION_LAUNCH_WORKSPACE = "Launch Workspace";

	/**
	 * The key to use for deleting a workspace.
	 * @internal
	 */
	private static readonly _ACTION_DELETE_WORKSPACE = "Delete Workspace";

	/**
	 * The key to use for sharing a workspace.
	 * @internal
	 */
	private static readonly _ACTION_SHARE_WORKSPACE = "Share Workspace";

	/**
	 * The key to use for saving a workspace.
	 * @internal
	 */
	private static readonly _ACTION_SAVE_WORKSPACE = "Save Workspace";

	/**
	 * The key to use for a workspace exists.
	 * @internal
	 */
	private static readonly _ACTION_EXISTS_WORKSPACE = "Workspace Exists";

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
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._logger = loggerCreator("WorkspacesProvider");
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
		const iconFolder = await this._integrationHelpers.getCurrentIconFolder();

		return [
			{
				key: `${WorkspacesProvider._PROVIDER_ID}-help1`,
				title: "Workspaces",
				label: "Help",
				icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
				actions: [],
				data: {
					providerId: WorkspacesProvider._PROVIDER_ID
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"Workspaces",
					["Use the workspaces command to save your current layout."],
					["/w title"]
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
		const platform = getCurrentSync();
		const workspaces = await platform.Storage.getWorkspaces();
		const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
		const iconFolder: string = await this._integrationHelpers.getCurrentIconFolder();

		const queryLower = query.toLowerCase();

		if (queryLower.startsWith("/w ")) {
			const title = queryLower.replace("/w ", "");

			const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
			if (foundMatch) {
				return {
					results: [
						{
							key: WorkspacesProvider._ACTION_EXISTS_WORKSPACE,
							title: `Workspace ${foundMatch.title} already exists.`,
							icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
							actions: [],
							data: {
								providerId: WorkspacesProvider._PROVIDER_ID,
								tags: ["workspace"],
								workspaceId: foundMatch.workspaceId
							},
							template: null,
							templateContent: null
						}
					]
				};
			}
			return {
				results: [
					{
						key: WorkspacesProvider._ACTION_SAVE_WORKSPACE,
						title: `Save Current Workspace as ${title}`,
						icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
						label: "Suggestion",
						actions: [{ name: "Save Workspace", hotkey: "Enter" }],
						data: {
							providerId: WorkspacesProvider._PROVIDER_ID,
							tags: ["workspace"],
							workspaceId: this._integrationHelpers.randomUUID(),
							workspaceTitle: title
						},
						template: null,
						templateContent: null
					}
				]
			};
		}

		let workspaceResults: HomeSearchResult[] = [];

		if (Array.isArray(workspaces)) {
			const currentWorkspace = await platform.getCurrentWorkspace();
			const currentWorkspaceId = currentWorkspace?.workspaceId;
			const shareEnabled: boolean = await this._integrationHelpers.condition("sharing");

			workspaceResults = workspaces
				.filter(
					(pg) =>
						query.length === 0 ||
						(query.length >= options.queryMinLength && pg.title.toLowerCase().includes(queryLower))
				)
				.map((ws) =>
					this.getWorkspaceTemplate(
						ws.workspaceId,
						ws.title,
						shareEnabled,
						currentWorkspaceId === ws.workspaceId,
						iconFolder,
						colorScheme
					)
				);
		}

		return {
			results: workspaceResults
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
				workspaceId?: string;
				workspaceTitle?: string;
			} = result.data;

			const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();
			const iconFolder: string = await this._integrationHelpers.getCurrentIconFolder();
			const shareEnabled: boolean = await this._integrationHelpers.condition("sharing");

			if (data?.workspaceId) {
				handled = true;

				if (result.key === WorkspacesProvider._ACTION_SAVE_WORKSPACE) {
					lastResponse.revoke(result.key);

					const platform = getCurrentSync();
					const snapshot = await platform.getSnapshot();
					const currentWorkspace = await platform.getCurrentWorkspace();
					const currentMetaData = currentWorkspace?.metadata;

					const workspace = {
						workspaceId: data.workspaceId,
						title: data.workspaceTitle,
						metadata: currentMetaData,
						snapshot
					};
					await platform.Storage.saveWorkspace(workspace);

					const savedTemplate = this.getWorkspaceTemplate(
						data.workspaceId,
						data.workspaceTitle,
						shareEnabled,
						true,
						iconFolder,
						colorScheme
					);

					lastResponse.respond([savedTemplate]);
				} else if (result.key === WorkspacesProvider._ACTION_EXISTS_WORKSPACE) {
					lastResponse.revoke(result.key);
				} else if (result.action.name === WorkspacesProvider._ACTION_LAUNCH_WORKSPACE) {
					lastResponse.revoke(result.key);
					const platform = getCurrentSync();
					const workspace = await platform.Storage.getWorkspace(data.workspaceId);
					await platform.applyWorkspace(workspace);

					const savedTemplate = this.getWorkspaceTemplate(
						data.workspaceId,
						data.workspaceTitle,
						shareEnabled,
						true,
						iconFolder,
						colorScheme
					);

					lastResponse.respond([savedTemplate]);
				} else if (result.action.name === WorkspacesProvider._ACTION_DELETE_WORKSPACE) {
					const platform = getCurrentSync();
					await platform.Storage.deleteWorkspace(data.workspaceId);
					lastResponse.revoke(result.key);
				} else if (result.action.name === WorkspacesProvider._ACTION_SHARE_WORKSPACE) {
					await this._integrationHelpers.share({ workspaceId: data.workspaceId });
				} else {
					handled = false;
					this._logger.warn(`Unrecognized action for workspace selection: ${data.workspaceId}`);
				}
			}
		}

		return handled;
	}

	private getWorkspaceTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		isCurrent: boolean,
		iconFolder: string,
		colorScheme: ColorSchemeMode
	): HomeSearchResult {
		let actions = [];
		let layout;
		let data;

		if (isCurrent) {
			layout = this.getCurrentWorkspaceTemplate();
			data = {
				title,
				instructions:
					"This is the currently active workspace. You can use the Browser menu to update/rename this workspace"
			};
		} else {
			if (shareEnabled) {
				actions.push({
					name: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
					hotkey: "CmdOrCtrl+Shift+S"
				});
			}
			actions = actions.concat([
				{
					name: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
					hotkey: "CmdOrCtrl+Shift+D"
				},
				{
					name: WorkspacesProvider._ACTION_LAUNCH_WORKSPACE,
					hotkey: "Enter"
				}
			]);
			layout = this.getOtherWorkspaceTemplate(shareEnabled);
			data = {
				title,
				instructions: "Use the buttons below to interact with your saved Workspace:",
				openText: "Launch",
				deleteText: "Delete",
				shareText: "Share"
			};
		}

		return {
			key: id,
			title,
			label: "Workspace",
			icon: `${this._integrationHelpers.rootUrl}/common/icons/${iconFolder}/${colorScheme}/workspaces.svg`,
			actions,
			data: {
				providerId: WorkspacesProvider._PROVIDER_ID,
				workspaceTitle: title,
				workspaceId: id,
				tags: ["workspace"]
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout,
				data
			}
		};
	}

	private getOtherWorkspaceTemplate(enableShare: boolean): TemplateFragment {
		const actionButtons: TemplateFragment[] = [
			{
				type: TemplateFragmentTypes.Button,
				style: {
					display: "flex",
					flexDirection: "column",
					width: "80px"
				},
				action: WorkspacesProvider._ACTION_LAUNCH_WORKSPACE,
				children: [
					{
						type: TemplateFragmentTypes.Text,
						dataKey: "openText",
						optional: false
					}
				]
			},
			{
				type: TemplateFragmentTypes.Button,
				buttonStyle: ButtonStyle.Primary,
				style: {
					display: "flex",
					flexDirection: "column",
					width: "80px",
					marginLeft: "10px",
					marginRight: "10px"
				},
				action: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
				children: [
					{
						type: TemplateFragmentTypes.Text,
						dataKey: "deleteText",
						optional: false
					}
				]
			}
		];

		if (enableShare) {
			actionButtons.push({
				type: TemplateFragmentTypes.Button,
				buttonStyle: ButtonStyle.Primary,
				style: {
					display: "flex",
					flexDirection: "column",
					width: "80px"
				},
				action: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
				children: [
					{
						type: TemplateFragmentTypes.Text,
						dataKey: "shareText",
						optional: false
					}
				]
			});
		}

		return {
			type: TemplateFragmentTypes.Container,
			style: {
				paddingTop: "10px",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "title",
					style: {
						fontWeight: "bold",
						fontSize: "16px",
						textAlign: "center"
					}
				},
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "instructions",
					optional: true,
					style: {
						fontWeight: "bold",
						paddingTop: "10px",
						paddingBottom: "10px",
						paddingLeft: "10px",
						paddingRight: "10px"
					}
				},
				{
					type: TemplateFragmentTypes.Container,
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

	private getCurrentWorkspaceTemplate(): TemplateFragment {
		return {
			type: TemplateFragmentTypes.Container,
			style: {
				paddingTop: "10px",
				display: "flex",
				flexDirection: "column"
			},
			children: [
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "title",
					style: {
						fontWeight: "bold",
						fontSize: "16px",
						textAlign: "center"
					}
				},
				{
					type: TemplateFragmentTypes.Text,
					dataKey: "instructions",
					optional: true,
					style: {
						fontWeight: "bold",
						paddingTop: "10px",
						paddingBottom: "10px",
						paddingLeft: "10px",
						paddingRight: "10px"
					}
				}
			]
		};
	}
}
