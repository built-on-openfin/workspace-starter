import { getCurrentSync, Page } from "@openfin/workspace-platform";
import { create, IndicatorColor, NotificationOptions } from "@openfin/workspace/notifications";
import { launchPage } from "./browser";
import { requestResponse } from "./endpoint";
import { registerListener, removeListener } from "./init-options";
import { createLogger } from "./logger-provider";
import { getSettings } from "./settings";
import { getWorkspace } from "./workspace";

const logger = createLogger("Share");

export let isShareEnabled = false;
let shareRegistered = false;
let initOptionsListenerId: string;

export interface IShareCustomData {
	workspaceId?: string;
	windowIdentity?: OpenFin.Identity;
	pageId?: string;
	page?: Page;
	bounds?: OpenFin.Bounds;
}

type IShareEntry = IShareEntryPage | IShareEntryWorkspace | IShareEntryUnknown;

interface IShareEntryPage {
	type: "page";
	data: { page: Page; bounds: OpenFin.Bounds };
}

interface IShareEntryWorkspace {
	type: "workspace";
	data: { snapshot: string };
}

interface IShareEntryUnknown {
	type: "other";
}

async function notifyOfSuccessfulLoad() {
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
		icon: settings.browserProvider.windowOptions.icon,
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

async function notifyOfSuccess(url: string, expiryInHours: number) {
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
		icon: settings.browserProvider.windowOptions.icon,
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

async function notifyOfFailure(body: string) {
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
		icon: settings.browserProvider.windowOptions.icon,
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

async function notifyOfExpiry() {
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
		icon: settings.browserProvider.windowOptions.icon,
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

async function saveSharedPage(data: IShareCustomData) {
	let page: Page;
	let bounds: OpenFin.Bounds;
	if (data.page !== undefined && data.bounds !== undefined) {
		page = data.page;
		bounds = data.bounds;
	} else {
		const platform = getCurrentSync();
		const targetWindow = platform.Browser.wrapSync(data.windowIdentity);
		page = await targetWindow.getPage(data.pageId);
		bounds = await targetWindow.openfinWindow.getBounds();
	}
	const payload = {
		type: "page",
		data: {
			page,
			bounds
		}
	};
	await saveShareRequest(payload);
}

async function saveSharedWorkspace(workspaceId?: string) {
	let snapshot = null;

	if (workspaceId === undefined) {
		const platform = getCurrentSync();
		snapshot = await platform.getSnapshot();
	} else {
		const savedWorkspace = await getWorkspace(workspaceId);
		if (savedWorkspace !== null) {
			snapshot = savedWorkspace.snapshot;
		}
	}

	if (snapshot === null || snapshot === undefined) {
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

async function saveShareRequest(payload) {
	try {
		const expiryInHours = 24;
		const response = await requestResponse<unknown, { url: string; id?: string }>("share-save", payload);
		let id = response.id;
		if (id === undefined) {
			const indexOfId = response.url.lastIndexOf("/");
			if (indexOfId !== -1) {
				id = response.url.slice(indexOfId + 1);
			}
		}

		if (id === undefined) {
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
	} catch (error) {
		logger.error("Error saving share request:", error);
		await notifyOfFailure("The share request you raised could not be generated.");
	}
}

async function loadSharedEntry(id: string) {
	try {
		const shareEntry = await requestResponse<{ id: string }, IShareEntry>("share-get", { id });
		if (shareEntry !== undefined && shareEntry !== null) {
			if (shareEntry.type === "page") {
				await launchPage(shareEntry.data.page, shareEntry.data.bounds);
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

export async function register(bootstrapEnabled: boolean) {
	isShareEnabled = bootstrapEnabled;

	if (isShareEnabled) {
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

export async function deregister() {
	if (isShareEnabled) {
		if (shareRegistered) {
			// any cleanup logic can go here
			removeListener(initOptionsListenerId);
		} else {
			logger.warn("Share isn't registered yet so cannot be deregistered.");
		}
	}
}

export async function showShareOptions(payload: { windowIdentity: OpenFin.Identity; x: number; y: number }) {
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
			await saveSharedPage(r.data.identity as IShareCustomData);
		} else if (r.data.type === "workspace") {
			await saveSharedWorkspace();
		}
	} else {
		logger.warn("Share cannot be triggered as it hasn't been registered yet.");
	}
}

export async function share(options?: IShareCustomData) {
	if (shareRegistered) {
		if (options === undefined || options.workspaceId !== undefined) {
			logger.info("A request to share the workspace has been raised.");
			await saveSharedWorkspace(options?.workspaceId);
		} else {
			logger.info("Share called with payload: =", options);
			await saveSharedPage(options);
		}
	} else {
		logger.warn("Share cannot be triggered as it hasn't been registered yet.");
	}
}