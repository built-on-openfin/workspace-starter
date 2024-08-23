import type OpenFin from "@openfin/core";
import type {
	BrowserCreateWindowRequest,
	BrowserSnapshotWindow,
	Page,
	PageLayout,
	Workspace
} from "@openfin/workspace-platform";
import { deepEqual, deepMerge, isEmpty, objectClone } from "workspace-platform-starter/utils";

/**
 * All the workspace keys.
 */
type WorkspaceKeys = keyof Workspace;

/**
 * All the workspace snapshot keys.
 */
type WorkspaceSnapshotKeys = "windows" | "snapshotDetails" | "interopSnapshotDetails";

/**
 * All the browser window keys.
 */
type BrowserWindowKeys =
	| keyof BrowserSnapshotWindow
	| "title"
	| "center"
	| "transparent"
	| "alwaysOnBottom"
	| "backgroundThrottling"
	| "draggable"
	| "resize"
	| "spellCheck"
	| "enableBeforeUnload";

/**
 * All the workspace platform keys.
 */
type WorkspacePlatformKeys =
	| "pages"
	| "favicon"
	| "title"
	| "newTabUrl"
	| "newPageUrl"
	| "toolbarOptions"
	| "windowStateButtonOptions"
	| "disableMultiplePages"
	| "isLocked"
	| "preventPageDragIn"
	| "preventPageDragOut"
	| "preventPageDrag"
	| "preventPageClose"
	| "_internalDeferShowOptions"
	| "windowType";

/**
 * All the keys for page.
 */
type PageKeys =
	| "pageId"
	| "title"
	| "layout"
	| "isReadOnly"
	| "isActive"
	| "panels"
	| "customData"
	| "hasUnsavedChanges";

/**
 * All the keys for page layout.
 */
type PageLayoutKeys =
	| "settings"
	| "dimensions"
	| "labels"
	| "content"
	| "isClosable"
	| "reorderEnabled"
	| "title"
	| "openPopouts"
	| "layoutDetails"
	| "maximisedItemId";

/**
 * All the keys for page layout settings.
 */
type PageLayoutSettingsKeys =
	| "constrainDragToContainer"
	| "constrainDragToHeaders"
	| "showPopoutIcon"
	| "showMaximiseIcon"
	| "showCloseIcon"
	| "hasHeaders"
	| "reorderEnabled"
	| "preventDragOut"
	| "preventDragIn"
	| "popoutWholeStack"
	| "selectionEnabled"
	| "blockedPopoutsThrowError"
	| "closePopoutsOnUnload"
	| "responsiveMode"
	| "tabOverlapAllowance"
	| "reorderOnTabMenuClick"
	| "tabControlOffset"
	| "newTabButton";

/**
 * All the component types.
 */
type ComponentType =
	| OpenFin.LayoutItemConfig
	| OpenFin.LayoutRow
	| OpenFin.LayoutColumn
	| OpenFin.LayoutComponent;

/**
 * All the component keys
 */
type ComponentKey =
	| keyof OpenFin.LayoutItemConfig
	// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
	| keyof OpenFin.LayoutRow
	// eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
	| keyof OpenFin.LayoutColumn
	| keyof OpenFin.LayoutComponent
	| "reorderEnabled"
	| "activeItemIndex";

/**
 * All the keys for the component state.
 */
type ComponentStateKeys =
	| keyof OpenFin.ViewCreationOptions
	| "backgroundThrottling"
	| "uuid"
	| "initialUrl"
	| "componentName";

/**
 * Map the platform workspace data to storage version.
 * @param workspace The workspace to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 * @returns The storage workspace.
 */
