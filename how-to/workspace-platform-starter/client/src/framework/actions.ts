import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap
} from "@openfin/workspace-platform";
import { getApp } from "./apps";
import * as authProvider from "./auth";
import { updateToolbarButtons } from "./buttons";
import * as favoriteProvider from "./favorite";
import { launch } from "./launch";
import { createLogger } from "./logger-provider";
import * as menuProvider from "./menu";
import { closedownModules, initializeModules, loadModules } from "./modules";
import type { ActionHelpers, Actions, ActionsProviderOptions } from "./shapes/actions-shapes";
import type { LaunchPreference, PlatformApp } from "./shapes/app-shapes";
import type { WindowPositioningOptions } from "./shapes/browser-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import * as shareProvider from "./share";
import * as themeProvider from "./themes";
import { isEmpty, isStringValue } from "./utils";
import { getWindowPositionUsingStrategy } from "./utils-position";
import * as homeComponent from "./workspace/home";
import * as notificationsComponent from "./workspace/notifications";

const logger = createLogger("Actions");

let modules: ModuleEntry<Actions>[] | undefined;
const customActionMap: CustomActionsMap = {};
let platformActionMap: CustomActionsMap | undefined;
let isInitialized: boolean = false;
let windowPositioningOptions: WindowPositioningOptions | undefined;

/**
 * These Ids are for actions built in to the platform.
 */
export const PLATFORM_ACTION_IDS = {
	homeShow: "home-show",
	notificationToggle: "notification-toggle",
	quit: "quit",
	logoutAndQuit: "logout-and-quit",
	launchApp: "launch-app",
	launchView: "launch-view"
};

/**
 * Initialize the actions provider.
 * @param options Options for the actions provider.
 * @param helpers Module helpers to pass to any loaded modules.
 * @param windowPositioning Options for positioning windows.
 * @returns The platform action map.
 */
export async function init(
	options: ActionsProviderOptions | undefined,
	helpers: ModuleHelpers,
	windowPositioning: WindowPositioningOptions
): Promise<CustomActionsMap | undefined> {
	if (isInitialized) {
		logger.error("The actions can only be used once when configuring the platform");
		return;
	}
	isInitialized = true;
	if (options) {
		logger.info("Initializing with options", options);

		// Load any modules that have an actions endpoint
		modules = await loadModules<Actions, ActionHelpers>(options, "actions");

		// Initialize the modules
		await initializeModules<Actions, ActionHelpers>(modules, {
			...helpers,
			updateToolbarButtons
		});
	}
	if (!isEmpty(windowPositioning)) {
		logger.info("Initializing with window positioning options", windowPositioning);
		windowPositioningOptions = windowPositioning;
	}

	await buildActions();

	return platformActionMap;
}

/**
 * Close down the actions provider.
 */
export async function closedown(): Promise<void> {
	await closedownModules("actions");
}

/**
 * Call an action.
 * @param id The id of the action to call.
 * @param payload The payload for the action.
 * @returns True if the action exists.
 */
export async function callAction(id: string, payload: CustomActionPayload): Promise<boolean> {
	if (!isEmpty(platformActionMap) && platformActionMap[id]) {
		await platformActionMap[id](payload);
		return true;
	}
	return false;
}

/**
 * Get all the actions we want to register with the platform.
 * @returns The map of all the custom actions.
 */
async function buildActions(): Promise<void> {
	// Get the platform actions
	platformActionMap = await getPlatformActions();

	const shareActions = await shareProvider.getPlatformActions();
	const favoriteActions = await favoriteProvider.getPlatformActions();
	const menuActions = await menuProvider.getPlatformActions();
	const themeActions = await themeProvider.getPlatformActions();

	// Merge in any custom actions registered with registerAction
	platformActionMap = {
		...platformActionMap,
		...shareActions,
		...favoriteActions,
		...menuActions,
		...themeActions,
		...customActionMap
	};

	if (!isEmpty(modules)) {
		// Merge the module actions
		const platform = getCurrentSync();
		for (const actionModule of modules) {
			const modActions = await actionModule.implementation.get(platform);
			platformActionMap = {
				...platformActionMap,
				...modActions
			};
		}
	}

	logger.info("Action Ids", Object.keys(platformActionMap));
}

/**
 * Manually register an action with the platform, must be done before getActions is called.
 * @param actionName The name of the actions.
 * @param action The action to be performed.
 */
export function registerAction(actionName: string, action: () => Promise<void>): void {
	if (isInitialized) {
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

	actionMap[PLATFORM_ACTION_IDS.homeShow] = async (): Promise<void> => {
		await homeComponent.show();
	};

	actionMap[PLATFORM_ACTION_IDS.notificationToggle] = async (): Promise<void> => {
		await notificationsComponent.toggle();
	};

	actionMap[PLATFORM_ACTION_IDS.quit] = async (): Promise<void> => {
		await fin.Platform.getCurrentSync().quit();
	};

	actionMap[PLATFORM_ACTION_IDS.logoutAndQuit] = async (): Promise<void> => {
		await authProvider.logout();
	};

	actionMap[PLATFORM_ACTION_IDS.launchApp] = async (payload: CustomActionPayload): Promise<void> => {
		if (
			payload.callerType === CustomActionCallerType.CustomButton ||
			payload.callerType === CustomActionCallerType.CustomDropdownItem ||
			payload.callerType === CustomActionCallerType.StoreCustomButton
		) {
			if (payload.customData?.appId) {
				const app = await getApp(payload.customData.appId as string);
				if (app) {
					await launchAppAction(app, payload.windowIdentity);
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
				const manifest: Partial<OpenFin.ViewOptions> = {
					url: payload.customData.url
				};
				const viewApp = {
					appId: "action-launch-view",
					title: "View Url",
					icons: [],
					publisher: "",
					manifestType: "inline-view",
					manifest
				};
				await launchAppAction(viewApp as unknown as PlatformApp, payload.windowIdentity);
			} else {
				logger.error("No url specified in payload.customData in launchView action");
			}
		}
	};

	return actionMap;
}

/**
 * Launches an app on the right monitor.
 * @param app The app to launch.
 * @param clientIdentity The identity of the client that called the action.
 */
async function launchAppAction(app: PlatformApp, clientIdentity: OpenFin.Identity): Promise<void> {
	if (!isEmpty(app)) {
		let launchPreference: LaunchPreference | undefined;
		const bounds = await getWindowPositionUsingStrategy(windowPositioningOptions, clientIdentity);
		if (!isEmpty(bounds)) {
			launchPreference = { bounds };
		}
		await launch(app, launchPreference);
	} else {
		logger.error("Unable to do launch app action as an app object was not passed");
	}
}
