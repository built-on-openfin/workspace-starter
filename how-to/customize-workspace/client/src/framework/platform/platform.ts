import {
	BrowserInitConfig,
	getCurrentSync,
	init as workspacePlatformInit
} from "@openfin/workspace-platform";
import { getActions } from "../actions";
import * as analyticsProvider from "../analytics";
import * as appProvider from "../apps";
import { isAuthenticationEnabled, isAuthenticationRequired } from "../auth";
import { init as initAuthFlow } from "../auth-flow";
import * as conditionsProvider from "../conditions";
import * as connectionProvider from "../connections";
import * as endpointProvider from "../endpoint";
import * as initOptionsProvider from "../init-options";
import * as lifecycleProvider from "../lifecycle";
import { createLogger, loggerProvider } from "../logger-provider";
import { init as modulesInit, getDefaultHelpers } from "../modules";
import { getConfiguredSettings, getSettings } from "../settings";
import type { CustomSettings, ModuleHelpers } from "../shapes";
import type { PlatformProviderOptions } from "../shapes/platform-shapes";
import { deregister as deregisterShare, register as registerShare, isShareEnabled } from "../share";
import { getThemes, notifyColorScheme, supportsColorSchemes } from "../themes";
import { randomUUID } from "../uuid";
import * as versionProvider from "../version";
import { getDefaultWindowOptions } from "./browser";
import { interopOverride } from "./interopbroker";
import { overrideCallback } from "./platform-override";
import { PLATFORM_VERSION } from "./platform-version";

const logger = createLogger("Platform");

async function setupPlatform(_?: PlatformProviderOptions): Promise<boolean> {
	// Load the init options from the initial manifest
	// and notify any actions with the after auth lifecycle
	const configuredSettings = await getConfiguredSettings();
	const sessionId: string = randomUUID();

	await modulesInit(sessionId);

	let helpers: ModuleHelpers = getDefaultHelpers(configuredSettings);

	await initOptionsProvider.init(configuredSettings?.initOptionsProvider, "after-auth", helpers);

	const settings: CustomSettings = await getSettings();

	helpers = getDefaultHelpers(settings);
	await loggerProvider.init(settings?.loggerProvider, helpers);

	logger.info("Initializing Core Services");

	await endpointProvider.init(settings?.endpointProvider, helpers);

	const runtimeVersion = await fin.System.getVersion();
	const rvmInfo = await fin.System.getRvmInfo();
	await versionProvider.init(settings?.versionProvider, endpointProvider);
	versionProvider.setVersion("runtime", runtimeVersion);
	versionProvider.setVersion("rvm", rvmInfo.version);
	versionProvider.setVersion("platformClient", PLATFORM_VERSION);

	await connectionProvider.init(settings?.connectionProvider);
	await analyticsProvider.init(settings?.analyticsProvider, helpers);
	await appProvider.init(settings?.appProvider, endpointProvider);
	await conditionsProvider.init(settings?.conditionsProvider, helpers);
	conditionsProvider.registerCondition(
		"authenticated",
		async () => isAuthenticationEnabled() && !(await isAuthenticationRequired()),
		false
	);
	conditionsProvider.registerCondition("sharing", async () => isShareEnabled(), false);
	conditionsProvider.registerCondition("themed", async () => supportsColorSchemes(), false);

	await lifecycleProvider.init(settings?.lifecycleProvider, helpers);

	const sharing = settings.platformProvider?.sharing ?? true;
	await registerShare(sharing);

	logger.info("Initializing platform");
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();
	}

	logger.info("Specifying following browser options", browser);

	const customActions = await getActions(settings?.actionsProvider, helpers);
	const theme = await getThemes();

	const platform = getCurrentSync();
	await platform.once("platform-api-ready", async () => {
		logger.info("Platform API Ready");
		fin.me.interop = fin.Interop.connectSync(fin.me.uuid, {});
		await notifyColorScheme();
	});

	await workspacePlatformInit({
		browser,
		theme,
		customActions,
		interopOverride,
		overrideCallback
	});
	return true;
}

export const VERSION = "11.0.0";

export async function init(): Promise<boolean> {
	const isValid = await initAuthFlow(setupPlatform, logger, true);
	if (!isValid) {
		logger.error(
			"The platform cannot startup as there was a problem with the initialization of the auth flow."
		);
	}
	return isValid;
}

export async function closedown(): Promise<void> {
	await deregisterShare();
}
