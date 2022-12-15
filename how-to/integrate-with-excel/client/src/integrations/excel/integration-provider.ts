import type { InteropClient } from "@openfin/core/src/api/interop";
import { Cell, enableLogging, ExcelApplication, getExcelApplication } from "@openfin/excel";
import {
	CLITemplate,
	type CLIDispatchedSearchResult,
	type CLIFilter,
	type CLISearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import type { Integration, IntegrationHelpers, IntegrationModule } from "../../integrations-shapes";
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
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The module definition for the integration.
	 * @internal
	 */
	private _moduleDefinition: Integration<ExcelSettings> | undefined;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _settings: ExcelSettings | undefined;

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
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: Integration<ExcelSettings>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._moduleDefinition = definition;
		this._settings = definition.data;

		const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
		const contextGroups = await brokerClient.getContextGroups();
		this._interopClients = {};
		for (const contextGroup of contextGroups) {
			const contextClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
			await contextClient.joinContextGroup(contextGroup.id);
			await contextClient.addContextHandler(async (ctx) => {
				await this.handleContext(contextGroup.id, ctx);
			});
			this._interopClients[contextGroup.id] = contextClient;
		}

		enableLogging();
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		for (const client in this._interopClients) {
			await this._interopClients[client].removeFromContextGroup();
		}
		this._interopClients = {};
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		result: CLIDispatchedSearchResult,
		lastResponse: CLISearchListenerResponse
	): Promise<boolean> {
		if (
			result.action.name === ExcelIntegrationProvider._EXCEL_PROVIDER_OPEN_KEY_ACTION &&
			result.action.trigger === "user-action" &&
			result.data.workbook &&
			this._integrationHelpers.launchAsset
		) {
			const excelAsset = result.data as ExcelAssetSettings;

			await this._integrationHelpers.launchAsset({
				alias: excelAsset.workbook
			});

			// The workbook is not always available immediately, so start a background process
			// to wait for the workbook being ready

			let tryCount = 0;
			const intervalId = window.setInterval(async () => {
				const excel = await this.getExcel();
				if (excel) {
					const workbooks = await excel.getWorkbooks();

					if (workbooks.length === 0) {
						if (tryCount === 10) {
							window.clearInterval(intervalId);
						} else {
							tryCount++;
						}
					} else {
						window.clearInterval(intervalId);
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
					}
				}
			}, 1000);
			return true;
		}

		return false;
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: CLISearchListenerResponse
	): Promise<HomeSearchResponse> {
		const results = this._settings?.assets.map((a) => this.createResult(a));

		return {
			results
		};
	}

	/**
	 * Create a search result.
	 * @param excelAsset The excel document asset alias.
	 * @returns The search result.
	 */
	private createResult(excelAsset: ExcelAssetSettings): HomeSearchResult {
		return {
			key: `excel-${excelAsset.workbook}`,
			title: excelAsset.title,
			label: "Excel",
			icon: this._moduleDefinition.icon,
			actions: [
				{
					name: ExcelIntegrationProvider._EXCEL_PROVIDER_OPEN_KEY_ACTION,
					hotkey: "Enter"
				}
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
					if (
						client &&
						(cellHandler.types.includes("instrument") || cellHandler.types.includes("fdc3.instrument"))
					) {
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
	 * @param contextGroup The group receiving the context.
	 * @param context The context being received.
	 */
	private async handleContext(contextGroup: string, context: OpenFin.Context): Promise<void> {
		if (this._settings?.assets) {
			const excel = await this.getExcel();
			if (excel) {
				const workbooks = await excel.getWorkbooks();
				for (const workbook of workbooks) {
					const workbookName = await workbook.getName();

					const connectedWorkbook = this._settings?.assets.find((a) => a.workbook === workbookName);
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
