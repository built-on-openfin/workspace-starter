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
import { BROWSER_SCENARIOS, launchBrowserScenario, type BrowserScenarioId } from "./browser-scenarios";
import type { CustomSettings } from "./shapes";

const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

/**
 * Restores init-option checkboxes after Restart Demo; does not auto-initialize the platform.
 */
const STORAGE_KEY_RESTART_DEMO_INIT_OPTIONS = "register-with-browser.restartDemoInitOptions";

/**
 * Init-time control panel options snapshotted by the Workspace SDK inside init().
 */
interface BrowserInitOptionsFromDOM {
	/** Whether duplicate page titles are allowed. */
	allowDuplicatePageTitles: boolean;
	/** Suppress the Workspace Switched success indicator. */
	suppressWorkspaceSwitched: boolean;
	/** Suppress the Workspace Saved success indicator (save only). */
	suppressWorkspaceSaved: boolean;
}

let manifestCustomSettings: CustomSettings = {};
let isPlatformInitialized = false;

/**
 * Read init-time browser options from the control panel checkboxes.
 * @returns The checkbox values for platform init.
 */
function getBrowserInitOptionsFromDOM(): BrowserInitOptionsFromDOM {
	return {
		allowDuplicatePageTitles:
			document.querySelector<HTMLInputElement>("#allowDuplicatePageTitles")?.checked ?? false,
		suppressWorkspaceSwitched:
			document.querySelector<HTMLInputElement>("#suppressWorkspaceSwitched")?.checked ?? false,
		suppressWorkspaceSaved:
			document.querySelector<HTMLInputElement>("#suppressWorkspaceSaved")?.checked ?? false
	};
}

/**
 * Align init-option checkboxes after Restart Demo (restore from localStorage).
 * @param options The options to restore for the upcoming init.
 */
function syncInitOptionCheckboxesFromOptions(options: BrowserInitOptionsFromDOM): void {
	const scenarioSelect = document.querySelector<HTMLSelectElement>("#scenario");
	const allowDuplicatePageTitlesCheckbox =
		document.querySelector<HTMLInputElement>("#allowDuplicatePageTitles");
	const suppressWorkspaceSwitchedCheckbox = document.querySelector<HTMLInputElement>(
		"#suppressWorkspaceSwitched"
	);
	const suppressWorkspaceSavedCheckbox = document.querySelector<HTMLInputElement>("#suppressWorkspaceSaved");
	const duplicateTitlesHint = document.querySelector<HTMLParagraphElement>("#duplicate-titles-hint");

	if (allowDuplicatePageTitlesCheckbox) {
		allowDuplicatePageTitlesCheckbox.checked = options.allowDuplicatePageTitles;
	}
	if (suppressWorkspaceSwitchedCheckbox) {
		suppressWorkspaceSwitchedCheckbox.checked = options.suppressWorkspaceSwitched;
	}
	if (suppressWorkspaceSavedCheckbox) {
		suppressWorkspaceSavedCheckbox.checked = options.suppressWorkspaceSaved;
	}
	if (scenarioSelect && allowDuplicatePageTitlesCheckbox && duplicateTitlesHint) {
		updateDuplicatePageTitlesHintTextOnly(
			scenarioSelect,
			allowDuplicatePageTitlesCheckbox,
			duplicateTitlesHint
		);
	}
}

/**
 * Initialize the workspace platform from the control panel.
 */
async function handleInitializePlatformClick(): Promise<void> {
	const initOptions = getBrowserInitOptionsFromDOM();
	await initializeWorkspacePlatform(manifestCustomSettings, initOptions);
	isPlatformInitialized = true;
	setControlState("initialized");
}

/**
 * Drop session markers so Quit starts a cold session next time.
 */
function clearWorkspaceSessionMarkers(): void {
	localStorage.removeItem(STORAGE_KEY_RESTART_DEMO_INIT_OPTIONS);
	// Remove legacy Restart Demo key used before indicator suppress options were added.
	localStorage.removeItem("register-with-browser.restartDemoAllowDupTitles");
}

/**
 * Parse restart-demo init options from localStorage.
 * @param raw The raw localStorage value.
 * @returns Parsed options, or null when the value is missing or invalid.
 */
