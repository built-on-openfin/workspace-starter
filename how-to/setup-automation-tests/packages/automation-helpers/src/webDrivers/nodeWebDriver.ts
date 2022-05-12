import type { Client } from "webdriver";
import type { IWebDriver } from "../models/IWebDriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";
import { NodeWebDriverElement } from "./nodeWebDriverElement";

/**
 * Webdriver for the Node environment.
 */
export class NodeWebDriver implements IWebDriver {
    /**
     * The node web driver to make the chromedriver calls with.
     */
    private readonly _client: Client;

    /**
     * Create a new instance of NodeWebDriver.
     * @param client The client to use for chromedriver calls.
     */
    constructor(client: Client) {
        this._client = client;
        globalThis.nodeWebDriver = client;
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
        return this._client.executeAsyncScript(script, args) as Promise<T>;
    }

    /**
     * Get the title of the current window.
     * @returns The window title.
     */
    public async getTitle(): Promise<string> {
        return this._client.getTitle();
    }

    /**
     * Get the URL of the current window.
     * @returns The window title.
     */
    public async getUrl(): Promise<string> {
        return this._client.getUrl();
    }

    /**
     * Switch to a window by its title.
     * @param title The window title to switch to.
     * @returns True if the window was available.
     */
    public async switchToWindow(title: string): Promise<boolean> {
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
     * Find an element by its xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public async findElementByPath(path: string): Promise<IWebDriverElement> {
        const ref = await this._client.findElement("xpath", path);
        return new NodeWebDriverElement(this._client, ref);
    }

    /**
     * Find elements by their xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    public async findElementsByPath(path: string): Promise<IWebDriverElement[]> {
        const refs = await this._client.findElements("xpath", path);
        return refs.map(ref => new NodeWebDriverElement(this._client, ref));
    }
}
