/* eslint-disable no-console */
import chalk from "chalk";

/**
 * Log the output as a header.
 * @param header The header to log.
 */
export function logHeader(header: string): void {
    console.log(chalk.blue(chalk.underline(header)));
}

/**
 * Log a blank line.
 */
export function logBlank(): void {
    console.log();
}

/**
 * Log a separator line.
 */
export function logSeparator(): void {
    console.log("----------------------------------------------------------");
}

/**
 * Log the output as an error.
 * @param error The error to log.
 */
export function logError(error: unknown): void {
    console.log(chalk.red(error));
}

/**
 * Log the output as an info.
 * @param info The info to log.
 * @param data The data to log with the info.
 */
export function logInfo(info: unknown, data?: unknown): void {
    if (data !== undefined) {
        console.log(chalk.green(info), chalk.cyan(data));
    } else {
        console.log(chalk.green(info));
    }
}
