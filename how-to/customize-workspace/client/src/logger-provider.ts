import { Logger, LoggerCore, LoggerModule, LoggerProviderOptions, LogLevel } from "./logger-shapes";

export class LoggerProvider {
	/**
	 * Multiple logger to send messages to.
	 */
	private readonly _loggers: Map<string, LoggerCore>;

	/**
	 * The local identity.
	 */
	private readonly _identity: OpenFin.Identity;

	/**
	 * Create a new instance of LoggerProvider.
	 */
	constructor() {
		this._loggers = new Map();
		this._identity = fin.me.identity;
	}

	/**
	 * Initialize the logger provider.
	 * @param options The provider options.
	 */
	public async initialize(options?: LoggerProviderOptions): Promise<void> {
		if (Array.isArray(options.modules)) {
			for (const module of options.modules) {
				if (module.enabled) {
					try {
						const mod: LoggerModule = await import(/* webpackIgnore: true */ module.url);
						await this.addLogger(module.id, mod.logger, module.data);
					} catch (err) {
						this.log(
							"LoggerProvider",
							"error",
							`Error loading module ${module.id} with url ${module.url}`,
							err
						);
					}
				}
			}
		}
	}

	/**
	 * Close down the logger provider.
	 */
	public async closedown(): Promise<void> {
		const keys = this._loggers.keys();
		for (const key of keys) {
			await this.removeLogger(key);
		}
	}

	/**
	 * Log data as information.
	 * @param group The group sending the log message.
	 * @param level The level of the message to log.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public log(group: string, level: LogLevel, message: unknown, ...optionalParams: unknown[]): void {
		if (this._loggers.size === 0) {
			console[level](`[${group}]`, `[${this._identity.name}]`, message, ...optionalParams);
		} else {
			for (const [, log] of this._loggers) {
				log.log(this._identity.name, group, level, message, ...optionalParams);
			}
		}
	}

	/**
	 * Add a new logger.
	 * @param name The name of the logger.
	 * @param log The logger.
	 * @param data Additional data for initialization.
	 */
	public async addLogger(name: string, log: LoggerCore, data?: unknown): Promise<void> {
		this._loggers.set(name, log);
		if (log.initialize) {
			await log.initialize(data);
		}
	}

	/**
	 * Remove a logger.
	 * @param name The name of the logger to remove.
	 */
	public async removeLogger(name: string): Promise<void> {
		if (this._loggers.has(name)) {
			const log = this._loggers.get(name);
			if (log?.closedown) {
				await log?.closedown();
			}
			this._loggers.delete(name);
		}
	}

	/**
	 * Get as specific logger.
	 * @param name The logger to get.
	 * @returns The logger if it exists.
	 */

	public async getLogger<T>(name: string): Promise<LoggerCore<T> | undefined> {
		if (this._loggers.has(name)) {
			return this._loggers.get(name);
		}

		this.log("LoggerProvider", "warn", `The logger named '${name}' does not exist`);
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
