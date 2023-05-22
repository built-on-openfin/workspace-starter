async function init() {
	try {
		if (window.fin === undefined) {
			console.error('The fin api is required in order to run this app.');
			return;
		}
		const app = window.fin.Application.getCurrentSync();
		const params = new URLSearchParams(window.location.search);
		const manifestQueryStringId = 'manifest';
		if (params.get(manifestQueryStringId) === null) {
			console.error('Unable to proceed as we need a target manifest. Quitting.');
			await app.quit(true);
			return;
		}
		const targetManifestUrl = decodeURIComponent(params.get(manifestQueryStringId));
		const platformToUpgradeUUID = await app.getParentUuid();
		const platformToUpgrade = window.fin.Platform.wrapSync({
			uuid: platformToUpgradeUUID,
			name: platformToUpgradeUUID
		});
		platformToUpgrade.addListener('closed', (_) => {
			try {
				console.log(
					`The platform ${platformToUpgradeUUID} has closed. Looking to launch target manifest: ${targetManifestUrl}`
				);
				window.fin.Application.startFromManifest(targetManifestUrl)
					.then(async (platform) => {
						console.log('Upgraded platform has been launched. Closing upgrade agent', platform);
						await app.quit(true);
						return true;
					})
					.catch((err) => console.log(err));
			} catch (error) {
				console.error('Error while trying to launch platform manifest.', error);
			}
		});
		await platformToUpgrade.quit();
	} catch (error) {
		console.error('Unable to get parent app uuid. Closing...', error);
		await app.quit(true);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	init()
		.then((success) => {
			console.log('successfully ran manifest launcher.', success);
			return true;
		})
		.catch((reason) => {
			console.error('Unable to run agent for the following reason.', reason);
		});
});
