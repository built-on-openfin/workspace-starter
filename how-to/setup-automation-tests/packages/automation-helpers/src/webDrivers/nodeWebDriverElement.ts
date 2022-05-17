import type { Client } from "webdriver";
import type { IWebDriverElement } from "../models/IWebDriverElement";
import type { LocatorTypes } from "../models/locatorTypes";

/**
 * Webdriver element for the Node environment.
 */
export class NodeWebDriverElement implements IWebDriverElement {
    /**
     * The node web driver to make the chromedriver calls with.
     */
    private readonly _client: Client;

    /**
     * The reference for the element.
     */
    private readonly _elementId: string;

    /**
     * Create a new instance of NodeWebDriverElement.
     * @param client The client to use for chromedriver calls.
     * @param elementId The reference to the element.
     */
    constructor(client: Client, elementId: string) {
        this._client = client;
        this._elementId = elementId;
    }

    /**
     * Get an element id from an element reference.
     * @param elementReference The element reference to get the element id from.
     * @returns The element id.
     */
    public static elementIdFromReference(
        elementReference: Record<"element-6066-11e4-a52e-4f735466cecf", string | undefined>
    ): string | undefined {
        return elementReference["element-6066-11e4-a52e-4f735466cecf"];
    }

    /**
     * Find an element.
     * @param locator The locator to use when finding the element.
     * @param value The value to use with the locator.
     * @returns The element if found.
     */
    public async findElement(locator: LocatorTypes, value: string): Promise<IWebDriverElement | undefined> {
        const ref = await this._client.findElementFromElement(this._elementId, locator, value);

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
        const refs = await this._client.findElementsFromElement(this._elementId, locator, value);

        const elementIds: string[] = refs
            .map(ref => NodeWebDriverElement.elementIdFromReference(ref))
            .filter(Boolean) as string[];

        return elementIds.map(elementId => new NodeWebDriverElement(this._client, elementId));
    }

    /**
     * Send a click to an item.
     * @returns Nothing.
     */
    public async click(): Promise<void> {
        await this._client.elementClick(this._elementId);
    }

    /**
     * Send keys to an element.
     * @param keys The keys to send to the element.
     * @returns Nothing.
     */
    public async sendKeys(keys: string): Promise<void> {
        await this._client.elementSendKeys(this._elementId, keys);
    }

    /**
     * Get an attribute for an element.
     * @param attribute The attribute to get.
     * @returns The attribute.
     */
    public async getAttribute(attribute: string): Promise<string> {
        return this._client.getElementAttribute(this._elementId, attribute);
    }
}
