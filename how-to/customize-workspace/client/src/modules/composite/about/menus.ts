import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Menus } from "customize-workspace/shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { MenuEntry, MenuType } from "customize-workspace/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";

/**
 * Implement the menus.
 */
export class AboutMenus implements Menus {
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
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = createLogger("DeveloperMenus");
	}

	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 */
	public async get(menuType: MenuType, platform: WorkspacePlatformModule): Promise<MenuEntry[] | undefined> {
		if (menuType === "global") {
			return [
				{
					include: true,
					label: "About",
					data: {
						type: "Custom",
						action: {
							id: "show-about"
						}
					},
					position: {
						type: "Quit",
						operation: "before"
					},
					conditions: ["has-about"]
				}
			];
		}
	}
}
