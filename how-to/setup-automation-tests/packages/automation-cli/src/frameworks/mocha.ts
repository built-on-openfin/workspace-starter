import glob from "glob";
import Mocha from "mocha";
import { promisify } from "util";
import type { Client } from "webdriver";
import { logInfo, logSeparator } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The global of the tests to run.
 * @param client The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 * @returns Exit code of 1 if any tests failed.
 */
export async function runTestsMocha(testPathGlob: string, client: Client, maxTimeout: number): Promise<number> {
    logInfo("Running Tests using Mocha");

    const testFiles = await promisify(glob)(testPathGlob);

    // Set the global object which points to the client so that the automation helpers can access it
    global.client = client;

    const mocha = new Mocha({});
    mocha.timeout(maxTimeout * 1000);

    for (const testFile of testFiles) {
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
