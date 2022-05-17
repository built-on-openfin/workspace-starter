import type { IWebDriverElement } from "../models/IWebDriverElement";
import type { LocatorTypes } from "../models/locatorTypes";

/**
 * Global webdriver wrapper with non driver specific code.
 */
export class WebDriver {
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
        for (let i = 0; i < arguments.length - 1; i++) {
            args[i] = arguments[i];
        }
        callback(${callAsync ? "await " : ""}${method}(...args))
        `;
        return globalThis.webDriver.executeAsyncScript(script, params ?? []);
    }

    /**
     * Call a JavaScript method until a condition is met, or timed out.
     * @param method The method to call on the OpenFin object.
     * @param params Parameters to call the object with.
     * @param callAsync Call the method as async.
     * @param condition Condition to test before returning.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The result from the call.
     */
    public static async callMethodUntilCondition<T>(
        method: string,
        params: (string | object | number | boolean | undefined)[] | undefined,
        callAsync: boolean,
        condition: (result: T | Error) => boolean,
        timeoutMs: number
    ): Promise<T | Error | unknown> {
        const start = Date.now();
        let lastResult: T | Error;
        do {
            try {
                lastResult = await WebDriver.callMethod<T>(method, params, callAsync);
            } catch (err) {
                lastResult = err as Error;
            }
            const matchesCondition = condition(lastResult);
            if (matchesCondition) {
                return lastResult;
            }

            await WebDriver.sleep(1000);
        } while (start - Date.now() < timeoutMs);
        return lastResult;
    }

    /**
     * Wait for an object to exist in the windows namespace.
     * @param objectPath The name of the object to wait for.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The true if the object exists.
     */
    public static async waitForObjectExisting(objectPath: string, timeoutMs: number): Promise<boolean> {
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
        do {
            const found = await globalThis.webDriver.executeAsyncScript(script, [objectPath]);
            if (found) {
                return true;
            }
            await WebDriver.sleep(1000);
        } while (start - Date.now() < timeoutMs);

        return false;
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
        return globalThis.webDriver.getTitle();
    }

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    public static async getUrl(): Promise<string> {
        return globalThis.webDriver.getUrl();
    }

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    public static async switchToWindow(title: string): Promise<boolean> {
        return globalThis.webDriver.switchToWindow(title);
    }

    /**
     * Switch to a window by its URL.
     * @param url The window url to switch to.
     * @returns True if the window was available.
     */
    public static async switchToWindowByUrl(url: string): Promise<boolean> {
        return globalThis.webDriver.switchToWindowByUrl(url);
    }

    /**
     * Wait for a window by its title.
     * @param title The window title to wait for to.
     * @param timeoutMs The maximum amount of time to wait in seconds.
     * @returns True if the window was found.
     */
    public static async waitForWindowByTitle(title: string, timeoutMs: number): Promise<boolean> {
        const startTime = Date.now();

        do {
            const found = await this.switchToWindow(title);
            if (found) {
                return true;
            }
            await WebDriver.sleep(1000);
        } while (Date.now() - startTime < timeoutMs);

        return false;
    }

    /**
     * Wait for a window by its URL.
     * @param url The window URL to wait for to.
     * @param timeoutMs The maximum amount of time to wait in seconds.
     * @returns True if the window was found.
     */
    public static async waitForWindowByUrl(url: string, timeoutMs: number): Promise<boolean> {
        const startTime = Date.now();

        do {
            const found = await this.switchToWindowByUrl(url);
            if (found) {
                return true;
            }
            await WebDriver.sleep(1000);
        } while (Date.now() - startTime < timeoutMs);

        return false;
    }

    /**
     * Close the current window.
     * @returns Nothing.
     */
    public static async closeWindow(): Promise<void> {
        return globalThis.webDriver.executeAsyncScript("fin.desktop.Application.getCurrent().close", []);
    }

    /**
     * Find an element by its xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public static async findElementByPath(path: string): Promise<IWebDriverElement | undefined> {
        return globalThis.webDriver.findElement("xpath", path);
    }

    /**
     * Wait for an element by its xpath.
     * @param path The path the element to find.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The element if found or undefined if not found within timeout.
     */
    public static async waitForElementByPath(path: string, timeoutMs: number): Promise<IWebDriverElement | undefined> {
        return WebDriver.waitForElementByLocator("xpath", path, timeoutMs);
    }

    /**
     * Find elements by their xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public static async findElementsByPath(path: string): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElements("xpath", path);
    }

    /**
     * Find an element by its tag.
     * @param tag The tag of the element to find.
     * @returns The element if found.
     */
    public static async findElementByTag(tag: string): Promise<IWebDriverElement | undefined> {
        return globalThis.webDriver.findElement("tag name", tag);
    }

    /**
     * Find all elements by their tag.
     * @param tag The tag of the element to find.
     * @returns The elements if found.
     */
    public static async findElementsByTag(tag: string): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElements("tag name", tag);
    }

    /**
     * Wait for an element by its tag.
     * @param tag The tag of the element to find.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The element if found or undefined if not found within timeout.
     */
    public static async waitForElementByTag(tag: string, timeoutMs: number): Promise<IWebDriverElement | undefined> {
        return WebDriver.waitForElementByLocator("tag name", tag, timeoutMs);
    }

    /**
     * Find an element by css selector.
     * @param cssSelector The css selector of the element to find.
     * @returns The element if found.
     */
    public static async findElementByCssSelector(cssSelector: string): Promise<IWebDriverElement | undefined> {
        return globalThis.webDriver.findElement("css selector", cssSelector);
    }

    /**
     * Find all elements by their css selector.
     * @param cssSelector The css selector of the element to find.
     * @returns The element if found.
     */
    public static async findElementsCssSelector(cssSelector: string): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElements("css selector", cssSelector);
    }

    /**
     * Wait for an element by its css selector.
     * @param cssSelector The css selector of the element to find.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The element if found or undefined if not found within timeout.
     */
    public static async waitForElementByCssSelector(
        cssSelector: string,
        timeoutMs: number
    ): Promise<IWebDriverElement | undefined> {
        return WebDriver.waitForElementByLocator("css selector", cssSelector, timeoutMs);
    }

    /**
     * Find an element by its id.
     * @param id The id of the element to find.
     * @returns The element if found.
     */
    public static async findElementById(id: string): Promise<IWebDriverElement | undefined> {
        return globalThis.webDriver.findElement("xpath", `//*[@id='${id}']`);
    }

    /**
     * Wait for an element by its id.
     * @param id The id of the element to find.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The element if found or undefined if not found within timeout.
     */
    public static async waitForElementById(id: string, timeoutMs: number): Promise<IWebDriverElement | undefined> {
        return WebDriver.waitForElementByLocator("xpath", `//*[@id='${id}']`, timeoutMs);
    }

    /**
     * Find an element by its class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementByClass(
        className: string,
        tag: string = "*"
    ): Promise<IWebDriverElement | undefined> {
        return globalThis.webDriver.findElement("xpath", `//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Find all elements by their class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementsByClass(className: string, tag: string = "*"): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElements("xpath", `//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Wait for an element by its class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The element if found or undefined if not found within timeout.
     */
    public static async waitForElementByClass(
        className: string,
        tag: string = "*",
        timeoutMs: number = 10000
    ): Promise<IWebDriverElement | undefined> {
        return WebDriver.waitForElementByLocator("xpath", `//${tag}[contains(@class,"${className}")]`, timeoutMs);
    }

    /**
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    public static async findElementByLocator(
        locator: LocatorTypes,
        value: string
    ): Promise<IWebDriverElement | undefined> {
        return globalThis.webDriver.findElement(locator, value);
    }

    /**
     * Find elements.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @returns The elements if found.
     */
    public static async findElementsByLocator(locator: LocatorTypes, value: string): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElements(locator, value);
    }

    /**
     * Wait for an element by its locator.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @param timeoutMs The amount of time to wait for the object.
     * @returns The element if found or undefined if not found within timeout.
     */
    public static async waitForElementByLocator(
        locator: LocatorTypes,
        value: string,
        timeoutMs: number
    ): Promise<IWebDriverElement | undefined> {
        const start = Date.now();
        do {
            const elem = await globalThis.webDriver.findElement(locator, value);
            if (elem) {
                return elem;
            }
            await WebDriver.sleep(1000);
        } while (start - Date.now() < timeoutMs);
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
        return globalThis.webDriver.executeAsyncScript<boolean>(script, [
            path,
            attribute,
            value as unknown as string | object | number | boolean | undefined
        ]);
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
        return globalThis.webDriver.executeAsyncScript<T>(script, [path, attribute]);
    }
}
