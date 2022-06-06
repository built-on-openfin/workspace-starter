export interface ExcelAsset {
    title: string;
    description: string;
    workbook: string;
    worksheet: string;
    cellHandlers?: {
        cell: string;
        type: "instrument";
        color:  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'
    }[];
}

export interface ExcelSettings {
    assets: ExcelAsset[];
}

