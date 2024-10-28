import type OpenFin from "@openfin/core";
import { enableLogging, getExcelApplication, type Cell, type ExcelApplication } from "@openfin/excel";
import type { ExcelAssetSettings, ExcelSettings, ExcelWorksheetSettings } from "./shapes";

let excel: ExcelApplication | undefined;
/**
 * The interop clients for the different contexts.
 */
let interopClients: { [id: string]: OpenFin.InteropClient } | undefined;

let settings: ExcelSettings | undefined;

let workbookFound: boolean;

/**
 * Initialize the Excel interop.
 * @param excelSettings The settings to use for initializing the Excel interop.
 */
export async function init(excelSettings: ExcelSettings): Promise<void> {
	if (!settings) {
		settings = excelSettings;
		const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
		const contextGroups = await brokerClient.getContextGroups();
		interopClients = {};
		for (const contextGroup of contextGroups) {
			const contextClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
			await contextClient.joinContextGroup(contextGroup.id);
			await contextClient.addContextHandler(async (ctx) => {
				await handleContext(contextGroup.id, ctx);
			});
			interopClients[contextGroup.id] = contextClient;
		}

		enableLogging();
	}
}

/**
 * Get the Excel application.
 * @param assetSettings The settings to use for getting the Excel application.
 * @returns The Excel application.
 */
export async function launchExcel(assetSettings: ExcelAssetSettings): Promise<boolean> {
	const assetAvailable = await getAppAsset();
	if (!assetAvailable) {
		return false;
	}
	await fin.System.launchExternalProcess({
		alias: settings?.appAsset.alias
	});
	// The workbook is not always available immediately, so start a background process
	// to wait for the workbook being ready

	await listenToExcel(assetSettings);
	return true;
}

/**
 * Listen to the Excel application.
 * @param assetSettings The settings to use for listening to the Excel application.
 * @param tryCount The number of times the function has been called.
 * @returns A promise that resolves when the Excel application is available.
 */
async function listenToExcel(assetSettings: ExcelAssetSettings, tryCount = 0): Promise<void> {
	if (tryCount === 10) {
		console.error("Excel workbook not available after 10 attempts");
		return;
	}
	if (workbookFound) {
		console.info("Workbook already found");
		return;
	}
	setTimeout(async () => {
		const excelInstance = await getExcel();
		if (excelInstance) {
			const workbooks = await excelInstance.getWorkbooks();
			if (workbooks.length === 0) {
				tryCount++;
				await listenToExcel(assetSettings, tryCount);
			} else {
				workbookFound = false;
				for (const workbook of workbooks) {
					const name = await workbook.getName();
					if (name === assetSettings.workbook) {
						for (const worksheetSettings of assetSettings.worksheets) {
							const worksheet = await workbook.getWorksheetByName(worksheetSettings.name);
							if (worksheet) {
								workbookFound = true;
								await worksheet.addEventListener("change", async (cells) => {
									await handleCellChanges(assetSettings, worksheetSettings, cells);
								});
							}
						}
					}
				}
				if (!workbookFound) {
					tryCount++;
					await listenToExcel(assetSettings, tryCount);
				}
			}
		}
	}, 1000);
}

/**
 * Do any cleanup that is required.
 */
export async function closeDown(): Promise<void> {
	for (const client in interopClients) {
		await interopClients[client].removeFromContextGroup();
	}
	interopClients = {};
}

/**
 * Gets the configured app asset and ensures it is available.
 * @returns A boolean indicating if the app asset is available.
 */
async function getAppAsset(): Promise<boolean> {
	let availableAppAsset: OpenFin.AppAssetInfo | undefined;
	try {
		if (settings?.appAsset !== undefined) {
			availableAppAsset = await fin.System.getAppAssetInfo({ alias: settings.appAsset.alias });
		}
	} catch (appAssetError) {
		console.debug(
			`App asset info for alias: ${settings?.appAsset.alias} is not available. Response from getAppAssetInfo`,
			appAssetError
		);
	}
	if (
		(availableAppAsset === undefined || settings?.appAsset.version !== availableAppAsset.version) &&
		settings?.appAsset !== undefined
	) {
		console.info(`App asset with alias: ${settings?.appAsset.alias} does not exist in memory. Fetching it.`);
		try {
			await fin.System.downloadAsset(settings.appAsset, (progress) => {
				const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
				console.info(
					`Downloaded ${downloadedPercent}% of app asset with alias of ${settings?.appAsset.alias}`
				);
			});
		} catch (error) {
			console.error(`Error trying to download app asset with alias: ${settings?.appAsset.alias}`, error);
			return false;
		}
	}
	return true;
}

/**
 * Get the excel application.
 * @returns The application.
 * @internal
 */
async function getExcel(): Promise<ExcelApplication | undefined> {
	try {
		excel = await getExcelApplication();
		return excel;
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
async function handleCellChanges(
	excelAsset: ExcelAssetSettings,
	worksheet: ExcelWorksheetSettings,
	cells: Cell[]
): Promise<void> {
	if (interopClients && worksheet.cellHandlers) {
		for (const cell of cells) {
			const cellHandler = worksheet.cellHandlers.find((c) => c.cell === cell.address);

			if (cellHandler) {
				const client = interopClients[cellHandler.contextGroup];
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
async function handleContext(contextGroup: string, context: OpenFin.Context): Promise<void> {
	if (settings?.asset) {
		const excelInstance = await getExcel();
		if (excelInstance) {
			const workbooks = await excelInstance.getWorkbooks();
			for (const workbook of workbooks) {
				const workbookName = await workbook.getName();

				const connectedWorkbook = settings?.asset;
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
