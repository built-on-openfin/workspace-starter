import {
	OpenFinProxy,
	OpenFinSystem,
	OpenFinHome,
	WebDriver,
	MouseButton
} from "@openfin/automation-helpers";

describe("Platform", () => {
	it("The runtime is ready", async () => {
		const isReady = await OpenFinSystem.waitForReady(10000);
		expect(isReady).toEqual(true);
	});

	it("The platform title should be set", async () => {
		const windows = await WebDriver.getWindows();
		expect(windows.length).toBeGreaterThan(0);
		const titles = windows.map((w) => w.title);
		expect(titles).toContain("Platform Provider");
	});

	it("The runtime version should be set", async () => {
		const fin = await OpenFinProxy.fin();
		const version = await fin.System.getVersion();
		expect(version).toEqual("42.138.100.101");
	});

	it("Can open the home window", async () => {
		const isShown = await OpenFinHome.show(60000);
		expect(isShown).toEqual(true);
	});

	it("Can search for an app", async () => {
		await OpenFinHome.search("call");
		await WebDriver.sleep(1000);

		const ids = await OpenFinHome.searchResultIds();

		expect(ids.length).toEqual(1);
		expect(ids[0]).toEqual("call-app");
		await WebDriver.saveScreenshot();
	});

	it("Can launch an app into a browser", async () => {
		await OpenFinHome.show(60000);
		await OpenFinHome.searchResultById("call-app", "open");
		await WebDriver.sleep(1000);
		await WebDriver.switchToWindow("title", "Call Application");
		const elem = await WebDriver.findElementByPath("//h1");
		await elem.setHTML("My New Title");

		const elem2 = await WebDriver.findElementByPath("//h1");
		const value = await elem2.getHTML();
		expect(value).toEqual("My New Title");

		await WebDriver.saveScreenshot();
	});

	it("Can add a new page to a window", async () => {
		const foundWin = await WebDriver.switchToWindow("identityString", [
			/internal-generated-window*/,
			/test-workspace-platform-starter/
		]);
		expect(foundWin).toBeTruthy();
		if (foundWin) {
			const elem = await WebDriver.findElementByPath("//*[@data-testid='browser-new-page-button']");
			expect(elem).toBeDefined();
			if (elem) {
				// First click on the button to show the native context menu
				await WebDriver.actions([
					{ type: "mouseMove", origin: elem },
					// Open the context menu
					{ type: "mouseClick", button: MouseButton.Left },
					// Pause to give the menu time to appear
					{ type: "pause", duration: 2000 }
				]);
				await WebDriver.switchToWindow("title", "New Tab");
				const title = await WebDriver.getTitle();
				expect(title).toEqual("New Tab");
			}
		}
	});
});
