import type { OpenFin } from "@openfin/core";
import { DockButtonNames, type DockButton, type DockProviderRegistration } from "@openfin/workspace";
import {
	CustomActionCallerType,
	Dock as Dock3,
	type BookmarkDockEntryPayload,
	type CustomActionPayload,
	type Dock3Config,
	type Dock3Provider,
	type LaunchDockEntryPayload
} from "@openfin/workspace-platform";
import type {
	DockButton as PlatformDockButton,
	DockProviderConfigWithIdentity
} from "@openfin/workspace-platform/client-api/src";
import type { MoreMenuCustomOptionPayload } from "@openfin/workspace-platform/dock3/src/api/protocol";
import type { ContentMenuEntry, DockEntry } from "@openfin/workspace/client-api-platform/src";
import { callAction } from "../actions";
import * as endpointProvider from "../endpoint";
import { createLogger } from "../logger-provider";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type { DockProviderOptions } from "../shapes/dock-shapes";
import { getCurrentColorSchemeMode } from "../themes";
import { isEmpty, isStringValue, objectClone, randomUUID } from "../utils";
import {
	buildButtons,
	buildWorkspaceButtons,
	DOCK_ENDPOINT_ID_GET,
	DOCK_ENDPOINT_ID_SET,
	getDockProviderOptions,
	getRegisteredButtons,
	orderByIds,
	requestStoredDockConfig,
	sendDockConfigToEndpoint,
	setDockProviderOptions,
	setRegisteredBootstrapOptions,
	setRegisteredButtons,
	subscribeToUpdates,
	unsubscribeFromUpdates
} from "./dock-shared";

/**
 * The platform dock implementation (Dock 3), registered through the `@openfin/workspace-platform`
 * package. Implements the `DockImplementation` interface (see dock-shapes.ts) so that dock.ts can
 * delegate to it.
 */

const logger = createLogger("DockPlatform");

let initializedDock3Provider: Dock3Provider | undefined;
let dock3RegistrationMetaInfo: DockProviderRegistration | undefined;

/**
 * Register the dock component.
 * @param options The dock provider options.
 * @param bootstrapOptions The bootstrap options.
 * @returns The meta info from the registration.
 */
