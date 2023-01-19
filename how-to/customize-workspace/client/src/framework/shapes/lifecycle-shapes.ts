import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

export type LifecycleEvents =
	| "auth-logged-in"
	| "auth-session-expired"
	| "auth-before-logged-out"
	| "after-bootstrap"
	| "before-quit"
	| "theme-changed";

export type LifecycleHandler = (platform: WorkspacePlatformModule) => Promise<void>;

export type LifecycleEventMap = {
	[key in LifecycleEvents]?: LifecycleHandler;
};

export interface Lifecycle<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the lifecycle events.
	 */
	get(): Promise<LifecycleEventMap>;
}
/**
 * This is a list of modules that allow you to hook
 * into the lifecycle events exposed by the platform.
 * A good example might be you wish to register a module
 * that is called when an authenticated session is expired
 * */
export type LifecycleProviderOptions = ModuleList;
