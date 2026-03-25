import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import {
	CustomActionCallerType,
	type ActionHelpers,
	type Actions
} from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import { DefaultWorkspaceStorage } from "./default-workspace-storage";
import type { DefaultWorkspacePayload, DefaultWorkspaceProviderOptions } from "./shapes";

/**
 * Implement the actions.
 */
export class DefaultWorkspaceActions implements Actions<DefaultWorkspaceProviderOptions> {
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * The means to get and set default workspaces
	 * @internal
	 * */
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
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = loggerCreator("DefaultWorkspaceAction");
		this._defaultWorkspaceStorage = new DefaultWorkspaceStorage();
		await this._defaultWorkspaceStorage.initialize(definition?.data, helpers, this._logger);
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["set-default-workspace"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
				try {
					if (!isEmpty(payload.customData) && !isEmpty(this._defaultWorkspaceStorage)) {
						const result = await this._defaultWorkspaceStorage.setDefaultWorkspace(
							payload.customData as DefaultWorkspacePayload
						);
						this._logger?.info(`The default workspace state has been updated: ${result}`, payload.customData);
					} else {
						this._logger?.warn(
							"An action for setting the default workspace was not passed a payload and cannot be processed."
						);
					}
				} catch {
					this._logger?.info("Cannot set the default workspace with the information provided.");
				}
			}
		};

		return actionMap;
	}
}
