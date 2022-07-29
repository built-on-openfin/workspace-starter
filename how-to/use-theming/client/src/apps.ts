import { App } from "@openfin/workspace";

export async function getApps(): Promise<App[]> {
	return [experoApp, notificationStudio, processManager, developerContent];
}

export const experoApp: App = {
	appId: "expero-company-news",
	title: "Gateway - Company News",
	manifest: "https://openfin-iex.experolabs.com/openfin/manifests/company-news.json",
	manifestType: "view",
	icons: [
		{
			src: "https://openfin-iex.experolabs.com/favicon.ico"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "Expero",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/expero-news-view.png"
		}
	],
	tags: ["expero", "view", "interop"]
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
			src: "http://localhost:8080/common/images/previews/openfin-notification-studio.png"
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
	manifest: "https://cdn.openfin.co/process-manager/app.json",
	icons: [{ src: "https://cdn.openfin.co/process-manager/img/proc-mgr-icon.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/openfin-process-manager.png"
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
	manifest: "http://localhost:8080/common/snapshots/snapshot.json",
	icons: [{ src: "http://localhost:8080/common/images/icon-blue.png" }],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/openfin-page-docs.png"
		}
	],
	tags: ["page"]
};
