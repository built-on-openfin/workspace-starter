import type { InitOptionsHandler } from "workspace-platform-starter/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import type { LaunchPageOptions, LaunchPagePayload } from "./shapes";

/**
 * Init options launch handler.
 */
export class InitOptionsLaunchPageHandler implements InitOptionsHandler<LaunchPageOptions> {
	private _logger?: Logger;

	private _helpers?: ModuleHelpers;

	private _definition?: ModuleDefinition<LaunchPageOptions>;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<LaunchPageOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("InitOptionsLaunchPageHandler");
		this._helpers = helpers;
		this._definition = definition;
		this._logger.info("The handler has been loaded");
	}

	/**
	 * Handle the init options action.
	 * @param requestedAction The requested action.
	 * @param payload The payload for the action.
	 */
	public async action(requestedAction: string, payload?: LaunchPagePayload): Promise<void> {
		if (isEmpty(payload)) {
			this._logger?.warn(
				`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`
			);
			return;
		}
		try {
			if (requestedAction === "launch-page") {
				const pageId = payload?.pageId;
				this._logger?.info(`The following pageId was passed and requested to launch: ${pageId}`);

				if (!isStringValue(pageId)) {
					this._logger?.error(
						"The init handler received an pageId in the wrong format and is unable to launch it"
					);
					return;
				}

				if (isEmpty(this._helpers?.launchPage) || isEmpty(this._helpers?.launchPage)) {
					this._logger?.warn(
						`Unable to launch page with pageId: ${pageId} as a launchPage function was not passed to this module via the module helpers.`
					);
					return;
				}

				const resultingWindow = await this._helpers?.launchPage(pageId);
				if (isEmpty(resultingWindow)) {
					this._logger?.error(`We have been unable to find and launch the provided pageId: ${pageId}`);
				}
			}
		} catch (error) {
			this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
		}
	}
}
