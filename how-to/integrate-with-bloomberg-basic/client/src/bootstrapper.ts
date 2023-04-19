export async function init() {
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await fin.Platform.getCurrentSync().quit();
	});
}
