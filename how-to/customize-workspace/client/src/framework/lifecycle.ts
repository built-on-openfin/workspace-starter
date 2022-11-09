import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import { initializeModules, loadModules } from "./modules";
import type {
	Lifecycle,
	LifecycleEvents,
	LifecycleHandler,
	LifecycleProviderOptions
} from "./shapes/lifecycle-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";

let lifecycleModules: ModuleEntry<Lifecycle, unknown, unknown, ModuleDefinition>[] = [];

const allLifecycleEvents: { [key in LifecycleEvents]?: LifecycleHandler[] } = {};

export async function init(
	lifecycleProviderOptions: LifecycleProviderOptions,
	helpers: ModuleHelpers
): Promise<void> {
	lifecycleModules = await loadModules<Lifecycle>(lifecycleProviderOptions, "lifecycle");
	await initializeModules<Lifecycle>(lifecycleModules, helpers);

	for (const lifecycleModule of lifecycleModules) {
		const conditions = await lifecycleModule.implementation.get();
		for (const condition in conditions) {
			allLifecycleEvents[condition] = allLifecycleEvents[condition] ?? [];
			allLifecycleEvents[condition].push(conditions[condition]);
		}
	}
}

export async function fireLifecycleEvent(
	platform: WorkspacePlatformModule,
	lifecycleEvent: LifecycleEvents
): Promise<void> {
	if (allLifecycleEvents[lifecycleEvent]) {
		for (const handler of allLifecycleEvents[lifecycleEvent]) {
			await handler(platform);
		}
	}
}
