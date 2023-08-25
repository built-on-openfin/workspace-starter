import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap,
	type WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "../../../framework/utils";
import { getAllUserWindows } from "./helper";

/**
 * Implement the actions.
 */
export class WindowActions implements Actions {
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
		this._logger = loggerCreator("WindowActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["window-show-all"] = async (payload: CustomActionPayload): Promise<void> => {
			if (
				payload.callerType !== CustomActionCallerType.API &&
				payload.callerType !== CustomActionCallerType.SaveButtonContextMenu
			) {
				const userWindows = await getAllUserWindows();
				let windowInitiator: OpenFin.Window | undefined;
				for (const visibleWindow of userWindows) {
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

		actionMap["window-hide-all"] = async (payload: CustomActionPayload): Promise<void> => {
			const userWindows = await getAllUserWindows();
			for (const userWindow of userWindows) {
				await userWindow.minimize();
			}
		};

		actionMap["window-hide-others"] = async (payload: CustomActionPayload): Promise<void> => {
			if (
				payload.callerType !== CustomActionCallerType.API &&
				payload.callerType !== CustomActionCallerType.SaveButtonContextMenu
			) {
				const userWindows = await getAllUserWindows();
				for (const userWindow of userWindows) {
					if (userWindow.identity.name !== payload.windowIdentity.name) {
						await userWindow.minimize();
					}
				}
			}
		};

		return actionMap;
	}
}
