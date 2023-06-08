import type OpenFin from "@openfin/core";
import type {
	BrowserCreateWindowRequest,
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implement the actions.
 */
export class OpacityActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers?: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger?: Logger;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = loggerCreator("OpacityActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["change-opacity"] = async (payload: CustomActionPayload): Promise<void> => {
			if (this._helpers && payload.callerType === this._helpers.callerTypes.CustomButton) {
				this._logger?.info("Change Opacity Triggered");
				const browserWindow = platform.Browser.wrapSync(payload.windowIdentity as OpenFin.Identity);
				const options = await browserWindow.openfinWindow.getOptions();
				const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform
					.toolbarOptions;
				await browserWindow.openfinWindow.updateOptions({ opacity: 0.7 });
				if (!isEmpty(currentToolbarOptions)) {
					const newButtons = await this._helpers.updateToolbarButtons(
						currentToolbarOptions.buttons,
						payload.customData.sourceId as string,
						payload.customData.replacementId as string
					);
					await browserWindow.replaceToolbarOptions({ buttons: newButtons });
				}
			}
		};

		actionMap["restore-opacity"] = async (payload: CustomActionPayload): Promise<void> => {
			if (this._helpers && payload.callerType === this._helpers.callerTypes.CustomButton) {
				this._logger?.info("Restore Opacity Triggered");
				const browserWindow = platform.Browser.wrapSync(payload.windowIdentity as OpenFin.Identity);
				const options = await browserWindow.openfinWindow.getOptions();
				const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform
					.toolbarOptions;
				await browserWindow.openfinWindow.updateOptions({ opacity: 1 });

				if (!isEmpty(currentToolbarOptions)) {
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
