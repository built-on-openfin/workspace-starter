import type OpenFin from "@openfin/core";
import type {
	CustomActionPayload,
	GlobalContextMenuItemData,
	Locale,
	WorkspacePlatformProvider
} from "@openfin/workspace-platform";
import {
	CustomActionCallerType,
	GlobalContextMenuOptionType,
	getCurrentSync,
	init,
	type CreateSavedPageRequest,
	type CreateSavedWorkspaceRequest,
	type CustomActionsMap,
	type GlobalContextMenuItemTemplate,
	type OpenGlobalContextMenuPayload,
	type OpenPageTabContextMenuPayload,
	type OpenViewTabContextMenuPayload,
	type Page,
	type UpdateSavedPageRequest,
	type UpdateSavedWorkspaceRequest,
	type Workspace,
	type WorkspacePlatformModule,
	SUPPORTED_LANGUAGES
} from "@openfin/workspace-platform";
import type { CustomSettings } from "./shapes";

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());

	// Load the settings from the manifest
	const customSettings = await getManifestCustomSettings();

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(customSettings);

	// If we have launch bar settings then open the window
	// The content is from launch-bar.html and is driven by launch-bar.ts
	if (customSettings.launchBarWindowSettings) {
		await fin.Window.create(customSettings.launchBarWindowSettings);
	}
});

/**
 * Initialize the workspace platform.
 * @param customSettings The custom settings from the manifest.
 */
async function initializeWorkspacePlatform(customSettings: CustomSettings): Promise<void> {
	console.log("Initializing workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: customSettings.launchBarWindowSettings?.icon,
				workspacePlatform: {
					pages: [],
					favicon: customSettings.launchBarWindowSettings?.icon
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		],
		// Get the custom action used the launched windows.
		customActions: getCustomActions(),
		// Implement an override of some of the platform callback methods.
		overrideCallback
	});
}

/**
 * Bring the platform to life.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	console.log("Initializing the workspace components");

	// When the platform requests to be close we deregister from home and quit
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}

/**
 * Get the custom actions for the app.
 * @returns The custom actions map.
 */
function getCustomActions(): CustomActionsMap {
	return {
		"custom-save-page": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				console.dir({ message: "CUSTOM SAVE PAGE CLICKED", payload });
				console.dir({ message: "LAYOUT", layout: payload.customData.layout });
			}
		},
		"open-page": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				const pageId: string = payload?.customData?.pageId;
				const targetWindowIdentity: OpenFin.Identity = payload?.customData?.windowIdentity;
				if (pageId !== undefined && targetWindowIdentity !== undefined) {
					const platform: WorkspacePlatformModule = getCurrentSync();
					const page = await platform.Storage.getPage(pageId);

					if (page !== undefined && page !== null) {
						const targetWindow = platform.Browser.wrapSync(targetWindowIdentity);
						await targetWindow.addPage(page);
						await targetWindow.setActivePage(pageId);
					}
				}
			}
		},
		"lock-page-toggle": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				const platform: WorkspacePlatformModule = getCurrentSync();

				const { uuid, name } = await platform.Browser.getLastFocusedWindow();
				const browserWindow = platform.Browser.wrapSync({ uuid, name });

				// Get the active page and toggle its locked state
				const allPages = await browserWindow.getPages();
				const activePage = allPages.find((pg) => pg.isActive);
				if (activePage) {
					activePage.isLocked = !activePage.isLocked;
					await browserWindow.updatePage({
						pageId: activePage.pageId,
						page: activePage
					});
				}
			}
		},
		announce: async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				console.info("Announce called with payload:", payload);
				await showPopup(
					{ width: 400, height: 300 },
					payload.windowIdentity,
					"Announce",
					"Announce the application to anyone listening ?",
					[
						{
							id: "yes",
							label: "Yes",
							default: true
						},
						{
							id: "no",
							label: "No"
						}
					]
				);
			}
		},
		"custom-print": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				console.info("Print called with payload:", payload);
				await showPrintMenu({ x: payload.x, y: payload.y });
			}
		},
		"set-language": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
				console.info("Set Language called with payload:", payload);
				await getCurrentSync().setLanguage(payload.customData);
			}
		}
	};
}

/**
 * Show a popup window.
 * @param dimensions The dimensions of the popup window.
 * @param dimensions.width The window width.
 * @param dimensions.height The window height.
 * @param parentIdentity The parent window to be relative to.
 * @param title The title of the window.
 * @param instructions The instructions for the window.
 * @param buttons The buttons for the window.
 * @returns The result of the window.
 */
