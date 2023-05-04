import type OpenFin from "@openfin/core";
import {
	Dock,
	DockButtonNames,
	type DockButton,
	type DockProviderConfig,
	type DockProviderRegistration
} from "@openfin/workspace";
import {
	BrowserButtonType,
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionsMap,
	type ToolbarButton
} from "@openfin/workspace-platform";
import {
	type DockDropdownConfig,
	type DockProviderConfigWithIdentity
} from "@openfin/workspace-platform/client-api/src";

let platformTitle: string | undefined;
let platformIcon: string | undefined;
let openNewTabUrl: string;
let currentView: OpenFin.View | undefined;
let favorites: { title: string; url: string }[] = [];
let registration: DockProviderRegistration | undefined;
let currentUrl: string | undefined;

/**
 * Register the dock provider.
 * @param id The id to register the provider with.
 * @param title The title to use for the dock registration.
 * @param icon The icon to use for the dock registration.
 * @param newTabUrl The url of the new tab page.
 * @returns The registration details for dock.
 */
export async function register(
	id: string,
	title: string,
	icon: string,
	newTabUrl: string
): Promise<DockProviderRegistration | undefined> {
	console.log("Initialising the dock provider.");

	try {
		platformTitle = title;
		platformIcon = icon;
		openNewTabUrl = newTabUrl;

		registration = await Dock.register({
			id,
			...buildDockConfiguration()
		});
		console.log(registration);
		console.log("Dock provider initialised.");
		return registration;
	} catch (err) {
		console.error("An error was encountered while trying to register the content dock provider", err);
	}
}

/**
 * Get the actions that will be triggered by the button clicks.
 * The action are added to the workspace platform when it is created.
 * @returns The maps of the custom actions.
 */
export function dockGetCustomActions(): CustomActionsMap {
	return {
		"view-add": async (): Promise<void> => {
			// The favorite open is triggered when the entry in the dock is clicked
			await openUrl(openNewTabUrl);
		},
		"favorite-open": async (payload): Promise<void> => {
			// The favorite open is triggered when the menu entry in the dock is clicked
			if (payload.callerType === CustomActionCallerType.CustomDropdownItem) {
				// We use override favorite because the when the first
				// window is opened the view is not available
				await openUrl(payload.customData.url as string);
			}
		},
		"favorite-add": async (payload): Promise<void> => {
			// The favorite add is triggered from the button at the top of the browser window
			if (payload.callerType === CustomActionCallerType.CustomButton && currentView) {
				await addToFavorites();
			}
		},
		"favorite-remove": async (payload): Promise<void> => {
			// The favorite remove is triggered from the button at the top of the browser window
			if (payload.callerType === CustomActionCallerType.CustomButton && currentView) {
				await removeFromFavorites();
			}
		}
	};
}

/**
 * Create the configuration for the dock, including a drop down for favorites if there are any.
 * @returns The dock configuration.
 */
function buildDockConfiguration(): DockProviderConfig {
	const buttons: DockButton[] = [
		{
			tooltip: "Add View",
			iconUrl: "http://localhost:8080/assets/view-add.svg",
			action: {
				id: "view-add"
			}
		},
		{
			type: DockButtonNames.DropdownButton,
			tooltip: "Favorites",
			id: "favorites",
			iconUrl: "http://localhost:8080/assets/favorites.svg",
			options:
				favorites.length > 0
					? favorites.map((fav) => ({
							tooltip: fav.title,
							action: {
								id: "favorite-open",
								customData: fav
							}
					  }))
					: [
							{
								tooltip: "No favorites",
								disabled: true,
								action: {
									id: "favorite-open"
								}
							}
					  ]
		}
	];

	return {
		title: platformTitle ?? "",
		icon: platformIcon ?? "",
		workspaceComponents: ["home", "notifications", "store", "switchWorkspace"],
		disableUserRearrangement: false,
		buttons
	};
}

/**
 * Update the dock when something has changed.
 */
async function updateDock(): Promise<void> {
	if (registration) {
		await registration.updateDockProviderConfig(buildDockConfiguration());
	}
}

/**
 * Update the buttons shown on the browser window.
 */
async function updateBrowserButtons(): Promise<void> {
	const buttons = await getDockBrowserButtons();

	if (buttons) {
		const platform = getCurrentSync();
		const browserWindows = await platform.Browser.getAllWindows();

		if (browserWindows.length > 0) {
			const browserWindow = fin.Window.wrapSync(browserWindows[0].identity);
			await browserWindow.updateOptions({
				workspacePlatform: {
					toolbarOptions: {
						buttons
					}
				}
			});
		}
	}
}

/**
 * Open a url in a view.
 * @param url The view to open.
 */
