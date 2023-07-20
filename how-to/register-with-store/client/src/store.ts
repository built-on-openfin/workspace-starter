import {
	Storefront,
	StorefrontTemplate,
	type App,
	type StoreButtonConfig,
	type StoreRegistration,
	type StorefrontDetailedNavigationItem,
	type StorefrontFooter,
	type StorefrontLandingPage,
	type StorefrontLandingPageMiddleRow,
	type StorefrontNavigationItem,
	type StorefrontNavigationSection
} from "@openfin/workspace";
import { CustomActionCallerType, type CustomActionsMap } from "@openfin/workspace-platform";
import { getApps, getAppsByTag, launchApp } from "./apps";
import type {
	AppProviderSettings,
	StorefrontDetailedNavigationItemWithTags,
	StorefrontProviderSettings
} from "./shapes";

// The store registration.
let storeRegistration: StoreRegistration | undefined;

// Apps that have been added to favorites.
const favoriteAppIds: string[] = [];

const NAVIGATION_SECTION_ITEM_LIMIT = 5;
const NAVIGATION_SECTION_LIMIT = 3;
const DETAILED_NAVIGATION_TOP_ROW_LIMIT = 4;
const DETAILED_NAVIGATION_MIDDLE_ROW_LIMIT = 6;
const DETAILED_NAVIGATION_BOTTOM_ROW_LIMIT = 3;

/**
 * Register with the store component.
 * @param appSettings The app settings from the manifest.
 * @param storeSettings The store settings from the manifest.
 * @returns The registration details for store.
 */
export async function register(
	appSettings: AppProviderSettings | undefined,
	storeSettings: StorefrontProviderSettings | undefined
): Promise<StoreRegistration | undefined> {
	console.log("Initializing the storefront provider.");

	if (!appSettings) {
		console.warn("The appSettings has not been configured for store");
	} else if (!storeSettings) {
		console.warn("The storeSettings has not been configured for store");
	} else if (isStorefrontConfigurationValid(storeSettings)) {
		try {
			storeRegistration = await Storefront.register({
				id: storeSettings?.id ?? "",
				title: storeSettings?.title ?? "",
				icon: storeSettings?.icon ?? "",
				getNavigation: async () => getNavigation(appSettings, storeSettings),
				getLandingPage: async () => getLandingPage(appSettings, storeSettings),
				getFooter: async () => getFooter(storeSettings),
				getApps: async () => addButtons(await getApps(appSettings)),
				launchApp: async (app) => {
					await launchApp(app);
				}
			});

			console.log("Storefront provider initialized.");

			return storeRegistration;
		} catch (err) {
			console.error("An error was encountered while trying to register the content store provider", err);
		}
	}
}

/**
 * Deregister from home.
 * @param storeSettings The store settings from the manifest.
 * @returns Nothing.
 */
export async function deregister(storeSettings: StorefrontProviderSettings | undefined): Promise<void> {
	if (storeRegistration && storeSettings?.id) {
		await Storefront.deregister(storeSettings.id);
	} else {
		console.warn(
			"Unable to call store deregister as there is an indication it was never registered successfully."
		);
	}
}

/**
 * Check that the storefront configuration is valid.
 * @param storeSettings The store settings to validate.
 * @returns True if the configuration is valid.
 */
