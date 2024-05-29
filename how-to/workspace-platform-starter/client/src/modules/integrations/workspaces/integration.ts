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
import {
	FAVORITE_TYPE_NAME_WORKSPACE,
	type FavoriteClient,
	type FavoriteEntry,
	type FavoriteInfo,
	type FavoriteTypeNames
} from "workspace-platform-starter/shapes/favorite-shapes";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition
} from "workspace-platform-starter/shapes/integrations-shapes";
import type {
	FavoriteChangedLifecyclePayload,
	WorkspaceChangedLifecyclePayload
} from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue, randomUUID } from "workspace-platform-starter/utils";
import type { WorkspacesSettings } from "./shapes";

/**
 * Implement the integration provider for workspaces.
 */
export class WorkspacesProvider implements IntegrationModule<WorkspacesSettings> {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 100;

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
	 * The module definition.
	 * @internal
	 */
	private _definition: IntegrationModuleDefinition<WorkspacesSettings> | undefined;

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
	 * Subscription id for theme-changed lifecycle event.
	 */
	private _themeChangedSubscriptionId: string | undefined;

	/**
	 * Subscription id for favorite-changed lifecycle event.
	 */
	private _favChangedSubscriptionId: string | undefined;

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
		this._definition = definition;
		this._logger = loggerCreator("WorkspacesProvider");

