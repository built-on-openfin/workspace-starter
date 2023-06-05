import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Menus } from "workspace-platform-starter/shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { MenuEntry, MenuType } from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { AboutMenusSettings } from "./shapes";

/**
 * Implement the menus.
 */
export class AboutMenus implements Menus<AboutMenusSettings> {
	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * The helper methods to use.
	 */
	private _settings: AboutMenusSettings;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param createLogger For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<AboutMenusSettings>,
		createLogger: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = createLogger("DeveloperMenus");
		this._settings = definition.data;
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
					label: this._settings?.entries?.about?.label ?? "About",
					data: {
						type: "Custom",
						action: {
							id: "show-about"
						}
					},
					position: this._settings?.entries?.about?.position ?? {
						type: "Quit",
						operation: "before"
					},
					conditions: ["has-about"]
				}
			];
		}
	}
}