export function mapPlatformWorkspaceToStorage(
	workspace: Workspace | undefined,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): Workspace {
	if (isEmpty(workspace)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return undefined as any as Workspace;
	}

	const clone: Workspace = objectClone(workspace);

	for (const win of clone.snapshot.windows) {
		platformWorkspaceWindowToStorage(win, defaultOptions);
	}

	// Remove platform dependent information
	removeProp<Workspace, WorkspaceKeys>(clone, "metadata");

	const workspaceSnapshotDefaults: {
		propName: WorkspaceSnapshotKeys;
		defaultValue: unknown;
	}[] = [
		{
			propName: "interopSnapshotDetails",
			defaultValue: {
				contextGroupStates: {
					green: {},
					purple: {},
					orange: {},
					red: {},
					pink: {},
					yellow: {}
				}
			}
		}
		// Skip to make platform dependent and remove below
		// { propName: "snapshotDetails", defaultValue: "" },
	];

	for (const workspaceSnapshotDefault of workspaceSnapshotDefaults) {
		removePropIfNonDefault<unknown, WorkspaceSnapshotKeys>(
			clone.snapshot,
			workspaceSnapshotDefault.propName,
			workspaceSnapshotDefault.defaultValue
		);
	}

	// remove platform dependent props
	removeProp<unknown, WorkspaceSnapshotKeys>(clone.snapshot, "snapshotDetails");

	return clone;
}

/**
 * Map the platform page data to storage version.
 * @param page The page to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 * @returns The mapped page.
 */
export function mapPlatformPageToStorage(
	page: Page | undefined,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): Page {
	if (isEmpty(page)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return undefined as any as Page;
	}

	const clone = objectClone(page);
	platformPageToStorage(clone, defaultOptions);
	return clone;
}

/**
 * Map the platform window data to storage.
 * @param window The window to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 */
