import type { EndpointClient } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { VersionInfo } from "workspace-platform-starter/shapes/version-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type {
	DefaultWorkspacePayload,
	DefaultWorkspaceProviderOptions,
	EndpointDefaultWorkspaceGetRequest,
	EndpointDefaultWorkspaceGetResponse,
	EndpointDefaultWorkspaceSetRequest
} from "./shapes";

/**
 * A class that contains the methods required for saving and getting a default workspace.
 */
export class DefaultWorkspaceStorage {
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
	 * The helper methods to use.
	 * @internal
	 */
	private _settings?: DefaultWorkspaceProviderOptions;

	/**
	 * An endpoint client if available.
	 * @internal
	 */
	private _endpointClient: EndpointClient | undefined;

	/**
	 * The version info for the currently running platform.
	 * @internal
	 */
	private _versionInfo: VersionInfo | undefined;

	/**
	 * A helper for saving and returning the default workspace related information.
	 * @param settings settings to be used by this helper
	 * @param helpers helper functions to be used
	 * @param logger a logger to use while performing actions
	 */
	public async initialize(
		settings: DefaultWorkspaceProviderOptions | undefined,
		helpers: ModuleHelpers | undefined,
		logger: Logger
	): Promise<void> {
		this._logger = logger;
		this._helpers = helpers;
		this._settings = settings;
		await this.setupEndpointClient();
		await this.setVersionInfo();
	}

	/**
	 * Save the default workspace.
	 * @param payload The payload to save.
	 * @returns whether or not the save was successful.
	 */
	public async setDefaultWorkspace(payload: DefaultWorkspacePayload): Promise<boolean> {
		const payloadId = this._settings?.payloadId ?? "default-workspace";
		const setEndpointId = this._settings?.endpointIds?.setDefaultWorkspace ?? "set-default-workspace";
		if (
			!isEmpty(this._endpointClient) &&
			!isEmpty(this._versionInfo) &&
			this._endpointClient.hasEndpoint(setEndpointId)
		) {
			const success = await this._endpointClient.action<EndpointDefaultWorkspaceSetRequest>(setEndpointId, {
				id: payloadId,
				platform: fin.me.identity.uuid,
				metaData: {
					version: {
						workspacePlatformClient: this._versionInfo.workspacePlatformClient,
						platformClient: this._versionInfo.platformClient
					}
				},
				payload
			});
			return success;
		}
		this._logger?.warn(
			"Unable to set the default workspace as the access to the endpoint client, version info or the endpoint is not available."
		);
		return false;
	}

	/**
	 * Get the currently saved default workspace.
	 * @returns an object representing the saved default workspace or a payload with an empty workspace
	 * and default useLastActiveWorkspace setting.
	 */
	public async getDefaultWorkspace(): Promise<DefaultWorkspacePayload> {
		const payloadId = this._settings?.payloadId ?? "default-workspace";
		const getEndpointId = this._settings?.endpointIds?.getDefaultWorkspace ?? "get-default-workspace";
		const noSavedData: DefaultWorkspacePayload = {
			useLastActiveWorkspace: false,
			workspaceId: ""
		};
		if (!isEmpty(this._endpointClient) && this._endpointClient.hasEndpoint(getEndpointId)) {
			const savedWorkspace = await this._endpointClient.requestResponse<
				EndpointDefaultWorkspaceGetRequest,
				EndpointDefaultWorkspaceGetResponse
			>(getEndpointId, {
				platform: fin.me.identity.uuid,
				id: payloadId
			});
			return savedWorkspace?.payload ?? noSavedData;
		}
		this._logger?.warn(
			"Unable to get the default workspace as the access to the endpoint client or the endpoint is not available."
		);
		return noSavedData;
	}

	/**
	 * Setup the endpoint client if you have access to the function to get the client.
	 * @returns a boolean representing whether or not the endpoint client could be created.
	 */
	private async setupEndpointClient(): Promise<boolean> {
		if (!isEmpty(this._helpers?.getEndpointClient)) {
			this._endpointClient = await this._helpers?.getEndpointClient();
			return true;
		}
		return false;
	}

	/**
	 * Set the version info for the currently running platform.
	 * @returns a boolean representing whether or not the version info was available.
	 */
	private async setVersionInfo(): Promise<boolean> {
		if (!isEmpty(this._helpers?.getVersionInfo)) {
			this._versionInfo = await this._helpers?.getVersionInfo();
			return true;
		}
		return false;
	}
}
