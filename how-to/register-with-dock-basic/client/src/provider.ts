import OpenFin from "@openfin/core";
import {
	CustomActionPayload,
	CustomButtonActionPayload,
	CustomDropdownItemActionPayload,
	getCurrentSync,
	init as workspacePlatformInit,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import { deregister, minimize, register, show } from "./dock";

let registerDock;
let showDock;
let minimizeDock;
let deregisterDock;
let showHomeButton;
let showNotificationButton;
let showStorefrontButton;
let showWorkspacesButton;
let customIconUrl;
let customOpenUrl;

async function init() {
	await workspacePlatformInit({
		browser: {},
		customActions: {
			"launch-google": async (payload: CustomActionPayload) => {
				await launchView("https://www.google.com");
			},
			"launch-bing": async (payload: CustomActionPayload) => {
				await launchView("https://www.bing.com");
			},
			"launch-custom": async (payload: CustomButtonActionPayload) => {
				await launchView(payload.customData as string);
			},
			"launch-tools": async (payload: CustomDropdownItemActionPayload) => {
				if (payload.customData === "twitter") {
					await launchView("https://www.twitter.com");
				} else if (payload.customData === "facebook") {
					await launchView("https://www.facebook.com");
				}
			}
		}
	});

	registerDock = document.querySelector<HTMLButtonElement>("#register");
	showDock = document.querySelector<HTMLButtonElement>("#show");
	minimizeDock = document.querySelector<HTMLButtonElement>("#minimize");
	deregisterDock = document.querySelector<HTMLButtonElement>("#deregister");
	showHomeButton = document.querySelector<HTMLInputElement>("#showHomeButton");
	showNotificationButton = document.querySelector<HTMLInputElement>("#showNotificationButton");
	showStorefrontButton = document.querySelector<HTMLInputElement>("#showStorefrontButton");
	showWorkspacesButton = document.querySelector<HTMLInputElement>("#showWorkspacesButton");
	customIconUrl = document.querySelector<HTMLInputElement>("#customIconUrl");
	customOpenUrl = document.querySelector<HTMLInputElement>("#customOpenUrl");

	setStates(false);

	registerDock.addEventListener("click", async () => {
		registerDock.disabled = true;
		try {
			await register({
				showHome: showHomeButton.checked,
				showNotifications: showNotificationButton.checked,
				showStorefront: showStorefrontButton.checked,
				showWorkspaces: showWorkspacesButton.checked,
				customIconUrl: customIconUrl.value,
				customOpenUrl: customOpenUrl.value
			});
			setStates(true);
		} catch (err) {
			console.error("Error registering dock provider", err);
			setStates(false);
		}
	});

	deregisterDock.addEventListener("click", async () => {
		setStates(false);
		await deregister();
	});

	showDock.addEventListener("click", async () => {
		await show();
	});

	minimizeDock.addEventListener("click", async () => {
		await minimize();
	});
}

function setStates(isRegistered: boolean): void {
	registerDock.disabled = isRegistered;
	deregisterDock.disabled = !isRegistered;
	showDock.disabled = !isRegistered;
	minimizeDock.disabled = !isRegistered;
	showHomeButton.disabled = isRegistered;
	showNotificationButton.disabled = isRegistered;
	showStorefrontButton.disabled = isRegistered;
	showWorkspacesButton.disabled = isRegistered;
	customIconUrl.disabled = isRegistered;
	customOpenUrl.disabled = isRegistered;
}

export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity
) {
	const platform: WorkspacePlatformModule = getCurrentSync();

	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: null };
	} else {
		viewOptions = view;
	}

	return platform.createView(viewOptions, targetIdentity);
}

window.addEventListener("DOMContentLoaded", async () => {
	await init();
});
