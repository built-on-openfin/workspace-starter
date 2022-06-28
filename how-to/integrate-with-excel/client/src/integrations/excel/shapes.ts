export interface ExcelWorksheetSettings {
	name: string;
	cellHandlers?: {
		cell: string;
		types: string[];
		contextGroup: "green" | "purple" | "orange" | "red" | "pink" | "yellow";
	}[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExcelWorkbook {}

export interface ExcelAssetSettings {
	title: string;
	description: string;
	workbook: string;
	worksheets: ExcelWorksheetSettings[];
}

export interface ExcelSettings {
	assets: ExcelAssetSettings[];
}
