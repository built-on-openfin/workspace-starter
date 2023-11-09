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
	private readonly _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private readonly _helpers: ModuleHelpers | undefined;

	/**
	 * The helper methods to use.
	 * @internal
	 */
	private readonly _settings?: DefaultWorkspaceProviderOptions;

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
	constructor(
		settings: DefaultWorkspaceProviderOptions | undefined,
		helpers: ModuleHelpers | undefined,
		logger: Logger
	) {
		this._logger = logger;
		this._helpers = helpers;
		this._settings = settings;
		this.setupEndpointClient()
			.then((result) => logger.info(`Endpoint client created: ${result}`))
			.catch((err) => logger.error("There was an error creating the endpoint client.", err));
		this.setVersionInfo()
			.then((result) => logger.info(`Version Info retrieved: ${result}`))
			.catch((err) => logger.error("There was an error fetching the version info.", err));
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
