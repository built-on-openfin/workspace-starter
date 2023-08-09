import type OpenFin from "@openfin/core";
import {
	CLITemplate,
	Dock,
	Home,
	Storefront,
	type App,
	type StorefrontFooter,
	type StorefrontLandingPage
} from "@openfin/workspace";
import type { CustomThemeOptions } from "@openfin/workspace-platform";
import {
	init,
	type ColorSchemeOptionType,
	type CustomThemeOptionsWithScheme,
	type WorkspacePlatformProvider
} from "@openfin/workspace-platform";
import * as Notifications from "@openfin/workspace/notifications";
import { THEME_BUILDER_APP, getApps, launchApp } from "./apps";
import { DEFAULT_PALETTES } from "./default-palettes";
import type { CustomUserAppArgs, InitParams, ThemeDisplayOptions, ThemingPayload } from "./shapes";
import { getThemeActions, getThemeButton, initColorScheme, setColorScheme } from "./theming";

const PLATFORM_ID = "use-theming";
const PLATFORM_TITLE = "Use Theming";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";
const APPLY_THEME_ACTION = "apply-theme";

window.addEventListener("DOMContentLoaded", async () => {
	// Check to see if there was a theming payload supplied on the command line
	const themingPayload = await handleInitParams();

	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () =>
		initializeWorkspaceComponents(themingPayload?.options)
	);

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform(themingPayload);

	// Subscribe to theme-restart events which can be triggered if a view
	// has updated the theme and wants to restart.
	await fin.InterApplicationBus.subscribe(
		{ uuid: fin.me.identity.uuid },
		"theme-restart",
		async (payload: ThemingPayload) => {
			window.localStorage.setItem("customAction", APPLY_THEME_ACTION);
			window.localStorage.setItem("customPayload", JSON.stringify(payload));
			await fin.Application.getCurrentSync().restart();
		}
	);

	// Create fin.me.interop with a channel we can use for theming messages
	fin.me.interop = fin.Interop.connectSync(fin.me.uuid, {});

	// Initialize the color scheme based on the platform
	await initColorScheme();
});

/**
 * Initialize the workspace platform.
 * @param themingPayload Is there a custom theming payload to use for the theme.
 */
async function initializeWorkspacePlatform(themingPayload?: ThemingPayload): Promise<void> {
	console.log("Initializing workspace platform");

	// Build the custom palette based on anything in the theming payload.
	let customTheme: CustomThemeOptions | CustomThemeOptionsWithScheme;
	if (themingPayload && "palette" in themingPayload) {
		// If there is a palette property in the themingPayload
		// then this is an old style palette with a single color scheme
		customTheme = {
			label: "theme",
			palette: {
				...DEFAULT_PALETTES.dark,
				...themingPayload?.palette
			}
		};
	} else {
		// New style palette with dark and light
		customTheme = {
			label: "theme",
			palettes: {
				dark: {
					...DEFAULT_PALETTES.dark,
					...themingPayload?.palettes?.dark
				},
				light: {
					...DEFAULT_PALETTES.light,
					...themingPayload?.palettes?.light
				}
			}
		};
	}

	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON,
					toolbarOptions: {
						buttons: [getThemeButton()]
					}
				}
			}
		},
		theme: [customTheme],
		// Override some platform methods so that we can handle theme changes.
		overrideCallback,
		// Custom actions provided for theming
		customActions: getThemeActions()
	});
}

/**
 * Initialize minimal workspace components for home/store so that the buttons show on dock.
 * @param options Which components to show.
 */
