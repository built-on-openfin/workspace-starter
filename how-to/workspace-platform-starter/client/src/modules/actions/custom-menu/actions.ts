import type {
	CustomActionPayload,
	CustomActionsMap,
	Page,
	Workspace,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import { CustomActionCallerType, type Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { CustomMenuProviderSettings } from "./shapes";

/**
 * Implementation for the custom menu actions provider.
 */
export class CustomMenuProvider implements Actions<CustomMenuProviderSettings> {
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
	 * The settings for the menu.
	 * @internal
	 */
	private _settings: CustomMenuProviderSettings | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<CustomMenuProviderSettings>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("CustomMenuProvider");
		this._settings = definition.data;
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
			if (payload.callerType === CustomActionCallerType.CustomButton && this._helpers) {
				const pages: Page[] = await platform.Storage.getPages();
				const menuClient = await this._helpers.getMenuClient();
				const result = await menuClient.showPopupMenu(
					{ x: payload.x, y: 48 },
					payload.windowIdentity,
					"There are no pages",
					pages
						.map((p) => ({
							label: p.title,
							data: p.pageId,
							icon: this._settings?.images.page
						}))
						.sort((a, b) => a.label.localeCompare(b.label)),
					{
						popupMenuStyle: this._settings?.popupMenuStyle ?? menuClient.getPopupMenuStyle()
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

		actionMap["workspaces-menu"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton && this._helpers) {
				const workspaces: Workspace[] = await platform.Storage.getWorkspaces();
				const menuClient = await this._helpers.getMenuClient();
				const popupMenuStyle = this._settings?.popupMenuStyle ?? menuClient.getPopupMenuStyle();

				const result = await menuClient.showPopupMenu(
					{ x: payload.x, y: 48 },
					payload.windowIdentity,
					"There are no workspaces",
					workspaces
						.map((p) => ({
							label: p.title,
							data: p.workspaceId,
							icon: this._settings?.images.workspace
						}))
						.sort((a, b) => a.label.localeCompare(b.label)),
					{
						popupMenuStyle
					}
				);

				if (isEmpty(result)) {
					this._logger?.info("Menu dismissed");
				} else if (this._helpers?.launchWorkspace) {
					this._logger?.info("Menu clicked", result);
					await this._helpers.launchWorkspace(result, this._logger);
				}
			}
		};

		return actionMap;
	}
}
