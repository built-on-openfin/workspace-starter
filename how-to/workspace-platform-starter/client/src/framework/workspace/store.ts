import {
	Storefront,
	StorefrontTemplate,
	type RegistrationMetaInfo,
	type StorefrontDetailedNavigationItem,
	type StorefrontFooter,
	type StorefrontLandingPage,
	type StorefrontNavigationItem,
	type StorefrontNavigationSection,
	type StorefrontProvider
} from "@openfin/workspace";
import { getApps, getAppsByTag } from "../apps";
import { launch } from "../launch";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";
import type {
	CustomSettings,
	StorefrontProviderOptions,
	StorefrontSettingsLandingPageRow,
	StorefrontSettingsNavigationItem
} from "../shapes";
import type { PlatformApp } from "../shapes/app-shapes";
import { isEmpty } from "../utils";

const logger = createLogger("Store");

let isStoreRegistered = false;
let registrationInfo: RegistrationMetaInfo;

export async function register(): Promise<RegistrationMetaInfo> {
	logger.info("Initializing the storefront provider");
	const provider = await getStoreProvider();
	if (!isEmpty(provider)) {
		try {
			registrationInfo = await Storefront.register(provider);
			logger.info("Version:", registrationInfo);
			isStoreRegistered = true;
			logger.info("Storefront provider initialized");
			return registrationInfo;
		} catch (err) {
			logger.error("An error was encountered while trying to register the content store provider", err);
			return null;
		}
	}
}

export async function deregister() {
	if (isStoreRegistered) {
		const settings = await getSettings();
		logger.info("About to deregister Store.");
		await Storefront.deregister(settings.storefrontProvider.id);
	} else {
		logger.warn(
			"Unable to call store deregister as there is an indication it was never registered successfully."
		);
	}
}

export async function show() {
	logger.info("Showing the store.");
	return Storefront.show();
}

export async function hide() {
	logger.info("Hiding the store.");
	return Storefront.hide();
}

/**
 * This function is used when a navigation item or section hasn't been configured with an ID. This is to simplify configuration for this demo.
 * In a real application you would need an idempotent and unique ID (think GUID) that doesn't change for that navigation item/section regardless of how
 * many times it is regenerated (e.g. more items can be added to the item/section but the ID stays the same).
 * As you navigate around the store this ID is used as a route. So if a user clicks on a link, navigates to a new page and the re-requested navigation item has
 * a different ID then the store will not be able to find a match and it won't be able to render the navigation item.
 * A real application would not use this approach (as an update to the tag list would result in a new ID which would fail if the config was fetched from a server and not a manifest)
 */
function getId(title: string, tags: string[] = []) {
	const search = " ";
	const replaceWith = "-";
	let result = title.replaceAll(search, replaceWith);
	result += `-${tags.join("-")}`;
	return result.toLowerCase();
}

function isStorefrontConfigurationValid(config: CustomSettings): boolean {
	const idList = [];
	let hasDuplicateIds = false;

	if (
		isEmpty(config) ||
		isEmpty(config.storefrontProvider) ||
		isEmpty(config.storefrontProvider.id) ||
		isEmpty(config.storefrontProvider.title) ||
		(isEmpty(config.storefrontProvider.footer) &&
			!isEmpty(config.storefrontProvider.landingPage) &&
			!isEmpty(config.storefrontProvider.landingPage.topRow) &&
			!isEmpty(config.storefrontProvider.landingPage.middleRow) &&
			!isEmpty(config.storefrontProvider.landingPage.bottomRow) &&
			!isEmpty(config.storefrontProvider.navigation))
	) {
		logger.error(
			"StorefrontProvider is not correctly configured in the customSettings of this manifest. You must ensure that storefrontProvider is defined, that it has an id and title and that the footer, landingPage (top row, middle row and bottom row) and navigation sections have been defined"
		);
		return false;
	}

	const validateId = (id: string, namespace: string, warning: string) => {
		if (isEmpty(id)) {
			logger.warn(`${namespace}: ${warning}`);
		} else if (idList.includes(id)) {
			hasDuplicateIds = true;
			logger.error(
				`${namespace}: The id is used in more than one place. Please have a unique and idempotent id: ${id}`
			);
		} else {
			idList.push(id);
		}
	};

	const warningMessage =
		"The id is not defined. This demo will generate an id based on title but you should have a unique and idempotent id when building your own store";

	logger.info("Validating settings storefrontProvider navigation config");
	const navigation = config.storefrontProvider.navigation;
	for (let i = 0; i < navigation.length; i++) {
		validateId(navigation[i].id, `storefrontProvider.navigation[${i}].id`, warningMessage);
		const items = navigation[i].items;
		for (let n = 0; n < items.length; n++) {
			validateId(items[n].id, `storefrontProvider.navigation[${i}].items[${n}].id`, warningMessage);
		}
	}

	logger.info("Validating settings storefrontProvider landing page hero config");
	const landingPage = config.storefrontProvider.landingPage;

	if (!isEmpty(landingPage?.hero?.cta)) {
		validateId(landingPage.hero.cta.id, "storefrontProvider.landingPage.hero.cta.id", warningMessage);
	}

	logger.info("Validating settings storefrontProvider landing page top row config");
	const topRow = landingPage.topRow;

	if (!isEmpty(topRow.items)) {
		for (let i = 0; i < topRow.items.length; i++) {
			validateId(topRow.items[i].id, `storefrontProvider.landingPage.topRow.items[${i}].id`, warningMessage);
		}
	}

	logger.info("Validating settings storefrontProvider landing page bottom row config");
	const bottomRow = landingPage.bottomRow;
	if (!isEmpty(bottomRow.items)) {
		for (let i = 0; i < bottomRow.items.length; i++) {
			validateId(
				bottomRow.items[i].id,
				`storefrontProvider.landingPage.bottomRow.items[${i}].id`,
				warningMessage
			);
		}
	}

	logger.info("Validating ids, checking for duplicate ids");
	if (hasDuplicateIds) {
		logger.error(
			"You have defined duplicate ids (please see the other error messages) which could result in strange behavior (if we are routing by id and you have two or more items that resolve to the same id then it could navigate to something unexpected. Please ensure ids are unique and idempotent"
		);
		return false;
	}

	return true;
}

