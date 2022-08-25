import type {
	BrowserCreateWindowRequest,
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "../../../actions-shapes";
import type { Logger, LoggerCreator } from "../../../logger-shapes";

/**
 * Implement the actions.
 */
export class OpacityActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * Initialize the actions passing any helper methods.
	 * @param helper Helper methods.
	 */
	public async initialize(helpers: ActionHelpers, loggerCreator: LoggerCreator): Promise<void> {
		this._helpers = helpers;
		this._logger = loggerCreator("OpacityActions");
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["change-opacity"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === this._helpers.callerTypes.CustomButton) {
				this._logger.info("Change Opacity Triggered");
				const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
				const options = await browserWindow.openfinWindow.getOptions();
				const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform
					.toolbarOptions;
				await browserWindow.openfinWindow.updateOptions({ opacity: 0.7 });
				if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
					const newButtons = await this._helpers.updateToolbarButtons(
						currentToolbarOptions.buttons,
						payload.customData.sourceId as string,
						payload.customData.replacementId as string
					);
					await browserWindow.replaceToolbarOptions({ buttons: newButtons });
				}
			}
		};

		actionMap["restore-opacity"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === this._helpers.callerTypes.CustomButton) {
				this._logger.info("Restore Opacity Triggered");
				const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
				const options = await browserWindow.openfinWindow.getOptions();
				const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform
					.toolbarOptions;
				await browserWindow.openfinWindow.updateOptions({ opacity: 1 });

				if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
					const newButtons = await this._helpers.updateToolbarButtons(
						currentToolbarOptions.buttons,
						payload.customData.sourceId as string,
						payload.customData.replacementId as string
					);
					await browserWindow.replaceToolbarOptions({ buttons: newButtons });
				}
			}
		};

		return actionMap;
	}
}
