import type { IWebDriverElement } from "../models/IWebDriverElement";

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
        for (let i = 0; i < arguments.length - 2; i++) {
            args[i] = arguments[i];
        }
        callback(${callAsync ? "await " : ""}${method}(...args))
        `;
        return globalThis.webDriver.executeAsyncScript(script, params ?? []);
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
        let found = false;
        do {
            found = await globalThis.webDriver.executeAsyncScript(script, [objectPath]);
            if (!found) {
                await WebDriver.sleep(1000);
            }
        } while (!found && start - Date.now() < timeoutMs);

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
    public static async waitForWindow(title: string, timeoutMs: number): Promise<boolean> {
        const startTime = Date.now();

        let found = false;
        do {
            found = await this.switchToWindow(title);
            if (!found) {
                await WebDriver.sleep(1000);
            }
        } while (!found && Date.now() - startTime < timeoutMs);

        return found;
    }

    /**
     * Wait for a window by its URL.
     * @param url The window URL to wait for to.
     * @param timeoutMs The maximum amount of time to wait in seconds.
     * @returns True if the window was found.
     */
    public static async waitForWindowByUrl(url: string, timeoutMs: number): Promise<boolean> {
        const startTime = Date.now();

        let found = false;
        do {
            found = await this.switchToWindowByUrl(url);
            if (!found) {
                await WebDriver.sleep(1000);
            }
        } while (!found && Date.now() - startTime < timeoutMs);

        return found;
    }

    /**
     * Close the current window.
     * @returns Nothing.
     */
    public static async closeWindow(): Promise<void> {
        return globalThis.webDriver.executeAsyncScript("fin.desktop.Application.getCurrent().close()", []);
    }

    /**
     * Find an element by its xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public static async findElementByPath(path: string): Promise<IWebDriverElement> {
        return globalThis.webDriver.findElementByPath(path);
    }

    /**
     * Find elements by their xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public static async findElementsByPath(path: string): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElementsByPath(path);
    }

    /**
     * Find an element by its id.
     * @param id The id of the element to find.
     * @returns The element if found.
     */
    public static async findElementById(id: string): Promise<IWebDriverElement> {
        return globalThis.webDriver.findElementByPath(`//*[@id='${id}']`);
    }

    /**
     * Find an element by its tag.
     * @param tag The tag of the element to find.
     * @returns The element if found.
     */
    public static async findElementByTag(tag: string): Promise<IWebDriverElement> {
        return globalThis.webDriver.findElementByPath(`//${tag}`);
    }

    /**
     * Find all elements by their tag.
     * @param tag The tag of the element to find.
     * @returns The elements if found.
     */
    public static async findElementsByTag(tag: string): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElementsByPath(`//${tag}`);
    }

    /**
     * Find an element by its class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementByClass(className: string, tag: string = "*"): Promise<IWebDriverElement> {
        return globalThis.webDriver.findElementByPath(`//${tag}[contains(@class,"${className}")]`);
    }

    /**
     * Find all elements by their class.
     * @param className The class of the element to find.
     * @param tag The tag of the element to find defaults to all.
     * @returns The element if found.
     */
    public static async findElementsByClass(className: string, tag: string = "*"): Promise<IWebDriverElement[]> {
        return globalThis.webDriver.findElementsByPath(`//${tag}[contains(@class,"${className}")]`);
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
