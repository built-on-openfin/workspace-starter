import {
	BrowserButtonType,
	CustomBrowserButtonConfig,
	getCurrentSync,
	ToolbarButton
} from "@openfin/workspace-platform";
import { checkConditions } from "./conditions";
import { getSettings } from "./settings";
import type { ToolbarButtonDefinition } from "./shapes/framework-shapes";
import { getCurrentTheme } from "./themes";

let allToolbarButtons: ToolbarButtonDefinition[];
let defaultToolbarButtons: ToolbarButton[];

async function getAvailableToolbarButtons(): Promise<ToolbarButtonDefinition[]> {
	if (Array.isArray(allToolbarButtons)) {
		return allToolbarButtons;
	}
	const settings = await getSettings();
	const theme = await getCurrentTheme();
	const platform = getCurrentSync();
	const availableToolbarButtons = settings?.browserProvider?.toolbarButtons || [];
	const validatedToolbarButtons: ToolbarButtonDefinition[] = [];

	for (const entry of availableToolbarButtons.filter((b) => b.include ?? true)) {
		if (
			entry.button.iconUrl !== undefined &&
			theme?.label !== undefined &&
			entry.themes !== undefined &&
			entry.themes[theme.label] !== undefined
		) {
			entry.button.iconUrl = entry.themes[theme.label];
		}
		if (await checkConditions(platform, entry.conditions)) {
			validatedToolbarButtons.push(entry);
		}
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

	for (const entry of availableToolbarButtons) {
		if (entry.include) {
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
