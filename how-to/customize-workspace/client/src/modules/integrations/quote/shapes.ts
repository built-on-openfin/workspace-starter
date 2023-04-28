/**
 * The settings for the module.
 */
export interface QuoteSettings {
	/**
	 * The root url where the data is stored.
	 */
	rootUrl?: string;
}

/**
 * The result from the quote data.
 */
export interface QuoteResult {
	/**
	 * The data.
	 */
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
