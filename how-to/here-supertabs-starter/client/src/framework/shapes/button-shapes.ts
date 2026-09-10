import type { OpenFin } from "@openfin/core";
import type { BrowserWindowModule, ToolbarButton } from "@openfin/workspace-platform";

/**
 * A button client to be used by platform overrides if needed.
 */
export interface ButtonClient {
	/**
	 * Get the toolbar buttons to show on a browser window.
	 * @param windowCreateOptions The options the window will be created with.
	 * @returns The list of buttons to show.
	 */
	getToolbarButtons(
		windowCreateOptions?: OpenFin.PlatformWindowCreationOptions
	): Promise<ToolbarButton[] | undefined>;

	/**
	 * Update the toolbar buttons, replacing one of the items.
	 * @param buttons The current toolbar buttons.
	 * @param buttonId The button id to replace.
	 * @param replacementButtonId The id of the button to replace it with.
	 * @returns The updated buttons.
	 */
	updateToolbarButtons(
		buttons: ToolbarButton[],
		buttonId: string,
		replacementButtonId: string
	): Promise<ToolbarButton[]>;

	/**
	 * Update all the toolbar buttons based on the current color scheme.
	 * @param browserWindow The browser window to update the buttons for.
	 * @returns nothing
	 */
	updateBrowserWindowButtonsColorScheme(browserWindow: BrowserWindowModule): Promise<void>;
}
