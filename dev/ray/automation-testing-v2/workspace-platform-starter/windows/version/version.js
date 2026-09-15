/**
 * Initialize.
 * @returns True if it is initialized.
 */
async function init() {
	if (window.fin !== undefined) {
		const currentWindow = fin.Window.getCurrentSync();
		const options = await currentWindow.getOptions();
		const customData = options.customData ?? {};

		const versionInfo = customData.versionInfo ?? {};
		const minVersion = customData.minVersion ?? {};
		const maxVersion = customData.maxVersion ?? {};

		const minFail = customData.minFail ?? [];
		const maxFail = customData.maxFail ?? [];

		if (minFail.includes('app')) {
			const btnRestart = document.querySelector('#restart');
			const currentVersion = document.querySelector('#current-version');
			const newVersion = document.querySelector('#new-version');
			btnRestart.addEventListener('click', async () => {
				await restartPlatform();
			});
			currentVersion.textContent = versionInfo['app'] ?? 'unknown';
			newVersion.textContent = minVersion['app'] ?? 'unknown';
		} else {
			const keys = Object.keys(versionInfo);

			for (let i = 0; i < keys.length; i++) {
				const currentKey = keys[i];
				const minVersionMet = minVersion[currentKey] === undefined || !minFail.includes(currentKey);
				const maxVersionMet = maxVersion[currentKey] === undefined || !maxFail.includes(currentKey);
				addVersion(
					currentKey,
					versionInfo[currentKey],
					minVersion[currentKey],
					minVersionMet,
					maxVersion[currentKey],
					maxVersionMet
				);
			}

			const btnClose = document.querySelector('#close');
			const btnLaunch = document.querySelector('#launch');

			btnLaunch.addEventListener('click', async () => {
				await fin.System.openUrlWithBrowser('https://github.com/built-on-openfin/workspace-starter');
			});

			btnClose.addEventListener('click', async () => {
				await quitPlatform();
			});
			currentWindow.on('close-requested', async () => {
				await quitPlatform();
			});
		}

		return true;
	}
	return false;
}

/**
 * Add a version to the table.
 * @param versionType The type of the version.
 * @param currentVersion The current version.
 * @param minVersion The minimum version.
 * @param minVersionMet Was the minimum version met.
 * @param maxVersion The maximum version.
 * @param maxVersionMet Was the maximum version met.
 */
function addVersion(versionType, currentVersion, minVersion, minVersionMet, maxVersion, maxVersionMet) {
	const lstVersions = document.querySelector('#lstVersions');
	const colHeaders = Array.from(lstVersions.children[0].children).map((header) => header.textContent);
	const versionTypeLabel = document.createElement('span');
	versionTypeLabel.textContent = versionType ?? 'unknown';

	const versionLabel = document.createElement('span');
	versionLabel.textContent = currentVersion;

	if (minVersionMet === false || maxVersionMet === false) {
		versionLabel.classList.add('primary');
	}

	const minVersionLabel = document.createElement('span');
	minVersionLabel.textContent = minVersion ?? 'Not Set';

	if (minVersion !== undefined) {
		minVersionLabel.classList.add(minVersionMet ? 'success' : 'error');
	}

	const maxVersionLabel = document.createElement('span');
	maxVersionLabel.textContent = maxVersion ?? 'Not Set';

	if (maxVersion !== undefined) {
		maxVersionLabel.classList.add(maxVersionMet ? 'success' : 'error');
	}

	const cellVersionType = document.createElement('div');
	cellVersionType.dataset.name = colHeaders[0];
	cellVersionType.append(versionTypeLabel);

	const cellVersionLabel = document.createElement('div');
	cellVersionLabel.dataset.name = colHeaders[1];
	cellVersionLabel.append(versionLabel);

	const cellMinVersionLabel = document.createElement('div');
	cellMinVersionLabel.dataset.name = colHeaders[2];
	cellMinVersionLabel.append(minVersionLabel);

	const cellMaxVersionLabel = document.createElement('div');
	cellMaxVersionLabel.dataset.name = colHeaders[3];
	cellMaxVersionLabel.append(maxVersionLabel);

	const row = document.createElement('div');
	row.classList.add('table-row');

	row.append(cellVersionType);
	row.append(cellVersionLabel);
	row.append(cellMinVersionLabel);
	row.append(cellMaxVersionLabel);

	lstVersions.append(row);
}

/**
 * Quit the platform.
 */
async function quitPlatform() {
	const plat = fin.Platform.wrapSync({ uuid: fin.me.identity.uuid, name: fin.me.identity.uuid });
	await plat.quit();
}

/**
 * Restart the platform.
 */
async function restartPlatform() {
	const app = await fin.Application.getCurrent();
	await app.scheduleRestart();
	await quitPlatform();
}

init()
	.then((setupRun) => {
		console.log('Version info rendered.', setupRun);
		return true;
	})
	.catch((reason) => console.error('There was an issue reviewing the version info.', reason));
