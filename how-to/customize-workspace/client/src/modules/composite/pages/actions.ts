import type OpenFin from "@openfin/core";
import type {
	BrowserCreateWindowRequest,
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
export class PageActions implements Actions {
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
		this._logger = createLogger("PageActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["page-open"] = async (payload: CustomActionPayload) => {
			if (payload.callerType !== this._helpers.callerTypes.API) {
				const pageId: string = payload?.customData?.pageId;
				const targetWindowIdentity: OpenFin.Identity = payload?.customData?.windowIdentity;
				if (pageId !== undefined) {
					const page = await platform.Storage.getPage(pageId);

					if (page !== undefined && page !== null) {
						if (targetWindowIdentity !== undefined) {
							this._logger.info(
								`Adding page with id: ${pageId} to the current window with name: ${targetWindowIdentity.name}`
							);
							const targetWindow = platform.Browser.wrapSync(targetWindowIdentity);
							await targetWindow.addPage(page);
							await targetWindow.setActivePage(pageId);
						} else {
							this._logger.info(
								`Adding page with id: ${pageId} to the current a new window as no window identity was provided (likely unable to add a page to the window)`
							);
							const newWindow: BrowserCreateWindowRequest = {
								workspacePlatform: {
									pages: [page]
								}
							};
							await platform.Browser.createWindow(newWindow);
						}
					}
				}
			}
		};

		actionMap["page-show"] = async (payload: CustomActionPayload) => {
			if (payload.callerType !== this._helpers.callerTypes.API) {
				const pageId: string = payload?.customData?.pageId;
				const parentIdentity: OpenFin.Identity = payload?.customData?.windowIdentity;
				if (pageId !== undefined && parentIdentity !== undefined) {
					this._logger.info(
						`Showing page with id: ${pageId} by bringing window with name: ${parentIdentity.name} to the foreground.`
					);
					const pageWindow = platform.Browser.wrapSync(parentIdentity);
					const windowState = await pageWindow.openfinWindow.getState();
					if (windowState === "minimized") {
						await pageWindow.openfinWindow.restore();
					}
					await pageWindow.openfinWindow.setAsForeground();
					await pageWindow.setActivePage(pageId);
				}
			}
		};

		actionMap["page-delete"] = async (payload: CustomActionPayload) => {
			if (payload.callerType !== this._helpers.callerTypes.API) {
				const pageId: string = payload?.customData?.pageId;
				if (pageId !== undefined) {
					this._logger.info(`Deleting page with id: ${pageId}`);
					await platform.Storage.deletePage(pageId);
				}
			}
		};

		return actionMap;
	}
}
