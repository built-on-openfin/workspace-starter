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
import { randomUUID } from "./uuid";

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
			},
			announce: async (payload: CustomButtonActionPayload) => {
				console.info("Announce called with payload:", payload);
				await showPopup(
					{ width: 400, height: 300 },
					payload.windowIdentity,
					"Announce",
					"Announce the application to anyone listening ?",
					[
						{
							id: "yes",
							label: "Yes",
							default: true
						},
						{
							id: "no",
							label: "No"
						}
					],
					false
				);
			},
			announce2: async (payload: CustomButtonActionPayload) => {
				console.info("Announce2 called with payload:", payload);
				await showPopup(
					{ width: 400, height: 300 },
					payload.windowIdentity,
					"Announce",
					"Announce the application to anyone listening ?",
					[
						{
							id: "yes",
							label: "Yes",
							default: true
						},
						{
							id: "no",
							label: "No"
						}
					],
					true
				);
			}
		}
	});
}

async function showPopup(
	dimensions: { width: number; height: number },
	parentIdentity: OpenFin.Identity,
	title: string,
	instructions: string,
	buttons: {
		id: string;
		label: string;
		default?: boolean;
	}[],
	useCreateWindow: boolean
): Promise<string | undefined> {
	console.log("Parent Identity", parentIdentity);

	const browserWindow = fin.Window.wrapSync(parentIdentity);
	const parentBounds = await browserWindow.getBounds();

	console.log("Parent Bounds", parentBounds);

	const halfParentWidth = parentBounds.width / 2;
	const halfParentHeight = parentBounds.height / 2;
	const halfWidth = dimensions.width / 2;
	const halfHeight = dimensions.height / 2;

	const parentCenter = {
		x: parentBounds.left + halfParentWidth,
		y: parentBounds.top + halfParentHeight
	};

	if (useCreateWindow) {
		await fin.Window.create({
			name: randomUUID(),
			modalParentIdentity: parentIdentity,
			customData: {
				title,
				instructions,
				buttons
			},
			url: `${window.location.origin}/html/popup.html`,
			defaultLeft: parentCenter.x - halfWidth,
			defaultTop: parentCenter.y - halfHeight,
			defaultWidth: dimensions.width,
			defaultHeight: dimensions.height,
			frame: false,
			autoShow: true
		});
	} else {
		const result = await browserWindow.showPopupWindow({
			name: randomUUID(),
			initialOptions: {
				modalParentIdentity: parentIdentity
			},
			additionalOptions: {
				customData: {
					title,
					instructions,
					buttons
				}
			},
			url: `${window.location.origin}/html/popup.html`,
			x: parentCenter.x - halfWidth,
			y: parentCenter.y - halfHeight,
			width: dimensions.width,
			height: dimensions.height
		});

		if (result.result === "dismissed") {
			console.log("Popup dismissed");
		} else if (result.result === "clicked") {
			console.log("Popup clicked", result.data);
			return result.data as string;
		}
	}
}
