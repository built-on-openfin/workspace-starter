import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap,
	type Page,
	type WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implementation for the dynamic menu actions provider.
 */
export class DynamicMenuProvider implements Actions {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

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
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("DynamicMenuProvider");
		this._definition = definition;
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["pages-menu"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton && this._helpers?.showPopupMenu) {
				const pages: Page[] = await platform.Storage.getPages();
				const result = await this._helpers.showPopupMenu(
					{ x: payload.x - 16, y: 36 },
					payload.windowIdentity,
					"There are no pages",
					pages
						.map((p) => ({
							label: p.title,
							data: p.pageId
						}))
						.sort((a, b) => a.label.localeCompare(b.label)),
					{
						style: "custom"
					}
				);

				if (isEmpty(result)) {
					this._logger?.info("Menu dismissed");
				} else if (this._helpers?.launchPage) {
					this._logger?.info("Menu clicked", result);
					await this._helpers.launchPage(result, undefined, this._logger);
				}
			}
		};

		return actionMap;
	}
}
