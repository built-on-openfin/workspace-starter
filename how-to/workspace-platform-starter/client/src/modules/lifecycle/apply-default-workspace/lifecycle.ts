import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Lifecycle, LifecycleEventMap } from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type {
	ApplyDefaultWorkspaceProviderOptions,
	EndpointDefaultWorkspaceGetRequest,
	EndpointDefaultWorkspaceGetResponse
} from "./shapes";

/**
 * Implementation for the apply default workspace lifecycle provider.
 */
export class ApplyDefaultWorkspaceProvider implements Lifecycle<ApplyDefaultWorkspaceProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ApplyDefaultWorkspaceProviderOptions> | undefined;

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
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ApplyDefaultWorkspaceProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ApplyDefaultWorkspaceProvider");
		this._helpers = helpers;

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
			if (!isEmpty(this._helpers?.getEndpointClient)) {
				const endpointClient = await this._helpers?.getEndpointClient();
				const defaultWorkspaceEndpointId = this._definition?.data?.endpointId ?? "get-default-workspace";
				const payloadId = this._definition?.data?.payloadId ?? "default-workspace";
				if (!isEmpty(endpointClient) && endpointClient.hasEndpoint(defaultWorkspaceEndpointId)) {
					try {
						const defaultWorkspace = await endpointClient.requestResponse<
							EndpointDefaultWorkspaceGetRequest,
							EndpointDefaultWorkspaceGetResponse | undefined
						>(defaultWorkspaceEndpointId, {
							platform: fin.me.identity.uuid,
							id: payloadId
						});
						if (
							!isEmpty(defaultWorkspace) &&
							!isEmpty(defaultWorkspace?.payload?.workspaceId) &&
							!isEmpty(this._helpers?.launchWorkspace)
						) {
							this._logger?.info(
								`Retrieved workspace id: ${defaultWorkspace?.payload.workspaceId} and we have the ability to launch a workspace. Applying the workspace.`
							);
							const workspaceApplied = await this._helpers?.launchWorkspace(
								defaultWorkspace.payload.workspaceId,
								this._logger
							);
							this._logger?.info(
								`Workspace Id ${defaultWorkspace?.payload.workspaceId} applied: ${workspaceApplied}`
							);
						}
					} catch (err) {
						this._logger?.error(
							"There was an error trying to apply to get or apply the default workspace.",
							err
						);
					}
				}
			}
		};

		return lifecycleMap;
	}
}
