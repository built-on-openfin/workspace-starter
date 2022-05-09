import type { Client } from "webdriver";
import "../globals";
import type { ElementReference } from "../shapes";

/**
 * Helper class for using with WebDriver.
 */
export class WebDriver {
    /**
     * Get the raw webdriver.
     * @returns The raw webdriver.
     */
    public static raw(): Client {
        return globalThis.webdriver;
    }

    /**
     * Call the execute async script for the specified method.
     * @param method The method to call on the OpenFin object.
     * @param params Parameters to call the object with.
     * @param callAsync Call the method as async.
     * @returns The result from the call.
     */
    public static async callMethod<T>(
        method: string,
        params?: (string | object | number | boolean | undefined)[] | undefined,
        callAsync?: boolean
    ): Promise<T> {
        const script = `
        const callback = arguments[arguments.length - 1];
        const args = [];
        for (let i = 0; i < arguments.length - 2; i++) {
            args[i] = arguments[i];
        }
        callback(${callAsync ? "await " : ""}${method}(...args))
        `;
        return webdriver.executeAsyncScript(script, params ?? []) as Promise<T>;
    }

    /**
     * Wait for an object to exist in the windows namespace.
     * @param objectPath The name of the object to wait for.
     * @param timeout The amount of time to wait for the object.
     * @returns The true if the object exists.
     */
    public static async waitForObjectExisting(objectPath: string, timeout: number): Promise<boolean> {
        const script = `
        const callback = arguments[arguments.length - 1];
        const objectPathParts = arguments[0].split(".");
        let obj = globalThis;
        for (let i = 0; i < objectPathParts.length; i++) {
            if (obj[objectPathParts[i]] !== undefined && obj[objectPathParts[i]] !== null) {
                obj = obj[objectPathParts[i]];
                if (i === objectPathParts.length - 1) {
                    callback(true);
                }
            }
        }
        callback(false);
        `;

        const start = Date.now();
        let found = false;
        do {
            found = await webdriver.executeAsyncScript(script, [objectPath]);
            if (!found) {
                await WebDriver.sleep(1000);
            }
        } while (!found && start - Date.now() < timeout * 1000);

        return found;
    }

    /**
     * Sleep for the specified milliseconds.
     * @param ms The milliseconds to sleep for.
     * @returns Nothing.
     */
    public static async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get the title of the current window.
     * @returns The window title.
     */
    public static async getTitle(): Promise<string> {
        return global.webdriver.getTitle();
    }

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    public static async getUrl(): Promise<string> {
        return global.webdriver.getUrl();
    }

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    public static async switchToWindow(title: string): Promise<boolean> {
        // If the current window is already the correct one just return.
        const winTitle = await global.webdriver.getTitle();
        if (winTitle === title) {
            return true;
        }

        // Otherwise switch to each window in turn and see if the title matches.
        const currentWindow = await global.webdriver.getWindowHandle();

        const windowHandles = await global.webdriver.getWindowHandles();

        for (const windowHandle of windowHandles) {
            await global.webdriver.switchToWindow(windowHandle);
            const winTitle = await global.webdriver.getTitle();
            if (winTitle === title) {
                return true;
            }
        }

        // No window was found so switch back to the original one.
        await global.webdriver.switchToWindow(currentWindow);
        return false;
    }

    /**
     * Switch to a window by its URL.
     * @param url The window url to switch to.
     * @returns True if the window was available.
     */
    public static async switchToWindowByUrl(url: string): Promise<boolean> {
        // If the current window is already the correct one just return.
        const winUrl = await global.webdriver.getUrl();
        if (winUrl === url) {
            return true;
        }

        // Otherwise switch to each window in turn and see if the title matches.
        const currentWindow = await global.webdriver.getWindowHandle();

        const windowHandles = await global.webdriver.getWindowHandles();

        for (const windowHandle of windowHandles) {
            await global.webdriver.switchToWindow(windowHandle);
            const winUrl = await global.webdriver.getUrl();
            if (winUrl === url) {
                return true;
            }
        }

        // No window was found so switch back to the original one.
        await global.webdriver.switchToWindow(currentWindow);
        return false;
    }

    /**
     * Wait for a window by its title.
     * @param title The window title to wait for to.
     * @param timeout The maximum amount of time to wait in seconds.
     * @returns True if the window was found.
     */
    public static async waitForWindow(title: string, timeout: number): Promise<boolean> {
        const startTime = Date.now();

        let found = false;
        do {
            found = await WebDriver.switchToWindow(title);
            if (!found) {
                await WebDriver.sleep(1000);
            }
        } while (!found && Date.now() - startTime < timeout * 1000);

        return found;
    }

    /**
     * Wait for a window by its URL.
     * @param url The window URL to wait for to.
     * @param timeout The maximum amount of time to wait in seconds.
     * @returns True if the window was found.
     */
    public static async waitForWindowByUrl(url: string, timeout: number): Promise<boolean> {
        const startTime = Date.now();

        let found = false;
        do {
            found = await WebDriver.switchToWindowByUrl(url);
            if (!found) {
                await WebDriver.sleep(1000);
            }
        } while (!found && Date.now() - startTime < timeout * 1000);

        return found;
    }

    /**
     * Close the current window.
     * @returns Nothing.
     */
    public static async closeWindow(): Promise<void> {
        return webdriver.executeAsyncScript("fin.desktop.Application.getCurrent().close()", []) as Promise<void>;
    }

