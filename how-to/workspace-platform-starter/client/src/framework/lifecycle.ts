import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import type {
	Lifecycle,
	LifecycleEvents,
	LifecycleHandler,
	LifecycleProviderOptions
} from "./shapes/lifecycle-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
import { randomUUID } from "./utils";

let modules: ModuleEntry<Lifecycle, unknown, unknown, ModuleDefinition>[] = [];
const logger = createLogger("Lifecycle");
const allLifecycleEvents: {
	[key in LifecycleEvents]?: {
		id: string;
		handler: LifecycleHandler;
	}[];
} = {};

/**
 * Initialize the lifecycle provider.
 * @param options Options for the lifecycle provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: LifecycleProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		logger.info("Initializing lifecycle provider");
		modules = await loadModules<Lifecycle>(options, "lifecycle");
		await initializeModules<Lifecycle>(modules, helpers);

		for (const lifecycleModule of modules) {
			const lifecycleEvents = await lifecycleModule.implementation.get();
			for (const key in lifecycleEvents) {
				const lifecycleEvent: LifecycleEvents = key as LifecycleEvents;
				const evt = lifecycleEvents[lifecycleEvent];
				if (evt) {
					subscribeLifecycleEvent(lifecycleEvent, evt);
				}
			}
		}
	}
}

/**
 * Fire a lifecycle event.
 * @param platform The platform.
 * @param lifecycleEvent The event to fire.
 * @param customData Any custom data to pass to the handlers.
 */
export async function fireLifecycleEvent(
	platform: WorkspacePlatformModule,
	lifecycleEvent: LifecycleEvents,
	customData?: unknown
): Promise<void> {
	logger.info(`Request to fire lifecycle event ${lifecycleEvent} received`);
	const eventHandlers = allLifecycleEvents[lifecycleEvent];
	if (Array.isArray(eventHandlers)) {
		const subscribers = [...eventHandlers];
		logger.info(`Notifying ${subscribers.length} subscribers of lifecycle event ${lifecycleEvent}`);
		for (const idHandler of subscribers) {
			logger.info(`Notifying subscriber ${idHandler.id} of event ${lifecycleEvent}`);
			await idHandler.handler(platform, customData);
		}
	}
}

/**
 * Subscribe to a lifecycle event.
 * @param lifecycleEvent The event to subscribe to.
 * @param lifecycleHandler The handler to call for the event.
 * @returns The subscription id which can be used to unsubscribe.
 */
export function subscribeLifecycleEvent(
	lifecycleEvent: LifecycleEvents,
	lifecycleHandler: LifecycleHandler
): string {
	const subscriptionId = randomUUID();
	const handlers = allLifecycleEvents[lifecycleEvent] ?? [];
	handlers.push({
		id: subscriptionId,
		handler: lifecycleHandler
	});
	allLifecycleEvents[lifecycleEvent] = handlers;
	logger.info(
		`Subscription for lifecycle event ${lifecycleEvent} received. Subscription id: ${subscriptionId} returned`
	);
	return subscriptionId;
}

/**
 * Unsubscribe from a lifecycle event.
 * @param subscriptionId The subscription id to unsubscribe.
 * @param lifecycleEvent The event to unsubscribe from.
 */
export function unsubscribeLifecycleEvent(subscriptionId: string, lifecycleEvent: LifecycleEvents): void {
	logger.info(`Request to unsubscribe from lifecycle event ${lifecycleEvent} with id: ${subscriptionId}`);
	const handlers = allLifecycleEvents[lifecycleEvent];
	if (handlers) {
		const idx = handlers.findIndex((l) => l.id === subscriptionId);
		if (idx >= 0) {
			handlers.splice(idx, 1);
		}
	}
}
