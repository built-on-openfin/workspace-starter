import type { IWebDriverElement } from "../models/IWebDriverElement";
import { WebDriver } from "../webDrivers/webDriver";
import { OpenFinSystem } from "./system";

/**
 * Methods for OpenFin Home object handling.
 */
export class OpenFinHome {
    /**
     * Show the home window.
     * @param timeout The amount of time to wait for the home window to open.
     * @returns True if the window was found and opened.
     */
    public static async show(timeout: number): Promise<boolean> {
        if (
            (await WebDriver.waitForWindowByTitle("OpenFin Home", timeout)) &&
            // The condition and return will be null if the window opened
            // an error string will be returned if the show throws an exception
            // like the home providers not being ready
            (await WebDriver.callMethodUntilCondition<string>(
                "fin.Workspace.Home.show",
                undefined,
                true,
                result => result === null,
                timeout
            )) === null &&
            (await OpenFinSystem.waitForWindow("openfin-home", timeout))
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hide the home window.
     */
    public static async hide(): Promise<void> {
        await WebDriver.callMethod("fin.Workspace.Home.hide", undefined, true);
    }

    /**
     * Perform a search on the home page.
     * @param searchInput The input to search for.
     * @param timeoutMs The timeout to wait for results.
     */
    public static async search(searchInput: string, timeoutMs: number = 10000): Promise<void> {
        for (const letter of searchInput) {
            const searchInputElement = await WebDriver.findElementById("search-input");
            if (!searchInputElement) {
                throw new Error("Element missing search-input");
            }
            await searchInputElement.sendKeys(letter);
        }

        const resultList = await WebDriver.waitForElementById("result-list", timeoutMs);
        if (!resultList) {
            throw new Error("Search results could not be found");
        }
    }

    /**
     * Clear the search on the home page.
     */
    public static async searchClear(): Promise<void> {
        const searchInputElement = await WebDriver.findElementById("search-input");
        if (!searchInputElement) {
            throw new Error("Element missing search-input");
        }
        // Send an escape character to clear the input.
        await searchInputElement.sendKeys("\uE00C");
    }

    /**
     * Select a search result from the home page by index.
     * @param index The index of the item to select.
     * @param operation Optionally perform the operation on the item.
     * @returns The element id of the nth item.
     */
    public static async searchResultByIndex(
        index: number,
        operation?: "open" | "select"
    ): Promise<IWebDriverElement | undefined> {
        const resultListItemElement = await WebDriver.findElementByPath(`//*[@id='result-list']/div[${index + 1}]`);

        if (resultListItemElement) {
            const selectedIndex = await OpenFinHome.searchResultSelectedIndex();

            // Skip the selection if it is already selected, otherwise an open
            // will trigger twice
            if ((operation === "select" || operation === "open") && selectedIndex !== index) {
                await resultListItemElement.click();
            }
            if (operation === "open") {
                // Sending a second click performs the double click operation
                await resultListItemElement.click();
            }
        }

        return resultListItemElement;
    }

    /**
     * Select a search result from the home page by id.
     * @param id The id of the item to select.
     * @param operation Optionally perform the operation on the item.
     * @returns The element id of the item.
     */
    public static async searchResultById(
        id: string,
        operation?: "open" | "select"
    ): Promise<IWebDriverElement | undefined> {
        const resultListItemElement = await WebDriver.findElementByPath(`//*[@id='result-list']/*[@id='${id}']`);

        if (resultListItemElement) {
            const selectedId = await OpenFinHome.searchResultSelectedId();

            // Skip the selection if it is already selected, otherwise an open
            // will trigger twice
            if ((operation === "select" || operation === "open") && selectedId !== id) {
                await resultListItemElement.click();
            }
            if (operation === "open") {
                // Sending a second click performs the double click operation
                await resultListItemElement.click();
            }
        }

        return resultListItemElement;
    }

    /**
     * Get a list of the search results ids.
     * @returns The id of the search results.
     */
    public static async searchResultIds(): Promise<string[]> {
        const elements = await WebDriver.findElementsByPath("//*[@id='result-list']/div");

        const resultIds: string[] = [];

        for (let i = 0; i < elements.length; i++) {
            const idProp = await WebDriver.getElementAttributeByPath<string>(
                `(//*[@id='result-list']/div)[${i + 1}]`,
                "id"
            );
            resultIds.push(idProp);
        }

        return resultIds;
    }

    /**
     * Get the id of the selected search result.
     * @returns The id of the selected search result.
     */
    public static async searchResultSelectedId(): Promise<string> {
        return WebDriver.getElementAttributeByPath<string>("//*[@id='result-list']/div[@aria-selected='true']", "id");
    }

    /**
     * Get the index of the selected search result.
     * @returns The index of the selected search result.
     */
    public static async searchResultSelectedIndex(): Promise<number> {
        const id = await OpenFinHome.searchResultSelectedId();
        const allIds = await OpenFinHome.searchResultIds();
        return allIds.indexOf(id);
    }

    /**
     * Get the details for the selected search result.
     * @returns The innerHTML of the selected search result details.
     */
    public static async searchResultSelectedItem(): Promise<string> {
        return WebDriver.getElementAttributeByPath<string>(
            "//*[@id='result-list']/div[@aria-selected='true']/div",
            "innerHTML"
        );
    }

    /**
     * Get the details for the selected search result.
     * @returns The innerHTML of the selected search result details.
     */
    public static async searchResultSelectedDetails(): Promise<string> {
        return WebDriver.getElementAttributeByPath<string>(
            "//*[@aria-label='Search result details section']/div",
            "innerHTML"
        );
    }

    /**
     * Open the filters selector.
     * @returns Nothing.
     */
    public static async filtersOpen(): Promise<void> {
        const element = await WebDriver.findElementByPath("//button[@shape='square']");
        if (element) {
            await element.click();
        }
    }

    /**
     * Close the filters selector.
     * @param ok Close with ok otherwise cancel.
     * @returns Nothing.
     */
    public static async filtersClose(ok: boolean): Promise<void> {
        const element = await WebDriver.findElementByPath(
            `//div[@id='modal-root']//button[contains(text(), '${ok ? "OK" : "Cancel"}')]`
        );
        if (element) {
            await element.click();
        }
    }

    /**
     * Get the list of filter ids.
     * @returns Filter ids.
     */
    public static async filtersIds(): Promise<string[]> {
        const elements = await WebDriver.findElementsByPath("//div[@id='modal-root']//input[@type='checkbox']");

        const resultIds: string[] = [];

        for (let i = 0; i < elements.length; i++) {
            const idProp = await WebDriver.getElementAttributeByPath<string>(
                `(//div[@id='modal-root']//input[@type='checkbox'])[${i + 1}]`,
                "id"
            );
            resultIds.push(idProp);
        }

        return resultIds;
    }

    /**
     * Set or clear a filter by index.
     * @param index The index of the filter to set or clear.
     * @param setOrClear Set or clear the filter.
     * @returns Nothing.
     */
    public static async filtersByIndexSet(index: number, setOrClear: boolean): Promise<void> {
        await WebDriver.setElementAttributeByPath(
            `(//div[@id='modal-root']//input[@type='checkbox'])[${index + 1}]`,
            "checked",
            setOrClear
        );
    }

    /**
     * Get a filter state by index.
     * @param index The index of the filter to get the state.
     * @returns True if the filter was set.
     */
    public static async filtersByIndexGet(index: number): Promise<boolean> {
        return WebDriver.getElementAttributeByPath<boolean>(
            `(//div[@id='modal-root']//input[@type='checkbox'])[${index + 1}]`,
            "checked"
        );
    }

    /**
     * Set or clear a filter by id.
     * @param id The id of the filter to set or clear.
     * @param setOrClear Set or clear the filter.
     * @returns Nothing.
     */
    public static async filtersByIdSet(id: string, setOrClear: boolean): Promise<void> {
        await WebDriver.setElementAttributeByPath(
            `//div[@id='modal-root']//input[@type='checkbox'][@id='${id}']`,
            "checked",
            setOrClear
        );
    }

    /**
     * Get a filter state by id.
     * @param id The id of the filter to get the state.
     * @returns True if the filter was set.
     */
    public static async filtersByIdGet(id: string): Promise<boolean> {
        return WebDriver.getElementAttributeByPath<boolean>(
            `//div[@id='modal-root']//input[@type='checkbox'][@id='${id}']`,
            "checked"
        );
    }
}
