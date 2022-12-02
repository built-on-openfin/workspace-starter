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
import type { ToolbarButtonDefinition } from "./shapes/framework-shapes";
import { getCurrentColorSchemeMode } from "./themes";

let allToolbarButtons: ToolbarButtonDefinition[];
let defaultToolbarButtons: ToolbarButton[];

async function getAvailableToolbarButtons(): Promise<ToolbarButtonDefinition[]> {
	if (Array.isArray(allToolbarButtons)) {
		return allToolbarButtons;
	}
	const settings = await getSettings();
	const currentColorScheme = await getCurrentColorSchemeMode();
	const availableToolbarButtons = settings?.browserProvider?.toolbarButtons || [];
	const validatedToolbarButtons: ToolbarButtonDefinition[] = [];

	for (const entry of availableToolbarButtons) {
		const entryCopy = { ...entry };
		if (entryCopy.themes?.[currentColorScheme]) {
			entryCopy.button.iconUrl = entryCopy.themes?.[currentColorScheme];
		}
		validatedToolbarButtons.push(entryCopy);
	}
	allToolbarButtons = validatedToolbarButtons;
	return validatedToolbarButtons;
}

export async function getDefaultToolbarButtons(): Promise<ToolbarButton[]> {
	if (Array.isArray(defaultToolbarButtons)) {
		return defaultToolbarButtons;
	}

	const defaultButtons: ToolbarButton[] = [];
	const availableToolbarButtons = await getAvailableToolbarButtons();
	const platform = getCurrentSync();

	for (const entry of availableToolbarButtons) {
		if (entry.include && (await checkConditions(platform, entry.conditions))) {
			defaultButtons.push(entry.button);
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
		const availableToolbarButtons = await getAvailableToolbarButtons();
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
					// Find the original button from config so that we can determine
					// if it has a themed version of the icon
					const configButton = allToolbarButtons.find(
						(b) => (b.button as CustomBrowserButtonConfig).action?.id === buttonId
					);
					if (configButton) {
						if (configButton.themes?.[colorSchemeMode]) {
							button.iconUrl = configButton.themes?.[colorSchemeMode];
						} else {
							button.iconUrl = configButton.button.iconUrl;
						}
					}
				}
			}
			updatedButtons.push(button);
		}

		await browserWindow.replaceToolbarOptions({ buttons: updatedButtons });
	}
}
