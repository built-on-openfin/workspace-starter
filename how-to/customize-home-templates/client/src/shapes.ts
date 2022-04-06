interface HomeProvider {
    id: string,
    title: string,
    icon: string,
    hidden?: boolean,
}

interface QuoteProvider {
    rootUrl: string,
}

export interface CustomSettings {
    homeProvider?: HomeProvider
    quoteProvider?: QuoteProvider
}

export interface QuoteResult {
    data?: {
        symbol: string;
        company: string;
        lastSalePrice: number;
        chart: {
            z: {
                high: string,
                low: string,
                open: string,
                close: string,
                volume: string,
                dateTime: string,
                value: string
            },
            x: number,
            y: number
        }[];
    }
}
