export interface ExcelWorksheetSettings {
    name: string;
    cellHandlers?: {
        cell: string;
        types: string[];
        contextGroup:  "green" | "purple" | "orange" | "red" | "pink" | "yellow"
    }[];
}

export interface ExcelWorkbook {

}

export interface ExcelAssetSettings {
    title: string;
    description: string;
    workbook: string;
    worksheets: ExcelWorksheetSettings[];
}

export interface ExcelSettings {
    assets: ExcelAssetSettings[];
}

