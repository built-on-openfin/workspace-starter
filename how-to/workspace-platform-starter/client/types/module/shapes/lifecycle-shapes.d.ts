import type { Workspace } from "@openfin/workspace";
import type { CustomPaletteSet, Locale, Page, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { FavoriteEntry } from "./favorite-shapes";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
import type { ColorSchemeMode } from "./theme-shapes";
/**
 * Events that can be triggered through the lifecycle.
 */
export type LifecycleEvents =
	| "auth-logged-in"
	| "auth-session-expired"
	| "auth-before-logged-out"
	| "after-bootstrap"
	| "before-quit"
	| "theme-changed"
	| "workspace-changed"
	| "page-changed"
	| "apps-changed"
	| "favorite-changed"
	| "condition-changed"
	| "language-changed";
/**
 * The type for a lifecycle event handler.
 */
export type LifecycleHandler<T = unknown> = (platform: WorkspacePlatformModule, payload?: T) => Promise<void>;
/**
 * Map of the lifecycle event handlers.
 */
export type LifecycleEventMap = {
	[key in LifecycleEvents]?: LifecycleHandler;
};
/**
 * Definition for lifecycle event module.
 */
export interface Lifecycle<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the lifecycle events.
	 * @returns The map of lifecycle events.
	 */
	get(): Promise<LifecycleEventMap>;
}
/**
 * This is a list of modules that allow you to hook into the lifecycle events exposed by the platform. A good example
 * might be you wish to register a module that is called when an authenticated session is expired
 */
export type LifecycleProviderOptions = ModuleList;
/**
 * Event payload for the workspace changed lifecycle event.
 */
export interface WorkspaceChangedLifecyclePayload {
	/**
	 * The action that happened to the workspace.
	 */
	action: "create" | "apply" | "update" | "delete";
	/**
	 * The id of the workspace.
	 */
	id: string;
	/**
	 * The workspace data.
	 */
	workspace?: Workspace;
}
/**
 * Event payload for the page changed lifecycle event.
 */
export interface PageChangedLifecyclePayload {
	/**
	 * The action that happened to the page.
	 */
	action: "create" | "update" | "delete" | "focus";
	/**
	 * The id of the page.
	 */
	id: string;
	/**
	 * The page data.
	 */
	page?: Page;
}
/**
 * Event payload for the favorite changed lifecycle event.
 */
export interface FavoriteChangedLifecyclePayload {
	/**
	 * The action that happened to the favorite.
	 */
	action: "set" | "delete";
	/**
	 * The favorite entry.
	 */
	favorite: FavoriteEntry;
}
/**
 * Logged in event payload.
 */
export interface LoggedInLifecyclePayload {
	/**
	 * The user details.
	 */
	user?: unknown;
}
/**
 * Theme changed event payload.
 */
export interface ThemeChangedLifecyclePayload {
	/**
	 * The theme mode.
	 */
	schemeType?: ColorSchemeMode;
	/**
	 * The palette.
	 */
	palette?: CustomPaletteSet;
}
/**
 * Condition changed event payload.
 */
export interface ConditionChangedLifecyclePayload {
	/**
	 * The condition that changed, or empty to determine many might have changed.
	 */
	conditionId?: string;
}
/**
 * Language changed event payload.
 */
export interface LanguageChangedLifecyclePayload {
	/**
	 * The Locale.
	 */
	locale?: Locale;
}
