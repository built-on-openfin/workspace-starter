import type OpenFin from "@openfin/core";
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
import { isEmpty, randomUUID } from "workspace-platform-starter/utils";
import type { DynamicMenuProviderOptions } from "./shapes";

/**
 * Implementation for the dynamic menu actions provider.
 */
export class DynamicMenuProvider implements Actions<DynamicMenuProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<DynamicMenuProviderOptions> | undefined;

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
		definition: ModuleDefinition<DynamicMenuProviderOptions>,
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
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				const pages: Page[] = await platform.Storage.getPages();
				const res = await this.showCustomMenu(
					{ x: payload.x, y: payload.y },
					payload.windowIdentity,
					"There are no pages",
					pages
						.map((p) => ({
							label: p.title,
							id: p.pageId
						}))
						.sort((a, b) => a.label.localeCompare(b.label))
				);

				if (!isEmpty(res) && this._helpers?.launchPage) {
					const pageToLaunch = await platform.Storage.getPage(res);
					await this._helpers.launchPage(pageToLaunch, undefined, this._logger);
				}
			}
		};

		return actionMap;
	}

	/**
	 * Show a custom menu.
	 * @param position The position to show the menu.
	 * @param position.x The x position to show the menu.
	 * @param position.y The y position to show the menu.
	 * @param parentIdentity The identity of the parent window.
	 * @param noEntryText The text to display if there are no entries.
	 * @param menuEntries The menu entries to display.
	 * @returns The menu entry.
	 */
	private async showCustomMenu(
		position: { x: number; y: number },
		parentIdentity: OpenFin.Identity,
		noEntryText: string,
		menuEntries: { label: string; id: string; icon?: string }[]
	): Promise<string | undefined> {
		const dockWindow = fin.Window.wrapSync(parentIdentity);
		const dockBounds = await dockWindow.getBounds();

		const platformWindow = fin.Window.wrapSync(fin.me.identity);

		const menuPos = Math.floor((position.x + 20) / 40) * 40;

		const currentPalette = await this._helpers?.getCurrentPalette();

		const id = randomUUID();
		const result = await platformWindow.showPopupWindow({
			name: id,
			initialOptions: {
				showTaskbarIcon: false,
				backgroundColor: currentPalette?.backgroundPrimary,
				customData: {
					noEntryText,
					menuEntries,
					palette: {
						backgroundPrimary: currentPalette?.backgroundPrimary,
						textDefault: currentPalette?.textDefault,
						inputBackground: currentPalette?.inputBackground
					}
				}
			},
			url: this._definition?.data?.popupHtml,
			x: dockBounds.left + menuPos - 20,
			y: dockBounds.top + 34,
			width: 200,
			height: menuEntries.length * 32
		});

		if (result.result === "dismissed") {
			this._logger?.info("Menu dismissed");
		} else if (result.result === "clicked") {
			this._logger?.info("Menu clicked", result.data);
			return result.data as string;
		}
	}
}
