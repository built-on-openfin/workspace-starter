import type OpenFin from "@openfin/core";
import type { Workspace } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type {
	Share,
	ShareConfirmationOptions,
	ShareEntry
} from "workspace-platform-starter/shapes/share-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import { loadShareRequest, saveShareRequest } from "../common/share-common";
import type { WorkspacesShareEntryPayload, WorkspacesShareProviderOptions } from "./shapes";

/**
 * Implementation for the workspaces share provider.
 */
export class WorkspacesShareProvider implements Share<WorkspacesShareProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<WorkspacesShareProviderOptions> | undefined;

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
		definition: ModuleDefinition<WorkspacesShareProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("WorkspacesShareProvider");
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
	 * Get the list of share types supported by the module.
	 * @returns Nothing.
	 */
	public async getShareTypes(): Promise<string[]> {
		return ["workspace"];
	}

	/**
	 * Get the shares from the module.
	 * @param windowIdentity The window identity to get the shares for.
	 * @returns Nothing.
	 */
	public async getEntries(windowIdentity: OpenFin.Identity): Promise<ShareEntry[] | undefined> {
		const workspaceShareEntryPayload: WorkspacesShareEntryPayload = {
			windowIdentity
		};
		return [
			{
				label: "Share Workspace",
				type: "workspace",
				payload: workspaceShareEntryPayload
			}
		];
	}

	/**
	 * Perform the share for the given entry.
	 * @param type The type of share to perform.
	 * @param payload The data to associate with the share.
	 * @returns Nothing.
	 */
	public async share(type: string, payload?: WorkspacesShareEntryPayload): Promise<void> {
		if (type === "workspace") {
			const platform = await this._helpers?.getPlatform?.();

			if (platform) {
				let workspace;

				const workspaceId = payload?.workspaceId;
				if (isEmpty(workspaceId)) {
					workspace = await platform.getCurrentWorkspace();
				} else {
					workspace = await platform.Storage.getWorkspace(workspaceId);
				}

				if (!isEmpty(workspace)) {
					const confirmation = await saveShareRequest(
						platform,
						this._logger,
						await this._helpers?.getEndpointClient?.(),
						this._definition?.data?.setEndpointId,
						type,
						workspace
					);

					await this.showConfirmation(confirmation, payload?.windowIdentity);
				}
			}
		}
	}

	/**
	 * Handle a share activation.
	 * @param type The type of the share.
	 * @param payload The payload for the share.
	 * @param payload.id The payload for the share.
	 * @returns Nothing.
	 */
	public async handle(type: string, payload: { id: string }): Promise<void> {
		if (type === "workspace") {
			const response = await loadShareRequest<Workspace>(
				this._logger,
				await this._helpers?.getEndpointClient?.(),
				this._definition?.data?.getEndpointId,
				type,
				payload.id
			);

			const platform = await this._helpers?.getPlatform?.();
			if (platform) {
				const responsePayload = response?.payload;
				if (!isEmpty(responsePayload) && this._helpers?.launchWorkspace) {
					await platform.Storage.saveWorkspace(responsePayload);
					await this._helpers.launchWorkspace(responsePayload.workspaceId, this._logger);
				}
			}

			await this.showConfirmation(response?.confirmation);
		}
	}

	/**
	 * Show a confirmation.
	 * @param confirmation The confirmation options.
	 * @param parentIdentity The identity of the parent window.
	 */
	private async showConfirmation(
		confirmation: ShareConfirmationOptions | undefined,
		parentIdentity?: OpenFin.Identity
	): Promise<void> {
		if (!isEmpty(confirmation) && this._helpers?.getShareClient) {
			this._logger?.info(confirmation);
			const shareClient = await this._helpers.getShareClient();
			if (shareClient) {
				const iconKey = confirmation.status === "error" ? "error" : "success";
				confirmation.iconUrl = this._definition?.data?.images[iconKey];
				if (this._helpers?.getThemeClient && !isEmpty(confirmation.iconUrl)) {
					const themeClient = await this._helpers.getThemeClient();
					confirmation.iconUrl = await themeClient.themeUrl(confirmation.iconUrl);
				}
				await shareClient.confirmation(
					confirmation,
					this._definition?.data?.confirmationMode,
					parentIdentity
				);
			}
		}
	}
}
