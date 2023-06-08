import {
	Storefront,
	StorefrontTemplate,
	type RegistrationMetaInfo,
	type StorefrontDetailedNavigationItem,
	type StorefrontFooter,
	type StorefrontLandingPage,
	type StorefrontNavigationItem,
	type StorefrontNavigationSection
} from "@openfin/workspace";
import { getApps, getAppsByTag } from "../apps";
import { launch } from "../launch";
import { createLogger } from "../logger-provider";
import type {
	StorefrontProviderOptions,
	StorefrontSettingsLandingPageRow,
	StorefrontSettingsNavigationItem
} from "../shapes";
import type { PlatformApp } from "../shapes/app-shapes";
import { isEmpty } from "../utils";

const TOP_ROW_LIMIT = 4;
const MIDDLE_ROW_LIMIT = 6;
const BOTTOM_ROW_LIMIT = 3;

const logger = createLogger("Store");

let storeProviderOptions: StorefrontProviderOptions | undefined;
let registrationInfo: RegistrationMetaInfo | undefined;

/**
 * Register the store component.
 * @param options The options for the store provider.
 * @returns The registration.
 */
export async function register(
	options: StorefrontProviderOptions | undefined
): Promise<RegistrationMetaInfo | undefined> {
	if (options) {
		storeProviderOptions = options;
		logger.info("Initializing the storefront provider");

		if (isStorefrontConfigurationValid()) {
			try {
				registrationInfo = await Storefront.register({
					id: storeProviderOptions.id,
					title: storeProviderOptions.title,
					icon: storeProviderOptions.icon,
					getNavigation: async () => getNavigation(),
					getLandingPage: async () => getLandingPage(),
					getFooter: async () => getFooter(),
					getApps: async () => addButtons(await getApps({ private: false })),
					launchApp: async (app) => {
						await launch(app as PlatformApp);
					}
				});
				logger.info("Version:", registrationInfo);
				logger.info("Storefront provider initialized");
			} catch (err) {
				logger.error("An error was encountered while trying to register the content store provider", err);
			}
		}
	}

	return registrationInfo;
}

/**
 * Deregister the store component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (registrationInfo) {
		logger.info("About to deregister Store.");
		if (storeProviderOptions) {
			await Storefront.deregister(storeProviderOptions.id);
		}
	} else {
		logger.warn(
			"Unable to call store deregister as there is an indication it was never registered successfully."
		);
	}
}

/**
 * Show the store component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Showing the store.");
	return Storefront.show();
}

/**
 * Hide the home component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hiding the store.");
	return Storefront.hide();
}

/**
 * This function is used when a navigation item or section hasn't been configured with an ID. This is to simplify
 * configuration for this demo. In a real application you would need an idempotent and unique ID (think GUID) that
 * doesn't change for that navigation item/section regardless of how many times it is regenerated (e.g. more items can
 * be added to the item/section but the ID stays the same). As you navigate around the store this ID is used as a route.
 * So if a user clicks on a link, navigates to a new page and the re-requested navigation item has a different ID then
 * the store will not be able to find a match and it won't be able to render the navigation item. A real application
 * would not use this approach (as an update to the tag list would result in a new ID which would fail if the config was
 * fetched from a server and not a manifest).
 * @param title The title of the item.
 * @param tags The tags for the item.
 * @returns A calculated id.
 */
function getId(title: string, tags: string[] = []): string {
	const search = " ";
	const replaceWith = "-";
	let result = title.replaceAll(search, replaceWith);
	result += `-${tags.join("-")}`;
	return result.toLowerCase();
}

/**
 * Validate the store configuration.
 * @returns True if the configuration is valid.
 */
