import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "customize-workspace/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";

/**
 * Implement the actions.
 */
export class DeveloperActions implements Actions {
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
	 * @param createLogger For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		createLogger: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = createLogger("DeveloperActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["developer-inspect"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const identity: OpenFin.Identity = payload.selectedViews[i];
					const view = fin.View.wrapSync(identity);
					await view.showDeveloperTools();
				}
			}
			if (payload.callerType === this._helpers.callerTypes.PageTabContextMenu) {
				const pageWindowIdentity: OpenFin.Identity = payload.windowIdentity;
				const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
				await pageWindow.showDeveloperTools();
			}
			if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
				const target = payload?.customData?.target === "platform" ? "platform" : "window";
				const targetIdentity: OpenFin.Identity =
					target === "window"
						? payload.windowIdentity
						: { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
				const targetWindow = fin.Window.wrapSync(targetIdentity);
				await targetWindow.showDeveloperTools();
			}
		};

		return actionMap;
	}
}
