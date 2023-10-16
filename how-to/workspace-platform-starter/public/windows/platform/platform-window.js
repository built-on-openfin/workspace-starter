const CONTAINER_ID = 'layout-container';

const thisWindow = fin.Window.getCurrentSync();

window.addEventListener('DOMContentLoaded', async () => {
	// Initialize the window layout
	await fin.Platform.Layout.init({ containerId: CONTAINER_ID });

	// Setup the title bar elements.
	setupTitleBar();
});

/**
 * Maximize or restore the window.
 * @returns Nothing.
 */
async function maxOrRestore() {
	if ((await thisWindow.getState()) === 'normal') {
		return thisWindow.maximize();
	}

	return thisWindow.restore();
}

/**
 * Close the window.
 * @returns Nothing.
 */
async function closeWindow() {
	await thisWindow.close();
}

/**
 * Minimize the window.
 * @returns Nothing.
 */
async function minimizeWindow() {
	await thisWindow.minimize();
}

/**
 * Setup the title bar for the window and it's button click handlers.
 */
async function setupTitleBar() {
	const minBtn = document.querySelector('#minimize-button');
	const maxBtn = document.querySelector('#expand-button');
	const closeBtn = document.querySelector('#close-button');
	const title = document.querySelector('#title');
	if (minBtn) {
		minBtn.addEventListener('click', minimizeWindow);
	}
	if (maxBtn) {
		maxBtn.addEventListener('click', maxOrRestore);
	}
	if (closeBtn) {
		closeBtn.addEventListener('click', closeWindow);
	}

	const options = await fin.me.getOptions();

	if (options?.workspacePlatform?.title !== undefined) {
		if (title !== null) {
			title.textContent = options.workspacePlatform.title;
		}
		document.title = options.workspacePlatform.title;
	}
}
