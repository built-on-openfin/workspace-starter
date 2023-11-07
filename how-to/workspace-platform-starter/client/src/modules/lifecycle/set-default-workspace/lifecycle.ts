import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { EndpointClient } from "workspace-platform-starter/shapes/endpoint-shapes";
import type {
	Lifecycle,
	LifecycleEventMap,
	WorkspaceChangedLifecyclePayload
} from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { VersionInfo } from "workspace-platform-starter/shapes/version-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { EndpointDefaultWorkspaceSetRequest, SetDefaultWorkspaceProviderOptions } from "./shapes";

/**
 * Implementation for the set default workspace lifecycle provider.
 */
export class SetDefaultWorkspaceProvider implements Lifecycle<SetDefaultWorkspaceProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<SetDefaultWorkspaceProviderOptions> | undefined;

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
	 * An endpoint client if available.
	 * @internal
	 */
	private _endpointClient: EndpointClient | undefined;

	/**
	 * The endpoint Id to use
	 * @internal
	 * */
	private _endpointId: string | undefined;

	/**
	 * The version info for the currently running platform.
	 * @internal
	 */
	private _versionInfo: VersionInfo | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<SetDefaultWorkspaceProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("SetDefaultWorkspaceProvider");
		this._helpers = helpers;
		this._endpointId = this._definition?.data?.endpointId ?? "set-default-workspace";
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
		if (!isEmpty(this._helpers?.getEndpointClient)) {
			const endpointClient = await this._helpers?.getEndpointClient();
			if (
				!isEmpty(endpointClient) &&
				!isEmpty(this._endpointId) &&
				endpointClient.hasEndpoint(this._endpointId)
			) {
				this._endpointClient = endpointClient;
			}
			if (!isEmpty(this._helpers?.getVersionInfo)) {
				this._versionInfo = await this._helpers?.getVersionInfo();
			}
		}

		lifecycleMap["workspace-changed"] = async (
			platform: WorkspacePlatformModule,
			customData?: unknown
		): Promise<void> => {
			if (!isEmpty(customData)) {
				const workspaceUpdate = customData as WorkspaceChangedLifecyclePayload;
				if (
					(workspaceUpdate.action === "update" || workspaceUpdate.action === "create") &&
					!isEmpty(this._endpointClient) &&
					!isEmpty(this._endpointId) &&
					!isEmpty(this._versionInfo)
				) {
					try {
						const payloadId = this._definition?.data?.payloadId ?? "default-workspace";
						const success = await this._endpointClient.action<EndpointDefaultWorkspaceSetRequest>(
							this._endpointId,
							{
								id: payloadId,
								platform: fin.me.identity.uuid,
								metaData: {
									version: {
										workspacePlatformClient: this._versionInfo.workspacePlatformClient,
										platformClient: this._versionInfo.platformClient
									}
								},
								payload: {
									workspaceId: workspaceUpdate.id
								}
							}
						);
						this._logger?.info(`Default workspace updated to workspace: ${workspaceUpdate.id}: ${success}`);
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
