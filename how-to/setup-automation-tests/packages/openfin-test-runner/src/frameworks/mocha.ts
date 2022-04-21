import glob from "glob";
import Mocha from "mocha";
import "openfin-test-helpers";
import { promisify } from "util";
import type { Client } from "webdriver";
import { logInfo, logSeparator } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The global of the tests to run.
 * @param client The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 */
export async function runTestsMocha(testPathGlob: string, client: Client, maxTimeout: number): Promise<void> {
    logInfo("Running Tests using Mocha");

    const testFiles = await promisify(glob)(testPathGlob);

    global.client = client;

    const mocha = new Mocha({});
    mocha.timeout(maxTimeout * 1000);

    for (const testFile of testFiles) {
        mocha.addFile(testFile);
    }

    return new Promise<void>((resolve, reject) => {
        const runner = mocha.run();
        runner.on("end", () => {
            resolve();
            logSeparator();
        });
    });
}
