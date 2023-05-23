import type OpenFin from "@openfin/core";

const CONTAINER_ID = "layout-container";

const thisWindow: OpenFin.Window = fin.Window.getCurrentSync();

window.addEventListener("DOMContentLoaded", async () => {
	// Initialize the window layout
	await fin.Platform.Layout.init({ containerId: CONTAINER_ID });

	// Setup the title bar elements.
	setupTitleBar();
});

/**
 * Maximize or restore the window.
 * @returns Nothing.
 */
async function maxOrRestore(): Promise<void> {
	if ((await thisWindow.getState()) === "normal") {
		return thisWindow.maximize();
	}

	return thisWindow.restore();
}

/**
 * Close the window.
 * @returns Nothing.
 */
async function closeWindow(): Promise<void> {
	await thisWindow.close();
}

/**
 * Minimize the window.
 * @returns Nothing.
 */
async function minimizeWindow(): Promise<void> {
	await thisWindow.minimize();
}

/**
 * Setup the title bar for the window and it's button click handlers.
 */
function setupTitleBar(): void {
	const minBtn = document.querySelector<HTMLButtonElement>("#minimize-button");
	const maxBtn = document.querySelector<HTMLButtonElement>("#expand-button");
	const closeBtn = document.querySelector<HTMLButtonElement>("#close-button");

	if (minBtn) {
		minBtn.addEventListener("click", minimizeWindow);
	}
	if (maxBtn) {
		maxBtn.addEventListener("click", maxOrRestore);
	}
	if (closeBtn) {
		closeBtn.addEventListener("click", closeWindow);
	}
}
