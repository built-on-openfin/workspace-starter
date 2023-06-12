import { Storefront, StorefrontTemplate, type StoreRegistration } from "@openfin/workspace";
import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap
} from "@openfin/workspace-platform";
import { DEVELOPER_CONTENT, EXPERO_APP, OPENFIN_INFORMATION_APP, PROCESS_MANAGER, launchApp } from "./apps";

/**
 * Register with the store component.
 * @param id The id to register the provider with.
 * @param title The title to use for the store registration.
 * @param icon The icon to use for the store registration.
 * @returns The registration details for home.
 */
export async function register(
	id: string,
	title: string,
	icon: string
): Promise<StoreRegistration | undefined> {
	console.log("Initializing the storefront provider.");
	try {
		const metaInfo = await Storefront.register({
			id,
			title,
			icon,
			getNavigation: async () => [
				{
					id: "apps",
					title: "Apps",
					items: [
						{
							id: "view",
							title: "Views",
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [OPENFIN_INFORMATION_APP, EXPERO_APP]
							}
						},
						{
							id: "page",
							title: "Pages",
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [DEVELOPER_CONTENT]
							}
						},
						{
							id: "manifest",
							title: "Tools",
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [PROCESS_MANAGER]
							}
						}
					]
				}
			],
			getLandingPage: async () => ({
				hero: {
					title: "Custom Hero Title",
					description: "This is a demonstration of the hero section that you can configure for your store.",
					cta: {
						id: "hero-1",
						title: "Hero Apps!",
						templateId: StorefrontTemplate.AppGrid,
						templateData: {
							apps: [OPENFIN_INFORMATION_APP, PROCESS_MANAGER]
						}
					},
					image: {
						src: "http://localhost:8080/common/images/store/superhero-unsplash.jpg"
					}
				},
				topRow: {
					title: "Custom Top Row Content",
					items: [
						{
							id: "top-row-item-1",
							title: "Expero",
							description:
								"A collection of example views from Expero showing the power of interop and context sharing.",
							image: {
								src: "http://localhost:8080/common/images/store/coding-1-unsplash.jpg"
							},
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [EXPERO_APP]
							},
							buttonTitle: "Expero Apps"
						},
						{
							id: "top-row-item-2",
							title: "Dev Tools",
							description:
								"A collection of developer tools that can aid with building and debugging OpenFin applications.",
							image: {
								src: "http://localhost:8080/common/images/store/coding-2-unsplash.jpg"
							},
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [PROCESS_MANAGER]
							},
							buttonTitle: "View Tools"
						}
					]
				},
				middleRow: {
					title: "A collection of simple views that show how to share context using the Interop API.",
					apps: [EXPERO_APP]
				},
				bottomRow: {
					title: "Quick Access",
					items: [
						{
							id: "bottom-row-item-1",
							title: "Views",
							description: "A collection of views made available through our catalog.",
							image: {
								src: "http://localhost:8080/common/images/store/coding-4-unsplash.jpg"
							},
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [OPENFIN_INFORMATION_APP, EXPERO_APP]
							},
							buttonTitle: "See Views"
						},
						{
							id: "bottom-row-item-2",
							title: "Web Apps",
							description: "A collection of web apps built using OpenFin.",
							image: {
								src: "http://localhost:8080/common/images/store/coding-5-unsplash.jpg"
							},
							templateId: StorefrontTemplate.AppGrid,
							templateData: {
								apps: [PROCESS_MANAGER]
							},
							buttonTitle: "See Web Apps"
						}
					]
				}
			}),
			getFooter: async () => ({
				logo: { src: "http://localhost:8080/favicon.ico", size: "32" },
				text: "Welcome to the OpenFin Sample Footer",
				links: [
					{
						title: "Github",
						url: "https://github.com/built-on-openfin/workspace-starter"
					},
					{
						title: "YouTube",
						url: "https://www.youtube.com/user/OpenFinTech"
					}
				]
			}),
			getApps: async () => [OPENFIN_INFORMATION_APP, EXPERO_APP, PROCESS_MANAGER],
			launchApp: async (app) => {
				await launchApp(app);
			}
		});
		console.log("Storefront provider initialised.", metaInfo);
		return metaInfo;
	} catch (err) {
		console.error("An error was encountered while trying to register the content store provider", err);
	}
}

/**
 * Get the actions that will be triggered by the button clicks.
 * The action are added to the workspace platform when it is created.
 * @returns The maps of the custom actions.
 */
export function storeGetCustomActions(): CustomActionsMap {
	return {
		"open-web-site": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.StoreCustomButton) {
				window.open(payload.customData?.url as string);
			}
		},
		"launch-app": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.StoreCustomButton) {
				const apps = [OPENFIN_INFORMATION_APP, EXPERO_APP, PROCESS_MANAGER, DEVELOPER_CONTENT];
				const app = apps.find((a) => a.appId === payload.appId);
				if (app) {
					await launchApp(app);
				}
			}
		}
	};
}