function parseRestartDemoInitOptions(raw: string | null): BrowserInitOptionsFromDOM | null {
	if (raw === null) {
		return null;
	}
	try {
		const parsed: unknown = JSON.parse(raw);
		if (parsed !== null && typeof parsed === "object") {
			const record = parsed as { [key: string]: unknown };
			return {
				allowDuplicatePageTitles: record.allowDuplicatePageTitles === true,
				suppressWorkspaceSwitched: record.suppressWorkspaceSwitched === true,
				suppressWorkspaceSaved: record.suppressWorkspaceSaved === true
			};
		}
	} catch {
		// Legacy Restart Demo stored only the duplicate-titles boolean as "true"/"false".
		if (raw === "true" || raw === "false") {
			return {
				allowDuplicatePageTitles: raw === "true",
				suppressWorkspaceSwitched: false,
				suppressWorkspaceSaved: false
			};
		}
	}
	return null;
}

window.addEventListener("DOMContentLoaded", async () => {
	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async () => {
		await quit();
	});

	manifestCustomSettings = await getManifestCustomSettings();

	const restartDemoInitOptions =
		parseRestartDemoInitOptions(localStorage.getItem(STORAGE_KEY_RESTART_DEMO_INIT_OPTIONS)) ??
		parseRestartDemoInitOptions(localStorage.getItem("register-with-browser.restartDemoAllowDupTitles"));

	await initializeDOM();

	if (restartDemoInitOptions !== null) {
		localStorage.removeItem(STORAGE_KEY_RESTART_DEMO_INIT_OPTIONS);
		localStorage.removeItem("register-with-browser.restartDemoAllowDupTitles");
		syncInitOptionCheckboxesFromOptions(restartDemoInitOptions);
	}
});

/**
 * Initialize the HERE Core UI Platform with explicit browser init options.
 * The Workspace SDK snapshots browser config inside init(); a getter is not reliably re-read later.
 * @param customSettings The custom settings from the manifest.
 * @param initOptions Init-time browser options from the control panel.
 */
async function initializeWorkspacePlatform(
	customSettings: CustomSettings,
	initOptions: BrowserInitOptionsFromDOM
): Promise<void> {
	console.log("Initializing HERE Core UI Platform", initOptions);
	await init({
		browser: {
			allowDuplicatePageTitles: initOptions.allowDuplicatePageTitles,
			indicators: {
				suppressWorkspaceSwitched: initOptions.suppressWorkspaceSwitched,
				suppressWorkspaceSaved: initOptions.suppressWorkspaceSaved
			},
			browserIconSize: customSettings.browserIconSize,
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON,
					tabSearchButton: {
						pageTabs: { enabled: true },
						viewTabs: { enabled: true }
					}
				}
			}
		},
		// Get the custom action used the launched windows.
		customActions: getCustomActions(),
		// Implement an override of some of the platform callback methods.
		overrideCallback
	});
}

/**
 * Initialize the control panel UI (no WorkspacePlatform.init on load).
 */
async function initializeDOM(): Promise<void> {
	const scenarioSelect = document.querySelector<HTMLSelectElement>("#scenario");
	const initializePlatformButton = document.querySelector<HTMLButtonElement>("#initialize-platform");
	const restartDemoButton = document.querySelector<HTMLButtonElement>("#restart-demo");
	const launchButton = document.querySelector<HTMLButtonElement>("#launch");
	const quitButton = document.querySelector<HTMLButtonElement>("#quit");
	const allowDuplicatePageTitlesCheckbox =
		document.querySelector<HTMLInputElement>("#allowDuplicatePageTitles");
	const duplicateTitlesHint = document.querySelector<HTMLParagraphElement>("#duplicate-titles-hint");

	if (scenarioSelect && initializePlatformButton && restartDemoButton && launchButton && quitButton) {
		for (const scenario of BROWSER_SCENARIOS) {
			const option = document.createElement("option");
			option.value = scenario.id;
			option.textContent = scenario.label;
			scenarioSelect.append(option);
		}

		scenarioSelect.addEventListener("change", () => {
			updateDuplicatePageTitlesHint(
				scenarioSelect,
				allowDuplicatePageTitlesCheckbox,
				duplicateTitlesHint,
				"scenario-change"
			);
		});
		allowDuplicatePageTitlesCheckbox?.addEventListener("change", () => {
			updateDuplicatePageTitlesHintTextOnly(
				scenarioSelect,
				allowDuplicatePageTitlesCheckbox,
				duplicateTitlesHint
			);
		});
		updateDuplicatePageTitlesHint(
			scenarioSelect,
			allowDuplicatePageTitlesCheckbox,
			duplicateTitlesHint,
			"init-dom"
		);

		initializePlatformButton.addEventListener("click", async () => {
			await handleInitializePlatformClick();
		});

		restartDemoButton.addEventListener("click", async () => {
			await restartDemo();
		});

		launchButton.addEventListener("click", async () => {
			const scenarioId = scenarioSelect.value as BrowserScenarioId;
			await launchBrowserScenario(scenarioId);
		});

		quitButton.addEventListener("click", async () => {
			await quit();
		});

		setControlState("uninitialized");
	}
}

