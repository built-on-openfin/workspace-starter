import { LoggerCore, LogLevel } from "../../../logger-shapes";
import { ConsoleLoggerOptions } from "./shapes";

/**
 * Implement the logger using the console.
 */
export class ConsoleLogger implements LoggerCore<ConsoleLoggerOptions> {
	/**
	 * The levels of logging to include.
	 */
	private _includeLevels: LogLevel[];

	/**
	 * The last group identity output.
	 */
	private _lastGroupIdentity: string;

	/**
	 * Optionally initialize the logger.
	 * @param options The custom options for the logger.
	 */
	public async initialize(options: ConsoleLoggerOptions): Promise<void> {
		this._includeLevels = options?.includeLevels ?? ["info", "warn", "error", "debug", "trace"];
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
		if (this._includeLevels.includes(level)) {
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
