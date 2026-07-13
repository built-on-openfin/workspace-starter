import type { fin as FinApi } from "@openfin/core";
import { CLIDispatchedSearchResult, CLITemplate, Dock, DockButtonNames, Home, Storefront } from "@openfin/workspace";
import * as WorkspacePlatform from "@openfin/workspace-platform";
import { HomeSearchResponse } from "@openfin/workspace";
import * as Notifications from "@openfin/workspace/notifications";
declare global {
	const fin: typeof FinApi;
}

const PLATFORM_ID = "fixture-platform";

const searchTags = ["appasset", "developer", "dock", "intent", "interop", "native", "openfin", "tools", "view"];

async function main(): Promise<void> {
	await WorkspacePlatform.init({
		browser: {}
	});

	const allResults = [
		{
			key: "view1",
			title: "View 1",
			actions: [{ name: "Launch View", hotkey: "enter" }],
			template: CLITemplate.Custom,
			templateContent: {
				layout: { type: "Container" },
				data: {}
			}
		},
		{
			key: "interop-broadcast-view",
			title: "Interop Broadcast View",
			actions: [],
			template: CLITemplate.Custom,
			templateContent: {
				layout: { type: "Container" },
				data: {}
			}
		},
		{
			key: "interop-intent-view",
			title: "Intents using Interop API",
			actions: [],
			template: CLITemplate.Custom,
			templateContent: {
				layout: {
					type: "Container",
					children: [
						{
							type: "Text",
							dataKey: "title"
						},
						{
							type: "Text",
							dataKey: "description"
						}
					]
				},
				data: {
					title: "Intents using Interop API",
					description:
						"This is an example of firing and listening to intents using the interop api and seeing a code sample of how to do it."
				}
			}
		},
		{
			key: "winform-interop-example",
			title: "Winform Interop Example",
			actions: [],
			template: CLITemplate.Custom,
			templateContent: {
				layout: { type: "Container" },
				data: {}
			}
		}
	];

	await Home.register({
		id: "fixture-platform",
		title: "Fixture Platform",
		icon: "/favicon.ico",
		onResultDispatch: async (result: CLIDispatchedSearchResult): Promise<void> => {
			if (result.key === "view1") {
				const platform = fin.Platform.getCurrentSync();
				await platform.createView({ url: "http://localhost:8080/view1.html", name: "view1" });
			}
		},
		onUserInput: async ({ query }): Promise<HomeSearchResponse> => {
			const lowerQuery = (query ?? "").toLowerCase();
			const results =
				lowerQuery.length === 0
					? allResults
					: allResults.filter(
							(r) =>
								r.key.toLowerCase().includes(lowerQuery) || r.title.toLowerCase().includes(lowerQuery)
						);
			return {
				results: results as typeof allResults,
				context: {
					filters: [
						{
							id: "tags",
							title: "Tags",
							options: searchTags.map((tag) => ({ value: tag, isSelected: false }))
						}
					]
				}
			};
		}
	});

	await Dock.register({
		id: PLATFORM_ID,
		title: "Fixture Platform",
		icon: "/favicon.ico",
		workspaceComponents: { hideHomeButton: false, hideStorefrontButton: false },
		buttons: [
			{
				tooltip: "View 1",
				iconUrl: "/favicon.ico",
				action: { id: "launch-view-1" }
			},
			{
				type: DockButtonNames.DropdownButton,
				tooltip: "OpenFin",
				iconUrl: "/favicon.ico",
				options: [
					{
						tooltip: "OpenFin",
						action: { id: "launch-openfin" }
					}
				]
			}
		]
	});

	await Storefront.register({
		id: PLATFORM_ID,
		title: "Fixture Platform Store",
		icon: "/favicon.ico",
		getApps: async () => [],
		getLandingPage: async () => ({
			topRow: { title: "Top Row", items: [] },
			middleRow: { title: "Middle Row", apps: [] },
			bottomRow: { title: "Bottom Row", items: [] }
		}),
		getNavigation: async () => [],
		getFooter: async () => ({ logo: { src: "/favicon.ico" }, text: "Fixture Platform", links: [] }),
		launchApp: async () => {}
	});

	try {
		await Notifications.register();
		await Notifications.create({
			platform: PLATFORM_ID,
			title: "Fixture Platform",
			body: "The fixture platform is ready.",
			toast: "transient",
			category: "default",
			template: "markdown"
		});
	} catch {
		// Notifications may not be available in all environments
	}

	await Home.show();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await Home.deregister(PLATFORM_ID);
		await Dock.deregister();
		await Storefront.deregister(PLATFORM_ID);
		try {
			await Notifications.deregister(PLATFORM_ID);
		} catch {
			// Notifications may not have been registered
		}
		await fin.Platform.getCurrentSync().quit();
	});
}

main().catch((err) => {
	document.body.textContent = `Provider error: ${err}`;
	console.error("Provider initialization failed:", err);
});