async function showPopup(
	dimensions: { width: number; height: number },
	parentIdentity: OpenFin.Identity,
	title: string,
	instructions: string,
	buttons: {
		id: string;
		label: string;
		default?: boolean;
	}[]
): Promise<string | undefined> {
	console.log("Parent Identity", parentIdentity);

	const browserWindow = fin.Window.wrapSync(parentIdentity);
	const parentBounds = await browserWindow.getBounds();

	console.log("Parent Bounds", parentBounds);

	const halfParentWidth = parentBounds.width / 2;
	const halfParentHeight = parentBounds.height / 2;
	const halfWidth = dimensions.width / 2;
	const halfHeight = dimensions.height / 2;

	const result = await browserWindow.showPopupWindow({
		name: randomUUID(),
		initialOptions: {
			modalParentIdentity: parentIdentity
		},
		additionalOptions: {
			customData: {
				title,
				instructions,
				buttons
			}
		},
		url: "http://localhost:8080/html/popup.html",
		x: halfParentWidth - halfWidth,
		y: halfParentHeight - halfHeight,
		width: dimensions.width,
		height: dimensions.height
	});

	if (result.result === "dismissed") {
		console.log("Popup dismissed");
	} else if (result.result === "clicked") {
		console.log("Popup clicked", result.data);
		return result.data as string;
	}
}

