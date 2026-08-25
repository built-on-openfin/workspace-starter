import type OpenFin from "@openfin/core";
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
import { getCurrentColorSchemeMode, getCurrentIconFolder, themeUrl } from "./themes";
import { isEmpty, isObject, isString, objectClone } from "./utils";

let configToolbarButtons: WorkspacePlatformToolbarButton[] | undefined;
let configButtonsRetrieved: boolean = false;

/**
 * Get the toolbar buttons to show on a browser window.
 * @param windowCreateOptions The options the window will be created with.
 * @returns The list of buttons to show.
 */
export async function getToolbarButtons(
	windowCreateOptions?: OpenFin.PlatformWindowCreationOptions
): Promise<ToolbarButton[] | undefined> {
	let toolbarButtons: ToolbarButton[] | undefined;

	const allToolbarButtons = await getConfigToolbarButtons();

	if (!isEmpty(allToolbarButtons)) {
		const iconFolder = await getCurrentIconFolder();
		const colorSchemeMode = await getCurrentColorSchemeMode();

		const platform = getCurrentSync();

		toolbarButtons = [];
		for (const entry of allToolbarButtons) {
			if (
				entry.include &&
				(await checkConditions(platform, entry.conditions, {
					callerType: "browser",
					customData: windowCreateOptions
				}))
			) {
				toolbarButtons.push(themeButton(entry.button, iconFolder, colorSchemeMode));
			}
		}
	}

	return toolbarButtons;
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
		if (entry.type === BrowserButtonType.Custom && entry.action.customData.sourceId === buttonId) {
			return true;
		}
		return false;
	});

	if (index !== -1) {
		const availableToolbarButtons = await getConfigToolbarButtons();
		if (!isEmpty(availableToolbarButtons)) {
			const replacement = availableToolbarButtons.find((entry) => {
				if (entry.button.type === BrowserButtonType.Custom) {
					const customButton = entry.button;
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
		const createRequest: BrowserCreateWindowRequest = options as BrowserCreateWindowRequest;
		if (createRequest.workspacePlatform.windowType !== "platform") {
			const currentToolbarButtons = createRequest.workspacePlatform.toolbarOptions?.buttons;

			if (Array.isArray(currentToolbarButtons)) {
				const updatedButtons = [];
				const iconFolder = await getCurrentIconFolder();
				const colorSchemeMode = await getCurrentColorSchemeMode();

				for (const button of currentToolbarButtons) {
					if (button.type === BrowserButtonType.Custom) {
						const buttonId = button.action?.id;
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
}

/**
 * Get the list of buttons as they are defined in the configuration.
 * @returns The list of configuration buttons.
 */
async function getConfigToolbarButtons(): Promise<WorkspacePlatformToolbarButton[] | undefined> {
	if (configButtonsRetrieved) {
		return configToolbarButtons;
	}

	const settings = await getSettings();
	configToolbarButtons = settings?.browserProvider?.toolbarButtons;
	configButtonsRetrieved = true;

	subscribeLifecycleEvent("theme-changed", async () => {
		// Update all the browser windows with the new buttons.
		const platform = getCurrentSync();
		const browserWindows = await platform.Browser.getAllWindows();
		await Promise.all(
			browserWindows.map(async (browserWindow) => updateBrowserWindowButtonsColorScheme(browserWindow))
		);
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
	button: ToolbarButton,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): ToolbarButton {
	// We need to duplicate the button, as we don't want to lose
	// any placeholders in the iconUrl properties
	const buttonCopy = objectClone(
		button as unknown as {
			[id: string]: string | { [id: string]: string | undefined } | undefined;
		}
	);

	const keys = Object.keys(buttonCopy);
	for (const key of keys) {
		// If the property ends with iconUrl then we need to theme it.
		// It could be a single string or an object with multiple states e.g. enabled/disabled.
		if (key.toLowerCase().endsWith("iconurl")) {
			const prop = buttonCopy[key];
			if (isString(prop)) {
				buttonCopy[key] = themeUrl(prop, iconFolder, colorSchemeMode);
			} else if (isObject(prop)) {
				for (const key2 of Object.keys(prop)) {
					prop[key2] = themeUrl(prop[key2], iconFolder, colorSchemeMode);
				}
			}
		}
	}

	return buttonCopy as unknown as ToolbarButton;
}
