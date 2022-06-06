import {
    CLITemplate,
    type CLIDispatchedSearchResult,
    type CLIFilter,
    type CLISearchListenerResponse,
    type HomeSearchResponse,
    type HomeSearchResult
} from "@openfin/workspace";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import type { ExcelAsset, ExcelSettings } from "./shapes";
import { ExcelApplication, getExcelApplication, enableLogging, Cell } from "@openfin/excel";

/**
 * Implement the integration provider for Excel.
 */
export class ExcelIntegrationProvider implements IntegrationModule<ExcelSettings> {
    /**
     * Provider id.
     * @internal
     */
    private static readonly _PROVIDER_ID = "excel";

    /**
     * The key to use for a sheet open action.
     * @internal
     */
    private static readonly _EXCEL_PROVIDER_OPEN_KEY_ACTION = "Open Excel";

    /**
    * The integration manager.
    * @internal
    */
    private _integrationManager: IntegrationManager | undefined;

    /**
     * The Excel application interop.
     * @internal
     */
    private _excel: ExcelApplication | undefined;

    /**
     * The module is being registered.
     * @param integrationManager The manager for the integration.
     * @param integration The integration details.
     * @returns Nothing.
     */
    public async register(
        integrationManager: IntegrationManager,
        integration: Integration<ExcelSettings>
    ): Promise<void> {
        this._integrationManager = integrationManager;
        enableLogging();
    }

    /**
     * The module is being deregistered.
     * @param integration The integration details.
     * @returns Nothing.
     */
    public async deregister(integration: Integration<ExcelSettings>): Promise<void> {
    }

    /**
     * Get a list of the static application entries.
     * @param integration The integration details.
     * @returns The list of application entries.
     */
    public async getAppSearchEntries(integration: Integration<ExcelSettings>): Promise<HomeSearchResult[]> {
        const results = [];

        return results;
    }

    /**
     * An entry has been selected.
     * @param integration The integration details.
     * @param result The dispatched result.
     * @param lastResponse The last response.
     * @returns True if the item was handled.
     */
    public async itemSelection(
        integration: Integration<ExcelSettings>,
        result: CLIDispatchedSearchResult,
        lastResponse: CLISearchListenerResponse
    ): Promise<boolean> {
        if (result.action.name === ExcelIntegrationProvider._EXCEL_PROVIDER_OPEN_KEY_ACTION && result.data.workbook && this._integrationManager.launchAsset) {
            await this._integrationManager.launchAsset({
                alias: result.data.workbook
            });

            setTimeout(async () => {
                try {
                    const excel = await this.getExcel();
                    if (excel) {
                        const workbooks = await excel.getWorkbooks();
                        for (const workbook of workbooks) {
                            const name = await workbook.getName();
                            if (name === result.data.workbook) {
                                const worksheet = await workbook.getWorksheetByName(result.data.worksheet);
                                await worksheet.activate();

                                await worksheet.addEventListener("change", (cells) => {
                                    this.handleCellChanges(result.data, cells)
                                })
                            }
                        }
                        return true;
                    }
                } catch (err) {
                    console.error("Error launching Excel", err);
                }
            }, 2000);
        }

        return false;
    }

    /**
     * Get a list of search results based on the query and filters.
     * @param integration The integration details.
     * @param query The query to search for.
     * @param filters The filters to apply.
     * @param lastResponse The last search response used for updating existing results.
     * @returns The list of results and new filters.
     */
    public async getSearchResults(
        integration: Integration<ExcelSettings>,
        query: string,
        filters: CLIFilter[],
        lastResponse: CLISearchListenerResponse
    ): Promise<HomeSearchResponse> {
        const results = [];

        if (query.startsWith("/excel") && integration?.data?.assets) {
            results.push(...integration?.data?.assets.map(a => this.createResult(integration, a)));
        }

        return {
            results
        };
    }

    /**
     * Create a search result.
     * @param integration The integration details.
     * @param excelAsset The excel document asset alias.
     * @returns The search result.
     */
    private createResult(integration: Integration<ExcelSettings>, excelAsset: ExcelAsset): HomeSearchResult {
        return {
            key: `excel-${excelAsset.workbook}`,
            title: excelAsset.title,
            label: "Excel",
            icon: integration.icon,
            actions: [
                { name: ExcelIntegrationProvider._EXCEL_PROVIDER_OPEN_KEY_ACTION, hotkey: "Enter" }
            ],
            data: {
                providerId: ExcelIntegrationProvider._PROVIDER_ID,
                ...excelAsset
            },
            template: CLITemplate.SimpleText,
            templateContent: excelAsset.description
        };
    }

    /**
     * Get the excel application.
     * @returns The application.
     * @internal
     */
    private async getExcel(): Promise<ExcelApplication> {
        try {
            this._excel = await getExcelApplication();
            return this._excel;
        } catch (err) {
            console.error("Error getting Excel application", err);
        }
    }

    /**
     * Handle the cell changes.
     * @param excelAsset The asset to use for processing the cell changes.
     * @param cells The cells that have changed.
     */
    private async handleCellChanges(excelAsset: ExcelAsset, cells: Cell[]): Promise<void> {
        if (excelAsset.cellHandlers) {
            for (const cell of cells) {
                const cellHandler = excelAsset.cellHandlers.find(c => c.cell === cell.address);
                if (cellHandler?.type === "instrument") {
                    console.log(`Broadcast the fdc3.instrument ${cell.value} to the cellHandler.color context group`, cellHandler);
                }
            }
        }
    }
}
