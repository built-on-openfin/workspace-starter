import { init } from "@openfin/workspace-platform";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	await initializeWorkspacePlatform();

	// Initialize the application
	await initializeApplication();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initialising workspace platform");
	await init({ browser: {} });
}

/**
 * Initialize the application.
 */
async function initializeApplication(): Promise<void> {
	console.log("Initialising the authentication");

	// On an initial login with no valid auth cookie the provider.html
	// request to the web server will be redirected to the content of the
	// login.html page. The code in provider.ts will only be executed
	// when the web server allows access to the real provider.html
	const providerWindow = fin.Window.getCurrentSync();

	// We must make sure the provider window is hidden as it might
	// have been shown for the login page
	await providerWindow.hide();
	await providerWindow.once("close-requested", async () => {
		await fin.Platform.getCurrentSync().quit();
	});

	// If this code for the provider is executing then the web server
	// must have served the real provider.html which loads this code
	// and not the login page, so we can create a real app
	const appWin = await fin.Window.create({
		name: "integrate-with-server-authentication",
		autoShow: true,
		defaultCentered: true,
		defaultHeight: 800,
		defaultWidth: 1000,
		url: "http://localhost:8080/app"
	});

	// When the application window closes also close the platform
	await appWin.addListener("closed", async () => {
		const currentPlatform = await fin.Platform.getCurrent();
		await currentPlatform.quit();
	});
}
