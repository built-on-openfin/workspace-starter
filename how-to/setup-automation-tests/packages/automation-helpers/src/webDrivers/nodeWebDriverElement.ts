import type { Client } from "webdriver";
import type { ElementReference } from "../models/elementReference";
import type { IWebDriverElement } from "../models/IWebDriverElement";

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
    private readonly _reference: ElementReference;

    /**
     * Create a new instance of NodeWebDriverElement.
     * @param client The client to use for chromedriver calls.
     * @param reference The reference to the element.
     */
    constructor(client: Client, reference: ElementReference) {
        this._client = client;
        this._reference = reference;
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

    /**
     * Send a click to an item.
     * @returns Nothing.
     */
    public async click(): Promise<void> {
        await this._client.elementClick(this.elementIdFromReference(this._reference));
    }

    /**
     * Send keys to an element.
     * @param keys The keys to send to the element.
     * @returns Nothing.
     */
    public async sendKeys(keys: string): Promise<void> {
        await this._client.elementSendKeys(this.elementIdFromReference(this._reference), keys);
    }

    /**
     * Get an attribute for an element.
     * @param attribute The attribute to get.
     * @returns The attribute.
     */
    public async getAttribute(attribute: string): Promise<string> {
        return this._client.getElementAttribute(this.elementIdFromReference(this._reference), attribute);
    }

    /**
     * Get an element id from an element reference.
     * @param elementReference The element reference to get the element id from.
     * @returns The element id.
     */
    public elementIdFromReference(elementReference: ElementReference): string {
        return elementReference["element-6066-11e4-a52e-4f735466cecf"];
    }
}
