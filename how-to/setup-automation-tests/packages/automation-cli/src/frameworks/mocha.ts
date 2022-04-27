import Mocha from "mocha";
import type { Client } from "webdriver";
import { logSection, logSeparator } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The glob of the tests to run.
 * @param testFilesExpanded The expanded list of the glob files.
 * @param webdriver The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 * @param hasTypeScript Do the test files include TypeScript.
 * @returns Exit code of 1 if any tests failed.
 */
export async function runTestsMocha(
    testPathGlob: string,
    testFilesExpanded: string[],
    webdriver: Client,
    maxTimeout: number,
    hasTypeScript: boolean
): Promise<number> {
    const mocha = new Mocha({});

    // The mocha version is not in the TS definitions.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logSection("Running Tests using Mocha", `Version ${(mocha as any).version}`);

    // Set the global object which points to the client so that the automation helpers can access it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).webdriver = webdriver;

    mocha.timeout(maxTimeout * 1000);

    for (const testFile of testFilesExpanded) {
        mocha.addFile(testFile);
    }

    return new Promise<number>((resolve, reject) => {
        let failCount = 0;
        const runner = mocha.run();
        runner.on("fail", () => {
            failCount++;
        });
        runner.on("end", () => {
            resolve(failCount > 0 ? 1 : 0);
            logSeparator();
        });
    });
}