function platformWorkspaceWindowToStorage(
	window: BrowserSnapshotWindow,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): void {
	const windowDefaults: {
		propName: BrowserWindowKeys;
		defaultValue: unknown;
	}[] = [
		{ propName: "uuid", defaultValue: "" },
		{ propName: "url", defaultValue: "" },
		{ propName: "title", defaultValue: "" },
		{ propName: "alwaysOnTop", defaultValue: false },
		{ propName: "frame", defaultValue: false },
		{ propName: "icon", defaultValue: "" },
		{ propName: "x", defaultValue: -1 },
		{ propName: "y", defaultValue: -1 },
		{ propName: "width", defaultValue: -1 },
		{ propName: "height", defaultValue: -1 },
		{ propName: "center", defaultValue: false },
		{ propName: "defaultLeft", defaultValue: 0 },
		{ propName: "defaultTop", defaultValue: 0 },
		{ propName: "defaultWidth", defaultValue: -1 },
		{ propName: "defaultHeight", defaultValue: -1 },
		{ propName: "minWidth", defaultValue: 200 },
		{ propName: "minHeight", defaultValue: 200 },
		{ propName: "maxWidth", defaultValue: -1 },
		{ propName: "maxHeight", defaultValue: -1 },
		{ propName: "minimizable", defaultValue: true },
		{ propName: "maximizable", defaultValue: true },
		{ propName: "state", defaultValue: "normal" },
		{ propName: "opacity", defaultValue: 1 },
		{ propName: "transparent", defaultValue: false },
		{
			propName: "resizeRegion",
			defaultValue: {
				bottomRightCorner: 20,
				size: 7,
				sides: {
					top: true,
					right: true,
					bottom: true,
					left: true
				}
			}
		},
		{
			propName: "accelerator",
			defaultValue: {
				devtools: false,
				zoom: false,
				reload: false,
				reloadIgnoringCache: false
			}
		},
		{
			propName: "alphaMask",
			defaultValue: {
				blue: -1,
				green: -1,
				red: -1
			}
		},
		{ propName: "alwaysOnBottom", defaultValue: false },
		{
			propName: "api",
			defaultValue: {
				iframe: {
					crossOriginInjection: false,
					sameOriginInjection: true,
					enableDeprecatedSharedName: false
				}
			}
		},
		{ propName: "applicationIcon", defaultValue: "" },
		{ propName: "aspectRatio", defaultValue: 0 },
		{ propName: "autoShow", defaultValue: false },
		{ propName: "backgroundThrottling", defaultValue: true },
		{
			propName: "contentNavigation",
			defaultValue: {
				allowlist: ["<all_urls>"],
				denylist: [],
				whitelist: ["<all_urls>"],
				blacklist: []
			}
		},
		{
			propName: "contentRedirect",
			defaultValue: {
				allowlist: ["<all_urls>"],
				denylist: [],
				whitelist: ["<all_urls>"],
				blacklist: []
			}
		},
		{
			propName: "contentCreation",
			defaultValue: {
				rules: []
			}
		},
		{
			propName: "contextMenuSettings",
			defaultValue: {
				enable: true,
				devtools: true,
				reload: false
			}
		},
		{
			propName: "cornerRounding",
			defaultValue: {
				height: 0,
				width: 0
			}
		},
		{ propName: "closeOnLastViewRemoved", defaultValue: false },
		{ propName: "draggable", defaultValue: false },
		{ propName: "includeInSnapshots", defaultValue: true },
		{ propName: "resizable", defaultValue: true },
		{ propName: "resize", defaultValue: true },
		{ propName: "saveWindowState", defaultValue: false },
		{ propName: "shadow", defaultValue: false },
		{ propName: "showTaskbarIcon", defaultValue: true },
		{ propName: "showBackgroundImages", defaultValue: false },
		{ propName: "smallWindow", defaultValue: false },
		{ propName: "spellCheck", defaultValue: false },
		{ propName: "taskbarIcon", defaultValue: "" },
		{ propName: "waitForPageLoad", defaultValue: false },
		{ propName: "backgroundColor", defaultValue: "" },
		{ propName: "fdc3InteropApi", defaultValue: "" },
		{ propName: "enableBeforeUnload", defaultValue: false },
		// { propName: "hotkeys", defaultValue: [] },
		// { propName: "taskbarIconGroup", defaultValue: "" },
		{
			propName: "viewVisibility",
			defaultValue: {
				showViewsOnSplitterDrag: {
					enabled: true
				},
				showViewsOnWindowResize: {
					enabled: true
				},
				showViewsOnTabDrag: {
					enabled: true
				}
			}
		},
		{ propName: "autoplayPolicy", defaultValue: "no-user-gesture-required" },
		{
			propName: "permissions",
			defaultValue: {}
		},
		{ propName: "contextMenu", defaultValue: true },
		{
			propName: "contextMenuOptions",
			defaultValue: {
				template: [],
				enabled: false
			}
		},
		{ propName: "ignoreSavedWindowState", defaultValue: true },
		{ propName: "preloadScripts", defaultValue: [] }
	];

	for (const windowDefault of windowDefaults) {
		removePropIfNonDefault<BrowserSnapshotWindow, BrowserWindowKeys>(
			window,
			windowDefault.propName,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(defaultOptions?.window as any)?.[windowDefault.propName] ?? windowDefault.defaultValue
		);
	}

	// remove platform dependent props
	removeProp<BrowserSnapshotWindow, BrowserWindowKeys>(window, "hotkeys");
	removeProp<BrowserSnapshotWindow, BrowserWindowKeys>(window, "taskbarIconGroup");
	removeProp<BrowserSnapshotWindow, BrowserWindowKeys>(window, "experimental");

	if (window.workspacePlatform) {
		// If this is a workspace platform then remove the layout prop from the window
		// to avoid duplication
		removeProp<BrowserSnapshotWindow, BrowserWindowKeys>(window, "layout");

		const workspacePlatformDefaults: {
			propName: WorkspacePlatformKeys;
			defaultValue: unknown;
		}[] = [
			{ propName: "favicon", defaultValue: "" },
			{ propName: "title", defaultValue: "" },
			// Skip to make platform dependent and remove below
			// { propName: "newTabUrl", defaultValue: "" },
			// { propName: "newPageUrl", defaultValue: "" },
			// { propName: "toolbarOptions", defaultValue: { } },
			{ propName: "windowStateButtonOptions", defaultValue: undefined },
			{ propName: "disableMultiplePages", defaultValue: false },
			{ propName: "isLocked", defaultValue: false },
			{ propName: "preventPageDragIn", defaultValue: false },
			{ propName: "preventPageDragOut", defaultValue: false },
			{ propName: "preventPageDrag", defaultValue: false },
			{ propName: "preventPageClose", defaultValue: false },
			{ propName: "windowType", defaultValue: "browser" }
		];

		for (const workspacePlatformDefault of workspacePlatformDefaults) {
			removePropIfNonDefault<unknown, WorkspacePlatformKeys>(
				window.workspacePlatform,
				workspacePlatformDefault.propName,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(defaultOptions?.window?.workspacePlatform as any)?.[workspacePlatformDefault.propName] ??
					workspacePlatformDefault.defaultValue
			);
		}

		// remove platform dependent props
		removeProp<unknown, WorkspacePlatformKeys>(window.workspacePlatform, "newTabUrl");
		removeProp<unknown, WorkspacePlatformKeys>(window.workspacePlatform, "newPageUrl");
		removeProp<unknown, WorkspacePlatformKeys>(window.workspacePlatform, "toolbarOptions");
		removeProp<unknown, WorkspacePlatformKeys>(window.workspacePlatform, "_internalDeferShowOptions");

		for (const page of window.workspacePlatform.pages) {
			platformPageToStorage(page, defaultOptions);
		}
	}
}

