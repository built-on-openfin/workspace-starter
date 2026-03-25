import type {
	ActionHandlerContext,
	InitOptionsHandler
} from "workspace-platform-starter/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import type { ShowPageOptions, ShowPagePayload } from "./shapes";

/**
 * Init options show page handler.
 */
export class InitOptionsShowPageHandler implements InitOptionsHandler<ShowPageOptions, ShowPagePayload> {
	private _logger?: Logger;

	private _helpers?: ModuleHelpers;

	private _definition?: ModuleDefinition<ShowPageOptions>;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ShowPageOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("InitOptionsShowPageHandler");
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
		payload: ShowPagePayload | undefined,
		context: ActionHandlerContext
	): Promise<void> {
		if (isEmpty(payload)) {
			this._logger?.warn(
				`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`
			);
			return;
		}
		try {
			if (requestedAction === "show-page") {
				const pageId = payload?.pageId;
				this._logger?.info(`The following pageId was passed and requested to show: ${pageId}`);

				if (!isStringValue(pageId)) {
					this._logger?.error(
						"The init handler received an pageId in the wrong format and is unable to show it"
					);
					return;
				}

				if (isEmpty(this._helpers?.launchPage)) {
					this._logger?.warn(
						`Unable to show page with pageId: ${pageId} as a launchPage function was not passed to this module via the module helpers.`
					);
					return;
				}

				const resultingWindow = await this._helpers?.launchPage(pageId);
				if (isEmpty(resultingWindow)) {
					this._logger?.error(`We have been unable to find and show the provided pageId: ${pageId}`);
				}
			}
		} catch (error) {
			this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
		}
	}
}
