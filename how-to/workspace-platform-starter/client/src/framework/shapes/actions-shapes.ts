import type { CustomActionsMap, ToolbarButton, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

/**
 * Definition for an action.
 */
export interface Actions<O = unknown> extends ModuleImplementation<O, ActionHelpers> {
	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	get(platform: WorkspacePlatformModule): Promise<CustomActionsMap>;
}

/**
 * A list of modules that provide actions that can be used by the platform.
 */
export type ActionsProviderOptions = ModuleList;

/**
 * Extended helpers used by action modules.
 */
export interface ActionHelpers extends ModuleHelpers {
	/**
	 * Update toolbar buttons.
	 * @param buttons The list of all buttons.
	 * @param buttonId The button to update.
	 * @param replacementButtonId The replacement for the button.
	 * @returns The updated buttons.
	 */
	updateToolbarButtons: (
		buttons: ToolbarButton[],
		buttonId: string,
		replacementButtonId: string
	) => Promise<ToolbarButton[]>;
}

/**
 * Use this in preference to CustomActionCallerType from workspace-platform to avoid the import of the whole of workspace package in modules.
 */
export enum CustomActionCallerType {
	CustomButton = "CustomButton",
	StoreCustomButton = "StoreCustomButton",
	CustomDropdownItem = "CustomDropdownItem",
	GlobalContextMenu = "GlobalContextMenu",
	ViewTabContextMenu = "ViewTabContextMenu",
	PageTabContextMenu = "PageTabContextMenu",
	SaveButtonContextMenu = "SaveButtonContextMenu",
	API = "API"
}
