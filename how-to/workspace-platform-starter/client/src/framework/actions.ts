import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	getCurrentSync,
	type BrowserCreateWindowRequest,
	type CustomActionPayload,
	type CustomActionsMap
} from "@openfin/workspace-platform";
import { toggleNotificationCenter } from "@openfin/workspace/notifications";
import { getApp } from "./apps";
import * as authProvider from "./auth";
import { updateToolbarButtons } from "./buttons";
import { launch } from "./launch";
import { createLogger } from "./logger-provider";
import { closedownModules, initializeModules, loadModules } from "./modules";
import { launchView } from "./platform/browser";
import type { ModuleEntry, ModuleHelpers } from "./shapes";
import type { ActionHelpers, Actions, ActionsProviderOptions } from "./shapes/actions-shapes";
import { showShareOptions } from "./share";
import { toggleScheme } from "./themes";
import { isEmpty, isStringValue } from "./utils";
import { show } from "./workspace/home";

const logger = createLogger("Actions");

let modules: ModuleEntry<Actions>[] = [];
const customActionMap: CustomActionsMap = {};
let getActionsCalled: boolean = false;

/**
 * These Ids are for actions built in to the platform.
 */
export const PLATFORM_ACTION_IDS = {
	moveViewToNewWindow: "move-view-to-new-window",
	movePageToNewWindow: "move-page-to-new-window",
	pinWindow: "pin-window",
	unpinWindow: "unpin-window",
	homeShow: "home-show",
	notificationToggle: "notification-toggle",
	share: "share",
	logoutAndQuit: "logout-and-quit",
	launchApp: "launch-app",
	launchView: "launch-view",
	toggleScheme: "toggle-scheme"
};

/**
 * Initialize the actions provider.
 * @param options Options for the actions provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: ActionsProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		logger.info("Initializing with options", options);

		// Load any modules that have an actions endpoint
		modules = await loadModules<Actions, ActionHelpers>(options, "actions");

		// Initialize the modules
		await initializeModules<Actions, ActionHelpers>(modules, {
			...helpers,
			updateToolbarButtons,
			callerTypes: CustomActionCallerType
		});
	}
}

/**
 * Close down the actions provider.
 */
export async function closedown(): Promise<void> {
	await closedownModules("actions");
}

/**
 * Get all the actions we want to register with the platform.
 * @returns The map of all the custom actions.
 */
export async function getActions(): Promise<CustomActionsMap> {
	getActionsCalled = true;

	// Get the platform actions
	let platformActionMap: CustomActionsMap = await getPlatformActions();

	// Merge in any custom actions registered with registerAction
	platformActionMap = { ...platformActionMap, ...customActionMap };

	// Merge the module actions
	const platform = getCurrentSync();
	for (const actionModule of modules) {
		const modActions = await actionModule.implementation.get(platform);
		platformActionMap = {
			...platformActionMap,
			...modActions
		};
	}

	logger.info("Action Ids", Object.keys(platformActionMap));

	return platformActionMap;
}

/**
 * Manually register an action with the platform, must be done before getActions is called.
 * @param actionName The name of the actions.
 * @param action The action to be performed.
 */
export function registerAction(actionName: string, action: () => Promise<void>): void {
	if (getActionsCalled) {
		logger.error(
			`registerAction has been called for action ${actionName} but it is too late for the action to be used by the platform`
		);
		return;
	}

	if (!isStringValue(actionName)) {
		logger.warn("Unable to register action. The action name was not specified.");
		return;
	}

	if (isEmpty(action)) {
		logger.warn("Unable to register action as no action was passed.");
		return;
	}

	if (!isEmpty(customActionMap[actionName])) {
		logger.warn(
			`Unable to add action to custom actions as an action with the name ${actionName} has already been registered`
		);
		return;
	}

	customActionMap[actionName] = action;
	logger.info(`Registered action: ${actionName}`);
}

/**
 * Get the inbuilt actions for the platform.
 * @returns The map of platform actions.
 */
