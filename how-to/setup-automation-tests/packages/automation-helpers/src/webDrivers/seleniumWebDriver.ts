import { Builder, type ThenableWebDriver } from "selenium-webdriver";
import type { IWebDriver } from "../models/IWebDriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";
import type { LocatorTypes } from "../models/locatorTypes";
import { SeleniumWebDriverElement } from "./seleniumWebDriverElement";

/**
 * Webdriver for the Selenium environment.
 */
export class SeleniumWebDriver implements IWebDriver {
    /**
     * The selenium web driver to make the chromedriver calls with.
     */
    private _webDriver?: ThenableWebDriver;

    /**
     * Create a new instance of SeleniumWebDriver.
     * @param webDriver The web driver to use for chromedriver calls if already started.
     */
    constructor(webDriver?: ThenableWebDriver) {
        if (webDriver) {
            this._webDriver = webDriver;
            globalThis.seleniumWebDriver = webDriver;
        }
    }

    /**
     * Start a new session on the driver.
     * @param devToolsPort The devtool port.
     * @param chromeDriverPort The chromedriver port.
     * @param logLevel The level of logging.
     * @returns Nothing.
     */
    public async startSession(
        devToolsPort: number,
        chromeDriverPort: number,
        logLevel: "debug" | "silent"
    ): Promise<void> {
        if (!this._webDriver) {
            this._webDriver = new Builder()
                .usingServer(`http://localhost:${chromeDriverPort}`)
                .withCapabilities({
                    "goog:chromeOptions": {
                        debuggerAddress: `localhost:${devToolsPort}`
                    }
                })
                .forBrowser("chrome")
                .build();

            globalThis.seleniumWebDriver = this._webDriver;
        }
    }

    /**
     * End a session on the driver.
     * @returns Nothing.
     */
    public async endSession(): Promise<void> {
        if (!this._webDriver) {
            throw new Error("No session started");
        }
        await this._webDriver.quit();
        this._webDriver = undefined;
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
        if (!this._webDriver) {
            throw new Error("No session started");
        }
        return this._webDriver.executeAsyncScript(script, ...args);
    }

    /**
     * Get the title of the current window.
     * @returns The window title.
     */
    public async getTitle(): Promise<string> {
        if (!this._webDriver) {
            throw new Error("No session started");
        }
        return this._webDriver.getTitle();
    }

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    public async getUrl(): Promise<string> {
        if (!this._webDriver) {
            throw new Error("No session started");
        }
        return this._webDriver.getCurrentUrl();
    }

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    public async switchToWindow(title: string): Promise<boolean> {
        if (!this._webDriver) {
            throw new Error("No session started");
        }
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
        if (!this._webDriver) {
            throw new Error("No session started");
        }
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
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    public async findElement(locator: LocatorTypes, value: string): Promise<IWebDriverElement> {
        if (!this._webDriver) {
            throw new Error("No session started");
        }
        const element = await this._webDriver.findElement({
            using: locator,
            value
        });
        return new SeleniumWebDriverElement(this._webDriver, element);
    }

    /**
     * Find elements.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @returns The elements if found.
     */
    public async findElements(locator: LocatorTypes, value: string): Promise<IWebDriverElement[]> {
        if (!this._webDriver) {
            throw new Error("No session started");
        }
        const elements = await this._webDriver.findElements({
            using: locator,
            value
        });
        return elements.map(ref => new SeleniumWebDriverElement(this._webDriver as ThenableWebDriver, ref));
    }
}
