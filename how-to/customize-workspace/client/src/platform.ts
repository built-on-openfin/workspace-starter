import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { getActions } from "./actions";
import { getDefaultWindowOptions, overrideCallback } from "./browser";
import { interopOverride } from "./interopbroker";
import { PlatformLocalStorage } from "./platform-local-storage";
import { PlatformStorage } from "./platform-storage";
import { DEFAULT_STORAGE_KEYS } from "./platform-storage-shapes";
import { getSettings, getThemes } from "./settings";

function registerAvailableStorage() {
	PlatformStorage.register(
		DEFAULT_STORAGE_KEYS.PageBounds,
		async (options) => new PlatformLocalStorage(DEFAULT_STORAGE_KEYS.PageBounds, "PageBounds")
	);
	PlatformStorage.register(
		DEFAULT_STORAGE_KEYS.Page,
		async (options) => new PlatformLocalStorage(DEFAULT_STORAGE_KEYS.Page, "Page")
	);
	PlatformStorage.register(
		DEFAULT_STORAGE_KEYS.Workspace,
		async (options) => new PlatformLocalStorage(DEFAULT_STORAGE_KEYS.Workspace, "Workspace")
	);
}

export async function init() {
	const settings = await getSettings();

	console.log("Initializing platform");
	const browser: BrowserInitConfig = {};
	if (settings?.platformProvider?.useCustomStorage) {
		registerAvailableStorage();
	}

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();

		browser.interopOverride = interopOverride;
		browser.overrideCallback = overrideCallback;
	}

	console.log("Specifying following browser options:", browser);

	const customActions = await getActions();
	const theme = await getThemes();

	await workspacePlatformInit({
		browser,
		theme,
		customActions
	});
}
