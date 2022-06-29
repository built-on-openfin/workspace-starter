export interface QuoteResult {
	data?: {
		symbol: string;
		company: string;
		lastSalePrice: number;
		chart: {
			z: {
				high: string;
				low: string;
				open: string;
				close: string;
				volume: string;
				dateTime: string;
				value: string;
			};
			x: number;
			y: number;
		}[];
	};
}

export interface QuoteSettings {
	rootUrl: string;
}
