import type OpenFin from "@openfin/core";
import { getCurrentSync, type Page } from "@openfin/workspace-platform";
import { create, IndicatorColor, type NotificationOptions } from "@openfin/workspace/notifications";
import { requestResponse } from "./endpoint";
import { registerListener, removeListener } from "./init-options";
import { createLogger } from "./logger-provider";
import { getPageBounds, launchPage } from "./platform/browser";
import { getSettings } from "./settings";
import type { ShareStoreEntry, SharePageData, ShareWorkspaceData } from "./shapes/share-shapes";
import { isEmpty } from "./utils";

const logger = createLogger("Share");

let shareEnabled = false;
let shareRegistered = false;
let initOptionsListenerId: string | undefined;

/**
 * Initialize the sharing.
 * @param options The options for sharing.
 */
export async function init(options: { enabled: boolean } | undefined): Promise<void> {
	if (options) {
		shareEnabled = options?.enabled;

		if (shareEnabled) {
			if (!shareRegistered) {
				shareRegistered = true;
				initOptionsListenerId = registerListener("shareId", async (initOptions) => {
					logger.info("Received share request.");
					if (typeof initOptions.shareId === "string") {
						await loadSharedEntry(initOptions.shareId);
					} else {
						logger.warn("shareId passed but it wasn't a string");
					}
				});
			} else {
				logger.warn("Share cannot be registered more than once.");
			}
		}
	}
}

/**
 * Closedown the share provider.
 */
export async function closedown(): Promise<void> {
	if (shareEnabled) {
		if (shareRegistered) {
			if (initOptionsListenerId) {
				removeListener(initOptionsListenerId);
			}
		} else {
			logger.warn("Share isn't registered yet so cannot be deregistered.");
		}
	}
}

/**
 * Is sharing enabled.
 * @returns True if sharing is enabled.
 */
export function isShareEnabled(): boolean {
	return shareEnabled;
}

/**
 * Show the share options menu.
 * @param payload The payload containing information to use for positioning.
 * @param payload.windowIdentity The window that initiated the menu request.
 * @param payload.x The x position of the mouse click.
 * @param payload.y The y position of the mouse click.
 */
export async function showShareOptions(payload: {
	windowIdentity: OpenFin.Identity;
	x: number;
	y: number;
}): Promise<void> {
	if (shareRegistered) {
		logger.info("Share called with payload:", payload);

		const windowIdentity = payload.windowIdentity;
		let pageId;

		const platformWorkspace = getCurrentSync();
		const currentWindow = platformWorkspace.Browser.wrapSync(windowIdentity);
		const currentPages = await currentWindow.getPages();

		for (const page of currentPages) {
			if (page.isActive) {
				pageId = page.pageId;
			}
		}

		const template: OpenFin.MenuItemTemplate[] = [
			{
				label: "Share Page",
				data: { identity: { windowIdentity, pageId }, type: "page" }
			},
			{ type: "separator", data: {} },
			{
				label: "Share Workspace",
				data: { identity: {}, type: "workspace" }
			}
		];

		const r = await currentWindow.openfinWindow.showPopupMenu({
			template,
			x: payload.x,
			y: payload.y
		});

		if (r.result === "closed") {
			logger.info("share menu dismissed.");
		} else if (r.data.type === "page") {
			await saveSharedPage(r.data.identity);
		} else if (r.data.type === "workspace") {
			await saveSharedWorkspace();
		}
	} else {
		logger.warn("Share cannot be triggered as it hasn't been registered yet.");
	}
}

/**
 * Share the specified data.
 * @param options The data to share.
 */
export async function share(options: SharePageData | ShareWorkspaceData): Promise<void> {
	if (shareRegistered) {
		if (options) {
			if (options.type === "workspace") {
				logger.info("A request to share the workspace has been raised.");
				await saveSharedWorkspace(options);
			} else if (options.type === "page") {
				logger.info("Share called with payload: =", options);
				await saveSharedPage(options);
			}
		} else {
			logger.warn("No options provided to share.");
		}
	} else {
		logger.warn("Share cannot be triggered as it hasn't been registered yet.");
	}
}

/**
 * Show a successful load notification.
 */
