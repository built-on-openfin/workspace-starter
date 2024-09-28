import { test, expect, chromium, Page } from "@playwright/test";

test.describe("OpenFin Application Test", () => {
	test("should perform an action in OpenFin app", async () => {
		console.log("Connecting to cdp");

		// Connect to the running OpenFin instance via CDP (port specified in manifest.json)
		const openFin = await chromium.connectOverCDP("http://localhost:9222");

		// Get the open pages (contexts) from the running instance
		const contexts = openFin.contexts();
		const mainContext = contexts[0];
		const page = await mainContext.pages()[0];

		// Interact with the OpenFin application
		await page.waitForSelector("#title");

		// Perform actions
		await page.click("#title");
		const content = await page.textContent("#title");
		expect(content).toBe("Hello World");
	});
});
