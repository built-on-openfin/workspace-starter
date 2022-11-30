import type { HomeRegistration } from "@openfin/workspace";
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
	const query = document.querySelector<HTMLInputElement>("#query");
	const go = document.querySelector<HTMLButtonElement>("#go");

	showHome.disabled = true;
	hideHome.disabled = true;
	deregisterHome.disabled = true;
	query.disabled = true;
	go.disabled = true;

	let homeRegistration: HomeRegistration;

	registerHome.addEventListener("click", async () => {
		homeRegistration = await register();
		showHome.disabled = false;
		hideHome.disabled = false;
		deregisterHome.disabled = false;
		registerHome.disabled = true;
		query.disabled = false;
		go.disabled = false;
	});

	deregisterHome.addEventListener("click", async () => {
		showHome.disabled = true;
		hideHome.disabled = true;
		deregisterHome.disabled = true;
		registerHome.disabled = false;
		query.disabled = true;
		go.disabled = true;
		homeRegistration = undefined;
		await deregister();
	});

	showHome.addEventListener("click", async () => {
		await show();
	});

	hideHome.addEventListener("click", async () => {
		await hide();
	});

	go.addEventListener("click", async () => {
		if (homeRegistration) {
			await show();
			await homeRegistration.setSearchQuery(query.value);
		}
	});
}

window.addEventListener("DOMContentLoaded", async () => {
	await init();
});
