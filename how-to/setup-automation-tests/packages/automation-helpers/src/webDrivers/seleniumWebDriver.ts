import { By, type ThenableWebDriver } from "selenium-webdriver";
import type { IWebDriver } from "../models/IWebDriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";
import { SeleniumWebDriverElement } from "./seleniumWebDriverElement";

/**
 * Webdriver for the Selenium environment.
 */
export class SeleniumWebDriver implements IWebDriver {
    /**
     * The selenium web driver to make the chromedriver calls with.
     */
    private readonly _webDriver: ThenableWebDriver;

    /**
     * Create a new instance of SeleniumWebDriver.
     * @param webDriver The web driver to use for chromedriver calls.
     */
    constructor(webDriver: ThenableWebDriver) {
        this._webDriver = webDriver;
        globalThis.seleniumWebDriver = webDriver;
    }

    /**
     * Execute JavaScript in the window.
     * @param script The script to execute.
     * @param args Arguments to pass to the async script.
     * @returns The response from the execute.
     */
    public async executeAsyncScript<T>(
        script: string,
        args: (string | object | number | boolean | undefined)[]
    ): Promise<T> {
        return this._webDriver.executeAsyncScript(script, ...args);
    }

    /**
     * Get the title of the current window.
     * @returns The window title.
     */
    public async getTitle(): Promise<string> {
        return this._webDriver.getTitle();
    }

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    public async getUrl(): Promise<string> {
        return this._webDriver.getCurrentUrl();
    }

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    public async switchToWindow(title: string): Promise<boolean> {
        // If the current window is already the correct one just return.
        const winTitle = await this._webDriver.getTitle();
        if (winTitle === title) {
            return true;
        }

        // Otherwise switch to each window in turn and see if the title matches.
        const currentWindow = await this._webDriver.getWindowHandle();

        const windowHandles = await this._webDriver.getAllWindowHandles();

        for (const windowHandle of windowHandles) {
            await this._webDriver.switchTo().window(windowHandle);
            const winTitle = await this._webDriver.getTitle();
            if (winTitle === title) {
                return true;
            }
        }

        // No window was found so switch back to the original one.
        await this._webDriver.switchTo().window(currentWindow);
        return false;
    }

    /**
     * Switch to a window by its URL.
     * @param url The window url to switch to.
     * @returns True if the window was available.
     */
    public async switchToWindowByUrl(url: string): Promise<boolean> {
        // If the current window is already the correct one just return.
        const winUrl = await this._webDriver.getCurrentUrl();
        if (winUrl === url) {
            return true;
        }

        // Otherwise switch to each window in turn and see if the title matches.
        const currentWindow = await this._webDriver.getWindowHandle();
        const windowHandles = await this._webDriver.getAllWindowHandles();

        for (const windowHandle of windowHandles) {
            await this._webDriver.switchTo().window(windowHandle);
            const winUrl = await this._webDriver.getCurrentUrl();
            if (winUrl === url) {
                return true;
            }
        }

        // No window was found so switch back to the original one.
        await this._webDriver.switchTo().window(currentWindow);
        return false;
    }

    /**
     * Find an element by its xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public async findElementByPath(path: string): Promise<IWebDriverElement> {
        const element = await this._webDriver.findElement(By.xpath(path));
        return new SeleniumWebDriverElement(this._webDriver, element);
    }

    /**
     * Find elements by their xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public async findElementsByPath(path: string): Promise<IWebDriverElement[]> {
        const elements = await this._webDriver.findElements(By.xpath(path));
        return elements.map(ref => new SeleniumWebDriverElement(this._webDriver, ref));
    }
}
