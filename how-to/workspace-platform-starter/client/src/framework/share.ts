import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap,
	type CustomButtonActionPayload
} from "@openfin/workspace-platform";
import { registerListener, removeListener } from "./init-options";
import { createLogger } from "./logger-provider";
import { showPopupMenu } from "./menu";
import { initializeModules, loadModules } from "./modules";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import type { Share, ShareEntry, ShareProviderOptions } from "./shapes/share-shapes";
import { isEmpty, isStringValue } from "./utils";

const logger = createLogger("Share");

let shareOptions: ShareProviderOptions | undefined;
let modules: ModuleEntry<Share>[] = [];
let shareInitialized = false;
let initOptionsListenerId: string | undefined;

/**
 * Initialize the sharing.
 * @param options The options for sharing.
 * @param helpers The module helpers.
 */
export async function init(options: ShareProviderOptions | undefined, helpers: ModuleHelpers): Promise<void> {
	if (!isEmpty(options)) {
		shareOptions = options;

		if (shareOptions.enabled) {
			if (!shareInitialized) {
				shareInitialized = true;
				modules = await loadModules<Share>(options, "share");
				await initializeModules<Share>(modules, helpers);

				initOptionsListenerId = registerListener(async (initOptions) => {
					logger.info("Received share request.");
					if (isStringValue(initOptions.shareType)) {
						await share(initOptions.shareType, initOptions.payload);
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
	return shareInitialized;
}

/**
 * Show the share options menu.
 * @param payload The payload containing information to use for positioning.
 * @param payload.windowIdentity The window that initiated the menu request.
 * @param payload.x The x position of the mouse click.
 * @param payload.y The y position of the mouse click.
 */
export async function showShareOptions(payload: CustomButtonActionPayload): Promise<void> {
	if (shareInitialized) {
		logger.info("Share called with payload:", payload);

		const windowIdentity = payload.windowIdentity;

		const template: OpenFin.MenuItemTemplate<ShareEntry>[] = [];

		for (const module of modules) {
			const shareEntries = await module.implementation.getEntries(windowIdentity);
			if (Array.isArray(shareEntries)) {
				for (const shareEntry of shareEntries) {
					template.push({
						label: shareEntry.label,
						data: shareEntry
					});
				}
			}
		}

		const result = await showPopupMenu<ShareEntry>(
			{ x: payload.x, y: payload.y },
			payload.windowIdentity,
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
