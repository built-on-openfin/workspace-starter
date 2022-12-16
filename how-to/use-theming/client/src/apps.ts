import type { App } from "@openfin/workspace";

export async function getApps(): Promise<App[]> {
	return [themeBuilderApp, notificationStudio, processManager, developerContent];
}

const webRoot = window.location.href.replace("platform/provider.html", "");

export const themeBuilderApp: App = {
	appId: "theme-definition-builder",
	title: "Theme Definition Builder",
	description: "A tool to help in the building of a theme.",
	manifest:
		"https://samples.openfin.co/dev-extensions/extensions/v1.1.0/branding/theme-definition-builder/theme-definition-builder-view.json",
	manifestType: "view",
	icons: [{ src: `${webRoot}common/images/icon-blue.png` }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "https://samples.openfin.co/dev-extensions/extensions/v1.1.0/branding/images/previews/theme-definition-builder.png"
		}
	],
	tags: ["view", "theme", "tool"]
};

export const notificationStudio: App = {
	appId: "notifications-generator",
	title: "OpenFin Notifications Studio",
	manifestType: "manifest",
	description:
		"Notifications Studio: This is OpenFin's tool for demonstrating the power of our Notification Center. Use it to create local notifications or use some of the examples shown in our Catalog. Experiment with our features and see the power that OpenFin Notification Center can bring to your applications.",
	manifest: "https://cdn.openfin.co/studio/notification/app.json",
	icons: [
		{
			src: "https://cdn.openfin.co/demos/notifications/generator/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: `${webRoot}common/images/previews/openfin-notification-studio.png`
		}
	],
	tags: ["hero", "manifest", "tools"]
};

export const processManager: App = {
	appId: "openfin-process-manager",
	title: "OpenFin Process Manager",
	manifestType: "manifest",
	description:
		"Process Manager: This is OpenFin's tool for helping developers build OpenFin Applications. It lets you see the OpenFin applications that are running, the performance of the applications (memory and cpu) and easy access to the dev tools for the Windows of your application.",
	manifest: "https://cdn.openfin.co/release/apps/openfin/processmanager/app.json",
	icons: [{ src: "https://cdn.openfin.co/release/apps/openfin/processmanager/2.0.2/ofpm-icon.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: `${webRoot}common/images/previews/openfin-process-manager.png`
		}
	],
	tags: ["hero", "manifest", "tools"]
};

export const developerContent: App = {
	appId: "openfin-developer-page",
	title: "OpenFin Developer Docs",
	manifestType: "snapshot",
	description:
		"Shows a collection of OpenFin developer pages and provides an example of how you can present a pre-built page as a launch target in OpenFin Home. This entry has a manifest type of 'snapshot'.",
	manifest: `${webRoot}common/snapshots/snapshot.json`,
	icons: [{ src: `${webRoot}common/images/icon-blue.png` }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: `${webRoot}common/images/previews/openfin-page-docs.png`
		}
	],
	tags: ["page"]
};