/**
 * The control panel state.
 */
type ControlState = "uninitialized" | "initialized";

/**
 * Enable or disable controls based on platform initialization state.
 * @param state Whether the workspace platform has been initialized.
 */
function setControlState(state: ControlState): void {
	const initializePlatformButton = document.querySelector<HTMLButtonElement>("#initialize-platform");
	const restartDemoButton = document.querySelector<HTMLButtonElement>("#restart-demo");
	const launchButton = document.querySelector<HTMLButtonElement>("#launch");
	const quitButton = document.querySelector<HTMLButtonElement>("#quit");
	const scenarioSelect = document.querySelector<HTMLSelectElement>("#scenario");
	const allowDuplicatePageTitlesCheckbox =
		document.querySelector<HTMLInputElement>("#allowDuplicatePageTitles");
	const suppressWorkspaceSwitchedCheckbox = document.querySelector<HTMLInputElement>(
		"#suppressWorkspaceSwitched"
	);
	const suppressWorkspaceSavedCheckbox = document.querySelector<HTMLInputElement>("#suppressWorkspaceSaved");

	const initialized = state === "initialized";

	if (initializePlatformButton && restartDemoButton && launchButton && quitButton && scenarioSelect) {
		initializePlatformButton.disabled = initialized;
		restartDemoButton.disabled = !initialized;
		launchButton.disabled = !initialized;
		quitButton.disabled = false;
		scenarioSelect.disabled = false;
		if (allowDuplicatePageTitlesCheckbox) {
			allowDuplicatePageTitlesCheckbox.disabled = initialized;
		}
		if (suppressWorkspaceSwitchedCheckbox) {
			suppressWorkspaceSwitchedCheckbox.disabled = initialized;
		}
		if (suppressWorkspaceSavedCheckbox) {
			suppressWorkspaceSavedCheckbox.disabled = initialized;
		}
	}
}

/**
 * Restart the application and return to uninitialized control state so settings can be changed before init.
 */
async function restartDemo(): Promise<void> {
	if (!isPlatformInitialized) {
		return;
	}
	localStorage.setItem(STORAGE_KEY_RESTART_DEMO_INIT_OPTIONS, JSON.stringify(getBrowserInitOptionsFromDOM()));
	const platform = getCurrentSync();
	const browserWindows = await platform.Browser.getAllWindows();
	await Promise.all(browserWindows.map(async (browserWindow) => browserWindow.openfinWindow.close()));
	const app = await fin.Application.getCurrent();
	await app.restart();
}

/**
 * Exit the application, closing browsers and the platform when initialized.
 */
async function quit(): Promise<void> {
	clearWorkspaceSessionMarkers();
	if (isPlatformInitialized) {
		const platform = getCurrentSync();
		const browserWindows = await platform.Browser.getAllWindows();
		await Promise.all(browserWindows.map(async (browserWindow) => browserWindow.openfinWindow.close()));
		await fin.Platform.getCurrentSync().quit();
	} else {
		const app = await fin.Application.getCurrent();
		await app.quit();
	}
}

const DUPLICATE_TITLES_HINT_ALLOWED =
	"Enable Allow Duplicate Page Titles before initializing the platform. On launch, the second tab may still show a suffix such as (1) — that is expected. " +
	"To see duplicate titles in action: after the browser opens, rename one page tab to match the other (for example, both Shared Page Title). " +
	"The platform will accept the duplicate name when the checkbox is enabled.";

const DUPLICATE_TITLES_HINT_DISALLOWED =
	"With Allow Duplicate Page Titles unchecked, initialize the platform then launch the browser and try renaming one page tab to match the other. " +
	"The platform will reject the duplicate or append a suffix such as (1). " +
	"Use Restart Demo, enable the checkbox, and initialize again to allow matching titles.";

