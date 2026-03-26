import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { PlatformApp } from "here-workspace-starter/shapes/app-shapes";
import { getWindowPositionOptions } from "here-workspace-starter/utils-position";
import { saveConfig, loadConfig } from "here-workspace-starter/workspace/dock";
import hereConfig from "../../../here.config";
import * as actionsProvider from "../actions";
import { AIContextProvider } from "../ai-context";
import * as analyticsProvider from "../analytics";
import * as appProvider from "../apps";
import * as auth from "../auth";
import * as authFlow from "../auth-flow";
import * as buttons from "../buttons";
import * as conditionsProvider from "../conditions";
import * as connectionProvider from "../connections";
import * as contentCreationProvider from "../content-creation";
import * as dialogProvider from "../dialog";
import * as endpointProvider from "../endpoint";
import * as favoriteProvider from "../favorite";
import * as initOptionsProvider from "../init-options";
import * as lifecycleProvider from "../lifecycle";
import * as loggerProvider from "../logger-provider";
import * as menusProvider from "../menu";
import * as modules from "../modules";
import { getManifestCustomSettings, getSettings } from "../settings";
import type { ModuleHelpers } from "../shapes/module-shapes";
import type { CustomSettings } from "../shapes/setting-shapes";
import * as shareProvider from "../share";
import * as snapProvider from "../snap";
import { getPlatformThemeClient, getThemes, notifyColorScheme, supportsColorSchemes } from "../themes";
import { isEmpty, isStringValue, randomUUID } from "../utils";
import * as versionProvider from "../version";
import * as lowCodeIntegrationProvider from "../workspace/low-code-integrations";
import * as interopProvider from "./interop";
import * as platformOverride from "./platform-override";
import * as platformSplashProvider from "./platform-splash";
import { PLATFORM_VERSION } from "./platform-version";

const logger = loggerProvider.createLogger("Platform");

/**
 * Initialize the platform.
 * @returns True if the platform was initialized.
 */
export async function init(): Promise<boolean> {
	fin.me.showDeveloperTools().catch(() => {});
	await platformSplashProvider.updateProgress("Platform");

	const customSettings = await getManifestCustomSettings();

	const isValid = await authFlow.init(
		customSettings?.authProvider,
		async () => setupPlatform(customSettings),
		logger,
		true
	);

	if (!isValid) {
		logger.error(
			"The platform cannot startup as there was a problem with the initialization of the auth flow."
		);
	}

	return isValid;
}

/**
 * Setup the platform.
 * @param manifestSettings The custom setting to use for setting up the platform.
 * @returns True if the platform setup was successful.
 */
