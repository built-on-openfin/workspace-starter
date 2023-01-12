export async function setup(globalVars: { [id: string]: unknown }): Promise<void> {
	console.log("Global Setup");
	globalVars.startTime = Date.now();
}

export async function teardown(globalVars: { [id: string]: unknown; startTime: number }): Promise<void> {
	console.log("Global Teardown");
	console.log("Time taken", Date.now() - globalVars.startTime);
}

export async function beforeEach(
	globalVars: { [id: string]: unknown },
	currentTestName: string
): Promise<void> {
	// console.log("Before", currentTestName);
}

export async function afterEach(
	globalVars: { [id: string]: unknown },
	currentTestName: string
): Promise<void> {
	// console.log("After", currentTestName);
}