export async function register(
	options: DockProviderOptions,
	bootstrapOptions: BootstrapOptions | undefined
): Promise<DockProviderRegistration | undefined> {
	setDockProviderOptions(options);
	setRegisteredBootstrapOptions(bootstrapOptions);

	logger.info("The platform dock has been selected.");
	// get the current button definitions taking into account visibility
	const allWorkspaceButtons = await buildButtons();
	// Keep a reference to the built workspace-shape buttons so that they can be used when mapping
	// between the workspace and platform (Dock 3) storage shapes (see loadConfig/saveConfig below).
	setRegisteredButtons(allWorkspaceButtons);
	const mappedButtons = await buildDock3ButtonEntries(allWorkspaceButtons);
	const dock3Provider = await Dock3.init({
		config: {
			title: options.title,
			icon: options.icon,
			defaultDockButtons: buildWorkspaceButtons(undefined, true),
			uiConfig: options.dockUIConfig,
			favorites: objectClone(mappedButtons.favorites),
			contentMenu: objectClone(mappedButtons.contentMenu)
		},
		windowOptions: options.dockWindowOptions,
		override: (Base) =>
			/**
			 * Custom provider overrides for Dock3
			 * Dock3 is a stateless component, so custom overrides are needed to maintain state.
			 */
			class CustomProvider extends Base {
				/**
				 * Override for dock launch app function.
				 * This function should be customized to best match the needs of the application.
				 * @param payload content being launched
				 */
				public async launchEntry(payload: LaunchDockEntryPayload): Promise<void> {
					logger.info("Launching Dock Entry:", payload);
					if (payload.entry.type === "item") {
						if (payload.entry.itemData.action) {
							try {
								const positionInfo = await getActionPositionInfo(dock3Provider);
								const { windowIdentity, coordinates } = positionInfo;
								const customActionPayload: CustomActionPayload = {
									callerType: CustomActionCallerType.CustomButton,
									windowIdentity,
									customData: payload.entry.itemData.action.customData,
									x: coordinates.x,
									y: coordinates.y
								};
								await callAction(payload.entry.itemData.action.id, customActionPayload);
							} catch (error) {
								logger.error("Error launching action from dock entry:", payload, error);
							}
						} else {
							logger.error("No action found for dock entry:", payload);
						}
					}
				}

				/**
				 * Override for dock more menu custom option clicked.
				 * This function should be customized to best match the needs of the application.
				 * @param payload payload for more menu custom option clicked
				 * @returns void
				 */
				public async moreMenuCustomOptionClicked(payload: MoreMenuCustomOptionPayload): Promise<void> {
					logger.info("Dock3Panel::moreMenuCustomOptionClicked", payload);
					const { windowIdentity, coordinates } = await getActionPositionInfo(dock3Provider);
					const customActionPayload: CustomActionPayload = {
						callerType: CustomActionCallerType.CustomButton,
						windowIdentity,
						customData: payload.customData,
						x: coordinates.x,
						y: coordinates.y
					};
					await callAction(payload.action, customActionPayload);
				}

				/**
				 * Override for dock bookmark content function.
				 * Bookmarking is not supported in this version of Workspace Platform Starter and is
				 * intentionally ignored. The `dockUIConfig.contentMenu.enableBookmarking` setting can be
				 * enabled but will have no effect until a future release adds first class support.
				 * @param payload content being bookmarked
				 */
				public async bookmarkContentMenuEntry(payload: BookmarkDockEntryPayload): Promise<void> {
					logger.info("Bookmarking Not currently supported in WPS. This will be ignored.", payload.entry);
				}

				/**
				 * Override for dock load config.
				 * The platform dock stores its config independently of the workspace dock by default (browser
				 * storage). To keep the dock configuration consistent (and to allow a config to be carried over
				 * when a platform switches between dockType "workspace" and "platform") we reuse the same custom
				 * storage endpoints as the workspace dock when they are configured, mapping the stored workspace
				 * button order onto the platform favorites and content menu. When no endpoint is configured we
				 * fall back to the default platform dock storage.
				 * @returns The loaded dock config.
				 */
				public async loadConfig(): Promise<Dock3Config> {
					if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_GET)) {
						logger.info("Requesting platform dock config from custom storage");
						const availableButtons = objectClone(getRegisteredButtons() ?? []);
						const stored = await requestStoredDockConfig(
							getDockProviderOptions()?.id ?? fin.me.identity.uuid,
							availableButtons
						);

						// The order the buttons are in the stored config is the order we want to
						// display them, so map that order onto the current platform favorites/content menu.
						if (!isEmpty(stored) && Array.isArray(stored.buttons)) {
							const orderedIds = stored.buttons
								.map((button) => button.id)
								.filter((id): id is string => isStringValue(id));
							const mappedConfig: Dock3Config = {
								...this.config,
								favorites: orderByIds(this.config.favorites ?? [], orderedIds),
								contentMenu: orderByIds(this.config.contentMenu ?? [], orderedIds)
							};
							this.config = mappedConfig;
							return mappedConfig;
						}
						return this.config;
					}

					logger.info("Requesting platform dock config from default storage");
					return super.loadConfig();
				}

				/**
				 * Override for dock save config.
				 * When a custom storage endpoint is configured we convert the platform favorites/content menu
				 * order back into the flat workspace button shape and persist it via the same endpoint the
				 * workspace dock uses, so the two dock types share a single stored representation. When no
				 * endpoint is configured we fall back to the default platform dock storage.
				 * @param options The save config options.
				 * @param options.config The new dock config to persist.
				 */
				public async saveConfig({ config }: { config: Dock3Config }): Promise<void> {
					if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_SET)) {
						logger.info("Storing platform dock config in custom storage");
						const workspaceConfig = buildWorkspaceConfigFromDock3(config);
						const success = await sendDockConfigToEndpoint(workspaceConfig);
						if (success) {
							logger.info(`Saved platform dock config with id: ${workspaceConfig.id} to custom storage`);
						} else {
							logger.info(
								`Unable to save platform dock config with id: ${workspaceConfig.id} to custom storage`
							);
						}
					} else {
						logger.info("Storing platform dock config in default storage");
						await super.saveConfig({ config });
					}
				}
			}
	});
	initializedDock3Provider = dock3Provider;

	// Dock3 is part of @openfin/workspace-platform (bundled, not loaded from the CDN) so it does
	// not return version metadata the way Dock.register does. We synthesize a registration result
	// so the bootstrapper treats the platform dock as a registered component (registering connection
	// actions etc.). Platform client versions continue to be tracked separately by the version provider.
	dock3RegistrationMetaInfo = {
		clientAPIVersion: "",
		workspaceVersion: "",
		updateDockProviderConfig: async (): Promise<void> => {
			await refreshDock3();
		}
	};

	// Keep the platform dock favorites/content menu in sync with theme, apps and condition changes,
	// mirroring the behavior of the workspace dock registration.
	subscribeToUpdates(refreshDock3);

	return dock3RegistrationMetaInfo;
}

