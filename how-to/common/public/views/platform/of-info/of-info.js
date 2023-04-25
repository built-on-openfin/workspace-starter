/**
 * Displays a view with information about the OpenFin runtime.
 */

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});

/**
 * Initialize the DOM elements.
 */
async function init() {
	const rvmInfo = await fin.System.getRvmInfo();

	const rvmVersionElement = document.querySelector('#rvmVersion');
	rvmVersionElement.textContent = `v${rvmInfo.version}`;

	const rvmPathElement = document.querySelector('#rvmPath');
	rvmPathElement.textContent = rvmInfo.path;

	const appLogDirectoryElement = document.querySelector('#appLogDirectory');
	appLogDirectoryElement.textContent = rvmInfo.appLogDirectory;

	const runtimeInfo = await fin.System.getRuntimeInfo();

	const runtimeVersionElement = document.querySelector('#runtimeVersion');
	runtimeVersionElement.textContent = `v${runtimeInfo.version}`;

	const chromeVersionElement = document.querySelector('#chromeVersion');
	chromeVersionElement.textContent = `v${runtimeInfo.chromeVersion}`;

	const electronVersionElement = document.querySelector('#electronVersion');
	electronVersionElement.textContent = runtimeInfo.electronVersion;

	const platform = fin.Platform.getCurrentSync();
	const platformIdentityElement = document.querySelector('#platformIdentity');
	platformIdentityElement.textContent = platform.identity.uuid;
}
