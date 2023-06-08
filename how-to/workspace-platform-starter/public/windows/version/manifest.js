/**
 * Initialize.
 */
async function init() {
	if (window.fin !== undefined) {
		try {
			const currentWindow = fin.Window.getCurrentSync();
			const options = await currentWindow.getOptions();
			const customData = options.customData ?? {};

			const targetManifestUrl = customData.manifest;
			const manifestLauncherUrl = customData.launcherUrl;
			const targetManifestLabel = document.querySelector('#target-manifest');
			targetManifestLabel.textContent = targetManifestLabel;

			if (targetManifestUrl !== undefined && manifestLauncherUrl !== undefined) {
				console.log(
					`Launching manifest launcher with url: ${manifestLauncherUrl} and manifest: ${targetManifestUrl}`
				);

				const upgradeAppId = `${fin.me.identity.uuid}-manifest-launcher`;
				const upgradeAppUrl = `${manifestLauncherUrl}?manifest=${encodeURIComponent(targetManifestUrl)}`;
				await fin.Application.start({
					uuid: upgradeAppId,
					name: upgradeAppId,
					url: upgradeAppUrl,
					autoShow: false
				});
			} else {
				console.error('Manifest or launcherUrl not provided so unable to continue.');
			}
		} catch (error) {
			console.error(
				'Error encountered while trying to launch manifest launcher. A real implementation would include a fallback behavior.',
				error
			);
		}
	}
}
window.addEventListener('DOMContentLoaded', () => {
	init()
		.then((success) => {
			console.log('successfully ran upgrade.', success);
			return true;
		})
		.catch((reason) => {
			console.error('Unable to run upgrade for the following reason.', reason);
		});
});
