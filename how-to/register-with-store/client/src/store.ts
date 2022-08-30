import {
	Storefront,
	StorefrontLandingPage,
	StorefrontNavigationSection,
	StorefrontFooter,
	App,
	StorefrontProvider,
	StorefrontTemplate,
	StorefrontNavigationItem,
	StorefrontDetailedNavigationItem
} from "@openfin/workspace";
import { getApps, getAppsByTag } from "./apps";
import { launch } from "./launch";
import { getSettings } from "./settings";
import type {
	CustomSettings,
	StorefrontSettingsLandingPageRow,
	StorefrontSettingsNavigationItem
} from "./shapes";

let isStoreRegistered = false;

export async function register() {
	console.log("Initialising the storefront provider.");
	const provider = await getStoreProvider();
	if (provider !== null) {
		try {
			await Storefront.register(provider);
			isStoreRegistered = true;
			console.log("Storefront provider initialised.");
		} catch (err) {
			console.error("An error was encountered while trying to register the content store provider", err);
		}
	}
}

export async function deregister() {
	if (isStoreRegistered) {
		const settings = await getSettings();
		await Storefront.deregister(settings.storefrontProvider.id);
	} else {
		console.warn(
			"Unable to call store deregister as there is an indication it was never registered successfully."
		);
	}
}

export async function show() {
	console.log("Showing the store.");
	return Storefront.show();
}

export async function hide() {
	console.log("Hiding the store.");
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
		config === undefined ||
		config.storefrontProvider === undefined ||
		config.storefrontProvider.id === undefined ||
		config.storefrontProvider.title === undefined ||
		(config.storefrontProvider.footer === undefined &&
			config.storefrontProvider.landingPage !== undefined &&
			config.storefrontProvider.landingPage.topRow !== undefined &&
			config.storefrontProvider.landingPage.middleRow !== undefined &&
			config.storefrontProvider.landingPage.bottomRow !== undefined &&
			config.storefrontProvider.navigation !== undefined)
	) {
		console.error(
			"StorefrontProvider is not correctly configured in the customSettings of this manifest. You must ensure that storefrontProvider is defined, that it has an id and title and that the footer, landingPage (top row, middle row and bottom row) and navigation sections have been defined."
		);
		return false;
	}

	const validateId = (id: string, namespace: string, warning: string) => {
		if (id === undefined) {
			console.warn(`${namespace}: ${warning}`);
		} else if (idList.includes(id)) {
			hasDuplicateIds = true;
			console.error(
				`${namespace}: The id is used in more than one place. Please have a unique and idempotent id: ${id}`
			);
		} else {
			idList.push(id);
		}
	};

	const warningMessage =
		"The id is not defined. This demo will generate an id based on title but you should have a unique and idempotent id when building your own store.";

	console.log("Validating settings storefrontProvider navigation config");
	const navigation = config.storefrontProvider.navigation;
	for (let i = 0; i < navigation.length; i++) {
		validateId(navigation[i].id, `storefrontProvider.navigation[${i}].id`, warningMessage);
		const items = navigation[i].items;
		for (let n = 0; n < items.length; n++) {
			validateId(items[n].id, `storefrontProvider.navigation[${i}].items[${n}].id`, warningMessage);
		}
	}

	console.log("Validating settings storefrontProvider landing page hero config");
	const landingPage = config.storefrontProvider.landingPage;

	if (landingPage?.hero?.cta !== undefined) {
		validateId(landingPage.hero.cta.id, "storefrontProvider.landingPage.hero.cta.id", warningMessage);
	}

	console.log("Validating settings storefrontProvider landing page top row config");
	const topRow = landingPage.topRow;

	if (topRow.items !== undefined) {
		for (let i = 0; i < topRow.items.length; i++) {
			validateId(topRow.items[i].id, `storefrontProvider.landingPage.topRow.items[${i}].id`, warningMessage);
		}
	}

	console.log("Validating settings storefrontProvider landing page bottom row config");
	const bottomRow = landingPage.bottomRow;
	if (bottomRow.items !== undefined) {
		for (let i = 0; i < bottomRow.items.length; i++) {
			validateId(
				bottomRow.items[i].id,
				`storefrontProvider.landingPage.bottomRow.items[${i}].id`,
				warningMessage
			);
		}
	}

	console.log("Validating ids, checking for duplicate ids.");
	if (hasDuplicateIds) {
		console.error(
			"You have defined duplicate ids (please see the other error messages) which could result in strange behaviour (if we are routing by id and you have two or more items that resolve to the same id then it could navigate to something unexpected. Please ensure ids are unique and idempotent."
		);
		return false;
	}

	return true;
}

async function getStoreProvider(): Promise<StorefrontProvider> {
	console.log("Getting the store provider.");
	const settings = await getSettings();
	if (isStorefrontConfigurationValid(settings)) {
		return {
			id: settings.storefrontProvider.id,
			title: settings.storefrontProvider.title,
			icon: settings.storefrontProvider.icon,
			getNavigation: getNavigation.bind(this),
			getLandingPage: getLandingPage.bind(this),
			getFooter: getFooter.bind(this),
			getApps,
			launchApp: launch
		};
	}
	return null;
}

