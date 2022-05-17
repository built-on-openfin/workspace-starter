import WebDriver, { type Client } from "webdriver";
import type { IWebDriver } from "../models/IWebDriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";
import type { LocatorTypes } from "../models/locatorTypes";
import { NodeWebDriverElement } from "./nodeWebDriverElement";

/**
 * NodeWebDriver for the Node environment.
 */
export class NodeWebDriver implements IWebDriver {
    /**
     * The node web driver to make the chromedriver calls with.
     */
    private _client?: Client;

    /**
     * Create a new instance of NodeWebDriver.
     * @param client The client to use for chromedriver calls if already created.
     */
    constructor(client?: Client) {
        if (client) {
            this._client = client;
            globalThis.nodeWebDriver = client;
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
        if (!this._client) {
            this._client = await WebDriver.newSession({
                capabilities: {
                    browserName: "chrome",
                    "goog:chromeOptions": {
                        debuggerAddress: `localhost:${devToolsPort}`
                    }
                },
                port: chromeDriverPort,
                logLevel
            });

            globalThis.nodeWebDriver = this._client;
        }
    }

    /**
     * End a session on the driver.
     * @returns Nothing.
     */
    public async endSession(): Promise<void> {
        if (!this._client) {
            throw new Error("No session started");
        }
        await this._client.deleteSession();
        this._client = undefined;
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
        if (!this._client) {
            throw new Error("No session started");
        }
        return this._client.executeAsyncScript(script, args) as Promise<T>;
    }

    /**
     * Get the title of the current window.
     * @returns The window title.
     */
    public async getTitle(): Promise<string> {
        if (!this._client) {
            throw new Error("No session started");
        }
        return this._client.getTitle();
    }

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    public async getUrl(): Promise<string> {
        if (!this._client) {
            throw new Error("No session started");
        }
        return this._client.getUrl();
    }

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    public async switchToWindow(title: string): Promise<boolean> {
        if (!this._client) {
            throw new Error("No session started");
        }

        // If the current window is already the correct one just return.
        const winTitle = await this._client.getTitle();
        if (winTitle === title) {
            return true;
        }

        // Otherwise switch to each window in turn and see if the title matches.
        const currentWindow = await this._client.getWindowHandle();

        const windowHandles = await this._client.getWindowHandles();

        for (const windowHandle of windowHandles) {
            await this._client.switchToWindow(windowHandle);
            const winTitle = await this._client.getTitle();
            if (winTitle === title) {
                return true;
            }
        }

        // No window was found so switch back to the original one.
        await this._client.switchToWindow(currentWindow);
        return false;
    }

    /**
     * Switch to a window by its URL.
     * @param url The window url to switch to.
     * @returns True if the window was available.
     */
    public async switchToWindowByUrl(url: string): Promise<boolean> {
        if (!this._client) {
            throw new Error("No session started");
        }

        // If the current window is already the correct one just return.
        const winUrl = await this._client.getUrl();
        if (winUrl === url) {
            return true;
        }

        // Otherwise switch to each window in turn and see if the title matches.
        const currentWindow = await this._client.getWindowHandle();
        const windowHandles = await this._client.getWindowHandles();

        for (const windowHandle of windowHandles) {
            await this._client.switchToWindow(windowHandle);
            const winUrl = await this._client.getUrl();
            if (winUrl === url) {
                return true;
            }
        }

        // No window was found so switch back to the original one.
        await this._client.switchToWindow(currentWindow);
        return false;
    }

    /**
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    public async findElement(locator: LocatorTypes, value: string): Promise<IWebDriverElement | undefined> {
        if (!this._client) {
            throw new Error("No session started");
        }
        const ref = await this._client.findElement(locator, value);
        const elementId = NodeWebDriverElement.elementIdFromReference(ref);

        if (elementId) {
            return new NodeWebDriverElement(this._client, elementId);
        }
    }

    /**
     * Find elements.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @returns The elements if found.
     */
    public async findElements(locator: LocatorTypes, value: string): Promise<IWebDriverElement[]> {
        if (!this._client) {
            throw new Error("No session started");
        }
        const refs = await this._client.findElements(locator, value);

        const elementIds: string[] = refs
            .map(ref => NodeWebDriverElement.elementIdFromReference(ref))
            .filter(Boolean) as string[];

        return elementIds.map(elementId => new NodeWebDriverElement(this._client as Client, elementId));
    }
}
