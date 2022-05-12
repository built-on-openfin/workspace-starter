import { NodeWebDriver } from "@openfin/automation-helpers";
import Jasmine from "jasmine";
import { SpecReporter } from "jasmine-spec-reporter";
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
export async function runTestsJasmine(
    testPathGlob: string,
    testFilesExpanded: string[],
    webdriver: Client,
    maxTimeout: number,
    hasTypeScript: boolean
): Promise<number> {
    const runner = new Jasmine();

    logSection("Running Tests using Jasmine", `Version ${runner.coreVersion()}`);

    // Set the global object which points to the client so that the automation helpers can access it
    globalThis.webDriver = new NodeWebDriver(webdriver);

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

    return result.overallStatus === "failed" ? 1 : 0;
}
