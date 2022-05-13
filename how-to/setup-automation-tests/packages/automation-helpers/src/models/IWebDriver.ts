import type { IWebDriverElement } from "./IWebDriverElement";
import type { LocatorTypes } from "./locatorTypes";

/**
 * Web driver interface.
 */
export interface IWebDriver {
    /**
     * Start a new session on the driver.
     * @param devToolsPort The devtool port.
     * @param chromeDriverPort The chromedriver port.
     * @param logLevel The level of logging.
     * @returns Nothing.
     */
    startSession(devToolsPort: number, chromeDriverPort: number, logLevel: "debug" | "silent"): Promise<void>;

    /**
     * End a session on the driver.
     * @returns Nothing.
     */
    endSession(): Promise<void>;

    /**
     * Execute JavaScript in the window.
     * @param script The script to execute.
     * @param args Arguments to pass to the async script.
     * @returns The response from the execute.
     */
    executeAsyncScript<T>(script: string, args: (string | object | number | boolean | undefined)[]): Promise<T>;

    /**
     * Get the title of the current window.
     * @returns The window title.
     */
    getTitle(): Promise<string>;

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    getUrl(): Promise<string>;

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    switchToWindow(title: string): Promise<boolean>;

    /**
     * Switch to a window by its URL.
     * @param url The window url to switch to.
     * @returns True if the window was available.
     */
    switchToWindowByUrl(url: string): Promise<boolean>;

    /**
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    findElement(locator: LocatorTypes, value: string): Promise<IWebDriverElement>;

    /**
     * Find elements.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @returns The elements if found.
     */
    findElements(locator: LocatorTypes, value: string): Promise<IWebDriverElement[]>;
}
