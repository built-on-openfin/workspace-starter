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
import type { ToolbarButtonDefinition } from "./shapes/browser-shapes";
import type { ColorSchemeMode } from "./shapes/theme-shapes";
import { getCurrentColorSchemeMode, getCurrentIconFolder } from "./themes";

let configToolbarButtons: ToolbarButtonDefinition[];
let defaultToolbarButtons: ToolbarButton[];

async function getConfigToolbarButtons(): Promise<ToolbarButtonDefinition[]> {
	if (Array.isArray(configToolbarButtons)) {
		return configToolbarButtons;
	}
	const settings = await getSettings();
	configToolbarButtons = settings?.browserProvider?.toolbarButtons || [];

	subscribeLifecycleEvent("theme-changed", async () => {
		// Reset the default toolbar buttons as the icon might have changed
		defaultToolbarButtons = undefined;
		await getDefaultToolbarButtons();

		const platform = getCurrentSync();

		const browserWindows = await platform.Browser.getAllWindows();
		for (const browserWindow of browserWindows) {
			await updateBrowserWindowButtonsColorScheme(browserWindow);
		}
	});

	return configToolbarButtons;
}

export async function getDefaultToolbarButtons(): Promise<ToolbarButton[]> {
	if (Array.isArray(defaultToolbarButtons)) {
		return defaultToolbarButtons;
	}

	const defaultButtons: ToolbarButton[] = [];
	const availableToolbarButtons = await getConfigToolbarButtons();
	const platform = getCurrentSync();

	const iconFolder = await getCurrentIconFolder();
	const colorSchemeMode = await getCurrentColorSchemeMode();

	for (const entry of availableToolbarButtons) {
		if (entry.include && (await checkConditions(platform, entry.conditions))) {
			defaultButtons.push(themeButton(entry.button, iconFolder, colorSchemeMode));
		}
	}
	defaultToolbarButtons = defaultButtons;
	return defaultButtons;
}

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

export async function updateBrowserWindowButtonsColorScheme(
	browserWindow: BrowserWindowModule
): Promise<void> {
	const options = await browserWindow.openfinWindow.getOptions();
	const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;

	if (Array.isArray(currentToolbarOptions.buttons)) {
		const updatedButtons = [];
		const iconFolder = await getCurrentIconFolder();
		const colorSchemeMode = await getCurrentColorSchemeMode();

		for (const button of currentToolbarOptions.buttons) {
			if (button.type === BrowserButtonType.Custom) {
				const buttonId = (button as CustomBrowserButtonConfig).action?.id;
				if (buttonId) {
					// Find the original button from config so that we can use the original
					// iconUrl with any schema placeholders
					const configButton = configToolbarButtons.find(
						(b) => (b.button as CustomBrowserButtonConfig).action?.id === buttonId
					);
					if (configButton?.button.iconUrl) {
						button.iconUrl = themeUrl(configButton.button.iconUrl, iconFolder, colorSchemeMode);
					}
				}
			}
			updatedButtons.push(button);
		}

		await browserWindow.replaceToolbarOptions({ buttons: updatedButtons });
	}
}

function themeButton(
	button: ToolbarButton & { iconUrl?: string },
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): ToolbarButton & { iconUrl?: string } {
	// We need to duplicate the button, as we don't want to lose
	// any placeholders in the iconUrl
	const buttonCopy: ToolbarButton & { iconUrl?: string } = JSON.parse(JSON.stringify(button));

	buttonCopy.iconUrl = themeUrl(buttonCopy.iconUrl, iconFolder, colorSchemeMode);

	return buttonCopy;
}

function themeUrl(
	url: string | undefined,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): string | undefined {
	return url ? url.replace(/{theme}/g, iconFolder).replace(/{scheme}/g, colorSchemeMode) : undefined;
}