function isStorefrontConfigurationValid(storeSettings: StorefrontProviderSettings | undefined): boolean {
	if (
		storeSettings?.id === undefined ||
		storeSettings.title === undefined ||
		storeSettings.footer === undefined ||
		storeSettings.landingPage?.topRow === undefined ||
		storeSettings.landingPage?.middleRow === undefined ||
		storeSettings.landingPage?.bottomRow === undefined ||
		storeSettings.navigation === undefined
	) {
		console.error(
			"StorefrontProvider is not correctly configured in the customSettings of this manifest. You must ensure that storefrontProvider is defined, that it has an id and title and that the footer, landingPage (top row, middle row and bottom row) and navigation sections have been defined."
		);
		return false;
	}

	const idList: string[] = [];
	let hasDuplicateIds = false;

	const warningMessage =
		"The id is not defined. This demo will generate an id based on title but you should have a unique and idempotent id when building your own store.";

	console.log("Validating settings storefrontProvider navigation config");
	const navigation = storeSettings.navigation;
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
				items[n]?.id,
				`storefrontProvider.navigation[${i}].items[${n}].id`,
				warningMessage,
				idList,
				hasDuplicateIds
			);
		}
	}

	console.log("Validating settings storefrontProvider landing page hero config");
	const landingPage = storeSettings.landingPage;

	if (landingPage?.hero?.cta !== undefined) {
		hasDuplicateIds = validateId(
			landingPage.hero.cta.id,
			"storefrontProvider.landingPage.hero.cta.id",
			warningMessage,
			idList,
			hasDuplicateIds
		);
	}

	console.log("Validating settings storefrontProvider landing page top row config");
	const topRow = landingPage.topRow;

	if (topRow.items !== undefined) {
		for (let i = 0; i < topRow.items.length; i++) {
			const item = topRow.items[i];
			if (item) {
				hasDuplicateIds = validateId(
					item.id,
					`storefrontProvider.landingPage.topRow.items[${i}].id`,
					warningMessage,
					idList,
					hasDuplicateIds
				);
			}
		}
	}

	console.log("Validating settings storefrontProvider landing page bottom row config");
	const bottomRow = landingPage.bottomRow;
	if (bottomRow.items !== undefined) {
		for (let i = 0; i < bottomRow.items.length; i++) {
			const item = bottomRow.items[i];
			if (item) {
				hasDuplicateIds = validateId(
					item.id,
					`storefrontProvider.landingPage.bottomRow.items[${i}].id`,
					warningMessage,
					idList,
					hasDuplicateIds
				);
			}
		}
	}

	console.log("Validating ids, checking for duplicate ids.");
	if (hasDuplicateIds) {
		console.error(
			"You have defined duplicate ids (please see the other error messages) which could result in strange behavior (if we are routing by id and you have two or more items that resolve to the same id then it could navigate to something unexpected. Please ensure ids are unique and idempotent."
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
	if (id === undefined) {
		console.warn(`${namespace}: ${warning}`);
	} else if (idList.includes(id)) {
		console.error(
			`${namespace}: The id is used in more than one place. Please have a unique and idempotent id: ${id}`
		);
		return true;
	} else {
		idList.push(id);
	}
	return hasDuplicateIds;
}

/**
 * This function is used when a navigation item or section hasn't been configured with an ID. This is to simplify
 * configuration for this demo. In a real application you would need an idempotent and unique ID (think GUID) that
 * doesn't change for that navigation item/section regardless of how many times it is regenerated (eg more items can be
 * added to the item/section but the ID stays the same). As you navigate around the store this ID is used as a route. So
 * if a user clicks on a link, navigates to a new page and the re-requested navigation item has a different ID then the
 * store will not be able to find a match and it won't be able to render the navigation item. A real application would
 * not use this approach (as an update to the tag list would result in a new ID which would fail if the config was
 * fetched from a server and not a manifest).
 * @param title The title of the item to get an id for.
 * @param tags The tags of the items to get an id for.
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
 * Get the navigation section for the store.
 * @param appSettings The app settings from the manifest.
 * @param storeSettings The store settings from the manifest.
 * @returns The navigation sections.
 */
async function getNavigation<T>(
	appSettings: AppProviderSettings,
	storeSettings: StorefrontProviderSettings
): Promise<T> {
	console.log("Showing the store navigation.");

	const navigationSections: (StorefrontNavigationSection | undefined)[] = [];

	if (storeSettings.navigation === undefined) {
		return [] as T;
	}

	if (storeSettings.navigation.length > NAVIGATION_SECTION_LIMIT) {
		console.warn(
			`More than ${NAVIGATION_SECTION_LIMIT} navigation sections defined in StorefrontProvider settings. Only ${NAVIGATION_SECTION_LIMIT} are used.`
		);
	}

	for (const navigationItem of storeSettings.navigation.slice(0, NAVIGATION_SECTION_LIMIT)) {
		const navigationSection: StorefrontNavigationSection = {
			id: navigationItem.id ?? getId(navigationItem.title),
			title: navigationItem.title,
			items: await getNavigationItems(appSettings, navigationItem.items, NAVIGATION_SECTION_ITEM_LIMIT)
		};
		navigationSections.push(navigationSection);
	}

	return navigationSections as T;
}

/**
 * Get the navigation items.
 * @param appSettings The app settings from the manifest.
 * @param items The items for process.
 * @param limit Limit the number of items to get.
 * @returns The list of navigation items.
 */
async function getNavigationItems<T>(
	appSettings: AppProviderSettings,
	items: (StorefrontDetailedNavigationItemWithTags | undefined)[],
	limit: number
): Promise<T> {
	const navigationItems: StorefrontNavigationItem[] = [];

	if (items.length > limit) {
		console.warn(
			`You have defined too many navigation items (${items.length}). Please limit it to ${limit} as we will only take the first ${limit}`
		);
	}

	for (const item of items.slice(0, limit)) {
		if (item) {
			const navigationItem = await getNavigationItem(appSettings, item.id, item.title, item.tags);
			navigationItems.push(navigationItem);
		}
	}

	return navigationItems as T;
}

/**
 * Get the landing page.
 * @param appSettings The app settings from the manifest.
 * @param storeSettings The store settings from the manifest.
 * @returns The landing page.
 */
async function getLandingPage(
	appSettings: AppProviderSettings,
	storeSettings: StorefrontProviderSettings
): Promise<StorefrontLandingPage> {
	console.log("Getting the store landing page.");
	const landingPage: Partial<StorefrontLandingPage> = {};

	if (storeSettings.landingPage.hero !== undefined) {
		const hero = storeSettings.landingPage.hero;
		landingPage.hero = {
			title: hero.title,
			image: hero.image,
			description: hero.description,
			cta: await getNavigationItem(appSettings, hero.cta.id, hero.cta.title, hero.cta.tags)
		};
	}

	if (storeSettings.landingPage.topRow !== undefined) {
		landingPage.topRow = {
			title: storeSettings.landingPage.topRow.title,
			items: await getLandingPageRow(
				appSettings,
				storeSettings.landingPage.topRow.items,
				DETAILED_NAVIGATION_TOP_ROW_LIMIT
			)
		};
	} else {
		console.error("You need to have a topRow defined in your landing page.");
	}

	if (storeSettings.landingPage?.middleRow !== undefined) {
		const middleRow = storeSettings.landingPage.middleRow;
		const middleRowApps = await getAppsByTag(appSettings, middleRow.tags);
		if (middleRowApps.length > DETAILED_NAVIGATION_MIDDLE_ROW_LIMIT) {
			console.warn(
				`Too many apps (${
					middleRowApps.length
				}) have been returned by the middle row tag definition ${middleRow.tags.join(
					" "
				)}. Only ${DETAILED_NAVIGATION_MIDDLE_ROW_LIMIT} will be shown.`
			);
		}
		const validatedMiddleRowApps = addButtons<StorefrontLandingPageMiddleRow>(
			middleRowApps.slice(0, DETAILED_NAVIGATION_MIDDLE_ROW_LIMIT)
		);
		landingPage.middleRow = {
			title: middleRow.title,
			apps: validatedMiddleRowApps
		};
	} else {
		console.error("You need to have a middleRow defined in your landing page.");
	}

	if (storeSettings.landingPage?.bottomRow !== undefined) {
		landingPage.bottomRow = {
			title: storeSettings.landingPage.bottomRow.title,
			items: await getLandingPageRow(
				appSettings,
				storeSettings.landingPage.bottomRow.items,
				DETAILED_NAVIGATION_BOTTOM_ROW_LIMIT
			)
		};
	} else {
		console.error("You need to have a bottomRow defined in your landing page.");
	}

	return landingPage as StorefrontLandingPage;
}

/**
 * Get the footer from the configuration.
 * @param storeSettings The store settings.
 * @returns The footer if one is configured.
 */
async function getFooter(storeSettings: StorefrontProviderSettings): Promise<StorefrontFooter> {
	console.log("Getting the store footer.");
	return storeSettings.footer;
}

/**
 * This section generates a navigation item for Storefront based on some configuration.
 * @param appSettings The app settings from the manifest.
 * @param id This id should be unique and idempotent and isn't changed regardless of how often the same navigation item is regenerated.
 * The reason for this is because it is used for routing in Storefront. If a user navigated from a link and the id changes when the item
 * is re-requested by storefront then it will not be able to render the contents.
 * @param title The title of the item.
 * @param tags Tags are used as a way of filtering out which apps should be assigned to a StorefrontNavigationItem.
 * This allows apps to be tagged on the server and the store would automatically update the apps assigned to a particular section.
 * @returns The navigation item.
 */
async function getNavigationItem(
	appSettings: AppProviderSettings,
	id: string,
	title: string,
	tags: string[] | undefined
): Promise<StorefrontNavigationItem> {
	const navigationItem: StorefrontNavigationItem = {
		id: id ?? getId(title, tags),
		title,
		templateId: StorefrontTemplate.AppGrid,
		templateData: {
			apps: []
		}
	};

	if (tags?.length && tags[0] === "@favorites") {
		navigationItem.templateData.apps = await getFavoriteApps(appSettings);
	} else {
		navigationItem.templateData.apps = await getAppsByTag(appSettings, tags);
	}

	return navigationItem;
}

/**
 * Get a row for the landing page.
 * @param appSettings The app settings from the manifest.
 * @param rowItems The items in the row definition.
 * @param limit The limit for the number of items.
 * @returns The items for the row.
 */
async function getLandingPageRow<T>(
	appSettings: AppProviderSettings,
	rowItems: (StorefrontDetailedNavigationItemWithTags | undefined)[],
	limit: number
): Promise<T> {
	const items: StorefrontDetailedNavigationItem[] = [];

	if (rowItems.length > limit) {
		console.warn(
			`You have defined too many storefront detailed navigation items (${rowItems.length}). Please keep it to the limit of ${limit} as only the first ${limit} will be returned.`
		);
	}

	for (const item of rowItems.slice(0, limit)) {
		if (item) {
			const navigationItem = await getNavigationItem(appSettings, item.id, item.title, item.tags);
			items.push({
				description: item.description,
				image: item.image,
				...navigationItem
			});
		}
	}

	return items as T;
}

/**
 * Add any custom buttons to the app definitions.
 * @param apps The apps to add the buttons to.
 * @returns The list of apps with any additional buttons.
 */
function addButtons<T>(apps: App[]): T {
	return apps.map((app) => ({
		...app,
		...calculateButtons(app)
	})) as T;
}

/**
 * Calculate the list of buttons we need for the app.
 * @param app The app to calculate the list for.
 * @returns The buttons needed for the app.
 */
function calculateButtons(app: App): {
	primaryButton: StoreButtonConfig;
	secondaryButtons: StoreButtonConfig[];
} {
	return {
		...app,
		primaryButton: {
			title: "Launch",
			action: {
				id: "launch-app",
				customData: app
			}
		},
		secondaryButtons: [
			{
				title: favoriteAppIds.includes(app.appId) ? "Remove Favorite" : "Add Favorite",
				action: {
					id: "favorite-toggle",
					customData: app
				}
			}
		]
	};
}

/**
 * Toggle wether an app is in the favorites.
 * @param app The app to toggle.
 * @returns Nothing.
 */
async function toggleFavorite(app: App): Promise<void> {
	const appIndex = favoriteAppIds.indexOf(app.appId);
	if (appIndex >= 0) {
		favoriteAppIds.splice(appIndex, 1);
	} else {
		favoriteAppIds.push(app.appId);
	}
	if (storeRegistration) {
		await storeRegistration.updateAppCardButtons({
			appId: app.appId,
			...calculateButtons(app)
		});
	}
}

/**
 * This could be used by home to show which apps are in the favorites.
 * @param appSettings The app settings from the manifest.
 * @returns The list of favorite apps.
 */
async function getFavoriteApps(appSettings: AppProviderSettings): Promise<App[]> {
	const apps = await getApps(appSettings);
	return apps.filter((a) => favoriteAppIds.includes(a.appId));
}

/**
 * Get the actions that will be triggered by the button clicks.
 * The action are added to the workspace platform when it is created.
 * @returns The maps of the custom actions.
 */
export function storeGetCustomActions(): CustomActionsMap {
	return {
		"launch-app": async (e): Promise<void> => {
			if (e.callerType === CustomActionCallerType.StoreCustomButton) {
				await launchApp(e.customData as App);
			}
		},
		"favorite-toggle": async (e): Promise<void> => {
			if (e.callerType === CustomActionCallerType.StoreCustomButton) {
				await toggleFavorite(e.customData as App);
			}
		}
	};
}
