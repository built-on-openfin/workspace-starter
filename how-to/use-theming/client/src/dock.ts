import { Dock, DockButtonNames, DockProvider } from "@openfin/workspace";

const providerId = "use-theming";

export async function register() {
	console.log("Initialising the dock provider.");
	const provider = await getDockProvider();
	try {
		await Dock.register(provider);
		console.log("Dock provider initialised.");
	} catch (err) {
		console.error("An error was encountered while trying to register the content dock provider", err);
	}
}

export async function deregister() {
	return Dock.deregister();
}

export async function show() {
	console.log("Showing the dock.");
	return Dock.show();
}

export async function minimize() {
	console.log("Minimizing the dock.");
	return Dock.minimize();
}

async function getDockProvider(): Promise<DockProvider> {
	console.log("Getting the dock provider.");

	const webRoot = window.location.href.replace("platform/provider.html", "");

	return {
		id: providerId,
		title: "Theming Dock",
		icon: `${webRoot}favicon.ico`,
		workspaceComponents: {
			hideHomeButton: true,
			hideNotificationsButton: true,
			hideStorefrontButton: true,
			hideWorkspacesButton: true
		},
		buttons: [
			{
				tooltip: "Google",
				iconUrl: "https://www.google.com/favicon.ico",
				action: {
					id: "launch-google"
				}
			},
			{
				tooltip: "Bing",
				iconUrl: "https://www.bing.com/favicon.ico",
				action: {
					id: "launch-bing"
				}
			},
			{
				type: DockButtonNames.DropdownButton,
				tooltip: "Social",
				iconUrl: `${webRoot}favicon.ico`,
				options: [
					{
						tooltip: "Twitter",
						action: {
							id: "launch-tools",
							customData: "twitter"
						}
					},
					{
						tooltip: "Facebook",
						action: {
							id: "launch-tools",
							customData: "facebook"
						}
					}
				]
			}
		]
	};
}
