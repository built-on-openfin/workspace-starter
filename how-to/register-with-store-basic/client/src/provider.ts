import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import { register, deregister, show, hide } from "./store";

async function init() {
	await workspacePlatformInit({
		browser: {}
	});
	const registerStore = document.querySelector<HTMLButtonElement>("#register");
	const showStore = document.querySelector<HTMLButtonElement>("#show");
	const hideStore = document.querySelector<HTMLButtonElement>("#hide");
	const deregisterStore = document.querySelector<HTMLButtonElement>("#deregister");

	registerStore.addEventListener("click", async () => {
		await register();
		showStore.style.display = "unset";
		hideStore.style.display = "unset";
		deregisterStore.style.display = "unset";
		registerStore.style.display = "none";
	});

	deregisterStore.addEventListener("click", async () => {
		showStore.style.display = "none";
		hideStore.style.display = "none";
		deregisterStore.style.display = "none";
		registerStore.style.display = "unset";
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