async function notifyOfSuccessfulLoad(): Promise<void> {
	const settings = await getSettings();

	const notification: NotificationOptions = {
		expires: new Date(Date.now() + 30000),
		body: "The share request has been fetched and applied.",
		buttons: [
			{
				submit: false,
				onClick: null,
				index: 3,
				iconUrl: "",
				cta: false,
				title: "Dismiss",
				type: "button"
			}
		],
		stream: {
			id: "share-requests",
			displayName: "Share Request",
			appId: fin.me.identity.uuid
		},
		priority: 1,
		icon:
			settings.browserProvider?.defaultWindowOptions?.icon ?? settings.browserProvider?.windowOptions?.icon,
		indicator: {
			color: IndicatorColor.GREEN,
			text: "Share Request Applied"
		},
		category: "share",
		title: "Share Request Applied",
		template: "markdown"
	};
	await create(notification);
}

/**
 * Show a success notification.
 * @param url The url to show in the notification body.
 * @param expiryInHours The expiry time for the notification.
 */
async function notifyOfSuccess(url: string, expiryInHours: number): Promise<void> {
	const settings = await getSettings();

	const notification: NotificationOptions = {
		expires: new Date(Date.now() + 30000),
		body: `The share request you raised has been copied to the **clipboard** and will be valid for ${expiryInHours} hours. \n Share Url: \n * **${url}**`,
		buttons: [
			{
				submit: false,
				onClick: null,
				index: 3,
				iconUrl: "",
				cta: false,
				title: "Dismiss",
				type: "button"
			}
		],
		stream: {
			id: "share-requests",
			displayName: "Share Request",
			appId: fin.me.identity.uuid
		},
		priority: 1,
		icon:
			settings.browserProvider?.defaultWindowOptions?.icon ?? settings.browserProvider?.windowOptions?.icon,
		indicator: {
			color: IndicatorColor.BLUE,
			text: "Share Request Raised"
		},
		category: "share",
		title: "Share Request Raised",
		template: "markdown"
	};
	await create(notification);
}

/**
 * Notify of failure.
 * @param body The message for the failure.
 */
async function notifyOfFailure(body: string): Promise<void> {
	const settings = await getSettings();

	const notification: NotificationOptions = {
		expires: new Date(Date.now() + 30000),
		body,
		buttons: [
			{
				submit: false,
				onClick: null,
				index: 3,
				iconUrl: "",
				cta: false,
				title: "Dismiss",
				type: "button"
			}
		],
		stream: {
			id: "share-requests",
			displayName: "Share Request",
			appId: fin.me.identity.uuid
		},
		priority: 1,
		icon:
			settings.browserProvider?.defaultWindowOptions?.icon ?? settings.browserProvider?.windowOptions?.icon,
		indicator: {
			color: IndicatorColor.RED,
			text: "Share Request Failed"
		},
		category: "share",
		title: "Share Request Failed",
		template: "markdown"
	};
	await create(notification);
}

/**
 * Notify that a share request has expired.
 */
async function notifyOfExpiry(): Promise<void> {
	const settings = await getSettings();

	const notification: NotificationOptions = {
		expires: new Date(Date.now() + 30000),
		body: "The share request has expired and is no longer available.",
		buttons: [
			{
				submit: false,
				onClick: null,
				index: 3,
				iconUrl: "",
				cta: false,
				title: "Dismiss",
				type: "button"
			}
		],
		stream: {
			id: "share-requests",
			displayName: "Share Request",
			appId: fin.me.identity.uuid
		},
		priority: 1,
		icon:
			settings.browserProvider?.defaultWindowOptions?.icon ?? settings.browserProvider?.windowOptions?.icon,
		indicator: {
			color: IndicatorColor.RED,
			text: "Share Request Expired"
		},
		category: "share",
		title: "Share Request Expired",
		template: "markdown"
	};
	await create(notification);
}

/**
 * Save a shared page.
 * @param data The data for the share.
 */
