/**
 * Web driver element interface.
 */
export interface IWebDriverElement {
    /**
     * Find an element by its xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    findElementByPath(path: string): Promise<IWebDriverElement>;

    /**
     * Find elements by their xpath.
     * @param path The path the element to find.
     * @returns The element if found.
     */
    findElementsByPath(path: string): Promise<IWebDriverElement[]>;

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
