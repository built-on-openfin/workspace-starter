import type { HomeRegistration, RegistrationMetaInfo } from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";
import * as analyticsProvider from "./analytics";
import { getApps } from "./apps";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import * as conditionsProvider from "./conditions";
import * as connectionProvider from "./connections";
import {
	registerListener as registerInitListener,
	init as registerInitOptionsListener
} from "./init-options";
import { closedown as deregisterIntegration, init as registerIntegration } from "./integrations";
import { launch } from "./launch";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import { getDefaultHelpers } from "./modules";
import * as platformSplashProvider from "./platform/platform-splash";
import { getSettings } from "./settings";
import type { PlatformAnalyticsEvent } from "./shapes/analytics-shapes";
import type { BootstrapComponents, BootstrapOptions } from "./shapes/bootstrap-shapes";
import type { HomeProviderOptions } from "./shapes/home-shapes";
import type { LoggedInLifecyclePayload } from "./shapes/lifecycle-shapes";
import type { ModuleHelpers } from "./shapes/module-shapes";
import * as trayProvider from "./tray";
import { isEmpty } from "./utils";
import * as versionProvider from "./version";
import * as dockComponent from "./workspace/dock";
import * as homeComponent from "./workspace/home";
import * as lowCodeIntegrationProvider from "./workspace/low-code-integrations";
import * as notificationsComponent from "./workspace/notifications";
import * as storeComponent from "./workspace/store";

const logger = createLogger("Bootstrapper");

let bootstrapOptions: BootstrapOptions | undefined;
let deregistered = false;

/**
 * Bootstrap the workspace components.
 * @returns True if the platform started successfully.
 */
