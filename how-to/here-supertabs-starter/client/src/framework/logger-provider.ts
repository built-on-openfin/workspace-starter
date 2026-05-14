import { closedownModules, initializeModules, loadModules } from "./modules";
import type { Logger, LoggerProviderOptions, LogLevel, LogProvider } from "./shapes/logger-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";

let modules: ModuleEntry<LogProvider>[] = [];

/**
 * Initialize the logger provider.
 * @param options Options for the logger provider.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: LoggerProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		modules = await loadModules<LogProvider>(options, "log");
		await initializeModules(modules, helpers);
	}
}

/**
 * Close down the logger provider.
 */
export async function closedown(): Promise<void> {
	await closedownModules("log");
}

/**
 * Create a logger.
 * @param group The group to encapsulate the loge entries with.
 * @returns The created logger.
 */
export function createLogger(group: string): Logger {
	return {
		info: (message: unknown, ...optionalParams: unknown[]) => log(group, "info", message, ...optionalParams),
		warn: (message: unknown, ...optionalParams: unknown[]) => log(group, "warn", message, ...optionalParams),
		error: (message: unknown, ...optionalParams: unknown[]) =>
			log(group, "error", message, ...optionalParams),
		trace: (message: unknown, ...optionalParams: unknown[]) =>
			log(group, "trace", message, ...optionalParams),
		debug: (message: unknown, ...optionalParams: unknown[]) => log(group, "debug", message, ...optionalParams)
	};
}

/**
 * Log data as information.
 * @param group The group sending the log message.
 * @param level The level of the message to log.
 * @param message The message to log.
 * @param optionalParams Optional parameters for details.
 */
function log(group: string, level: LogLevel, message: unknown, ...optionalParams: unknown[]): void {
	let hasLogged = false;
	for (const logProviderEntry of modules) {
		hasLogged = true;
		logProviderEntry.implementation.log(fin.me.identity.name, group, level, message, ...optionalParams);
	}

	if (!hasLogged) {
		console[level](`[${group}]`, `[${fin.me.identity.name}]`, message, ...optionalParams);
	}
}
