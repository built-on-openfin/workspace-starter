import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { MenuEntry, MenuType, Menus } from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";

/**
 * Implement the menus.
 */
export class DeveloperMenus implements Menus {
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
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("DeveloperMenus");
	}

	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 * @returns The menu entries.
	 */
	public async get(menuType: MenuType, platform: WorkspacePlatformModule): Promise<MenuEntry[] | undefined> {
		if (menuType === "global") {
			return [
				{
					include: true,
					label: "Inspect Window",
					data: {
						type: "Custom",
						action: {
							id: "developer-inspect"
						}
					},
					position: {
						operation: "after",
						type: "Custom",
						customId: "notification-toggle"
					},
					separator: "before"
				},
				{
					include: true,
					label: "Inspect Platform",
					data: {
						type: "Custom",
						action: {
							id: "developer-inspect",
							customData: { target: "platform" }
						}
					},
					position: {
						operation: "after",
						type: "Custom",
						customId: "developer-inspect"
					}
				}
			];
		} else if (menuType === "page") {
			return [
				{
					include: true,
					label: "Inspect Window",
					data: {
						type: "Custom",
						action: {
							id: "developer-inspect"
						}
					},
					position: {
						operation: "before",
						type: "Close"
					},
					separator: "after"
				}
			];
		} else if (menuType === "view") {
			return [
				{
					include: true,
					label: "Inspect View",
					data: {
						type: "Custom",
						action: {
							id: "developer-inspect"
						}
					},
					position: {
						operation: "before",
						type: "CloseTab"
					},
					separator: "before"
				},
				{
					include: true,
					label: "Create App Definition",
					data: {
						type: "Custom",
						action: {
							id: "raise-create-app-definition-intent"
						}
					},
					position: {
						operation: "after",
						type: "Custom",
						customId: "developer-inspect"
					}
				},
				{
					include: true,
					label: "Copy Url",
					data: {
						type: "Custom",
						action: {
							id: "copy-url"
						}
					},
					position: {
						operation: "after",
						type: "Custom",
						customId: "raise-create-app-definition-intent"
					},
					separator: "after"
				}
			];
		}
	}
}
