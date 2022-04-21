import Jasmine from "jasmine";
import { SpecReporter } from "jasmine-spec-reporter";
import "openfin-test-helpers";
import type { Client } from "webdriver";
import { logInfo, logSeparator } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The global of the tests to run.
 * @param client The webdriver client to hand in to the tests.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 */
export async function runTestsJasmine(testPathGlob: string, client: Client, maxTimeout: number): Promise<void> {
    logInfo("Running Tests using Jasmine");

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
    await runner.execute();
    logSeparator();
}