async function openUrl(url: string): Promise<void> {
	const platform = getCurrentSync();

	// See if we already have a browser window open.
	let browserWindows = await platform.Browser.getAllWindows();

	let browserWindowTarget: OpenFin.Identity | undefined;
	if (browserWindows.length > 0) {
		browserWindowTarget = browserWindows[0].identity;
	}

	// Open a view
	const view = await platform.createView({ url }, browserWindowTarget);
	currentUrl = url;
	currentView = view;
	await updateBrowserButtons();

	// If there was no initial window then get it and hook up event listeners
	if (!browserWindowTarget) {
		// We have just opened a new browser window, so listen for events
		// so that we can update the state of the browser buttons
		browserWindows = await platform.Browser.getAllWindows();

		if (browserWindows.length > 0) {
			const events: ("view-focused" | "options-changed" | "url-changed")[] = [
				"view-focused",
				"options-changed",
				"url-changed"
			];
			for (const event of events) {
				await browserWindows[0].openfinWindow.addListener(event, async (payload) => {
					console.log(event, payload);
					// If the view has switched focus or the url has changed
					// then we need to update the browser buttons
					if ("viewIdentity" in payload) {
						currentView = fin.View.wrapSync(payload.viewIdentity);
					}
					if (currentView) {
						try {
							const viewInfo = await currentView.getInfo();
							if (viewInfo.url.length > 0) {
								await updateBrowserButtons();
							}
						} catch {}
					}
				});
			}
		}
	}
}

/**
 * Add the current view to favorites.
 */
async function addToFavorites(): Promise<void> {
	if (currentView) {
		const viewInfo = await currentView.getInfo();

		// Check we don't already have it before adding
		const favoriteIndex = favorites.findIndex((fav) => fav.url === viewInfo.url);
		if (favoriteIndex < 0) {
			favorites.push({
				title: viewInfo.title,
				url: viewInfo.url
			});

			await updateDock();
			await updateBrowserButtons();
		}
	}
}

/**
 * Remove the current view from the favorites.
 */
async function removeFromFavorites(): Promise<void> {
	if (currentView) {
		const viewInfo = await currentView.getInfo();

		// Only remove if it exists.
		const favoriteIndex = favorites.findIndex((fav) => fav.url === viewInfo.url);
		if (favoriteIndex >= 0) {
			favorites.splice(favoriteIndex, 1);

			await updateDock();
			await updateBrowserButtons();
		}
	}
}

/**
 * Get the buttons to show on the browser based on current view state.
 * @returns The list of buttons to show.
 */
export async function getDockBrowserButtons(): Promise<ToolbarButton[] | undefined> {
	let urlCheck = "";

	// The currentUrl is used when a new view is opened
	// as the currentView might not yet be set
	if (currentUrl) {
		console.log("currentUrl", currentUrl);
		urlCheck = currentUrl;
		currentUrl = undefined;
	} else if (currentView) {
		try {
			const viewInfo = await currentView.getInfo();
			console.log("viewInfo", viewInfo);
			urlCheck = viewInfo.url;
		} catch {}
	}

	if (!urlCheck) {
		return;
	}

	const isFavorite = favorites.findIndex((fav) => fav.url === urlCheck) >= 0;

	if (isFavorite) {
		return [
			{
				type: BrowserButtonType.Custom,
				tooltip: "Remove from Favorites",
				iconUrl: "http://localhost:8080/assets/favorite-remove.svg",
				action: {
					id: "favorite-remove"
				}
			}
		];
	}

	return [
		{
			type: BrowserButtonType.Custom,
			tooltip: "Add to Favorites",
			iconUrl: "http://localhost:8080/assets/favorite-add.svg",
			action: {
				id: "favorite-add"
			}
		}
	];
}

/**
 * Overrides the load configuration for the dock so we can get the list of buttons
 * and repopulate the favorites stored here.
 * @param config The configuration to load the buttons from.
 */
export async function loadDockConfig(config: DockProviderConfigWithIdentity): Promise<void> {
	console.log("Load dock config", config);

	favorites = [];

	// We can used the loaded dock config to rebuild the favorites list
	if (Array.isArray(config.buttons)) {
		const favoritesDropdown = config.buttons.find((b) => b.id === "favorites") as DockDropdownConfig;
		if (favoritesDropdown && Array.isArray(favoritesDropdown.options)) {
			favorites = favoritesDropdown.options
				.filter((favButton) => !favButton.disabled)
				.map((favButton) => ({
					title: favButton.action.customData.title,
					url: favButton.action.customData.url
				}));
		}
	}
}

/**
 * Override the dock config, we could perform a tidy up or similar here.
 * @param config The dock configuration.
 */
export async function saveDockConfig(config: DockProviderConfigWithIdentity): Promise<void> {
	console.log("Save dock config", config);
}
