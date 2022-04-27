import { ChildProcess, spawn } from "child_process";
import fs from "fs/promises";
import { logError, logShell } from "./console";

/**
 * Does the file exist.
 * @param filename The name of the file.
 * @returns True of the file exists.
 */
export async function fileExists(filename: string): Promise<boolean> {
    try {
        const stats = await fs.stat(filename);
        return stats.isFile();
    } catch {
        return false;
    }
}

/**
 * Does the directory exist.
 * @param directory The name of the directory.
 * @returns True of the directory exists.
 */
export async function directoryExists(directory: string): Promise<boolean> {
    try {
        const stats = await fs.stat(directory);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

/**
 * Kill a running process by id.
 * @param processId The id of the process to kill.
 */
export async function killProcessById(processId: number): Promise<void> {
    await spawnWithOutputWait("taskkill", ["/F", "/PID", processId.toString(), "/T"], undefined, true, true);
}

/**
 * Kill a running process by image name.
 * @param image The image name of the process to kill.
 */
export async function killProcessByImage(image: string): Promise<void> {
    await spawnWithOutputWait("taskkill", ["/F", "/IM", image, "/T"], undefined, true, true);
}

/**
 * Is this is node error.
 * @param error The error object.
 * @returns If given error object is a NodeJS error.
 */
export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error;
}

/**
 * Spawn a child and display the output.
 * @param process The process to spawn.
 * @param args The arguments for the app.
 * @param options The options to launch with.
 * @param options.shell Launch as shell with unsanitized args.
 * @param hideOutput Hide the output.
 * @param hideErrors Ignore errors in the output.
 * @param endCallback Callback to call when the task completes.
 * @returns The spawned process.
 */
export function spawnWithOutput(
    process: string,
    args?: string[],
    options?: { shell: boolean },
    hideOutput?: boolean,
    hideErrors?: boolean,
    endCallback?: (output: string, error: string) => void
): ChildProcess {
    const child = spawn(process, args, options);

    let output = "";
    let err = "";
    let completeOutput = "";
    let completeError = "";

    child.stdout.setEncoding("utf8");
    child.stdout.on("data", data => {
        if (endCallback) {
            completeOutput += data.toString();
        }
        if (!hideOutput) {
            output += data.toString();
            const lines = output.split("\n");
            output = lines.pop() ?? "";
            for (const line of lines) {
                logShell(line);
            }
        }
    });

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", data => {
        if (endCallback) {
            completeError += data.toString();
        }
        if (!hideErrors) {
            err += data.toString();
            const lines = err.split("\n");
            err = lines.pop() ?? "";
            for (const line of lines) {
                logError(line);
            }
        }
    });

    child.on("close", () => {
        if (output.trim().length > 0) {
            logShell(output);
        }
        if (err.trim().length > 0) {
            logError(err);
        }

        if (endCallback) {
            endCallback(completeOutput, completeError);
        }
    });

    return child;
}

/**
 * Spawn a child and display the output.
 * @param process The process to spawn.
 * @param args The arguments for the app.
 * @param options The options to launch with.
 * @param options.shell Launch as shell with unsanitized args.
 * @param hideOutput Hide the output.
 * @param hideErrors Ignore errors in the output.
 */
export async function spawnWithOutputWait(
    process: string,
    args?: string[],
    options?: { shell: boolean },
    hideOutput?: boolean,
    hideErrors?: boolean
): Promise<{
    output: string;
    error: string;
}> {
    return new Promise<{
        output: string;
        error: string;
    }>(resolve => {
        spawnWithOutput(process, args, options, hideOutput, hideErrors, (output, error) => {
            resolve({ output, error });
        });
    });
}
