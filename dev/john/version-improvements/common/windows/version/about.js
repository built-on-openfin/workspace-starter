function addVersion(versionType, currentVersion) {
	const lstVersions = document.querySelector('#lstVersions');
	const colHeaders = Array.from(lstVersions.children[0].children).map((header) => header.textContent);
	const versionTypeLabel = document.createElement('span');
	versionTypeLabel.textContent = versionType;

	const versionLabel = document.createElement('span');
	versionLabel.textContent = currentVersion;

	const cellVersionType = document.createElement('div');
	cellVersionType.dataset.name = colHeaders[0];
	cellVersionType.append(versionTypeLabel);

	const cellVersionLabel = document.createElement('div');
	cellVersionLabel.dataset.name = colHeaders[1];
	cellVersionLabel.append(versionLabel ?? 'unknown');

	const row = document.createElement('div');
	row.classList.add('table-row');

	row.append(cellVersionType);
	row.append(cellVersionLabel);

	lstVersions.append(row);
}

async function init() {
	if (window.fin !== undefined) {
		const currentWindow = fin.Window.getCurrentSync();
		const options = await currentWindow.getOptions();
		const customData = options.customData ?? {};

		const versionInfo = customData.versionInfo ?? {};
		const keys = Object.keys(versionInfo);

		for (let i = 0; i < keys.length; i++) {
			const currentKey = keys[i];
			addVersion(currentKey, versionInfo[currentKey]);
		}
		return true;
	}
	return false;
}

init()
	.then((setupRun) => {
		console.log('Version info rendered.', setupRun);
		return true;
	})
	.catch((reason) => console.error('There was an issue reviewing the version info.', reason));
