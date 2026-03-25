import type { LoggerCreator, LogLevel, LogProvider } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ConsoleLogOptions } from "./shapes";

/**
 * Implement the log provider using the console.
 */
export class ConsoleLogProvider implements LogProvider<ConsoleLogOptions> {
	/**
	 * The levels of logging to include.
	 */
	private _includeLevels?: LogLevel[];

	/**
	 * The last group identity output.
	 */
	private _lastGroupIdentity?: string;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ConsoleLogOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._includeLevels = definition.data?.includeLevels ?? ["info", "warn", "error", "debug", "trace"];
	}

	/**
	 * Log data.
	 * @param identity The identity sending the message.
	 * @param group The group sending the log message.
	 * @param level The level of the message to log.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public log(
		identity: string,
		group: string,
		level: LogLevel,
		message: unknown,
		...optionalParams: unknown[]
	): void {
		if (this._includeLevels?.includes(level)) {
			this.handleGroup(group, identity);
			console[level](message, ...optionalParams);
		}
	}

	/**
	 * Convert a string to a color.
	 * @param str The string to convert.
	 * @returns The color.
	 */
	private stringToColor(str: string): string {
		// eslint-disable-next-line no-bitwise
		const stringUniqueHash = [...str].reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
		return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
	}

	/**
	 * Handle a group.
	 * @param group The group.
	 * @param identity The identity.
	 */
	private handleGroup(group: string, identity: string): void {
		const newGroupIdentity = `${group} ${identity}`;
		if (this._lastGroupIdentity !== newGroupIdentity) {
			this._lastGroupIdentity = newGroupIdentity;
			if (this._lastGroupIdentity) {
				console.groupEnd();
			}
			if (group.length > 0) {
				console.group(
					`%c${group}%c${identity}`,
					`color: #ffffff; background: ${this.stringToColor(
						group
					)}; font-size: 10px; font-weight: bold; padding: 2px 4px; border-radius: 5px`,
					`color: #ffffff; background: ${this.stringToColor(
						identity
					)}; font-size: 10px; font-weight: bold; padding: 2px 4px; margin-left: 4px; border-radius: 5px`
				);
			}
		}
	}
}