		if (this._integrationHelpers.subscribeLifecycleEvent) {
			this._integrationHelpers.subscribeLifecycleEvent<WorkspaceChangedLifecyclePayload>(
				"workspace-changed",
				async (
					platform: WorkspacePlatformModule,
					payload?: WorkspaceChangedLifecyclePayload
				): Promise<void> => {
					if (payload?.action === "create" || payload?.action === "apply") {
						if (!isEmpty(this._lastQuery) && !this._lastQuery.startsWith("/w ")) {
							await this.rebuildResults(platform);
						}
					} else if (payload?.action === "update") {
						const lastResult = this._lastResults?.find((res) => res.key === payload.id);
						if (lastResult && payload.workspace) {
							lastResult.title = payload.workspace.title;
							lastResult.data.workspaceTitle = payload.workspace.title;
							(lastResult.templateContent as CustomTemplate).data.title = payload.workspace.title;

							this.resultAddUpdate([lastResult]);

							const { favoriteClient } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);
							if (favoriteClient?.setSavedFavorite) {
								const saved = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_WORKSPACE);
								const favorite = await saved?.find((f) => f.typeId === payload.id);
								if (favorite) {
									favorite.label = payload.workspace.title;
									await favoriteClient.setSavedFavorite(favorite);
								}
							}
						}
					} else if (payload?.action === "delete") {
						this.resultRemove(payload.id);

						const { favoriteClient } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);
						if (favoriteClient?.deleteSavedFavorite) {
							const saved = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_WORKSPACE);
							const favorite = await saved?.find((f) => f.typeId === payload.id);
							if (favorite) {
								await favoriteClient.deleteSavedFavorite(favorite.id);
							}
						}
					}
				}
			);
			this._themeChangedSubscriptionId = this._integrationHelpers.subscribeLifecycleEvent(
				"theme-changed",
				async () => {
					if (this._integrationHelpers?.getPlatform) {
						const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
						await this.rebuildResults(platform);
					}
				}
			);
			this._favChangedSubscriptionId =
				this._integrationHelpers.subscribeLifecycleEvent<FavoriteChangedLifecyclePayload>(
					"favorite-changed",
					async (_: unknown, payload?: FavoriteChangedLifecyclePayload) => {
						if (!isEmpty(payload)) {
							await this.updateAppFavoriteButtons(payload);
						}
					}
				);
		}
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		if (this._integrationHelpers?.unsubscribeLifecycleEvent) {
			if (isStringValue(this._themeChangedSubscriptionId)) {
				this._integrationHelpers.unsubscribeLifecycleEvent(this._themeChangedSubscriptionId, "theme-changed");
				this._themeChangedSubscriptionId = undefined;
			}

			if (isStringValue(this._favChangedSubscriptionId)) {
				this._integrationHelpers.unsubscribeLifecycleEvent(
					this._favChangedSubscriptionId,
					"favorite-changed"
				);
				this._favChangedSubscriptionId = undefined;
			}
		}
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		if (this._integrationHelpers && this._settings) {
			const themeClient = await this._integrationHelpers.getThemeClient();
			return [
				{
					key: `${this._definition?.id}-help1`,
					score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
					title: "Workspaces",
					label: "Help",
					icon: await themeClient.themeUrl(this._settings.images.workspace),
					actions: [],
					data: {
						providerId: this._definition?.id
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
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength?: number;
			queryAgainst?: string[];
			isSuggestion?: boolean;
		}
	): Promise<HomeSearchResponse> {
		if (this._integrationHelpers?.getPlatform && this._settings) {
			const themeClient = await this._integrationHelpers.getThemeClient();
			const platform: WorkspacePlatformModule = this._integrationHelpers.getPlatform();
			const queryLower = query.toLowerCase();
			const queryMinLength = options?.queryMinLength ?? 3;

			let workspaces: Workspace[] = await platform.Storage.getWorkspaces();
			let matchQuery = queryLower;

			this._lastResponse = lastResponse;
			this._lastQuery = queryLower;
			this._lastQueryMinLength = queryMinLength;

			if (queryLower.startsWith("/w ")) {
				const title = queryLower.replace("/w ", "");

				const foundMatch = workspaces.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
				if (foundMatch) {
					return {
						results: [
							{
								key: WorkspacesProvider._ACTION_EXISTS_WORKSPACE,
								score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
								title: `Workspace ${foundMatch.title} already exists.`,
								icon: await themeClient.themeUrl(this._settings.images.workspace),
								actions: [],
								data: {
									providerId: this._definition?.id,
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
							score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
							title: `Save Current Workspace as ${title}`,
							icon: await themeClient.themeUrl(this._settings.images.workspace),
							label: "Suggestion",
							actions: [{ name: "Save Workspace", hotkey: "Enter" }],
							data: {
								providerId: this._definition?.id,
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

			const { favoriteClient, favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);

			if (
				favoriteInfo?.isEnabled &&
				isStringValue(favoriteInfo?.command) &&
				queryLower === favoriteInfo.command &&
				favoriteClient
			) {
				const favoriteApps = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_WORKSPACE);
				const favIds = favoriteApps?.map((f) => f.typeId) ?? [];
				workspaces = workspaces.filter((a) => favIds.includes(a.workspaceId));
				matchQuery = "";
			}

			const workspaceResults: HomeSearchResult[] = await this.buildResults(
				platform,
				workspaces,
				matchQuery,
				queryMinLength
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
		if (result.action.trigger === "user-action") {
			if (result.action.name.endsWith("favorite") && result.data?.workspaceId) {
				const { favoriteClient } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);
				if (favoriteClient) {
					if (result.action.name.startsWith("un")) {
						if (!isEmpty(result.data?.favoriteId) && favoriteClient.deleteSavedFavorite) {
							await favoriteClient.deleteSavedFavorite(result.data.favoriteId);
						}
					} else if (favoriteClient.setSavedFavorite) {
						await favoriteClient.setSavedFavorite({
							id: randomUUID(),
							type: FAVORITE_TYPE_NAME_WORKSPACE,
							typeId: result.key,
							label: result.title,
							icon: this._settings?.images.workspace
						});
					}

					handled = true;
				}
			} else if (this._integrationHelpers?.getPlatform) {
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
						if (this._integrationHelpers?.getShareClient) {
							const shareClient = await this._integrationHelpers.getShareClient();
							if (shareClient) {
								shareEnabled = await shareClient.typeEnabled("workspace");
							}
						}

						const { favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);

						const savedWorkspace = await this.getWorkspaceTemplate(
							workspace.workspaceId,
							workspace.title,
							shareEnabled,
							true,
							favoriteInfo
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
						this._integrationHelpers.getShareClient
					) {
						const shareClient = await this._integrationHelpers.getShareClient();
						if (shareClient) {
							await shareClient.share("workspace", { workspaceId: data.workspaceId });
						}
					} else {
						handled = false;
						this._logger?.warn(`Unrecognized action for workspace selection: ${data.workspaceId}`);
					}
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
	 * @param favInfo The favorites info if it is enabled.
	 * @param favoriteId The id of the favorite.
	 * @returns The home result.
	 */
	private async getWorkspaceTemplate(
		id: string,
		title: string,
		shareEnabled: boolean,
		isCurrent: boolean,
		favInfo: FavoriteInfo | undefined,
		favoriteId?: string
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

			const themeClient = await this._integrationHelpers.getThemeClient();

			const icon = await themeClient.themeUrl(this._settings.images.workspace);

			const headerButtons: { icon: string; action: string }[] = [];

			if (favInfo?.favoriteIcon && favInfo.unfavoriteIcon) {
				const favoriteIcon = await themeClient.themeUrl(
					!isEmpty(favoriteId) ? favInfo.favoriteIcon : favInfo.unfavoriteIcon
				);
				if (favoriteIcon) {
					headerButtons.push({
						icon: favoriteIcon,
						action: !isEmpty(favoriteId) ? "unfavorite" : "favorite"
					});
				}
			}

			const layoutData = await this._integrationHelpers.templateHelpers.createLayout(
				title,
				icon,
				[await this._integrationHelpers.templateHelpers.createText("instructions")],
				actionButtons,
				headerButtons
			);

			return {
				key: id,
				score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
				title,
				label: "Workspace",
				icon,
				actions,
				data: {
					providerId: this._definition?.id,
					workspaceTitle: title,
					workspaceId: id,
					tags: ["workspace"],
					favoriteId
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
			score: this._definition?.baseScore ?? WorkspacesProvider._DEFAULT_BASE_SCORE,
			title,
			label: "Workspace",
			actions: [],
			data: {
				providerId: this._definition?.id,
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
		if (this._integrationHelpers && !isEmpty(this._lastQuery) && !isEmpty(this._lastQueryMinLength)) {
			const workspaces: Workspace[] = await platform.Storage.getWorkspaces();
			const results = await this.buildResults(
				platform,
				workspaces,
				this._lastQuery,
				this._lastQueryMinLength
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
	 * @returns The list of home search results.
	 */
	private async buildResults(
		platform: WorkspacePlatformModule,
		workspaces: Workspace[],
		query: string,
		queryMinLength: number
	): Promise<HomeSearchResult[]> {
		let results: HomeSearchResult[] = [];

		if (this._integrationHelpers && Array.isArray(workspaces)) {
			const currentWorkspace = await platform.getCurrentWorkspace();
			const currentWorkspaceId = currentWorkspace?.workspaceId;
			let shareEnabled: boolean = false;
			if (this._integrationHelpers?.getShareClient) {
				const shareClient = await this._integrationHelpers.getShareClient();
				if (shareClient) {
					shareEnabled = await shareClient.typeEnabled("workspace");
				}
			}

			const { favoriteClient, favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);
			let savedFavorites: FavoriteEntry[] | undefined;

			if (favoriteClient) {
				savedFavorites = await favoriteClient.getSavedFavorites(FAVORITE_TYPE_NAME_WORKSPACE);
			}

			const wksProm = workspaces
				.filter(
					(w) =>
						query.length === 0 || (query.length >= queryMinLength && w.title.toLowerCase().includes(query))
				)
				.sort((a, b) => a.title.localeCompare(b.title))
				.map(async (ws: Workspace) => {
					const favoriteId = savedFavorites?.find((f) => f.typeId === ws.workspaceId)?.id;

					return this.getWorkspaceTemplate(
						ws.workspaceId,
						ws.title,
						shareEnabled,
						currentWorkspaceId === ws.workspaceId,
						favoriteInfo,
						favoriteId
					);
				});

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

	/**
	 * Update the app buttons if the favorites have changed.
	 * @param payload The payload of the favorite change.
	 */
	private async updateAppFavoriteButtons(payload: FavoriteChangedLifecyclePayload): Promise<void> {
		const favorite: FavoriteEntry = payload.favorite;

		if (
			!isEmpty(this._lastResponse) &&
			this._integrationHelpers?.getPlatform &&
			(payload.action === "set" || payload.action === "delete") &&
			!isEmpty(favorite) &&
			favorite.type === FAVORITE_TYPE_NAME_WORKSPACE &&
			this._lastResults
		) {
			const { favoriteInfo } = await this.getFavInfo(FAVORITE_TYPE_NAME_WORKSPACE);

			if (this._lastQuery === favoriteInfo?.command && payload.action === "delete") {
				this._lastResponse.revoke(favorite.typeId);
			} else if (this._lastResults) {
				const lastWorkspace = this._lastResults.find((ws) => ws.key === favorite.typeId);

				if (!isEmpty(lastWorkspace)) {
					let shareEnabled: boolean = false;
					if (this._integrationHelpers?.getConditionsClient) {
						const conditionsClient = await this._integrationHelpers.getConditionsClient();
						if (conditionsClient) {
							shareEnabled = await conditionsClient.check("sharing");
						}
					}

					const platform = this._integrationHelpers.getPlatform();
					const currentWorkspace = await platform.getCurrentWorkspace();
					const currentWorkspaceId = currentWorkspace?.workspaceId;

					const rebuilt = await this.getWorkspaceTemplate(
						lastWorkspace.key,
						lastWorkspace.title,
						shareEnabled,
						currentWorkspaceId === lastWorkspace.key,
						favoriteInfo,
						payload.action === "set" ? favorite.id : undefined
					);

					this._lastResponse.respond([rebuilt]);
				}
			}
		}
	}

	/**
	 * Get the favorite info and client if they are enabled.
	 * @param favoriteTypeNames The type of client to get.
	 * @returns The favorite info and client.
	 */
	private async getFavInfo(
		favoriteTypeNames: FavoriteTypeNames
	): Promise<{ favoriteClient: FavoriteClient | undefined; favoriteInfo: FavoriteInfo | undefined }> {
		let favoriteInfo: FavoriteInfo | undefined;
		let favoriteClient: FavoriteClient | undefined;

		if ((this._definition?.data?.favoritesEnabled ?? true) && this._integrationHelpers?.getFavoriteClient) {
			favoriteClient = await this._integrationHelpers.getFavoriteClient();
			if (favoriteClient) {
				favoriteInfo = favoriteClient.getInfo();
				if (favoriteInfo.isEnabled) {
					const isSupported = favoriteInfo?.enabledTypes?.includes(favoriteTypeNames) ?? true;
					if (!isSupported) {
						favoriteInfo = undefined;
						favoriteClient = undefined;
					}
				}
			}
		}

		return {
			favoriteClient,
			favoriteInfo
		};
	}
}