async function getPlatformActions(): Promise<CustomActionsMap> {
	const actionMap: CustomActionsMap = {};

	actionMap[PLATFORM_ACTION_IDS.moveViewToNewWindow] = async (
		payload: CustomActionPayload
	): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
			const platform = getCurrentSync();
			const initialView = await platform.createView({
				name: payload.selectedViews[0].name
			} as OpenFin.PlatformViewCreationOptions);
			if (payload.selectedViews.length > 1) {
				const windowIdentity = await getViewWindowIdentity(initialView);
				for (let i = 1; i < payload.selectedViews.length; i++) {
					await platform.createView(
						{
							name: payload.selectedViews[i].name
						} as OpenFin.PlatformViewCreationOptions,
						windowIdentity,
						initialView.identity
					);
				}
			}
		}
	};

	actionMap[PLATFORM_ACTION_IDS.movePageToNewWindow] = async (
		payload: CustomActionPayload
	): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.PageTabContextMenu) {
			const platform = getCurrentSync();
			const win = platform.Browser.wrapSync(payload.windowIdentity);
			const page = await win.getPage(payload.pageId);
			await platform.createWindow({
				workspacePlatform: {
					pages: [page]
				}
			});
			await win.removePage(page.pageId);
		}
	};

	actionMap[PLATFORM_ACTION_IDS.pinWindow] = async (payload: CustomActionPayload): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			const platform = getCurrentSync();
			const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
			const options = await browserWindow.openfinWindow.getOptions();
			const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
			await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: true });
			if (currentToolbarOptions) {
				const newButtons = await updateToolbarButtons(
					currentToolbarOptions.buttons,
					payload.customData.sourceId as string,
					payload.customData.replacementId as string
				);
				await browserWindow.replaceToolbarOptions({ buttons: newButtons });
			}
		}

		if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
			const platform = getCurrentSync();
			const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
			const options = await browserWindow.openfinWindow.getOptions();
			const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
			await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: true });
			if (!isEmpty(currentToolbarOptions)) {
				const newButtons = await updateToolbarButtons(
					currentToolbarOptions.buttons,
					payload.customData.sourceId as string,
					payload.customData.replacementId as string
				);
				await browserWindow.replaceToolbarOptions({ buttons: newButtons });
			}
		}
	};

	actionMap[PLATFORM_ACTION_IDS.unpinWindow] = async (payload: CustomActionPayload): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			const platform = getCurrentSync();
			const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
			const options = await browserWindow.openfinWindow.getOptions();
			const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
			await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: false });
			if (!isEmpty(currentToolbarOptions)) {
				const newButtons = await updateToolbarButtons(
					currentToolbarOptions.buttons,
					payload.customData.sourceId as string,
					payload.customData.replacementId as string
				);
				await browserWindow.replaceToolbarOptions({ buttons: newButtons });
			}
		}
	};

	actionMap[PLATFORM_ACTION_IDS.homeShow] = async (): Promise<void> => {
		await show();
	};

	actionMap[PLATFORM_ACTION_IDS.notificationToggle] = async (): Promise<void> => {
		await toggleNotificationCenter();
	};

	actionMap[PLATFORM_ACTION_IDS.share] = async (payload: CustomActionPayload): Promise<void> => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			await showShareOptions(payload);
		}
	};

	actionMap[PLATFORM_ACTION_IDS.logoutAndQuit] = async (): Promise<void> => {
		await authProvider.logout();
	};

	actionMap[PLATFORM_ACTION_IDS.launchApp] = async (payload: CustomActionPayload): Promise<void> => {
		if (
			payload.callerType === CustomActionCallerType.CustomButton ||
			payload.callerType === CustomActionCallerType.CustomDropdownItem
		) {
			if (payload.customData?.appId) {
				const app = await getApp(payload.customData.appId as string);
				if (app) {
					await launch(app);
				} else {
					logger.error(
						`Unable to find app with id '${
							payload.customData.appId
						}' in call to launchApp action from source '${payload.customData?.source ?? "unknown source"}'`
					);
				}
			} else {
				logger.error("No appId specified in payload.customData in launchApp action");
			}
		}
	};

	actionMap[PLATFORM_ACTION_IDS.launchView] = async (payload: CustomActionPayload): Promise<void> => {
		if (
			payload.callerType === CustomActionCallerType.CustomButton ||
			payload.callerType === CustomActionCallerType.CustomDropdownItem
		) {
			if (payload.customData?.url) {
				await launchView(payload.customData?.url as string);
			} else {
				logger.error("No url specified in payload.customData in launchView action");
			}
		}
	};

	actionMap[PLATFORM_ACTION_IDS.toggleScheme] = async (payload: CustomActionPayload): Promise<void> => {
		if (
			payload.callerType === CustomActionCallerType.CustomButton ||
			payload.callerType === CustomActionCallerType.CustomDropdownItem
		) {
			await toggleScheme();
		}
	};

	return actionMap;
}

/**
 * Get the identity of the window containing a view.
 * @param view The view to get the containing window identity.
 * @returns The identity of the containing window.
 */
async function getViewWindowIdentity(view: OpenFin.View): Promise<OpenFin.Identity> {
	const currentWindow = await view.getCurrentWindow();

	// If the view does is not yet attached to a window, wait for the
	// target-changed even which means it has been attached
	if (isEmpty(currentWindow.identity.name) || currentWindow.identity.name === fin.me.identity.uuid) {
		return new Promise<OpenFin.Identity>((resolve, reject) => {
			view
				.once("target-changed", async () => {
					const hostWindow = await view.getCurrentWindow();
					resolve(hostWindow.identity);
				})
				.catch(() => {});
		});
	}

	return currentWindow.identity;
}