/**
 * Deregister the dock component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	unsubscribeFromUpdates();

	if (!isEmpty(initializedDock3Provider)) {
		const provider = initializedDock3Provider;
		initializedDock3Provider = undefined;
		dock3RegistrationMetaInfo = undefined;
		setDockProviderOptions(undefined);
		logger.info("Platform dock shutdown about to be called.");
		await provider.shutdown();
	}
}

/**
 * Show the dock component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Dock show called.");
	if (!isEmpty(initializedDock3Provider)) {
		// The platform dock has no explicit show, it is auto shown when initialized. Use the underlying
		// window so the show-dock connection action and the autoShow bootstrap option keep working.
		const dockWindow = initializedDock3Provider.getWindowSync();
		await dockWindow.show();
		await dockWindow.focus();
	}
}

/**
 * Minimize the dock component.
 * @returns Nothing.
 */
export async function minimize(): Promise<void> {
	logger.info("Dock minimize called.");
	if (!isEmpty(initializedDock3Provider)) {
		return initializedDock3Provider.getWindowSync().minimize();
	}
}

/**
 * Get the identity of the platform (Dock 3) dock window.
 * @returns The identity of the dock window, or undefined if the dock provider is not initialized.
 */
export function getIdentity(): OpenFin.Identity | undefined {
	if (isEmpty(initializedDock3Provider)) {
		return undefined;
	}
	return initializedDock3Provider.getWindowSync().identity;
}

/**
 * When a dock action is triggered, we need to know the window identity and the coordinates of the mouse in relation to the dock window.
 * @param dockProvider The dock provider.
 * @returns The window identity and the coordinates of the mouse in relation to the dock window.
 */
async function getActionPositionInfo(
	dockProvider: Dock3Provider
): Promise<{ windowIdentity: OpenFin.Identity; coordinates: { x: number; y: number } }> {
	const dockWindow = dockProvider.getWindowSync();
	const [mousePosition, dockBounds] = await Promise.all([
		fin.System.getMousePosition(),
		dockWindow.getBounds()
	]);
	return {
		windowIdentity: dockWindow.identity,
		coordinates: { x: mousePosition.left - dockBounds.left, y: mousePosition.top - dockBounds.top }
	};
}

/**
 * Build a themed icon definition for the given icon url, swapping in the light/dark variant path as required.
 * @param schemeMode The current color scheme mode (light or dark).
 * @param iconUrl The icon url to build the themed icon definition from.
 * @returns The icon url, or an object containing the dark and light variants if the url is theme specific.
 */
function buildSchemeIcon(schemeMode: string, iconUrl: string): string | { dark: string; light: string } {
	if (iconUrl?.includes(`/${schemeMode}/`)) {
		let darkIcon: string = iconUrl;
		let lightIcon: string = iconUrl;

		if (schemeMode === "dark") {
			lightIcon = iconUrl.replace(`/${schemeMode}/`, "/light/");
		} else if (schemeMode === "light") {
			darkIcon = iconUrl.replace(`/${schemeMode}/`, "/dark/");
		}
		return {
			dark: darkIcon,
			light: lightIcon
		};
	}
	return iconUrl;
}

/**
 * Maps options into ContentMenuEntry items, creating folders for nested options.
 * @param options - The options to map
 * @returns Array of ContentMenuEntry items
 */
function mapOptionsToContentMenu(options: DockButton["options"]): ContentMenuEntry[] {
	if (isEmpty(options)) {
		return [];
	}
	return options.map((option) => {
		// Check if this option has nested children
		if (option.options && Array.isArray(option.options) && option.options.length > 0) {
			// Create a folder entry with children
			return {
				type: "folder",
				id: (option as unknown as { id: string })?.id ?? randomUUID(), // Generate a unique ID
				label: option.tooltip,
				children: mapOptionsToContentMenu(option.options) // Recursively map children
			} as ContentMenuEntry;
		}

		// Create a simple content menu entry
		return {
			type: "item",
			id: (option as unknown as { id: string })?.id ?? randomUUID(),
			label: option.tooltip,
			icon: option.iconUrl,
			itemData: {
				action: option.action
			}
		} as ContentMenuEntry;
	});
}

/**
 * Build the Dock3 button entries from the workspace-shape dock buttons.
 * @param workspaceButtons The workspace-shape dock buttons.
 * @returns The Dock3 button entries.
 */