/**
 * Map the platform page data to storage.
 * @param page The page to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 */
export function platformPageToStorage(
	page: Page,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): void {
	const pageDefaults: {
		propName: PageKeys;
		defaultValue: unknown;
	}[] = [
		{ propName: "isActive", defaultValue: false },
		{ propName: "isReadOnly", defaultValue: false },
		// Always store with no unsaved changes
		// { propName: "hasUnsavedChanges", defaultValue: false },
		{ propName: "panels", defaultValue: [] }
	];

	for (const pageDefault of pageDefaults) {
		removePropIfNonDefault<unknown, PageKeys>(
			page,
			pageDefault.propName,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(defaultOptions?.page as any)?.[pageDefault.propName] ?? pageDefault.defaultValue
		);
	}

	// Always remove this key, if we are saving we don't want it to reload saying something is unsaved
	removeProp<unknown, PageKeys>(page, "hasUnsavedChanges");

	platformPageLayoutToStorage(page.layout, defaultOptions);
}

/**
 * Map the page layout to storage.
 * @param pageLayout The page layout to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 */
export function platformPageLayoutToStorage(
	pageLayout: PageLayout,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): void {
	const pageLayoutDefaults: {
		propName: PageLayoutKeys;
		defaultValue: unknown;
	}[] = [
		{
			propName: "dimensions",
			defaultValue: {
				borderWidth: 3,
				borderGrabWidth: 15,
				minItemHeight: 10,
				minItemWidth: 10,
				headerHeight: 30,
				dragProxyWidth: 300,
				dragProxyHeight: 200
			}
		},
		{
			propName: "labels",
			defaultValue: {
				close: "close",
				maximise: "maximise",
				minimise: "minimise",
				popout: "open in new window",
				popin: "pop in",
				tabDropdown: "additional tabs"
			}
		},
		{ propName: "isClosable", defaultValue: true },
		{ propName: "reorderEnabled", defaultValue: true },
		{ propName: "title", defaultValue: "" },
		{ propName: "openPopouts", defaultValue: [] },
		{ propName: "maximisedItemId", defaultValue: null }
		// Skip to make platform dependent and remove below
		// { propName: "layoutDetails", defaultValue: { } }
	];

	for (const pageLayoutDefault of pageLayoutDefaults) {
		removePropIfNonDefault<unknown, PageLayoutKeys>(
			pageLayout,
			pageLayoutDefault.propName,
			pageLayoutDefault.defaultValue
		);
	}

	// Remove Platform dependent props
	removeProp<unknown, PageLayoutKeys>(pageLayout, "layoutDetails");

	if (pageLayout.settings) {
		const pageSettingsDefaults: {
			propName: PageLayoutSettingsKeys;
			defaultValue: unknown;
		}[] = [
			{ propName: "hasHeaders", defaultValue: true },
			{ propName: "reorderEnabled", defaultValue: true },
			{ propName: "selectionEnabled", defaultValue: false },
			{ propName: "popoutWholeStack", defaultValue: false },
			{ propName: "blockedPopoutsThrowError", defaultValue: true },
			{ propName: "closePopoutsOnUnload", defaultValue: true },
			{ propName: "showPopoutIcon", defaultValue: false },
			{ propName: "showMaximiseIcon", defaultValue: false },
			{ propName: "showCloseIcon", defaultValue: false },
			{ propName: "responsiveMode", defaultValue: "onload" },
			{ propName: "tabOverlapAllowance", defaultValue: 0 },
			{ propName: "reorderOnTabMenuClick", defaultValue: true },
			{ propName: "tabControlOffset", defaultValue: 10 },
			{ propName: "preventDragOut", defaultValue: false },
			{ propName: "preventDragIn", defaultValue: false },
			{ propName: "constrainDragToContainer", defaultValue: true },
			{ propName: "constrainDragToHeaders", defaultValue: false }
			// Skip to make platform dependent and remove below
			// { propName: "newTabButton", defaultValue: false }
		];

		for (const pageSettingsDefault of pageSettingsDefaults) {
			removePropIfNonDefault<unknown, PageLayoutSettingsKeys>(
				pageLayout.settings,
				pageSettingsDefault.propName,
				pageSettingsDefault.defaultValue
			);
		}

		// Remove Platform dependent props
		removeProp<unknown, PageLayoutSettingsKeys>(pageLayout.settings, "newTabButton");

		if (Object.keys(pageLayout.settings).length === 0) {
			delete pageLayout.settings;
		}
	}

	if (pageLayout.content) {
		for (const component of pageLayout.content) {
			platformLayoutComponentToStorage(component, defaultOptions);
		}
	}
}

