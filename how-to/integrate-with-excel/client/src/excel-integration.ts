import type OpenFin from "@openfin/core";
import { enableLogging, getExcelApplication, type Cell, type ExcelApplication } from "@openfin/excel";
import {
	CLITemplate,
	type HomeDispatchedSearchResult,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import type { ExcelAssetSettings, ExcelSettings, ExcelWorksheetSettings } from "./shapes";

/**
 * Implement the integration for Excel.
 */
export class ExcelIntegration {
	/**
	 * The key to use for a sheet open action.
	 * @internal
	 */
	private static readonly _EXCEL_PROVIDER_OPEN_KEY_ACTION = "Open Excel";

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
	private _interopClients?: { [id: string]: OpenFin.InteropClient };

	/**
	 * Initialize the module.
	 * @param settings The settings for the integration.
	 * @returns Nothing.
	 */
	public async initialize(settings: ExcelSettings): Promise<void> {
		this._settings = settings;

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
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(query: string): Promise<HomeSearchResponse> {
		let filteredAssets: ExcelAssetSettings[] = [];
		if (this._settings?.assets) {
			if (query.length >= 3) {
				filteredAssets = this._settings.assets.filter((a) =>
					a.title.toLowerCase().includes(query.toLowerCase())
				);
			} else {
				filteredAssets = this._settings.assets;
			}
		}

		return {
			results: filteredAssets.map((a) => this.createResult(a))
		};
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(result: HomeDispatchedSearchResult): Promise<boolean> {
		if (
			result.action.name === ExcelIntegration._EXCEL_PROVIDER_OPEN_KEY_ACTION &&
			result.action.trigger === "user-action" &&
			result.data.workbook
		) {
			const excelAsset = result.data as ExcelAssetSettings;

			await fin.System.launchExternalProcess({
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
									if (worksheet) {
										await worksheet.addEventListener("change", async (cells) => {
											await this.handleCellChanges(excelAsset, worksheetSettings, cells);
										});
									}
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
	 * Create a search result.
	 * @param excelAsset The excel document asset alias.
	 * @returns The search result.
	 */
	private createResult(excelAsset: ExcelAssetSettings): HomeSearchResult {
		return {
			key: `excel-${excelAsset.workbook}`,
			title: excelAsset.title,
			label: "Excel",
			icon: this._settings?.icon,
			actions: [
				{
					name: ExcelIntegration._EXCEL_PROVIDER_OPEN_KEY_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: "excel",
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
	private async getExcel(): Promise<ExcelApplication | undefined> {
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
	 * @param worksheet The asset to use for processing the cell changes.
	 * @param cells The cells that have changed.
	 */
	private async handleCellChanges(
		excelAsset: ExcelAssetSettings,
		worksheet: ExcelWorksheetSettings,
		cells: Cell[]
	): Promise<void> {
		if (this._interopClients && worksheet.cellHandlers) {
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

										if (worksheet) {
											let cellValue: string | undefined;
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
}
