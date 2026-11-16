/**
 * Setup global hooks for the test framework.
 * @param globalVars Global variable store.
 */
export async function setup(globalVars: { [id: string]: unknown }): Promise<void> {
	console.log("Global Setup");
	globalVars.startTime = Date.now();
}

/**
 * Teardown the global setup.
 * @param globalVars Global variable store.
 * @param globalVars.startTime The time the tests started.
 */
export async function teardown(globalVars: { [id: string]: unknown; startTime: number }): Promise<void> {
	console.log("Global Teardown");
	console.log("Time taken", Date.now() - globalVars.startTime);
}

/**
 * Global hook run before each test.
 * @param globalVars Global variable store.
 * @param currentTestName The name of the current test.
 */
export async function beforeEach(
	globalVars: { [id: string]: unknown },
	currentTestName: string
): Promise<void> {
	// console.log("Before", currentTestName);
}

/**
 * Global hook run after each test.
 * @param globalVars Global variable store.
 * @param currentTestName The name of the current test.
 */
export async function afterEach(
	globalVars: { [id: string]: unknown },
	currentTestName: string
): Promise<void> {
	// console.log("After", currentTestName);
}
