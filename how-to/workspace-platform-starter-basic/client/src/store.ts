import { Storefront, StorefrontTemplate, type App, type StoreRegistration } from "@openfin/workspace";
import { launchApp } from "./launch";
import type { PlatformSettings } from "./shapes";

/**
 * Register with the store component.
 * @param platformSettings The platform settings from the manifest.
 * @param apps The list of apps from the manifest.
 * @returns The registration details for home.
 */
export async function register(
	platformSettings: PlatformSettings,
	apps?: App[]
): Promise<StoreRegistration | undefined> {
	console.log("Initializing the storefront provider.");
	try {
		const metaInfo = await Storefront.register({
			...platformSettings,
			getNavigation: async () => [
				{
					id: "apps",
					title: "Apps",
					items: [
						{
							id: "all-apps",
							title: "All Apps",
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: apps ?? []
							}
						}
					]
				}
			],
			getLandingPage: async () => ({
				topRow: {
					title: "Custom Top Row Content",
					items: [
						{
							id: "top-row-item-1",
							title: "All Apps",
							description: "All of your applications.",
							image: {
								src: platformSettings.icon
							},
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: apps ?? []
							}
						}
					]
				},
				middleRow: {
					title: "",
					apps: []
				},
				bottomRow: {
					title: "",
					items: []
				}
			}),
			getFooter: async () => ({
				logo: { src: platformSettings.icon, size: "32" },
				text: platformSettings.title,
				links: []
			}),
			getApps: async () => apps ?? [],
			launchApp: async (app) => {
				await launchApp(app);
			}
		});
		console.log("Storefront provider initialized.", metaInfo);
		return metaInfo;
	} catch (err) {
		console.error("An error was encountered while trying to register the content store provider", err);
	}
}