export async function init(): Promise<boolean> {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	logger.info("Initializing the bootstrapper");
	const customSettings = await getSettings();

	bootstrapOptions = { ...customSettings?.bootstrap };
	bootstrapOptions.home = bootstrapOptions.home ?? true;
	bootstrapOptions.store = bootstrapOptions.store ?? false;
	bootstrapOptions.dock = bootstrapOptions.dock ?? false;
	bootstrapOptions.notifications = bootstrapOptions.notifications ?? false;
	bootstrapOptions.autoShow = bootstrapOptions.autoShow ?? [];
	bootstrapOptions.autostartApps = bootstrapOptions.autostartApps ?? true;

	const moduleHelpers: ModuleHelpers = getDefaultHelpers();

	const registeredComponents: BootstrapComponents[] = [];
	let homeRegistration: HomeRegistration | undefined;
	let workspaceMetaInfo: RegistrationMetaInfo | undefined;
	let notificationMetaInfo: RegistrationMetaInfo | undefined;

	await platformSplashProvider.updateProgress("Integrations");
	logger.info("Registering integrations");
	await registerIntegration(customSettings?.integrationProvider, moduleHelpers, async (query) => {
		if (homeRegistration?.setSearchQuery) {
			await homeRegistration?.setSearchQuery(query);
		} else {
			logger.warn("Home registration setSearchQuery called by integration, but it is not available");
		}
	});

	if (bootstrapOptions.home) {
		await platformSplashProvider.updateProgress("Home");

		let homeProvider: HomeProviderOptions | undefined = customSettings?.homeProvider;

		// If there were no custom settings home provider
		// default to values from the manifest
		if (isEmpty(homeProvider)) {
			const app = await fin.Application.getCurrent();
			const manifest = await app.getManifest();
			homeProvider = {
				id: fin.me.identity.uuid,
				title: "Home",
				icon: manifest.platform?.icon ?? ""
			};
		}

		// only register search logic once workspace is running
		homeRegistration = await homeComponent.register(homeProvider);
		if (homeRegistration) {
			workspaceMetaInfo = {
				workspaceVersion: homeRegistration.workspaceVersion,
				clientAPIVersion: homeRegistration.clientAPIVersion
			};
			registeredComponents.push("home");
			registerHomeConnectionActions();
		}
	}

	if (bootstrapOptions.store) {
		await platformSplashProvider.updateProgress("Store");

		const storeRegistration = await storeComponent.register(customSettings?.storefrontProvider);
		if (storeRegistration) {
			if (!workspaceMetaInfo) {
				workspaceMetaInfo = storeRegistration;
			}
			registeredComponents.push("store");
			registerStoreConnectionActions();
		}
	}

	if (bootstrapOptions.dock) {
		await platformSplashProvider.updateProgress("Dock");

		const dockRegistration = await dockComponent.register(customSettings?.dockProvider, bootstrapOptions);
		if (dockRegistration) {
			if (!workspaceMetaInfo) {
				workspaceMetaInfo = dockRegistration;
			}
			registeredComponents.push("dock");
			registerDockConnectionActions();
		}
	}

	if (!isEmpty(workspaceMetaInfo)) {
		// we match the versions of workspace related packages
		versionProvider.setVersion("workspacePlatformClient", workspaceMetaInfo.clientAPIVersion);
		versionProvider.setVersion("workspaceClient", workspaceMetaInfo.clientAPIVersion);
		versionProvider.setVersion("workspace", workspaceMetaInfo.workspaceVersion);
	}

	if (bootstrapOptions.notifications) {
		await platformSplashProvider.updateProgress("Notifications");

		notificationMetaInfo = await notificationsComponent.register(customSettings?.notificationProvider);
		registerNotificationConnectionActions();
	}
	conditionsProvider.registerCondition(
		"notifications",
		async () => bootstrapOptions?.notifications ?? false,
		false
	);

	if (!isEmpty(notificationMetaInfo)) {
		versionProvider.setVersion("notificationCenter", notificationMetaInfo.workspaceVersion);
	}

	const versionStatus = await versionProvider.getVersionStatus();
	const versionInfo = await versionProvider.getVersionInfo();

	logger.info("Loaded with the following versions.", versionInfo);
	if (analyticsProvider.isEnabled()) {
		logger.info("Analytics Provider enabled. Capturing versioning information.");
		const analyticsEvent: PlatformAnalyticsEvent = {
			source: "WorkspacePlatform",
			type: "version",
			timestamp: new Date(),
			data: versionInfo,
			action: "load"
		};
		await analyticsProvider.handleAnalytics([analyticsEvent]);
	}

	await platformSplashProvider.updateProgress("Versions");

	logger.info("Checking to see if version management is required.");
	if (await versionProvider.manageVersionStatus(versionStatus)) {
		// version status had to be managed so it couldn't just continue. Stop initialization.
		await deregister();
		logger.warn("Platform bootstrapping stopped as the current versioning required stopping.");
		return false;
	}

	logger.info("Checking to see if version monitoring is required.");
	await versionProvider.MonitorVersionStatus();

	if (lowCodeIntegrationProvider.isEnabled()) {
		await platformSplashProvider.updateProgress("Low Code Integrations");

		// register any instantiated low code integrations that require registering
		await lowCodeIntegrationProvider.initializeWorkflows();
		if (lowCodeIntegrationProvider.hasRegisteredIntegrations() && !registeredComponents.includes("home")) {
			registeredComponents.push("home");
			registerHomeConnectionActions();
		}
	}

	logger.info("Validating auto show list:", bootstrapOptions.autoShow);
	// Remove any entries from autoShow that have not been registered
	bootstrapOptions.autoShow = bootstrapOptions.autoShow.filter(
		(component) => registeredComponents.includes(component) || component === "none"
	);
	logger.info("Validated auto show list:", bootstrapOptions.autoShow);

	// If the autoShow options is not empty, default to the first registered component.
	if (bootstrapOptions.autoShow.length === 0 && registeredComponents.length > 0) {
		logger.info(
			`No auto show options specified but at least one Workspace Component is registered. Showing the first registered component: ${registeredComponents[0]}`
		);
		bootstrapOptions.autoShow = [registeredComponents[0]];
	}

	await autoShow();
	let autoShowOnShortcut = true;
	registerInitListener(async (_) => {
		if (autoShowOnShortcut && bootstrapOptions?.autoShow) {
			await autoShow();
		}
	});

	if (!isEmpty(customSettings?.trayProvider) && customSettings?.trayProvider.enabled) {
		await platformSplashProvider.updateProgress("Tray");
		await trayProvider.init(customSettings?.trayProvider);
	}

	const platform = getCurrentSync();

	if (isAuthenticationEnabled()) {
		logger.info("Setting up listeners for authentication events");
		// platform is instantiated and authentication if required is given. Watch for session
		// expiry
		authProvider.subscribe("logged-in", async (user?: unknown) => {
			// what behavior do you want to do when someone logs in
			// potentially the inverse if you hid something on session expiration
			await fireLifecycleEvent(platform, "auth-logged-in", {
				user
			} as LoggedInLifecyclePayload);
			// if the user has logged in and ensure the autoShow is not disabled
			autoShowOnShortcut = true;
		});

		authProvider.subscribe("session-expired", async () => {
			// session expired. What do you want to do with the platform when the user needs to log back in.
			await fireLifecycleEvent(platform, "auth-session-expired");
			// if the user has logged out ensure the autoShow is disabled
			autoShowOnShortcut = false;
		});

		authProvider.subscribe("before-logged-out", async () => {
			// what behavior do you want to do when someone logs in
			// do you want to save anything before they log themselves out
			await fireLifecycleEvent(platform, "auth-before-logged-out");
		});
	}

	logger.info("Setting up dispose handler.");
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregister();
		await fin.Platform.getCurrentSync().quit();
	});

	// Once the platform is started and everything is bootstrapped initialize the init options
	// listener so that it is ready to handle initial params or subsequent requests.
	await registerInitOptionsListener(customSettings?.initOptionsProvider, moduleHelpers, "after-bootstrap");

	// Let any other modules participate in the lifecycle
	await fireLifecycleEvent(platform, "after-bootstrap");

	// start up any apps that have requested to be started up at the end of the bootstrapping process
	if (bootstrapOptions.autostartApps) {
		await autoStartApps();
	}

	logger.info("Finished the bootstrapping process.");
	return true;
}

