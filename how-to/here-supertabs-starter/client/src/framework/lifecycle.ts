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
import { isEmpty, randomUUID } from "./utils";

let modules: ModuleEntry<Lifecycle, unknown, unknown, ModuleDefinition>[] = [];
const logger = createLogger("Lifecycle");
const allLifecycleEvents: {
	[key in LifecycleEvents]?: {
		subscribers: {
			id: string;
			handler: LifecycleHandler;
		}[];
		platform?: WorkspacePlatformModule;
		lastPayload?: unknown;
	};
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
 * @param payload Any custom data to pass to the handlers.
 */
export async function fireLifecycleEvent<T = unknown>(
	platform: WorkspacePlatformModule,
	lifecycleEvent: LifecycleEvents,
	payload?: T
): Promise<void> {
	logger.info(`Request to fire lifecycle event ${lifecycleEvent} received`);
	const eventHandlers = allLifecycleEvents[lifecycleEvent];
	if (!isEmpty(eventHandlers)) {
		eventHandlers.platform = platform;
		eventHandlers.lastPayload = payload;
		logger.info(
			`Notifying ${eventHandlers.subscribers.length} subscribers of lifecycle event ${lifecycleEvent}`
		);
		// Clone the subscribers, otherwise if calling the handler performs an unsubscribe
		// the loop gets out of sync and items can be missed
		const subscribers = [...eventHandlers.subscribers];

		await Promise.all(
			subscribers.map(async (idHandler) => {
				logger.info(`Notifying subscriber ${idHandler.id} of event ${lifecycleEvent}`);
				await idHandler.handler(platform, payload);
			})
		);
	}
}

/**
 * Subscribe to a lifecycle event.
 * @param lifecycleEvent The event to subscribe to.
 * @param lifecycleHandler The handler to call for the event.
 * @returns The subscription id which can be used to unsubscribe.
 */
export function subscribeLifecycleEvent<T = unknown>(
	lifecycleEvent: LifecycleEvents,
	lifecycleHandler: LifecycleHandler<T>
): string {
	const subscriptionId = randomUUID();
	const handlers: {
		subscribers: {
			id: string;
			handler: LifecycleHandler;
		}[];
		lastPayload?: unknown;
		platform?: WorkspacePlatformModule;
	} = allLifecycleEvents[lifecycleEvent] ?? { subscribers: [] };
	handlers.subscribers.push({
		id: subscriptionId,
		handler: lifecycleHandler as LifecycleHandler
	});
	allLifecycleEvents[lifecycleEvent] = handlers;
	logger.info(
		`Subscription for lifecycle event ${lifecycleEvent} received. Subscription id: ${subscriptionId} returned`
	);

	// Call the lifecycle handler immediately on the next cycle with the last payload
	// If the platform is set then fireLifecycleEvent has been called at least once
	if (!isEmpty(handlers.platform)) {
		setTimeout(async () => {
			if (!isEmpty(handlers.platform)) {
				await lifecycleHandler(handlers.platform, handlers.lastPayload as T);
			}
		}, 0);
	}

	return subscriptionId;
}

/**
 * Unsubscribe from a lifecycle event.
 * @param subscriptionId The subscription id to unsubscribe.
 * @param lifecycleEvent The event to unsubscribe from.
 */
export function unsubscribeLifecycleEvent(subscriptionId: string, lifecycleEvent: LifecycleEvents): void {
	logger.info(`Request to unsubscribe from lifecycle event ${lifecycleEvent} with id: ${subscriptionId}`);
	const eventHandlers = allLifecycleEvents[lifecycleEvent];
	if (!isEmpty(eventHandlers)) {
		const subscribers = eventHandlers.subscribers;
		const idx = subscribers.findIndex((l) => l.id === subscriptionId);
		if (idx >= 0) {
			subscribers.splice(idx, 1);
		}
	}
}
