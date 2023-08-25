import type { Workspace } from "@openfin/workspace";
import type { Page, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
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
	| "apps-changed";
/**
 * The type for a lifecycle event handler.
 */
export type LifecycleHandler = (platform: WorkspacePlatformModule, customData?: unknown) => Promise<void>;
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
	action: "create" | "update" | "delete";
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
	action: "create" | "update" | "delete";
	/**
	 * The id of the page.
	 */
	id: string;
	/**
	 * The page data.
	 */
	page?: Page;
}
