import {
	CustomActionCallerType,
	getCurrentSync,
	init as workspacePlatformInit
} from "@openfin/workspace-platform";
import { getApps } from "./apps";
import { deregister, hide, register, show } from "./store";

async function init() {
	await workspacePlatformInit({
		browser: {},
		customActions: {
			"open-web-site": async (payload) => {
				if (payload.callerType === CustomActionCallerType.StoreCustomButton) {
					window.open(payload.customData?.url as string);
				}
			},
			"launch-app": async (payload) => {
				if (payload.callerType === CustomActionCallerType.StoreCustomButton) {
					const apps = await getApps();
					const app = apps.find((a) => a.appId === payload.appId);
					if (app) {
						const platform = getCurrentSync();
						await platform.launchApp({ app });
					}
				}
			}
		}
	});

	const registerStore = document.querySelector<HTMLButtonElement>("#register");
	const showStore = document.querySelector<HTMLButtonElement>("#show");
	const hideStore = document.querySelector<HTMLButtonElement>("#hide");
	const deregisterStore = document.querySelector<HTMLButtonElement>("#deregister");

	showStore.disabled = true;
	hideStore.disabled = true;
	deregisterStore.disabled = true;
	registerStore.disabled = false;

	registerStore.addEventListener("click", async () => {
		await register();
		showStore.disabled = false;
		hideStore.disabled = false;
		deregisterStore.disabled = false;
		registerStore.disabled = true;
	});

	deregisterStore.addEventListener("click", async () => {
		showStore.disabled = true;
		hideStore.disabled = true;
		deregisterStore.disabled = true;
		registerStore.disabled = false;
		await deregister();
	});

	showStore.addEventListener("click", async () => {
		await show();
	});

	hideStore.addEventListener("click", async () => {
		await hide();
	});
}

window.addEventListener("DOMContentLoaded", async () => {
	await init();
});