/**
 * Map the platform layout content data to storage.
 * @param component The layout content to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 */
function platformLayoutComponentToStorage(
	component: ComponentType,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): void {
	const componentDefaults: {
		propName: ComponentKey;
		defaultValue: unknown;
	}[] = [
		{ propName: "title", defaultValue: "" },
		{ propName: "width", defaultValue: 0 },
		{ propName: "height", defaultValue: 0 },
		{ propName: "componentName", defaultValue: "" },
		{ propName: "isClosable", defaultValue: true },
		{ propName: "reorderEnabled", defaultValue: true },
		{ propName: "activeItemIndex", defaultValue: 0 }
	];

	for (const componentDefault of componentDefaults) {
		removePropIfNonDefault<ComponentType, ComponentKey>(
			component,
			componentDefault.propName,
			componentDefault.defaultValue
		);
	}

	if ("componentState" in component) {
		const componentState: Partial<OpenFin.ViewCreationOptions> | undefined = component.componentState;

		if (componentState) {
			const componentStateDefaults: { propName: ComponentStateKeys; defaultValue: unknown }[] = [
				{ propName: "name", defaultValue: "" },
				{ propName: "url", defaultValue: "" },
				{ propName: "uuid", defaultValue: "" },
				{ propName: "componentName", defaultValue: "view" },
				{ propName: "initialUrl", defaultValue: "" },
				{ propName: "processAffinity", defaultValue: fin.me.identity.uuid },
				{ propName: "isClosable", defaultValue: true },
				{ propName: "bounds", defaultValue: { x: 1, y: 1, width: 0, height: 0 } },
				{ propName: "detachOnClose", defaultValue: true },
				{ propName: "isClosable", defaultValue: true },
				{ propName: "preventDragOut", defaultValue: false },
				{ propName: "accelerator", defaultValue: { zoom: true } },
				{ propName: "zoomLevel", defaultValue: 0 },
				{ propName: "permissions", defaultValue: {} },
				{ propName: "contextMenu", defaultValue: true },
				{
					propName: "contextMenuOptions",
					defaultValue: {
						enabled: true,
						template: [
							"spellCheck",
							"separator",
							"print",
							"separator",
							"cut",
							"copy",
							"paste",
							"undo",
							"redo",
							"selectAll",
							"inspect",
							"reload"
						]
					}
				},
				{ propName: "preloadScripts", defaultValue: [] },
				// Skip to make platform dependent and remove below
				// { propName: "hotkeys", defaultValue: [] },
				{ propName: "enableBeforeUnload", defaultValue: false },
				{ propName: "backgroundThrottling", defaultValue: true },
				{
					propName: "autoResize",
					defaultValue: {
						width: false,
						height: false
					}
				},
				{ propName: "zoomLevel", defaultValue: 0 },
				{ propName: "fdc3InteropApi", defaultValue: "" },
				{ propName: "interop", defaultValue: {} },
				{ propName: "customData", defaultValue: {} },
				{ propName: "contentNavigation", defaultValue: {} }
			];

			for (const componentStateDefault of componentStateDefaults) {
				removePropIfNonDefault<OpenFin.ViewCreationOptions, ComponentStateKeys>(
					componentState,
					componentStateDefault.propName,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(defaultOptions?.view as any)?.[componentStateDefault.propName] ??
						componentStateDefault.defaultValue
				);
			}

			// remove platform dependent props
			removeProp<OpenFin.ViewCreationOptions, ComponentStateKeys>(componentState, "hotkeys");
		}
	}

	if (component.content) {
		for (const comp of component.content) {
			platformLayoutComponentToStorage(comp, defaultOptions);
		}
	}
}