function isStorefrontConfigurationValid(): boolean {
	const idList: string[] = [];
	let hasDuplicateIds = false;

	if (
		isEmpty(storeProviderOptions) ||
		isEmpty(storeProviderOptions.id) ||
		isEmpty(storeProviderOptions.title) ||
		(isEmpty(storeProviderOptions.footer) &&
			!isEmpty(storeProviderOptions.landingPage) &&
			!isEmpty(storeProviderOptions.landingPage.topRow) &&
			!isEmpty(storeProviderOptions.landingPage.middleRow) &&
			!isEmpty(storeProviderOptions.landingPage.bottomRow) &&
			!isEmpty(storeProviderOptions.navigation))
	) {
		logger.error(
			"StorefrontProvider is not correctly configured in the customSettings of this manifest. You must ensure that storefrontProvider is defined, that it has an id and title and that the footer, landingPage (top row, middle row and bottom row) and navigation sections have been defined"
		);
		return false;
	}

	const warningMessage =
		"The id is not defined. This demo will generate an id based on title but you should have a unique and idempotent id when building your own store";

	logger.info("Validating settings storefrontProvider navigation config");
	const navigation = storeProviderOptions.navigation;
	for (let i = 0; i < navigation.length; i++) {
		hasDuplicateIds = validateId(
			navigation[i].id,
			`storefrontProvider.navigation[${i}].id`,
			warningMessage,
			idList,
			hasDuplicateIds
		);
		const items = navigation[i].items;
		for (let n = 0; n < items.length; n++) {
			hasDuplicateIds = validateId(
				items[n].id,
				`storefrontProvider.navigation[${i}].items[${n}].id`,
				warningMessage,
				idList,
				hasDuplicateIds
			);
		}
	}

	logger.info("Validating settings storefrontProvider landing page hero config");
	const landingPage = storeProviderOptions.landingPage;

	if (!isEmpty(landingPage?.hero?.cta)) {
		hasDuplicateIds = validateId(
			landingPage?.hero?.cta.id,
			"storefrontProvider.landingPage.hero.cta.id",
			warningMessage,
			idList,
			hasDuplicateIds
		);
	}

	logger.info("Validating settings storefrontProvider landing page top row config");
	const topRow = landingPage.topRow;

	if (!isEmpty(topRow.items)) {
		for (let i = 0; i < topRow.items.length; i++) {
			hasDuplicateIds = validateId(
				topRow.items[i].id,
				`storefrontProvider.landingPage.topRow.items[${i}].id`,
				warningMessage,
				idList,
				hasDuplicateIds
			);
		}
	}

	logger.info("Validating settings storefrontProvider landing page bottom row config");
	const bottomRow = landingPage.bottomRow;
	if (!isEmpty(bottomRow.items)) {
		for (let i = 0; i < bottomRow.items.length; i++) {
			hasDuplicateIds = validateId(
				bottomRow.items[i].id,
				`storefrontProvider.landingPage.bottomRow.items[${i}].id`,
				warningMessage,
				idList,
				hasDuplicateIds
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

/**
 * Validate the id.
 * @param id The id to validate.
 * @param namespace The name to use for message context.
 * @param warning The warning to display.
 * @param idList The list to add to if not a duplicate.
 * @param hasDuplicateIds Do we already have duplicate ids.
 * @returns True if a duplicate.
 */
function validateId(
	id: string | undefined,
	namespace: string,
	warning: string,
	idList: string[],
	hasDuplicateIds: boolean
): boolean {
	if (isEmpty(id)) {
		logger.warn(`${namespace}: ${warning}`);
	} else if (idList.includes(id)) {
		logger.error(
			`${namespace}: The id is used in more than one place. Please have a unique and idempotent id: ${id}`
		);
		return true;
	} else {
		idList.push(id);
	}
	return hasDuplicateIds;
}

/**
 * Get the navigation sections for the store.
 * @returns The navigation section.
 */
async function getNavigation(): Promise<[StorefrontNavigationSection?, StorefrontNavigationSection?]> {
	const nav = storeProviderOptions?.navigation;
	if (isEmpty(nav)) {
		return [];
	}

	logger.info("Showing the store navigation");
	const navigationSectionItemLimit = 5;
	const navigationSectionLimit = 2;
	const navigationSections: [StorefrontNavigationSection?, StorefrontNavigationSection?] = [];

	for (const navItem of nav) {
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

/**
 * Get the landing page content.
 * @returns The store landing page.
 */
async function getLandingPage(): Promise<StorefrontLandingPage> {
	logger.info("Getting the store landing page");

	const landingPage: Partial<StorefrontLandingPage> = {};

	const landingPageSettings = storeProviderOptions?.landingPage;

	const hero = landingPageSettings?.hero;
	if (!isEmpty(hero)) {
		const cta = await getNavigationItem(hero.cta.id, hero.cta.title, hero.cta.tags);
		landingPage.hero = {
			title: hero.title,
			image: hero.image,
			description: hero.description,
			cta
		};
	}

	const topRow = landingPageSettings?.topRow;
	if (!isEmpty(topRow)) {
		const row = await getLandingPageRow(topRow, TOP_ROW_LIMIT);
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

	const middleRow = landingPageSettings?.middleRow;
	if (!isEmpty(middleRow)) {
		const middleRowApps = await getAppsByTag(middleRow.tags, false, { private: false });
		if (middleRowApps.length > MIDDLE_ROW_LIMIT) {
			logger.warn(
				`Too many apps (${
					middleRowApps.length
				}) have been returned by the middle row tag definition ${middleRow.tags.join(
					" "
				)}. Only ${MIDDLE_ROW_LIMIT} will be shown.`
			);
		}
		const validatedMiddleRowApps = addButtons(middleRowApps.slice(0, MIDDLE_ROW_LIMIT)) as [
			PlatformApp?,
			PlatformApp?,
			PlatformApp?,
			PlatformApp?,
			PlatformApp?,
			PlatformApp?
		];
		landingPage.middleRow = {
			title: middleRow.title,
			apps: validatedMiddleRowApps
		};
	} else {
		logger.error("You need to have a middleRow defined in your landing page");
	}

	const bottomRow = landingPageSettings?.bottomRow;
	if (!isEmpty(bottomRow)) {
		const row = await getLandingPageRow(bottomRow, BOTTOM_ROW_LIMIT);
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

	return landingPage as StorefrontLandingPage;
}

/**
 * Get the footer content.
 * @returns The store footer.
 */
async function getFooter(): Promise<StorefrontFooter> {
	logger.info("Getting the store footer");
	const footer = storeProviderOptions?.footer;
	if (!isEmpty(footer)) {
		return footer;
	}
	logger.error("Storefront is being initialized without a footer configured");
	return {} as StorefrontFooter;
}

/**
 * This section generates a navigation item for Storefront based on some configuration.
 * @param id This id should be unique and idempotent and isn't changed regardless of how often the same navigation item
 * is regenerated. The reason for this is because it is used for routing in Storefront. If a user navigated from a link
 * and the id changes when the item is re-requested by storefront then it will not be able to render the contents.
 * @param title The title of the section.
 * @param tags Tags are used as a way of filtering out which apps should be assigned to a StorefrontNavigationItem. This
 * allows apps to be tagged on the server and the store would automatically update the apps assigned to a particular
 * section.
 * @returns The navigation item.
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

/**
 * Convert the settings navigation items to store items.
 * @param items The items to convert.
 * @param limit The max number of items.
 * @returns The converted items.
 */
async function getNavigationItems(
	items: StorefrontSettingsNavigationItem[],
	limit: number
): Promise<StorefrontNavigationItem[]> {
	const navigationItems: StorefrontNavigationItem[] = [];

	if (items.length > limit) {
		logger.warn(
			`You have defined too many navigation items (${items.length}). Please limit it to ${limit} as we will only take the first ${limit}`
		);
	}

	for (const navItem of items.slice(0, limit)) {
		const navigationItem = await getNavigationItem(navItem.id, navItem.title, navItem.tags);
		navigationItems.push(navigationItem);
	}

	return navigationItems;
}

/**
 * Create the landing page row.
 * @param row The landing page row definition.
 * @param limit The limit of items for the landing page row.
 * @returns The landing page row.
 */
async function getLandingPageRow(
	row: StorefrontSettingsLandingPageRow,
	limit: number
): Promise<{
	title: string;
	items: StorefrontDetailedNavigationItem[];
}> {
	if (row.items.length > limit) {
		logger.warn(
			`You have defined too many storefront detailed navigation items (${row.items.length}). Please keep it to the limit of ${limit} as only the first ${limit} will be returned.`
		);
	}

	const items: StorefrontDetailedNavigationItem[] = [];

	for (const item of row.items.slice(0, limit)) {
		const navigationItem = await getNavigationItem(item.id, item.title, item.tags);
		const navItem: StorefrontDetailedNavigationItem = {
			description: item.description,
			image: item.image,
			buttonTitle: item.buttonTitle,
			...navigationItem
		};
		items.push(navItem);
	}

	return {
		title: row.title,
		items
	};
}

/**
 * Add custom buttons to the store entries.
 * @param apps The list of apps to add the buttons to.
 * @returns The list of augmented apps.
 */
function addButtons(apps: PlatformApp[]): PlatformApp[] {
	const primaryButton = storeProviderOptions?.primaryButton;
	const secondaryButtons = storeProviderOptions?.secondaryButtons;
	const isArray = !isEmpty(secondaryButtons) && Array.isArray(secondaryButtons);
	if (!isEmpty(primaryButton) || isArray) {
		return apps.map((app) => ({
			...app,
			primaryButton: app.primaryButton ?? primaryButton,
			secondaryButtons:
				app.secondaryButtons ?? isArray
					? secondaryButtons?.map((secondary) => ({
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
