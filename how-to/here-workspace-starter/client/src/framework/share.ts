import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap,
	type CustomButtonActionPayload
} from "@openfin/workspace-platform";
import { IndicatorColor, create, type NotificationOptions } from "@openfin/workspace/notifications";
import { checkCondition } from "./conditions";
import { showConfirmation } from "./dialog";
import { registerListener, removeListener } from "./init-options";
import { createLogger } from "./logger-provider";
import { showPopupMenu } from "./menu";
import { initializeModules, loadModules } from "./modules";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import type {
	Share,
	ShareConfirmationOptions,
	ShareConfirmationStatus,
	ShareConfirmationType,
	ShareEntry,
	ShareProviderOptions
} from "./shapes/share-shapes";
import { isEmpty, isStringValue } from "./utils";

const logger = createLogger("Share");

let shareOptions: ShareProviderOptions | undefined;
let modules: ModuleEntry<Share>[] = [];
let shareInitialized = false;
let initOptionsListenerId: string | undefined;
let defaultIconUrl: string | undefined;

/**
 * Initialize the sharing.
 * @param options The options for sharing.
 * @param helpers The module helpers.
 * @param iconUrl The default icon url to use for notifications or modals.
 */
export async function init(
	options: ShareProviderOptions | undefined,
	helpers: ModuleHelpers,
	iconUrl: string | undefined
): Promise<void> {
	if (!isEmpty(options)) {
		shareOptions = options;
		defaultIconUrl = iconUrl;

		if (shareOptions.enabled) {
			if (!shareInitialized) {
				shareInitialized = true;
				modules = await loadModules<Share>(options, "share");
				await initializeModules<Share>(modules, helpers);

				initOptionsListenerId = registerListener(async (initOptions) => {
					logger.info("Received share request.");
					if (isStringValue(initOptions.shareType)) {
						let payloadJson;
						if (isStringValue(initOptions.payload)) {
							payloadJson = JSON.parse(atob(initOptions.payload));
						}
						await handle(initOptions.shareType, payloadJson);
					} else {
						logger.warn("shareType passed but it wasn't a string");
					}
				}, "shareType");
			} else {
				logger.warn("Share cannot be initialized more than once.");
			}
		}
	}
}

/**
 * Closedown the share provider.
 */
export async function closedown(): Promise<void> {
	if (initOptionsListenerId) {
		removeListener(initOptionsListenerId);
		initOptionsListenerId = undefined;
	}
}

/**
 * Is sharing enabled.
 * @returns True if sharing is enabled.
 */
export function isShareEnabled(): boolean {
	return shareInitialized && Array.isArray(modules) && modules.length > 0;
}

/**
 * Check if the share type is enabled.
 * @param type The type of share to check.
 * @returns True if the share type is enabled.
 */
export async function typeEnabled(type: string): Promise<boolean> {
	if (Array.isArray(modules)) {
		for (const module of modules) {
			const shareTypes = await module.implementation.getShareTypes();
			if (shareTypes.includes(type)) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Show the share options menu.
 * @param actionPayload The payload containing information to use for positioning.
 */
export async function showShareOptions(actionPayload: CustomButtonActionPayload): Promise<void> {
	if (shareInitialized) {
		logger.info("Share called with payload:", actionPayload);

		const windowIdentity = actionPayload.windowIdentity;

		const template: OpenFin.MenuItemTemplate<Omit<ShareEntry, "label">>[] = [];

		for (const module of modules) {
			const shareEntries = await module.implementation.getEntries(windowIdentity);
			if (Array.isArray(shareEntries)) {
				for (const shareEntry of shareEntries) {
					const { label, type, payload } = shareEntry;
					template.push({
						label,
						data: {
							type,
							payload
						}
					});
				}
			}
		}

		const result = await showPopupMenu<Omit<ShareEntry, "label">>(
			{ x: actionPayload.x, y: actionPayload.y },
			actionPayload.windowIdentity,
			"",
			template
		);

		if (isEmpty(result)) {
			logger.info("share menu dismissed.");
		} else {
			await share(result.type, result.payload);
		}
	} else {
		logger.warn("Share cannot be triggered as it hasn't been registered yet.");
	}
}

/**
 * Get the inbuilt actions for the platform.
 * @returns The map of platform actions.
 */
export async function getPlatformActions(): Promise<CustomActionsMap> {
	const actionMap: CustomActionsMap = {};

	actionMap.share = async (payload: CustomActionPayload): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			await showShareOptions(payload);
		}
	};

	return actionMap;
}

/**
 * Perform the share operation.
 * @param type The type of share to perform.
 * @param payload The data to associate with the share.
 */
export async function share(type: string, payload?: unknown): Promise<void> {
	let handled = false;
	for (const module of modules) {
		const shareTypes = await module.implementation.getShareTypes();
		if (shareTypes.includes(type)) {
			await module.implementation.share(type, payload);
			handled = true;
		}
	}
	if (!handled) {
		logger.warn(`Received shareType ${type} but no module was found to handle it.`);
	}
}

/**
 * Perform the handle operation.
 * @param type The type of share handling to perform.
 * @param payload The data to associate with the share handling.
 */
export async function handle(type: string, payload?: unknown): Promise<void> {
	let handled = false;
	for (const module of modules) {
		const shareTypes = await module.implementation.getShareTypes();
		if (shareTypes.includes(type)) {
			await module.implementation.handle(type, payload);
			handled = true;
		}
	}
	if (!handled) {
		logger.warn(`Received shareType ${type} but no module was found to handle it.`);
	}
}

/**
 * Display a confirmation for the share.
 * @param confirmationOptions The confirmation options.
 * @param confirmationType The type of confirmation to show.
 * @param parentIdentity The identity of the parent window.
 * @returns Nothing.
 */
export async function confirmation(
	confirmationOptions: ShareConfirmationOptions,
	confirmationType: ShareConfirmationType | undefined,
	parentIdentity?: OpenFin.Identity
): Promise<void> {
	let displayType = confirmationType ?? shareOptions?.confirmationMode ?? "notification";

	// If display type is notification, but it is not enabled, then use modal instead.
	if (displayType === "notification") {
		const platform = getCurrentSync();
		const enabled = await checkCondition(platform, "notifications");
		if (!enabled) {
			displayType = "modal";
		}
	}

	if (displayType === "modal") {
		await showConfirmation(
			{
				title: confirmationOptions.title,
				message: confirmationOptions.message,
				iconUrl: confirmationOptions.iconUrl ?? defaultIconUrl,
				buttons: [
					{
						label: "Dismiss",
						id: "dismiss"
					}
				]
			},
			parentIdentity
		);
	} else if (displayType === "notification") {
		const statusColors: { [key in ShareConfirmationStatus]: IndicatorColor } = {
			shared: IndicatorColor.GREEN,
			loaded: IndicatorColor.BLUE,
			error: IndicatorColor.RED
		};

		const notification: NotificationOptions = {
			expires: new Date(Date.now() + 30000),
			body: confirmationOptions.message,
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
			icon: confirmationOptions.iconUrl ?? defaultIconUrl,
			indicator: {
				color: statusColors[confirmationOptions.status],
				text: confirmationOptions.title
			},
			category: "share",
			title: confirmationOptions.title,
			template: "markdown"
		};
		await create(notification);
	}
}
