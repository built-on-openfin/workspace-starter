/**
 * Custom settings for the application.
 */
export interface CustomSettings {
	/**
	 * The settings for excel.
	 */
	excel?: ExcelSettings;
}

/**
 * Settings for integration with Excel.
 */
export interface ExcelSettings {
	/**
	 * The icons to display.
	 */
	icon: string;

	/**
	 * The list of assets for the home integration.
	 */
	assets: ExcelAssetSettings[];
}

/**
 * Definition for excel worksheet settings.
 */
export interface ExcelWorksheetSettings {
	/**
	 * The name of the excel worksheet.
	 */
	name: string;

	/**
	 * Handlers for the excel worksheet cells.
	 */
	cellHandlers?: {
		cell: string;
		types: string[];
		contextGroup: "green" | "purple" | "orange" | "red" | "pink" | "yellow";
	}[];
}

/**
 * Excel asset settings.
 */
export interface ExcelAssetSettings {
	/**
	 * Title of the asset.
	 */
	title: string;

	/**
	 * Description for the asset.
	 */
	description: string;

	/**
	 * The workbook for the asset.
	 */
	workbook: string;

	/**
	 * The worksheet settings for the workbook.
	 */
	worksheets: ExcelWorksheetSettings[];
}