/**
 * Update only the hint text from the current checkbox state (never changes the checkbox).
 * @param scenarioSelect The scenario dropdown.
 * @param allowDuplicatePageTitlesCheckbox The allow duplicate titles checkbox.
 * @param duplicateTitlesHint The hint paragraph for the duplicate titles scenario.
 */
function updateDuplicatePageTitlesHintTextOnly(
	scenarioSelect: HTMLSelectElement,
	allowDuplicatePageTitlesCheckbox: HTMLInputElement | null,
	duplicateTitlesHint: HTMLParagraphElement | null
): void {
	const isDuplicateTitlesScenario = scenarioSelect.value === "duplicate-page-titles";
	if (duplicateTitlesHint) {
		duplicateTitlesHint.classList.remove("error");
		duplicateTitlesHint.hidden = !isDuplicateTitlesScenario;
		if (isDuplicateTitlesScenario) {
			duplicateTitlesHint.textContent = allowDuplicatePageTitlesCheckbox?.checked
				? DUPLICATE_TITLES_HINT_ALLOWED
				: DUPLICATE_TITLES_HINT_DISALLOWED;
		}
	}
}

/**
 * Update hint when the scenario changes. Defaults the checkbox only when entering the demo scenario.
 * @param scenarioSelect The scenario dropdown.
 * @param allowDuplicatePageTitlesCheckbox The allow duplicate titles checkbox.
 * @param duplicateTitlesHint The hint paragraph for the duplicate titles scenario.
 * @param trigger What triggered this update.
 */
function updateDuplicatePageTitlesHint(
	scenarioSelect: HTMLSelectElement,
	allowDuplicatePageTitlesCheckbox: HTMLInputElement | null,
	duplicateTitlesHint: HTMLParagraphElement | null,
	trigger: "scenario-change" | "init-dom"
): void {
	const isDuplicateTitlesScenario = scenarioSelect.value === "duplicate-page-titles";
	if (
		allowDuplicatePageTitlesCheckbox &&
		isDuplicateTitlesScenario &&
		trigger === "scenario-change" &&
		!isPlatformInitialized
	) {
		allowDuplicatePageTitlesCheckbox.checked = true;
	}
	updateDuplicatePageTitlesHintTextOnly(
		scenarioSelect,
		allowDuplicatePageTitlesCheckbox,
		duplicateTitlesHint
	);
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
			if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
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

				const lastFocusedWindow = await platform.Browser.getLastFocusedWindow();
				if (!lastFocusedWindow) {
					throw new Error("No last focused window found.");
				}
				const { uuid, name } = lastFocusedWindow;
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
		"rename-current-page": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				const platform: WorkspacePlatformModule = getCurrentSync();

				const lastFocusedWindow = await platform.Browser.getLastFocusedWindow();
				if (!lastFocusedWindow) {
					throw new Error("No last focused window found.");
				}
				const { uuid, name } = lastFocusedWindow;
				const browserWindow = platform.Browser.wrapSync({ uuid, name });

				// Get the active page and toggle its locked state
				const allPages = await browserWindow.getPages();
				const activePage = allPages.find((pg) => pg.isActive);
				if (activePage) {
					activePage.title = `Renamed Page ${Math.floor(Math.random() * 1000)}`;
					await browserWindow.updatePage({
						pageId: activePage.pageId,
						page: activePage
					});
					// optionally save the page.
					await platform.Storage.updatePage({
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
		},
		"debug-platform": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
				console.info("Debug Platform Called.");
				await fin.System.showDeveloperTools(fin.me.identity);
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
			modalParentIdentity: parentIdentity,
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
 * @param WorkspacePlatformProvider The HERE Core UI Platform class to extend.
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
		public async getSavedWorkspace(id: string): Promise<Workspace | undefined> {
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
		public async getSavedPage(id: string): Promise<Page | undefined> {
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
			const debugPlatform: GlobalContextMenuItemTemplate = {
				label: "Debug Platform",
				data: {
					type: GlobalContextMenuOptionType.Custom,
					action: {
						id: "debug-platform"
					}
				}
			};
			template.unshift(debugPlatform);
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
	const lastFocusedWindow = await platform.Browser.getLastFocusedWindow();
	if (!lastFocusedWindow) {
		throw new Error("No last focused window found.");
	}
	const { uuid, name } = lastFocusedWindow;
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
