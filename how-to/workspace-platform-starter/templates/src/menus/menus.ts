import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type {
	MenuEntry,
	Menus,
	RelatedMenuId,
	MenuType
} from "workspace-platform-starter/shapes/menu-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleMenusProviderOptions } from "./shapes";

/**
 * Implementation for the example menus provider.
 */
export class ExampleMenusProvider implements Menus<ExampleMenusProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleMenusProviderOptions> | undefined;

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
		definition: ModuleDefinition<ExampleMenusProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleMenusProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get the menus from the module.
	 * @param menuType The type of menu to get the entries for.
	 * @param platform The current platform.
	 * @param relatedMenuId If available provide the related window identity the menu is showing on and page or view ids
	 * depending on the menu type.
	 * @returns Nothing.
	 */
	public async get(
		menuType: MenuType,
		platform: WorkspacePlatformModule,
		relatedMenuId?: RelatedMenuId
	): Promise<MenuEntry[] | undefined> {
		// TODO: Implement menus for the menu types
		if (menuType === "global") {
			return [
				{
					label: "Menu Menu",
					data: {
						type: "Custom",
						action: {
							id: "my-menu-action"
						}
					},
					position: {
						type: "Quit",
						operation: "before"
					}
				}
			];
		} else if (menuType === "page") {
			return [];
		} else if (menuType === "view") {
			return [];
		}
	}
}
