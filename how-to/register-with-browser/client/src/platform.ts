import type OpenFin from "@openfin/core";
import {
	BrowserInitConfig,
	CustomButtonActionPayload,
	getCurrentSync,
	init as workspacePlatformInit,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import { addPageToWindow } from "./browser";
import { overrideCallback } from "./platform-override";
import { getSettings, validateThemes } from "./settings";

export async function init() {
	console.log("Initializing platform");
	const settings = await getSettings();
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = {
			icon: settings.browserProvider.windowOptions?.icon,
			workspacePlatform: {
				pages: null,
				title: settings.browserProvider.windowOptions?.title,
				favicon: settings.browserProvider.windowOptions?.icon,
				newTabUrl: settings.browserProvider.windowOptions?.newTabUrl,
				newPageUrl: settings.browserProvider.windowOptions?.newPageUrl
			}
		};
	}

	console.log("Specifying following browser options:", browser);
	await workspacePlatformInit({
		browser,
		theme: validateThemes(settings?.themeProvider?.themes),
		overrideCallback,
		customActions: {
			"custom-save-page-clicked": (payload: CustomButtonActionPayload) => {
				console.dir({ message: "CUSTOM SAVE PAGE CLICKED", payload });
				console.dir({ message: "LAYOUT", layout: payload.customData.layout });
			},
			"open-page": async (payload: CustomButtonActionPayload) => {
				const pageId: string = payload?.customData?.pageId;
				const targetWindowIdentity: OpenFin.Identity = payload?.customData?.windowIdentity;
				if (pageId !== undefined && targetWindowIdentity !== undefined) {
					await addPageToWindow(pageId, targetWindowIdentity);
				}
			},
			"lock-page-toggle": async (payload: CustomButtonActionPayload) => {
				const platform: WorkspacePlatformModule = getCurrentSync();

				const { uuid, name } = await platform.Browser.getLastFocusedWindow();
				const browserWindow = platform.Browser.wrapSync({ uuid, name });

				// Get the active page and toggle its locked state
				const allPages = await browserWindow.getPages();
				const activePage = allPages.find((pg) => pg.isActive);
				activePage.isLocked = !activePage.isLocked;
				await browserWindow.updatePage({
					pageId: activePage.pageId,
					page: activePage
				});
			}
		}
	});
}