    /**
     * Find an element by its xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public static async findElementByPath(path: string): Promise<string> {
        const ref = await webdriver.findElement("xpath", path);
        return WebDriver.elementIdFromReference(ref);
    }

    /**
     * Find elements by their xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public static async findElementsByPath(path: string): Promise<string[]> {
        const refs = await webdriver.findElements("xpath", path);
        return refs.map(ref => WebDriver.elementIdFromReference(ref));
    }

    /**
     * Find an element from another element by its xpath.
     * @param elementId The id of the element to start.
     * @param xpath The xpath of the element to find.
     * @returns The element if found.
     */
    public static async findElementFromElementByPath(elementId: string, xpath: string): Promise<string> {
        const ref = await webdriver.findElementFromElement(elementId, "xpath", xpath);
        return WebDriver.elementIdFromReference(ref);
    }

    /**
     * Find elements from another element by their xpath.
     * @param elementId The id of the element to start.
     * @param xpath The xpath of the element to find.
     * @returns The elements if found.
     */
    public static async findElementsFromElementByPath(elementId: string, xpath: string): Promise<string[]> {
        const refs = await webdriver.findElementsFromElement(elementId, "xpath", xpath);
        return refs.map(ref => WebDriver.elementIdFromReference(ref));
    }

    /**
     * Find an element by its id.
     * @param id The id of the element to find.
     * @returns The element if found.
     */
    public static async findElementById(id: string): Promise<string> {
        return WebDriver.findElementByPath(`//*[@id='${id}']`);
    }

    /**
     * Find an element by its tag.
     * @param tag The tag of the element to find.
     * @returns The element if found.
     */
    public static async findElementByTag(tag: string): Promise<string> {
        return WebDriver.findElementByPath(`//${tag}`);
    }

    /**
     * Find all elements by their tag.
     * @param tag The tag of the element to find.
     * @returns The elements if found.
     */
    public static async findElementsByTag(tag: string): Promise<string[]> {
        return WebDriver.findElementsByPath(`//${tag}`);
    }

    /**
     * Find an element from another element by its tag.
     * @param elementId The id of the element to start.
     * @param tag The tag of the element to find.
     * @returns The element if found.
     */
    public static async findElementFromElementByTag(elementId: string, tag: string): Promise<string> {
        return WebDriver.findElementFromElementByPath(elementId, `//${tag}`);
    }

    /**
     * Find all elements from another element by their tag.
     * @param elementId The id of the element to start.
     * @param tag The tag of the element to find.
     * @returns The elements if found.
     */
    public static async findElementsFromElementByTag(elementId: string, tag: string): Promise<string[]> {
        return WebDriver.findElementsFromElementByPath(elementId, `//${tag}`);
    }

    /**
     * Find an element by its class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementByClass(className: string, tag: string = "*"): Promise<string> {
        return WebDriver.findElementByPath(`//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Find all elements by their class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementsByClass(className: string, tag: string = "*"): Promise<string[]> {
        return WebDriver.findElementsByPath(`//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Find an element from another element by its class.
     * @param elementId The id of the element to start.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementFromElementByClass(
        elementId: string,
        className: string,
        tag: string = "*"
    ): Promise<string> {
        return WebDriver.findElementFromElementByPath(elementId, `//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Find all elements from another element by their class.
     * @param elementId The id of the element to start.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The elements if found.
     */
    public static async findElementsFromElementByClass(
        elementId: string,
        className: string,
        tag: string = "*"
    ): Promise<string[]> {
        return WebDriver.findElementsFromElementByPath(elementId, `//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Send a click to an item.
     * @param elementId The id of the element to click.
     * @returns Nothing.
     */
    public static async elementClick(elementId: string): Promise<void> {
        await webdriver.elementClick(elementId);
    }

    /**
     * Send keys to an element.
     * @param elementId The id of the element to send the keys to.
     * @param keys The keys to send to the element.
     * @returns Nothing.
     */
    public static async elementSendKeys(elementId: string, keys: string): Promise<void> {
        await webdriver.elementSendKeys(elementId, keys);
    }

    /**
     * Get an attribute for an element.
     * @param elementId The id of the element to get the element from.
     * @param attribute The attribute to get.
     * @returns The attribute.
     */
    public static async elementGetAttribute(elementId: string, attribute: string): Promise<string> {
        return webdriver.getElementAttribute(elementId, attribute);
    }

    /**
     * Set an element attribute by xpath.
     * @param path The path of the element to set.
     * @param attribute The attribute name to set.
     * @param value The value to set.
     * @returns True id the element exists.
     */
    public static async setElementAttributeByPath<T>(path: string, attribute: string, value: T): Promise<boolean> {
        const script = `
        const callback = arguments[arguments.length - 1];
        const path = arguments[0];
        const attribute = arguments[1];
        const attributeValue = arguments[2];
        const elem = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (elem) {
            elem[attribute] = attributeValue;
            callback(true);
        } else {
            callback(false);
        }
        `;
        return webdriver.executeAsyncScript(script, [
            path,
            attribute,
            value as unknown as string | object | number | boolean | undefined
        ]) as Promise<boolean>;
    }

    /**
     * Get an element attribute by xpath.
     * @param path The path of the element to set.
     * @param attribute The attribute name to set.
     * @returns The value or undefined if the element doesn't exist.
     */
    public static async getElementAttributeByPath<T>(path: string, attribute: string): Promise<T> {
        const script = `
        const callback = arguments[arguments.length - 1];
        const path = arguments[0];
        const attribute = arguments[1];
        const elem = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (elem) {
            callback(elem[attribute]);
        } else {
            callback(undefined);
        }
        `;
        return webdriver.executeAsyncScript(script, [path, attribute]) as Promise<T>;
    }

    /**
     * Get an element id from an element reference.
     * @param elementReference The element reference to get the element id from.
     * @returns The element id.
     */
    public static elementIdFromReference(elementReference: ElementReference): string {
        return elementReference["element-6066-11e4-a52e-4f735466cecf"];
    }
}
