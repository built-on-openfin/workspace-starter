import type { LocatorTypes } from "./locatorTypes";

/**
 * Web driver element interface.
 */
export interface IWebDriverElement {
    /**
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    findElement(locator: LocatorTypes, value: string): Promise<IWebDriverElement | undefined>;

    /**
     * Find elements.
     * @param locator The locator to use when finding the elements.
     * @param value The value to use with the locator.
     * @returns The elements if found.
     */
    findElements(locator: LocatorTypes, value: string): Promise<IWebDriverElement[]>;

    /**
     * Send a click to an item.
     * @returns Nothing.
     */
    click(): Promise<void>;

    /**
     * Send keys to an element.
     * @param keys The keys to send to the element.
     * @returns Nothing.
     */
    sendKeys(keys: string): Promise<void>;

    /**
     * Get an attribute for an element.
     * @param attribute The attribute to get.
     * @returns The attribute.
     */
    getAttribute(attribute: string): Promise<string>;
}
