export const CONTAINER_ID = "layout-container";
const openfinWindow: OpenFin.Window = fin.Window.getCurrentSync();

const maxOrRestore = async (): Promise<void> => {
	if ((await openfinWindow.getState()) === "normal") {
		return openfinWindow.maximize();
	}

	return openfinWindow.restore();
};

const closeWindow = async (): Promise<void> => openfinWindow.close();

const minimizeWindow = async (): Promise<void> => openfinWindow.minimize();

const setupTitleBar = (): void => {
	const minBtn: HTMLElement = document.querySelector("#minimize-button");
	const maxBtn: HTMLElement = document.querySelector("#expand-button");
	const closeBtn: HTMLElement = document.querySelector("#close-button");

	minBtn.addEventListener("click", minimizeWindow);
	maxBtn.addEventListener("click", maxOrRestore);
	closeBtn.addEventListener("click", closeWindow);
};

window.addEventListener("DOMContentLoaded", async () => {
	await fin.Platform.Layout.init({ containerId: CONTAINER_ID });
	setupTitleBar();
});
