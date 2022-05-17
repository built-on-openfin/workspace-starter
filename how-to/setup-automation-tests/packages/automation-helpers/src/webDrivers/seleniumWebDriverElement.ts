import type { ThenableWebDriver, WebElement } from "selenium-webdriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";
import type { LocatorTypes } from "../models/locatorTypes";

/**
 * Webdriver element for the Selenium environment.
 */
export class SeleniumWebDriverElement implements IWebDriverElement {
    /**
     * The selenium web driver to make the chromedriver calls with.
     */
    private readonly _webDriver: ThenableWebDriver;

    /**
     * The reference for the element.
     */
    private readonly _webElement: WebElement;

    /**
     * Create a new instance of SeleniumWebDriverElement.
     * @param webDriver The web driver to use for chromedriver calls.
     * @param webElement The reference to the element.
     */
    constructor(webDriver: ThenableWebDriver, webElement: WebElement) {
        this._webDriver = webDriver;
        this._webElement = webElement;
    }

    /**
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    public async findElement(locator: LocatorTypes, value: string): Promise<IWebDriverElement | undefined> {
        try {
            const element = await this._webElement.findElement({
                using: locator,
                value
            });
            return new SeleniumWebDriverElement(this._webDriver, element);
        } catch (err) {
            if (err instanceof Error && err.name === "NoSuchElementError") {
                return undefined;
            }
            throw err;
        }
    }

    /**
     * Find elements.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @returns The elements if found.
     */
    public async findElements(locator: LocatorTypes, value: string): Promise<IWebDriverElement[]> {
        const elements = await this._webElement.findElements({
            using: locator,
            value
        });
        return elements.map(ref => new SeleniumWebDriverElement(this._webDriver, ref));
    }

    /**
     * Send a click to an item.
     * @returns Nothing.
     */
    public async click(): Promise<void> {
        await this._webElement.click();
    }

    /**
     * Send keys to an element.
     * @param keys The keys to send to the element.
     * @returns Nothing.
     */
    public async sendKeys(keys: string): Promise<void> {
        await this._webElement.sendKeys(keys);
    }

    /**
     * Get an attribute for an element.
     * @param attribute The attribute to get.
     * @returns The attribute.
     */
    public async getAttribute(attribute: string): Promise<string> {
        return this._webElement.getAttribute(attribute);
    }
}
