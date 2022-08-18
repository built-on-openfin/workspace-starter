import { Logger } from "../../../logger-shapes";

/**
 * Implement the logger using the console.
 */
export class ConsoleLogger implements Logger {
	/**
	 * The last group output.
	 */
	private _lastGroup: string;

	/**
	 * Log data as information.
	 * @param group The group sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public info(group: string, message?: unknown, ...optionalParams: unknown[]): void {
		this.handleGroup(group);
		console.info(message, ...optionalParams);
	}

	/**
	 * Log data as error.
	 * @param group The group sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public error(group: string, message?: unknown, ...optionalParams: unknown[]): void {
		this.handleGroup(group);
		console.error(message, ...optionalParams);
	}

	/**
	 * Log data as warning.
	 * @param group The group sending the log message.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	public warn(group: string, message?: unknown, ...optionalParams: unknown[]): void {
		this.handleGroup(group);
		console.warn(message, ...optionalParams);
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
	private handleGroup(group: string): void {
		if (this._lastGroup !== group) {
			this._lastGroup = group;
			if (this._lastGroup) {
				console.groupEnd();
			}
			if (group.length > 0) {
				console.group(
					`%c${group}`,
					`color: #ffffff; background: ${this.stringToColor(
						group
					)}; font-size: 10px; font-weight: bold; padding: 2px`
				);
			}
		}
	}
}
