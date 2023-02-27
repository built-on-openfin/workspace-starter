import type { HomeRegistration, RegistrationMetaInfo } from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";
import * as analyticsProvider from "./analytics";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import { registerAction } from "./connections";
import * as headlessProvider from "./headless";
import { init as registerInitOptionsListener } from "./init-options";
import { closedown as deregisterIntegration, init as registerIntegration } from "./integrations";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import { getDefaultHelpers } from "./modules";
import { getSettings } from "./settings";
import type { ModuleHelpers } from "./shapes";
import type { PlatformAnalyticsEvent } from "./shapes/analytics-shapes";
import type { BootstrapComponents, BootstrapOptions } from "./shapes/bootstrap-shapes";
import * as versionProvider from "./version";
import {
	deregister as deregisterDock,
	minimize as minimizeDock,
	register as registerDock,
	show as showDock
} from "./workspace/dock";
import {
	deregister as deregisterHome,
	hide as hideHome,
	register as registerHome,
	show as showHome
} from "./workspace/home";
import {
	deregister as deregisterNotifications,
	register as registerNotifications,
	show as showNotifications,
	hide as hideNotifications
} from "./workspace/notifications";
import {
	deregister as deregisterStore,
	hide as hideStore,
	register as registerStore,
	show as showStore
} from "./workspace/store";

const logger = createLogger("Bootstrapper");

let bootstrapOptions: BootstrapOptions;
let deregistered = false;

export async function init(): Promise<boolean> {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	logger.info("Initializing the bootstrapper");
	const settings = await getSettings();
	bootstrapOptions = { ...settings.bootstrap };
	bootstrapOptions.home = bootstrapOptions.home ?? true;
	bootstrapOptions.store = bootstrapOptions.store ?? false;
	bootstrapOptions.dock = bootstrapOptions.dock ?? false;
	bootstrapOptions.notifications = bootstrapOptions.notifications ?? false;
	bootstrapOptions.autoShow = bootstrapOptions.autoShow ?? [];

	const helpers: ModuleHelpers = getDefaultHelpers(settings);

	const registeredComponents: BootstrapComponents[] = [];
	let homeRegistration: HomeRegistration;
	let workspaceMetaInfo: RegistrationMetaInfo;
	let notificationMetaInfo: RegistrationMetaInfo;

	if (bootstrapOptions.home) {
		// only register search logic once workspace is running
		homeRegistration = await registerHome();
		workspaceMetaInfo = {
			workspaceVersion: homeRegistration.workspaceVersion,
			clientAPIVersion: homeRegistration.clientAPIVersion
		};
		registeredComponents.push("home");
		registerAction("show-home", async () => {
			await showHome();
		});
		registerAction("hide-home", async () => {
			await hideHome();
		});
	}

	logger.info("Registering integrations");
	await registerIntegration(settings.integrationProvider, helpers, homeRegistration);

	if (bootstrapOptions.store) {
		workspaceMetaInfo = await registerStore();
		registeredComponents.push("store");
		registerAction("show-store", async () => {
			await showStore();
		});
		registerAction("hide-store", async () => {
			await hideStore();
		});
	}

	if (bootstrapOptions.dock) {
		workspaceMetaInfo = await registerDock(bootstrapOptions);
		registeredComponents.push("dock");
		registerAction("show-dock", async () => {
			await showDock();
		});
		registerAction("minimize-dock", async () => {
			await minimizeDock();
		});
	}

	if (workspaceMetaInfo !== undefined) {
		// we match the versions of workspace related packages
		versionProvider.setVersion("workspacePlatformClient", workspaceMetaInfo.clientAPIVersion);
		versionProvider.setVersion("workspaceClient", workspaceMetaInfo.clientAPIVersion);
		versionProvider.setVersion("workspace", workspaceMetaInfo.workspaceVersion);
	}

	if (bootstrapOptions.notifications) {
		notificationMetaInfo = await registerNotifications();
		registerAction("show-notifications", async () => {
			await showNotifications();
		});
		registerAction("hide-notifications", async () => {
			await hideNotifications();
		});
	}

	if (notificationMetaInfo !== undefined) {
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

	logger.info("Checking to see if version management is required.");
	if (await versionProvider.manageVersionStatus(versionStatus)) {
		// version status had to be managed so it couldn't just continue. Stop initialization.
		await deregister();
		logger.warn("Platform bootstrapping stopped as the current versioning required stopping.");
		return false;
	}

	logger.info("Checking to see if version monitoring is required.");
	await versionProvider.MonitorVersionStatus();

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

	for (const autoShow of bootstrapOptions.autoShow) {
		if (autoShow === "home") {
			await showHome();
		} else if (autoShow === "store") {
			await showStore();
		} else if (autoShow === "dock") {
			await showDock();
		}
	}

	const platform = getCurrentSync();

	if (isAuthenticationEnabled()) {
		logger.info("Setting up listeners for authentication events");
		// platform is instantiated and authentication if required is given. Watch for session
		// expiry
		authProvider.subscribe("logged-in", async () => {
			// what behavior do you want to do when someone logs in
			// potentially the inverse if you hid something on session expiration
			await fireLifecycleEvent(platform, "auth-logged-in");
		});
		authProvider.subscribe("session-expired", async () => {
			// session expired. What do you want to do with the platform when the user needs to log back in.
			await fireLifecycleEvent(platform, "auth-session-expired");
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
	await registerInitOptionsListener(settings?.initOptionsProvider, "after-bootstrap", helpers);

	// fire up any windows that have been configured
	await headlessProvider.init(settings?.headlessProvider);

	// Let any other modules participate in the lifecycle
	await fireLifecycleEvent(platform, "after-bootstrap");

	logger.info("Finished the bootstrapping process.");
	return true;
}

async function deregister() {
	if (!deregistered) {
		logger.info("Deregister has been called.");
		await deregisterIntegration();
		if (bootstrapOptions.dock) {
			await deregisterDock();
		}
		if (bootstrapOptions.store) {
			await deregisterStore();
		}
		if (bootstrapOptions.home) {
			await deregisterHome();
		}
		if (bootstrapOptions.notifications) {
			await deregisterNotifications();
		}
		logger.info("Finished deregister.");
		deregistered = true;
	}
}