async function getStoreProvider(): Promise<StorefrontProvider> {
	logger.info("Getting the store provider");
	const settings = await getSettings();
	if (isStorefrontConfigurationValid(settings)) {
		return {
			id: settings.storefrontProvider.id,
			title: settings.storefrontProvider.title,
			icon: settings.storefrontProvider.icon,
			getNavigation: getNavigation.bind(this),
			getLandingPage: getLandingPage.bind(this),
			getFooter: getFooter.bind(this),
			getApps: async () => addButtons(settings.storefrontProvider, await getApps({ private: false })),
			launchApp: async (app) => {
				await launch(app as PlatformApp);
			}
		};
	}
	return null;
}

async function getNavigation(): Promise<[StorefrontNavigationSection?, StorefrontNavigationSection?]> {
	logger.info("Showing the store navigation");
	const navigationSectionItemLimit = 5;
	const navigationSectionLimit = 2;
	const settings = await getSettings();
	const navigationSections: [StorefrontNavigationSection?, StorefrontNavigationSection?] = [];

	if (isEmpty(settings?.storefrontProvider?.navigation)) {
		return [];
	}

	for (const navItem of settings.storefrontProvider.navigation) {
		if (navigationSections.length === navigationSectionLimit) {
			logger.info(
				"More than 2 navigation sections defined in StorefrontProvider settings. Only two are taken"
			);
			break;
		}
		const navigationSection: StorefrontNavigationSection = {
			id: navItem.id ?? getId(navItem.title),
			title: navItem.title,
			items: (await getNavigationItems(navItem.items, navigationSectionItemLimit)) as [
				StorefrontNavigationItem,
				StorefrontNavigationItem?,
				StorefrontNavigationItem?,
				StorefrontNavigationItem?,
				StorefrontNavigationItem?
			]
		};
		navigationSections.push(navigationSection);
	}

	return navigationSections;
}

async function getLandingPage(): Promise<StorefrontLandingPage> {
	logger.info("Getting the store landing page");
	const landingPage: StorefrontLandingPage = {
		topRow: null,
		middleRow: null,
		bottomRow: null
	};

	const settings = await getSettings();
	const storeFrontDetailedNavigationItemBottomRowLimit = 3;
	const storeFrontDetailedNavigationItemTopRowLimit = 4;
	const middleRowAppLimit = 6;

	if (!isEmpty(settings?.storefrontProvider?.landingPage?.hero)) {
		const hero = settings.storefrontProvider.landingPage.hero;
		const cta = await getNavigationItem(hero.cta.id, hero.cta.title, hero.cta.tags);
		landingPage.hero = {
			title: hero.title,
			image: hero.image,
			description: hero.description,
			cta
		};
	}

	if (!isEmpty(settings?.storefrontProvider?.landingPage?.topRow)) {
		const row = await getLandingPageRow(
			settings?.storefrontProvider?.landingPage?.topRow,
			storeFrontDetailedNavigationItemTopRowLimit
		);
		landingPage.topRow = {
			title: row.title,
			items: row.items as [
				StorefrontDetailedNavigationItem?,
				StorefrontDetailedNavigationItem?,
				StorefrontDetailedNavigationItem?,
				StorefrontDetailedNavigationItem?
			]
		};
	} else {
		logger.error("You need to have a topRow defined in your landing page");
	}

	if (!isEmpty(settings?.storefrontProvider?.landingPage?.middleRow)) {
		const middleRow = settings.storefrontProvider.landingPage.middleRow;
		const middleRowApps = await getAppsByTag(middleRow.tags, false, { private: false });
		if (middleRowApps.length > middleRowAppLimit) {
			logger.warn(
				`Too many apps (${
					middleRowApps.length
				}) have been returned by the middle row tag definition ${middleRow.tags.join(
					" "
				)}. Only ${middleRowAppLimit} will be shown.`
			);
		}
		const validatedMiddleRowApps = addButtons(
			settings.storefrontProvider,
			middleRowApps.slice(0, middleRowAppLimit)
		) as [PlatformApp?, PlatformApp?, PlatformApp?, PlatformApp?, PlatformApp?, PlatformApp?];
		landingPage.middleRow = {
			title: middleRow.title,
			apps: validatedMiddleRowApps
		};
	} else {
		logger.error("You need to have a middleRow defined in your landing page");
	}

	if (!isEmpty(settings?.storefrontProvider?.landingPage?.bottomRow)) {
		const row = await getLandingPageRow(
			settings.storefrontProvider.landingPage.bottomRow,
			storeFrontDetailedNavigationItemBottomRowLimit
		);
		landingPage.bottomRow = {
			title: row.title,
			items: row.items as [
				StorefrontDetailedNavigationItem?,
				StorefrontDetailedNavigationItem?,
				StorefrontDetailedNavigationItem?
			]
		};
	} else {
		logger.error("You need to have a bottomRow defined in your landing page");
	}

	return landingPage;
}

