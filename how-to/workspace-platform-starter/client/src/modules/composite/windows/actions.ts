import type OpenFin from "@openfin/core";
import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { getAllVisibleWindows } from "./helper";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implement the actions.
 */
export class WindowActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

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
		this._logger = loggerCreator("WindowActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["window-show-all"] = async (payload: CustomActionPayload) => {
			if (
				payload.callerType !== this._helpers.callerTypes.API &&
				payload.callerType !== this._helpers.callerTypes.SaveButtonContextMenu
			) {
				const visibleWindows = await getAllVisibleWindows();
				let windowInitiator: OpenFin.Window;
				for (const visibleWindow of visibleWindows) {
					if (
						visibleWindow.identity.name === payload.windowIdentity.name &&
						visibleWindow.identity.uuid === payload.windowIdentity.uuid
					) {
						windowInitiator = visibleWindow;
					} else {
						const windowState = await visibleWindow.getState();
						if (windowState === "minimized") {
							await visibleWindow.restore();
						}
						await visibleWindow.bringToFront();
					}
				}
				if (!isEmpty(windowInitiator)) {
					await windowInitiator.setAsForeground();
				}
			}
		};

		actionMap["window-hide-all"] = async (payload: CustomActionPayload) => {
			const visibleWindows = await getAllVisibleWindows();
			for (const visibleWindow of visibleWindows) {
				await visibleWindow.minimize();
			}
		};

		actionMap["window-hide-others"] = async (payload: CustomActionPayload) => {
			if (
				payload.callerType !== this._helpers.callerTypes.API &&
				payload.callerType !== this._helpers.callerTypes.SaveButtonContextMenu
			) {
				const visibleWindows = await getAllVisibleWindows();
				for (const visibleWindow of visibleWindows) {
					if (visibleWindow.identity.name !== payload.windowIdentity.name) {
						await visibleWindow.minimize();
					}
				}
			}
		};

		return actionMap;
	}
}
