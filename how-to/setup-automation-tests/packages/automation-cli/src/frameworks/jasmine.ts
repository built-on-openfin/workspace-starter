import Jasmine from "jasmine";
import { SpecReporter } from "jasmine-spec-reporter";
import "@openfin/automation-helpers";
import type { Client } from "webdriver";
import { logInfo, logSeparator } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The global of the tests to run.
 * @param client The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 * @returns Exit code of 1 if any tests failed.
 */
export async function runTestsJasmine(testPathGlob: string, client: Client, maxTimeout: number): Promise<number> {
    logInfo("Running Tests using Jasmine");

    // Set the global object which points to the client so that the automation helpers can access it
    global.client = client;

    const runner = new Jasmine();
    runner.jasmine.DEFAULT_TIMEOUT_INTERVAL = maxTimeout * 1000;

    runner.clearReporters();
    runner.addReporter(new SpecReporter());

    runner.loadConfig({
        // eslint-disable-next-line camelcase
        spec_files: [testPathGlob],
        // If we don't set these values the tests are run in random order
        // which breaks sequential test patterns.
        random: false,
        seed: null
    });

    // If we don't set this flag the runner exits the whole app.
    runner.exitOnCompletion = false;
    const result = await runner.execute();
    logSeparator();

    return result.overallStatus === "failed" ? 1 : 0;
}
