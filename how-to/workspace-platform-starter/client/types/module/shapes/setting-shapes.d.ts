import type { ActionsProviderOptions } from "./actions-shapes";
import type { AnalyticsProviderOptions } from "./analytics-shapes";
import type { AppProviderOptions } from "./app-shapes";
import type { AuthProviderOptions } from "./auth-shapes";
import type { BootstrapOptions } from "./bootstrap-shapes";
import type { BrowserProviderOptions } from "./browser-shapes";
import type { ConditionsProviderOptions } from "./conditions-shapes";
import type { ConnectionProviderOptions } from "./connection-shapes";
import type { DockProviderOptions } from "./dock-shapes";
import type { EndpointProviderOptions } from "./endpoint-shapes";
import type { HomeProviderOptions } from "./home-shapes";
import type { InitOptionsProviderOptions } from "./init-options-shapes";
import type { IntegrationProviderOptions } from "./integrations-shapes";
import type { LifecycleProviderOptions } from "./lifecycle-shapes";
import type { LoggerProviderOptions } from "./logger-shapes";
import type { LowCodeIntegrationProviderOptions } from "./low-code-integration-shapes";
import type { MenusProviderOptions } from "./menu-shapes";
import type { NotificationProviderOptions } from "./notification-shapes";
import type { PlatformProviderOptions } from "./platform-shapes";
import type { SplashScreenProviderOptions } from "./splash-shapes";
import type { StorefrontProviderOptions } from "./store-shapes";
import type { ThemeProviderOptions } from "./theme-shapes";
import type { VersionProviderOptions } from "./version-shapes";
/**
 * The custom settings section defined in the manifest.
 */
export interface CustomSettings {
	/**
	 * The schema for the settings.
	 */
	$schema?: string;
	/**
	 * The app provider options.
	 */
	appProvider?: AppProviderOptions;
	/**
	 * The auth provider options.
	 */
	authProvider?: AuthProviderOptions;
	/**
	 * The bootstrap options.
	 */
	bootstrap?: BootstrapOptions;
	/**
	 * The browser provider options.
	 */
	browserProvider?: BrowserProviderOptions;
	/**
	 * The connection provider options.
	 */
	connectionProvider?: ConnectionProviderOptions;
	/**
	 * The dock provider options.
	 */
	dockProvider?: DockProviderOptions;
	/**
	 * The endpoint provider options.
	 */
	endpointProvider?: EndpointProviderOptions;
	/**
	 * The home provider options.
	 */
	homeProvider?: HomeProviderOptions;
	/**
	 * The init options provider options.
	 */
	initOptionsProvider?: InitOptionsProviderOptions;
	/**
	 * The integration provider options.
	 */
	integrationProvider?: IntegrationProviderOptions;
	/**
	 * The low code integration provider options.
	 */
	lowCodeIntegrationProvider?: LowCodeIntegrationProviderOptions;
	/**
	 * The notification provider options.
	 */
	notificationProvider?: NotificationProviderOptions;
	/**
	 * The platform provider options.
	 */
	platformProvider?: PlatformProviderOptions;
	/**
	 * The storefront provider options.
	 */
	storefrontProvider?: StorefrontProviderOptions;
	/**
	 * The theme provider options.
	 */
	themeProvider?: ThemeProviderOptions;
	/**
	 * The logger provider options.
	 */
	loggerProvider?: LoggerProviderOptions;
	/**
	 * The actions provider options.
	 */
	actionsProvider?: ActionsProviderOptions;
	/**
	 * The conditions provider options.
	 */
	conditionsProvider?: ConditionsProviderOptions;
	/**
	 * The lifecycle provider options.
	 */
	lifecycleProvider?: LifecycleProviderOptions;
	/**
	 * The analytics provider options.
	 */
	analyticsProvider?: AnalyticsProviderOptions;
	/**
	 * The version provider options.
	 */
	versionProvider?: VersionProviderOptions;
	/**
	 * The menus provider options.
	 */
	menusProvider?: MenusProviderOptions;
	/**
	 * The splash screen provider options.
	 */
	splashScreenProvider?: SplashScreenProviderOptions;
}
