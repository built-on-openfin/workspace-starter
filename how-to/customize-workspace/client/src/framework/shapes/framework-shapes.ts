import type { StorefrontFooter, Image } from "@openfin/workspace";
import type {
	CustomThemes,
	GlobalContextMenuOptionType,
	PageTabContextMenuOptionType,
	ToolbarButton,
	ViewTabMenuOptionType
} from "@openfin/workspace-platform";
import type { NotificationsPlatform } from "@openfin/workspace/notifications";
import type { ActionsProviderOptions } from "./actions-shapes";
import type { AuthProviderOptions } from "./auth-shapes";
import type { ConditionsProviderOptions } from "./conditions-shapes";
import type { ConnectionProviderOptions } from "./connection-shapes";
import type { EndpointProviderOptions } from "./endpoint-shapes";
import type { InitOptionsProviderOptions } from "./init-options-shapes";
import type { IntegrationProviderOptions } from "./integrations-shapes";
import type { LifecycleProviderOptions } from "./lifecycle-shapes";
import type { LoggerProviderOptions } from "./logger-shapes";
import type { ModuleList } from "./module-shapes";

interface PlatformProviderOptions {
	rootUrl: string;
	sharing: boolean;
	intentPicker?: {
		url: string;
		height?: number;
		width?: number;
	};
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NotificationProviderOptions extends NotificationsPlatform {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeadlessProviderOptions extends ModuleList {}
export interface ToolbarButtonDefinition {
	id: string;
	include: boolean;
	themes?: { [key: string]: string };
	button: ToolbarButton & { iconUrl?: string };
	conditions?: string[];
}

export type MenuPositionOperation = "replaceLabel" | "before" | "after" | "delete" | "start" | "end";
export type MenuSeparatorPosition = "before" | "after";

export interface MenuEntry<T> {
	include: boolean;
	label: string;
	data?: {
		type: T;
	};
	position?: {
		operation: MenuPositionOperation;
		type?: T;
	};
	conditions?: string[];
	separator?: MenuSeparatorPosition;
}

export interface BrowserProviderOptions {
	toolbarButtons?: ToolbarButtonDefinition[];
	windowOptions: {
		title?: string;
		icon?: string;
		newTabUrl?: string;
		newPageUrl?: string;
	};
	globalMenu?: MenuEntry<GlobalContextMenuOptionType>[];
	pageMenu?: MenuEntry<PageTabContextMenuOptionType>[];
	viewMenu?: MenuEntry<ViewTabMenuOptionType>[];
}

export type BootstrapComponents = "home" | "store" | "dock" | "notifications" | "none";

export interface BootstrapOptions {
	store: boolean;
	home: boolean;
	dock: boolean;
	notifications: boolean;
	autoShow: BootstrapComponents[];
}

interface HomeProviderOptions {
	id: string;
	title: string;
	icon: string;
	hidden?: boolean;
	queryMinLength?: number;
	queryAgainst?: string[];
	enablePageIntegration?: boolean;
	enableWorkspaceIntegration?: boolean;
}

interface DockButtonBase {
	tooltip?: string;
	iconUrl?: string;
}

interface DockButtonApp extends DockButtonBase {
	display: "individual" | "group";
	tags?: string[];
}

interface DockButtonAction extends DockButtonBase {
	appId?: string;
	action?: {
		id: string;
		customData: unknown;
	};
}

interface DockButtonDropdown extends DockButtonBase {
	options: {
		appId?: string;
		tooltip?: string;
		action?: {
			id: string;
			customData: unknown;
		};
	}[];
}

interface DockProviderOptions {
	id: string;
	title: string;
	icon: string;
	workspaceComponents?: {
		hideHomeButton?: boolean;
		hideWorkspacesButton?: boolean;
		hideNotificationsButton?: boolean;
		hideStorefrontButton?: boolean;
	};
	apps?: DockButtonApp[];
	buttons?: (DockButtonAction | DockButtonDropdown)[];
}

interface ThemeProviderOptions {
	themes: CustomThemes;
}

export interface AppProviderOptions {
	appsSourceUrl?: string | string[];
	endpointIds?: string[];
	includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
	cacheDurationInMinutes?: number;
	cacheDurationInSeconds?: number;
	appAssetTag?: string;
	manifestTypes?: string[];
}
export interface StorefrontSettingsNavigationItem {
	/**
	 * This should be an idempotent and unique ID (think GUID) that doesn't change for this navigation item regardless of how
	 * many times it is regenerated (e.g. e.g. more items can be added or the title changed but the ID stays the same).
	 * As you navigate around the store this ID is used as a route. So if a user clicks on a link, navigates to a new page and the re-requested navigation item has
	 * a different ID then the store will not be able to find a match and it won't be able to render the navigation item.
	 */
	id: string;
	title: string;
	/**
	 * The Storefront API has a collection of apps for a navigation item. Tags is an example of how you can determine what apps should be included in a navigation item.
	 * i.e we filter the apps list by one or more tags and assign those apps to the navigation item.
	 */
	tags: string[];
}

interface StorefrontSettingsDetailedNavigationItem extends StorefrontSettingsNavigationItem {
	description: string;
	image: Image;
}

export interface StorefrontSettingsLandingPageRow {
	title: string;
	items: StorefrontSettingsDetailedNavigationItem[];
}
interface StorefrontProviderOptions {
	id: string;
	title: string;
	icon: string;
	landingPage: {
		hero?: {
			title: string;
			description: string;
			cta: StorefrontSettingsNavigationItem;
			image: Image;
		};
		topRow: StorefrontSettingsLandingPageRow;
		middleRow: {
			title: string;
			tags: string[];
		};
		bottomRow: StorefrontSettingsLandingPageRow;
	};
	navigation: {
		/**
		 * This should be an idempotent and unique ID (think GUID) that doesn't change for this navigation section regardless of how
		 * many times it is regenerated (e.g. e.g. more items can be added or the title changed but the ID stays the same).
		 * As you navigate around the store this ID is used as a route. So if a user clicks on a link, navigates to a new page and the re-requested navigation section has
		 * a different ID then the store will not be able to find a match and it won't be able to render the navigation items.
		 */
		id: string;
		title: string;
		items: StorefrontSettingsNavigationItem[];
	}[];
	footer: StorefrontFooter;
}

export interface ManifestType {
	id: string;
	label: string;
	description: string;
}

export interface CustomSettings {
	appProvider?: AppProviderOptions;
	authProvider?: AuthProviderOptions;
	bootstrap?: BootstrapOptions;
	browserProvider?: BrowserProviderOptions;
	connectionProvider?: ConnectionProviderOptions;
	dockProvider?: DockProviderOptions;
	endpointProvider?: EndpointProviderOptions;
	headlessProvider?: HeadlessProviderOptions;
	homeProvider?: HomeProviderOptions;
	initOptionsProvider?: InitOptionsProviderOptions;
	integrationProvider?: IntegrationProviderOptions;
	notificationProvider?: NotificationProviderOptions;
	platformProvider?: PlatformProviderOptions;
	storefrontProvider?: StorefrontProviderOptions;
	themeProvider?: ThemeProviderOptions;
	loggerProvider?: LoggerProviderOptions;
	actionsProvider?: ActionsProviderOptions;
	conditionsProvider?: ConditionsProviderOptions;
	lifecycleProvider?: LifecycleProviderOptions;
}