async function getNavigation(): Promise<[StorefrontNavigationSection?, StorefrontNavigationSection?]> {
	console.log("Showing the store navigation.");
	const navigationSectionItemLimit = 5;
	const navigationSectionLimit = 2;
	const settings = await getSettings();
	const navigationSections: [StorefrontNavigationSection?, StorefrontNavigationSection?] = [];

	if (settings?.storefrontProvider?.navigation === undefined) {
		return [];
	}

	for (let i = 0; i < settings.storefrontProvider.navigation.length; i++) {
		if (navigationSections.length === navigationSectionLimit) {
			console.log(
				"More than 2 navigation sections defined in StorefrontProvider settings. Only two are taken."
			);
			break;
		}
		const navigationSection: StorefrontNavigationSection = {
			id:
				settings.storefrontProvider.navigation[i].id ??
				getId(settings.storefrontProvider.navigation[i].title),
			title: settings.storefrontProvider.navigation[i].title,
			items: (await getNavigationItems(
				settings.storefrontProvider.navigation[i].items,
				navigationSectionItemLimit
			)) as [
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
	console.log("Getting the store landing page.");
	const landingPage: StorefrontLandingPage = {
		topRow: null,
		middleRow: null,
		bottomRow: null
	};

	const settings = await getSettings();
	const storeFrontDetailedNavigationItemBottomRowLimit = 3;
	const storeFrontDetailedNavigationItemTopRowLimit = 4;
	const middleRowAppLimit = 6;

	if (settings?.storefrontProvider?.landingPage?.hero !== undefined) {
		const hero = settings.storefrontProvider.landingPage.hero;
		const cta = await getNavigationItem(hero.cta.id, hero.cta.title, hero.cta.tags);
		landingPage.hero = {
			title: hero.title,
			image: hero.image,
			description: hero.description,
			cta
		};
	}

	if (settings?.storefrontProvider?.landingPage?.topRow !== undefined) {
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
		console.error("You need to have a topRow defined in your landing page.");
	}

	if (settings?.storefrontProvider?.landingPage?.middleRow !== undefined) {
		const middleRow = settings.storefrontProvider.landingPage.middleRow;
		const middleRowApps = await getAppsByTag(middleRow.tags);
		if (middleRowApps.length > middleRowAppLimit) {
			console.warn(
				`Too many apps (${
					middleRowApps.length
				}) have been returned by the middle row tag definition ${middleRow.tags.join(
					" "
				)}. Only ${middleRowAppLimit} will be shown.`
			);
		}
		const validatedMiddleRowApps = middleRowApps.slice(0, middleRowAppLimit) as [
			App?,
			App?,
			App?,
			App?,
			App?,
			App?
		];
		landingPage.middleRow = {
			title: middleRow.title,
			apps: validatedMiddleRowApps
		};
	} else {
		console.error("You need to have a middleRow defined in your landing page.");
	}

	if (settings?.storefrontProvider?.landingPage?.bottomRow !== undefined) {
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
		console.error("You need to have a bottomRow defined in your landing page.");
	}

	return landingPage;
}

async function getFooter(): Promise<StorefrontFooter> {
	console.log("Getting the store footer.");
	const settings = await getSettings();
	if (settings?.storefrontProvider?.footer !== undefined) {
		return settings.storefrontProvider.footer;
	}
	console.error("Storefront is being initialised without a footer configured.");
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

	const apps = await getAppsByTag(tags);

	if (apps !== undefined && apps.length > 0) {
		navigationItem.templateData.apps = apps;
	}

	return navigationItem;
}

async function getNavigationItems(items: StorefrontSettingsNavigationItem[], limit: number) {
	const navigationItems: StorefrontNavigationItem[] = [];

	for (let i = 0; i < items.length; i++) {
		const navigationItem = await getNavigationItem(items[i].id, items[i].title, items[i].tags);
		navigationItems.push(navigationItem);
	}

	if (navigationItems.length > limit) {
		console.warn(
			`You have defined too many navigations items (${navigationItems.length}). Please limit it to ${limit} as we will only take the first ${limit}`
		);
	}
	return navigationItems.slice(0, limit);
}

async function getLandingPageRow(definition: StorefrontSettingsLandingPageRow, limit: number) {
	const items: StorefrontDetailedNavigationItem[] = [];

	for (let i = 0; i < definition.items.length; i++) {
		const navigationItem = await getNavigationItem(
			definition.items[i].id,
			definition.items[i].title,
			definition.items[i].tags
		);
		const item: StorefrontDetailedNavigationItem = {
			description: definition.items[i].description,
			image: definition.items[i].image,
			...navigationItem
		};
		items.push(item);
	}

	if (items.length > limit) {
		console.warn(
			`You have defined too many storefront detailed navigation items (${items.length}). Please keep it to the limit of ${limit} as only the first ${limit} will be returned.`
		);
	}

	const detailedNavigationItems = items.slice(0, limit);

	return {
		title: definition.title,
		items: detailedNavigationItems
	};
}
