import { getCurrentSync } from "@openfin/workspace-platform";
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
import type { BootstrapComponents, BootstrapOptions } from "./shapes/framework-shapes";
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
	register as registerNotifications
} from "./workspace/notifications";
import {
	deregister as deregisterStore,
	hide as hideStore,
	register as registerStore,
	show as showStore
} from "./workspace/store";

const logger = createLogger("Bootstrapper");

let bootstrapOptions: BootstrapOptions;

async function onReAuthenticationRequired() {
	logger.info("The platform has detected that authentication is required (might be expired session)");
	logger.info("At this stage the platform can decide how to proceed:");
	logger.info(" - Hide all visible windows?");
	logger.info(
		" - Disable results from showing in home by having the home provider check to see if authentication is required before showing results?"
	);
	logger.info(" - Have Store check if authentication is required before returning store entries?");
	logger.info(" - Have launch functions not launch if authentication is required?");
	logger.info(" - If an intent is raised do not action it if authentication is required?");
	if (bootstrapOptions.home) {
		await hideHome();
	}
	if (bootstrapOptions.store) {
		await hideStore();
	}
	if (bootstrapOptions.dock) {
		await minimizeDock();
	}
	// login management handled by platform.
}

export async function init() {
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

	await registerIntegration(settings.integrationProvider, helpers);

	const registeredComponents: BootstrapComponents[] = [];

	if (bootstrapOptions.home) {
		// only register search logic once workspace is running
		await registerHome();
		registeredComponents.push("home");
		registerAction("show-home", async () => {
			await showHome();
		});
		registerAction("hide-home", async () => {
			await hideHome();
		});
	}

	if (bootstrapOptions.store) {
		await registerStore();
		registeredComponents.push("store");
		registerAction("show-store", async () => {
			await showStore();
		});
		registerAction("hide-store", async () => {
			await hideStore();
		});
	}

	if (bootstrapOptions.dock) {
		await registerDock(bootstrapOptions);
		registeredComponents.push("dock");
		registerAction("show-dock", async () => {
			await showDock();
		});
		registerAction("minimize-dock", async () => {
			await minimizeDock();
		});
	}

	if (bootstrapOptions.notifications) {
		await registerNotifications();
	}

	// Remove any entries from autoShow that have not been registered
	bootstrapOptions.autoShow = bootstrapOptions.autoShow.filter(
		(component) => registeredComponents.includes(component) || component === "none"
	);

	// If the autoShow options is not empty, default to the first registered component.
	if (bootstrapOptions.autoShow.length === 0 && registeredComponents.length > 0) {
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

	if (isAuthenticationEnabled()) {
		logger.info("Setting up listeners for authentication events");
		// platform is instantiated and authentication if required is given. Watch for session
		// expiry
		authProvider.subscribe("logged-in", async () => {
			// what behavior do you want to do when someone logs in
			// potentially the inverse if you hid something on session expiration
		});
		authProvider.subscribe("before-logged-out", async () => {
			// what behavior do you want to do when someone logs in
			// do you want to save anything before they log themselves out
		});
		authProvider.subscribe("session-expired", onReAuthenticationRequired);
		const authenticationRequired = await authProvider.isAuthenticationRequired();
		if (authenticationRequired) {
			await onReAuthenticationRequired();
		}
	}

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
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
		await fin.Platform.getCurrentSync().quit();
	});

	// Once the platform is started and everything is bootstrapped initialize the init options
	// listener so that it is ready to handle initial params or subsequent requests.
	await registerInitOptionsListener(settings?.initOptionsProvider, "after-bootstrap", helpers);

	// fire up any windows that have been configured
	await headlessProvider.init(settings?.headlessProvider);

	// Let any other modules participate in the lifecycle
	const platform = getCurrentSync();
	await fireLifecycleEvent(platform, "after-bootstrap");
}
