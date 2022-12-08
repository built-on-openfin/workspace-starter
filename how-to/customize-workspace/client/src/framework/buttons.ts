import {
	BrowserButtonType,
	BrowserCreateWindowRequest,
	BrowserWindowModule,
	CustomBrowserButtonConfig,
	getCurrentSync,
	ToolbarButton
} from "@openfin/workspace-platform";
import { checkConditions } from "./conditions";
import { getSettings } from "./settings";
import type { ToolbarButtonDefinition } from "./shapes/browser-shapes";
import { getCurrentColorSchemeMode } from "./themes";

let configToolbarButtons: ToolbarButtonDefinition[];
let defaultToolbarButtons: ToolbarButton[];

async function getConfigToolbarButtons(): Promise<ToolbarButtonDefinition[]> {
	if (Array.isArray(configToolbarButtons)) {
		return configToolbarButtons;
	}
	const settings = await getSettings();
	configToolbarButtons = settings?.browserProvider?.toolbarButtons || [];
	return configToolbarButtons;
}

export async function getDefaultToolbarButtons(): Promise<ToolbarButton[]> {
	if (Array.isArray(defaultToolbarButtons)) {
		return defaultToolbarButtons;
	}

	const defaultButtons: ToolbarButton[] = [];
	const availableToolbarButtons = await getConfigToolbarButtons();
	const platform = getCurrentSync();

	const colorSchemeMode = await getCurrentColorSchemeMode();

	for (const entry of availableToolbarButtons) {
		if (entry.include && (await checkConditions(platform, entry.conditions))) {
			// We need to duplicate the button, as we don't want to lose
			// any placeholders in the iconUrl
			const buttonCopy = JSON.parse(JSON.stringify(entry.button)) as ToolbarButton & { iconUrl?: string };

			if (buttonCopy.iconUrl) {
				buttonCopy.iconUrl = buttonCopy.iconUrl.replace(/{theme}/g, colorSchemeMode);
			}

			defaultButtons.push(buttonCopy);
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
		buttons[index] = replacement.button;
		return buttons;
	}

	return buttons;
}

export async function updateButtonColorScheme(): Promise<void> {
	const platform = getCurrentSync();

	const browserWindows = await platform.Browser.getAllWindows();

	for (const browserWindow of browserWindows) {
		await updateBrowserWindowButtonsColorScheme(browserWindow);
	}
}

export async function updateBrowserWindowButtonsColorScheme(
	browserWindow: BrowserWindowModule
): Promise<void> {
	const options = await browserWindow.openfinWindow.getOptions();
	const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;

	if (Array.isArray(currentToolbarOptions.buttons)) {
		const updatedButtons = [];
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
						button.iconUrl = configButton.button.iconUrl.replace(/{theme}/g, colorSchemeMode);
					}
				}
			}
			updatedButtons.push(button);
		}

		await browserWindow.replaceToolbarOptions({ buttons: updatedButtons });
	}
}
