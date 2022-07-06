import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { ChannelProvider } from "openfin-adapter";
import Transport from "openfin-adapter/src/transport/transport";
import { getActions } from "./actions";
import { getDefaultWindowOptions, overrideCallback } from "./browser";
import { PlatformInteropBroker } from "./interopbroker";
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

	console.log("Initialising platform");
	const browser: BrowserInitConfig = {};
	registerAvailableStorage();
	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();

		browser.interopOverride = async (
			InteropBroker,
			provider: Transport,
			options: ChannelProvider,
			...args: unknown[]
		) => new PlatformInteropBroker(provider, options, ...args);

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