async function buildDock3ButtonEntries(
	workspaceButtons: DockButton[]
): Promise<{ favorites?: DockEntry[]; contentMenu?: ContentMenuEntry[] }> {
	const favorites: DockEntry[] = [];
	const contentMenu: ContentMenuEntry[] = [];
	const schemeMode = await getCurrentColorSchemeMode();

	for (const button of workspaceButtons) {
		const buttonType = button.type;
		if (buttonType === DockButtonNames.ActionButton) {
			const favButton: DockEntry = {
				id: button.id ?? button.action.id,
				type: "item",
				label: button.tooltip,
				itemData: { action: button.action },
				icon: buildSchemeIcon(schemeMode, button.iconUrl ?? "")
			};
			favorites.push(favButton);
		} else if (buttonType === DockButtonNames.DropdownButton || isEmpty(buttonType)) {
			if (button.options && button.options.length > 0) {
				const folderItem: ContentMenuEntry = {
					type: "folder",
					id: button.id ?? randomUUID(), // Generate a unique ID
					label: button.tooltip,
					children: mapOptionsToContentMenu(button.options) // Recursively map children
				} as ContentMenuEntry;
				contentMenu.push(folderItem);
			} else {
				const rootItem: ContentMenuEntry = {
					type: "item",
					id: button.id ?? randomUUID(),
					label: button.tooltip,
					icon: buildSchemeIcon(schemeMode, button.iconUrl ?? ""),
					itemData: { action: button?.action },
					bookmarked: false
				};
				contentMenu.push(rootItem);
			}
		}
	}
	logger.info("Dock Buttons - Favorites:", favorites);
	logger.info("Dock Buttons - Content Menu:", contentMenu);
	return {
		favorites,
		contentMenu
	};
}

/**
 * Refresh the platform dock favorites/content menu because the color scheme, apps or conditions have
 * changed. The existing order of the favorites/content menu is preserved (so that any user
 * rearrangement is not lost) while the entries themselves (icons, added/removed entries) are rebuilt
 * from config.
 */
async function refreshDock3(): Promise<void> {
	if (!isEmpty(initializedDock3Provider)) {
		const newButtons = await buildButtons();

		if (JSON.stringify(newButtons) !== JSON.stringify(getRegisteredButtons())) {
			setRegisteredButtons(newButtons);
			const mapped = await buildDock3ButtonEntries(newButtons);
			const currentConfig = initializedDock3Provider.config;

			// Preserve the current display order (which may reflect user rearrangement) while
			// swapping in the freshly built entries.
			const currentFavoriteIds = (currentConfig.favorites ?? [])
				.map((entry) => entry.id)
				.filter((id): id is string => isStringValue(id));
			const currentContentMenuIds = (currentConfig.contentMenu ?? [])
				.map((entry) => entry.id)
				.filter((id): id is string => isStringValue(id));

			const newFavorites = orderByIds(mapped.favorites ?? [], currentFavoriteIds);
			const newContentMenu = orderByIds(mapped.contentMenu ?? [], currentContentMenuIds);

			if (
				JSON.stringify(newFavorites) !== JSON.stringify(currentConfig.favorites) ||
				JSON.stringify(newContentMenu) !== JSON.stringify(currentConfig.contentMenu)
			) {
				await initializedDock3Provider.updateConfig({
					...currentConfig,
					favorites: newFavorites,
					contentMenu: newContentMenu
				});
			}
		}
	}
}

/**
 * Convert a platform dock (Dock 3) config into the flat workspace dock config shape so that it can be
 * persisted using the same storage endpoint as the workspace dock. The favorites and content menu
 * order is flattened into an ordered list of button ids which is then applied to the built workspace
 * buttons.
 * @param config The platform dock config to convert.
 * @returns The workspace dock config with identity.
 */
function buildWorkspaceConfigFromDock3(config: Dock3Config): DockProviderConfigWithIdentity {
	const orderedIds: string[] = [
		...(config.favorites ?? []).map((entry) => entry.id),
		...(config.contentMenu ?? []).map((entry) => entry.id)
	].filter((id): id is string => isStringValue(id));

	const orderedButtons = orderByIds(objectClone(getRegisteredButtons() ?? []), orderedIds);

	const dockProviderOptions = getDockProviderOptions();
	return {
		id: dockProviderOptions?.id ?? fin.me.identity.uuid,
		title: dockProviderOptions?.title ?? "",
		icon: dockProviderOptions?.icon ?? "",
		buttons: orderedButtons as PlatformDockButton[]
	};
}
