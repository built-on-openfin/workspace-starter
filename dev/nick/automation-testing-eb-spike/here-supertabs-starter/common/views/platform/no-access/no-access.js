const appId = document.querySelector('#appId');

/**
 * Init the content.
 */
async function init() {
	let deniedAppId = 'Unknown';
	if (window.fin) {
		const options = await fin.me.getOptions();
		if (options?.customData?.appId !== undefined) {
			deniedAppId = options.customData.appId;
		}
		if (appId) {
			appId.textContent = deniedAppId;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		init();
	} catch (error) {
		console.error(error);
	}
});
