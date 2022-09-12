import { closedownModules, initializeModules, loadModules } from "./modules";
import type { Logger, LoggerProviderOptions, LogLevel, LogProvider } from "./shapes/logger-shapes";
import type { ModuleEntry } from "./shapes/module-shapes";

export class LoggerProvider {
	/**
	 * Multiple logger to send messages to.
	 */
	private _logProviders: ModuleEntry<LogProvider>[];

	/**
	 * The local identity.
	 */
	private readonly _identity: OpenFin.Identity;

	/**
	 * Create a new instance of LoggerProvider.
	 */
	constructor() {
		this._logProviders = [];
		this._identity = fin.me.identity;
	}

	/**
	 * Initialize the logger provider.
	 * @param options The provider options.
	 */
	public async init(options?: LoggerProviderOptions): Promise<void> {
		this._logProviders = await loadModules<LogProvider>(options, "log");
		await initializeModules(this._logProviders);
	}

	/**
	 * Close down the logger provider.
	 */
	public async closedown(): Promise<void> {
		await closedownModules("log");
	}

	/**
	 * Log data as information.
	 * @param group The group sending the log message.
	 * @param level The level of the message to log.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public log(group: string, level: LogLevel, message: unknown, ...optionalParams: unknown[]): void {
		let hasLogged = false;
		for (const logProviderEntry of this._logProviders) {
			if (logProviderEntry.isInitialised) {
				hasLogged = true;
				logProviderEntry.implementation.log(this._identity.name, group, level, message, ...optionalParams);
			}
		}

		if (!hasLogged) {
			console[level](`[${group}]`, `[${this._identity.name}]`, message, ...optionalParams);
		}
	}
}

export const loggerProvider = new LoggerProvider();

export function createLogger(group: string): Logger {
	return {
		info: (message: unknown, ...optionalParams: unknown[]) =>
			loggerProvider.log(group, "info", message, ...optionalParams),
		warn: (message: unknown, ...optionalParams: unknown[]) =>
			loggerProvider.log(group, "warn", message, ...optionalParams),
		error: (message: unknown, ...optionalParams: unknown[]) =>
			loggerProvider.log(group, "error", message, ...optionalParams),
		trace: (message: unknown, ...optionalParams: unknown[]) =>
			loggerProvider.log(group, "trace", message, ...optionalParams),
		debug: (message: unknown, ...optionalParams: unknown[]) =>
			loggerProvider.log(group, "debug", message, ...optionalParams)
	};
}