async function getFooter(): Promise<StorefrontFooter> {
	logger.info("Getting the store footer");
	const settings = await getSettings();
	if (!isEmpty(settings?.storefrontProvider?.footer)) {
		return settings.storefrontProvider.footer;
	}
	logger.error("Storefront is being initialized without a footer configured");
	return null;
}

/**
 * This section generates a navigation item for Storefront based on some configuration.
 * @param id
 * This id should be unique and idempotent and isn't changed regardless of how often the same navigation item is regenerated.
 * The reason for this is because it is used for routing in Storefront. If a user navigated from a link and the id changes when the item
 * is re-requested by storefront then it will not be able to render the contents.
 * @param title
 * @param tags
 * Tags are used as a way of filtering out which apps should be assigned to a StorefrontNavigationItem.
 * This allows apps to be tagged on the server and the store would automatically update the apps assigned to a particular section.
 * @returns StorefrontNavigationItem
 */
async function getNavigationItem(
	id: string,
	title: string,
	tags: string[]
): Promise<StorefrontNavigationItem> {
	const navigationItem: StorefrontNavigationItem = {
		id: id ?? getId(title, tags),
		title,
		templateId: StorefrontTemplate.AppGrid,
		templateData: {
			apps: []
		}
	};

	const apps = await getAppsByTag(tags, false, { private: false });

	if (!isEmpty(apps) && apps.length > 0) {
		navigationItem.templateData.apps = apps;
	}

	return navigationItem;
}

async function getNavigationItems(items: StorefrontSettingsNavigationItem[], limit: number) {
	const navigationItems: StorefrontNavigationItem[] = [];

	for (const navItem of items) {
		const navigationItem = await getNavigationItem(navItem.id, navItem.title, navItem.tags);
		navigationItems.push(navigationItem);
	}

	if (navigationItems.length > limit) {
		logger.warn(
			`You have defined too many navigation items (${navigationItems.length}). Please limit it to ${limit} as we will only take the first ${limit}`
		);
	}
	return navigationItems.slice(0, limit);
}

async function getLandingPageRow(definition: StorefrontSettingsLandingPageRow, limit: number) {
	const items: StorefrontDetailedNavigationItem[] = [];

	for (const item of definition.items) {
		const navigationItem = await getNavigationItem(item.id, item.title, item.tags);
		const navItem: StorefrontDetailedNavigationItem = {
			description: item.description,
			image: item.image,
			buttonTitle: item.buttonTitle,
			...navigationItem
		};
		items.push(navItem);
	}

	if (items.length > limit) {
		logger.warn(
			`You have defined too many storefront detailed navigation items (${items.length}). Please keep it to the limit of ${limit} as only the first ${limit} will be returned.`
		);
	}

	const detailedNavigationItems = items.slice(0, limit);

	return {
		title: definition.title,
		items: detailedNavigationItems
	};
}

function addButtons(options: StorefrontProviderOptions, apps: PlatformApp[]): PlatformApp[] {
	if (options.primaryButton || Array.isArray(options.secondaryButtons)) {
		return apps.map((app) => ({
			...app,
			primaryButton: app.primaryButton ?? options.primaryButton,
			secondaryButtons:
				app.secondaryButtons ?? Array.isArray(options.secondaryButtons)
					? options.secondaryButtons.map((secondary) => ({
							title: secondary.title,
							action: {
								id: secondary.action.id,
								customData: secondary.action.customData ?? app
							}
					  }))
					: undefined
		}));
	}

	return apps;
}