async function initializeWorkspaceComponents(options?: ThemeDisplayOptions): Promise<void> {
	if (options?.home ?? true) {
		await Home.register({
			title: PLATFORM_TITLE,
			id: PLATFORM_ID,
			icon: PLATFORM_ICON,
			onUserInput: async () => ({
				// Always return just the apps list in home
				results: getApps().map((app) => ({
					key: app.appId,
					title: app.title,
					icon: app.icons[0]?.src,
					data: app,
					label: "View",
					actions: [{ name: "Launch View", hotkey: "enter" }],
					description: app.description,
					shortDescription: app.description,
					template: CLITemplate.SimpleText,
					templateContent: app.description
				}))
			}),
			onResultDispatch: async (result) => {
				// We only have apps, so just launch them
				await launchApp(result.data as App);
			}
		});

		await Home.show();
	}

	if (options?.store ?? true) {
		await Storefront.register({
			title: PLATFORM_TITLE,
			id: PLATFORM_ID,
			icon: PLATFORM_ICON,
			getApps: async () => [],
			getLandingPage: async () => ({}) as StorefrontLandingPage,
			getNavigation: async () => [],
			getFooter: async () => ({ logo: { src: PLATFORM_ICON }, links: [] }) as unknown as StorefrontFooter,
			launchApp: async () => {}
		});

		await Storefront.show();
	}

	if (options?.dock ?? true) {
		await Dock.register({
			title: PLATFORM_TITLE,
			id: PLATFORM_ID,
			icon: PLATFORM_ICON,
			buttons: []
		});

		await Dock.show();
	}

	if (options?.notifications ?? true) {
		await Notifications.register({
			title: PLATFORM_TITLE,
			id: PLATFORM_ID,
			icon: PLATFORM_ICON
		});

		await Notifications.show();
	}

	if (options?.browser ?? true) {
		await launchApp(THEME_BUILDER_APP);
	}

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		if (options?.store ?? true) {
			await Storefront.deregister(PLATFORM_ID);
		}
		if (options?.home ?? true) {
			await Home.deregister(PLATFORM_ID);
		}
		if (options?.dock ?? true) {
			await Dock.deregister();
		}
		if (options?.notifications ?? true) {
			await Notifications.deregister(PLATFORM_ID);
		}
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Check to see if any init params were pass on the command line to the launch.
 * @returns Theming payload if one was provided.
 */
async function handleInitParams(): Promise<ThemingPayload | undefined> {
	// Find any theming options passed on the command line and override the defaults
	const app = fin.Application.getCurrentSync();
	const appInfo = await app.getInfo();
	const customInitOptions = appInfo.initialOptions as OpenFin.ApplicationCreationOptions & CustomUserAppArgs;
	let themingPayload: ThemingPayload | undefined;

	if (customInitOptions?.userAppConfigArgs?.action === APPLY_THEME_ACTION) {
		themingPayload = extractPayloadFromParams(customInitOptions?.userAppConfigArgs);
		console.log("Loaded payload from command line", themingPayload);
	}

	// If there is an action stored in local storage use that as it is from
	// a restart requested, but then remove it
	const loadedAction = window.localStorage.getItem("customAction");
	if (loadedAction !== undefined) {
		if (loadedAction === APPLY_THEME_ACTION) {
			const loadedPayload = window.localStorage.getItem("customPayload");
			if (loadedPayload) {
				themingPayload = JSON.parse(loadedPayload) as ThemingPayload;
				console.log("Loaded payload from localStorage", themingPayload);
			}
		}

		window.localStorage.removeItem("customAction");
		window.localStorage.removeItem("customPayload");
	}

	// If run was requested when we are already running restart the app
	// as we can only update the theming options by re-initializing the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.Application.addListener("run-requested", async (params?: CustomUserAppArgs) => {
		console.log("Run requested with action", params?.userAppConfigArgs?.action);

		// If there is a command line options of apply theme then use the payload
		// save the payload in localStorage and restart the app.
		if (params?.userAppConfigArgs?.action === APPLY_THEME_ACTION) {
			const runThemingOptions = extractPayloadFromParams(params?.userAppConfigArgs);

			console.log("Store theming options and restart app");
			window.localStorage.setItem("customAction", APPLY_THEME_ACTION);
			if (runThemingOptions !== undefined) {
				window.localStorage.setItem("customPayload", JSON.stringify(runThemingOptions));
			}

			await app.restart();
		} else {
			console.warn("Unrecognized action in run-requested listener", params?.userAppConfigArgs?.action);
		}
	});

	return themingPayload;
}

/**
 * Process the init params and see if we can extract a theming payload from it.
 * @param initParams The init params to try and extract from.
 * @returns The theming payload.
 */
function extractPayloadFromParams(initParams?: InitParams): ThemingPayload | undefined {
	try {
		if (typeof initParams?.payload === "string") {
			const plainJson = window.atob(initParams?.payload);
			const payload: ThemingPayload = JSON.parse(plainJson);
			console.log("Extracted payload", payload);
			return payload;
		}
	} catch (err) {
		console.error("Error decoding payload, it should be Base64 encoded", initParams, err);
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
	 * Override the platform methods so that we can intercept the
	 * color scheme changing.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Handles requests to create a window in the current platform.
		 * @param options Window options for the window to be created.
		 * @param identity The identity of the caller will be here.
		 * @returns The created window.
		 */
		public async createWindow(
			options: OpenFin.PlatformWindowCreationOptions,
			identity?: OpenFin.Identity
		): Promise<OpenFin.Window> {
			const overrideDefaultButtons = Array.isArray(options?.workspacePlatform?.toolbarOptions?.buttons);
			if (!overrideDefaultButtons) {
				// The window options don't override the toolbar buttons
				// so we assume we are using the workspace defaults
				// Since the defaults were created using the theme at startup
				// we need to replace them with the current set of default
				// buttons which are theme aware
				options.workspacePlatform = options.workspacePlatform ?? {};
				options.workspacePlatform.toolbarOptions = options.workspacePlatform.toolbarOptions ?? {};
				options.workspacePlatform.toolbarOptions.buttons = [getThemeButton()];
			}

			return super.createWindow(options, identity);
		}

		/**
		 * The color scheme was changed.
		 * @param schemeType The scheme it was changed to.
		 * @returns Nothing.
		 */
		public async setSelectedScheme(schemeType: ColorSchemeOptionType): Promise<void> {
			// Override the platform callback to we can detect the theme has changed
			// and tell the theme management about the change.
			await setColorScheme(schemeType);
			return super.setSelectedScheme(schemeType);
		}
	}
	return new Override();
}
