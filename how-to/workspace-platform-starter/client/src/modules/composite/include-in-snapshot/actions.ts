import type {
	BrowserCreateWindowRequest,
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

/**
 * Implementation for the include in snapshot actions provider.
 */
export class IncludeInSnapshotActionsProvider implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers?: ActionHelpers;

	/**
	 * The logger for displaying information from the module.
	 * @internal
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
		this._logger = loggerCreator("IncludeInSnapshotActionsProvider");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["include-in-snapshot"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				this._logger?.info("Including in snapshot", payload.windowIdentity);
				const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
				const options = await browserWindow.openfinWindow.getOptions();
				const createRequest: BrowserCreateWindowRequest = options as BrowserCreateWindowRequest;
				if (createRequest.workspacePlatform.windowType !== "platform") {
					const currentToolbarOptions = createRequest.workspacePlatform.toolbarOptions;
					await browserWindow.openfinWindow.updateOptions({ includeInSnapshots: true });
					if (!isEmpty(currentToolbarOptions) && this._helpers?.updateToolbarButtons) {
						const newButtons = await this._helpers.updateToolbarButtons(
							currentToolbarOptions.buttons,
							payload.customData.sourceId as string,
							payload.customData.replacementId as string
						);
						await browserWindow.replaceToolbarOptions({ buttons: newButtons });
					}
				}
			}
		};

		actionMap["remove-from-snapshot"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				this._logger?.info("Removing from snapshot", payload.windowIdentity);
				const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
				const options = await browserWindow.openfinWindow.getOptions();
				const createRequest: BrowserCreateWindowRequest = options as BrowserCreateWindowRequest;
				if (createRequest.workspacePlatform.windowType !== "platform") {
					const currentToolbarOptions = createRequest.workspacePlatform.toolbarOptions;
					await browserWindow.openfinWindow.updateOptions({ includeInSnapshots: false });
					if (!isEmpty(currentToolbarOptions) && this._helpers?.updateToolbarButtons) {
						const newButtons = await this._helpers.updateToolbarButtons(
							currentToolbarOptions.buttons,
							payload.customData.sourceId as string,
							payload.customData.replacementId as string
						);
						await browserWindow.replaceToolbarOptions({ buttons: newButtons });
					}
				}
			}
		};

		return actionMap;
	}
}