/**
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Create a class which overrides the platform provider.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Implementation for getting a list of saved workspaces from persistent storage.
		 * @param query an optional query.
		 * @returns The workspaces.
		 */
		public async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedWorkspaces(query);
		}

		/**
		 * Implementation for getting a single workspace in persistent storage.
		 * @param id The id of the workspace to get.
		 * @returns The workspace.
		 */
		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedWorkspace(id);
		}

		/**
		 * Implementation for creating a saved workspace in persistent storage.
		 * @param req the create saved workspace request.
		 * @returns Nothing.
		 */
		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.createSavedWorkspace(req);
		}

		/**
		 * Implementation for updating a saved workspace in persistent storage.
		 * @param req the update saved workspace request.
		 * @returns Nothing.
		 */
		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.updateSavedWorkspace(req);
		}

		/**
		 * Implementation for deleting a saved workspace in persistent storage.
		 * @param id of the id of the workspace to delete.
		 * @returns Nothing.
		 */
		public async deleteSavedWorkspace(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.deleteSavedWorkspace(id);
		}

		/**
		 * Implementation for getting a list of saved pages from persistent storage.
		 * @param query an optional query.
		 * @returns The saved pages.
		 */
		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedPages(query);
		}

		/**
		 * Implementation for getting a single page in persistent storage.
		 * @param id The id of the saved page to get.
		 * @returns The saved page.
		 */
		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedPage(id);
		}

		/**
		 * Implementation for creating a saved page in persistent storage.
		 * @param req the create saved page request.
		 * @returns Nothing.
		 */
		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.createSavedPage(req);
		}

		/**
		 * Implementation for updating a saved page in persistent storage.
		 * @param req the update saved page request.
		 * @returns Nothing.
		 */
		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.updateSavedPage(req);
		}

		/**
		 * Implementation for deleting a saved page in persistent storage.
		 * @param id of the id of the page to delete.
		 */
		public async deleteSavedPage(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			await super.deleteSavedPage(id);
		}

		/**
		 * Implementation for getting current selected language.
		 * @returns language in ISO language code
		 */
		public async getLanguage(): Promise<Locale> {
			const currentLanguage = await super.getLanguage();
			console.log(`Current language requested: ${currentLanguage}`);
			return currentLanguage;
		}

		/**
		 * Implementation for setting the language.
		 * @param locale The locale in ISO language code format.
		 */
		public async setLanguage(locale: Locale): Promise<void> {
			if (!SUPPORTED_LANGUAGES.includes(locale)) {
				console.warn(
					`Language ${locale} is not supported. Supported languages are: ${SUPPORTED_LANGUAGES.join(", ")}`
				);
			} else {
				console.log(`Setting language to: ${locale}`);
			}
			await super.setLanguage(locale);
		}

		/**
		 * Implementation for showing a global context menu given a menu template,
		 * handler callback, and screen coordinates.
		 * @param req the payload received by the provider call
		 * @param callerIdentity OF identity of the entity from which the request originated
		 * @returns Nothing.
		 */
		public async openGlobalContextMenu(
			req: OpenGlobalContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			// you can customize the browser main menu here
			const platform = getCurrentSync();
			const lang = await platform.getLanguage();
			let openPageLabel;
			let languageLabel;
			let englishLabel;
			let germanLabel;

			if (lang === "en-US") {
				openPageLabel = "Open Page";
				languageLabel = "Language";
				englishLabel = "English";
				germanLabel = "German";
			} else if (lang === "de-DE") {
				openPageLabel = "Seite öffnen";
				languageLabel = "Sprache";
				englishLabel = "Englisch";
				germanLabel = "Deutsch";
			}
			const template = req.template;
			const pages: Page[] = await platform.Storage.getPages();
			const pagesMenu: OpenFin.MenuItemTemplate<GlobalContextMenuItemData>[] = [];
			const menuEntry: GlobalContextMenuItemTemplate = {
				label: openPageLabel,
				submenu: []
			};
			const languageMenu: GlobalContextMenuItemTemplate = {
				label: languageLabel,
				submenu: [
					{
						label: englishLabel,
						type: "normal",
						enabled: lang !== "en-US",
						data: {
							type: GlobalContextMenuOptionType.Custom,
							action: {
								id: "set-language",
								customData: "en-US"
							}
						}
					},
					{
						label: germanLabel,
						type: "normal",
						enabled: lang !== "de-DE",
						data: {
							type: GlobalContextMenuOptionType.Custom,
							action: {
								id: "set-language",
								customData: "de-DE"
							}
						}
					}
				]
			};
			template.unshift(languageMenu);
			const allOpenPages = await platform.Browser.getAllAttachedPages();
			if (pages.length > 0) {
				for (const page of pages) {
					const pageExists = allOpenPages.some((openPage) => page.pageId === openPage.pageId);

					pagesMenu.push({
						label: page.title,
						type: "normal",
						enabled: !pageExists,
						data: {
							type: GlobalContextMenuOptionType.Custom,
							action: {
								id: "open-page",
								customData: { pageId: page.pageId, windowIdentity: callerIdentity }
							}
						}
					});
				}
				if (menuEntry.submenu) {
					menuEntry.submenu.push(...pagesMenu);
				}

				const savePageAsIndex = template.findIndex(
					(existingMenuEntry) =>
						existingMenuEntry?.data?.type !== undefined &&
						existingMenuEntry.data.type === GlobalContextMenuOptionType.SavePageAs
				);

				template.splice(savePageAsIndex + 1, 0, menuEntry);
			}

			return super.openGlobalContextMenu(
				{
					...req,
					template
				},
				callerIdentity
			);
		}

		/**
		 * Implementation for showing a view tab context menu given a menu template,
		 * handler callback, and screen coordinates.
		 * @param req the payload received by the provider call
		 * @param callerIdentity OF identity of the entity from which the request originated
		 * @returns Nothing.
		 */
		public async openViewTabContextMenu(
			req: OpenViewTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			// you can customize the view right click context menu here
			return super.openViewTabContextMenu(
				{
					...req
				},
				callerIdentity
			);
		}

		/**
		 * Implementation for showing a page tab context menu given a menu template,
		 * handler callback, and screen coordinates.
		 * @param req the payload received by the provider call
		 * @param callerIdentity OF identity of the entity from which the request originated
		 * @returns Nothing.
		 */
		public async openPageTabContextMenu(
			req: OpenPageTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			// you can customize the page tab right click context menu here
			return super.openPageTabContextMenu(
				{
					...req
				},
				callerIdentity
			);
		}
	}
	return new Override();
}

/**
 * Display the print options menu.
 * @param position The position to show the menu.
 * @param position.x The x position to show the menu.
 * @param position.y The y position to show the menu.
 */
async function showPrintMenu(position: { x: number; y: number }): Promise<void> {
	const platform = getCurrentSync();
	const { uuid, name } = await platform.Browser.getLastFocusedWindow();
	const browserWindow = platform.Browser.wrapSync({ uuid, name });

	const template: OpenFin.MenuItemTemplate<{ type: string }>[] = [
		{
			label: "Print All",
			data: { type: "views" }
		},
		{
			label: "Print Screen",
			data: { type: "window" }
		}
	];

	const r = await browserWindow.openfinWindow.showPopupMenu({
		template,
		x: position.x,
		y: position.y
	});

	if (r.result === "closed") {
		console.log("Menu dismissed");
	} else if (r.data.type === "views") {
		await browserWindow.openfinWindow.print({
			content: "views",
			includeSelf: false
		});
	} else if (r.data.type === "window") {
		await browserWindow.openfinWindow.print({
			content: "screenshot"
		});
	}
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c: string): string {
		// eslint-disable-next-line no-bitwise
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
