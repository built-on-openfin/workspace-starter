import {
	Storefront,
	type StorefrontFooter,
	type StorefrontLandingPage,
	type StorefrontNavigationSection,
	StorefrontTemplate,
	type StoreRegistration
} from "@openfin/workspace";
import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap
} from "@openfin/workspace-platform";
import {
	DEVELOPER_CONTENT,
	EXPERO_APP,
	NOTIFICATION_STUDIO,
	PROCESS_MANAGER,
	getApps,
	launchApp
} from "./apps";

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
	console.log("Initialising the storefront provider.");
	try {
		const metaInfo = await Storefront.register({
			id,
			title,
			icon,
			getNavigation: buildNavigation,
			getLandingPage: buildLandingPage,
			getFooter: buildFooter,
			getApps,
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
 * Build the navigation sections for the store.
 * @returns The navigation sections.
 */
async function buildNavigation(): Promise<[StorefrontNavigationSection?, StorefrontNavigationSection?]> {
	console.log("Showing the store navigation.");

	const navigationSections: [StorefrontNavigationSection?, StorefrontNavigationSection?] = [
		{
			id: "apps",
			title: "Apps",
			items: [
				{
					id: "view",
					title: "Views",
					templateId: StorefrontTemplate.AppGrid,
					templateData: {
						apps: [EXPERO_APP]
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
					title: "Web Apps",
					templateId: StorefrontTemplate.AppGrid,
					templateData: {
						apps: [NOTIFICATION_STUDIO, PROCESS_MANAGER]
					}
				}
			]
		}
	];

	return navigationSections;
}

/**
 * Build the content for the landing page.
 * @returns The store landing page content.
 */
async function buildLandingPage(): Promise<StorefrontLandingPage> {
	console.log("Getting the store landing page.");

	const landingPage: StorefrontLandingPage = {
		hero: {
			title: "Custom Hero Title",
			description: "This is a demonstration of the hero section that you can configure for your store.",
			cta: {
				id: "hero-1",
				title: "Hero Apps!",
				templateId: StorefrontTemplate.AppGrid,
				templateData: {
					apps: [NOTIFICATION_STUDIO, PROCESS_MANAGER]
				}
			},
			image: {
				src: "http://localhost:8080/common/images/superhero-unsplash.jpg"
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
						src: "http://localhost:8080/common/images/coding-1-unsplash.jpg"
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
						src: "http://localhost:8080/common/images/coding-2-unsplash.jpg"
					},
					templateId: StorefrontTemplate.AppGrid,
					templateData: {
						apps: [NOTIFICATION_STUDIO, PROCESS_MANAGER]
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
						src: "http://localhost:8080/common/images/coding-4-unsplash.jpg"
					},
					templateId: StorefrontTemplate.AppGrid,
					templateData: {
						apps: [EXPERO_APP]
					},
					buttonTitle: "See Views"
				},
				{
					id: "bottom-row-item-2",
					title: "Web Apps",
					description: "A collection of web apps built using OpenFin.",
					image: {
						src: "http://localhost:8080/common/images/coding-5-unsplash.jpg"
					},
					templateId: StorefrontTemplate.AppGrid,
					templateData: {
						apps: [NOTIFICATION_STUDIO, PROCESS_MANAGER]
					},
					buttonTitle: "See Web Apps"
				}
			]
		}
	};

	return landingPage;
}

/**
 * Build the footer content.
 * @returns The store footer content.
 */
async function buildFooter(): Promise<StorefrontFooter> {
	console.log("Getting the store footer.");
	return {
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
	};
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
				const apps = await getApps();
				const app = apps.find((a) => a.appId === payload.appId);
				if (app) {
					await launchApp(app);
				}
			}
		}
	};
}