/**
 * Map the platform workspace data to storage version.
 * @param workspace The workspace to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 * @returns The storage workspace.
 */
export function mapStorageToPlatformWorkspace(
	workspace: Workspace | undefined,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): Workspace {
	if (isEmpty(workspace)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return undefined as any as Workspace;
	}

	const clone: Workspace = objectClone(workspace);

	if (Array.isArray(clone.snapshot.windows)) {
		const newWins = [];
		for (const win of clone.snapshot.windows) {
			newWins.push(platformWorkspaceWindowFromStorage(win, defaultOptions));
		}
		clone.snapshot.windows = newWins;
	}

	return clone;
}

/**
 * Map the window storage to platform.
 * @param window The window to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 * @returns The window merged with default options.
 */
function platformWorkspaceWindowFromStorage(
	window: BrowserSnapshotWindow,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): BrowserSnapshotWindow {
	const merged = deepMerge<BrowserSnapshotWindow>(window, defaultOptions?.window as BrowserSnapshotWindow);

	if (!isEmpty(window?.workspacePlatform?.pages)) {
		for (const page of window.workspacePlatform.pages) {
			platformPageFromStorage(page, defaultOptions);
		}
	}

	return merged;
}

/**
 * Map the platform page data to storage version.
 * @param page The page to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 * @returns The mapped page.
 */
export function mapPlatformPageFromStorage(
	page: Page | undefined,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): Page {
	if (isEmpty(page)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return undefined as any as Page;
	}

	const clone = objectClone(page);
	platformPageFromStorage(clone, defaultOptions);
	return clone;
}

/**
 * Map the platform page data to storage.
 * @param page The page to map.
 * @param defaultOptions The default options.
 * @param defaultOptions.window The default window options.
 * @param defaultOptions.page The default page options.
 * @param defaultOptions.view The default view options.
 */
export function platformPageFromStorage(
	page: Page,
	defaultOptions?: {
		window: Partial<BrowserCreateWindowRequest> | undefined;
		page: Partial<Page> | undefined;
		view: Partial<OpenFin.ViewOptions> | undefined;
	}
): void {
	platformPageLayoutToStorage(page.layout, defaultOptions);
}

/**
 * Remove a property for an object but if is different from default.
 * @param obj The object to update.
 * @param propName The name of the property to check.
 * @param defaultValue The default value for the property.
 */
function removePropIfNonDefault<T, K extends keyof T | string>(
	obj: Partial<T>,
	propName: K,
	defaultValue: unknown
): void {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	if (propName in obj && deepEqual((obj as any)[propName], defaultValue, false)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (obj as any)[propName];
	}
}

/**
 * Remove a property for an object.
 * @param obj The object to remove from.
 * @param propName The name of the property to copy.
 */
function removeProp<T, K extends keyof T | string>(obj: Partial<T>, propName: K): void {
	if (propName in obj) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete (obj as any)[propName];
	}
}
