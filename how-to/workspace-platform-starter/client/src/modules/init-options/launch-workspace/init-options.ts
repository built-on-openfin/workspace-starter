import type {
	ActionHandlerContext,
	InitOptionsHandler
} from "workspace-platform-starter/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import type { LaunchWorkspaceOptions, LaunchWorkspacePayload } from "./shapes";

/**
 * Init options launch handler.
 */
export class InitOptionsLaunchWorkspaceHandler
	implements InitOptionsHandler<LaunchWorkspaceOptions, LaunchWorkspacePayload>
{
	private _logger?: Logger;

	private _helpers?: ModuleHelpers;

	private _definition?: ModuleDefinition<LaunchWorkspaceOptions>;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<LaunchWorkspaceOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("InitOptionsLaunchWorkspaceHandler");
		this._helpers = helpers;
		this._definition = definition;
		this._logger.info("The handler has been loaded");
	}

	/**
	 * Handle the init options action.
	 * @param requestedAction The requested action.
	 * @param payload The payload for the action.
	 * @param context The context calling the action.
	 */
	public async action(
		requestedAction: string,
		payload: LaunchWorkspacePayload | undefined,
		context: ActionHandlerContext
	): Promise<void> {
		if (isEmpty(payload)) {
			this._logger?.warn(
				`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`
			);
			return;
		}
		try {
			if (requestedAction === "launch-workspace") {
				const workspaceId = payload?.workspaceId;
				this._logger?.info(`The following workspaceId was passed and requested to launch: ${workspaceId}`);

				if (!isStringValue(workspaceId)) {
					this._logger?.error(
						"The init handler received a workspaceId in the wrong format and is unable to launch it"
					);
					return;
				}

				if (isEmpty(this._helpers?.launchWorkspace)) {
					this._logger?.warn(
						`Unable to launch workspace with workspaceId: ${workspaceId} as a launchWorkspace function was not passed to this module via the module helpers.`
					);
					return;
				}

				this._logger?.info(`Requesting the launch of workspace with workspaceId: ${workspaceId}`);
				await this._helpers?.launchWorkspace(workspaceId, this._logger);
			}
		} catch (error) {
			this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
		}
	}
}
