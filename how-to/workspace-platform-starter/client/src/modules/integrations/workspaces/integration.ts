import type {
	CLIFilter,
	CLITemplate,
	CustomTemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult
} from "@openfin/workspace";
import type { Workspace, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	IntegrationHelpers,
	IntegrationModule
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { WorkspaceChangedLifecyclePayload } from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type { ColorSchemeMode } from "workspace-platform-starter/shapes/theme-shapes";
import { isEmpty, randomUUID } from "../../../framework/utils";
import type { WorkspacesSettings } from "./shapes";

/**
 * Implement the integration provider for workspaces.
 */
export class WorkspacesProvider implements IntegrationModule<WorkspacesSettings> {
	/**
	 * The key to use for opening a workspace.
	 * @internal
	 */
	private static readonly _ACTION_OPEN_WORKSPACE = "Open Workspace";

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
	 * Provider id.
	 * @internal
	 */
	private _providerId?: string;

	/**
	 * The settings from config.
	 */
	private _settings?: WorkspacesSettings;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _logger?: Logger;

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
		definition: ModuleDefinition<WorkspacesSettings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._settings = definition.data;
		this._integrationHelpers = helpers;
		this._logger = loggerCreator("WorkspacesProvider");
		this._providerId = definition.id;
		if (this._integrationHelpers.subscribeLifecycleEvent) {
			this._integrationHelpers.subscribeLifecycleEvent(
				"workspace-changed",
				async (platform: WorkspacePlatformModule, payload: unknown): Promise<void> => {
					const wsPayload = payload as WorkspaceChangedLifecyclePayload;
					if (wsPayload.action === "create") {
						if (!isEmpty(this._lastQuery) && !this._lastQuery.startsWith("/w ")) {
							await this.rebuildResults(platform);
						}
					} else if (wsPayload.action === "update") {
						const lastResult = this._lastResults?.find((res) => res.key === wsPayload.id);
						if (lastResult && wsPayload.workspace) {
							lastResult.title = wsPayload.workspace.title;
							lastResult.data.workspaceTitle = wsPayload.workspace.title;
							(lastResult.templateContent as CustomTemplate).data.title = wsPayload.workspace.title;
							this.resultAddUpdate([lastResult]);
						}
					} else if (wsPayload.action === "delete") {
						this.resultRemove(wsPayload.id);
					}
				}
			);
			this._integrationHelpers.subscribeLifecycleEvent("theme-changed", async () => {
				if (this._integrationHelpers?.getPlatform) {
					const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
					await this.rebuildResults(platform);
				}
			});
		}
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		if (this._integrationHelpers && this._settings) {
			const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();

			return [
				{
					key: `${this._providerId}-help1`,
					title: "Workspaces",
					label: "Help",
					icon: this._settings.images.workspace.replace("{scheme}", colorScheme as string),
					actions: [],
					data: {
						providerId: this._providerId
					},
					template: "Custom" as CLITemplate.Custom,
					templateContent: await this._integrationHelpers.templateHelpers.createHelp(
						"Workspaces",
						["Use the workspaces command to save your current layout."],
						["/w title"]
					)
				}
			];
		}
		return [];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
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
		if (this._integrationHelpers?.getPlatform && this._settings) {
			const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
			const workspaces: Workspace[] = await platform.Storage.getWorkspaces();
			const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();

			const queryLower = query.toLowerCase();

			this._lastResponse = lastResponse;
			this._lastQuery = queryLower;
			this._lastQueryMinLength = options.queryMinLength;

			if (queryLower.startsWith("/w ")) {
				const title = queryLower.replace("/w ", "");

				const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
				if (foundMatch) {
					return {
						results: [
							{
								key: WorkspacesProvider._ACTION_EXISTS_WORKSPACE,
								title: `Workspace ${foundMatch.title} already exists.`,
								icon: this._settings.images.workspace.replace("{scheme}", colorScheme as string),
								actions: [],
								data: {
									providerId: this._providerId,
									tags: ["workspace"],
									workspaceId: foundMatch.workspaceId
								},
								template: "Plain" as CLITemplate.Plain,
								templateContent: undefined
							}
						]
					};
				}
				return {
					results: [
						{
							key: WorkspacesProvider._ACTION_SAVE_WORKSPACE,
							title: `Save Current Workspace as ${title}`,
							icon: this._settings.images.workspace.replace("{scheme}", colorScheme as string),
							label: "Suggestion",
							actions: [{ name: "Save Workspace", hotkey: "Enter" }],
							data: {
								providerId: this._providerId,
								tags: ["workspace"],
								workspaceId: randomUUID(),
								workspaceTitle: title
							},
							template: "Plain" as CLITemplate.Plain,
							templateContent: undefined
						}
					]
				};
			}

			const workspaceResults: HomeSearchResult[] = await this.buildResults(
				platform,
				workspaces,
				queryLower,
				options.queryMinLength,
				colorScheme
			);

			this._lastResults = workspaceResults;

			return {
				results: workspaceResults
			};
		}

		return {
			results: []
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
		if (this._integrationHelpers?.getPlatform && result.action.trigger === "user-action") {
			const data: {
				workspaceId?: string;
				workspaceTitle?: string;
			} = result.data;

			if (data?.workspaceId) {
				handled = true;

				if (result.key === WorkspacesProvider._ACTION_SAVE_WORKSPACE) {
					// Remove the save workspace entry
					this.resultRemove(result.key);

					const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
					const snapshot = await platform.getSnapshot();
					const currentWorkspace = await platform.getCurrentWorkspace();
					const currentMetaData = currentWorkspace?.metadata;

					const workspace = {
						workspaceId: data.workspaceId,
						title: data.workspaceTitle ?? "",
						metadata: currentMetaData,
						snapshot
					};

					await platform.Storage.saveWorkspace(workspace);

					let shareEnabled: boolean = false;
					if (this._integrationHelpers.condition) {
						shareEnabled = await this._integrationHelpers.condition("sharing");
					}
					const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();

					const savedWorkspace = await this.getWorkspaceTemplate(
						workspace.workspaceId,
						workspace.title,
						shareEnabled,
						true,
						colorScheme
					);

					// And add the new one
					this.resultAddUpdate([savedWorkspace]);
				} else if (result.key === WorkspacesProvider._ACTION_EXISTS_WORKSPACE) {
					// Do nothing, the user must update the query to give it a different
					// name which will automatically refresh the results
				} else if (result.action.name === WorkspacesProvider._ACTION_OPEN_WORKSPACE) {
					const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
					const workspace = await platform.Storage.getWorkspace(data.workspaceId);
					await platform.applyWorkspace(workspace);
					// We rebuild the results here as we will now have a new current workspace
					// and we need to change the existing one back to a standard template
					await this.rebuildResults(platform);
				} else if (result.action.name === WorkspacesProvider._ACTION_DELETE_WORKSPACE) {
					const platform = this._integrationHelpers.getPlatform();
					await platform.Storage.deleteWorkspace(data.workspaceId);
					// Deleting the working will eventually trigger the "delete" lifecycle
					// event which will remove it from the result list
				} else if (
					result.action.name === WorkspacesProvider._ACTION_SHARE_WORKSPACE &&
					this._integrationHelpers.share
				) {
					await this._integrationHelpers.share({ type: "workspace", workspaceId: data.workspaceId });
				} else {
					handled = false;
					this._logger?.warn(`Unrecognized action for workspace selection: ${data.workspaceId}`);
				}
			}
		}

		return handled;
	}

	/**
	 * Get the template for a workspace.
	 * @param id The id of the item.
	 * @param title The title of the workspace.
	 * @param shareEnabled Is sharing enabled.
	 * @param isCurrent Is this the current workspace.
	 * @param colorScheme The current color scheme.
	 * @returns The home result.
	 */
	private async getWorkspaceTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		isCurrent: boolean,
		colorScheme: ColorSchemeMode
	): Promise<HomeSearchResult> {
		if (this._integrationHelpers && this._settings) {
			const actions = [
				{
					name: WorkspacesProvider._ACTION_OPEN_WORKSPACE,
					hotkey: "Enter"
				}
			];
			const actionButtons: { title: string; action: string }[] = [
				{
					title: "Open",
					action: WorkspacesProvider._ACTION_OPEN_WORKSPACE
				}
			];
			let instructions;

			if (isCurrent) {
				instructions =
					"This is the currently active workspace. You can use the Browser menu to update/rename this workspace";
			} else {
				instructions = "Use the buttons below to interact with your saved workspace";
				actions.push({
					name: WorkspacesProvider._ACTION_DELETE_WORKSPACE,
					hotkey: "CmdOrCtrl+Shift+D"
				});
				actionButtons.push({
					title: "Delete",
					action: WorkspacesProvider._ACTION_DELETE_WORKSPACE
				});
			}

			if (shareEnabled) {
				actions.push({
					name: WorkspacesProvider._ACTION_SHARE_WORKSPACE,
					hotkey: "CmdOrCtrl+Shift+S"
				});
				actionButtons.push({
					title: "Share",
					action: WorkspacesProvider._ACTION_SHARE_WORKSPACE
				});
			}

			const icon = this._settings.images.workspace.replace("{scheme}", colorScheme as string);

			const layoutData = await this._integrationHelpers.templateHelpers.createLayout(
				title,
				icon,
				[await this._integrationHelpers.templateHelpers.createText("instructions")],
				actionButtons
			);

			return {
				key: id,
				title,
				label: "Workspace",
				icon,
				actions,
				data: {
					providerId: this._providerId,
					workspaceTitle: title,
					workspaceId: id,
					tags: ["workspace"]
				},
				template: "Custom" as CLITemplate.Custom,
				templateContent: {
					layout: layoutData.layout,
					data: {
						...layoutData.data,
						instructions
					}
				}
			};
		}
		return {
			key: id,
			title,
			label: "Workspace",
			actions: [],
			data: {
				providerId: this._providerId,
				workspaceTitle: title,
				workspaceId: id,
				tags: ["workspace"]
			},
			template: "Plain" as CLITemplate.Plain,
			templateContent: undefined
		};
	}

	/**
	 * Rebuild the results after color scheme change.
	 * @param platform The workspace platform.
	 */
	private async rebuildResults(platform: WorkspacePlatformModule): Promise<void> {
		if (this._integrationHelpers && this._lastQuery && this._lastQueryMinLength) {
			const colorScheme = await this._integrationHelpers.getCurrentColorSchemeMode();

			const workspaces: Workspace[] = await platform.Storage.getWorkspaces();
			const results = await this.buildResults(
				platform,
				workspaces,
				this._lastQuery,
				this._lastQueryMinLength,
				colorScheme
			);
			this.resultAddUpdate(results);
		}
	}

	/**
	 * Build the results for the workspaces.
	 * @param platform The workspace platform.
	 * @param workspaces The list of workspaces to build the results for.
	 * @param query The query.
	 * @param queryMinLength The min query length.
	 * @param colorScheme The color scheme.
	 * @returns The list of home search results.
	 */
	private async buildResults(
		platform: WorkspacePlatformModule,
		workspaces: Workspace[],
		query: string,
		queryMinLength: number,
		colorScheme: ColorSchemeMode
	): Promise<HomeSearchResult[]> {
		let results: HomeSearchResult[] = [];

		if (this._integrationHelpers && Array.isArray(workspaces)) {
			const currentWorkspace = await platform.getCurrentWorkspace();
			const currentWorkspaceId = currentWorkspace?.workspaceId;
			let shareEnabled: boolean = false;
			if (this._integrationHelpers.condition) {
				shareEnabled = await this._integrationHelpers.condition("sharing");
			}

			const wksProm = workspaces
				.filter(
					(pg) =>
						query.length === 0 || (query.length >= queryMinLength && pg.title.toLowerCase().includes(query))
				)
				.sort((a, b) => a.title.localeCompare(b.title))
				.map(async (ws: Workspace) =>
					this.getWorkspaceTemplate(
						ws.workspaceId,
						ws.title,
						shareEnabled,
						currentWorkspaceId === ws.workspaceId,
						colorScheme
					)
				);

			results = await Promise.all(wksProm);
		}
		return results;
	}

	/**
	 * Add or update a result.
	 * @param results The results to add or update.
	 */
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

	/**
	 * Remove a result.
	 * @param id The id of the item to remove.
	 */
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
