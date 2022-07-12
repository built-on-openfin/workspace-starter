import { init as workspacePlatformInit } from "@openfin/workspace-platform";
import { register, show, hide, deregister } from "./home";

async function init() {
	await workspacePlatformInit({
		browser: {}
	});
	const registerHome = document.querySelector<HTMLButtonElement>("#register");
	const deregisterHome = document.querySelector<HTMLButtonElement>("#deregister");
	const showHome = document.querySelector<HTMLButtonElement>("#show");
	const hideHome = document.querySelector<HTMLButtonElement>("#hide");

	showHome.disabled = true;
	hideHome.disabled = true;
	deregisterHome.disabled = true;

	registerHome.addEventListener("click", async () => {
		await register();
		showHome.disabled = false;
		hideHome.disabled = false;
		deregisterHome.disabled = false;
		registerHome.disabled = true;
	});

	deregisterHome.addEventListener("click", async () => {
		showHome.disabled = true;
		hideHome.disabled = true;
		deregisterHome.disabled = true;
		registerHome.disabled = false;
		await deregister();
	});

	showHome.addEventListener("click", async () => {
		await show();
	});

	hideHome.addEventListener("click", async () => {
		await hide();
	});
}

window.addEventListener("DOMContentLoaded", async () => {
	await init();
});
