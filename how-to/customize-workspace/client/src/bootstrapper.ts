import { fin } from "@openfin/core";
import * as authProvider from "./auth";
import { isAuthenticationEnabled } from "./auth";
import { launchPage, launchView } from "./browser";
import {
	deregister as deregisterHome,
	register as registerHome,
	show as showHome,
	hide as hideHome
} from "./home";
import { deregister as deregisterIntegration, register as registerIntegration } from "./integrations";
import { launchSnapshot } from "./launch";
import { deregister as deregisterNotifications, register as registerNotifications } from "./notifications";
import { getSettings } from "./settings";
import { deregister as deregisterShare, register as registerShare } from "./share";
import {
	deregister as deregisterStore,
	register as registerStore,
	show as showStore,
	hide as hideStore
} from "./store";

let setupHome;
let setupStore;
let setupNotifications;

async function onReAuthenticationRequired() {
	console.log(`The platform has detected that authentication is required (might be expired session).`);
	console.log(`At this stage the platform can decide how to proceed:`);
	console.log(` - Hide all visible windows?`);
	console.log(
		` - Disable results from showing in home by having the home provider check to see if authentication is required before showing results?`
	);
	console.log(` - Have Store check if authentication is required before returning store entries?`);
	console.log(` - Have launch functions not launch if authentication is required?`);
	console.log(` - If an intent is raised do not action it if authentication is required?`);
	if (setupHome) {
		await hideHome();
	}
	if (setupStore) {
		await hideStore();
	}
	// login management handled by platform.
}

export async function init() {
	// you can kick off your bootstrapping process here where you may decide to prompt for authentication,
	// gather reference data etc before starting workspace and interacting with it.
	console.log("Initializing the bootstrapper");
	const settings = await getSettings();
	let workspaceLoaded = false;
	setupHome = settings?.bootstrap?.home ?? true;
	setupStore = settings?.bootstrap?.store ?? true;
	setupNotifications = settings?.bootstrap?.notifications ?? true;

	await registerIntegration(
		{
			rootUrl: settings?.platformProvider.rootUrl,
			launchView,
			launchPage,
			launchSnapshot: async (manifestUrl) =>
				launchSnapshot({
					manifestType: "snapshot",
					manifest: manifestUrl,
					appId: "",
					title: "",
					icons: null,
					publisher: null
				}),
			openUrl: async (url) => fin.System.openUrlWithBrowser(url),
			showHome
		},
		settings.integrationProvider
	);

	if (setupHome) {
		// only register search logic once workspace is running
		await registerHome();
		workspaceLoaded = true;
		await showHome();
	}

	if (setupStore) {
		await registerStore();
		if (!workspaceLoaded) {
			await showStore();
		}
	}

	if (setupNotifications) {
		await registerNotifications();
	}

	await registerShare();

	if (isAuthenticationEnabled()) {
		console.log("Setting up listeners for authentication events.");
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
		await deregisterStore();
		await deregisterHome();
		await deregisterShare();
		await deregisterNotifications();
		await fin.Platform.getCurrentSync().quit();
	});
}
