import type OpenFin from "@openfin/core";
import {
	BrowserCreateWindowRequest,
	CustomActionCallerType,
	CustomActionPayload,
	CustomActionsMap,
	CustomButtonActionPayload,
	CustomDropdownItemActionPayload,
	getCurrentSync
} from "@openfin/workspace-platform";
import { toggleNotificationCenter } from "@openfin/workspace/notifications";
import { getApp } from "./apps";
import * as authProvider from "./auth";
import { updateToolbarButtons } from "./buttons";
import { launch } from "./launch";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";
import { initializeModules, loadModules } from "./modules";
import { getDefaultWindowOptions, launchView } from "./platform/browser";
import type { ModuleHelpers } from "./shapes";
import type { ActionHelpers, Actions, ActionsProviderOptions } from "./shapes/actions-shapes";
import { showShareOptions } from "./share";
import { toggleScheme } from "./themes";
import { show } from "./workspace/home";

const logger = createLogger("Actions");
const customActionMap: CustomActionsMap = {};

async function getViewWindowIdentity(view: OpenFin.View): Promise<OpenFin.Identity> {
	const currentWindow = await view.getCurrentWindow();

	if (currentWindow.identity.name === undefined || currentWindow.identity.name === fin.me.identity.uuid) {
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

export const ACTION_IDS = {
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

export async function getActions(
	actionsProviderOptions: ActionsProviderOptions,
	helpers: ModuleHelpers
): Promise<CustomActionsMap> {
	let platformActionMap: CustomActionsMap = await getPlatformActions();

	const actionModules = await loadModules<Actions, ActionHelpers>(actionsProviderOptions, "actions");

	await initializeModules<Actions, ActionHelpers>(actionModules, {
		...helpers,
		updateToolbarButtons,
		manifestTypes,
		callerTypes: CustomActionCallerType
	});

	const platform = getCurrentSync();
	for (const actionModule of actionModules) {
		const modActions = await actionModule.implementation.get(platform);
		platformActionMap = {
			...platformActionMap,
			...modActions
		};
	}

	return platformActionMap;
}

async function getPlatformActions(): Promise<CustomActionsMap> {
	const actionMap: CustomActionsMap = {};
	actionMap[ACTION_IDS.moveViewToNewWindow] = async (payload: CustomActionPayload) => {
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

	actionMap[ACTION_IDS.movePageToNewWindow] = async (payload: CustomActionPayload) => {
		if (payload.callerType === CustomActionCallerType.PageTabContextMenu) {
			const platform = getCurrentSync();
			const windowOptions = await getDefaultWindowOptions();
			const win = platform.Browser.wrapSync(payload.windowIdentity);
			const page = await win.getPage(payload.pageId);
			windowOptions.workspacePlatform.pages = [page];
			await platform.createWindow(windowOptions);
			await win.removePage(page.pageId);
		}
	};

	actionMap[ACTION_IDS.pinWindow] = async (payload: CustomActionPayload) => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			const platform = getCurrentSync();
			const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
			const options = await browserWindow.openfinWindow.getOptions();
			const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
			await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: true });
			if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
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
			if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
				const newButtons = await updateToolbarButtons(
					currentToolbarOptions.buttons,
					payload.customData.sourceId as string,
					payload.customData.replacementId as string
				);
				await browserWindow.replaceToolbarOptions({ buttons: newButtons });
			}
		}
	};

	actionMap[ACTION_IDS.unpinWindow] = async (payload: CustomActionPayload) => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			const platform = getCurrentSync();
			const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
			const options = await browserWindow.openfinWindow.getOptions();
			const currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
			await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: false });
			if (currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
				const newButtons = await updateToolbarButtons(
					currentToolbarOptions.buttons,
					payload.customData.sourceId as string,
					payload.customData.replacementId as string
				);
				await browserWindow.replaceToolbarOptions({ buttons: newButtons });
			}
		}
	};

	actionMap[ACTION_IDS.homeShow] = async () => {
		await show();
	};

	actionMap[ACTION_IDS.notificationToggle] = async () => {
		await toggleNotificationCenter();
	};

	actionMap[ACTION_IDS.share] = async (payload: CustomActionPayload) => {
		if (payload.callerType === CustomActionCallerType.CustomButton) {
			await showShareOptions(payload);
		}
	};

	actionMap[ACTION_IDS.logoutAndQuit] = async () => {
		await authProvider.logout();
	};

	actionMap[ACTION_IDS.launchApp] = async (
		payload: CustomButtonActionPayload | CustomDropdownItemActionPayload
	) => {
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
	};

	actionMap[ACTION_IDS.launchView] = async (
		payload: CustomButtonActionPayload | CustomDropdownItemActionPayload
	) => {
		if (payload.customData?.url) {
			await launchView(payload.customData?.url as string);
		} else {
			logger.error("No url specified in payload.customData in launchView action");
		}
	};

	actionMap[ACTION_IDS.toggleScheme] = async (
		payload: CustomButtonActionPayload | CustomDropdownItemActionPayload
	) => {
		await toggleScheme();
	};

	return { ...actionMap, ...customActionMap };
}

export function registerAction(actionName: string, action: () => Promise<void>) {
	if (actionName === undefined || actionName === null || actionName.trim().length === 0) {
		logger.warn("Unable to register action. The action name was not specified.");
		return;
	}

	if (action === undefined) {
		logger.warn("Unable to register action as no action was passed.");
		return;
	}

	if (customActionMap[actionName] !== undefined) {
		logger.warn(
			`Unable to add action to custom actions as an action with the name ${actionName} has already been registered`
		);
		return;
	}

	customActionMap[actionName] = action;
	logger.info(`Registered action: ${actionName}`);
}
