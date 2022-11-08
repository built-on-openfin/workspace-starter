import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";

export type LifecycleEvents = "after-bootstrap" | "before-quit";

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

export type LifecycleProviderOptions = ModuleList;
