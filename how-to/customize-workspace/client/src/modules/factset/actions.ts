import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "../../actions-shapes";
import type { Logger, LoggerCreator } from "../../logger-shapes";
import type { ModuleDefinition } from "../../module-shapes";
import { CUSTOM_HOME_NAME, FactSetActionsOptions } from "./shapes";

/**
 * Implement the actions.
 */
export class FactSetActions implements Actions<FactSetActionsOptions> {
	/**
	 * The helper methods to use.
	 */
	private _helpers: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * The settings for the action.
	 */
	private _settings: FactSetActionsOptions;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<FactSetActionsOptions>,
		loggerCreator: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = loggerCreator("FactSetActions");
		this._helpers = helpers;
		this._settings = definition.data;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["home-reset"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
				const workspaces = await platform.Storage.getWorkspaces();
				const customHomeWorkspace = workspaces.find((ws) => ws.title.toLowerCase() === CUSTOM_HOME_NAME);
				if (customHomeWorkspace) {
					this._logger.info("Resetting custom home workspace");
					await platform.Storage.deleteWorkspace(customHomeWorkspace.workspaceId);
					await platform.applySnapshot(this._settings.homeSnapshot, { closeExistingWindows: true });
				}
				return true;
			}
		};

		return actionMap;
	}
}
