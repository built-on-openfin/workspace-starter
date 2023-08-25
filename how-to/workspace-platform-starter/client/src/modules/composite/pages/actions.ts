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

					if (this._helpers?.launchPage) {
						await this._helpers.launchPage(
							page,
							{
								targetWindowIdentity
							},
							this._logger
						);
					} else {
						this._logger?.error(
							"We are unable to launch a page as this module has not been passed the launchPage function."
						);
					}
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
