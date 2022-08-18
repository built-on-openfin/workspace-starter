import type {
	BrowserCreateWindowRequest,
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "../../../actions-shapes";

/**
 * Implement the actions.
 */
export class OpacityActions implements Actions {
	private _helpers: ActionHelpers;

	/**
	 * Initialize the actions passing any helper methods.
	 * @param helper Helper methods.
	 */
	public async initialize(helpers: ActionHelpers): Promise<void> {
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["change-opacity"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === "CustomButton") {
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
			if (payload.callerType === "CustomButton") {
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
