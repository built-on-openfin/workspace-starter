import type { CustomActionsMap, ToolbarButton, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { LoggerCreator } from "./logger-shapes";

export interface ActionHelpers {
	updateToolbarButtons: (
		buttons: ToolbarButton[],
		buttonId: string,
		replacementButtonId: string
	) => Promise<ToolbarButton[]>;
}

export interface Actions {
	/**
	 * Initialize the actions passing any helper methods.
	 * @param helper Helper methods.
	 * @param loggerCreator Method for creating loggers.
	 */
	initialize?(helpers: ActionHelpers, loggerCreator: LoggerCreator): Promise<void>;

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 */
	get(platform: WorkspacePlatformModule): Promise<CustomActionsMap>;
}

export interface ModuleDefinition {
	/**
	 * The id of the module.
	 */
	id: string;

	/**
	 * The url to load the module from.
	 */
	url: string;

	/**
	 * Is the integration enabled.
	 */
	enabled: boolean;

	/**
	 * Custom data for the module.
	 */
	data?: unknown;
}

export interface ActionsModule {
	/**
	 * The actions implementation in the module.
	 */
	actions: Actions;
}

export interface ActionsProviderOptions {
	/**
	 * The modules to load for the actions.
	 */
	modules?: ModuleDefinition[];
}
