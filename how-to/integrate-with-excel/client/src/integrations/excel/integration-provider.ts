import { Cell, enableLogging, ExcelApplication, getExcelApplication } from "@openfin/excel";
import {
  CLITemplate,
  type CLIDispatchedSearchResult,
  type CLIFilter,
  type CLISearchListenerResponse,
  type HomeSearchResponse,
  type HomeSearchResult
} from "@openfin/workspace";
import { InteropClient } from "openfin-adapter/src/api/interop";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import type { ExcelAssetSettings, ExcelSettings, ExcelWorksheetSettings } from "./shapes";

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
   * The interop clients for the different contexts.
   * @internal
   */
  private _interopClients: { [id: string]: InteropClient };

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

    const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
    const contextGroups = await brokerClient.getContextGroups();
    this._interopClients = {};
    for (const contextGroup of contextGroups) {
      const contextClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
      await contextClient.joinContextGroup(contextGroup.id);
      await contextClient.addContextHandler(async (ctx) => {
        await this.handleContext(integration, contextGroup.id, ctx);
      });
      this._interopClients[contextGroup.id] = contextClient;
    }

    enableLogging();
  }

  /**
   * The module is being deregistered.
   * @param integration The integration details.
   * @returns Nothing.
   */
  public async deregister(integration: Integration<ExcelSettings>): Promise<void> {
    for (const client in this._interopClients) {
      await this._interopClients[client].removeFromContextGroup();
    }
    this._interopClients = {};
  }

  /**
   * Get a list of the static application entries.
   * @param integration The integration details.
   * @returns The list of application entries.
   */
  public async getAppSearchEntries(integration: Integration<ExcelSettings>): Promise<HomeSearchResult[]> {
    return integration?.data?.assets.map((a) => this.createResult(integration, a));
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
    if (
      result.action.name === ExcelIntegrationProvider._EXCEL_PROVIDER_OPEN_KEY_ACTION &&
      result.data.workbook &&
      this._integrationManager.launchAsset
    ) {
      const excelAsset = result.data as ExcelAssetSettings;

      await this._integrationManager.launchAsset({
        alias: excelAsset.workbook
      });

      const excel = await this.getExcel();
      if (excel) {
        const workbooks = await excel.getWorkbooks();
        for (const workbook of workbooks) {
          const name = await workbook.getName();
          if (name === excelAsset.workbook) {
            for (const worksheetSettings of excelAsset.worksheets) {
              const worksheet = await workbook.getWorksheetByName(worksheetSettings.name);
              await worksheet.addEventListener("change", async (cells) => {
                await this.handleCellChanges(excelAsset, worksheetSettings, cells);
              });
            }
          }
        }
        return true;
      }
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
  private createResult(integration: Integration<ExcelSettings>, excelAsset: ExcelAssetSettings): HomeSearchResult {
    return {
      key: `excel-${excelAsset.workbook}`,
      title: excelAsset.title,
      label: "Excel",
      icon: integration.icon,
      actions: [{ name: ExcelIntegrationProvider._EXCEL_PROVIDER_OPEN_KEY_ACTION, hotkey: "Enter" }],
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
   * @param worksheetName The asset to use for processing the cell changes.
   * @param cells The cells that have changed.
   */
  private async handleCellChanges(
    excelAsset: ExcelAssetSettings,
    worksheet: ExcelWorksheetSettings,
    cells: Cell[]
  ): Promise<void> {
    if (worksheet.cellHandlers) {
      for (const cell of cells) {
        const cellHandler = worksheet.cellHandlers.find((c) => c.cell === cell.address);

        if (cellHandler) {
          const client = this._interopClients[cellHandler.contextGroup];
          if (client && (cellHandler.types.includes("instrument") || cellHandler.types.includes("fdc3.instrument"))) {
            await client.setContext({
              type: "fdc3.instrument",
              id: {
                ticker: cell.value,
                _source: `excel.${excelAsset.workbook}.${worksheet.name}`
              }
            });
          }
        }
      }
    }
  }

  /**
   * Handle a context.
   * @param integration The integration details.
   * @param contextGroup The group receiving the context.
   * @param context The context being received.
   */
  private async handleContext(
    integration: Integration<ExcelSettings>,
    contextGroup: string,
    context: OpenFin.Context
  ): Promise<void> {
    if (integration.data?.assets) {
      const excel = await this.getExcel();
      if (excel) {
        const workbooks = await excel.getWorkbooks();
        for (const workbook of workbooks) {
          const workbookName = await workbook.getName();

          const connectedWorkbook = integration.data?.assets.find((a) => a.workbook === workbookName);
          if (connectedWorkbook?.worksheets) {
            for (const worksheetSettings of connectedWorkbook.worksheets) {
              if (worksheetSettings.cellHandlers) {
                const incomingSource = `excel.${workbookName}.${worksheetSettings.name}`;

                if (incomingSource !== context?.id?._source) {
                  const cellHandlers = worksheetSettings.cellHandlers?.filter(
                    (ch) => ch.contextGroup === contextGroup && ch.types.includes(context.type)
                  );
                  for (const cellHandler of cellHandlers) {
                    const worksheet = await workbook.getWorksheetByName(worksheetSettings.name);

                    let cellValue: string;
                    if (context.type === "fdc3.instrument" || context.type === "instrument") {
                      cellValue = context.id?.ticker;
                    }
                    if (cellValue !== undefined) {
                      await worksheet.setCellValues(cellHandler.cell, [[cellValue]]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
