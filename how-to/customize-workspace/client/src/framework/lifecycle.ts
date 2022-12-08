import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import { initializeModules, loadModules } from "./modules";
import type {
	Lifecycle,
	LifecycleEvents,
	LifecycleHandler,
	LifecycleProviderOptions
} from "./shapes/lifecycle-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import { randomUUID } from "./uuid";

let lifecycleModules: ModuleEntry<Lifecycle, unknown, unknown, ModuleDefinition>[] = [];

const allLifecycleEvents: {
	[key in LifecycleEvents]?: {
		id: string;
		handler: LifecycleHandler;
	}[];
} = {};

export async function init(
	lifecycleProviderOptions: LifecycleProviderOptions,
	helpers: ModuleHelpers
): Promise<void> {
	lifecycleModules = await loadModules<Lifecycle>(lifecycleProviderOptions, "lifecycle");
	await initializeModules<Lifecycle>(lifecycleModules, helpers);

	for (const lifecycleModule of lifecycleModules) {
		const lifecycleEvents = await lifecycleModule.implementation.get();
		for (const key in lifecycleEvents) {
			const lifecycleEvent: LifecycleEvents = key as LifecycleEvents;
			subscribeLifecycleEvent(lifecycleEvent, lifecycleEvents[lifecycleEvent]);
		}
	}
}

export async function fireLifecycleEvent(
	platform: WorkspacePlatformModule,
	lifecycleEvent: LifecycleEvents
): Promise<void> {
	if (allLifecycleEvents[lifecycleEvent]) {
		for (const idHandler of allLifecycleEvents[lifecycleEvent]) {
			await idHandler.handler(platform);
		}
	}
}

export function subscribeLifecycleEvent(
	lifecycleEvent: LifecycleEvents,
	lifecycleHandler: LifecycleHandler
): string {
	const id = randomUUID();
	allLifecycleEvents[lifecycleEvent] = allLifecycleEvents[lifecycleEvent] ?? [];
	allLifecycleEvents[lifecycleEvent].push({
		id,
		handler: lifecycleHandler
	});
	return id;
}

export function unsubscribeLifecycleEvent(subscriptionId: string, lifecycleEvent: LifecycleEvents): void {
	if (allLifecycleEvents[lifecycleEvent]) {
		const idx = allLifecycleEvents[lifecycleEvent].findIndex((l) => l.id === subscriptionId);
		if (idx >= 0) {
			allLifecycleEvents[lifecycleEvent].splice(idx, 1);
		}
	}
}
