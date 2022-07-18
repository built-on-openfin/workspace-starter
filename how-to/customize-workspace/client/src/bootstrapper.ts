import { fin } from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";
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

async function onAuthenticationRequired() {
	console.log(`The platform has detected that authentication is required (might be expired session).`);
	console.log(`At this stage the platform can decide how to proceed:`);
	console.log(` - Call login to trigger the login process?`);
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

	try {
		const isLoggedIn = 	await authProvider.login();
		if (!isLoggedIn) {
			console.warn(
				"Authentication required and unable to log in. A real app should think about what to do next. Save current workspace and quit? Or just quit. This platform is quitting if the user refuses to log in."
			);
			const unauthenticatedPlatform = getCurrentSync();
			await unauthenticatedPlatform.quit();
			return false;
		}
	} catch (error) {
		console.error("Error while trying to re-authenticate.", error);
	}
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

	if (isAuthenticationEnabled()) {
		// platform is instantiated and authentication if required is given. Watch for session
		// expiry
		const authenticationRequired = await authProvider
		.isAuthenticationRequired(async (authRequired: boolean) => {
			if (authRequired) {
				await onAuthenticationRequired();
			}
		});
		if (authenticationRequired) {
			await onAuthenticationRequired();
		}
	}

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await deregisterIntegration(settings.integrationProvider);

		await deregisterStore();
		await deregisterHome();
		await deregisterShare();
		await deregisterNotifications();
		await fin.Platform.getCurrentSync().quit();
	});
}
