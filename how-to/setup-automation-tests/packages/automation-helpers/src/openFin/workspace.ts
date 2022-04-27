import { WebDriver } from "../util/webDriver";

/**
 * Methods for OpenFin Workspace object handling.
 */
export class OpenFinWorkspace {
    /**
     * Show the home window.
     * @param timeout The amount of time to wait for the home window to open.
     * @returns True if the window was found and opened.
     */
    public static async homeShow(timeout: number): Promise<boolean> {
        if (await WebDriver.waitForWindow("OpenFin Home", timeout)) {
            await WebDriver.callMethod<undefined>("fin.Workspace.Home.show", undefined, true);
            return true;
        }

        return false;
    }

    /**
     * Hide the home window.
     */
    public static async homeHide(): Promise<void> {
        await WebDriver.callMethod<undefined>("fin.Workspace.Home.hide", undefined, true);
    }

    /**
     * Perform a search on the home page.
     * @param searchInput The input to search for.
     */
    public static async homeSearch(searchInput: string): Promise<void> {
        for (const letter of searchInput) {
            const searchInputElement = await WebDriver.findElementById("search-input");
            if (!searchInputElement) {
                throw new Error("Element missing search-input");
            }
            await WebDriver.elementSendKeys(searchInputElement, letter);
        }
    }

    /**
     * Clear the search on the home page.
     */
    public static async homeSearchClear(): Promise<void> {
        const searchInputElement = await WebDriver.findElementById("search-input");
        if (!searchInputElement) {
            throw new Error("Element missing search-input");
        }
        // Send an escape character to clear the input.
        await WebDriver.elementSendKeys(searchInputElement, "\uE00C");
    }

    /**
     * Select a search result from the home page by index.
     * @param index The index of the item to select.
     * @param operation Optionally perform the operation on the item.
     * @returns The element id of the nth item.
     */
    public static async homeSearchResultByIndex(index: number, operation?: "open" | "select"): Promise<string> {
        const elementId = await WebDriver.findElementByPath(`//*[@id='result-list']/div[${index + 1}]`);

        if (elementId) {
            const selectedIndex = await OpenFinWorkspace.homeSearchResultSelectedIndex();

            // Skip the selection if it is already selected, otherwise an open
            // will trigger twice
            if ((operation === "select" || operation === "open") && selectedIndex !== index) {
                await WebDriver.elementClick(elementId);
            }
            if (operation === "open") {
                // Sending a second click performs the double click operation
                await WebDriver.elementClick(elementId);
            }
        }

        return elementId;
    }

    /**
     * Select a search result from the home page by id.
     * @param id The id of the item to select.
     * @param operation Optionally perform the operation on the item.
     * @returns The element id of the item.
     */
    public static async homeSearchResultById(id: string, operation?: "open" | "select"): Promise<string> {
        const elementId = await WebDriver.findElementByPath(`//*[@id='result-list']/*[@id='${id}']`);

        if (elementId) {
            const selectedId = await OpenFinWorkspace.homeSearchResultSelectedId();

            // Skip the selection if it is already selected, otherwise an open
            // will trigger twice
            if ((operation === "select" || operation === "open") && selectedId !== id) {
                await WebDriver.elementClick(elementId);
            }
            if (operation === "open") {
                // Sending a second click performs the double click operation
                await WebDriver.elementClick(elementId);
            }
        }

        return elementId;
    }

    /**
     * Get a list of the search results ids.
     * @returns The id of the search results.
     */
    public static async homeSearchResultIds(): Promise<string[]> {
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
    public static async homeSearchResultSelectedId(): Promise<string> {
        return WebDriver.getElementAttributeByPath<string>("//*[@id='result-list']/div[@aria-selected='true']", "id");
    }

    /**
     * Get the index of the selected search result.
     * @returns The index of the selected search result.
     */
    public static async homeSearchResultSelectedIndex(): Promise<number> {
        const id = await OpenFinWorkspace.homeSearchResultSelectedId();
        const allIds = await OpenFinWorkspace.homeSearchResultIds();
        return allIds.indexOf(id);
    }

    /**
     * Get the details for the selected search result.
     * @returns The innerHTML of the selected search result details.
     */
    public static async homeSearchResultSelectedItem(): Promise<string> {
        return WebDriver.getElementAttributeByPath<string>(
            "//*[@id='result-list']/div[@aria-selected='true']/div",
            "innerHTML"
        );
    }

    /**
     * Get the details for the selected search result.
     * @returns The innerHTML of the selected search result details.
     */
    public static async homeSearchResultSelectedDetails(): Promise<string> {
        return WebDriver.getElementAttributeByPath<string>(
            "//*[@aria-label='Search result details section']/div",
            "innerHTML"
        );
    }

    /**
     * Open the filters selector.
     * @returns Nothing.
     */
    public static async homeFiltersOpen(): Promise<void> {
        const element = await WebDriver.findElementByPath("//button[@shape='square']");
        if (element) {
            await WebDriver.elementClick(element);
        }
    }

    /**
     * Close the filters selector.
     * @param ok Close with ok otherwise cancel.
     * @returns Nothing.
     */
    public static async homeFiltersClose(ok: boolean): Promise<void> {
        const element = await WebDriver.findElementByPath(
            `//div[@id='modal-root']//button[contains(text(), '${ok ? "OK" : "Cancel"}')]`
        );
        if (element) {
            await WebDriver.elementClick(element);
        }
    }

    /**
     * Get the list of filter ids.
     * @returns Filter ids.
     */
    public static async homeFiltersIds(): Promise<string[]> {
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
    public static async homeFiltersByIndexSet(index: number, setOrClear: boolean): Promise<void> {
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
    public static async homeFiltersByIndexGet(index: number): Promise<boolean> {
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
    public static async homeFiltersByIdSet(id: string, setOrClear: boolean): Promise<void> {
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
    public static async homeFiltersByIdGet(id: string): Promise<boolean> {
        return WebDriver.getElementAttributeByPath<boolean>(
            `//div[@id='modal-root']//input[@type='checkbox'][@id='${id}']`,
            "checked"
        );
    }
}
