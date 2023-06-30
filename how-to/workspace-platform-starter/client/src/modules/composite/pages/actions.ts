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

/**
 * Implement the actions.
 */
export class PageActions implements Actions {
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
		this._logger = loggerCreator("PageActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["page-open"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType !== CustomActionCallerType.API) {
				const pageId: string = payload?.customData?.pageId;
				const targetWindowIdentity: OpenFin.Identity = payload?.customData?.windowIdentity;
				if (!isEmpty(pageId)) {
					const page = await platform.Storage.getPage(pageId);

					if (!isEmpty(page)) {
						if (!isEmpty(targetWindowIdentity)) {
							this._logger?.info(
								`Adding page with id: ${pageId} to the current window with name: ${targetWindowIdentity.name}`
							);
							const targetWindow = platform.Browser.wrapSync(targetWindowIdentity);
							await targetWindow.addPage(page);
							await targetWindow.setActivePage(pageId);
						} else if (this._helpers?.launchPage) {
							this._logger?.info(
								`Adding page with id: ${pageId} to a new window as no window identity was provided (likely unable to add a page to the window)`
							);
							await this._helpers.launchPage(page);
						} else {
							this._logger?.error(
								"We are unable to launch a page as this module has not been passed the launchPage function."
							);
						}
					}
				}
			}
		};

		actionMap["page-show"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType !== CustomActionCallerType.API) {
				const pageId: string = payload?.customData?.pageId;
				const parentIdentity: OpenFin.Identity = payload?.customData?.windowIdentity;
				if (!isEmpty(pageId) && !isEmpty(parentIdentity)) {
					this._logger?.info(
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

		actionMap["page-delete"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType !== CustomActionCallerType.API) {
				const pageId: string = payload?.customData?.pageId;
				if (!isEmpty(pageId)) {
					this._logger?.info(`Deleting page with id: ${pageId}`);
					await platform.Storage.deletePage(pageId);
				}
			}
		};

		return actionMap;
	}
}
