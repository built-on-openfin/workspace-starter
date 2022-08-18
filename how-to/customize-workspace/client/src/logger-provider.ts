import { Logger, LoggerModule, LoggerProviderOptions } from "./logger-shapes";

export class LoggerProvider implements Logger<LoggerProviderOptions> {
	/**
	 * Multiple logger to send messages to.
	 */
	private readonly _loggers: Map<string, Logger>;

	/**
	 * Create a new instance of LoggerProvider.
	 */
	constructor() {
		this._loggers = new Map();
	}

	/**
	 * Initialize the logger provider.
	 * @param options The provider options.
	 */
	public async initialize(options: LoggerProviderOptions): Promise<void> {
		if (Array.isArray(options.modules)) {
			for (const module of options.modules) {
				if (module.enabled) {
					try {
						const mod: LoggerModule = await import(/* webpackIgnore: true */ module.url);
						await this.addLogger(module.id, mod.logger, module.data);
					} catch (err) {
						this.error("LoggerProvider", `Error loading module ${module.id} with url ${module.url}`, err);
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
	 * @param context The context sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public info(context: string, message: unknown, ...optionalParams: unknown[]): void {
		if (this._loggers.size === 0) {
			console.info(`[${context}]`, message, ...optionalParams);
		} else {
			for (const [, log] of this._loggers) {
				log.info(context, message, ...optionalParams);
			}
		}
	}

	/**
	 * Log data as error.
	 * @param context The context sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public error(context: string, message: unknown, ...optionalParams: unknown[]): void {
		if (this._loggers.size === 0) {
			console.error(`[${context}]`, message, ...optionalParams);
		} else {
			for (const [, log] of this._loggers) {
				log.error(context, message, ...optionalParams);
			}
		}
	}

	/**
	 * Log data as warning.
	 * @param context The context sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public warn(context: string, message: unknown, ...optionalParams: unknown[]): void {
		if (this._loggers.size === 0) {
			console.warn(`[${context}]`, message, ...optionalParams);
		} else {
			for (const [, log] of this._loggers) {
				log.warn(context, message, ...optionalParams);
			}
		}
	}

	/**
	 * Add a new logger.
	 * @param name The name of the logger.
	 * @param log The logger.
	 * @param data Additional data for initialization.
	 */
	public async addLogger(name: string, log: Logger, data?: unknown): Promise<void> {
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

	public async getLogger<T>(name: string): Promise<Logger<T> | undefined> {
		if (this._loggers.has(name)) {
			return this._loggers.get(name);
		}

		this.warn("LoggerProvider", `The logger named '${name}' does not exist`);
	}
}

export const logger: Logger = new LoggerProvider();