async function saveSharedPage(data: SharePageData): Promise<void> {
	let page: Page | undefined;
	if (!isEmpty(data.page)) {
		page = data.page;
	} else {
		const platform = getCurrentSync();
		let useStorage = true;
		try {
			if (data.windowIdentity) {
				const targetWindow = platform.Browser.wrapSync(data.windowIdentity);
				page = await targetWindow.getPage(data.pageId);
				if (isEmpty(page?.customData)) {
					page.customData = {};
				}
				page.customData.windowBounds = await targetWindow.openfinWindow.getBounds();
				useStorage = false;
			}
		} catch {}
		if (isEmpty(page) && !isEmpty(data.pageId)) {
			// we haven't got a passed page and we were not given a window identity but we do have a pageId
			// check to see if it is an active page to get the latest information
			const attachedPages = await platform.Browser.getAllAttachedPages();
			for (const attachedPage of attachedPages) {
				if (attachedPage.pageId === data.pageId) {
					page = { ...attachedPage };
					if (isEmpty(page.customData)) {
						page.customData = {};
					}
					page.customData.windowBounds = getPageBounds(data.pageId);
					useStorage = false;
					break;
				}
			}
		}
		if (useStorage) {
			page = await platform.Storage.getPage(data.pageId);
		}
	}
	const payload = {
		type: "page",
		data: {
			page
		}
	};
	await saveShareRequest(payload);
}

/**
 * Save a workspace.
 * @param data The data for the share.
 */
async function saveSharedWorkspace(data?: ShareWorkspaceData): Promise<void> {
	let snapshot = null;

	const workspaceId = data?.workspaceId;
	if (isEmpty(workspaceId)) {
		const platform = getCurrentSync();
		snapshot = await platform.getSnapshot();
	} else {
		const platform = getCurrentSync();
		const savedWorkspace = await platform.Storage.getWorkspace(workspaceId);
		if (!isEmpty(savedWorkspace)) {
			snapshot = savedWorkspace.snapshot;
		}
	}

	if (isEmpty(snapshot)) {
		await notifyOfFailure("Unable to action your workspace share request.");
	} else {
		const payload = {
			type: "workspace",
			data: {
				snapshot
			}
		};
		await saveShareRequest(payload);
	}
}

/**
 * Save the request.
 * @param payload The payload to save.
 */
async function saveShareRequest(payload: unknown): Promise<void> {
	try {
		const expiryInHours = 24;
		const response = await requestResponse<unknown, { url: string; id?: string }>("share-save", payload);

		if (response) {
			let id = response.id;
			if (isEmpty(id)) {
				const indexOfId = response.url.lastIndexOf("/");
				if (indexOfId !== -1) {
					id = response.url.slice(indexOfId + 1);
				}
			}

			if (isEmpty(id)) {
				await notifyOfFailure("The share request you raised could not be generated.");
				return;
			}

			const platform = getCurrentSync();
			const platformInfo = await platform.Application.getInfo();
			let finsLink: string;

			if (platformInfo.manifestUrl.startsWith("http")) {
				finsLink = `${platformInfo.manifestUrl.replace("http", "fin")}?$$shareId=${id}`;
			} else {
				logger.error(
					"We do not support file based manifest launches. The manifest has to be served over http/https:",
					platformInfo.manifestUrl
				);
				await notifyOfFailure("The share request you raised could not be generated.");
				return;
			}

			await fin.Clipboard.writeText({
				data: finsLink
			});
			await notifyOfSuccess(finsLink, expiryInHours);
		} else {
			await notifyOfFailure("The share request you raised could not be generated.");
		}
	} catch (error) {
		logger.error("Error saving share request:", error);
		await notifyOfFailure("The share request you raised could not be generated.");
	}
}

/**
 * Load a shared entry.
 * @param id The id of the entry to load.
 */
async function loadSharedEntry(id: string): Promise<void> {
	try {
		const shareEntry = await requestResponse<{ id: string }, ShareStoreEntry>("share-get", { id });
		if (!isEmpty(shareEntry)) {
			if (shareEntry.type === "page") {
				await launchPage(shareEntry.data.page, undefined, logger);
			} else if (shareEntry.type === "workspace") {
				const platform = getCurrentSync();
				await platform.applySnapshot(shareEntry.data.snapshot);
			} else {
				logger.warn(`Share entry of unknown type specified: ${shareEntry.type}`);
				await notifyOfFailure("The specified share link is not supported and cannot be loaded.");
				return;
			}
			await notifyOfSuccessfulLoad();
		} else {
			await notifyOfExpiry();
		}
	} catch (error) {
		logger.error("There has been an error trying to load and apply the share link.", error);
		await notifyOfFailure("The specified share link cannot be loaded.");
	}
}
