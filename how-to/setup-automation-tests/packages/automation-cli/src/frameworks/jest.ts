import { getVersion, runCLI } from "jest";
import type { Client } from "webdriver";
import { logSection } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The glob of the tests to run.
 * @param testFilesExpanded The expanded list of the glob files.
 * @param webdriver The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 * @param hasTypeScript Do the test files include TypeScript.
 * @returns Exit code of 1 if any tests failed.
 */
export async function runTestsJest(
    testPathGlob: string,
    testFilesExpanded: string[],
    webdriver: Client,
    maxTimeout: number,
    hasTypeScript: boolean
): Promise<number> {
    logSection("Running Tests using Jest", `Version ${getVersion()}`);

    // Set the global object which points to the client so that the automation helpers can access it
    // This only works in jest >= 28 which lazy loads globalThis into its vm context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).webdriver = webdriver;

    let testsFolder = testPathGlob;

    const wildcardIdx = testPathGlob.indexOf("**");
    if (wildcardIdx) {
        testsFolder = testsFolder.slice(0, wildcardIdx);
    }

    const options: {
        testTimeout: number;
        verbose: boolean;
        preset?: string;
        runInBand: boolean;
    } = {
        testTimeout: maxTimeout * 1000,
        verbose: true,
        runInBand: true
    };
    if (hasTypeScript) {
        options.preset = "ts-jest";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await runCLI(options as any, [testsFolder]);

    return results.results.numFailedTests > 0 ? 1 : 0;
}
