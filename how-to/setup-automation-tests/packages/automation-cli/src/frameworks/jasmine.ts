import Jasmine from "jasmine";
import { SpecReporter } from "jasmine-spec-reporter";
import { logSection } from "../console";

/**
 * Run the tests.
 * @param testPathGlob The glob of the tests to run.
 * @param testFilesExpanded The expanded list of the glob files.
 * @param maxTimeout The maximum length of time for a test to run in seconds.
 * @param hasTypeScript Do the test files include TypeScript.
 * @returns Exit code of 1 if any tests failed.
 */
export async function runTestsJasmine(
    testPathGlob: string,
    testFilesExpanded: string[],
    maxTimeout: number,
    hasTypeScript: boolean
): Promise<number> {
    const runner = new Jasmine();

    logSection("Running Tests using Jasmine", `Version ${runner.coreVersion()}`);

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
