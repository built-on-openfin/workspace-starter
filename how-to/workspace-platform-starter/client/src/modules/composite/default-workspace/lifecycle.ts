import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	Lifecycle,
	LifecycleEventMap,
	WorkspaceChangedLifecyclePayload
} from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import { DefaultWorkspaceStorage } from "./default-workspace-storage";
import type { DefaultWorkspaceProviderOptions } from "./shapes";

/**
 * Implementation for the apply default workspace lifecycle provider.
 */
export class ApplyDefaultWorkspaceProvider implements Lifecycle<DefaultWorkspaceProviderOptions> {
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

	/**
	 * The means to get and set default workspaces
	 * @internal
	 */
	private _defaultWorkspaceStorage: DefaultWorkspaceStorage | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<DefaultWorkspaceProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("ApplyDefaultWorkspaceProvider");
		this._helpers = helpers;
		this._defaultWorkspaceStorage = new DefaultWorkspaceStorage();
		await this._defaultWorkspaceStorage.initialize(definition?.data, helpers, this._logger);
		this._logger.info("Initializing");
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Get the lifecycle events.
	 * @returns The map of lifecycle events.
	 */
	public async get(): Promise<LifecycleEventMap> {
		const lifecycleMap: LifecycleEventMap = {};

		lifecycleMap["after-bootstrap"] = async (
			platform: WorkspacePlatformModule,
			customData?: unknown
		): Promise<void> => {
			try {
				const savedDefaultWorkspace = await this._defaultWorkspaceStorage?.getDefaultWorkspace();
				const workspaceId = savedDefaultWorkspace?.workspaceId;
				if (isStringValue(workspaceId) && !isEmpty(this._helpers?.launchWorkspace)) {
					this._logger?.info(
						`Retrieved workspace id: ${savedDefaultWorkspace?.workspaceId} and we have the ability to launch a workspace. Applying the workspace.`
					);
					const workspaceApplied = await this._helpers?.launchWorkspace(workspaceId, this._logger);
					this._logger?.info(`Workspace Id ${workspaceId} applied: ${workspaceApplied}`);
				}
			} catch (err) {
				this._logger?.error("There was an error trying to apply to get or apply the default workspace.", err);
			}
		};

		lifecycleMap["workspace-changed"] = async (
			platform: WorkspacePlatformModule,
			customData?: unknown
		): Promise<void> => {
			if (!isEmpty(customData)) {
				const workspaceUpdate = customData as WorkspaceChangedLifecyclePayload;
				if (
					(workspaceUpdate.action === "update" ||
						workspaceUpdate.action === "create" ||
						workspaceUpdate.action === "apply") &&
					!isEmpty(this._defaultWorkspaceStorage)
				) {
					try {
						const currentDefaultWorkspace = await this._defaultWorkspaceStorage.getDefaultWorkspace();
						if (currentDefaultWorkspace.useLastActiveWorkspace) {
							const success = await this._defaultWorkspaceStorage.setDefaultWorkspace({
								workspaceId: workspaceUpdate.id,
								useLastActiveWorkspace: true
							});
							this._logger?.info(
								`Default workspace updated to workspace: ${workspaceUpdate.id} through last active workspace: ${success}`
							);
						}
					} catch (err) {
						this._logger?.error(
							`Unable to update default workspace to workspace id: ${workspaceUpdate.id} because an error occurred.`,
							err
						);
					}
				}
			}
		};

		return lifecycleMap;
	}
}
