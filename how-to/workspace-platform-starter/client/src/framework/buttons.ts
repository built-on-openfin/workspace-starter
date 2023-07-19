import type { CustomButtonConfig } from "@openfin/workspace";
import {
	BrowserButtonType,
	getCurrentSync,
	type BrowserCreateWindowRequest,
	type BrowserWindowModule,
	type CustomBrowserButtonConfig,
	type ToolbarButton
} from "@openfin/workspace-platform";
import { checkConditions } from "./conditions";
import { subscribeLifecycleEvent } from "./lifecycle";
import { getSettings } from "./settings";
import type { WorkspacePlatformToolbarButton } from "./shapes/browser-shapes";
import type { ColorSchemeMode } from "./shapes/theme-shapes";
import { getCurrentColorSchemeMode, getCurrentIconFolder } from "./themes";
import { objectClone } from "./utils";

let configToolbarButtons: WorkspacePlatformToolbarButton[] | undefined;
let defaultToolbarButtons: ToolbarButton[] | undefined;

/**
 * Get the default toolbar buttons to show on a browser window.
 * @returns The list of buttons to show.
 */
export async function getDefaultToolbarButtons(): Promise<ToolbarButton[]> {
	// If we have already calculated the buttons just return them
	if (Array.isArray(defaultToolbarButtons)) {
		return defaultToolbarButtons;
	}

	const allToolbarButtons = await getConfigToolbarButtons();

	const iconFolder = await getCurrentIconFolder();
	const colorSchemeMode = await getCurrentColorSchemeMode();

	const platform = getCurrentSync();

	defaultToolbarButtons = [];
	for (const entry of allToolbarButtons) {
		if (entry.include && (await checkConditions(platform, entry.conditions))) {
			defaultToolbarButtons.push(themeButton(entry.button, iconFolder, colorSchemeMode));
		}
	}

	return defaultToolbarButtons;
}

/**
 * Update the toolbar buttons, replacing one of the items.
 * @param buttons The current toolbar buttons.
 * @param buttonId The button id to replace.
 * @param replacementButtonId The id of the button to replace it with.
 * @returns The updated buttons.
 */
export async function updateToolbarButtons(
	buttons: ToolbarButton[],
	buttonId: string,
	replacementButtonId: string
): Promise<ToolbarButton[]> {
	const index = buttons.findIndex((entry) => {
		if (
			entry.type === BrowserButtonType.Custom &&
			(entry as CustomBrowserButtonConfig).action.customData.sourceId === buttonId
		) {
			return true;
		}
		return false;
	});

	if (index !== -1) {
		const availableToolbarButtons = await getConfigToolbarButtons();
		const replacement = availableToolbarButtons.find((entry) => {
			if (entry.button.type === BrowserButtonType.Custom) {
				const customButton = entry.button as CustomBrowserButtonConfig;
				return customButton?.action?.customData?.sourceId === replacementButtonId;
			}
			return false;
		});
		if (replacement) {
			const iconFolder = await getCurrentIconFolder();
			const colorSchemeMode = await getCurrentColorSchemeMode();
			buttons[index] = themeButton(replacement.button, iconFolder, colorSchemeMode);
		}
		return buttons;
	}

	return buttons;
}

/**
 * Update all the toolbar buttons based on the current color scheme.
 * @param browserWindow The browser window to update the buttons for.
 */
export async function updateBrowserWindowButtonsColorScheme(
	browserWindow: BrowserWindowModule
): Promise<void> {
	if (configToolbarButtons) {
		const options = await browserWindow.openfinWindow.getOptions();
		const currentToolbarButtons = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions
			?.buttons;

		if (Array.isArray(currentToolbarButtons)) {
			const updatedButtons = [];
			const iconFolder = await getCurrentIconFolder();
			const colorSchemeMode = await getCurrentColorSchemeMode();

			for (const button of currentToolbarButtons) {
				if (button.type === BrowserButtonType.Custom) {
					const buttonId = (button as CustomBrowserButtonConfig).action?.id;
					if (buttonId) {
						// Find the original button from config so that we can use the original
						// iconUrl with any schema placeholders
						const originalButton = configToolbarButtons.find(
							(b) => (b.button as CustomBrowserButtonConfig).action?.id === buttonId
						);
						const btn = originalButton?.button as CustomButtonConfig;
						if (btn?.iconUrl) {
							button.iconUrl = themeUrl(btn.iconUrl, iconFolder, colorSchemeMode);
						}
					}
				}
				updatedButtons.push(button);
			}

			await browserWindow.replaceToolbarOptions({ buttons: updatedButtons });
		}
	}
}

/**
 * Get the list of buttons as they are defined in the configuration.
 * @returns The list of configuration buttons.
 */
async function getConfigToolbarButtons(): Promise<WorkspacePlatformToolbarButton[]> {
	if (Array.isArray(configToolbarButtons)) {
		return configToolbarButtons;
	}
	const settings = await getSettings();
	configToolbarButtons = settings?.browserProvider?.toolbarButtons ?? [];

	subscribeLifecycleEvent("theme-changed", async () => {
		// Reset the default toolbar buttons as the icon might have changed
		defaultToolbarButtons = undefined;

		// Get the toolbar buttons again with the new theme
		await getDefaultToolbarButtons();

		// Update all the browser windows with the new buttons.
		const platform = getCurrentSync();
		const browserWindows = await platform.Browser.getAllWindows();
		for (const browserWindow of browserWindows) {
			await updateBrowserWindowButtonsColorScheme(browserWindow);
		}
	});

	return configToolbarButtons;
}

/**
 * Apply a theme to a button.
 * @param button The button to apply the theme to.
 * @param iconFolder The folder where the icons are located.
 * @param colorSchemeMode The color scheme for the theme.
 * @returns The themed button.
 */
function themeButton(
	button: ToolbarButton & { iconUrl?: string },
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): ToolbarButton & { iconUrl?: string } {
	// We need to duplicate the button, as we don't want to lose
	// any placeholders in the iconUrl
	const buttonCopy: ToolbarButton & { iconUrl?: string } = objectClone(button);

	buttonCopy.iconUrl = themeUrl(buttonCopy.iconUrl, iconFolder, colorSchemeMode);

	return buttonCopy;
}

/**
 * Apply a theme to a url.
 * @param url The url to apply the theme to.
 * @param iconFolder The folder where the icons are located.
 * @param colorSchemeMode The color scheme for the theme.
 * @returns The themed url.
 */
function themeUrl(
	url: string | undefined,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): string | undefined {
	return url ? url.replace(/{theme}/g, iconFolder).replace(/{scheme}/g, colorSchemeMode) : undefined;
}