async function setupPlatform(manifestSettings: CustomSettings | undefined): Promise<boolean> {
	// Load the init options from the initial manifest
	// and notify any actions with the after auth lifecycle
	await modules.init(randomUUID());

	await platformSplashProvider.updateProgress("Init Options");

	const helpers: ModuleHelpers = modules.getDefaultHelpers();

	await initOptionsProvider.init(manifestSettings?.initOptionsProvider, helpers, "after-auth");

	// We reload the settings now that endpoints have been configured.
	const customSettings: CustomSettings | undefined = await getSettings();

	await platformSplashProvider.updateProgress("Logger");

	await loggerProvider.init(customSettings?.loggerProvider, helpers);

	logger.info("Initializing Core Services");

	await platformSplashProvider.updateProgress("Endpoints");

	await endpointProvider.init(customSettings?.endpointProvider, helpers);

	await platformSplashProvider.updateProgress("Versioning");

	const runtimeVersion = await fin.System.getVersion();

	await versionProvider.init(customSettings?.versionProvider, endpointProvider);
	versionProvider.setVersion("runtime", runtimeVersion);
	try {
		const rvmInfo = await fin.System.getRvmInfo();
		versionProvider.setVersion("rvm", rvmInfo.version);
	} catch {
		logger.warn("RVM version information unavailable.");
	}
	versionProvider.setVersion("platformClient", PLATFORM_VERSION);

	await platformSplashProvider.updateProgress("Connections");
	await connectionProvider.init(customSettings?.connectionProvider);

	await platformSplashProvider.updateProgress("Menus");
	await menusProvider.init(customSettings?.menusProvider, helpers, customSettings?.platformProvider?.rootUrl);

	await platformSplashProvider.updateProgress("Dialogs");
	await dialogProvider.init(customSettings?.dialogProvider);

	await platformSplashProvider.updateProgress("Analytics");
	await analyticsProvider.init(customSettings?.analyticsProvider, helpers);

	await platformSplashProvider.updateProgress("Apps");
	await appProvider.init(customSettings?.appProvider, endpointProvider);

	await platformSplashProvider.updateProgress("Conditions");
	await conditionsProvider.init(customSettings?.conditionsProvider, helpers);
	conditionsProvider.registerCondition(
		"authenticated",
		async () => auth.isAuthenticationEnabled() && !(await auth.isAuthenticationRequired()),
		false
	);
	conditionsProvider.registerCondition("sharing", async () => shareProvider.isShareEnabled(), false);
	conditionsProvider.registerCondition("themed", async () => supportsColorSchemes(), false);

	await platformSplashProvider.updateProgress("Lifecycles");
	await lifecycleProvider.init(customSettings?.lifecycleProvider, helpers);

	const shareOptions = customSettings?.shareProvider ?? {};
	shareOptions.enabled ??= true;
	if (shareOptions.enabled) {
		await platformSplashProvider.updateProgress("Sharing");
		await shareProvider.init(shareOptions, helpers, customSettings?.homeProvider?.icon);
	}

	if (!isEmpty(customSettings?.favoriteProvider) && (customSettings?.favoriteProvider.enabled ?? true)) {
		await platformSplashProvider.updateProgress("Favorites");
		await favoriteProvider.init(
			customSettings?.favoriteProvider,
			await versionProvider.getVersionInfo(),
			endpointProvider
		);
	}

	logger.info("Initializing platform");

	const customActions = await actionsProvider.init(customSettings?.actionsProvider, helpers);
	const theme = await getThemes();

	await lowCodeIntegrationProvider.init(customSettings?.lowCodeIntegrationProvider);
	const integrations = await lowCodeIntegrationProvider.register();

	await snapProvider.init(customSettings?.snapProvider);
	conditionsProvider.registerCondition("snap", async () => snapProvider.isEnabled(), false);

	await contentCreationProvider.init(customSettings?.contentCreationProvider, helpers);

	const windowPositioningOptions = await getWindowPositionOptions(customSettings?.browserProvider);
	await interopProvider.init(customSettings?.platformProvider, windowPositioningOptions, helpers);

	const workspace = hereConfig.experimental.toWorkspace();

	// Align with cloud-platform 1: AIContextProvider owns useAIContext and getAIContext(winIdentity)
	const aiPanelOpts = customSettings?.browserProvider?.aiPanelOptions;
	const aiEnabled = Boolean(aiPanelOpts?.enabled ?? aiPanelOpts?.url);
	await AIContextProvider.get().initialize({
		getPlatform: () => workspace.getCurrentSync() as unknown as WorkspacePlatformModule,
		logger,
		enabled: aiEnabled
		// TODO: Uncomment this to implement your own business logic
		// isAIContextPermitted: async (url: string) => {
		// 	// Use this hook to capture any business logic that is outside of Domain Settings. For example,
		// 	// if you have an admin console that controls which views are opted in and they aren't controlled
		// 	// by Domain Settings, apply that logic here.
		// 	return true;
		// }
	});
	const platform = workspace.getCurrentSync();
	await platform.once("platform-api-ready", async () => {
		logger.info("Platform API Ready");
		fin.me.interop = fin.Interop.connectSync(fin.me.uuid, {});
		await notifyColorScheme();
		lifecycleProvider.subscribeLifecycleEvent("before-quit", async () => {
			await shareProvider.closedown();
		});
	});

	await platformOverride.init(
		customSettings?.platformProvider,
		{
			...helpers,
			getApps: async (): Promise<PlatformApp[]> => {
				logger.info("getApps: getting public apps for module.");
				return appProvider.getApps();
			},
			getAnalyticsClient: async () => analyticsProvider.getAnalyticsPlatformClient(),
			getSnapClient: async () => snapProvider,
			fireLifecycleEvent: lifecycleProvider.fireLifecycleEvent,
			getMenuClient: async () => ({
				getPopupMenuStyle: menusProvider.getPopupMenuStyle,
				showPopupMenu: menusProvider.showPopupMenu,
				getGlobalMenu: menusProvider.getGlobalMenu,
				getPageMenu: menusProvider.getPageMenu,
				getViewMenu: menusProvider.getViewMenu
			}),
			getButtonClient: async () => buttons,
			getDockClient: async () => ({ loadConfig, saveConfig }),
			getThemeClient: getPlatformThemeClient,
			getConnectionClient: async () => connectionProvider.getPlatformConnectionClient(),
			getAIContextProvider: () => AIContextProvider.get()
		},
		customSettings?.browserProvider
	);

	const interopOverride = interopProvider.getInteropConstructorOverrides();
	const overrideCallback = platformOverride.getPlatformConstructorOverrides();

	await workspace.init({
		// @ts-expect-error TODO investigate (stale starter types)
		language: isStringValue(customSettings?.platformProvider?.language?.initialLanguage)
			? { initialLanguage: customSettings?.platformProvider?.language?.initialLanguage }
			: undefined,
		// @ts-expect-error Platform theme shape differs from enterprise workspace CustomTheme[].
		theme,
		notifications: customSettings?.notificationProvider?.notificationsCustomManifest,
		customActions,
		// @ts-expect-error Interop override types come from @openfin/workspace-platform; workspace.init expects enterprise-api variants.
		interopOverride,
		// @ts-expect-error TODO investigate
		overrideCallback,
		integrations,

		analytics: customSettings?.analyticsProvider?.sendToOpenFin ? { sendToOpenFin: true } : undefined,

		// Pass full browserProvider so workspace gets defaultViewOptions (e.g. dom-sender), defaultWindowOptions, aiPanelOptions, etc.
		browser: customSettings?.browserProvider ?? undefined
	});

	return true;
}
