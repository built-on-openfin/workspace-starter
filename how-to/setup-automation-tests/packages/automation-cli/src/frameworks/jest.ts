import { runCLI } from "jest";
import type { Client } from "webdriver";
import { logInfo, logSeparator } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The global of the tests to run.
 * @param webdriver The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 * @returns Exit code of 1 if any tests failed.
 */
export async function runTestsJest(testPathGlob: string, webdriver: Client, maxTimeout: number): Promise<number> {
    logInfo("Running Tests using Jest");

    // Set the global object which points to the client so that the automation helpers can access it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).webdriver = webdriver;

    let testsFolder = testPathGlob;

    const wildcardIdx = testPathGlob.indexOf("**");
    if (wildcardIdx) {
        testsFolder = testsFolder.slice(0, wildcardIdx);
    }

    const options = {
        global: globalThis,
        testTimeout: maxTimeout * 1000,
        verbose: true
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await runCLI(options as any, [testsFolder]);

    logSeparator();

    return results.results.numFailedTests > 0 ? 1 : 0;
}