/**
 * Start any apps that are listed in the auto start options for the bootstrap process.
 */
async function autoStartApps(): Promise<void> {
	const apps = await getApps({ autostart: true });
	if (Array.isArray(apps) && apps.length > 0) {
		await platformSplashProvider.updateProgress("Auto Start Apps");
		logger.info(
			`Apps have been marked that they should autostart after the bootstrapping process and the platform has not set autostartApps to false in the bootstrapping options. ${apps.length} app(s) will be launched.`
		);
		for (const app of apps) {
			setTimeout(async () => {
				try {
					// we should not wait for every single app to launch in case there are slow launching apps or delays
					// the goal is to launch all of the apps that have requested it
					logger.info(`Launching app: ${app.appId}`);
					const appIdentifier = await launch(app);
					logger.info(`App: ${app.appId} launched with the following identifier`, appIdentifier);
				} catch (error) {
					logger.error(`Error launching app: ${app.appId}.`, error);
				}
			}, 1000);
		}
	}
}

/**
 * This function autoShows any components that are listed in the auto show options for the bootstrap process.
 */
async function autoShow(): Promise<void> {
	const autoShowComponents = bootstrapOptions?.autoShow;
	if (Array.isArray(autoShowComponents)) {
		for (const autoShowComponent of autoShowComponents) {
			if (autoShowComponent === "home") {
				await homeComponent.show();
			} else if (autoShowComponent === "store") {
				await storeComponent.show();
			} else if (autoShowComponent === "dock") {
				await dockComponent.show();
			}
		}
	}
}

/**
 * Deregister any of the components registered on startup.
 */
async function deregister(): Promise<void> {
	if (!deregistered) {
		logger.info("Deregister has been called.");
		await deregisterIntegration();
		if (bootstrapOptions?.dock) {
			await dockComponent.deregister();
		}
		if (bootstrapOptions?.store) {
			await storeComponent.deregister();
		}
		if (bootstrapOptions?.home) {
			await homeComponent.deregister();
		}
		if (bootstrapOptions?.notifications) {
			await notificationsComponent.deregister();
		}
		logger.info("Finished deregister.");
		deregistered = true;
	}
}

/**
 * Used to register home related actions.
 */
function registerHomeConnectionActions(): void {
	connectionProvider.registerAction("show-home", async () => {
		await homeComponent.show();
	});
	connectionProvider.registerAction("hide-home", async () => {
		await homeComponent.hide();
	});
}

/**
 * Used to register store related actions.
 */
function registerStoreConnectionActions(): void {
	connectionProvider.registerAction("show-store", async () => {
		await storeComponent.show();
	});
	connectionProvider.registerAction("hide-store", async () => {
		await storeComponent.hide();
	});
}

/**
 * Used to register dock related actions.
 */
function registerDockConnectionActions(): void {
	connectionProvider.registerAction("show-dock", async () => {
		await dockComponent.show();
	});
	connectionProvider.registerAction("minimize-dock", async () => {
		await dockComponent.minimize();
	});
}

/**
 * Used to register notification related actions.
 */
function registerNotificationConnectionActions(): void {
	connectionProvider.registerAction("show-notifications", async () => {
		await notificationsComponent.show();
	});
	connectionProvider.registerAction("hide-notifications", async () => {
		await notificationsComponent.hide();
	});
}
