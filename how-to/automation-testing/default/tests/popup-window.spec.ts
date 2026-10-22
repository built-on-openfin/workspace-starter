import { MouseButton, OpenFinView, WebDriver } from "@openfin/automation-helpers";

/**
 * Driving an OpenFin popup window (`fin.me.showPopupWindow()`) over WebDriver.
 *
 * A popup uses the default `blurBehavior: 'close'`, so it is destroyed the
 * moment anything else takes focus. That rules out `getWindows()` for finding
 * it — enumerating switches the WebDriver context into every window in turn and
 * ChromeDriver activates each one as it goes, which closes the popup before the
 * scan reaches it. The pattern below is therefore: snapshot the raw handles,
 * open the popup, diff, and switch straight to the new handle.
 */
describe("Popup window (showPopupWindow)", () => {
	let viewIdentity: Awaited<ReturnType<typeof OpenFinView.create>>;
	let viewHandle: string;

	beforeAll(async () => {
		viewIdentity = await OpenFinView.create({ url: "http://localhost:8080/view1.html", name: "view1" });
		expect(viewIdentity).toBeDefined();
		expect(await WebDriver.waitForElementById("greeting", 10000)).toBeDefined();

		const handles = await WebDriver.getWindowHandles();
		expect(handles.length).toBeGreaterThan(0);
		const current = await WebDriver.getWindow();
		assert(current);
		viewHandle = current.handle;
	});

	afterAll(async () => {
		if (viewIdentity) {
			await OpenFinView.close(viewIdentity);
		}
	});

	it("switches into a right-click popup, reads it, and interacts with it", async () => {
		await WebDriver.switchToWindow("handle", viewHandle);

		const popupHandle = await openContextMenuPopup();
		assert(popupHandle);

		expect(await WebDriver.switchToWindow("handle", popupHandle)).toBe(true);

		const heading = await WebDriver.waitForElementById("popup-heading", 10000);
		assert(heading);
		expect(await heading.getText()).toBe("Popup Menu");

		const action = await WebDriver.findElementById("popup-action");
		assert(action);
		await action.click();

		// Clicking dispatched a result back to the window that opened the popup.
		expect(await WebDriver.switchToWindow("handle", viewHandle)).toBe(true);
		const result = await WebDriver.waitForObjectExisting<{ data?: { choice?: string } }>(
			"globalThis.popupState.result",
			10000
		);
		expect(result?.data?.choice).toBe("row-action");
	});

	it("never reports a switch that did not happen", async () => {
		await WebDriver.switchToWindow("handle", viewHandle);

		const popupHandle = await openContextMenuPopup();
		assert(popupHandle);

		// The hazard this suite exists for: a full enumeration activates every
		// window in turn, and a popup with the default blurBehavior does not
		// survive that.
		await WebDriver.getWindows();

		const returned = await WebDriver.switchToWindow("handle", popupHandle);
		const heading = await WebDriver.findElementById("popup-heading");

		// Whichever way it went, the return value has to match reality: a `true`
		// means the popup's DOM is reachable from here.
		expect(returned).toBe(heading !== undefined);
	});
});

/**
 * Right-click the fixture's table row to open its context-menu popup, then
 * find the popup by diffing the raw handle list.
 * @returns The popup's window handle.
 */
async function openContextMenuPopup(): Promise<string | undefined> {
	const before = await WebDriver.getWindowHandles();
	// An empty list means the call failed, not that there are no windows.
	// Diffing against it would make every window look like the popup.
	expect(before.length).toBeGreaterThan(0);

	const row = await WebDriver.findElementById("demo-row-1");
	assert(row);
	await WebDriver.actions([
		{ type: "mouseMove", origin: row },
		{ type: "mouseClick", button: MouseButton.Right }
	]);

	const start = Date.now();
	while (Date.now() - start < 10000) {
		const handles = await WebDriver.getWindowHandles();
		const added = handles.filter((handle) => !before.includes(handle));
		if (added.length > 0) {
			return added[0];
		}
		await WebDriver.sleep(200);
	}
}
