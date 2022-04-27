/* eslint-disable no-console */
import chalk from "chalk";

/**
 * Log the output as a header.
 * @param header The header to log.
 */
export function logHeader(header: string): void {
    console.log(`🚀 ${chalk.blue(chalk.underline(header))}`);
}

/**
 * Log a blank line.
 */
export function logBlank(): void {
    console.log();
}

/**
 * Log the plain content.
 * @param content The content to log.
 */
export function logPlain(content: string): void {
    console.log(content);
}

/**
 * Log the content as though its from a shell response.
 * @param content The content to log.
 */
export function logShell(content: string): void {
    console.log(chalk.gray.italic(content));
}

/**
 * Log the output as an error.
 * @param error The error to log.
 */
export function logError(error: unknown): void {
    console.log(`❗ ${chalk.red(error)}`);
}

/**
 * Log the output as a section.
 * @param info The info to log.
 * @param data The data to log with the info.
 */
export function logSection(info: unknown, data?: unknown): void {
    console.log("_______________________________________________________");
    console.log();
    console.log(`➡️  ${chalk.cyan(info)}`);
    if (data !== undefined) {
        console.log(`   ${chalk.gray(data)}`);
    }
    console.log();
}

/**
 * Log the output as an settings.
 * @param info The info to log.
 * @param data The data to log with the info.
 */
export function logSettings(info: unknown, data?: unknown): void {
    if (data !== undefined) {
        console.log(`  ⚙️  ${chalk.green(info)}`, chalk.gray(data));
    } else {
        console.log(`  ⚙️  ${chalk.green(info)}`);
    }
}

/**
 * Log the output as a progress.
 * @param info The info to log.
 * @param data The data to log with the info.
 */
export function logTask(info: unknown, data?: unknown): void {
    if (data !== undefined) {
        console.log(`  ✅  ${chalk.cyan(info)}`, chalk.gray(data));
    } else {
        console.log(`  ✅  ${chalk.cyan(info)}`);
    }
}

/**
 * Log the output as a help.
 * @param help The info to log.
 */
export function logHelp(help: unknown): void {
    console.log(`❔ ${chalk.green(help)}`);
}

/**
 * Log the exit.
 * @param exitCode The exit code.
 * @param success The content to display for success.
 * @param failure The content to display for failure.
 * @param termination The content to display for termination.
 */
export function logExit(exitCode: number, success: string, failure: string, termination: string): void {
    console.log("_______________________________________________________");
    console.log();
    if (exitCode === 0) {
        console.log(`😀  ${success}`);
    } else if (exitCode === 1) {
        console.log(`☹️  ${failure}`);
    } else {
        console.log(`💣  ${termination}`);
    }
}
