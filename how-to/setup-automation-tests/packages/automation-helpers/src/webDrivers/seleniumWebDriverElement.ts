import { By, type WebElement, type ThenableWebDriver } from "selenium-webdriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";

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
